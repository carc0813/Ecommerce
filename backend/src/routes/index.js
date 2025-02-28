const { Router } = require("express");


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const productRoutes = require("./products");
const categoryRoutes = require("./categories")
// Ruta de prueba

const router = Router();

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;
