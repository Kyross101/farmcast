// ============================================
// ROUTE — crops.js
// All routes are protected (require JWT)
// GET    /api/crops        - get all crops of logged-in user
// POST   /api/crops        - add new crop
// PUT    /api/crops/:id    - update crop
// DELETE /api/crops/:id    - delete crop
// ============================================

const router = require('express').Router();
const Crop   = require('../models/Crop');
const authMW = require('../middleware/auth');

// All routes require authentication
router.use(authMW);

// GET all crops
router.get('/', async (req, res) => {
  try {
    const crops = await Crop.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching crops.' });
  }
});

// POST add crop
router.post('/', async (req, res) => {
  try {
    const { type, area, planted, harvest, location, irrigation, notes } = req.body;
    if (!type || !area || !planted || !harvest || !location)
      return res.status(400).json({ message: 'Please fill in all required fields.' });

    const crop = await Crop.create({
      user: req.user.id,
      type, area, planted, harvest, location,
      irrigation: irrigation || 'Manual',
      notes: notes || ''
    });
    res.status(201).json({ message: `${type} added successfully! 🌱`, crop });
  } catch (err) {
    res.status(500).json({ message: 'Error adding crop.' });
  }
});

// PUT update crop (edit details or toggle watered)
router.put('/:id', async (req, res) => {
  try {
    const crop = await Crop.findOne({ _id: req.params.id, user: req.user.id });
    if (!crop) return res.status(404).json({ message: 'Crop not found.' });

    const updated = await Crop.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.json({ message: 'Crop updated!', crop: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating crop.' });
  }
});

// DELETE crop
router.delete('/:id', async (req, res) => {
  try {
    const crop = await Crop.findOne({ _id: req.params.id, user: req.user.id });
    if (!crop) return res.status(404).json({ message: 'Crop not found.' });

    await Crop.findByIdAndDelete(req.params.id);
    res.json({ message: `${crop.type} deleted successfully.` });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting crop.' });
  }
});

module.exports = router;
