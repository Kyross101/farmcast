// ============================================
// ROUTE — irrigation.js
// GET    /api/irrigation        - get all fields
// POST   /api/irrigation        - add field
// PUT    /api/irrigation/:id    - update field (toggle watered, edit)
// DELETE /api/irrigation/:id    - delete field
// ============================================

const router          = require('express').Router();
const IrrigationField = require('../models/IrrigationField');
const Crop = require('../models/Crop');
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

// POST add field — validate farmer irrigation data
router.post('/', async (req, res) => {
  try {
    const input = req.body || {};

    const name =
      typeof input.name === 'string'
        ? input.name.trim()
        : '';

    const crop =
      typeof input.crop === 'string'
        ? input.crop.trim()
        : '';

    const type =
      typeof input.type === 'string' && input.type.trim()
        ? input.type.trim()
        : 'Manual';

    const validNumberInput = value =>
      (typeof value === 'number' ||
        typeof value === 'string') &&
      String(value).trim() !== '';

    const area = Number(input.area);
    const freq = Number(input.freq ?? 2);
    const waterAmt = Number(input.waterAmt ?? 0);

    if (!name || !crop) {
      return res.status(400).json({
        message: 'Please enter a field name and crop.'
      });
    }

    if (
      !validNumberInput(input.area) ||
      !Number.isFinite(area) ||
      area <= 0
    ) {
      return res.status(400).json({
        message: 'Field area must be greater than zero.'
      });
    }

    if (
      !validNumberInput(input.freq ?? 2) ||
      !Number.isInteger(freq) ||
      freq < 1
    ) {
      return res.status(400).json({
        message: 'Watering frequency must be a positive whole number.'
      });
    }

    if (
      !validNumberInput(input.waterAmt ?? 0) ||
      !Number.isFinite(waterAmt) ||
      waterAmt < 0
    ) {
      return res.status(400).json({
        message: 'Water amount cannot be negative.'
      });
    }

    const field = await IrrigationField.create({
      user: req.user.id,
      name,
      crop,
      area,
      type,
      freq,
      waterAmt
    });

    return res.status(201).json({
      message: `${name} added to irrigation successfully!`,
      field
    });

  } catch (err) {
    console.error('Error adding irrigation field:', err);

    if (
      err.name === 'ValidationError' ||
      err.name === 'CastError'
    ) {
      return res.status(400).json({
        message: 'Invalid irrigation field information.'
      });
    }

    return res.status(500).json({
      message: 'Error adding irrigation field.'
    });
  }
});

// POST record or undo one watering session.
// Only the authenticated owner can change the field.
router.post('/:id/watering', async (req, res) => {
  const mongoose = require('mongoose');

  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: 'Invalid irrigation field ID.'
    });
  }

  const input =
    req.body &&
    typeof req.body === 'object' &&
    !Array.isArray(req.body)
      ? req.body
      : {};

  const action = input.action;
  const date = String(input.date || '').trim();

  const parsedDate = new Date(`${date}T00:00:00Z`);

  const validDate =
    /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === date;

  if (!validDate || !['water', 'undo'].includes(action)) {
    return res.status(400).json({
      message: 'Invalid watering action or date.'
    });
  }

  const liters = Number(input.liters);

  if (
    action === 'water' &&
    (
      (typeof input.liters !== 'number' &&
       typeof input.liters !== 'string') ||
      String(input.liters).trim() === '' ||
      !Number.isFinite(liters) ||
      liters <= 0
    )
  ) {
    return res.status(400).json({
      message: 'Enter the actual water used in liters.'
    });
  }

  let updatedField;

  try {
    await mongoose.connection.transaction(async session => {
      const field = await IrrigationField.findOne({
        _id: req.params.id,
        user: req.user.id
      }).session(session);

      if (!field) {
        const error = new Error('Irrigation field not found.');
        error.status = 404;
        throw error;
      }

      const existing = field.wateringHistory.find(
        event => event.date === date
      );

      if (action === 'water') {
        // Maximum one recorded session per field per date.
        // Repeated requests do not create duplicate entries.
        if (!existing) {
          field.wateringHistory.push({
            date,
            liters,
            previousLastWatered: field.lastWatered || '',
            recordedAt: new Date()
          });
        }

        field.lastWatered = date;
        field.wateredToday = true;

      } else {
        if (!existing) {
          const error = new Error(
            'No recorded watering session for this date.'
          );
          error.status = 409;
          throw error;
        }

        if (field.lastWatered !== date) {
          const error = new Error(
            'Only the latest watering session can be undone.'
          );
          error.status = 409;
          throw error;
        }

        field.lastWatered =
          existing.previousLastWatered || '';

        field.wateredToday = false;
        field.wateringHistory.pull(existing._id);
      }

      await field.save({ session });
      updatedField = field.toObject();
    });

    return res.json({
      message: action === 'water'
        ? 'Watering recorded successfully.'
        : 'Watering record undone.',
      field: updatedField
    });

  } catch (error) {
    console.error('Watering history error:', error);

    return res.status(error.status || 500).json({
      message: error.status
        ? error.message
        : 'Could not confirm watering changes. Check records before retrying.'
    });
  }
});

// PUT update field — secure and account-specific
router.put('/:id', async (req, res) => {
  try {
    const allowedFields = [
      'name',
      'crop',
      'area',
      'type',
      'freq',
      'waterAmt',
      'lastWatered',
      'wateredToday'
    ];

    const input =
      req.body &&
      typeof req.body === 'object' &&
      !Array.isArray(req.body)
        ? req.body
        : {};

    const requestedFields = Object.keys(input);

    // Prevent updates to user, _id, or other protected fields.
    const invalidFields = requestedFields.filter(
      field => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
      return res.status(400).json({
        message: 'Request contains unsupported irrigation fields.'
      });
    }

    if (requestedFields.length === 0) {
      return res.status(400).json({
        message: 'No irrigation changes provided.'
      });
    }

    const updates = {};

    allowedFields.forEach(field => {
      if (Object.prototype.hasOwnProperty.call(input, field)) {
        updates[field] = input[field];
      }
    });

    // Match both the record ID and authenticated owner.
    const updated = await IrrigationField.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id
      },
      {
        $set: updates
      },
      {
        returnDocument: 'after',
        runValidators: true
      }
    );

    if (!updated) {
      return res.status(404).json({
        message: 'Irrigation field not found.'
      });
    }

    return res.json({
      message: 'Irrigation field updated successfully!',
      field: updated
    });

  } catch (err) {
    console.error('Irrigation update error:', err);

    if (
      err.name === 'ValidationError' ||
      err.name === 'CastError'
    ) {
      return res.status(400).json({
        message: 'Invalid irrigation field information.'
      });
    }

    return res.status(500).json({
      message: 'Error updating irrigation field.'
    });
  }
});

// DELETE only unused fields without watering history.
router.delete('/:id', async (req, res) => {
  const mongoose = require('mongoose');

  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: 'Invalid irrigation field ID.'
    });
  }

  try {
    const result = await mongoose.connection.transaction(
      async session => {
        const field = await IrrigationField.findOne({
          _id: req.params.id,
          user: req.user.id
        }).session(session);

        if (!field) {
          return {
            status: 404,
            message: 'Irrigation field not found.'
          };
        }

        // Preserve all recorded watering sessions.
        if (field.wateringHistory?.length > 0) {
          return {
            status: 409,
            message:
              'This field has watering history. ' +
              'Keep it for accurate records. ' +
              'Archiving will be added separately.'
          };
        }

        // Do not break existing My Crops connections.
        const linkedCrop = await Crop.exists({
          user: req.user.id,
          irrigationFieldId: field._id
        }).session(session);

        if (linkedCrop) {
          return {
            status: 409,
            message:
              'This field is linked to a crop. ' +
              'Unlink the crop before deleting the field.'
          };
        }

        const deletion = await IrrigationField.deleteOne({
          _id: field._id,
          user: req.user.id,
          'wateringHistory.0': { $exists: false }
        }).session(session);

        if (deletion.deletedCount !== 1) {
          throw new Error(
            'Irrigation field changed during deletion.'
          );
        }

        return {
          status: 200,
          name: field.name
        };
      }
    );

    if (result.status !== 200) {
      return res.status(result.status).json({
        message: result.message
      });
    }

    return res.json({
      message: `${result.name} deleted.`
    });

  } catch (error) {
    console.error(
      'Protected irrigation deletion failed:',
      error
    );

    return res.status(500).json({
      message:
        'Could not confirm deletion. ' +
        'Refresh your fields before retrying.'
    });
  }
});

module.exports = router;
