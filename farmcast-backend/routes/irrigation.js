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

      if (field.archivedAt) {
        const error = new Error(
          'Archived fields cannot be watered or edited.'
        );
        error.status = 409;
        throw error;
      }

      const existing = field.wateringHistory.find(

        event => event.date === date
      );

      if (action === 'water') {

        // One watering session per field per date.
        // Repeated requests must not change existing records.
        if (!existing) {

          // Auto-generated fields must respect the
          // original crop's planting date.
          if (field.sourceCropId) {
            const sourceCrop = await Crop.findOne({
              _id: field.sourceCropId,
              user: req.user.id
            })
              .select('planted')
              .session(session);

            if (!sourceCrop) {
              const error = new Error(
                'The original crop is no longer active. ' +
                'Review this irrigation field before watering.'
              );

              error.status = 409;
              throw error;
            }

            const plantedDate =
              typeof sourceCrop.planted === 'string'
                ? sourceCrop.planted.trim()
                : '';

            const parsedPlanted = new Date(
              `${plantedDate}T00:00:00Z`
            );

            const validPlantedDate =
              /^\d{4}-\d{2}-\d{2}$/.test(plantedDate) &&
              !Number.isNaN(parsedPlanted.getTime()) &&
              parsedPlanted.toISOString().slice(0, 10) ===
                plantedDate;

            if (!validPlantedDate) {
              const error = new Error(
                'Crop planting date is invalid. ' +
                'Update My Crops before watering.'
              );

              error.status = 409;
              throw error;
            }

            if (date < plantedDate) {
              const error = new Error(
                'Watering date cannot be earlier than ' +
                'the crop planting date.'
              );

              error.status = 400;
              throw error;
            }
          }

          const previousLastWatered =
            field.lastWatered || '';

          field.wateringHistory.push({
            date,
            liters,

            cropId: field.sourceCropId || null,

            previousLastWatered,
            recordedAt: new Date()
          });

          // Never move the latest watering date backward.
          if (
            !previousLastWatered ||
            date > previousLastWatered
          ) {
            field.lastWatered = date;
          }

          // Existing compatibility flag.
          // Local-date accuracy will be handled separately.
          field.wateredToday = true;
        }

      } else {

        if (!existing) {
          const error = new Error(
            'No recorded watering session for this date.'
          );

          error.status = 409;
          throw error;
        }

        // Undo only the most recently ADDED session.
        // This preserves the previousLastWatered snapshot,
        // even when older dates were added later.
        const latestEntry =
          field.wateringHistory[
            field.wateringHistory.length - 1
          ];

        if (
          String(latestEntry?._id) !==
          String(existing._id)
        ) {
          const error = new Error(
            'Only the most recently recorded watering ' +
            'session can be undone.'
          );

          error.status = 409;
          throw error;
        }

        // Restore the date from before this session.
        field.lastWatered =
          existing.previousLastWatered || '';

        field.wateredToday = false;

        // Remove only the selected event.
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

// Archive a field without deleting watering history.
router.post('/:id/archive', async (req, res) => {
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

        // Repeated archive requests are safe.
        if (field.archivedAt) {
          return {
            status: 200,
            field: field.toObject(),
            alreadyArchived: true
          };
        }

        // Do not interrupt watering for linked crops.
        const linkedCrop = await Crop.exists({
          user: req.user.id,
          irrigationFieldId: field._id
        }).session(session);

        if (linkedCrop) {
          return {
            status: 409,
            message:
              'Unlink active crops from this field ' +
              'before archiving it.'
          };
        }

        field.archivedAt = new Date();
        field.wateredToday = false;

        await field.save({ session });

        return {
          status: 200,
          field: field.toObject(),
          alreadyArchived: false
        };
      }
    );

    if (result.status !== 200) {
      return res.status(result.status).json({
        message: result.message
      });
    }

    return res.json({
      message: result.alreadyArchived
        ? 'Field is already archived.'
        : 'Field archived. Watering history preserved.',
      field: result.field
    });

  } catch (error) {
    console.error('Irrigation archive error:', error);

    return res.status(500).json({
      message:
        'Could not confirm archiving. ' +
        'Refresh your fields before retrying.'
    });
  }
});

// Restore an archived field without deleting its history.
router.post('/:id/restore', async (req, res) => {
  const mongoose = require('mongoose');

  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: 'Invalid irrigation field ID.'
    });
  }

  try {
    // Only the owner can restore an archived field.
    const restored = await IrrigationField.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
        archivedAt: {
          $exists: true,
          $ne: null
        }
      },
      {
        $set: {
          archivedAt: null,
          wateredToday: false
        }
      },
      {
        returnDocument: 'after',
        runValidators: true
      }
    );

    if (restored) {
      return res.json({
        message: 'Irrigation field restored.',
        field: restored
      });
    }

    // Do not modify an already-active field.
    const existing = await IrrigationField.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!existing) {
      return res.status(404).json({
        message: 'Irrigation field not found.'
      });
    }

    return res.json({
      message: 'Irrigation field is already active.',
      field: existing
    });

  } catch (error) {
    console.error('Irrigation restore error:', error);

    return res.status(500).json({
      message:
        'Could not confirm field restoration. ' +
        'Refresh before retrying.'
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
        user: req.user.id,
        archivedAt: null
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

        if (field.archivedAt) {
          return {
            status: 409,
            message:
              'Archived fields are retained for historical records.'
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
