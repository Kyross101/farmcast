// ============================================
// MODEL — Crop.js
// ============================================
const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  type:       { type: String, required: true },

  plantingMethod: {
    type: String,
    enum: ['direct-seeded', 'transplanted'],
    default: 'direct-seeded'
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
  harvest:    { type: String, required: true },
  location:   { type: String, required: true },
  irrigation: { type: String, default: 'Manual' },
  notes:      { type: String, default: '' },
  watered:    { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Crop', CropSchema);
