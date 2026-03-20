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
  lastWatered:  { type: String, default: () => new Date().toISOString().split('T')[0] },
  wateredToday: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('IrrigationField', IrrigationFieldSchema);
