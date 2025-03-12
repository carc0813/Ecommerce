const { mergeDefaults } = require("sequelize/lib/utils");
const { User } = require("../db");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, password2, role } = req.body;

    console.log("Datos recibidos en el backend:", req.body); // 🔹 Verifica qué llega

    // ❌ ERROR: Aquí se está incluyendo `password2` en la validación
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios." });
    }

    // ✅ Solo verifica `password2` si está presente
    if (password2 && password !== password2) {
      return res.status(400).json({ message: "Las contraseñas no coinciden." });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El usuario ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error en el servodor " });
  }
};

//eliminar usuario
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: "usuario no encontrado" });
    }
    await user.destroy();
    res.status(200).json({ message: "usuario eliminado correctamete" });
  } catch (error) {
    console.error("Error al eliminar el usuario", error);
    res.status(500).json({ message: "Error en el Servidor" });
  }
};

module.exports = { registerUser, getAllUsers, deleteUser };
