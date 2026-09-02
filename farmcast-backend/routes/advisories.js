const express = require('express');
const router = express.Router();

// ============================================================
// FARMCAST — OFFICIAL ADVISORIES
// Only verified advisories from official government sources
// should be added here.
// ============================================================

// Temporary official-advisory store.
// Later, this can be replaced by an authorized PAGASA feed/API.
const advisories = [];

// GET /api/advisories
router.get('/', (req, res) => {
  try {
    const now = new Date();

    const active = advisories
      .filter(advisory => {
        if (!advisory.validUntil) return true;

        const expiry = new Date(advisory.validUntil);

        return !Number.isNaN(expiry.getTime()) && expiry > now;
      })
      .sort((a, b) => {
        return new Date(b.issuedAt) - new Date(a.issuedAt);
      });

    res.json({
      success: true,
      source: 'Official government advisories',
      count: active.length,
      advisories: active
    });

  } catch (error) {
    console.error('Advisory route error:', error);

    res.status(500).json({
      success: false,
      message: 'Unable to load official advisories.'
    });
  }
});

module.exports = router;