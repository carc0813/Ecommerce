const { Router } = require("express");
const { Order, Product, User } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  const { userId, products, paymentMethod, totalAmount } = req.body;

  try {
    const newOrder = await Order.create({
      userId,
      paymentMethod,
      totalAmount
    });

    // Asociar productos a la orden
    for (const item of products) {
      await newOrder.addProduct(item.productId, {
        through: {
          quantity: item.quantity,
          priceAtPurchase: item.price
        }
      });
    }

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

module.exports = router;
