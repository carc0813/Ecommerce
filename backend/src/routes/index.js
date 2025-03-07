const { Router } = require("express");


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const productRoutes = require("./products");
const categoryRoutes = require("./categories");
const userRoutes = require("./users");
const router = Router();

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/users", userRoutes); // Agregar el módulo de usuarios
module.exports = router;
