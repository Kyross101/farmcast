// ============================================
// ROUTE — scanhistory.js
// GET    /api/scanhistory       - get all scan history
// POST   /api/scanhistory       - save new scan result
// DELETE /api/scanhistory/:id   - delete one scan
// DELETE /api/scanhistory       - clear all scans
// ============================================

const router      = require('express').Router();
const ScanHistory = require('../models/ScanHistory');
const authMW      = require('../middleware/auth');

router.use(authMW);

// GET all scan history (newest first)
router.get('/', async (req, res) => {
  try {
    const scans = await ScanHistory.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(scans);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching scan history.' });
  }
});

// POST save scan result
router.post('/', async (req, res) => {
  try {
    const { plant, emoji, plantType, disease, severity, confidence, imageData, notes } = req.body;
    if (!plant) return res.status(400).json({ message: 'Plant name is required.' });

    const scan = await ScanHistory.create({
      user: req.user.id,
      plant,
      emoji:      emoji      || '🌿',
      plantType:  plantType  || 'Unknown',
      disease:    disease    || 'Healthy',
      severity:   severity   || 'none',
      confidence: confidence || 85,
      imageData:  imageData  || '',
      notes:      notes      || '',
    });

    res.status(201).json({ message: 'Scan result saved! 🌿', scan });
  } catch (err) {
    res.status(500).json({ message: 'Error saving scan result.' });
  }
});

// DELETE one scan
router.delete('/:id', async (req, res) => {
  try {
    const scan = await ScanHistory.findOne({ _id: req.params.id, user: req.user.id });
    if (!scan) return res.status(404).json({ message: 'Scan not found.' });
    await ScanHistory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Scan deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting scan.' });
  }
});

// DELETE all scans (clear history)
router.delete('/', async (req, res) => {
  try {
    await ScanHistory.deleteMany({ user: req.user.id });
    res.json({ message: 'Scan history cleared.' });
  } catch (err) {
    res.status(500).json({ message: 'Error clearing scan history.' });
  }
});

module.exports = router;
