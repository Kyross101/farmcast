// ============================================
// MODEL — PestLog.js
// ============================================
const mongoose = require('mongoose');

const PestLogSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pest:     { type: String, required: true },
  date:     { type: String, required: true },
  crop:     { type: String, required: true },
  location: { type: String, required: true },
  severity: { type: String, enum: ['low','medium','high'], default: 'low' },
  notes:    { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('PestLog', PestLogSchema);
