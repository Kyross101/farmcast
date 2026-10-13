// ============================================
// MODEL — IrrigationField.js
// ============================================
const mongoose = require('mongoose');

const IrrigationFieldSchema = new mongoose.Schema({
  user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:         { type: String, required: true },
  crop:         { type: String, required: true },
  area:         { type: Number, required: true },
  type:         { type: String, default: 'Manual' },
  freq:         { type: Number, default: 2 },
  waterAmt:     { type: Number, default: 0 },

  // No actual watering date exists when a field is created.
  // A date is saved only after confirmed watering.
  lastWatered: {
    type: String,
    default: ''
  },

  wateredToday: {
    type: Boolean,
    default: false
  },

  // Retain historical records when a field is retired.
  archivedAt: {
    type: Date,
    default: null
  },

  // Identifies which crop owns an automatically created field.
  // Manual fields do not need this relationship.
  sourceCropId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop',
    default: null
  },

    // Actual watering events.
    // Existing fields start with an empty history.
    wateringHistory: {
    type: [{
      // The specific crop watered.
      // Null means a field-level watering record.
      cropId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crop',
        default: null
      },

      date: {
        type: String,
        required: true,
        match: /^\d{4}-\d{2}-\d{2}$/
      },

      liters: {
        type: Number,
        required: true,
        min: 0.01
      },

      previousLastWatered: {
        type: String,
        default: ''
      },

      recordedAt: {
        type: Date,
        default: Date.now
      }
    }],
    default: []
  },

}, { timestamps: true });

// Prevent multiple active auto-generated fields for one crop.
// Manual fields and archived historical fields are excluded.
IrrigationFieldSchema.index(
  { user: 1, sourceCropId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      sourceCropId: { $type: 'objectId' },
      archivedAt: null
    }
  }
);

module.exports = mongoose.model('IrrigationField', IrrigationFieldSchema);
