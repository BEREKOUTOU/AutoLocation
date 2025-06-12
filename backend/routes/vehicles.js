const express = require('express');
const router = express.Router();
const { Vehicle, VehicleCategory } = require('../models');

// Get all vehicles with category included
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      include: [{ model: VehicleCategory }]
    });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get vehicle by id with category included
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id, {
      include: [{ model: VehicleCategory }]
    });
    if (vehicle) res.json(vehicle);
    else res.status(404).json({ error: 'Vehicle not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new vehicle
router.post('/', async (req, res) => {
  try {
    const newVehicle = await Vehicle.create(req.body);
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update vehicle
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Vehicle.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedVehicle = await Vehicle.findByPk(req.params.id);
      res.json(updatedVehicle);
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete vehicle
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Vehicle.destroy({ where: { id: req.params.id } });
    if (deleted) res.json({ message: 'Vehicle deleted' });
    else res.status(404).json({ error: 'Vehicle not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
