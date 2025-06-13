const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Login attempt:', { email, password });
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    console.log('User found:', user.toJSON());
    // Use correct password field name passwordHash
    console.log('Comparing password:', password, 'with hash:', user.passwordHash);
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      console.log('Invalid password');
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Return user data (excluding passwordHash)
    const { passwordHash, ...userData } = user.toJSON();
    res.json(userData);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
