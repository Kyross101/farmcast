// ============================================
// ROUTE — scanhistory.js
// GET    /api/scanhistory       - get all scan history
// POST   /api/scanhistory       - save new scan result
// DELETE /api/scanhistory/:id   - delete one scan
// DELETE /api/scanhistory       - clear all scans
// ============================================

const router      = require('express').Router();
const mongoose    = require('mongoose');
const ScanHistory = require('../models/ScanHistory');
const authMW      = require('../middleware/auth');

router.use(authMW);

// GET all scan history (newest first)

 // GET scan history (newest first).
 // Backup requests must not silently truncate records.
router.get('/', async (req, res) => {
  try {
    const backupRequest =
      req.query.backup === '1';

    const scans = await ScanHistory.find({
      user: req.user.id
    })
      .sort({ createdAt: -1 })
      .limit(backupRequest ? 51 : 50);

    /*
     * Normal UI keeps its existing 50-record view.
     * Backup mode checks one extra record so it
     * can detect unsupported, incomplete exports.
     */
    if (backupRequest && scans.length > 50) {
      return res.status(409).json({
        message:
          'More than 50 scan records exist. ' +
          'The current restore limit cannot ' +
          'preserve every scan. A complete ' +
          'backup cannot be created.'
      });
    }

    return res.json(scans);

  } catch (err) {
    console.error(
      'ScanHistory fetch error:',
      err
    );

    return res.status(500).json({
      message: 'Error fetching scan history.'
    });
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
      timestamp:  new Date(),
      disease:    disease ?? 'Unable to determine',
      severity:   severity ?? 'unknown',
      confidence: confidence ?? 0,
      imageData:  imageData  || '',
      notes:      notes      || '',
    });

    res.status(201).json({ 
      message: 
      'Scan result saved! 🌿', 
      scan 
    });

  } catch (err) {
    console.error(
      'ScanHistory save error:',
      err
    );

    res.status(500).json({
      message: 'Error saving scan result.'
    });
  }
  
});


// DELETE one scanner record — owner-scoped.
router.delete('/:id', async (req, res) => {

  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: 'Invalid scan ID.'
    });
  }

  try {

    const scan =
      await ScanHistory.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id
      });

    if (!scan) {
      return res.status(404).json({
        message: 'Scan not found.'
      });
    }

    return res.json({
      message: 'Scan deleted.'
    });

  } catch (error) {

    console.error(
      'Scan deletion error:',
      error
    );

    return res.status(500).json({
      message:
        'Could not confirm scan deletion. ' +
        'Refresh before retrying.'
    });

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
