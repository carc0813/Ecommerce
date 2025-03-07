const { Product, Category } = require("../db");


//me trae todos los productos de la base de datos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ["id", "title", "description", "price", "images"], 
      include: {
        model: Category,
        attributes: ["name"],
      },
    });

    // Transformar las imágenes a tipo json 
    const updatedProducts = products.map((product) => ({
      ...product.toJSON(),
      images: product.images.map(img => `http://localhost:3001/images/${img}`)
    }));

    res.status(200).json(updatedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los productos");
  }
};


//crear productos 
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
