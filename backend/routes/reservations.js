const express = require('express');
const router = express.Router();
const { Reservation } = require('../models');

// Get all reservations or filter by userId query parameter
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    let reservations;
    if (userId) {
      reservations = await Reservation.findAll({ where: { userId }, include: ['vehicle'] });
    } else {
      reservations = await Reservation.findAll({ include: ['vehicle'] });
    }
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get reservation by id
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (reservation) res.json(reservation);
    else res.status(404).json({ error: 'Reservation not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new reservation
router.post('/', async (req, res) => {
  try {
    const newReservation = await Reservation.create(req.body);
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update reservation
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Reservation.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedReservation = await Reservation.findByPk(req.params.id);
      res.json(updatedReservation);
    } else {
      res.status(404).json({ error: 'Reservation not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete reservation
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Reservation.destroy({ where: { id: req.params.id } });
    if (deleted) res.json({ message: 'Reservation deleted' });
    else res.status(404).json({ error: 'Reservation not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
