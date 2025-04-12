const { Router } = require("express");

// Rutas existentes
const productRoutes = require("./products");
const categoryRoutes = require("./categories");
const userRoutes = require("./users");
const authRoutes = require("./auths");
const cartRoutes = require("./carts");
const orderRoutes = require("./orders");

const router = Router();

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/users", userRoutes);
router.use("/users", authRoutes); // Puede combinarse según cómo esté armado
router.use("/carts", cartRoutes);
router.use("/orders",orderRoutes); // 👈 nueva ruta añadida

module.exports = router;

