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

//traerme el producto de la base de datos 
// Obtener un producto por ID usando findOne
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar producto en la base de datos
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(product); // Retorna el producto encontrado
  } catch (error) {
    console.error("Error en getProductById:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};



module.exports = { getAllProducts, createProduct,getProductById};
