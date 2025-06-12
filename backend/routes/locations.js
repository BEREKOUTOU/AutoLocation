const express = require('express');
const router = express.Router();
const { Location } = require('../models');

// Get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get location by id
router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (location) res.json(location);
    else res.status(404).json({ error: 'Location not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new location
router.post('/', async (req, res) => {
  try {
    const newLocation = await Location.create(req.body);
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update location
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Location.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedLocation = await Location.findByPk(req.params.id);
      res.json(updatedLocation);
    } else {
      res.status(404).json({ error: 'Location not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete location
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Location.destroy({ where: { id: req.params.id } });
    if (deleted) res.json({ message: 'Location deleted' });
    else res.status(404).json({ error: 'Location not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
