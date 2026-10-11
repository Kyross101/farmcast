// ============================================
// ROUTE — crops.js
// All routes are protected (require JWT)
// GET    /api/crops        - get all crops of logged-in user
// POST   /api/crops        - add new crop
// PUT    /api/crops/:id    - update crop
// DELETE /api/crops/:id    - delete crop
// ============================================

const router = require('express').Router();
const Crop = require('../models/Crop');
const Harvest = require('../models/Harvest');
const mongoose = require('mongoose');
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
    const {
      type,
      variety,
      plantingMethod,
      area,
      planted,
      harvest,
      location,
      irrigation,
      notes
    } = req.body;

    if (
      !type ||
      !plantingMethod ||
      !area ||
      !planted ||
      !harvest ||
      !location
    ) {
      return res.status(400).json({
        message: 'Please fill in all required fields.'
      });
    }

    const crop = await Crop.create({
      user: req.user.id,
      type,
      variety: variety || '',
      plantingMethod,
      area,
      planted,
      harvest,
      location,
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

    const allowedUpdates = [
      'type',
      'variety',
      'plantingMethod',
      'area',
      'planted',
      'harvest',
      'location',
      'irrigation',
      'notes',
      'watered',
      'currentStage',
      'growthHistory'
    ];

    const updates = {};

    allowedUpdates.forEach(field => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    });

    const updated = await Crop.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id
      },
      updates,
      {
        returnDocument: 'after',
        runValidators: true
      }
    );

    res.json({ message: 'Crop updated!', crop: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating crop.' });
  }
});

// Complete harvest: record yield and remove active crop atomically.
router.post('/:id/harvest', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: 'Invalid crop ID.'
    });
  }

  const input = req.body || {};
  const date = String(input.date || '').trim();
  const location = String(input.location || '').trim();
  const area = Number(input.area);
  const yieldKg = Number(input.yield);
  const quality = input.quality || 'good';
  const notes = String(input.notes || '').trim();

  const parsedDate = new Date(`${date}T00:00:00Z`);
  const validDate =
    /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === date;

  if (
    !validDate ||
    !location ||
    !Number.isFinite(area) ||
    area <= 0 ||
    !Number.isFinite(yieldKg) ||
    yieldKg <= 0 ||
    !['excellent', 'good', 'poor'].includes(quality)
  ) {
    return res.status(400).json({
      message: 'Please provide valid harvest details.'
    });
  }

  let savedRecord;

  try {
    await mongoose.connection.transaction(async session => {
      const crop = await Crop.findOne({
        _id: req.params.id,
        user: req.user.id
      }).session(session);

      if (!crop) {
        const error = new Error(
          'Crop not found or already harvested. Check Harvest History.'
        );
        error.status = 404;
        throw error;
      }

      if (date < crop.planted) {
        const error = new Error(
          'Harvest date cannot be earlier than planting date.'
        );
        error.status = 400;
        throw error;
      }

      const records = await Harvest.create([{
        user: req.user.id,
        crop: crop.type,
        date,
        location,
        area,
        yield: yieldKg,
        quality,
        notes
      }], { session });

      savedRecord = records[0];

      const deletion = await Crop.deleteOne({
        _id: crop._id,
        user: req.user.id
      }).session(session);

      if (deletion.deletedCount !== 1) {
        throw new Error('Could not remove harvested crop.');
      }
    });

    return res.status(201).json({
      message: 'Harvest completed successfully.',
      record: savedRecord
    });

  } catch (error) {
    console.error('Harvest completion error:', error);

    return res.status(error.status || 500).json({
      message: error.status
        ? error.message
        : 'Could not confirm harvest completion. Check records before retrying.'
    });
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
