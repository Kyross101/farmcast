// ============================================
// FARMCAST BACKEND — server.js
// Main Express server entry point
// ============================================

const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const path       = require('path');
require('dotenv').config();

const app = express();

// ── MIDDLEWARE ──
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (origin.match(/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/)) return callback(null, true);
    if (origin.match(/\.onrender\.com$/)) return callback(null, true);
    if (origin.match(/\.railway\.app$/)) return callback(null, true);
    if (origin.match(/\.github\.io$/)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '2mb' }));

// ── SERVE FRONTEND STATIC FILES ──
app.use(express.static(path.join(__dirname, '..')));

// ── API ROUTES ──
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/crops',       require('./routes/crops'));
app.use('/api/harvest',     require('./routes/harvest'));
app.use('/api/irrigation',  require('./routes/irrigation'));
app.use('/api/pests',       require('./routes/pests'));
app.use('/api/settings',    require('./routes/settings'));
app.use('/api/scanhistory', require('./routes/scanhistory'));

// ── HEALTH CHECK ──
app.get('/health', (req, res) => {
  res.json({ message: '🌾 FarmCast API is running!', status: 'ok' });
});

// ── SERVE LOGIN PAGE (default) ──
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'login.html'));
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
