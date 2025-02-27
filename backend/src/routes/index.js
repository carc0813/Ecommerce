const { Router } = require("express");
const express = require('express');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const productRoutes = require("../routes/categories");
const categoryRoutes = require("../routes/products")
// Ruta de prueba
const app = express();

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

module.exports = router;
