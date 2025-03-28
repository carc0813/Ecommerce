const { Router } = require("express");


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const productRoutes = require("./products");
const categoryRoutes = require("./categories");
const userRoutes = require("./users");
const authRoutes = require("./auths");
const cartRoutes = require("./carts");


const router = Router();

router.use("/products", productRoutes);// Ruta para todos los productos 
router.use("/categories", categoryRoutes);// Ruta para las categorias
router.use("/users", userRoutes); // Agregar el módulo de usuarios
router.use("/users", authRoutes); // Ruta para autenticación
router.use("/carts", cartRoutes);// Ruta para carrito de compras
module.exports = router;
