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
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    // Allow localhost for development
    if (origin.match(/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/)) {
      return callback(null, true);
    }
    // Allow Render deployment URLs
    if (origin.match(/\.onrender\.com$/)) {
      return callback(null, true);
    }
    // Allow Railway deployment URLs
    if (origin.match(/\.railway\.app$/)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '2mb' }));

// ── SERVE FRONTEND STATIC FILES ──
// Serve HTML, CSS, JS files from the parent farmcast folder
app.use(express.static(path.join(__dirname, '..')));

// ── ROUTES ──
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/crops',       require('./routes/crops'));
app.use('/api/harvest',     require('./routes/harvest'));
app.use('/api/irrigation',  require('./routes/irrigation'));
app.use('/api/pests',       require('./routes/pests'));
app.use('/api/settings',    require('./routes/settings'));
app.use('/api/scanhistory', require('./routes/scanhistory'));

// ── SERVE PAGES ──
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'login.html'));
});
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dashboard.html'));
});
// Default route — serve login page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'login.html'));
});

// ── HEALTH CHECK ──
app.get('/health', (req, res) => {
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