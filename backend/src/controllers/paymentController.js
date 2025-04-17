// paymentController.js
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_XXXX');
const { Order, Product } = require('../db'); // Supongamos que tienes un modelo Order para las compras

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
    
    if (!orderId || !amount || !currency) {
      return res.status(400).json({ message: "Datos incompletos" });
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
    // La cabecera 'stripe-signature' valida que la petición provenga de Stripe (recomendado en producción)
    const sig = req.headers['stripe-signature'];
    // Aquí debes tener la llave del webhook, configurada en Stripe Dashboard
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Manejo de diferentes tipos de eventos
    // Ejemplo dentro de handlePaymentWebhook:
if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const orderId = paymentIntent.metadata.orderId;
    const order = await Order.findByPk(orderId, { include: [Product] });
    if (order) {
      order.status = 'paid';
      await order.save();
  
      // Actualizar stock de cada producto
      for (const product of order.Products) {
        product.inStock = product.inStock - product.OrderProduct.quantity; // suponiendo una tabla intermedia OrderProduct
        await product.save();
      }
    }
  
  
  }

  // Eliminar carrito del usuario (si usas una tabla intermedia ProductCart)
await Cart.destroy({ where: { userId: Order.userId } });

  // Otros eventos pueden ser manejados de forma similar

  res.json({ received: true });
};

module.exports = { createPaymentIntent, handlePaymentWebhook };
