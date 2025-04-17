const { Router } = require("express");
const { Order, Product, User } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  const { userId, products, paymentMethod, totalAmount } = req.body;

  try {
    console.log("Productos recibidos para la orden:", products);

    // Validación anticipada
    const productIds = products.map(p => p.productId);
    const foundProducts = await Product.findAll({ where: { id: productIds } });

    if (foundProducts.length !== productIds.length) {
      const foundIds = foundProducts.map(p => p.id);
      const missingIds = productIds.filter(id => !foundIds.includes(id));
      return res.status(400).json({ error: `Los siguientes productos no existen: ${missingIds.join(', ')}` });
    }

    const newOrder = await Order.create({
      userId,
      paymentMethod,
      totalAmount
    });

    // Asociar productos
    for (const item of products) {
      await newOrder.addProduct(item.productId, {
        through: {
          quantity: item.quantity,
          priceAtPurchase: item.price,
          subtotal: item.subtotal
        }
      });
    }

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});


router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({
      where: { userId, status: 'paid' },
      include: [Product],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener órdenes" });
  }
});


module.exports = router;
