const Category = require("../models/Category");

// GET all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getCategories };
