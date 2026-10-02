// ============================================
// ROUTE — backup.js
// Transactional FarmCast workspace restore
// ============================================

const router =
  require('express').Router();

const mongoose =
  require('mongoose');

const Crop =
  require('../models/Crop');

const Harvest =
  require('../models/Harvest');

const IrrigationField =
  require('../models/IrrigationField');

const PestLog =
  require('../models/PestLog');

const ScanHistory =
  require('../models/ScanHistory');

const Settings =
  require('../models/Settings');

function isPlainObject(
  value
) {

  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value)
  );

}


function pickFields(
  source,
  allowedFields
) {

  const result = {};


  if (
    !isPlainObject(source)
  ) {
    return result;
  }


  allowedFields.forEach(
    field => {

      if (
        Object.prototype
          .hasOwnProperty
          .call(
            source,
            field
          )
      ) {

        result[field] =
          source[field];

      }

    }
  );


  return result;

}


function sanitizeCrop(
  crop,
  userId
) {

  const clean =
    pickFields(
      crop,
      [
        'type',
        'variety',
        'plantingMethod',
        'currentStage',
        'area',
        'planted',
        'harvest',
        'location',
        'irrigation',
        'notes',
        'watered'
      ]
    );


  clean.user =
    userId;


  clean.growthHistory =
    Array.isArray(
      crop.growthHistory
    )
      ? crop.growthHistory.map(
          entry =>
            pickFields(
              entry,
              [
                'stage',
                'date',
                'note',
                'source'
              ]
            )
        )
      : [];


  return clean;

}


function sanitizeHarvest(
  record,
  userId
) {

  return {
    ...pickFields(
      record,
      [
        'crop',
        'date',
        'location',
        'area',
        'yield',
        'quality',
        'notes'
      ]
    ),

    user:
      userId
  };

}


function sanitizeIrrigation(
  field,
  userId
) {

  return {
    ...pickFields(
      field,
      [
        'name',
        'crop',
        'area',
        'type',
        'freq',
        'waterAmt',
        'lastWatered',
        'wateredToday'
      ]
    ),

    user:
      userId
  };

}


function sanitizePestLog(
  log,
  userId
) {

  return {
    ...pickFields(
      log,
      [
        'pest',
        'date',
        'crop',
        'location',
        'severity',
        'notes'
      ]
    ),

    user:
      userId
  };

}


function sanitizeScan(
  scan,
  userId
) {

  const clean =
    pickFields(
      scan,
      [
        'plant',
        'emoji',
        'plantType',
        'disease',
        'severity',
        'confidence',
        'imageData',
        'notes'
      ]
    );


  /*
   * Local/offline scanner records use
   * "type", while MongoDB uses
   * "plantType".
   */
  if (
    !clean.plantType &&
    typeof scan.type ===
      'string' &&
    scan.type.trim()
  ) {

    clean.plantType =
      scan.type.trim();

  }


  /*
   * Preserve the original scan time.
   *
   * Older local records:
   *   timestamp
   *
   * Existing MongoDB backups:
   *   createdAt
   */
  const originalTimestamp =
    scan.timestamp ||
    scan.createdAt;


  if (
    originalTimestamp &&
    !Number.isNaN(
      Date.parse(
        originalTimestamp
      )
    )
  ) {

    clean.timestamp =
      new Date(
        originalTimestamp
      );

  }


  clean.user =
    userId;


  return clean;

}

function sanitizeRestoreSettings(
  settings
) {

  /*
   * Only preferences owned by the
   * Settings collection are restored.
   *
   * Account/profile/location identity
   * stays owned by the current user.
   */
  return pickFields(
    settings,
    [
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
    ]
  );

}

router.post(
  '/restore',
  async (
    req,
    res
  ) => {

    const {
      crops,
      harvestHistory,
      irrigationFields,
      pestLogs,
      scannerHistory,
      settings
    } =
      req.body || {};


    /*
     * All five server-backed collections
     * must exist before a destructive
     * restore is allowed.
     */
    if (
      !Array.isArray(crops) ||
      !Array.isArray(harvestHistory) ||
      !Array.isArray(irrigationFields) ||
      !Array.isArray(pestLogs) ||
      !Array.isArray(scannerHistory) ||
      !isPlainObject(settings)
    ) {

      return res
        .status(400)
        .json({
          message:
            'Invalid FarmCast restore payload.'
        });

    }


    /*
     * Basic server-side size guards.
     */
    if (
      crops.length > 500 ||
      harvestHistory.length > 5000 ||
      irrigationFields.length > 1000 ||
      pestLogs.length > 5000 ||
      scannerHistory.length > 50
    ) {

      return res
        .status(400)
        .json({
          message:
            'FarmCast restore payload exceeds supported record limits.'
        });

    }


    const userId =
      req.user.id;


    const restoredCrops =
      crops.map(
        crop =>
          sanitizeCrop(
            crop,
            userId
          )
      );


    const restoredHarvests =
      harvestHistory.map(
        record =>
          sanitizeHarvest(
            record,
            userId
          )
      );


    const restoredIrrigation =
      irrigationFields.map(
        field =>
          sanitizeIrrigation(
            field,
            userId
          )
      );


    const restoredPests =
      pestLogs.map(
        log =>
          sanitizePestLog(
            log,
            userId
          )
      );


    const restoredScans =
      scannerHistory.map(
        scan =>
          sanitizeScan(
            scan,
            userId
          )
      );
    
    const restoredSettings =
        sanitizeRestoreSettings(
           settings
        );


    const session =
      await mongoose.startSession();


    try {

      /*
       * Either the whole server workspace
       * is replaced successfully,
       * or MongoDB rolls everything back.
       */
      await session.withTransaction(
        async () => {

          await Crop.deleteMany(
            {
              user:
                userId
            },
            {
              session
            }
          );


          await Harvest.deleteMany(
            {
              user:
                userId
            },
            {
              session
            }
          );


          await IrrigationField.deleteMany(
            {
              user:
                userId
            },
            {
              session
            }
          );


          await PestLog.deleteMany(
            {
              user:
                userId
            },
            {
              session
            }
          );


          await ScanHistory.deleteMany(
            {
              user:
                userId
            },
            {
              session
            }
          );


          if (
            restoredCrops.length
          ) {

            await Crop.insertMany(
              restoredCrops,
              {
                session
              }
            );

          }


          if (
            restoredHarvests.length
          ) {

            await Harvest.insertMany(
              restoredHarvests,
              {
                session
              }
            );

          }


          if (
            restoredIrrigation.length
          ) {

            await IrrigationField.insertMany(
              restoredIrrigation,
              {
                session
              }
            );

          }


          if (
            restoredPests.length
          ) {

            await PestLog.insertMany(
              restoredPests,
              {
                session
              }
            );

          }


          if (
            restoredScans.length
          ) {

            await ScanHistory.insertMany(
              restoredScans,
              {
                session
              }
            );

          }
          await Settings.findOneAndUpdate(
            {
              user:
                userId
            },

            {
              $set:
                restoredSettings,

                $setOnInsert: {
                  user:
                    userId
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
                true,

              session
            }
        );

        }
      );


      return res.json({

        message:
          'FarmCast workspace restored successfully.',

        counts: {

          crops:
            restoredCrops.length,

          harvestHistory:
            restoredHarvests.length,

          irrigationFields:
            restoredIrrigation.length,

          pestLogs:
            restoredPests.length,

          scannerHistory:
            restoredScans.length

        }

      });


    } catch (error) {

      console.error(
        'FarmCast restore transaction failed:',
        error
      );


      return res
        .status(500)
        .json({
          message:
            'FarmCast workspace restore failed. Existing server data was preserved.'
        });


    } finally {

      await session.endSession();

    }

  }
);


module.exports =
  router;