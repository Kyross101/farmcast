const express = require('express');
const router = express.Router();

const PAGASA_ADVISORY_INDEX =
  'https://pubfiles.pagasa.dost.gov.ph/tamss/weather/weather_advisory/';

// How recent an advisory file must be before FarmCast treats it as active.
// Conservative V1: 24 hours.
const ACTIVE_WINDOW_MS = 24 * 60 * 60 * 1000;


// ------------------------------------------------------------
// Convert PAGASA directory date:
// "31-Aug-2026 20:59"
// into a valid Date object.
//
// PAGASA timestamps on the public directory are treated as
// Philippine time (+08:00).
// ------------------------------------------------------------
function parsePagasaDate(value) {
  const match = value.match(
    /^(\d{2})-([A-Za-z]{3})-(\d{4})\s+(\d{2}):(\d{2})$/
  );

  if (!match) return null;

  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12'
  };

  const [, day, monthText, year, hour, minute] = match;
  const month = months[monthText];

  if (!month) return null;

  const date = new Date(
    `${year}-${month}-${day}T${hour}:${minute}:00+08:00`
  );

  return Number.isNaN(date.getTime())
    ? null
    : date;
}


// ------------------------------------------------------------
// Read PAGASA's official public advisory directory.
// This is webpage parsing — NOT a PAGASA API.
// ------------------------------------------------------------
async function fetchPagasaWeatherAdvisories() {
  const response = await fetch(PAGASA_ADVISORY_INDEX, {
    headers: {
      'User-Agent': 'FarmCast/1.0'
    }
  });

  if (!response.ok) {
    throw new Error(
      `PAGASA source returned HTTP ${response.status}`
    );
  }

  const html = await response.text();

  /*
    Apache-style directory listing example:

    <a href="Advisory%2343.pdf">Advisory#43.pdf</a>
    31-Aug-2026 20:59
  */

  const regex =
    /<a\s+href="([^"]+\.pdf)"[^>]*>([^<]+\.pdf)<\/a>\s*(\d{2}-[A-Za-z]{3}-\d{4}\s+\d{2}:\d{2})/gi;

  const files = [];

  let match;

  while ((match = regex.exec(html)) !== null) {
    const href = match[1];
    const filename = match[2].trim();
    const dateText = match[3];

    const issuedAt = parsePagasaDate(dateText);

    if (!issuedAt) continue;

    files.push({
      filename,
      sourceUrl: new URL(
        href,
        PAGASA_ADVISORY_INDEX
      ).href,
      issuedAt
    });
  }

  return files.sort(
    (a, b) => b.issuedAt - a.issuedAt
  );
}


// ------------------------------------------------------------
// GET /api/advisories
// ------------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const files = await fetchPagasaWeatherAdvisories();

    const now = Date.now();

    const recentFiles = files.filter(file => {
      const age = now - file.issuedAt.getTime();

      return (
        age >= 0 &&
        age <= ACTIVE_WINDOW_MS
      );
    });

    const advisories = recentFiles.map(file => ({
      id: `pagasa-weather-${file.filename}-${file.issuedAt.getTime()}`,

      source: 'DOST-PAGASA',

      title: 'Weather Advisory',

      message:
        'DOST-PAGASA has published an official weather advisory. Open the official source document for the complete advisory details.',

      location: 'Philippines',

      issuedAt: file.issuedAt.toISOString(),

      validUntil: null,

      sourceUrl: file.sourceUrl,

      documentName: file.filename
    }));

    res.json({
      success: true,

      source: 'DOST-PAGASA',

      sourceType: 'official-public-files',

      count: advisories.length,

      advisories
    });

  } catch (error) {
    console.error(
      'PAGASA advisory error:',
      error.message
    );

    // Important:
    // Don't fabricate advisories if PAGASA is unreachable.
    res.status(503).json({
      success: false,

      source: 'DOST-PAGASA',

      count: 0,

      advisories: [],

      message:
        'Official PAGASA advisory source is temporarily unavailable.'
    });
  }
});

module.exports = router;