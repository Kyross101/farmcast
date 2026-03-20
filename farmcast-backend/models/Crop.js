// ============================================
// MODEL — Crop.js
// ============================================
const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type:       { type: String, required: true },
  area:       { type: Number, required: true },
  planted:    { type: String, required: true },
  harvest:    { type: String, required: true },
  location:   { type: String, required: true },
  irrigation: { type: String, default: 'Manual' },
  notes:      { type: String, default: '' },
  watered:    { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Crop', CropSchema);
