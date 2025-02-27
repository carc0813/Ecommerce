const { Router } = require("express");
const { getAllCategories, createCategory } = require("../controllers/categoryController");

const router = Router();

router.get("/", getAllCategories);
router.post("/", createCategory);

module.exports = router;