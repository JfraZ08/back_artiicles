// /src/controllers/categoryController.js
const CategoryRepository = require('../services/category/cateogryRepository');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryRepository.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await CategoryRepository.getCategoryById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Catégorie non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const newCategory = await CategoryRepository.createCategory(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    await CategoryRepository.updateCategory(req.params.id, req.body);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await CategoryRepository.deleteCategory(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
