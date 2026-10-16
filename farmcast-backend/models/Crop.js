// ============================================
// MODEL — Crop.js
// ============================================
const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  type: { type: String, required: true },

  variety: {
    type: String,
    trim: true,
    maxlength: 80,
    default: ''
  },

  plantingMethod: {
    type: String,
    required: true,
    trim: true,
    maxlength: 80,
    match: /^[a-z]+(?:-[a-z]+)*$/
  },
  
  currentStage: {
  type: String,
  enum: [
    'seedling',
    'vegetative',
    'flowering',
    'fruiting',
    'ready'
  ],
  default: 'seedling'
},

growthHistory: [
  {
    stage: {
      type: String,
      enum: [
        'seedling',
        'vegetative',
        'flowering',
        'fruiting',
        'ready'
      ],
      required: true
    },

    date: {
      type: String,
      required: true
    },

    note: {
      type: String,
      default: ''
    },

    source: {
      type: String,
      enum: ['farmer', 'system'],
      default: 'farmer'
    }
  }
],

  area:       { type: Number, required: true },
  planted:    { type: String, required: true },
  harvest: {
    type: String,
    default: ''
  },
  location:   { type: String, required: true },
  irrigation: { type: String, default: 'Manual' },

  // Optional link to a specific irrigation field.
  irrigationFieldId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'IrrigationField',
    default: null
  },

  notes: { type: String, default: '' },
  watered:    { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Crop', CropSchema);
