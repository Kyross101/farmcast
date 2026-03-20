// ============================================
// MODEL — Harvest.js
// ============================================
const mongoose = require('mongoose');

const HarvestSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  crop:     { type: String, required: true },
  date:     { type: String, required: true },
  location: { type: String, required: true },
  area:     { type: Number, required: true },
  yield:    { type: Number, required: true },
  quality:  { type: String, enum: ['excellent','good','poor'], default: 'good' },
  notes:    { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Harvest', HarvestSchema);
