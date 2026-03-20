// ============================================
// FARMCAST BACKEND — server.js
// Main Express server entry point
// ============================================
 
const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
require('dotenv').config();
 
const app = express();
 
// ── MIDDLEWARE ──
// Allow ALL localhost ports for development (Live Server uses different ports)
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    // Allow any localhost or 127.0.0.1 origin
    if (origin.match(/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '2mb' })); // Allow small thumbnails in scan history
 
// ── ROUTES ──
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/crops',       require('./routes/crops'));
app.use('/api/harvest',     require('./routes/harvest'));
app.use('/api/irrigation',  require('./routes/irrigation'));
app.use('/api/pests',       require('./routes/pests'));
app.use('/api/settings',    require('./routes/settings'));
app.use('/api/scanhistory', require('./routes/scanhistory'));
 
// ── HEALTH CHECK ──
app.get('/', (req, res) => {
  res.json({ message: '🌾 FarmCast API is running!', status: 'ok' });
});
 
// ── CONNECT TO MONGODB ──
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas!');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 FarmCast server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });