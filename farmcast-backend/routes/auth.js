// ============================================
// ROUTE — auth.js
// POST /api/auth/register
// POST /api/auth/login
// GET  /api/auth/me  (protected)
// ============================================

const router   = require('express').Router();
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const User     = require('../models/User');
const authMW   = require('../middleware/auth');

// ── REGISTER ──
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, name, farmName } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: 'Please fill in all required fields.' });

    // Check if user already exists
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing)
      return res.status(400).json({ message: 'Username or email already taken.' });

    // Hash password
    const salt     = await bcrypt.genSalt(10);
    const hashed   = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      username, email,
      password: hashed,
      name: name || username,
      farmName: farmName || 'My Farm',
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Registered successfully! Welcome to FarmCast 🌾',
      token,
      user: { id: user._id, username: user.username, name: user.name, farmName: user.farmName, avatar: user.avatar }
    });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

// ── LOGIN ──
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: 'Please enter username and password.' });

    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    });
    if (!user)
      return res.status(400).json({ message: 'Invalid username or password.' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid username or password.' });

    // Generate token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: `Welcome back, ${user.name || user.username}! 🌾`,
      token,
      user: {
        id: user._id, username: user.username,
        name: user.name, farmName: user.farmName,
        farmSize: user.farmSize, role: user.role,
        avatar: user.avatar, city: user.city,
        email: user.email, phone: user.phone,
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// ── GET CURRENT USER (protected) ──
router.get('/me', authMW, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// ── UPDATE PROFILE (protected) ──
router.put('/profile', authMW, async (req, res) => {
  try {
    const { name, farmName, farmSize, role, phone, avatar, city, lat, lon } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { name, farmName, farmSize, role, phone, avatar, city, lat, lon },
      { new: true }
    ).select('-password');
    res.json({ message: 'Profile updated!', user: updated });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
