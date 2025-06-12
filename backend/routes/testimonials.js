const express = require('express');
const router = express.Router();
const { Testimonial } = require('../models');

// Get all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get testimonial by id
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (testimonial) res.json(testimonial);
    else res.status(404).json({ error: 'Testimonial not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new testimonial
router.post('/', async (req, res) => {
  try {
    const newTestimonial = await Testimonial.create(req.body);
    res.status(201).json(newTestimonial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update testimonial
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Testimonial.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedTestimonial = await Testimonial.findByPk(req.params.id);
      res.json(updatedTestimonial);
    } else {
      res.status(404).json({ error: 'Testimonial not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete testimonial
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Testimonial.destroy({ where: { id: req.params.id } });
    if (deleted) res.json({ message: 'Testimonial deleted' });
    else res.status(404).json({ error: 'Testimonial not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
