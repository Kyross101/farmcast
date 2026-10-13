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
const IrrigationField = require('../models/IrrigationField');
const mongoose = require('mongoose');
const authMW = require('../middleware/auth');

// All routes require authentication
router.use(authMW);

// Verify irrigation field ownership and crop-specific access.
async function resolveOwnedIrrigationFieldId(
  value,
  userId,
  cropId = null
) {
  // Allow crops to have no linked field.
  if (value === null || value === undefined || value === '') {
    return null;
  }

  if (
    typeof value !== 'string' ||
    !/^[a-fA-F0-9]{24}$/.test(value)
  ) {
    const error = new Error('Invalid irrigation field ID.');
    error.status = 400;
    throw error;
  }

  const field = await IrrigationField.findOne({
    _id: value,
    user: userId,
    archivedAt: null
  }).select('_id sourceCropId');

  if (!field) {
    const error = new Error(
      'Irrigation field not found in your account.'
    );
    error.status = 404;
    throw error;
  }

  // Automatically created fields belong to one specific crop.
  // Manual fields have no sourceCropId and may be shared.
  if (
    field.sourceCropId &&
    (
      !cropId ||
      String(field.sourceCropId) !== String(cropId)
    )
  ) {
    const error = new Error(
      'This irrigation field is reserved for another crop. ' +
      'Choose a manual field or the correct crop field.'
    );

    error.status = 409;
    throw error;
  }

  return field._id;
}

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
      irrigationFieldId,
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

    const linkedFieldId = await resolveOwnedIrrigationFieldId(
      irrigationFieldId,
      req.user.id
    );

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
      irrigationFieldId: linkedFieldId,
      notes: notes || ''
    });

    res.status(201).json({ message: `${type} added successfully! 🌱`, crop });
  
    } catch (err) {
      if (err.status) {
        return res.status(err.status).json({
          message: err.message
        });
      }

      console.error('Add crop error:', err);

      return res.status(500).json({
        message: 'Error adding crop.'
      });
    }

});

// Automatically record watering from My Crops.
// Create an irrigation field only when the crop has none.
router.post('/:id/watering', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: 'Invalid crop ID.'
    });
  }

  const input =
    req.body &&
    typeof req.body === 'object' &&
    !Array.isArray(req.body)
      ? req.body
      : {};

  const date =
    typeof input.date === 'string'
      ? input.date.trim()
      : '';

  const parsed = new Date(`${date}T00:00:00Z`);

  const validDate =
    /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === date;

  const rawLiters = input.liters;
  const liters = Number(rawLiters);

  // Validate the required watering information
  // before processing any optional details.
  if (
    !validDate ||
    (
      typeof rawLiters !== 'number' &&
      typeof rawLiters !== 'string'
    ) ||
    String(rawLiters).trim() === '' ||
    !Number.isFinite(liters) ||
    liters < 0.01
  ) {
    return res.status(400).json({
      message:
        'Enter a valid watering date and actual liters used.'
    });
  }

  // Optional details entered by the farmer.
  // Never invent or automatically assume these values.
  const rawArea = input.areaWatered;

  const blankArea =
    rawArea === undefined ||
    rawArea === null ||
    (
      typeof rawArea === 'string' &&
      rawArea.trim() === ''
    );

  const areaWatered =
    blankArea ? null : Number(rawArea);

  const rawMethod = input.irrigationMethod ?? '';
  const rawSoil = input.soilCondition ?? '';
  const rawNotes = input.notes ?? '';

  // Validate all optional details before database changes.
  if (
    (
      !blankArea &&
      (
        !['number', 'string'].includes(typeof rawArea) ||
        !Number.isFinite(areaWatered) ||
        areaWatered < 0.01
      )
    ) ||
    typeof rawMethod !== 'string' ||
    typeof rawSoil !== 'string' ||
    typeof rawNotes !== 'string'
  ) {
    return res.status(400).json({
      message: 'Enter valid optional watering details.'
    });
  }

  const irrigationMethod = rawMethod.trim();
  const soilCondition = rawSoil.trim();
  const notes = rawNotes.trim();

  if (
    irrigationMethod.length > 60 ||
    !['', 'dry', 'slightly-dry', 'moist'].includes(
      soilCondition
    ) ||
    notes.length > 500
  ) {
    return res.status(400).json({
      message:
        'Check the irrigation method, soil condition, and notes.'
    });
  }

  try {

    const result = await mongoose.connection.transaction(
      async session => {
        const crop = await Crop.findOne({
          _id: req.params.id,
          user: req.user.id
        }).session(session);

        if (!crop) {
          const error = new Error(
            'Crop not found in your account.'
          );

          error.status = 404;
          throw error;
        }

        // If the farmer enters an area, it must not
        // exceed the recorded size of this crop.
        const cropArea = Number(crop.area);

        if (
          areaWatered !== null &&
          Number.isFinite(cropArea) &&
          cropArea > 0 &&
          areaWatered > cropArea
        ) {
          const error = new Error(
            'Area watered cannot exceed the crop area.'
          );

          error.status = 400;
          throw error;
        }

        // Validate the actual planting date before watering.
        const plantedDate =
          typeof crop.planted === 'string'
            ? crop.planted.trim()
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
            'Update My Crops before recording watering.'
          );

          error.status = 409;
          throw error;
        }

        // A crop cannot be watered before it was planted.
        if (date < plantedDate) {
          const error = new Error(
            'Watering date cannot be earlier than ' +
            'the crop planting date.'
          );

          error.status = 400;
          throw error;
        }

        let field;
        let createdField = false;
        let cropLinkChanged = false;

        // Reuse an existing, active irrigation field.
        if (crop.irrigationFieldId) {
          field = await IrrigationField.findOne({
            _id: crop.irrigationFieldId,
            user: req.user.id,
            archivedAt: null
          }).session(session);

          if (!field) {
            const error = new Error(
              'The selected crop has an unavailable irrigation field. ' +
              'Review the crop watering settings before retrying.'
            );

            error.status = 409;
            throw error;
          }

          // Defend against incorrect existing crop-to-field links.
          if (
            field.sourceCropId &&
            String(field.sourceCropId) !== String(crop._id)
          ) {
            const error = new Error(
              'This automatic irrigation field belongs to another crop. ' +
              'Change the crop watering settings before retrying.'
            );

            error.status = 409;
            throw error;
          }

        } else {
          // Reuse a previous automatic field for this exact crop.
          field = await IrrigationField.findOne({
            user: req.user.id,
            sourceCropId: crop._id,
            archivedAt: null
          }).session(session);

          if (!field) {
            const area = Number(crop.area);

            if (
              !Number.isFinite(area) ||
              area <= 0
            ) {
              const error = new Error(
                'Crop area is missing or invalid. ' +
                'Update My Crops before watering.'
              );

              error.status = 400;
              throw error;
            }

            const method = String(
              crop.irrigation || 'Manual'
            ).trim();

            field = new IrrigationField({
              user: req.user.id,

              // Stable identity for this crop.
              sourceCropId: crop._id,

              name: [
                crop.type,
                crop.location
              ].filter(Boolean).join(' — '),

              crop: crop.type,
              area,

              type:
                method === 'Rain'
                  ? 'Rain-fed'
                  : method,

              // Never invent a watering schedule.
              freq: null,
              waterAmt: 0,

              lastWatered: '',
              wateredToday: false
            });

            createdField = true;
          }

          // Restore the connection to the existing/new field.
          crop.irrigationFieldId = field._id;
          cropLinkChanged = true;
        }

        // If a crop uses an existing irrigation field,
        // validate the entered area against that field too.
        const linkedFieldArea = Number(field.area);

        if (
          areaWatered !== null &&
          Number.isFinite(linkedFieldArea) &&
          linkedFieldArea > 0 &&
          areaWatered > linkedFieldArea
        ) {
          const error = new Error(
            'Area watered cannot exceed the ' +
            'linked irrigation field area.'
          );

          error.status = 400;
          throw error;
        }

        // One recorded session per field per date.
        if (
          field.wateringHistory.some(
            entry => entry.date === date
          )
        ) {
          const error = new Error(
            'Watering was already recorded for this field on this date.'
          );

          error.status = 409;
          throw error;
        }

        field.wateringHistory.push({
          date,
          liters,

          // Exact crop receiving the water.
          cropId: crop._id,

          // Optional details entered by the farmer.
          areaWatered,
          irrigationMethod,
          soilCondition,
          notes,

          previousLastWatered:
            field.lastWatered || '',

          recordedAt: new Date()
        });

        // Preserve the latest known watering date.
        // Older entries must not move lastWatered backward.
        const previousLastWatered = String(
          field.lastWatered || ''
        );

        if (
          !previousLastWatered ||
          date > previousLastWatered
        ) {
          field.lastWatered = date;
        }

        // Retain the current status behavior for now.
        // Local-date status handling will be reviewed next.
        field.wateredToday = true;

        await field.save({ session });

        if (cropLinkChanged) {
          await crop.save({ session });
        }

        return {
          crop: crop.toObject(),
          field: field.toObject(),
          createdField
        };
      }
    );

    return res
      .status(result.createdField ? 201 : 200)
      .json({
        message:
          'Watering recorded and synced to Irrigation.',
        ...result
      });

  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        message: error.message
      });
    }

    console.error(
      'Automatic crop watering error:',
      error
    );

    return res.status(500).json({
      message:
        'Could not confirm watering. ' +
        'Refresh your records before retrying.'
    });
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
      'irrigationFieldId',
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

    // Link or unlink only after verifying field ownership.
    if (
      Object.prototype.hasOwnProperty.call(
        updates,
        'irrigationFieldId'
      )
    ) {
      updates.irrigationFieldId =
        await resolveOwnedIrrigationFieldId(
          updates.irrigationFieldId,
          req.user.id,
          req.params.id
        );
    }

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
      if (err.status) {
        return res.status(err.status).json({
          message: err.message
        });
      }

      console.error('Update crop error:', err);

      return res.status(500).json({
        message: 'Error updating crop.'
      });
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
