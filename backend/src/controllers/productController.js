const { Product, Category } = require("../db");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ["id", "title", "description", "price", "images"], // Asegúrate de incluir 'image'
      include: {
        model: Category,
        attributes: ["name"],
      },
    });
   // console.log(products)
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los productos");
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, categotyId } = req.body;
    const product = await Product.create({ name, price, categotyId });
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error Creando Producto");
  }
};

module.exports = { getAllProducts, createProduct };
