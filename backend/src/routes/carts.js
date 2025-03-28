const { Router } = require("express");
const cartController = require("../controllers/cartController");

const router = Router();


router.post("/cart/add", cartController.addToCart);
router.get("/cart/:userId", cartController.getCart);
router.put("/cart/update", cartController.updateCart);
router.delete("/cart/remove", cartController.romoveFromCart);

module.exports = router;
