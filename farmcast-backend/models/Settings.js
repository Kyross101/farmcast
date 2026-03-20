// ============================================
// MODEL — Settings.js
// ============================================
const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  user:              { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  pestSensitivity:   { type: String, default: 'medium' },
  pestNotif:         { type: Boolean, default: true },
  rainAlert:         { type: Boolean, default: true },
  windAlert:         { type: Boolean, default: true },
  dailyBriefing:     { type: Boolean, default: true },
  briefingTime:      { type: String,  default: '05:00' },
  quietHours:        { type: Boolean, default: true },
  quietFrom:         { type: String,  default: '21:00' },
  quietUntil:        { type: String,  default: '06:00' },
  harvestReminderDays:{ type: Number, default: 7 },
  thresholdTemp:     { type: Number,  default: 35 },
  favCrops:          { type: [String], default: ['Rice','Corn','Tomato'] },
  calView:           { type: String,  default: 'calendar' },
  theme:             { type: String,  default: 'dark' },
  tempUnit:          { type: String,  default: 'C' },
  windUnit:          { type: String,  default: 'kph' },
  fontSize:          { type: String,  default: 'medium' },
  language:          { type: String,  default: 'en' },
  defaultPage:       { type: String,  default: 'dashboard' },
}, { timestamps: true });

module.exports = mongoose.model('Settings', SettingsSchema);
