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


function sanitizeIrrigation(field, userId) {
  const clean = pickFields(field, [
    'name',
    'crop',
    'area',
    'type',
    'freq',
    'waterAmt',
    'lastWatered',
    'wateredToday'
  ]);

  const seenDates = new Set();

  clean.wateringHistory = Array.isArray(field.wateringHistory)
    ? field.wateringHistory
        .filter(entry => {
          if (
            !entry ||
            typeof entry.date !== 'string' ||
            !/^\d{4}-\d{2}-\d{2}$/.test(entry.date)
          ) {
            return false;
          }

          const parsed = new Date(
            `${entry.date}T00:00:00Z`
          );

          if (
            Number.isNaN(parsed.getTime()) ||
            parsed.toISOString().slice(0, 10) !== entry.date
          ) {
            return false;
          }

          const liters = Number(entry.liters);

          if (
            !Number.isFinite(liters) ||
            liters <= 0 ||
            seenDates.has(entry.date)
          ) {
            return false;
          }

          seenDates.add(entry.date);
          return true;
        })
        .map(entry => {
          const restored = {
            date: entry.date,
            liters: Number(entry.liters),

            previousLastWatered:
              typeof entry.previousLastWatered === 'string'
                ? entry.previousLastWatered
                : ''
          };

          if (
            entry.recordedAt &&
            !Number.isNaN(Date.parse(entry.recordedAt))
          ) {
            restored.recordedAt =
              new Date(entry.recordedAt);
          }

          return restored;
        })
    : [];
  
  // Preserve the archive status from the backup.
  // Older backups without archivedAt remain active.
  if (
    field.archivedAt !== undefined &&
    field.archivedAt !== null &&
    field.archivedAt !== ''
  ) {
    if (
      typeof field.archivedAt !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}T/.test(field.archivedAt) ||
      Number.isNaN(Date.parse(field.archivedAt))
    ) {
      const error = new Error(
        'Invalid archivedAt value in irrigation backup.'
      );

      error.status = 400;
      throw error;
    }

    clean.archivedAt = new Date(field.archivedAt);

  } else {
    clean.archivedAt = null;
  }

  clean.user = userId;

  return clean;
}

// Restore irrigation fields with fresh MongoDB IDs.
// Reconnect crops using the field IDs stored in the backup.
function prepareLinkedRestore(crops, irrigationFields, userId) {
  const fieldIdMap = new Map();

  const restoredIrrigation = irrigationFields.map(field => {
    const clean = sanitizeIrrigation(field, userId);

    // Assign a new ID instead of reusing another database ID.
    clean._id = new mongoose.Types.ObjectId();

    // FarmCast exports the frontend 'id' property.
    const oldId =
      typeof field.id === 'string'
        ? field.id
        : typeof field._id === 'string'
          ? field._id
          : '';

    if (/^[a-fA-F0-9]{24}$/.test(oldId)) {
      const key = oldId.toLowerCase();

      if (fieldIdMap.has(key)) {
        const error = new Error(
          'Duplicate irrigation field ID in backup.'
        );

        error.status = 400;
        throw error;
      }

      fieldIdMap.set(key, clean);
    }

    return clean;
  });

  const restoredCrops = crops.map(crop => {
    const clean = sanitizeCrop(crop, userId);
    const oldLink = crop.irrigationFieldId;

    // Older crops may not have any irrigation link.
    if (
      oldLink === undefined ||
      oldLink === null ||
      oldLink === ''
    ) {
      clean.irrigationFieldId = null;
      return clean;
    }

    if (
      typeof oldLink !== 'string' ||
      !/^[a-fA-F0-9]{24}$/.test(oldLink)
    ) {
      const error = new Error(
        'Invalid crop irrigation link in backup.'
      );

      error.status = 400;
      throw error;
    }

    const linkedField = fieldIdMap.get(
      oldLink.toLowerCase()
    );

    // Never restore broken or archived crop links.
    if (!linkedField || linkedField.archivedAt) {
      const error = new Error(
        'A crop links to an absent or archived ' +
        'irrigation field in this backup.'
      );

      error.status = 400;
      throw error;
    }

    clean.irrigationFieldId = linkedField._id;

    return clean;
  });

  return {
    restoredCrops,
    restoredIrrigation
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


    let restoredCrops;
    let restoredIrrigation;

    try {
      ({
        restoredCrops,
        restoredIrrigation
      } = prepareLinkedRestore(
        crops,
        irrigationFields,
        userId
      ));

    } catch (error) {
      return res.status(error.status || 400).json({
        message:
          error.message ||
          'Invalid crop or irrigation backup links.'
      });
    }


    const restoredHarvests =
      harvestHistory.map(
        record =>
          sanitizeHarvest(
            record,
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