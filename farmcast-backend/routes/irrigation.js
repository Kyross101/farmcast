// ============================================
// ROUTE — irrigation.js
// GET    /api/irrigation        - get all fields
// POST   /api/irrigation        - add field
// PUT    /api/irrigation/:id    - update field (toggle watered, edit)
// DELETE /api/irrigation/:id    - delete field
// ============================================

const router          = require('express').Router();
const IrrigationField = require('../models/IrrigationField');
const authMW          = require('../middleware/auth');

router.use(authMW);

// GET all fields
router.get('/', async (req, res) => {
  try {
    const fields = await IrrigationField.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(fields);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching irrigation fields.' });
  }
});

// POST add field
router.post('/', async (req, res) => {
  try {
    const { name, crop, area, type, freq, waterAmt } = req.body;
    if (!name || !crop || !area)
      return res.status(400).json({ message: 'Please fill in all required fields.' });

    const field = await IrrigationField.create({
      user: req.user.id,
      name, crop, area,
      type: type || 'Manual',
      freq: freq || 2,
      waterAmt: waterAmt || 0,
    });
    res.status(201).json({ message: `${name} added to irrigation! 💧`, field });
  } catch (err) {
    res.status(500).json({ message: 'Error adding field.' });
  }
});

// PUT update field
router.put('/:id', async (req, res) => {
  try {
    const field = await IrrigationField.findOne({ _id: req.params.id, user: req.user.id });
    if (!field) return res.status(404).json({ message: 'Field not found.' });

    const updated = await IrrigationField.findByIdAndUpdate(
      req.params.id, { ...req.body }, { new: true }
    );
    res.json({ message: 'Field updated!', field: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating field.' });
  }
});

// DELETE field
router.delete('/:id', async (req, res) => {
  try {
    const field = await IrrigationField.findOne({ _id: req.params.id, user: req.user.id });
    if (!field) return res.status(404).json({ message: 'Field not found.' });

    await IrrigationField.findByIdAndDelete(req.params.id);
    res.json({ message: `${field.name} deleted.` });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting field.' });
  }
});

module.exports = router;
