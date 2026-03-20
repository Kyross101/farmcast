// ============================================
// MODEL — ScanHistory.js
// Stores AI plant scan results per user
// ============================================
const mongoose = require('mongoose');

const ScanHistorySchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plant:      { type: String, required: true },
  emoji:      { type: String, default: '🌿' },
  plantType:  { type: String, default: 'Unknown' },
  disease:    { type: String, default: 'Healthy' },
  severity:   { type: String, enum: ['none','low','medium','high'], default: 'none' },
  confidence: { type: Number, default: 85 },
  imageData:  { type: String, default: '' }, // base64 image (optional)
  notes:      { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('ScanHistory', ScanHistorySchema);
