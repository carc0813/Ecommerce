// paymentController.js
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY );
const { Order, Product, Cart, OrderProduct } = require('../db'); // Supongamos que tienes un modelo Order para las compras

// Crear un Payment Intent
const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, orderId } = req.body;

    // Validar que el pedido exista y que el monto sea el correcto
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(400).json({ message: "Orden no encontrada" });
    }

    // Aquí podrías validar que el "amount" recibido sea igual al total de la orden
    if (order.totalAmount !== amount) {
      return res.status(400).json({ message: "Monto incorrecto" });
    }
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: "Monto inválido" });
    }
    if (!orderId) {
      return res.status(400).json({ message: "orderId inválido" });
    }
    if (!currency || typeof currency !== 'string') {
      return res.status(400).json({ message: "currency inválido" });
    }
    
    // Crear el Payment Intent en Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // el monto en la moneda más pequeña (por ejemplo, centavos)
      currency: currency, // ej: 'usd' o 'eur'
      metadata: {
        orderId: orderId.toString(),
      }, // puedes enviar información adicional para identificar el pedido
    });
    console.log("Client Secret generado:", paymentIntent.client_secret); // DEBUG
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
   
  } catch (error) {
    console.error("Error creando Payment Intent:", error);
    res.status(500).json({ message: "Error al crear el Payment Intent" });
  }
};

// Confirmación del pago (puede ser vía webhook)
const handlePaymentWebhook = async (req, res) => {
  let event;

  try {
    const sig = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 👉 Manejamos evento de pago exitoso
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const orderId = paymentIntent.metadata.orderId;

    try {
      const order = await Order.findByPk(orderId, {
        include: [
          {
            model: Product,
            through: { attributes: ['quantity'] }
          }
        ]
      });
    
      if (order) {
        // 1. Actualizar estado de la orden
        order.status = 'paid';
        await order.save();
        console.log(`✅ Orden ${orderId} actualizada a "paid"`);
    
        // 2. Actualizar stock de productos
        const productQuantities = {};

for (const product of order.Products) {
  const pid = product.id;
  const quantity = product.OrderProduct.quantity;

  if (!productQuantities[pid]) {
    productQuantities[pid] = { product, quantity };
  } else {
    productQuantities[pid].quantity += quantity;
  }
}

for (const { product, quantity } of Object.values(productQuantities)) {
  product.inStock = product.inStock - quantity;
  if (product.inStock < 0) product.inStock = 0;
  await product.save();
}

    
        // 3. Eliminar carrito del usuario (si aplica)
        await Cart.destroy({ where: { userId: order.userId } });
        console.log(`🛒 Carrito del usuario ${order.userId} eliminado`);
      } else {
        console.error(`❌ Orden con id ${orderId} no encontrada`);
      }
    } catch (error) {
      console.error("❌ Error procesando orden:", error.message);
    }
  }    

  // 👌 Responder a Stripe que recibimos el evento
  res.json({ received: true });
};

module.exports = { createPaymentIntent, handlePaymentWebhook };
