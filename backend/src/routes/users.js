const express = require("express");
const router = express.Router();


const { registerUser } = require("../controllers/registerController");


router.post("/register", registerUser); // Ruta para registrar usuario

module.exports = router;
