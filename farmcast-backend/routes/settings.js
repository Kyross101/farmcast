// ============================================
// ROUTE — settings.js
// GET /api/settings       - get user settings
// PUT /api/settings       - update/save settings
// ============================================

const router   = require('express').Router();
const Settings = require('../models/Settings');
const authMW   = require('../middleware/auth');

router.use(authMW);

// GET settings (auto-create default if none)
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne({ user: req.user.id });
    if (!settings) {
      settings = await Settings.create({ user: req.user.id });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching settings.' });
  }
});

// PUT save settings
router.put(
  '/',
  async (
    req,
    res
  ) => {

    try {

      /*
       * Only allow real FarmCast
       * preference fields.
       *
       * Account ownership (`user`) and
       * MongoDB metadata can never be
       * changed through this endpoint.
       */
      const allowedFields = [
        'rainAlert',
        'windAlert',
        'dailyBriefing',
        'briefingTime',
        'quietHours',
        'quietFrom',
        'quietUntil',
        'harvestReminderDays',
        'thresholdTemp',
        'favCrops',
        'calView',
        'defaultIrrigationMethod',
        'theme',
        'tempUnit',
        'windUnit',
        'fontSize',
        'defaultPage'
      ];


      const updates =
        {};


      allowedFields.forEach(
        field => {

          if (
            Object.prototype
              .hasOwnProperty
              .call(
                req.body,
                field
              )
          ) {

            updates[field] =
              req.body[field];

          }

        }
      );


      const settings =
        await Settings.findOneAndUpdate(
          {
            user:
              req.user.id
          },

          {
            $set:
              updates,

            $setOnInsert: {
              user:
                req.user.id
            }
          },

          {
            returnDocument:
              'after',

            upsert:
              true,

            runValidators:
              true,

            setDefaultsOnInsert:
              true
          }

        );


      res.json({
        message:
          'Settings saved!',

        settings
      });


    } catch (err) {

      /*
       * Validation errors should not be
       * reported as generic server errors.
       */
      if (
        err?.name ===
        'ValidationError'
      ) {

        return res
          .status(400)
          .json({
            message:
              'One or more settings values are invalid.'
          });

      }


      console.error(
        'Settings save error:',
        err
      );


      res
        .status(500)
        .json({
          message:
            'Error saving settings.'
        });

    }

  }
);

module.exports = router;
