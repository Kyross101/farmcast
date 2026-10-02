// ============================================
// MODEL — Settings.js
// ============================================
const mongoose = require('mongoose');

const SettingsSchema =
  new mongoose.Schema(
    {

      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref:
          'User',
        required:
          true,
        unique:
          true
      },


      // Notifications
      rainAlert: {
        type:
          Boolean,
        default:
          true
      },

      windAlert: {
        type:
          Boolean,
        default:
          true
      },

      dailyBriefing: {
        type:
          Boolean,
        default:
          true
      },

      briefingTime: {
        type:
          String,

        match: [
          /^(?:[01]\d|2[0-3]):[0-5]\d$/,
          'Briefing time must use HH:MM format.'
        ],

        default:
          '05:00'
      },

      quietHours: {
        type:
          Boolean,
        default:
          true
      },

      quietFrom: {
        type:
          String,

      match: [
        /^(?:[01]\d|2[0-3]):[0-5]\d$/,
        'Quiet-hours start time must use HH:MM format.'
      ],

      default:
        '21:00'
    },

    quietUntil: {
      type:
        String,

      match: [
        /^(?:[01]\d|2[0-3]):[0-5]\d$/,
        'Quiet-hours end time must use HH:MM format.'
      ],

      default:
        '06:00'
    },

      harvestReminderDays: {
        type:
          Number,

        min:
          1,

        max:
          30,

        default:
          7
      },

      thresholdTemp: {
        type:
          Number,

      /*
       * Stored internally in Celsius.
       */
      min:
        20,

      max:
        45,

      default:
        35
    },


      // Crop preferences
      favCrops: {
        type:
          [String],
        default:
          [
            'Rice',
            'Corn',
            'Tomato'
          ]
      },

      calView: {
        type:
          String,
        enum: [
          'calendar',
          'list'
        ],
        default:
          'calendar'
      },

      defaultIrrigationMethod: {
        type:
          String,
        enum: [
          'Manual',
          'Drip',
          'Sprinkler',
          'Flood',
          'Rain-fed'
        ],
        default:
          'Manual'
      },


      // Display
      theme: {
        type:
          String,
        enum: [
          'dark',
          'light'
        ],
        default:
          'dark'
      },

      tempUnit: {
        type:
          String,
        enum: [
          'C',
          'F'
        ],
        default:
          'C'
      },

      windUnit: {
        type:
          String,
        enum: [
          'kph',
          'mph'
        ],
        default:
          'kph'
      },

      fontSize: {
        type:
          String,
        enum: [
          'small',
          'medium',
          'large'
        ],
        default:
          'medium'
      },


      // Navigation
      defaultPage: {
        type:
          String,

        enum: [
          'dashboard',
          'weather-maps',
          'planting-calendar',
          'my-crops'
        ],

        default:
          'dashboard'
      }

    },
    {
      timestamps:
        true
    }
  );

module.exports = mongoose.model('Settings', SettingsSchema);
