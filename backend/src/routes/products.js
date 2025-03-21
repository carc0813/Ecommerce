const express = require("express");
const router = express.Router();
const { getAllProducts, createProduct,getProductById} = require("../controllers/productController");


// Ruta para obtener un producto por ID
router.get("/:id", getProductById);
//Ruta para obtener todos los productos 
router.get("/", getAllProducts);
//Ruta para crear un producto
router.post("/", createProduct);

module.exports = router;