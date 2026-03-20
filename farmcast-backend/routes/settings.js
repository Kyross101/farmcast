// ============================================
// ROUTE — settings.js
// GET /api/settings       - get user settings
// PUT /api/settings       - update/save settings
// ============================================

const router   = require('express').Router();
const Settings = require('../models/Settings');
const authMW   = require('../middleware/auth');

router.use(authMW);

// GET settings (auto-create default if none)
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne({ user: req.user.id });
    if (!settings) {
      settings = await Settings.create({ user: req.user.id });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching settings.' });
  }
});

// PUT save settings
router.put('/', async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { user: req.user.id },
      { ...req.body },
      { new: true, upsert: true }
    );
    res.json({ message: 'Settings saved!', settings });
  } catch (err) {
    res.status(500).json({ message: 'Error saving settings.' });
  }
});

module.exports = router;
