// ============================================
// ROUTE — harvest.js
// GET    /api/harvest       - get all harvest records
// POST   /api/harvest       - log new harvest
// DELETE /api/harvest/:id   - delete harvest record
// ============================================

const router  = require('express').Router();
const Harvest = require('../models/Harvest');
const mongoose = require('mongoose');
const authMW  = require('../middleware/auth');

router.use(authMW);

// GET all harvests
router.get('/', async (req, res) => {
  try {
    const records = await Harvest.find({ user: req.user.id }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching harvest records.' });
  }
});

// POST log harvest
router.post('/', async (req, res) => {
  try {
    const input = req.body || {};

    const crop =
      typeof input.crop === 'string'
        ? input.crop.trim()
        : '';

    const date =
      typeof input.date === 'string'
        ? input.date.trim()
        : '';

    const location =
      typeof input.location === 'string'
        ? input.location.trim()
        : '';

    const area = Number(input.area);
    const yieldKg = Number(input.yield);
    const quality = input.quality || 'good';

    const notes =
      typeof input.notes === 'string'
        ? input.notes.trim()
        : '';

    if (!crop || !date || !location) {
      return res.status(400).json({
        message: 'Please fill in all required harvest fields.'
      });
    }

    const parsedDate = new Date(`${date}T00:00:00Z`);

    const validDate =
      /^\d{4}-\d{2}-\d{2}$/.test(date) &&
      !Number.isNaN(parsedDate.getTime()) &&
      parsedDate.toISOString().slice(0, 10) === date;

    if (!validDate) {
      return res.status(400).json({
        message: 'Please enter a valid harvest date.'
      });
    }

    if (
      input.area === '' ||
      input.yield === '' ||
      !Number.isFinite(area) ||
      !Number.isFinite(yieldKg) ||
      area <= 0 ||
      yieldKg <= 0
    ) {
      return res.status(400).json({
        message: 'Harvest area and yield must be greater than zero.'
      });
    }

    if (!['excellent', 'good', 'poor'].includes(quality)) {
      return res.status(400).json({
        message: 'Please select a valid harvest quality.'
      });
    }

    const record = await Harvest.create({
      user: req.user.id,
      crop,
      date,
      location,
      area,
      yield: yieldKg,
      quality,
      notes
    });

    return res.status(201).json({
      message: `${crop} harvest logged successfully!`,
      record
    });

  } catch (err) {
    console.error('Error logging harvest:', err);

    return res.status(500).json({
      message: 'Error logging harvest.'
    });
  }
});


// DELETE harvest record — owner-scoped operation.
router.delete('/:id', async (req, res) => {

  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: 'Invalid harvest record ID.'
    });
  }

  try {

    const record =
      await Harvest.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id
      });

    if (!record) {
      return res.status(404).json({
        message: 'Record not found.'
      });
    }

    return res.json({
      message:
        `${record.crop} harvest record deleted.`
    });

  } catch (error) {

    console.error(
      'Harvest deletion error:',
      error
    );

    return res.status(500).json({
      message:
        'Could not confirm record deletion. ' +
        'Refresh before retrying.'
    });

  }
});


module.exports = router;
