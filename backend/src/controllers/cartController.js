const { where } = require("sequelize");
const { Cart, Product } = require("../db");

// 🛒 Agregar producto al carrito
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cartItem = await Cart.findOne({ where: { userId, productId } });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ userId, productId, quantity });
    }

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar productos al carrito" });
  }
};

// 🛒 Obtener productos del carrito de un usuario
const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findAll({
      where: { userId:req.params.userId  },
      include: [{ model: Product }],
    });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener carrito" });
  }
};

// 🛒 Actualizar cantidad de un producto en el carrito
const updateCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cartItem = await Cart.findOne({ where: userId, productId });
    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.status(200).json(cartItem);
    } else {
      res.status(404).json({ error: "Producto no encontrado en el Carrito" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar cantidad" });
  }
};

// 🛒 Eliminar un producto del carrito
const romoveFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    await Cart.destroy({ where: { userId, productId } });
    res.status(200).json({ message: "Productos Eliminados del Carrito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto del carrito" });
  }
};

module.exports = { addToCart, getCart, updateCart,romoveFromCart};
