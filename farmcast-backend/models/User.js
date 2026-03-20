// ============================================
// MODEL — User.js
// ============================================
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username:  { type: String, required: true, unique: true, trim: true },
  email:     { type: String, required: true, unique: true, trim: true, lowercase: true },
  password:  { type: String, required: true },
  // Profile
  name:      { type: String, default: '' },
  farmName:  { type: String, default: 'My Farm' },
  farmSize:  { type: String, default: '0' },
  role:      { type: String, default: 'owner' },
  phone:     { type: String, default: '' },
  avatar:    { type: String, default: '👨‍🌾' },
  // Location
  city:      { type: String, default: 'Manila' },
  lat:       { type: String, default: '' },
  lon:       { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
