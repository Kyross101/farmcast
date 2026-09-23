const express = require('express');
const router = express.Router();

const PAGASA_ADVISORY_INDEX =
  'https://pubfiles.pagasa.dost.gov.ph/tamss/weather/weather_advisory/';

const PAGASA_TROPICAL_CYCLONE_INDEX =
  'https://pubfiles.pagasa.dost.gov.ph/tamss/weather/bulletin/';

const PAGASA_DAILY_WEATHER_URL =
  'https://origin.pagasa.dost.gov.ph/weather';

const PAGASA_TROPICAL_CYCLONE_ADVISORY_URL =
  'https://pubfiles.pagasa.dost.gov.ph/tamss/weather/tcadvisory.pdf';

// How recent an advisory document must be before FarmCast displays it.
// This is a FarmCast recency window, not PAGASA's official validity period.
const FARMCAST_RECENT_WINDOW_MS =
  24 * 60 * 60 * 1000;


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
// Clean storm names taken from PAGASA bulletin filenames.
// ------------------------------------------------------------
function normalizeStormName(
  rawName
) {
  let name =
    String(
      rawName || ''
    ).trim();

  try {
    name =
      decodeURIComponent(
        name
      );
  } catch {
  // Keep the original text if
  // URL decoding is not possible.
}

  return name
    .replace(
      /[_-]+/g,
      ' '
    )
    .replace(
      /\s+/g,
      ' '
    )
    .trim();
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
// Read PAGASA Tropical Cyclone Bulletins.
// Example:
// TCB#10_francisco.pdf
// ------------------------------------------------------------
async function fetchPagasaTropicalCycloneBulletins() {
  const response =
    await fetch(
      PAGASA_TROPICAL_CYCLONE_INDEX,
      {
        headers: {
          'User-Agent':
            'FarmCast/1.0'
        }
      }
    );

  if (!response.ok) {
    throw new Error(
      `PAGASA tropical cyclone source returned HTTP ${response.status}`
    );
  }

  const html =
    await response.text();

  const regex =
    /<a\s+href="([^"]+\.pdf)"[^>]*>(TCB#(\d+)_([^<]+)\.pdf)<\/a>\s*(\d{2}-[A-Za-z]{3}-\d{4}\s+\d{2}:\d{2})/gi;

  const bulletins = [];

  const seenBulletins =
    new Set();

  let match;

  while (
    (match =
      regex.exec(html)) !== null
  ) {
    const href =
      match[1];

    const filename =
      match[2].trim();


    const bulletinNumber =
      Number(match[3]);

    if (
      !Number.isInteger(
        bulletinNumber
      ) ||
      bulletinNumber <= 0
    ) {
      continue;
    }

    const stormName =
      normalizeStormName(
        match[4]
      );

    if (
      !stormName ||
      stormName.length < 2
    ) {
      continue;
    }

    const dateText =
      match[5];

    const issuedAt =
      parsePagasaDate(
        dateText
      );

    if (!issuedAt) {
      continue;
    }

    const duplicateKey =
      [
        stormName.toLowerCase(),
        bulletinNumber,
        issuedAt.toISOString()
      ].join('::');

    if (
      seenBulletins.has(
        duplicateKey
      )
    ) {
      continue;
    }

    seenBulletins.add(
      duplicateKey
    );

    bulletins.push({
      filename,

      bulletinNumber,

      stormName,

      issuedAt,

      sourceUrl:
        new URL(
          href,
          PAGASA_TROPICAL_CYCLONE_INDEX
        ).href
    });
  }

  return bulletins.sort(
    (a, b) => {
      const timeDiff =
        b.issuedAt -
        a.issuedAt;

      if (timeDiff !== 0) {
        return timeDiff;
      }

      return (
        b.bulletinNumber -
        a.bulletinNumber
      );
    }
  );
}

// ------------------------------------------------------------
// Read PAGASA Daily Weather for tropical cyclones
// that are still OUTSIDE PAR.
//
// This is used as a fallback when PAGASA has not yet
// published a Tropical Cyclone Bulletin in the PAR
// bulletin directory.
// ------------------------------------------------------------
async function fetchPagasaOutsideParCyclone() {
  const response =
    await fetch(
      PAGASA_DAILY_WEATHER_URL,
      {
        headers: {
          'User-Agent':
            'FarmCast/1.0'
        }
      }
    );

  if (!response.ok) {
    throw new Error(
      `PAGASA daily weather source returned HTTP ${response.status}`
    );
  }

  const html =
    await response.text();

  // Convert PAGASA HTML into readable lines
  // without adding another dependency.
  const plainText =
    html
      .replace(
        /<script[\s\S]*?<\/script>/gi,
        ' '
      )
      .replace(
        /<style[\s\S]*?<\/style>/gi,
        ' '
      )
      .replace(
        /<br\s*\/?>/gi,
        '\n'
      )
      .replace(
        /<\/(?:p|div|h[1-6]|li|tr|td|th|section|article)>/gi,
        '\n'
      )
      .replace(
        /<[^>]+>/g,
        ' '
      )
      .replace(
        /&nbsp;|&#160;/gi,
        ' '
      )
      .replace(
        /&deg;|&#176;/gi,
        '°'
      )
      .replace(
        /&amp;/gi,
        '&'
      )
      .replace(
        /&quot;/gi,
        '"'
      )
      .replace(
        /&#39;|&apos;/gi,
        "'"
      );

    const normalizedText =
    plainText
      .replace(
        /\s+/g,
        ' '
      )
      .trim();

  const cycloneMatch =
    normalizedText.match(
      /TROPICAL CYCLONE OUTSIDE PAR AS OF\s+(.+?)\s+(SUPER TYPHOON|SEVERE TROPICAL STORM|TROPICAL STORM|TROPICAL DEPRESSION|TYPHOON)\b\s*(.*?)\s+LOCATION:\s*(.+?)\s+MAXIMUM SUSTAINED WINDS:\s*(.+?)\s+GUSTINESS:\s*(.+?)\s+MOVEMENT:\s*(.+?)(?=\s+(?:Forecast Weather Conditions|Forecast Wind and Coastal Water Conditions|Temperature and Relative Humidity|Tides and Astronomical Information)|$)/i
    );

  // No Outside-PAR cyclone found
  // in the PAGASA Daily Weather content.
  if (!cycloneMatch) {
    return null;
  }

  const [
    ,
    rawAsOf,
    rawClassification,
    rawStormName,
    rawLocation,
    rawMaximumSustainedWinds,
    rawGustiness,
    rawMovement
  ] =
    cycloneMatch;

  const asOf =
    String(
      rawAsOf || ''
    ).trim();

  const classification =
    String(
      rawClassification ||
      'TROPICAL CYCLONE'
    )
      .trim()
      .toUpperCase();

  const stormName =
    String(
      rawStormName || ''
    ).trim() || null;

  const location =
    String(
      rawLocation || ''
    ).trim();

  const maximumSustainedWinds =
    String(
      rawMaximumSustainedWinds || ''
    ).trim();

  const gustiness =
    String(
      rawGustiness || ''
    ).trim();

  const movement =
    String(
      rawMovement || ''
    ).trim();

  const issuedMatch =
    normalizedText.match(
      /Issued at:\s*(.+?)(?=\s+Synopsis\b)/i
    );

  const issuedText =
    issuedMatch
      ? String(
          issuedMatch[1] || ''
        ).trim()
      : '';

  const synopsisMatch =
    normalizedText.match(
      /\bSynopsis\s+(.+?)(?=\s+(?:TC Information|TROPICAL CYCLONE OUTSIDE PAR AS OF)\b)/i
    );

  const synopsis =
    synopsisMatch
      ? String(
          synopsisMatch[1] || ''
        ).trim()
      : '';

  return {
    source:
      'DOST-PAGASA',

    type:
      'tropical-cyclone-outside-par',

    classification,

    stormName,

    status:
      'Outside PAR',

    asOf,

    issuedText,

    location,

    maximumSustainedWinds,

    gustiness,

    movement,

    synopsis,

    sourceUrl:
      PAGASA_TROPICAL_CYCLONE_ADVISORY_URL
  };
}

// ------------------------------------------------------------
// Keep only recent bulletins and the latest bulletin
// for each tropical cyclone.
// ------------------------------------------------------------
function getRecentLatestCycloneBulletins(
  bulletins
) {
  const now =
    Date.now();

  const latestByStorm =
    new Map();

  for (
    const bulletin of bulletins
  ) {
    const age =
      now -
      bulletin.issuedAt.getTime();

    if (
      age < 0 ||
      age > FARMCAST_RECENT_WINDOW_MS
    ) {
      continue;
    }

    const stormKey =
      bulletin.stormName
        .trim()
        .toLowerCase();

    if (
      !stormKey ||
      latestByStorm.has(
        stormKey
      )
    ) {
      continue;
    }

    latestByStorm.set(
      stormKey,
      bulletin
    );
  }

  return Array.from(
    latestByStorm.values()
  );
}

// ------------------------------------------------------------
// GET /api/advisories
// ------------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    let files = [];
    let weatherAdvisorySourceAvailable =
      false;

    try {
      files =
        await fetchPagasaWeatherAdvisories();

      weatherAdvisorySourceAvailable =
        true;
    } catch (advisoryError) {
      console.error(
        'PAGASA weather advisory source error:',
        advisoryError.message
      );
    }

    let cycloneBulletins = [];
    let cycloneSourceAvailable =
      false;

    try {
      const allCycloneBulletins =
        await fetchPagasaTropicalCycloneBulletins();

      cycloneBulletins =
        getRecentLatestCycloneBulletins(
          allCycloneBulletins
        );

      cycloneSourceAvailable =
        true;

    } catch (cycloneError) {
      console.error(
        'PAGASA tropical cyclone source error:',
        cycloneError.message
      );
    }

        let outsideParCyclone =
      null;

    let dailyWeatherSourceAvailable =
      false;

    try {
      outsideParCyclone =
        await fetchPagasaOutsideParCyclone();

      dailyWeatherSourceAvailable =
        true;

    } catch (dailyWeatherError) {
      console.error(
        'PAGASA daily weather source error:',
        dailyWeatherError.message
      );
    }

    const now =
      Date.now();

    const recentFiles = files.filter(file => {
      const age = now - file.issuedAt.getTime();

      return (
        age >= 0 &&
        age <= FARMCAST_RECENT_WINDOW_MS
      );
    });

    const advisories = recentFiles.map(file => ({
      id: `pagasa-weather-${file.filename}-${file.issuedAt.getTime()}`,

      source: 'DOST-PAGASA',

      title: 'Weather Advisory',

      message:
        'DOST-PAGASA has published an official weather advisory. Open the official source document for the complete advisory details.',

      location: 'See official advisory for affected areas',

      issuedAt: file.issuedAt.toISOString(),

      validUntil: null,

      sourceUrl: file.sourceUrl,

      documentName: file.filename
    }));

    const cycloneAdvisories =
      cycloneBulletins.map(
        bulletin => ({
          id:
            `pagasa-tcb-${bulletin.filename}-${bulletin.issuedAt.getTime()}`,

          source:
            'DOST-PAGASA',

          type:
            'tropical-cyclone-bulletin',

          title:
            `Tropical Cyclone Bulletin #${bulletin.bulletinNumber} — ${bulletin.stormName.toUpperCase()}`,

          message:
            'Open the official DOST-PAGASA bulletin for complete storm details, warnings, and affected areas.',

          location:
            'See official bulletin for affected areas',

          issuedAt:
            bulletin.issuedAt.toISOString(),

          validUntil:
            null,

          sourceUrl:
            bulletin.sourceUrl,

          documentName:
            bulletin.filename,

          stormName:
            bulletin.stormName,

          bulletinNumber:
            bulletin.bulletinNumber
        })
      );

    

    const combinedAdvisories = [
      ...cycloneAdvisories,
      ...advisories
    ].sort((a, b) => {
      const aTime =
        new Date(
          a.issuedAt || 0
        ).getTime();

      const bTime =
        new Date(
          b.issuedAt || 0
        ).getTime();

      return (
        (Number.isFinite(bTime)
          ? bTime
          : 0) -
        (Number.isFinite(aTime)
          ? aTime
          : 0)
      );
    });

    res.json({
      success: true,

      source: 'DOST-PAGASA',

      sourceType: 'official-public-files',

            sources: {
              weatherAdvisories:
                weatherAdvisorySourceAvailable,

              tropicalCycloneBulletins:
                cycloneSourceAvailable,

              dailyWeather:
                dailyWeatherSourceAvailable
            },

            outsideParCyclone,

            count: combinedAdvisories.length,

            advisories: combinedAdvisories
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