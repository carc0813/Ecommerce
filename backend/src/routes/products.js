

const { Router } = require("express");
const { getAllProducts, createProduct } = require("../controllers/productController");

const router = Router();

router.get("/", getAllProducts);
router.post("/", createProduct);

module.exports = router;