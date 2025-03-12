const express = require("express");
const router = express.Router();


const { getAllUsers, registerUser, deleteUser} = require("../controllers/registerController");



// Ruta para registrar usuario
router.post("/register", registerUser); 

// Obtener todos los usuarios
router.get("/", getAllUsers);

// Eliminar un usuario por ID
router.delete("/:id", deleteUser);


module.exports = router;
