// ============================================
// ROUTE — harvest.js
// GET    /api/harvest       - get all harvest records
// POST   /api/harvest       - log new harvest
// DELETE /api/harvest/:id   - delete harvest record
// ============================================

const router  = require('express').Router();
const Harvest = require('../models/Harvest');
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
    const { crop, date, location, area, yield: yieldKg, quality, notes } = req.body;
    if (!crop || !date || !location || !area || !yieldKg)
      return res.status(400).json({ message: 'Please fill in all required fields.' });

    const record = await Harvest.create({
      user: req.user.id,
      crop, date, location, area,
      yield: yieldKg,
      quality: quality || 'good',
      notes: notes || ''
    });
    res.status(201).json({ message: `${crop} harvest logged! 🌾`, record });
  } catch (err) {
    res.status(500).json({ message: 'Error logging harvest.' });
  }
});

// DELETE harvest record
router.delete('/:id', async (req, res) => {
  try {
    const record = await Harvest.findOne({ _id: req.params.id, user: req.user.id });
    if (!record) return res.status(404).json({ message: 'Record not found.' });

    await Harvest.findByIdAndDelete(req.params.id);
    res.json({ message: `${record.crop} harvest record deleted.` });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting record.' });
  }
});

module.exports = router;
