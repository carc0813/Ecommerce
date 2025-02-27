const { Category } = require("../db");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving categories");
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error creating category");
  }
};

module.exports = { getAllCategories, createCategory };