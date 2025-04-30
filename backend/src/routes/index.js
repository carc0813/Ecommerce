const { Router } = require("express");

const productRoutes = require("./products");
const categoryRoutes = require("./categories");
const userRoutes = require("./users");
const authRoutes = require("./auths");
const cartRoutes = require("./carts");
const orderRoutes = require("./orders");
const paymentRoutes = require("./payments");

const router = Router();

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/users", userRoutes);
router.use("/users", authRoutes);
router.use("/carts", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/payments", paymentRoutes);

module.exports = router;


