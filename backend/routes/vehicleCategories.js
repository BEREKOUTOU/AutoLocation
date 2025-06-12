const express = require('express');
const router = express.Router();
const { VehicleCategory } = require('../models');

// Get all vehicle categories
router.get('/', async (req, res) => {
  try {
    const categories = await VehicleCategory.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get category by id
router.get('/:id', async (req, res) => {
  try {
    const category = await VehicleCategory.findByPk(req.params.id);
    if (category) res.json(category);
    else res.status(404).json({ error: 'Category not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await VehicleCategory.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update category
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await VehicleCategory.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedCategory = await VehicleCategory.findByPk(req.params.id);
      res.json(updatedCategory);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete category
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await VehicleCategory.destroy({ where: { id: req.params.id } });
    if (deleted) res.json({ message: 'Category deleted' });
    else res.status(404).json({ error: 'Category not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
