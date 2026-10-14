// ============================================
// ROUTE — pests.js
// GET    /api/pests       - get all pest logs
// POST   /api/pests       - log pest sighting
// DELETE /api/pests/:id   - delete pest log
// ============================================

const router  = require('express').Router();
const PestLog = require('../models/PestLog');
const mongoose = require('mongoose');
const authMW  = require('../middleware/auth');

router.use(authMW);

// GET all pest logs
router.get('/', async (req, res) => {
  try {
    const logs = await PestLog.find({ user: req.user.id }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pest logs.' });
  }
});

// POST log pest sighting
router.post('/', async (req, res) => {
  try {
    const { pest, date, crop, location, severity, notes } = req.body;
    if (!pest || !crop || !location)
      return res.status(400).json({ message: 'Please fill in all required fields.' });

    const log = await PestLog.create({
      user: req.user.id,
      pest, crop, location,
      date: date || new Date().toISOString().split('T')[0],
      severity: severity || 'low',
      notes: notes || ''
    });
    res.status(201).json({ message: `${pest} sighting logged! 🐛`, log });
  } catch (err) {
    res.status(500).json({ message: 'Error logging pest sighting.' });
  }
});


// DELETE pest log — owner-scoped operation.
router.delete('/:id', async (req, res) => {

  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: 'Invalid pest-log ID.'
    });
  }

  try {

    const log =
      await PestLog.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id
      });

    if (!log) {
      return res.status(404).json({
        message: 'Log not found.'
      });
    }

    return res.json({
      message: 'Pest log deleted.'
    });

  } catch (error) {

    console.error(
      'Pest log deletion error:',
      error
    );

    return res.status(500).json({
      message:
        'Could not confirm pest log deletion. ' +
        'Refresh before retrying.'
    });

  }
});


module.exports = router;
