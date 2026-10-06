// ═══════════════════════════════════════════
// FARMCAST — Main Application Script
// ═══════════════════════════════════════════
const CARTO_API_KEY = 'cb1_2kci_1_b5ea7c7c5d649df09e91ba41';
const API_KEY = 'd0b23ea9dcaa2c9af041da23885eb307'; // OWM API key
// Roboflow API config – DEPRECATED, removed
// Python AI Server (YOLOv8 plant and disease models)
// Local FastAPI Server Base URL
const AI_SERVER_URL = window.FARMCAST_CONFIG.AI_URL; // ← Ilagay mo dito ang URL ng iyong AI server

const RAINVIEWER_API_URL = 'https://api.rainviewer.com/public/weather-maps.json';
// ============================================================
// FARMCAST AI — LOCAL PLANT & DISEASE DETECTION
// Uses the Python FastAPI server with local YOLO models.
// ============================================================

let currentCity = 'San Miguel, Bulacan';
let currentWeather = null;

// State variables
let aiCurrentCropId   = null;
let aiCurrentCropType = null;
let aiImageData       = null;
let aiCameraStream    = null; 
let aiReady = true; // Always ready - no model loading needed!

// ── RAINVIEWER RADAR ──

let radarFrames = [];
let radarHost = '';
let radarLayer = null;
let radarFrameIndex = 0;
let radarAnimationTimer = null;
let radarIsPlaying = false;

// ── ANIMATED WIND FLOW ──

let windFlowLayer = null;
let windFlowLoading = false;

let WIND_GRID = {
  north: 28,
  south: 0,
  west: 108,
  east: 142,
  step: 2,
};

let windFlowRefreshTimer = null;
let windFlowAutoRefreshBound = false;
let windFlowLastRefresh = 0;
let windFlowLastGridKey = '';

let windFlowLastApiRequest = 0;
let windFlowApiCooldownUntil = 0;

const WIND_FLOW_MIN_API_INTERVAL =
  300000; // 5 minutes

const WIND_FLOW_429_BACKOFF =
  900000; // 15 minutes

let windFlowDataCache = null;
let windFlowDataCacheKey = '';
let windFlowDataCacheTime = 0;

const WIND_FLOW_CACHE_TTL =
  600000; // 10 minutes


// ── CROPS DATA ──
const CROPS =
  window.FARMCAST_CROPS ||
  [];


if (
  !Array.isArray(
    window.FARMCAST_CROPS
  )
) {

  console.error(
    'FarmCast crop dataset failed to load.'
  );

}


// ── CROP DATASET INTEGRITY CHECK ──
function validateFarmCastCropDataset(
  crops = []
) {

  const MINIMUM_CROP_COUNT =
    100;

  const TARGET_CROP_COUNT =
    300;

  const issues = [];

  const seenNames =
    new Set();


  if (!Array.isArray(crops)) {

    return {
      valid: false,

      minimumCount:
        MINIMUM_CROP_COUNT,

      expectedCount:
        TARGET_CROP_COUNT,

      actualCount: 0,

      issues: [
        'Crop dataset is not an array.'
      ]
    };

  }


  if (
    crops.length <
      MINIMUM_CROP_COUNT ||
    crops.length >
      TARGET_CROP_COUNT
  ) {

    issues.push(
      `Crop dataset count ${crops.length} is outside the supported range of ${MINIMUM_CROP_COUNT}–${TARGET_CROP_COUNT}.`
    );

  }


  crops.forEach(
    (crop, index) => {

      const cropNumber =
        index + 1;

      const cropName =
        String(
          crop?.name ||
          ''
        ).trim();

      const cropLabel =
        cropName
          ? `#${cropNumber} ${cropName}`
          : `#${cropNumber}`;


      const normalizedName =
        cropName.toLowerCase();


      // Crop name
      if (!cropName) {

        issues.push(
          `${cropLabel}: missing crop name.`
        );

      } else if (
        seenNames.has(
          normalizedName
        )
      ) {

        issues.push(
          `${cropLabel}: duplicate crop name.`
        );

      } else {

        seenNames.add(
          normalizedName
        );

      }


      // Category
      if (
        !String(
          crop?.category ||
          ''
        ).trim()
      ) {

        issues.push(
          `${cropLabel}: missing category.`
        );

      }


      // Local SVG icon path
      const iconPath =
        String(
          crop?.icon ||
          ''
        ).trim();


      if (
        !/^assets\/crops\/.+\.svg$/i
          .test(iconPath)
      ) {

        issues.push(
          `${cropLabel}: invalid or missing crop SVG path.`
        );

      }


      // General crop reference
      const cropSourceUrl =
        String(
          crop?.source?.url ||
          ''
        ).trim();


      if (!cropSourceUrl) {

        issues.push(
          `${cropLabel}: missing crop source URL.`
        );

      }


      // Planting method source
      const methodSourceUrl =
        String(
          crop
            ?.plantingMethodSource
            ?.url ||
          ''
        ).trim();


      if (!methodSourceUrl) {

        issues.push(
          `${cropLabel}: missing planting-method source URL.`
        );

      }


      // Planting methods
      const plantingMethods =
        crop?.plantingMethods;


      if (
        !Array.isArray(
          plantingMethods
        ) ||
        plantingMethods.length === 0
      ) {

        issues.push(
          `${cropLabel}: no planting methods defined.`
        );

      } else {

        const methodValues =
          new Set();


        plantingMethods.forEach(
          (method, methodIndex) => {

            const value =
              String(
                method?.value ||
                ''
              ).trim();

            const label =
              String(
                method?.label ||
                ''
              ).trim();


            if (!value) {

              issues.push(
                `${cropLabel}: planting method #${methodIndex + 1} is missing a value.`
              );

            }


            if (!label) {

              issues.push(
                `${cropLabel}: planting method #${methodIndex + 1} is missing a label.`
              );

            }


            if (
              value &&
              methodValues.has(value)
            ) {

              issues.push(
                `${cropLabel}: duplicate planting method "${value}".`
              );

            }


            if (value) {

              methodValues.add(
                value
              );

            }

          }
        );

      }

    }
  );


  return {
    valid:
      issues.length === 0,

    minimumCount:
      MINIMUM_CROP_COUNT,

    expectedCount:
      TARGET_CROP_COUNT,

    actualCount:
      crops.length,

    issues
  };

}


const farmCastCropDatasetReport =
  validateFarmCastCropDataset(
    CROPS
  );


window.FARMCAST_CROP_DATASET_REPORT =
  farmCastCropDatasetReport;


if (
  farmCastCropDatasetReport.valid
) {

  console.info(
    `✅ FarmCast crop dataset passed integrity check (${farmCastCropDatasetReport.actualCount}/${farmCastCropDatasetReport.expectedCount}).`
  );

} else {

  console.error(
    '❌ FarmCast crop dataset integrity check failed:',
    farmCastCropDatasetReport.issues
  );

}

// ── PLANTING CALENDAR FILTER STATE ──
let plantingCropSearch = '';
let plantingCropCategory = 'all';

let lastPlantingForecastData = null;
let lastPlantingCurrentData = null;


function formatCropCategory(category) {
  return category
    .split('-')
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ');
}


function getFilteredPlantingCrops() {

  const search =
    plantingCropSearch
      .trim()
      .toLowerCase();

  return getFarmCastSelectableCropReferences()
    .filter(crop => {

    const matchesCategory =
      plantingCropCategory === 'all' ||
      crop.category === plantingCropCategory;

    const searchableText = [
      crop.name,
      crop.localName,
      crop.variety,
      crop.category
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const matchesSearch =
      !search ||
      searchableText.includes(search);

    return matchesCategory && matchesSearch;
  });
}

// ── STABLE CROP SELECTION ──
function getPlantingCropSeed(text) {

  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    hash =
      ((hash << 5) - hash) +
      text.charCodeAt(i);

    hash |= 0;
  }

  return hash >>> 0;
}


function pickStablePlantingCrops(
  crops,
  seed,
  count = 2
) {

  return [...crops]
    .sort((a, b) => {

      const scoreA =
        getPlantingCropSeed(
          `${seed}|${a.name}`
        );

      const scoreB =
        getPlantingCropSeed(
          `${seed}|${b.name}`
        );

      return scoreA - scoreB;

    })
    .slice(0, count);
}


function updatePlantingCropCount(count) {

  const countEl =
    document.getElementById('plantingCropCount');

  if (countEl) {
    countEl.textContent = count;
  }
}


function applyPlantingCropFilters() {

  const searchInput =
    document.getElementById('plantingCropSearch');

  const categorySelect =
    document.getElementById('plantingCategoryFilter');

  plantingCropSearch =
    searchInput?.value || '';

  plantingCropCategory =
    categorySelect?.value || 'all';

  const filtered =
    getFilteredPlantingCrops();

  updatePlantingCropCount(filtered.length);

  if (
    lastPlantingForecastData &&
    lastPlantingCurrentData
  ) {
    renderForecastAndCalendar(
      lastPlantingForecastData,
      lastPlantingCurrentData
    );
  }
}


function initPlantingCropFilters() {

  const select =
    document.getElementById('plantingCategoryFilter');

  if (!select) return;


  const plantingCrops =
    getFarmCastSelectableCropReferences();


  const categories = [
    ...new Set(
      plantingCrops
        .map(crop => crop.category)
        .filter(Boolean)
    )
  ].sort();


  select.innerHTML =
    '<option value="all">All Categories</option>' +
    categories.map(category => `
      <option value="${category}">
        ${formatCropCategory(category)}
      </option>
    `).join('');


  updatePlantingCropCount(
    plantingCrops.length
  );
}


if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    initPlantingCropFilters
  );

} else {

  initPlantingCropFilters();

}

// ── PLANTING CROP DETAILS ──

function escapePlantingDetail(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}


function plantingDetailRow(label, value) {

  if (
    value === null ||
    value === undefined ||
    value === ''
  ) {
    return '';
  }

  return `
    <div class="planting-detail-row">
      <div class="planting-detail-label">
        ${escapePlantingDetail(label)}
      </div>

      <div class="planting-detail-value">
        ${escapePlantingDetail(value)}
      </div>
    </div>
  `;
}

function normalizeCropReferenceSource(sourceData) {
  if (!sourceData) return null;

  // Legacy crop-data.js format:
  // source: 'Department of Agriculture...'
  if (typeof sourceData === 'string') {
    return {
      agency: sourceData,
      office: '',
      title: '',
      url: null
    };
  }

  if (
    typeof sourceData === 'object' &&
    !Array.isArray(sourceData)
  ) {
    return {
      agency: sourceData.agency || '',
      office: sourceData.office || '',
      title: sourceData.title || '',
      url: getSafeCropReferenceUrl(
        sourceData.url
      )
    };
  }

  return null;
}


function getSafeCropReferenceUrl(value) {
  if (
    !value ||
    typeof value !== 'string'
  ) {
    return null;
  }

  try {
    const url = new URL(value);

    if (
      url.protocol !== 'https:' &&
      url.protocol !== 'http:'
    ) {
      return null;
    }

    return url.href;

  } catch {
    return null;
  }
}


function renderCropReferenceSource(
  sourceData,
  heading = 'Official Crop Reference'
) {

  const reference =
    normalizeCropReferenceSource(
      sourceData
    );

  if (!reference) return '';

  const agencyText = [
    reference.agency,
    reference.office
  ]
    .filter(Boolean)
    .join(' — ');

  return `
    <div class="planting-reference-item">

      <span class="material-symbols-outlined">
        verified
      </span>

      <div>

      <strong>
        ${escapePlantingDetail(heading)}
      </strong>

      ${
        agencyText
          ? `
            <div class="cmi-source-agency">
              ${escapePlantingDetail(
                agencyText
              )}
            </div>
          `
          : ''
      }

      ${
        reference.title
          ? `
            <div class="cmi-source-title">
              ${escapePlantingDetail(
                reference.title
              )}
            </div>
          `
          : ''
      }

      ${
        reference.url
          ? `
            <a
              class="cmi-source-link"
              href="${escapePlantingDetail(
                reference.url
              )}"
              target="_blank"
              rel="noopener noreferrer"
              onclick="event.stopPropagation()"
            >
              View official reference ↗
            </a>
          `
          : ''
      }

      </div>

    </div>
  `;
}


function openPlantingCropDetails(
  cropName,
  status = '',
  reason = ''
) {

  const crop =
    getFarmCastSelectableCropReferences()
      .find(
        item =>
          item.name === cropName
      );

  if (!crop) {
    toast('Crop information not found.', 'warn');
    return;
  }

  const modal =
    document.getElementById(
      'plantingCropDetailsModal'
    );

  const icon =
    document.getElementById(
      'plantingDetailsIcon'
    );

  const name =
    document.getElementById(
      'plantingDetailsName'
    );

  const sub =
    document.getElementById(
      'plantingDetailsSub'
    );

  const statusEl =
    document.getElementById(
      'plantingDetailsStatus'
    );

  const grid =
    document.getElementById(
      'plantingDetailsGrid'
    );

  const note =
    document.getElementById(
      'plantingDetailsNote'
    );

  const source =
    document.getElementById(
      'plantingDetailsSource'
    );


  // Crop icon
  icon.src = crop.icon;
  icon.alt = crop.name;


  // Crop name
  name.textContent = crop.name;


  // Local name / variety
  const subtitleParts = [];

  if (crop.localName) {
    subtitleParts.push(crop.localName);
  }

  if (crop.variety) {
    subtitleParts.push(crop.variety);
  }

  subtitleParts.push(
    formatCropCategory(crop.category)
  );

  sub.textContent =
    subtitleParts.join(' • ');


  // Current weather assessment
  if (status && reason) {

    statusEl.innerHTML = `
      <div class="crop-badge badge-${status}">
        ${escapePlantingDetail(
          status.toUpperCase()
        )}
      </div>

      <span>
        ${escapePlantingDetail(reason)}
      </span>
    `;

    statusEl.style.display = 'flex';

  } else {

    statusEl.style.display = 'none';

  }


  // Temperature information
  let temperatureGuide =
    'No verified temperature range stored';

  if (
    Number.isFinite(crop.minTemp) &&
    Number.isFinite(crop.maxTemp)
  ) {

    temperatureGuide =
      `${crop.minTemp}°C – ${crop.maxTemp}°C`;

  } else if (Number.isFinite(crop.minTemp)) {

    temperatureGuide =
      `Minimum ${crop.minTemp}°C`;

  } else if (Number.isFinite(crop.maxTemp)) {

    temperatureGuide =
      `Maximum ${crop.maxTemp}°C`;

  }


  // Dynamic reference information
  grid.innerHTML = [

    plantingDetailRow(
      'Category',
      formatCropCategory(crop.category)
    ),

    plantingDetailRow(
      'Planting / Establishment Method',
      Array.isArray(crop.plantingMethods)
        ? crop.plantingMethods
            .map(method => method.label)
            .filter(Boolean)
            .join(' / ')
        : null
    ),

    plantingDetailRow(
      'Temperature Guide',
      temperatureGuide
    ),

    plantingDetailRow(
      'Ideal Temperature',
      Number.isFinite(crop.idealTemp)
        ? `${crop.idealTemp}°C`
        : null
    ),

    plantingDetailRow(
      'Soil pH',
      crop.soilPH
    ),

    plantingDetailRow(
      'Cold Damage Below',
      Number.isFinite(crop.coldDamageBelow)
       ? `${crop.coldDamageBelow}°C`
        : null
    ),

    plantingDetailRow(
      'Planting Season',
      crop.plantingSeason
    ),

    plantingDetailRow(
      'Planting Distance',
      crop.plantingDistance
    ),

    plantingDetailRow(
      'Elevation',
      crop.elevationNote
    ),

    plantingDetailRow(
      'Annual Rainfall',
      crop.annualRainfall
    ),

    plantingDetailRow(
      'Support',
      crop.supportNote
    ),

    plantingDetailRow(
      'Productive Life',
      crop.lifespanNote
    ),

    plantingDetailRow(
      'Harvest',
      crop.harvestNote
    )

  ].join('');


  // Planting note
  if (crop.plantingNote) {

    note.innerHTML = `
      <div class="planting-detail-section-title">
        Planting Guide
      </div>

      <div>
        ${escapePlantingDetail(
          crop.plantingNote
        )}
      </div>
    `;

    note.style.display = 'block';

  } else {

    note.style.display = 'none';

  }


  // Reference sources
  const plantingMethodReferenceHtml =
    renderCropReferenceSource(
      crop.plantingMethodSource,
      'Planting Method Reference'
    );

  const cropReferenceHtml =
    renderCropReferenceSource(
      crop.source,
      'Official Crop Reference'
    );

  const referenceHtml = [
    plantingMethodReferenceHtml,
    cropReferenceHtml
  ]
    .filter(Boolean)
    .join('');

  if (referenceHtml) {

    source.innerHTML =
      referenceHtml;

    source.style.display =
      'flex';

  } else {

    source.innerHTML = '';

    source.style.display =
      'none';

  }


  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}


function closePlantingCropDetails() {

  const modal =
    document.getElementById(
      'plantingCropDetailsModal'
    );

  if (!modal) return;

  modal.style.display = 'none';
  document.body.style.overflow = '';
}

// ── PEST REFERENCE DATA ──


const PESTS = [
  {
    name: 'Aphids',
    icon: 'assets/ui/pest-aphids.svg',

    // No generic FarmCast weather trigger.
    // Aphid activity varies by species,
    // host crop, temperature, and field conditions.
    
  
    detail:
      'Monitor young leaves and tender growth for visible aphid colonies.',
  
    level: 'monitor',
  
    reference: {
      name: 'UC IPM — Aphids',
      url:
        'https://ipm.ucanr.edu/home-and-landscape/aphids/'
    }
  },

  {
    name: 'Rice Stem Borer',

    icon:
      'assets/ui/pest-stem-borer.svg',

    // No generic temperature trigger.
    // Rice stem-borer risk depends on
    // pest species, crop stage, field
    // conditions, and local pest pressure.
    

    detail:
      'Monitor rice plants for stem-borer symptoms and confirm pest presence through field inspection.',

    level: 'monitor',

    reference: {
      name:
        'DA-PhilRice — Rice Stemborer Advisory',

      url:
        'https://www.philrice.gov.ph/philrice-warns-of-major-rice-pest-threats-in-early-2026/'
    }
  },


  {
    name: 'Asian Corn Borer',

    icon:
      'assets/ui/pest-stem-borer.svg',

    // Separate corn pest.
    // No generic FarmCast weather
    // threshold is applied.
    

    detail:
      'Monitor corn plants for feeding and stalk-boring damage and confirm infestation through field inspection.',

    level: 'monitor',

    reference: {
      name:
        'Department of Agriculture — Asian Corn Borer',

      url:
        'https://bicol.da.gov.ph/wp-content/uploads/2019/03/Earwigs-Trichogramma-Biological-Control-against-Asian-Corn-Borer.pdf'
    }
  },

  {
    name: 'Whitefly',

    icon:
      'assets/ui/pest-whitefly.svg',

    // Whitefly development can be
    // influenced by temperature, host
    // plants, dust, natural enemies,
    // and other field conditions.
    // No generic humidity threshold.
    

    detail:
      'Monitor leaf undersides for whitefly adults and nymphs, especially on susceptible crops.',

    level: 'monitor',

    reference: {
      name:
        'UC IPM — Whiteflies',

      url:
        'https://ipm.ucanr.edu/home-and-landscape/whiteflies/'
    }
  },

  {
    name:
      'Phytophthora Root & Crown Rot',

    icon:
      'assets/ui/pest-root-rot.svg',

    // Rain alone does not confirm disease.
    // Prolonged saturated soil, standing
    // water, and poor drainage can favor
    // Phytophthora root and crown rot.
    
  
    detail:
      'Monitor susceptible crops when soil remains saturated or waterlogged, especially in poorly drained areas.',
  
    level: 'monitor',
  
    reference: {
      name:
        'UC IPM — Phytophthora Root and Crown Rot',
  
      url:
        'https://ipm.ucanr.edu/home-and-landscape/phytophthora-root-and-crown-rot/'
    }
  }
];

// ── TASKS ──
let tasks = [
  { label:'Spray Fertilizer',  time:'7:00 AM', done:false, priority:'high'   },
  { label:'Harvest Okra',      time:'8:00 AM', done:false, priority:'med'    },
  { label:'Check Irrigation',  time:'9:00 AM', done:false, priority:'med'    },
  { label:'Weed Tomato Beds',  time:'3:00 PM', done:false, priority:'low'    },
  { label:'Record Soil Temp',  time:'5:00 PM', done:true,  priority:'low'    },
];

// ── TOAST ──
function toast(msg, type='ok'){
  const el = document.createElement('div');
  el.className = `toast ${type==='warn'?' warn':type==='err'?' err':''}`;
  el.innerHTML = `<span class="material-symbols-outlined" style="font-size:18px">${type==='ok'?'check_circle':type==='warn'?'warning':'error'}</span>${msg}`;
  document.getElementById('toast-root').appendChild(el);
  setTimeout(()=>el.remove(), 3500);
}

// ── NAV ──
// Navigation is handled by the unified setNav() function below.

// ── WEATHER ICON ──
function getWeatherEmoji(iconCode, desc=''){
  const d = desc.toLowerCase();
  if(iconCode.startsWith('01')) return '☀️';
  if(iconCode.startsWith('02')) return '⛅';
  if(iconCode.startsWith('03')||iconCode.startsWith('04')) return '☁️';
  if(iconCode.startsWith('09')) return '🌧️';
  if(iconCode.startsWith('10')) return '🌦️';
  if(iconCode.startsWith('11')) return '⛈️';
  if(iconCode.startsWith('13')) return '❄️';
  if(iconCode.startsWith('50')) return '🌫️';
  return '🌤️';
}

// ── FARM CONDITION ASSESSMENT ──
function assessFarmCondition(data){
  const temp = data.main.temp;
  const humidity = data.main.humidity;
  const windKph = data.wind.speed * 3.6;
  const desc = data.weather[0].description.toLowerCase();
  const isRaining = desc.includes('rain') || desc.includes('drizzle');

  if(windKph > 40)
    return {
      type:'danger',
      text:'<strong>💨 FarmCast Strong Wind Risk:</strong> Strong wind conditions may affect farm operations. Consider securing young plants and delaying sensitive field activities.'
    };
  if(isRaining && humidity > 85)
    return {
      type:'warn',
      text:'<strong>🌧️ FarmCast Rain Risk:</strong> Rain and high humidity are present. Monitor drainage and field conditions.'
    };
  if(temp > 36)
    return {
      type:'warn',
      text:'<strong>🌡️ FarmCast Heat Stress Risk:</strong> High temperature may increase crop heat stress. Monitor crops and check soil moisture before irrigating.'
    };
  if(humidity > 80 && temp > 28) return { type:'warn', text:'<strong>💦 High Humidity:</strong> Monitor for fungal diseases. Ensure proper crop spacing.' };
  if(temp >= 22 && temp <= 32 && humidity >= 50 && humidity <= 75)
    return { type:'ok', text:'<strong>✅ Ideal Farm Conditions:</strong> Good temperature and humidity. Perfect day for planting and fieldwork!' };
  return { type:'ok', text:'<strong>🌱 Fair Conditions:</strong> Suitable for most farming activities. Check individual crop requirements.' };
}

// ── ASSESS CROP FOR DAY ──
function assessCrop(crop, temp, windKph, isRaining) {

  const hasTemperatureRange =
    Number.isFinite(crop.minTemp) ||
    Number.isFinite(crop.maxTemp);

  const hasWindLimit =
    Number.isFinite(crop.windMax);

  const hasColdDamageThreshold =
    Number.isFinite(crop.coldDamageBelow);

  // Severe cold damage threshold
  if (
    hasColdDamageThreshold &&
    temp < crop.coldDamageBelow
  ) {
    return {
      status: 'risk',
      reason: 'Cold Damage Risk'
    };
  }

  // Crop-specific wind threshold
  if (
    hasWindLimit &&
    windKph > crop.windMax
  ) {
    return {
      status: 'risk',
      reason: 'High Wind Warning'
    };
  }

  // Crops that should avoid active rainfall
  if (
    crop.noRain === true &&
    isRaining
  ) {
    return {
      status: 'wait',
      reason: 'Avoid Planting in Rain'
    };
  }

  // Minimum suitable temperature
  if (
    Number.isFinite(crop.minTemp) &&
    temp < crop.minTemp
  ) {
    return {
      status: 'wait',
      reason: 'Temperature Too Low'
    };
  }

  // Maximum suitable temperature
  if (
    Number.isFinite(crop.maxTemp) &&
    temp > crop.maxTemp
  ) {
    return {
      status: 'risk',
      reason: 'Heat Stress Risk'
    };
  }

  // No verified suitability temperature range
  if (!hasTemperatureRange) {
    return {
      status: 'info',
      reason: 'See Planting Guide'
    };
  }

  return {
    status: 'ideal',
    reason: 'Suitable Weather Conditions'
  };
}



// ── DISPLAY WEATHER DATA ──
function displayWeatherData(data){
  currentWeather = data;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
  const windKph = (data.wind.speed * 3.6).toFixed(1);
  const cloud = data.clouds.all;
  const vis = data.visibility ? (data.visibility/1000).toFixed(1) : '--';
  const desc = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
  const icon = getWeatherEmoji(data.weather[0].icon, data.weather[0].description);

  document.getElementById('heroLocation').textContent = `${data.sys.country} · Lat ${data.coord.lat.toFixed(2)}, Lon ${data.coord.lon.toFixed(2)}`;
  document.getElementById('heroCity').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('heroDate').textContent = new Date().toLocaleDateString('en-PH', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  document.getElementById('heroIcon').textContent = icon;
  document.getElementById('heroTemp').innerHTML = `${temp}<sup>°C</sup>`;
  document.getElementById('heroDesc').textContent = desc;
  document.getElementById('heroFeels').textContent = `Feels like ${feelsLike}°C`;
  document.getElementById('statHumidity').textContent = `${humidity}%`;
  document.getElementById('statWind').textContent = `${windKph} kph`;
  document.getElementById('statCloud').textContent = `${cloud}%`;
  document.getElementById('statVis').textContent = `${vis} km`;

  // Farm condition banner
  const cond = assessFarmCondition(data);
  const banner = document.getElementById('farmCondBanner');
  banner.className = `farm-condition ${cond.type==='warn'?' warn':cond.type==='danger'?' danger':''}`;
  const dot = banner.querySelector('.condition-dot');
  dot.className = `condition-dot ${cond.type==='warn'?' warn':cond.type==='danger'?' danger':''}`;
  document.getElementById('farmCondText').innerHTML = cond.text;

  // Quick stats
  const waterNeed = humidity < 40 ? 'High' : humidity < 65 ? 'Moderate' : 'Low';
  document.getElementById('waterNeed').textContent = waterNeed;
  document.getElementById('waterNeed').className = `qs-value ${humidity<40?'qs-red':humidity<65?'qs-amber':'qs-blue'}`;
  const soilTemp = (temp - 3 + Math.random()*2).toFixed(1);
  document.getElementById('soilTemp').textContent = `${soilTemp}°C`;
  
  // UV estimate
  const isDay = Date.now()/1000 > data.sys.sunrise && Date.now()/1000 < data.sys.sunset;
  const uv = isDay ? Math.max(0, Math.round(10 - cloud/12)) : 0;
  document.getElementById('uvIndex').textContent = uv;
  document.getElementById('uvLabel').textContent = uv <= 2 ? 'Low' : uv <= 5 ? 'Moderate' : uv <= 7 ? 'High' : 'Very High';

  // Pest monitoring advisory
  renderPestAlerts(); 

  toast(`Weather updated for ${data.name}`, 'ok');
}

// ── RENDER PEST ALERTS ──
function renderPestAlerts() {

  const pestList =
    document.getElementById(
      'pestList'
    );

  if (!pestList) return;


  pestList.innerHTML = `
    <div class="pest-item">

      <div class="pest-icon">

        <img
          src="assets/ui/pest-status-analyzing.svg"
          alt=""
          class="pest-icon-img"
        >

      </div>


      <div class="pest-info">

        <div class="pest-name">
          Pest Monitoring Advisory
        </div>

        <div class="pest-detail">
          Weather is used as farm context only
          and does not confirm pest presence.
          Review Pest Alerts for crop-specific
          guidance and inspect crops for visible signs.
        </div>

      </div>

    </div>
  `;

}

// ── RENDER TASKS ──
function renderTasks(){
  document.getElementById('taskList').innerHTML = tasks.map((t,i) => `
    <div class="task-item${t.done?' done':''}" onclick="toggleTask(${i})">
      <div class="task-priority tp-${t.priority}"></div>
      <div class="task-check"></div>
      <div class="task-label">${t.label}</div>
      <div class="task-time">${t.time}</div>
    </div>
  `).join('');
}

function toggleTask(i) {
  if (!tasks[i]) return;

  tasks[i].done = !tasks[i].done;

  saveTasksLS();
  renderTasks();
}

function addTask() {
  const label = prompt('New task name:');

  if (!label) return;

  tasks.push({
    label: label.trim(),
    time: 'TBD',
    done: false,
    priority: 'low'
  });

  saveTasksLS();
  renderTasks();

  toast('Task added!', 'ok');
}

// ── RENDER FORECAST + CALENDAR ──
function renderForecastAndCalendar(forecastData, currentData){
  const timezone = currentData.timezone;
  const daily = {};
  forecastData.list.forEach(item => {
    const d = new Date((item.dt + timezone) * 1000);
    const key = d.toISOString().split('T')[0];
    if(!daily[key]) daily[key] = { temps:[], icons:[], humidity:[], wind:[], dt: item.dt };
    daily[key].temps.push(item.main.temp);
    daily[key].icons.push(item.weather[0].icon);
    daily[key].humidity.push(item.main.humidity);
    daily[key].wind.push(item.wind.speed);
  });

  const days = Object.entries(daily).slice(0,7);
  const today = new Date().toLocaleDateString('en-PH', { weekday:'short' });

  // Forecast strip
  const daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  document.getElementById('forecastStrip').innerHTML = days.map(([key,val],i) => {
    const date = new Date(key);
    const dayName = daysOfWeek[date.getDay()];
    const avgTemp = Math.round(val.temps.reduce((a,b)=>a+b,0)/val.temps.length);
    const minTemp = Math.round(Math.min(...val.temps));
    const icon = getWeatherEmoji(val.icons[Math.floor(val.icons.length/2)]);
    return `<div class="fc-day${i===0?' active':''}" onclick="document.querySelectorAll('.fc-day').forEach(d=>d.classList.remove('active'));this.classList.add('active')">
      <div class="fc-day-name">${dayName}</div>
      <div class="fc-icon">${icon}</div>
      <div class="fc-temp-high">${avgTemp}°</div>
      <div class="fc-temp-low">${minTemp}°</div>
    </div>`;
  }).join('');

  // Planting calendar
  const calRow = document.getElementById('calendarRow');
  calRow.innerHTML = days.map(([key,val],i) => {
    const date = new Date(key + 'T00:00:00');
    const dayNum = date.getDate();
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const label = `${monthNames[date.getMonth()]} ${dayNum}` + (date.toLocaleDateString('en-PH', { weekday:'short' }) === today ? ' (Today)' : '');
    const avgTemp = val.temps.reduce((a,b)=>a+b,0)/val.temps.length;
    const avgWind = val.wind.reduce((a,b)=>a+b,0)/val.wind.length * 3.6;
    const avgHum  = val.humidity.reduce((a,b)=>a+b,0)/val.humidity.length;
    const isRaining = val.icons.some(ic => ic.startsWith('09')||ic.startsWith('10'));
    const weatherIcon = getWeatherEmoji(val.icons[Math.floor(val.icons.length/2)]);

    // Pick 2 random crops for this day
    const shuffled = [...CROPS].sort(()=>Math.random()-0.5).slice(0,2);
    const cropsHtml = shuffled.map(crop => {
      const assess = assessCrop(crop, avgTemp, avgWind, isRaining);
      return `<div class="crop-card ${assess.status}" onclick="toast('${crop.name}: ${assess.reason}','${assess.status==='ideal'?'ok':assess.status==='wait'?'warn':'err'}')">
        <div class="crop-top"><div class="crop-emoji">${crop.emoji}</div><div class="crop-name">${crop.name}</div></div>
        <div class="crop-badge badge-${assess.status}">${assess.status.toUpperCase()}</div>
        <div class="crop-reason">${assess.reason}</div>
      </div>`;
    }).join('');

    return `<div class="cal-day">
      <div class="cal-date${i===0?' today':''}">
        <div class="cal-date-num">${dayNum}</div>
        <div>${label}</div>
      </div>
      <div class="cal-weather-icon">${getMiniWeatherScene(val.icons[Math.floor(val.icons.length/2)])}</div>
      <div class="cal-crops">${cropsHtml}</div>
    </div>`;
  }).join('');
}

// ── FETCH WEATHER ──
async function fetchWeather(
  city,
  lat = null,
  lon = null
) {

  const topIcon =
    document.getElementById(
      'refreshIcon'
    );

  const heroIcon =
    document.getElementById(
      'heroRefreshIcon'
    );

  const heroBtn =
    document.getElementById(
      'heroRefreshBtn'
    );


  if (topIcon) {
    topIcon.style.animation =
      'spin .7s linear infinite';
  }


  if (heroIcon) {
    heroIcon.style.animation =
      'spin .7s linear infinite';
  }


  if (heroBtn) {
    heroBtn.classList.add(
      'refreshing'
    );
  }


  try {

    const hasLatitude =
      lat !== null &&
      lat !== undefined &&
      String(lat).trim() !== '';


    const hasLongitude =
      lon !== null &&
      lon !== undefined &&
      String(lon).trim() !== '';


    const latitude =
      Number(lat);


    const longitude =
      Number(lon);


    const useCoordinates =
      hasLatitude &&
      hasLongitude &&
      Number.isFinite(latitude) &&
      latitude >= -90 &&
      latitude <= 90 &&
      Number.isFinite(longitude) &&
      longitude >= -180 &&
      longitude <= 180;


    /*
     * Saved farm locations use their
     * exact coordinates.
     *
     * Manual Dashboard searches can still
     * use the normal city-name query.
     */
    const locationQuery =
      useCoordinates
        ? `lat=${encodeURIComponent(
            latitude
          )}&lon=${encodeURIComponent(
            longitude
          )}`
        : `q=${encodeURIComponent(
            city
          )}`;


    const [
      wRes,
      fRes
    ] =
      await Promise.all([

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?${locationQuery}&units=metric&appid=${API_KEY}`
        ),

        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?${locationQuery}&units=metric&appid=${API_KEY}`
        )

      ]);


    if (
      !wRes.ok ||
      !fRes.ok
    ) {

      throw new Error(
        'Weather data is temporarily unavailable.'
      );

    }


    const [
      wData,
      fData
    ] =
      await Promise.all([
        wRes.json(),
        fRes.json()
      ]);


    if (
      !Array.isArray(
        fData?.list
      )
    ) {

      throw new Error(
        'Forecast data is incomplete.'
      );

    }


    displayWeatherData(
      wData
    );


    renderForecastAndCalendar(
      fData,
      wData
    );


    currentCity =
      wData.name ||
      city ||
      currentCity;


    return wData;


  } catch (error) {

    console.error(
      'Dashboard weather error:',
      error
    );


    toast(
      `Weather error: ${error.message}`,
      'err'
    );


    return null;


  } finally {

    if (topIcon) {
      topIcon.style.animation =
        '';
    }


    if (heroIcon) {
      heroIcon.style.animation =
        '';
    }


    if (heroBtn) {
      heroBtn.classList.remove(
        'refreshing'
      );
    }

  }

}

function refreshWeather() {

  if (
    currentWeather?.coord
  ) {

    fetchWeather(
      currentCity,
      currentWeather.coord.lat,
      currentWeather.coord.lon
    );

    return;

  }


  fetchWeather(
    appSettings.city ||
      currentCity,

    appSettings.lat,

    appSettings.lon
  );

}

function searchCity(){
  const val = document.getElementById('citySearch').value.trim();
  if(!val){ toast('Please enter a city name','warn'); return; }
  fetchWeather(val);
  document.getElementById('citySearch').value = '';
}

// ── INIT handled by initApp() in api.js ──

// ═══════════════════════════════════════════════════════
// PAGE NAVIGATION — updated to support page switching
// ═══════════════════════════════════════════════════════
 
const PAGE_TITLES = {
  'dashboard':    'Farm Weather + Planting Calendar',
  'weather-maps': 'Weather Maps',
  'my-crops':     'My Crops'
};
 
// ── NAV ──
// Navigation is handled by the unified setNav() function below.
 
// ═══════════════════════════════════════════════════════
// WEATHER MAPS — Leaflet.js + OpenWeatherMap tile layers
// ═══════════════════════════════════════════════════════
 
let weatherMap = null;
let currentWeatherLayer = null;
let currentBaseLayer = null;
let currentMapLayerName = 'precipitation_new';

let lastMapWeatherData = null;
let currentMapWeatherPopup = null;
let farmLocationMarker = null;
 
const OWM_LAYERS = {
  precipitation_new: { name: 'Precipitation', legend: 'precip-gradient',  labels: ['None','Heavy'] },
  temp_new:          { name: 'Temperature',   legend: 'temp-gradient',    labels: ['Cold','Hot'] },
  
  wind_new: {
    name: 'Wind Speed',
    legend: 'wind-gradient',
    labels: []
  },

  clouds_new:        { name: 'Cloud Cover',   legend: 'cloud-gradient',   labels: ['Clear','Overcast'] },
  pressure_new:      { name: 'Pressure',      legend: 'pressure-gradient',labels: ['Low','High'] }
};
 
const BASE_TILES = {
  dark:
  `https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`,

  satellite:
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',

  street:
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
};
 
let mapInitialized = false;
 
function initWeatherMap() {
  if (mapInitialized) return;
  mapInitialized = true;


  /*
   * Prefer live weather coordinates when
   * available.
   *
   * On a direct Weather Maps startup,
   * currentWeather may not exist yet, so
   * use the farmer's saved location.
   */
  const savedLat =
    Number(
      appSettings.lat
    );


  const savedLon =
    Number(
      appSettings.lon
    );


  const hasSavedCoordinates =
    Number.isFinite(
      savedLat
    ) &&
    savedLat >= -90 &&
    savedLat <= 90 &&
    Number.isFinite(
      savedLon
    ) &&
    savedLon >= -180 &&
    savedLon <= 180;


  const lat =
    currentWeather
      ? currentWeather.coord.lat
      : hasSavedCoordinates
        ? savedLat
        : 14.99;


  const lon =
    currentWeather
      ? currentWeather.coord.lon
      : hasSavedCoordinates
        ? savedLon
        : 120.93;


  weatherMap = L.map('weatherMap', {
    zoomControl: true,
    worldCopyJump: false,
    maxBounds: [[-90, -180], [90, 180]],
    maxBoundsViscosity: 1.0,
    minZoom: 2,
    maxZoom: 18,
  }).setView([lat, lon], 8);

  // Mobile: prevent accidental map movement while scrolling
  function syncMapDragging() {
    if (!weatherMap) return;

    weatherMap.dragging.enable();
  }

  syncMapDragging();

  window.addEventListener(
   'resize',
    syncMapDragging
  );
 
  // Base layer — dark by default
  currentBaseLayer = L.tileLayer(BASE_TILES.dark, {
    attribution:
      '&copy; OpenStreetMap &copy; CARTO',

    minZoom: 2,
    maxZoom: 18,

    bounds: [
      [-85.05112878, -180],
      [85.05112878, 180]
    ],

    noWrap: true
  }).addTo(weatherMap);
 
  // OWM weather layer
  currentWeatherLayer = L.tileLayer(
    `https://tile.openweathermap.org/map/${currentMapLayerName}/{z}/{x}/{y}.png?appid=${API_KEY}`,
    { opacity: 0.75, maxZoom: 18 }
  ).addTo(weatherMap);
 
  // Add farm marker
if (
  currentWeather ||
  hasSavedCoordinates
) {

  const farmLocationName =
    currentWeather?.name ||
    appSettings.city ||
    'Saved Farm Location';


  if (currentWeather) {

    lastMapWeatherData =
      currentWeather;

  }


  farmLocationMarker =
    L.marker(
      [lat, lon],
      {
        icon:
          L.divIcon({
            className:
              'farm-marker',

            html:
              '🌾',

            iconSize:
              [30, 30],

            iconAnchor:
              [15, 15]
          })
      }
    )
      .addTo(
        weatherMap
      );


  if (currentWeather) {

    farmLocationMarker
      .bindPopup(
        `<b>${currentWeather.name}</b><br>${displayTemp(
          currentWeather.main.temp
        )} — ${currentWeather.weather[0].description}`
      )
      .openPopup();

  } else {

    farmLocationMarker
      .bindPopup(
        `<b>${farmLocationName}</b><br>Saved farm location`
      )
      .openPopup();


    /*
     * Direct Weather Maps startup:
     * load current conditions for the
     * saved farm coordinates without
     * requiring the Dashboard first.
     */
    fetchMapPointWeather(
      lat,
      lon
    );

  }

}
 
  // Click to get weather
  weatherMap.on('click', async (e) => {
    const { lat, lng } = e.latlng;
    await fetchMapPointWeather(lat, lng);
  });
 
  // Update map weather summary
  updateMapWeatherSummary();
}

function syncWeatherMapToSavedLocation(
  lat,
  lon,
  name
) {

  const latitude =
    Number(lat);

  const longitude =
    Number(lon);


  if (
    !weatherMap ||
    !Number.isFinite(latitude) ||
    latitude < -90 ||
    latitude > 90 ||
    !Number.isFinite(longitude) ||
    longitude < -180 ||
    longitude > 180
  ) {
    return;
  }


  const safeName =
    escapeHtml(
      name ||
      appSettings.city ||
      'Saved Farm Location'
    );


  weatherMap.setView(
    [latitude, longitude],
    10
  );


  if (farmLocationMarker) {

    farmLocationMarker.setLatLng([
      latitude,
      longitude
    ]);

  } else {

    farmLocationMarker =
      L.marker(
        [latitude, longitude],
        {
          icon:
            L.divIcon({
              className:
                'farm-marker',

              html:
                '🌾',

              iconSize:
                [30, 30],

              iconAnchor:
                [15, 15]
            })
        }
      )
        .addTo(weatherMap);

  }


  farmLocationMarker
    .bindPopup(
      `<b>${safeName}</b><br>Saved farm location`
    )
    .openPopup();


  fetchMapPointWeather(
    latitude,
    longitude
  );

}

function toggleWindModelInfo() {
  const details =
    document.getElementById(
      'windModelInfoDetails'
    );

  const chevron =
    document.getElementById(
      'windModelInfoChevron'
    );

  if (!details) return;

  const isOpen =
    details.style.display === 'block';

  details.style.display =
    isOpen ? 'none' : 'block';

  if (chevron) {
    chevron.textContent =
      isOpen
        ? 'expand_more'
        : 'expand_less';
  }
}

function buildMapWeatherPopupHtml(
  data
) {

  if (!data) {
    return '';
  }


  const temperature =
    displayTemp(
      data.main.temp
    );


  const wind =
    displayWind(
      data.wind.speed
    );


  return `
    <div
      style="
        font-family:'DM Sans',sans-serif;
        min-width:160px;
      "
    >

      <div
        style="
          font-weight:700;
          font-size:0.95rem;
          margin-bottom:4px;
        "
      >
        ${data.name}, ${data.sys.country}
      </div>


      <div
        style="
          font-size:1.4rem;
          font-weight:800;
          color:#3fb950;
        "
      >
        ${temperature}
      </div>


      <div
        style="
          font-size:0.78rem;
          color:#666;
          margin-top:2px;
          text-transform:capitalize;
        "
      >
        ${data.weather[0].description}
      </div>


      <div
        style="
          margin-top:8px;
          font-size:0.78rem;
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:4px;
        "
      >

        <div>
          💧 ${data.main.humidity}%
        </div>

        <div>
          💨 ${wind}
        </div>

        <div>
          ☁️ ${data.clouds.all}%
        </div>

        <div>
          👁 ${
            data.visibility
              ? (
                  data.visibility /
                  1000
                ).toFixed(1)
              : '--'
          } km
        </div>

      </div>

    </div>
  `;

}


function renderMapWeatherSummary(
  data
) {

  if (!data) {
    return;
  }


  const city =
    document.getElementById(
      'mapWsCity'
    );

  const temp =
    document.getElementById(
      'mapWsTemp'
    );

  const humidity =
    document.getElementById(
      'mapWsHumid'
    );

  const wind =
    document.getElementById(
      'mapWsWind'
    );

  const cloud =
    document.getElementById(
      'mapWsCloud'
    );


  if (city) {

    city.textContent =
      `${data.name}, ${data.sys.country}`;

  }


  if (temp) {

    temp.textContent =
      displayTemp(
        data.main.temp
      );

  }


  if (humidity) {

    humidity.textContent =
      `${data.main.humidity}%`;

  }


  if (wind) {

    wind.textContent =
      displayWind(
        data.wind.speed
      );

  }


  if (cloud) {

    cloud.textContent =
      `${data.clouds.all}%`;

  }

}


function refreshMapWeatherUnits() {

  const data =
    lastMapWeatherData ||
    currentWeather;


  if (!data) {
    return;
  }


  renderMapWeatherSummary(
    data
  );


  if (
    currentMapWeatherPopup
  ) {

    currentMapWeatherPopup
      .setContent(
        buildMapWeatherPopupHtml(
          data
        )
      );

  }

}

async function fetchMapPointWeather(
  lat,
  lng
) {

  try {

    const res =
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`
      );


    if (!res.ok) {
      return;
    }


    const data =
      await res.json();


    lastMapWeatherData =
      data;


    currentMapWeatherPopup =
      L.popup()
        .setLatLng(
          [lat, lng]
        )
        .setContent(
          buildMapWeatherPopupHtml(
            data
          )
        )
        .openOn(
          weatherMap
        );


    renderMapWeatherSummary(
      data
    );


    const hint =
      document.getElementById(
        'mapClickHint'
      );


    if (hint) {

      hint.style.display =
        'none';

    }

  } catch (error) {

    console.error(
      'Map fetch error:',
      error
    );

  }

}

function getWindLegendLabels() {

  if (
    appSettings.windUnit ===
    'mph'
  ) {

    return [
      'Calm<br><small>0–3.1 mph</small>',
      'Light<br><small>3.7–11.8 mph</small>',
      'Moderate<br><small>12.4–23.6 mph</small>',
      'Strong<br><small>24.2+ mph</small>'
    ];

  }


  return [
    'Calm<br><small>0–5 kph</small>',
    'Light<br><small>6–19 kph</small>',
    'Moderate<br><small>20–38 kph</small>',
    'Strong<br><small>39+ kph</small>'
  ];

}


function renderMapLegend(
  layerName
) {

  const info =
    OWM_LAYERS[layerName];


  if (!info) {
    return;
  }


  const legendTitle =
    document.getElementById(
      'mapLegendTitle'
    );


  const bar =
    document.getElementById(
      'mapLegendBar'
    );


  if (legendTitle) {

    legendTitle.textContent =
      info.name;

  }


  if (!bar) {
    return;
  }


  const labels =
    layerName === 'wind_new'
      ? getWindLegendLabels()
      : info.labels;


  bar.innerHTML = `
    <div
      class="legend-gradient ${info.legend}"
    ></div>

    <div class="legend-labels">
      ${labels
        .map(
          label =>
            `<span>${label}</span>`
        )
        .join('')}
    </div>
  `;

}

function setMapLayer(el, layerName) {

  stopRadarAnimation();
  removeWindFlowLayer();

  const windModelInfoWrap =
    document.getElementById(
      'windModelInfoWrap'
    );

  if (windModelInfoWrap) {
    windModelInfoWrap.style.display =
      'none';
  }

  const pagasaStormPanel =
    document.getElementById(
      'pagasaStormPanel'
    );

  if (pagasaStormPanel) {
    pagasaStormPanel.style.display =
      'none';
  }

  const mapLegend =
    document.getElementById(
      'mapLegend'
    );

  if (mapLegend) {
    mapLegend.style.display =
      'block';
  }


  if (radarLayer && weatherMap) {
    weatherMap.removeLayer(
      radarLayer
    );

    radarLayer = null;
  }

  const radarPanel =
    document.getElementById(
      'radarAnimationPanel'
    );

  if (radarPanel) {
    radarPanel.style.display =
      'none';
  }

  document.querySelectorAll('.map-layer-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  currentMapLayerName = layerName;
 
  if (currentWeatherLayer) weatherMap.removeLayer(currentWeatherLayer);
  currentWeatherLayer = L.tileLayer(
    `https://tile.openweathermap.org/map/${layerName}/{z}/{x}/{y}.png?appid=${API_KEY}`,
    { opacity: 0.75, maxZoom: 18 }
  ).addTo(weatherMap);
 
  // Update legend
  const info =
    OWM_LAYERS[layerName];


  renderMapLegend(
    layerName
  );


  toast(
    `Showing ${info.name} layer`,
    'ok'
  );

}
 
function setMapStyle(el, style) {
  document.querySelectorAll('.map-style-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
 
  if (currentBaseLayer) weatherMap.removeLayer(currentBaseLayer);
  currentBaseLayer = L.tileLayer(BASE_TILES[style], {
    attribution:
      style === 'dark'
        ? '&copy; OpenStreetMap &copy; CARTO'
        : '© Map',

    minZoom: 2,
    maxZoom: 18,

    bounds: [
      [-85.05112878, -180],
      [85.05112878, 180]
    ],

    noWrap: true
  }).addTo(weatherMap);
 
  // Re-add weather layer on top
  if (currentWeatherLayer) {
    weatherMap.removeLayer(currentWeatherLayer);
    currentWeatherLayer.addTo(weatherMap);
  }
}
 
function flyToFarm(lat, lon, name) {
  if (!weatherMap) return;
  weatherMap.flyTo([lat, lon], 11, { duration: 1.5 });
  fetchMapPointWeather(lat, lon);
}
 
function updateMapWeatherSummary() {

  renderMapWeatherSummary(
    lastMapWeatherData ||
    currentWeather
  );

}

async function loadRainViewerRadar() {
  try {
    const response =
      await fetch(RAINVIEWER_API_URL);

    if (!response.ok) {
      throw new Error(
        `RainViewer request failed: ${response.status}`
      );
    }

    const data =
      await response.json();

    radarHost =
      data.host || '';

    radarFrames =
      Array.isArray(data.radar?.past)
        ? data.radar.past.slice(-6)
        : [];

    if (!radarHost || radarFrames.length === 0) {
      throw new Error(
        'No radar frames are currently available.'
      );
    }

    radarFrameIndex =
      radarFrames.length - 1;

    showRadarFrame(
      radarFrameIndex
    );

    return true;

  } catch (error) {
    console.error(
      'RainViewer radar error:',
      error
    );

    toast(
      'Radar data is temporarily unavailable.',
      'warn'
    );

    return false;
  }
}

function showRadarFrame(index) {
  if (
    !weatherMap ||
    radarFrames.length === 0
  ) {
    return;
  }

  radarFrameIndex =
    Math.max(
      0,
      Math.min(
        index,
        radarFrames.length - 1
      )
    );

  const frame =
    radarFrames[radarFrameIndex];

  if (!frame) return;

  if (radarLayer) {
    weatherMap.removeLayer(
      radarLayer
    );
  }

  radarLayer =
    L.tileLayer(
      `${radarHost}${frame.path}/256/{z}/{x}/{y}/2/1_0.png`,
      {
        opacity: 0.72,

        // RainViewer public radar tiles
        // currently have native data up to zoom 7.
        maxNativeZoom: 7,

        // Leaflet may upscale the tiles
        // when the user zooms farther in.
        maxZoom: 18,

        updateWhenIdle: true,
        updateWhenZooming: false,
        keepBuffer: 1,

        attribution:
          'Radar © RainViewer'
      }
    );

  radarLayer.addTo(
    weatherMap
  );

  updateRadarUI();
}

async function setRadarLayer(el) {

  removeWindFlowLayer();

  const windModelInfoWrap =
    document.getElementById(
      'windModelInfoWrap'
    );

  if (windModelInfoWrap) {
    windModelInfoWrap.style.display =
      'none';
  }

  const pagasaStormPanel =
    document.getElementById(
      'pagasaStormPanel'
    );

  if (pagasaStormPanel) {
    pagasaStormPanel.style.display =
      'none';
  }

  const mapLegend =
    document.getElementById(
      'mapLegend'
    );

  if (mapLegend) {
    mapLegend.style.display =
      'block';
  }


  if (!weatherMap) return;

  document
    .querySelectorAll(
      '.map-layer-btn'
    )
    .forEach(button => {
      button.classList.remove(
        'active'
      );
    });

  el.classList.add(
    'active'
  );

  stopRadarAnimation();

  if (currentWeatherLayer) {
    weatherMap.removeLayer(
      currentWeatherLayer
    );

    currentWeatherLayer = null;
  }

  currentMapLayerName =
    'radar';

  const panel =
    document.getElementById(
      'radarAnimationPanel'
    );

  if (panel) {
    panel.style.display =
      'block';
  }

  if (
    radarFrames.length === 0
  ) {
    const loaded =
      await loadRainViewerRadar();

    if (!loaded) return;
  } else {
    showRadarFrame(
      radarFrameIndex
    );
  }

  updateRadarLegend();
}

function toggleRadarAnimation() {
  if (radarFrames.length === 0) {
    return;
  }

  if (radarIsPlaying) {
    stopRadarAnimation();
  } else {
    startRadarAnimation();
  }
}

function startRadarAnimation() {
  if (
    radarIsPlaying ||
    radarFrames.length === 0
  ) {
    return;
  }

  radarIsPlaying = true;

  updateRadarPlayButton();

  radarAnimationTimer =
    setInterval(() => {

      radarFrameIndex++;

      if (
        radarFrameIndex >=
        radarFrames.length
      ) {
        radarFrameIndex = 0;
      }

      showRadarFrame(
        radarFrameIndex
      );

    }, 2000);
}

function stopRadarAnimation() {
  radarIsPlaying = false;

  if (radarAnimationTimer) {
    clearInterval(
      radarAnimationTimer
    );

    radarAnimationTimer = null;
  }

  updateRadarPlayButton();
}

function previousRadarFrame() {
  stopRadarAnimation();

  if (radarFrames.length === 0) {
    return;
  }

  radarFrameIndex--;

  if (radarFrameIndex < 0) {
    radarFrameIndex =
      radarFrames.length - 1;
  }

  showRadarFrame(
    radarFrameIndex
  );
}

function nextRadarFrame() {
  stopRadarAnimation();

  if (radarFrames.length === 0) {
    return;
  }

  radarFrameIndex++;

  if (
    radarFrameIndex >=
    radarFrames.length
  ) {
    radarFrameIndex = 0;
  }

  showRadarFrame(
    radarFrameIndex
  );
}

function updateRadarUI() {
  const frame =
    radarFrames[radarFrameIndex];

  if (!frame) return;

  const timeEl =
    document.getElementById(
      'radarFrameTime'
    );

  if (timeEl) {
    const frameDate =
      new Date(
        frame.time * 1000
      );

    timeEl.textContent =
      frameDate.toLocaleString(
        'en-PH',
        {
          hour: 'numeric',
          minute: '2-digit',
          month: 'short',
          day: 'numeric'
        }
      );
  }

  const progress =
    document.getElementById(
      'radarFrameProgress'
    );

  if (progress) {
    const percent =
      radarFrames.length <= 1
        ? 100
        : (
            radarFrameIndex /
            (radarFrames.length - 1)
          ) * 100;

    progress.style.width =
      `${percent}%`;
  }
}

function updateRadarPlayButton() {
  const icon =
    document.getElementById(
      'radarPlayIcon'
    );

  const button =
    document.getElementById(
      'radarPlayBtn'
    );

  if (icon) {
    icon.textContent =
      radarIsPlaying
        ? 'pause'
        : 'play_arrow';
  }

  if (button) {
    button.title =
      radarIsPlaying
        ? 'Pause radar animation'
        : 'Play radar animation';
  }
}

function updateRadarLegend() {
  const title =
    document.getElementById(
      'mapLegendTitle'
    );

  const bar =
    document.getElementById(
      'mapLegendBar'
    );

  if (title) {
    title.textContent =
      'Radar Precipitation';
  }

  if (bar) {
    bar.innerHTML = `
      <div class="legend-gradient radar-gradient"></div>

      <div class="legend-labels">
        <span>Light</span>
        <span>Heavy</span>
      </div>
    `;
  }
}

function isMapCenterInsideWindGrid() {
  if (!weatherMap) {
    return false;
  }

  const center =
    weatherMap.getCenter();

  const latMargin =
    WIND_GRID.step * 2;

  const lonMargin =
    WIND_GRID.step * 2;

  return (
    center.lat <=
      WIND_GRID.north - latMargin &&
    center.lat >=
      WIND_GRID.south + latMargin &&
    center.lng >=
      WIND_GRID.west + lonMargin &&
    center.lng <=
      WIND_GRID.east - lonMargin
  );
}


function updateWindGridFromMap() {
  if (!weatherMap) {
    return false;
  }

  const bounds =
    weatherMap.getBounds();

  const philippinesBounds =
    L.latLngBounds(
      [4, 116],
      [22, 128]
    );

  const philippinesVisible =
    bounds.intersects(
      philippinesBounds
    );

  if (!philippinesVisible) {
    return false;
  }


  const currentGridKey =
    getWindFlowGridKey();

  const cacheIsFreshForCurrentGrid =
    windFlowDataCache &&
    windFlowDataCacheKey ===
      currentGridKey &&
    Date.now() -
      windFlowDataCacheTime <
      WIND_FLOW_CACHE_TTL;

  if (
    cacheIsFreshForCurrentGrid &&
    isMapCenterInsideWindGrid()
  ) {
    return true;
  }

  // Keep a consistent regional resolution
  // so smaller circulation patterns are
  // represented better.
  

  const step = 2;

  WIND_GRID = {
    north: 28,
    south: 0,
    west: 108,
    east: 142,
    step: 2,
  };

  return true;

}

function buildWindGridCoordinates() {
  const coordinates = [];

  for (
    let lat = WIND_GRID.north;
    lat >= WIND_GRID.south;
    lat -= WIND_GRID.step
  ) {
    for (
      let lon = WIND_GRID.west;
      lon <= WIND_GRID.east;
      lon += WIND_GRID.step
    ) {
      coordinates.push({
        lat,
        lon
      });
    }
  }

  return coordinates;
}

function getWindFlowGridKey() {
  return [
    WIND_GRID.north,
    WIND_GRID.south,
    WIND_GRID.west,
    WIND_GRID.east,
    WIND_GRID.step
  ].join('|');
}

async function fetchWindFlowData() {

  const cacheKey =
    getWindFlowGridKey();

  const now =
    Date.now();

  const hasFreshCache =
    windFlowDataCache &&
    windFlowDataCacheKey ===
      cacheKey &&
    now -
      windFlowDataCacheTime <
      WIND_FLOW_CACHE_TTL;

  if (hasFreshCache) {
    return windFlowDataCache;
  }

  const points =
    buildWindGridCoordinates();

  const latitudes =
    points
      .map(point => point.lat)
      .join(',');

  const longitudes =
    points
      .map(point => point.lon)
      .join(',');

  const url =
    'https://api.open-meteo.com/v1/forecast' +
    `?latitude=${encodeURIComponent(latitudes)}` +
    `&longitude=${encodeURIComponent(longitudes)}` +
    '&current=wind_speed_10m,wind_direction_10m' +
    '&wind_speed_unit=kmh';

  if (
    now <
    windFlowApiCooldownUntil
  ) {
    return null;
  }

  const timeSinceLastRequest =
    now -
    windFlowLastApiRequest;

  if (
    timeSinceLastRequest <
    WIND_FLOW_MIN_API_INTERVAL
  ) {
    return null;
  }

  windFlowLastApiRequest =
    now;

  const response =
    await fetch(url);

  if (response.status === 429) {
    windFlowApiCooldownUntil =
      Date.now() +
      WIND_FLOW_429_BACKOFF;

    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Open-Meteo request failed: ${response.status}`
    );
  }

  const data =
    await response.json();

  if (!Array.isArray(data)) {
    throw new Error(
      'Unexpected Open-Meteo wind response.'
    );
  }

  const result = {
    points,
    data
  };

  windFlowDataCache =
    result;

  windFlowDataCacheKey =
    cacheKey;

  windFlowDataCacheTime =
    Date.now();

  return result;

}

function windToUV(speedKph, directionDeg) {
  const speedMs =
    Number(speedKph) / 3.6;

  const directionRad =
    Number(directionDeg) *
    Math.PI / 180;

  return {
    u:
      -speedMs *
      Math.sin(directionRad),

    v:
      -speedMs *
      Math.cos(directionRad)
  };
}

function buildVelocityData(
  points,
  weatherData
) {
  const uData = [];
  const vData = [];

  for (
    let i = 0;
    i < points.length;
    i++
  ) {
    const current =
      weatherData[i]?.current;

    if (
      !current ||
      current.wind_speed_10m == null ||
      current.wind_direction_10m == null
    ) {
      uData.push(0);
      vData.push(0);
      continue;
    }

    const vector =
      windToUV(
        current.wind_speed_10m,
        current.wind_direction_10m
      );

    uData.push(vector.u);
    vData.push(vector.v);
  }

  const nx =
    Math.round(
      (
        WIND_GRID.east -
        WIND_GRID.west
      ) /
      WIND_GRID.step
    ) + 1;

  const ny =
    Math.round(
      (
        WIND_GRID.north -
        WIND_GRID.south
      ) /
      WIND_GRID.step
    ) + 1;

  const refTime =
    new Date().toISOString();

  const baseHeader = {
    parameterUnit: 'm.s-1',
    parameterCategory: 2,

    nx,
    ny,

    lo1: WIND_GRID.west,
    lo2: WIND_GRID.east,

    la1: WIND_GRID.north,
    la2: WIND_GRID.south,

    dx: WIND_GRID.step,
    dy: WIND_GRID.step,

    refTime
  };

  return [
    {
      header: {
        ...baseHeader,
        parameterNumber: 2,
        parameterNumberName:
          'eastward_wind'
      },

      data: uData
    },

    {
      header: {
        ...baseHeader,
        parameterNumber: 3,
        parameterNumberName:
          'northward_wind'
      },

      data: vData
    }
  ];
}

async function setWindFlowLayer(el) {
  if (
    !weatherMap ||
    windFlowLoading
  ) {
    return;
  }

  windFlowLoading = true;

  document
    .querySelectorAll(
      '.map-layer-btn'
    )
    .forEach(button => {
      button.classList.remove(
        'active'
      );
    });

  el.classList.add('active');

  stopRadarAnimation();

  if (radarLayer) {
    weatherMap.removeLayer(
      radarLayer
    );

    radarLayer = null;
  }

  const radarPanel =
    document.getElementById(
      'radarAnimationPanel'
    );

  if (radarPanel) {
    radarPanel.style.display =
      'none';
  }

  if (currentWeatherLayer) {
    weatherMap.removeLayer(
      currentWeatherLayer
    );

    currentWeatherLayer = null;
  }

  removeWindFlowLayer();

  currentMapLayerName =
    'wind-flow';

  const pagasaStormPanel =
    document.getElementById(
      'pagasaStormPanel'
    );

  if (pagasaStormPanel) {
    pagasaStormPanel.style.display =
      'none';
  }

  const mapLegend =
    document.getElementById(
      'mapLegend'
    );

  if (mapLegend) {
    mapLegend.style.display =
      'block';
  }

  const hasDetailedGrid =
    updateWindGridFromMap();

  if (!hasDetailedGrid) {
    removeWindFlowLayer();

    toast(
     'Wind Flow is available within the Philippines coverage area.',
      'warn'
    );

    windFlowLoading = false;

    return;
  }

  toast(
    'Loading animated wind data…',
    'ok'
  );

  try {
    const windResult =
    await fetchWindFlowData();

  if (!windResult) {
    return;
  }

  if (
    currentMapLayerName !==
    'wind-flow'
  ) {
    return;
  }

  const {
    points,
    data
  } = windResult;
  
    const velocityData =
      buildVelocityData(
        points,
        data
      );

    if (
      typeof L.velocityLayer !==
      'function'
    ) {
      throw new Error(
        'Leaflet Velocity library is unavailable.'
      );
    }

    windFlowLayer =
      L.velocityLayer({
        displayValues: true,

        displayOptions: {
          velocityType:
            'Model Wind',

          position:
            'bottomleft',

          emptyString:
            'No wind data',

          angleConvention:
            'bearingCW',

          showCardinal: true,

          speedUnit:
            'k/h',

          directionString:
            'Direction',

          speedString:
            'Speed'
        },

        data:
          velocityData,

        minVelocity: 0,
        maxVelocity: 25,

        velocityScale:
          0.006,

        opacity:
          0.9
      });

    windFlowLayer.addTo(
      weatherMap
    );

    setTimeout(() => {
      weatherMap.invalidateSize({
        pan: false,
        animate: false
      });

      weatherMap.fire('moveend');
    }, 100);

    const windModelInfoWrap =
      document.getElementById(
      'windModelInfoWrap'
    );

    const windModelInfoDetails =
      document.getElementById(
      'windModelInfoDetails'
    );

    const windModelInfoChevron =
      document.getElementById(
      'windModelInfoChevron'
    );

    const windFlowUpdated =
      document.getElementById(
      'windFlowUpdated'
    );

    if (windModelInfoWrap) {
      windModelInfoWrap.style.display =
        'block';
    }

    if (windModelInfoDetails) {
      windModelInfoDetails.style.display =
        'none';
    }

    if (windModelInfoChevron) {
      windModelInfoChevron.textContent =
        'expand_more';
    }

    if (windFlowUpdated) {
      windFlowUpdated.textContent =
        `Loaded: ${new Date().toLocaleTimeString(
          'en-PH',
          {
            hour: '2-digit',
            minute: '2-digit'
          }
        )}`;
    }

    windFlowLastGridKey =
      getWindFlowGridKey();

    windFlowLastRefresh =
      Date.now();

    if (!windFlowAutoRefreshBound) {
      weatherMap.on(
        'moveend',
        scheduleWindFlowRefresh
      );

      windFlowAutoRefreshBound = true;
    }

    updateWindFlowLegend();

    toast(
      'Animated wind flow loaded',
      'ok'
    );

  } catch (error) {
    console.error(
      'Wind Flow error:',
      error
    );

    toast(
      'Wind Flow is temporarily unavailable.',
      'err'
    );

    el.classList.remove(
      'active'
    );
  } finally {
    windFlowLoading = false;
  }
}


function removeWindFlowLayer() {
  if (windFlowRefreshTimer) {
    clearTimeout(
      windFlowRefreshTimer
    );

    windFlowRefreshTimer = null;
  }

  if (
    windFlowLayer &&
    weatherMap
  ) {
    weatherMap.removeLayer(
      windFlowLayer
    );

    windFlowLayer = null;
  }
}

// ── PAGASA STORM / TYPHOON WATCH ──
function setPagasaStormLayer(el) {
  if (!weatherMap) return;

  stopRadarAnimation();
  removeWindFlowLayer();

  if (radarLayer) {
    weatherMap.removeLayer(radarLayer);
    radarLayer = null;
  }

  if (currentWeatherLayer) {
    weatherMap.removeLayer(currentWeatherLayer);
    currentWeatherLayer = null;
  }

  document
    .querySelectorAll('.map-layer-btn')
    .forEach(button => {
      button.classList.remove('active');
    });

  el.classList.add('active');

  currentMapLayerName =
    'pagasa-storm';

  const windModelInfoWrap =
    document.getElementById(
      'windModelInfoWrap'
    );

  if (windModelInfoWrap) {
    windModelInfoWrap.style.display =
      'none';
  }

  const radarPanel =
    document.getElementById(
      'radarAnimationPanel'
    );

  if (radarPanel) {
    radarPanel.style.display =
      'none';
  }

  const mapLegend =
    document.getElementById(
      'mapLegend'
    );

  if (mapLegend) {
    mapLegend.style.display =
      'none';
  }

  toast(
    'PAGASA Storm Watch selected',
    'ok'
  );

  loadPagasaStormWatch();

}

async function loadPagasaStormWatch() {
  const panel =
    document.getElementById(
      'pagasaStormPanel'
    );

  const content =
    document.getElementById(
      'pagasaStormContent'
    );

  if (!panel || !content) {
    return;
  }

  panel.style.display =
    'block';

  content.innerHTML =
    'Loading recent DOST-PAGASA tropical cyclone bulletins...';

  try {
    const response =
      await fetch(
        `${window.FARMCAST_CONFIG.API_URL}/advisories`
      );

    if (!response.ok) {
      throw new Error(
        `Advisory request failed: ${response.status}`
      );
    }

    const data =
      await response.json();

    const advisories =
      Array.isArray(data.advisories)
        ? data.advisories
        : [];

    const cycloneSourceAvailable =
      data?.sources
        ?.tropicalCycloneBulletins ===
      true;

    const outsideParCyclone =
      data?.outsideParCyclone &&
      typeof data.outsideParCyclone === 'object'
        ? data.outsideParCyclone
        : null;

    const stormAdvisories =
      advisories
        .filter(
          advisory =>
            advisory.type ===
            'tropical-cyclone-bulletin'
        )
        .sort((a, b) => {
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

    if (!cycloneSourceAvailable && !outsideParCyclone) {
      content.innerHTML = `
        <div class="pagasa-storm-error">
          <span class="material-symbols-outlined">
            cloud_off
          </span>

          <div>
            <strong>
               DOST-PAGASA cyclone bulletin source unavailable
            </strong>

            <p>
              FarmCast could not retrieve the
              DOST-PAGASA tropical cyclone bulletin
              feed at this time.
            </p>

            <small>
               This is a source availability issue
               and does not indicate cyclone status.
            </small>
          </div>
        </div>
      `;

      return;
    }

    if (!stormAdvisories.length) {

  if (outsideParCyclone) {

    const classificationText =
      escapeAdvisoryHtml(
        outsideParCyclone.classification ||
        'Tropical Cyclone'
      );

    const stormNameText =
      outsideParCyclone.stormName
        ? escapeAdvisoryHtml(
            outsideParCyclone.stormName
          )
        : '';

    const asOfText =
      outsideParCyclone.asOf
        ? escapeAdvisoryHtml(
            outsideParCyclone.asOf
          )
        : 'Latest PAGASA update';

    const issuedText =
      outsideParCyclone.issuedText
        ? escapeAdvisoryHtml(
            outsideParCyclone.issuedText
          )
        : '';

    const detailRows = [
      {
        icon: 'location_on',
        label: 'Location',
        value: outsideParCyclone.location
      },
      {
        icon: 'air',
        label: 'Maximum sustained winds',
        value:
          outsideParCyclone.maximumSustainedWinds
      },
      {
        icon: 'air',
        label: 'Gustiness',
        value:
          outsideParCyclone.gustiness
      },
      {
        icon: 'navigation',
        label: 'Movement',
        value:
          outsideParCyclone.movement
      }
    ]
      .filter(
        item =>
          String(
            item.value || ''
          ).trim()
      )
      .map(
        item => `
          <div class="pagasa-storm-area">
            <span class="material-symbols-outlined">
              ${item.icon}
            </span>

            <span>
              ${item.label}:
              <strong>
                ${escapeAdvisoryHtml(
                  item.value
                )}
              </strong>
            </span>
          </div>
        `
      )
      .join('');

    const synopsisHtml =
      outsideParCyclone.synopsis
        ? `
          <div class="pagasa-storm-window-note">
            <strong>
              PAGASA Synopsis
            </strong>

            <div>
              ${escapeAdvisoryHtml(
                outsideParCyclone.synopsis
              )}
            </div>
          </div>
        `
        : '';

    let officialOutsideParUrl = '';

    if (outsideParCyclone.sourceUrl) {
      try {
        const parsedUrl =
          new URL(
            outsideParCyclone.sourceUrl
          );

        const hostname =
          parsedUrl.hostname
            .toLowerCase();

        const isPagasaDomain =
          hostname ===
            'pagasa.dost.gov.ph' ||
          hostname.endsWith(
            '.pagasa.dost.gov.ph'
          );

        if (
          parsedUrl.protocol === 'https:' &&
          isPagasaDomain
        ) {
          officialOutsideParUrl =
            parsedUrl.href;
        }

      } catch {
        officialOutsideParUrl = '';
      }
    }

    const officialLinkHtml =
      officialOutsideParUrl
        ? `
          <a
            class="pagasa-storm-link"
            href="${escapeAdvisoryHtml(
              officialOutsideParUrl
            )}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open official PAGASA weather page
          </a>
        `
        : '';

    content.innerHTML = `
      <div class="pagasa-storm-active">

        <div class="pagasa-storm-alert-badge">
          <span class="material-symbols-outlined">
            cyclone
          </span>

          Tropical Cyclone Outside PAR
        </div>

        <div class="pagasa-storm-name">
          ${classificationText}
          ${
            stormNameText
              ? ` — ${stormNameText}`
              : ''
          }
        </div>

        <div class="pagasa-storm-bulletin">
          DOST-PAGASA monitoring · ${asOfText}
        </div>

        ${
          issuedText
            ? `
              <div class="pagasa-storm-issued">
                Issued: ${issuedText}
              </div>
            `
            : ''
        }

        ${detailRows}

        ${synopsisHtml}

        <div class="pagasa-storm-source">
          Source: DOST-PAGASA Daily Weather
        </div>

        ${officialLinkHtml}

      </div>
    `;

    return;
  }


  content.innerHTML = `
    <div class="pagasa-storm-empty">
      <span class="material-symbols-outlined">
        verified
      </span>

      <div>
        <strong>
          No recent cyclone bulletin found
        </strong>

        <p>
          FarmCast did not find a recent
          DOST-PAGASA tropical cyclone bulletin
          within its 24-hour recent-feed window.
        </p>

        <small>
          No Outside-PAR tropical cyclone was
          detected from the available PAGASA
          Daily Weather data.
        </small>
      </div>
    </div>
  `;

  return;
}

    const latest =
      stormAdvisories[0];
    
    const additionalStormCount =
      Math.max(
        0,
        stormAdvisories.length - 1
      );

    const additionalStormsText =
      additionalStormCount > 0
        ? `+${additionalStormCount} other recent ${
            additionalStormCount === 1
              ? 'cyclone'
              : 'cyclones'
          } available`
        : '';

    const additionalStormsHtml =
      stormAdvisories
        .slice(1)
        .map(advisory => {
          const stormName =
            escapeAdvisoryHtml(
              advisory.stormName ||
              'Unnamed cyclone'
            );

          const bulletinNumber =
            Number.isFinite(
              Number(
                advisory.bulletinNumber
              )
            )
              ? `Bulletin #${Number(
                  advisory.bulletinNumber
                )}`
              : 'Tropical Cyclone Bulletin';

          const secondaryIssuedDate =
            advisory.issuedAt
              ? new Date(
                  advisory.issuedAt
                )
              : null;

          const secondaryIssuedText =
            secondaryIssuedDate &&
            !Number.isNaN(
              secondaryIssuedDate.getTime()
            )
              ? secondaryIssuedDate
                .toLocaleString(
                  'en-PH',
                  {
                   timeZone:
                     'Asia/Manila',

                   month: 'short',
                   day: 'numeric',

                    hour:
                      'numeric',

                    minute:
                      '2-digit',

                    hour12: true
                  }
                )
            : 'Issuance time unavailable';

          let secondaryFreshnessText =
            'Freshness unavailable';

          let secondaryFreshnessClass =
            'unknown';

          if (
            secondaryIssuedDate &&
            !Number.isNaN(
              secondaryIssuedDate.getTime()
            )
          ) {
            const secondaryAgeMs =
              Date.now() -
              secondaryIssuedDate.getTime();

            if (secondaryAgeMs >= 0) {
              const secondaryAgeHours =
                Math.floor(
                  secondaryAgeMs /
                  3600000
                );

              if (secondaryAgeHours < 6) {
                secondaryFreshnessText =
                  'Fresh bulletin';

                secondaryFreshnessClass =
                  'fresh';
              } else if (
                secondaryAgeHours < 12
              ) {
                secondaryFreshnessText =
                  'Recent bulletin';

                secondaryFreshnessClass =
                  'moderate';
              } else {
                secondaryFreshnessText =
                  'Older bulletin';

                secondaryFreshnessClass =
                  'older';
              }
            }
          }

          let officialBulletinUrl = '';

          if (advisory.sourceUrl) {
            try {
              const parsedUrl =
                new URL(
                  advisory.sourceUrl
                );

              const hostname =
                parsedUrl.hostname
                  .toLowerCase();

              const isPagasaDomain =
                hostname ===
                  'pagasa.dost.gov.ph' ||
                hostname.endsWith(
                  '.pagasa.dost.gov.ph'
                );

              if (
                parsedUrl.protocol ===
                  'https:' &&
                isPagasaDomain
              ) {
                officialBulletinUrl =
                  parsedUrl.href;
              }
            } catch {
              officialBulletinUrl = '';
            }
          }

          const bulletinLinkHtml =
            officialBulletinUrl
              ? `
                <a
                  class="pagasa-storm-secondary-link"
                  href="${escapeAdvisoryHtml(
                    officialBulletinUrl
                  )}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open official bulletin
                </a>
              `
              : '';

          return `
            <div class="pagasa-storm-secondary-item">
              <div class="pagasa-storm-secondary-info">
                <strong>
                  ${stormName}
                </strong>

                <span>
                  ${bulletinNumber}
                </span>

                <small class="pagasa-storm-secondary-issued">
                  Issued: ${secondaryIssuedText}
                </small>

                <div
                  class="pagasa-storm-secondary-freshness ${secondaryFreshnessClass}"
                >
                  ${secondaryFreshnessText}
                </div>

              </div>

              ${bulletinLinkHtml}
            </div>
          `;
        })
        .join('');

    const issuedDate =
      latest.issuedAt
        ? new Date(latest.issuedAt)
        : null;

    const issuedText =
      issuedDate &&
      !Number.isNaN(
        issuedDate.getTime()
      )
        ? issuedDate.toLocaleString(
            'en-PH',
            {
              dateStyle: 'medium',
              timeStyle: 'short'
            }
          )
        : 'Not available';

    let freshnessText =
      'Bulletin freshness unavailable';

    let freshnessClass =
      'unknown';

    if (
      issuedDate &&
      !Number.isNaN(
        issuedDate.getTime()
      )
    ) {
      const ageMs =
        Date.now() -
        issuedDate.getTime();

      if (ageMs >= 0) {
        const ageMinutes =
          Math.floor(
            ageMs / 60000
          );

        if (ageMinutes < 2) {
          freshnessText =
            'Fresh bulletin · Updated just now';

          freshnessClass =
            'fresh';
        } else if (
          ageMinutes < 60
        ) {
          freshnessText =
            `Fresh bulletin · Updated ${ageMinutes} minutes ago`;

          freshnessClass =
            'fresh';
        } else {
          const ageHours =
            Math.floor(
              ageMinutes / 60
            );

          if (ageHours < 6) {
            freshnessText =
              `Fresh bulletin · Updated ${ageHours} ${
                ageHours === 1
                  ? 'hour'
                  : 'hours'
              } ago`;

            freshnessClass =
              'fresh';
          } else if (
            ageHours < 12
          ) {
            freshnessText =
              `Recent bulletin · Updated ${ageHours} hours ago`;

            freshnessClass =
              'moderate';
          } else {
            freshnessText =
              `Older bulletin · Updated ${ageHours} hours ago`;

            freshnessClass =
              'older';
          }
        }
      }
    }

const sourceText =
  escapeAdvisoryHtml(
        latest.source ||
        'DOST-PAGASA'
      );

    const stormNameText =
      escapeAdvisoryHtml(
        latest.stormName ||
        'Unnamed cyclone'
      );

    const bulletinNumberText =
      Number.isFinite(
        Number(latest.bulletinNumber)
      )
        ? `Bulletin #${Number(
            latest.bulletinNumber
          )}`
        : 'Tropical Cyclone Bulletin';

    const rawLocation =
      String(
        latest.location || ''
      ).trim();

    const hasMeaningfulLocation =
      rawLocation &&
      rawLocation.toLowerCase() !==
        'see official bulletin for affected areas' &&
      rawLocation.toLowerCase() !==
        'see official advisory for affected areas';

    const affectedAreaText =
      hasMeaningfulLocation
        ? escapeAdvisoryHtml(
            rawLocation
          )
        : '';

    const affectedAreaHtml =
      affectedAreaText
        ? `
          <div class="pagasa-storm-area">
            <span class="material-symbols-outlined">
              location_on
            </span>

            <span>
              Affected area:
              <strong>
                ${affectedAreaText}
              </strong>
            </span>
          </div>
        `
        : '';

    let officialSourceUrl = '';

    if (latest.sourceUrl) {
      try {
        const parsedUrl =
          new URL(latest.sourceUrl);

        const hostname =
          parsedUrl.hostname
            .toLowerCase();

        const isPagasaDomain =
          hostname ===
            'pagasa.dost.gov.ph' ||
          hostname.endsWith(
            '.pagasa.dost.gov.ph'
          );

        if (
          parsedUrl.protocol ===
            'https:' &&
          isPagasaDomain
        ) {
          officialSourceUrl =
            parsedUrl.href;
        }
      } catch (error) {
        console.warn(
          'Invalid PAGASA source URL:',
          error
        );
      }
    }

    const officialLinkHtml =
      officialSourceUrl
        ? `
          <a
            class="pagasa-storm-link"
            href="${escapeAdvisoryHtml(
              officialSourceUrl
            )}"
            target="_blank"
            rel="noopener noreferrer"
          >
            View official PAGASA bulletin
          </a>
        `
        : '';

    content.innerHTML = `
      <div class="pagasa-storm-active">

      <div class="pagasa-storm-alert-badge">
        <span class="material-symbols-outlined">
          cyclone
        </span>

         Recent PAGASA cyclone bulletin
      </div>

      <div class="pagasa-storm-name">
        ${stormNameText}
      </div>

      <div class="pagasa-storm-bulletin">
        ${bulletinNumberText}
      </div>


        <div class="pagasa-storm-issued">
          Issued: ${issuedText}
        </div>

        <div
          class="pagasa-storm-freshness ${freshnessClass}"
        >
          ${freshnessText}
        </div>

        <div class="pagasa-storm-freshness-note">
          FarmCast freshness indicates
          bulletin age only, not cyclone
          severity or warning level.
        </div>

        ${
          additionalStormsText
            ? `
              <div class="pagasa-storm-additional">
                <div class="pagasa-storm-additional-count">
                  ${additionalStormsText}
                </div>

                ${
                  additionalStormsHtml
                    ? `
                      <div class="pagasa-storm-secondary-list">
                        ${additionalStormsHtml}
                      </div>

                    `
                    : ''
                }
              </div>
            `
            : ''
        }

        <div class="pagasa-storm-source">
          Source: ${sourceText}
        </div>

        <div class="pagasa-storm-window-note">
          FarmCast recent-feed window: 24 hours.
          This does not represent PAGASA's official
          bulletin validity period.
        </div>

        ${affectedAreaHtml}

        <p>
          ${escapeAdvisoryHtml(
            latest.message ||
            'See the official PAGASA advisory for details.'
          )}
        </p>

        ${officialLinkHtml}
      </div>
    `;

  } catch (error) {
    console.error(
      'PAGASA Storm Watch error:',
      error
    );

    content.innerHTML = `
      <div class="pagasa-storm-error">

        <span class="material-symbols-outlined">
          warning
        </span>

        <div>
          <strong>
            PAGASA Storm Watch could not be loaded
          </strong>

          <p>
            FarmCast encountered an error while
            loading the DOST-PAGASA tropical
            cyclone bulletin feed.
          </p>

          <small>
            Please try again later. This error
            does not indicate cyclone status.
          </small>
        </div>

      </div>
    `;
  }

}

async function refreshWindFlowLayer() {
  if (
    !weatherMap ||
    currentMapLayerName !==
      'wind-flow' ||
    windFlowLoading
  ) {
    return;
  }

  windFlowLoading = true;

  try {
    const hasDetailedGrid =
      updateWindGridFromMap();

    if (!hasDetailedGrid) {
      removeWindFlowLayer();

      toast(
        'Wind Flow is available within the Philippines coverage area.',
        'warn'
      );
      windFlowLoading = false;

      return;
    }

    const windResult =
      await fetchWindFlowData();

    if (!windResult) {
      return;
    }

    if (
      currentMapLayerName !==
      'wind-flow'
    ) {
      return;
    }   

    // saka lang tanggalin ang old layer
    removeWindFlowLayer();

    const {
      points,
      data
    } = windResult;

    const velocityData =
      buildVelocityData(
        points,
        data
      );

    if (
      currentMapLayerName !==
      'wind-flow'
    ) {
      return;
    }

    removeWindFlowLayer();

    windFlowLayer =
      L.velocityLayer({
        displayValues: true,

        displayOptions: {
          velocityType:
            'Model Wind',

          position:
            'bottomleft',

          emptyString:
            'No wind data',

          angleConvention:
            'bearingCW',

          showCardinal: true,

          speedUnit:
            'k/h',

          directionString:
            'Direction',

          speedString:
            'Speed'
        },

        data:
          velocityData,

        minVelocity: 0,
        maxVelocity: 25,
        velocityScale: 0.006,
        opacity: 0.9
      });

    windFlowLayer.addTo(
      weatherMap
    );

  } catch (error) {
    console.error(
      'Wind Flow refresh error:',
      error
    );
  } finally {
    windFlowLoading = false;
  }
}

function scheduleWindFlowRefresh() {
  if (
    currentMapLayerName !==
    'wind-flow'
  ) {
    return;
  }

  clearTimeout(
    windFlowRefreshTimer
  );

  windFlowRefreshTimer =
    setTimeout(() => {

      if (
        currentMapLayerName !==
        'wind-flow'
      ) {
        return;
      }

      if (
        Date.now() <
        windFlowApiCooldownUntil
      ) {
        return;
      }

      const now =
        Date.now();

      // Prevent excessive Open-Meteo
      // refresh requests.
      if (
        now -
          windFlowLastRefresh <
        WIND_FLOW_MIN_API_INTERVAL
      ) {
        return;
      }

      const hadWindFlowLayer =
        Boolean(windFlowLayer);

      const hasDetailedGrid =
        updateWindGridFromMap();

      const gridKey =
        getWindFlowGridKey();

      const cacheIsFresh =
        windFlowDataCache &&
        windFlowDataCacheKey ===
          gridKey &&
        Date.now() -
          windFlowDataCacheTime <
          WIND_FLOW_CACHE_TTL;

      if (
        cacheIsFresh &&
        gridKey ===
          windFlowLastGridKey
      ) {
        return;
      }

      // At world / very wide zoom,
      // remove the regional particle field
      // instead of reusing an old grid.
      if (!hasDetailedGrid) {
        removeWindFlowLayer();

        windFlowLastGridKey =
          '';

        // Show the message only when an
        // existing wind layer was removed,
        // preventing repeated toast spam.
        if (hadWindFlowLayer) {
          toast(
            'Wind Flow is available within the Philippines coverage area.',
            'warn'
          );
          windFlowLoading = false;

        }

        return;
      }

      // No meaningful regional movement,
      // so keep the current wind data.
      if (
        gridKey ===
        windFlowLastGridKey
      ) {
        return;
      }

      refreshWindFlowLayer();

    }, 1800);
}

function updateWindFlowLegend() {
  const title =
    document.getElementById(
      'mapLegendTitle'
    );

  const bar =
    document.getElementById(
      'mapLegendBar'
    );

  if (title) {
    title.textContent =
      'Animated Wind Flow';
  }

  if (bar) {
    bar.innerHTML = `
      <div class="legend-gradient wind-gradient"></div>

      <div class="legend-labels">
        <span>
          Calm
          <small>slow particles</small>
        </span>

        <span>
          Moderate
          <small>moving wind</small>
        </span>

        <span>
          Strong
          <small>fast particles</small>
        </span>
      </div>
    `;
  }
}

// ═══════════════════════════════════════════════════════
// MY CROPS — Full CRUD + Weather Assessment
// ═══════════════════════════════════════════════════════
 
const CROP_EMOJIS = {
  Tomato:'🍅', Eggplant:'🍆', Corn:'🌽', Okra:'🥦', Sitaw:'🫛',
  Ampalaya:'🥒', Pechay:'🥬', Kamote:'🍠', Rice:'🌾',
  Garlic:'🧄', Onion:'🧅', Cabbage:'🥦'
};

// ── SHARED CROP REFERENCE HELPERS ──

const SPECIAL_CROP_REFERENCES = {
  Rice: {
    name: 'Rice',
    localName: 'Palay',
    category: 'grain',
    icon: 'assets/crops/rice.svg',

    plantingMethods: [
      {
        value: 'direct-seeded',
        label: 'Direct Seeded'
      },
      {
        value: 'transplanted',
        label: 'Transplanted'
      }
    ],

    source: {
      agency:
        'Philippine Rice Research Institute (PhilRice)',

      title:
        'Varieties for More',

      url:
        'https://www.philrice.gov.ph/varieties-for-more/'
    }
  }
};

function getFarmCastSelectableCropReferences() {

  const specialCrops =
    Object.values(
      SPECIAL_CROP_REFERENCES
    )
      .filter(
        specialCrop =>
          !CROPS.some(
            crop =>
              crop.name ===
              specialCrop.name
          )
      )
      .map(crop => {

        /*
         * Rice remains outside crop-data.js.
         * Preserve its existing legacy weather
         * limits when it is used by features
         * such as Smart Planting Calendar.
         */
        if (
          crop.name === 'Rice' &&
          CROP_INFO?.Rice
        ) {

          return {
            ...CROP_INFO.Rice,
            ...crop
          };

        }

        return crop;

      });


  return [
    ...CROPS,
    ...specialCrops
  ];
}

function getCropReference(cropName) {

  const datasetReference =
    CROPS.find(
      crop => crop.name === cropName
    );

  if (datasetReference) {
    return datasetReference;
  }

  return (
    SPECIAL_CROP_REFERENCES[cropName] ||
    null
  );
}

function renderMyCropGeneralReference(cropName) {

  const cropReference =
    getCropReference(cropName);

  const reference =
    normalizeCropReferenceSource(
      cropReference?.source
    );

  if (!reference) return '';

  const agencyText = [
    reference.agency,
    reference.office
  ]
    .filter(Boolean)
    .join(' — ');

  return `
    <div class="cmi-source">

      <div class="cmi-source-summary">
        Official crop reference
      </div>

      <details class="cmi-source-details">
        <summary>View crop reference details</summary>

        ${
          agencyText
            ? `
              <div class="cmi-source-agency">
                ${escapeHtml(agencyText)}
              </div>
            `
            : ''
        }

        ${
          reference.title
            ? `
              <div class="cmi-source-title">
                ${escapeHtml(reference.title)}
              </div>
            `
            : ''
        }

      </details>

      ${
        reference.url
          ? `
            <a
              class="cmi-source-link"
              href="${escapeHtml(reference.url)}"
              target="_blank"
              rel="noopener noreferrer"
              onclick="event.stopPropagation()"
            >
              View official crop reference ↗
            </a>
          `
          : ''
      }

    </div>
  `;
}

function getCropIconHtml(
  cropName,
  imageClass = 'crop-ui-icon'
) {

  const reference =
    getCropReference(cropName);

  const iconPath =
    reference?.icon || null;

  if (iconPath) {

    return `
      <img
        src="${escapeHtml(iconPath)}"
        alt="${escapeHtml(cropName)}"
        class="${imageClass}"
      >
    `;
  }

  // Temporary legacy fallback outside
  // the shared/special crop references.
  return escapeHtml(
    CROP_EMOJIS[cropName] || '🌿'
  );
}
 
const CROP_INFO = {
  Tomato:   { days: 75,  minTemp: 18, maxTemp: 32, water: 'Moderate' },
  Eggplant: { days: 80,  minTemp: 22, maxTemp: 35, water: 'Moderate' },
  Corn:     { days: 90,  minTemp: 18, maxTemp: 33, water: 'High' },
  Okra:     { days: 60,  minTemp: 25, maxTemp: 38, water: 'Low' },
  Sitaw:    { days: 65,  minTemp: 20, maxTemp: 35, water: 'Moderate' },
  Ampalaya: { days: 70,  minTemp: 24, maxTemp: 36, water: 'Moderate' },
  Pechay:   { days: 35,  minTemp: 15, maxTemp: 25, water: 'High' },
  Kamote:   { days: 120, minTemp: 20, maxTemp: 35, water: 'Low' },
  Rice:     { days: 110, minTemp: 22, maxTemp: 35, water: 'Very High' },
  Garlic:   { days: 90,  minTemp: 15, maxTemp: 25, water: 'Moderate' },
  Onion:    { days: 100, minTemp: 13, maxTemp: 24, water: 'Moderate' },
  Cabbage:  { days: 75,  minTemp: 10, maxTemp: 24, water: 'High' }
};

// ── MY CROPS WEATHER REFERENCE ──
function getMyCropWeatherAssessment(cropType) {

  if (!currentWeather) {
    return {
      available: false,
      atRisk: false,
      reason: 'Weather data unavailable'
    };
  }

  const reference =
    getCropReference(cropType);

  // Rice is still outside crop-data.js,
  // so preserve its existing FarmCast weather logic.
  const riceFallback =
    cropType === 'Rice'
      ? CROP_INFO.Rice
      : null;

  const minTemp =
    Number.isFinite(reference?.minTemp)
      ? reference.minTemp
      : Number.isFinite(riceFallback?.minTemp)
        ? riceFallback.minTemp
        : null;

  const maxTemp =
    Number.isFinite(reference?.maxTemp)
      ? reference.maxTemp
      : Number.isFinite(riceFallback?.maxTemp)
        ? riceFallback.maxTemp
        : null;

  const windMax =
    Number.isFinite(reference?.windMax)
      ? reference.windMax
      : null;

  const coldDamageBelow =
    Number.isFinite(reference?.coldDamageBelow)
      ? reference.coldDamageBelow
      : null;

  const hasVerifiedLimits =
    Number.isFinite(minTemp) ||
    Number.isFinite(maxTemp) ||
    Number.isFinite(windMax) ||
    Number.isFinite(coldDamageBelow);

  if (!hasVerifiedLimits) {
    return {
      available: false,
      atRisk: false,
      reason: 'No verified weather limits stored'
    };
  }

  const temp =
    Number(currentWeather.main?.temp);

  const windKph =
    Number(currentWeather.wind?.speed) * 3.6;


  // Severe cold threshold
  if (
    Number.isFinite(coldDamageBelow) &&
    Number.isFinite(temp) &&
    temp < coldDamageBelow
  ) {
    return {
      available: true,
      atRisk: true,
      reason: 'Cold damage risk',
      temp,
      windKph
    };
  }


  // Wind threshold
  if (
    Number.isFinite(windMax) &&
    Number.isFinite(windKph) &&
    windKph > windMax
  ) {
    return {
      available: true,
      atRisk: true,
      reason: 'High wind risk',
      temp,
      windKph
    };
  }


  // Minimum temperature
  if (
    Number.isFinite(minTemp) &&
    Number.isFinite(temp) &&
    temp < minTemp
  ) {
    return {
      available: true,
      atRisk: true,
      reason: 'Temperature too low',
      temp,
      windKph
    };
  }


  // Maximum temperature
  if (
    Number.isFinite(maxTemp) &&
    Number.isFinite(temp) &&
    temp > maxTemp
  ) {
    return {
      available: true,
      atRisk: true,
      reason: 'Heat stress risk',
      temp,
      windKph
    };
  }


  return {
    available: true,
    atRisk: false,
    reason: 'Current weather is within stored crop limits',
    temp,
    windKph
  };
}

// ── MY CROPS SEARCHABLE CROP PICKER ──

let myCropPickerCategory = 'all';


function getMyCropPickerDataset() {

  return getFarmCastSelectableCropReferences()
    .map(crop => ({
      name:
        crop.name,

      localName:
        crop.localName || '',

      category:
        crop.category || '',

      icon:
        crop.icon || null
    }))
    .sort(
      (a, b) =>
        a.name.localeCompare(b.name)
    );
}

// ── SELECTABLE CROP DATASET INTEGRITY CHECK ──
function validateFarmCastSelectableCropDataset() {

  const EXPECTED_SELECTABLE_COUNT =
    CROPS.length + 1;

  const issues = [];

  const selectableCrops =
    getMyCropPickerDataset();

  const seenNames =
    new Set();


  // Expected shared + special total
  if (
    selectableCrops.length !==
    EXPECTED_SELECTABLE_COUNT
  ) {

    issues.push(
      `Expected ${EXPECTED_SELECTABLE_COUNT} selectable crops, found ${selectableCrops.length}.`
    );

  }


  // No duplicate selectable names
  selectableCrops.forEach(
    crop => {

      const cropName =
        String(
          crop?.name ||
          ''
        ).trim();

      const normalizedName =
        cropName.toLowerCase();


      if (!cropName) {

        issues.push(
          'Selectable crop has no name.'
        );

        return;
      }


      if (
        seenNames.has(
          normalizedName
        )
      ) {

        issues.push(
          `Duplicate selectable crop "${cropName}".`
        );

        return;
      }


      seenNames.add(
        normalizedName
      );

    }
  );


  // Rice intentionally remains outside
  // the shared crop dataset.
  const sharedRice =
    CROPS.find(
      crop =>
        String(
          crop?.name ||
          ''
        )
          .trim()
          .toLowerCase() ===
        'rice'
    );


  if (sharedRice) {

    issues.push(
      'Rice is duplicated in the shared crop dataset. Rice should currently remain a special crop reference.'
    );

  }


  const riceReference =
    SPECIAL_CROP_REFERENCES
      ?.Rice;


  if (!riceReference) {

    issues.push(
      'Missing special Rice reference.'
    );

  } else {

    // Rice name
    if (
      riceReference.name !==
      'Rice'
    ) {

      issues.push(
        'Special Rice reference has an invalid name.'
      );

    }


    // Local name
    if (
      !String(
        riceReference.localName ||
        ''
      ).trim()
    ) {

      issues.push(
        'Special Rice reference is missing localName.'
      );

    }


    // Category
    if (
      !String(
        riceReference.category ||
        ''
      ).trim()
    ) {

      issues.push(
        'Special Rice reference is missing category.'
      );

    }


    // Local SVG
    if (
      !/^assets\/crops\/.+\.svg$/i
        .test(
          String(
            riceReference.icon ||
            ''
          ).trim()
        )
    ) {

      issues.push(
        'Special Rice reference has an invalid or missing SVG path.'
      );

    }


    // Official source
    if (
      !String(
        riceReference
          ?.source
          ?.url ||
        ''
      ).trim()
    ) {

      issues.push(
        'Special Rice reference is missing its source URL.'
      );

    }


    // Planting methods
    const ricePlantingMethods =
      riceReference
        .plantingMethods;


    if (
      !Array.isArray(
        ricePlantingMethods
      ) ||
      ricePlantingMethods.length === 0
    ) {

      issues.push(
        'Special Rice reference has no planting methods.'
      );

    } else {

      const riceMethodValues =
        new Set(
          ricePlantingMethods
            .map(method =>
              String(
                method?.value ||
                ''
              ).trim()
            )
            .filter(Boolean)
        );


      if (
        !riceMethodValues.has(
          'direct-seeded'
        )
      ) {

        issues.push(
          'Special Rice reference is missing the direct-seeded planting method.'
        );

      }


      if (
        !riceMethodValues.has(
          'transplanted'
        )
      ) {

        issues.push(
          'Special Rice reference is missing the transplanted planting method.'
        );

      }

    }

  }


  // Rice must appear exactly once
  // in the final selectable dataset.
  const selectableRiceCount =
    selectableCrops.filter(
      crop =>
        String(
          crop?.name ||
          ''
        )
          .trim()
          .toLowerCase() ===
        'rice'
    ).length;


  if (
    selectableRiceCount !==
    1
  ) {

    issues.push(
      `Expected Rice exactly once in selectable crops, found ${selectableRiceCount}.`
    );

  }


  return {

    valid:
      issues.length === 0,

    expectedSelectableCount:
      EXPECTED_SELECTABLE_COUNT,

    actualSelectableCount:
      selectableCrops.length,

    riceSpecialReferencePresent:
      Boolean(
        riceReference
      ),

    selectableRiceCount,

    issues

  };

}


const farmCastSelectableCropReport =
  validateFarmCastSelectableCropDataset();


window.FARMCAST_SELECTABLE_CROP_REPORT =
  farmCastSelectableCropReport;


if (
  farmCastSelectableCropReport.valid
) {

  console.info(
    `✅ FarmCast selectable crop dataset passed integrity check (${farmCastSelectableCropReport.actualSelectableCount}/${farmCastSelectableCropReport.expectedSelectableCount}).`
  );

} else {

  console.error(
    '❌ FarmCast selectable crop dataset integrity check failed:',
    farmCastSelectableCropReport.issues
  );

}

function populateMyCropsCropSelect() {

  const select =
    document.getElementById(
      'cropTypeSelect'
    );

  if (!select) return;

  const previousValue =
    select.value;

  const crops =
    sortCropsByFavoritePreference(
      getMyCropPickerDataset()
    );


  select.innerHTML =
    '<option value="">Select crop…</option>' +
    crops.map(crop => `
      <option value="${escapeHtml(crop.name)}">
        ${escapeHtml(crop.name)}
      </option>
    `).join('');


  const stillExists =
    crops.some(
      crop =>
        crop.name === previousValue
    );


  if (stillExists) {
    select.value =
      previousValue;
  }


  updateMyCropPickerTrigger();
}


function updateMyCropPickerTrigger() {

  const select =
    document.getElementById(
      'cropTypeSelect'
    );

  const nameEl =
    document.getElementById(
      'cropPickerTriggerName'
    );

  const subEl =
    document.getElementById(
      'cropPickerTriggerSub'
    );

  const iconEl =
    document.getElementById(
      'cropPickerTriggerIcon'
    );


  if (
    !select ||
    !nameEl ||
    !subEl ||
    !iconEl
  ) {
    return;
  }


  const cropName =
    select.value;


  if (!cropName) {

    nameEl.textContent =
      'Select crop...';

    subEl.textContent =
      'Search FarmCast crop references';

    iconEl.innerHTML = `
      <span class="material-symbols-outlined">
        grass
      </span>
    `;

    return;
  }


  const crop =
    getMyCropPickerDataset()
      .find(
        item =>
          item.name === cropName
      );


  if (!crop) return;


  nameEl.textContent =
    crop.localName
      ? `${crop.name} (${crop.localName})`
      : crop.name;


  subEl.textContent =
    crop.category
      ? formatCropCategory(
          crop.category
        )
      : 'Crop';


  iconEl.innerHTML =
    getCropIconHtml(
      crop.name,
      'crop-picker-selected-img'
    );
}


function renderMyCropPickerCategories() {

  const container =
    document.getElementById(
      'myCropPickerCategories'
    );

  if (!container) return;


  const crops =
    getMyCropPickerDataset();


  const categories = [
    ...new Set(
      crops
        .map(crop => crop.category)
        .filter(Boolean)
    )
  ].sort();


  container.innerHTML = `

    <button
      type="button"
      class="crop-picker-category ${
        myCropPickerCategory === 'all'
          ? 'active'
          : ''
      }"
      onclick="setMyCropPickerCategory('all')"
    >
      All
    </button>

    ${categories.map(category => `
      <button
        type="button"
        class="crop-picker-category ${
          myCropPickerCategory === category
            ? 'active'
            : ''
        }"
        onclick="setMyCropPickerCategory('${escapeHtml(category)}')"
      >
        ${escapeHtml(
          formatCropCategory(category)
        )}
      </button>
    `).join('')}

  `;
}


function setMyCropPickerCategory(
  category
) {

  myCropPickerCategory =
    category;

  renderMyCropPickerCategories();
  renderMyCropPicker();
}


function renderMyCropPicker() {

  const resultsEl =
    document.getElementById(
      'myCropPickerResults'
    );

  const searchEl =
    document.getElementById(
      'myCropPickerSearch'
    );

  const resultCountEl =
    document.getElementById(
      'myCropPickerResultCount'
    );

  const datasetCountEl =
    document.getElementById(
      'myCropPickerDatasetCount'
    );


  if (!resultsEl) return;


  const search =
    (
      searchEl?.value || ''
    )
      .trim()
      .toLowerCase();


  const crops =
    sortCropsByFavoritePreference(
      getMyCropPickerDataset()
    );


  const filtered =
    crops.filter(crop => {

      const matchesCategory =
        myCropPickerCategory === 'all' ||
        crop.category ===
          myCropPickerCategory;


      const searchableText = [
        crop.name,
        crop.localName,
        crop.category
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();


      const matchesSearch =
        !search ||
        searchableText.includes(
          search
        );


      return (
        matchesCategory &&
        matchesSearch
      );
    });


  if (resultCountEl) {
    resultCountEl.textContent =
      `${filtered.length} ${
        filtered.length === 1
          ? 'crop'
          : 'crops'
      } shown`;
  }


  if (datasetCountEl) {

    datasetCountEl.textContent =
      `${crops.length} crops available`;

  }


  if (!filtered.length) {

    resultsEl.innerHTML = `
      <div class="crop-picker-empty">

        <span class="material-symbols-outlined">
          search_off
        </span>

        <strong>
          No crop found
        </strong>

        <span>
          Try another crop name,
          local name, or category.
        </span>

      </div>
    `;

    return;
  }


  resultsEl.innerHTML =
    filtered.map(crop => {

      const iconHtml =
        getCropIconHtml(
          crop.name,
          'crop-picker-item-img'
        );


      const localName =
        crop.localName
          ? crop.localName
          : '';


      const category =
        crop.category
          ? formatCropCategory(
              crop.category
            )
          : 'Crop';


      return `
        <button
          type="button"
          class="crop-picker-item"
          onclick="selectMyCrop(
            decodeURIComponent(
              '${encodeURIComponent(crop.name)}'
            )
          )"
        >

          <span class="crop-picker-item-icon">
            ${iconHtml}
          </span>

          <span class="crop-picker-item-info">

            <strong>
              ${escapeHtml(crop.name)}
            </strong>

            <small>
              ${
                localName
                  ? `${escapeHtml(localName)} · `
                  : ''
              }

              ${escapeHtml(category)}
            </small>

          </span>

          <span class="material-symbols-outlined crop-picker-item-arrow">
            chevron_right
          </span>

        </button>
      `;

    }).join('');
}


function openMyCropPicker() {

  populateMyCropsCropSelect();

  myCropPickerCategory =
    'all';


  const search =
    document.getElementById(
      'myCropPickerSearch'
    );


  if (search) {
    search.value = '';
  }


  renderMyCropPickerCategories();
  renderMyCropPicker();


  const picker =
    document.getElementById(
      'myCropPicker'
    );


  if (picker) {
    picker.style.display =
      'flex';
  }


  setTimeout(() => {
    search?.focus();
  }, 50);
}


function closeMyCropPicker() {

  const picker =
    document.getElementById(
      'myCropPicker'
    );

  if (picker) {
    picker.style.display =
      'none';
  }
}


function selectMyCrop(
  cropName
) {

  const select =
    document.getElementById(
      'cropTypeSelect'
    );

  if (!select) return;


  select.value =
    cropName;


  // Trigger all existing FarmCast
  // planting/variety/harvest logic.
  select.dispatchEvent(
    new Event(
      'change',
      {
        bubbles: true
      }
    )
  );


  updateMyCropPickerTrigger();

  closeMyCropPicker();

}
 
const CROP_HARVEST_WINDOWS = {

  Tomato: {
    'transplanted': {
      minDays: 55,
      maxDays: 65,
      basis: 'after transplanting',
      derived: false,
      source: {
        agency: 'Agricultural Training Institute (ATI)',
        office: 'ATI MIMAROPA',
        title: 'Gabay sa Produksyon ng Kamatis',
        url: 'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2024-06/Gabay%20sa%20Produksyon%20ng%20Kamatis.pdf'
      }
    }
  },
  
  Pechay: {
    'direct-seeded': {
      minDays: 30,
      maxDays: 40,
      basis: 'after sowing',
      source: {
        agency: 'Agricultural Training Institute (ATI)',
        office: 'ATI Cordillera',
        title: 'Pechay Production for Urban and Home Gardening',
        url: 'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2022-12/pechay_production_for_urban_gardening_leaflet.pdf'
      }
    },

    transplanted: {
      minDays: 21,
      maxDays: 28,
      basis: 'after transplanting',
      source: {
        agency: 'Agricultural Training Institute (ATI)',
        office: 'ATI Central Visayas',
        title: 'Pechay Production Guide',
        url: 'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/PECHAY%20final_2.pdf'
      }
    }
  },

  Eggplant: {
    transplanted: {
      minDays: 46,
      maxDays: 50,
      basis: 'after transplanting',
      derived: false,
      source: {
        agency: 'Agricultural Training Institute (ATI)',
        office: 'ATI MIMAROPA',
        title: 'Gabay sa Produksyon ng Talong',
        url: 'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2022-12/gabay_sa_produksyon_ng_talong1.pdf'
      }
    }
  },
  
  Corn: {
    'direct-seeded': {
      minDays: 90,
      maxDays: 120,
      basis: 'after sowing',
      derived: false,
      source: {
        agency: 'Agricultural Training Institute (ATI)',
        office: 'ATI Central Visayas',
        title: 'MAIS Production Guide',
        url: 'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/MAIS%20Production%20Guide.pdf'
      }
    }
  },

  Cabbage: {
    transplanted: {
      minDays: 55,
      maxDays: 60,
      basis: 'after transplanting',
      source: {
        agency: 'Agricultural Training Institute (ATI)',
        office: 'ATI Central Visayas',
        title: 'Cabbage Production Guide',
        url: 'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/Cabbage%20Production%20Guide.pdf'
      }
    }
  },
  
  Okra: {
    'direct-seeded': {
      minDays: 44,
      maxDays: 81,
      basis: 'after sowing',
      derived: true,
      derivationNote:
        'Derived from ATI guidance: flowering at about 40–75 days after planting, with young fruits harvested about 4–6 days after flowering.',
      source: {
        agency: 'Agricultural Training Institute (ATI)',
        office: 'ATI Cordillera',
        title: 'Okra Production Guide',
        url: 'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2022-12/okra_production_flyer_.pdf'
      }
    }
  },

  Sitaw: {
    'direct-seeded': {
      minDays: 60,
      maxDays: 70,
      basis: 'after sowing',
      derived: false,
      note:
        'Source-backed timing applies specifically to Pole Sitaw.',
      source: {
        agency: 'Agricultural Training Institute (ATI)',
        office: 'ATI Cordillera',
        title: 'Pole Sitaw Production for Urban and Backyard Gardening',
        url: 'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2022-12/pole_sitaw_flyer.pdf'
      }
    }
  },

  Onion: {
    transplanted: {
      minDays: 70,
      maxDays: 120,
      basis: 'after transplanting',
      derived: false,
      source: {
        agency: 'Department of Agriculture - Bureau of Agriculture and Fisheries Standards',
        title: 'Code of Good Agricultural Practices for Onion Production',
        url: 'https://ppssd.buplant.da.gov.ph/storage/app/public/LegalReference/PNS_BAFS%20108_2014%20Code%20of%20GAP%20for%20Onion%20Production.pdf'
      }
    }
  },

  Garlic: {
    cloves: {
      minDays: 90,
      maxDays: 120,
      basis: 'after planting',
      derived: false,
      source: {
        agency: 'Department of Agriculture',
        office: 'Regional Field Office No. 02',
        title: 'Garlic Production Guide',
        url: 'https://cagayanvalley.da.gov.ph/wp-content/uploads/2018/02/garlic_production_guide_final.pdf'
      }
    }
  },

  Kamote: {
    cuttings: {
      minDays: 110,
      maxDays: 130,
      basis: 'after planting',
      derived: false,
      source: {
        agency: 'Department of Agriculture',
        office: 'High Value Crops Development Program',
        title: 'Pag-aalaga ng Kamote',
        url: 'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/Production-Guide.pdf'
      }
    }
  },

  'Hot Pepper': {
    transplanted: {
      minDays: 60,
      maxDays: 75,
      basis: 'after transplanting',
      derived: false,
      source: {
        agency: 'Department of Agriculture - Agricultural Training Institute',
        office: 'ATI Cordillera Administrative Region',
        title: 'Hot Pepper (Sili) Production for Urban and Backyard Gardening',
        url: 'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2022-12/hot_pepper_flyer_for_urban_and_backyard_gardening.pdf'
      }
    }
  },

  'Mung Bean': {
    'direct-seeded': {
      minDays: 60,
      maxDays: 65,
      basis: 'after planting',
      derived: false,
      source: {
        agency: 'Department of Agriculture - Bureau of Plant Industry',
        title: 'All About Mungbean (Balatong)',
        url: 'https://library.buplant.da.gov.ph/images/1659331948Mungbean%20%28Balatong%29.pdf'
      }
    }
  },

  Potato: {
    'seed-tubers': {
      minDays: 75,
      maxDays: 90,
      basis: 'after planting',
      derived: false,
      source: {
        agency: 'Department of Agriculture - Regional Field Office No. 02',
        office: 'High Value Crops Development Program',
        title: 'White Potato Production Guide',
        url: 'https://cagayanvalley.da.gov.ph/wp-content/uploads/2018/02/potato.pdf'
      }
    }
  },

  'Bottle Gourd': {
    'direct-seeded': {
      minDays: 60,
      maxDays: 80,
      basis: 'after sowing',
      derived: false,
      note:
        'This automatic range applies to direct-seeded Bottle Gourd because the source states the harvest timing from sowing.',
      source: {
        agency: 'Department of Agriculture - Agricultural Training Institute',
        office: 'ATI Central Visayas - Regional Training Center 7',
        title: 'Upo (Bottle Gourd) Production Guide',
        url: 'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/Upo%20Production%20Guide.pdf'
      }
    }
  },

  'Snap Bean': {
    'direct-seeded': {
      minDays: 55,
      maxDays: 70,
      basis: 'after planting',
      derived: true,
      note:
        'Broad FarmCast range covering the source-backed bush type (about 55–60 days) and pole type (about 60–70 days).',
      source: {
        agency: 'Department of Agriculture - Regional Field Office No. 02',
        office: 'High Value Crops Development Program',
        title: 'Snap Beans Production Guide',
        url: 'https://cagayanvalley.da.gov.ph/wp-content/uploads/2018/02/Snap-Beans-Production-Guide.pdf'
      }
    }
  },

  Cucumber: {
    'direct-seeded': {
      minDays: 33,
      maxDays: 45,
      basis: 'after planting',
      derived: true,
      note:
        'Broad source-backed range covering pickling types (33–40 days) and slicing types (38–45 days). Automatic guidance is limited to direct-seeded cucumber so the planting-date basis remains clear.',
      source: {
        agency: 'Department of Agriculture - Agricultural Training Institute',
        office: 'ATI MIMAROPA',
        title: 'Gabay sa Produksyon ng Pipino',
        url: 'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2024-12/GABAY%20SA%20PRODUKSYON%20NG%20PIPINO.pdf'
      }
    }
  },

  'Water Spinach': {
    'direct-seeded': {
      minDays: 21,
      maxDays: 28,
      basis: 'after planting',
      derived: false,
      note:
        'BPI states that young tops or shoots are ready about 3–4 weeks after planting.',
      source: {
        agency: 'Department of Agriculture - Bureau of Plant Industry',
        title: 'All About Kangkong',
        url: 'https://library.buplant.da.gov.ph/images/1659333070Kangkong.pdf'
      }
    },

    'vine-cuttings': {
      minDays: 21,
      maxDays: 28,
      basis: 'after planting',
      derived: false,
      note:
        'BPI identifies vine cuttings as a propagation method and gives a general harvest window of 3–4 weeks after planting.',
      source: {
        agency: 'Department of Agriculture - Bureau of Plant Industry',
        title: 'All About Kangkong',
        url: 'https://library.buplant.da.gov.ph/images/1659333070Kangkong.pdf'
      }
    }
  },

  'Malabar Spinach': {
    transplanted: {
      minDays: 30,
      maxDays: 45,
      basis: 'after transplanting',
      derived: false,
      source: {
        agency: 'Department of Agriculture - Agricultural Training Institute',
        office: 'ATI Central Visayas - Regional Training Center 7',
        title: 'Alugbati Production Guide',
        url: 'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/alugbati_prod.pdf'
      }
    }
  },

  'Mustard Greens': {
    transplanted: {
      minDays: 14,
      maxDays: 28,
      basis: 'after transplanting',
      derived: false,
      source: {
        agency: 'Department of Agriculture - Agricultural Training Institute',
        office: 'ATI Regional Training Center 02',
        title: 'Gabay sa Pagtatanim ng Mustasa',
        url: 'https://ati2.da.gov.ph/ati-2/content/sites/default/files/2024-03/Gabay%20sa%20Pagtatanim%20ng%20Mustasa.pdf'
      }
    }
  },

  Amaranth: {
    'direct-seeded': {
      minDays: 20,
      maxDays: 45,
      basis: 'after sowing',
      derived: false,
      note:
        'Harvest timing varies by amaranth type. The official Philippine indigenous vegetables guide gives about 20–45 days after planting or sowing.',
      source: {
        agency: 'Department of Agriculture',
        office: 'High Value Crops Development Program',
        title: 'Mga Katutubong Gulay (Indigenous Vegetables)',
        url: 'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/Indigenous-Vegetables-Guide.pdf'
      }
    }
  },

  'Jute Mallow': {
    'direct-seeded': {
      minDays: 20,
      maxDays: 60,
      basis: 'after planting',
      derived: true,
      note:
        'Broad source-backed range: Saluyot is generally harvested about 30–60 days after planting, while some earlier types may be harvested around 20–40 days.',
      source: {
        agency: 'Department of Agriculture',
        office: 'High Value Crops Development Program',
        title: 'Mga Katutubong Gulay (Indigenous Vegetables)',
        url: 'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/Indigenous-Vegetables-Guide.pdf'
      }
    }
  },

  Adlai: {
    'direct-seeded': {
      minMonths: 5,
      maxMonths: 6,
      basis: 'after planting',
      derived: false,
      note:
        'Harvest when the crop is about 5–6 months old or when approximately 80% of the grains are mature.',
      source: {
        agency: 'Department of Agriculture - Agricultural Training Institute',
        office: 'ATI MIMAROPA',
        title: 'Gabay sa Produksyon ng Adlay',
        url: 'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2022-11/Gabay%20sa%20Produksyon%20ng%20Adlay.pdf'
      }
    }
  },

  Arrowroot: {
    suckers: {
      minMonths: 8,
      maxMonths: 10,
      basis: 'after planting',
      derived: false,
      note:
        'The crop is generally ready at 8–10 months. The source also notes that harvesting at 11–12 months may provide higher yield and starch content.',
      source: {
        agency: 'Department of Agriculture - MIMAROPA Region',
        office: 'Regional Agriculture and Fisheries Information Section (RAFIS)',
        title: 'Arrowroot Production',
        url: 'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/Arrowroot-Production.pdf'
      }
    },
  
    'rhizome-rootstock': {
      minMonths: 8,
      maxMonths: 10,
      basis: 'after planting',
      derived: false,
      note:
        'The crop is generally ready at 8–10 months. The source also notes that harvesting at 11–12 months may provide higher yield and starch content.',
      source: {
        agency: 'Department of Agriculture - MIMAROPA Region',
        office: 'Regional Agriculture and Fisheries Information Section (RAFIS)',
        title: 'Arrowroot Production',
        url: 'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/Arrowroot-Production.pdf'
      }
    }
  },

  Abaca: {
    'seedpieces-corms': {
      minMonths: 18,
      maxMonths: 24,
      basis: 'after planting',
      derived: false,
      note:
        'Under normal conditions, Abaca generally reaches maturity 18–24 months after planting or when the flag leaf appears. Field maturity should take priority over the calendar estimate.',
      source: {
        agency: 'Department of Agriculture - Philippine Fiber Industry Development Authority',
        office: 'PhilFIDA',
        title: 'Abaca Technoguide - 2024 Edition',
        url: 'https://philfida.da.gov.ph/images/Publications/Technoguides/abaca-technoguide-2024.pdf'
      }
    },

    suckers: {
      minMonths: 18,
      maxMonths: 24,
      basis: 'after planting',
      derived: false,
      note:
        'Under normal conditions, Abaca generally reaches maturity 18–24 months after planting or when the flag leaf appears. Field maturity should take priority over the calendar estimate.',
      source: {
        agency: 'Department of Agriculture - Philippine Fiber Industry Development Authority',
        office: 'PhilFIDA',
        title: 'Abaca Technoguide - 2024 Edition',
        url: 'https://philfida.da.gov.ph/images/Publications/Technoguides/abaca-technoguide-2024.pdf'
      }
    },
  
    'tissue-cultured-plantlets': {
      minMonths: 18,
      maxMonths: 24,
      basis: 'after planting',
      derived: false,
      note:
        'Under normal conditions, Abaca generally reaches maturity 18–24 months after planting or when the flag leaf appears. Field maturity should take priority over the calendar estimate.',
      source: {
        agency: 'Department of Agriculture - Philippine Fiber Industry Development Authority',
        office: 'PhilFIDA',
        title: 'Abaca Technoguide - 2024 Edition',
        url: 'https://philfida.da.gov.ph/images/Publications/Technoguides/abaca-technoguide-2024.pdf'
      }
    },
  
    'seed-propagated': {
      minMonths: 18,
      maxMonths: 24,
      basis: 'after planting',
      derived: false,
      note:
        'Under normal conditions, Abaca generally reaches maturity 18–24 months after planting or when the flag leaf appears. Field maturity should take priority over the calendar estimate.',
      source: {
        agency: 'Department of Agriculture - Philippine Fiber Industry Development Authority',
        office: 'PhilFIDA',
        title: 'Abaca Technoguide - 2024 Edition',
        url: 'https://philfida.da.gov.ph/images/Publications/Technoguides/abaca-technoguide-2024.pdf'
      }
    }
  },

    'Green Pea': {
    'direct-seeded': {
      minDays: 60,
      maxDays: 70,
      basis: 'after planting',
      derived: false,

      note:
        'Fresh green peas commonly take about 60–70 days from planting until harvest, depending on the variety or type grown.',

      source: {
        agency:
          'Utah State University Extension',

        title:
          'Harvest and Storage — Legumes',

        url:
          [
            'https://',
            'extension.usu.edu/vegetableguide/legumes/harvest'
          ].join('')
      }
    }
  },

    Beetroot: {
    'direct-seeded': {
      minDays: 60,
      maxDays: 80,
      basis: 'after seeding',
      derived: false,

      note:
        'Beet roots are generally mature about 60–80 days after seeding depending on variety. Root size and quality should still be checked before harvest.',

      source: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow Beets in Your Garden',

        url:
          'https://extension.usu.edu/yardandgarden/research/beets-in-the-garden'
      }
    }
  },

    Turnip: {
    'direct-seeded': {
      minDays: 60,
      maxDays: 80,
      basis: 'after seeding',
      derived: false,

      note:
        'Turnip roots generally mature about 60–80 days after seeding. Root size and field condition should still be checked before harvest.',

      source: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow Rutabagas and Turnips in Your Garden',

        url:
          'https://extension.usu.edu/yardandgarden/research/rutabagas-and-turnips-in-the-garden'
      }
    }
  },

    Leek: {
    'direct-seeded': {
      minDays: 100,
      maxDays: 130,
      basis: 'after seeding',
      derived: false,

      note:
        'UF/IFAS production guidance lists approximately 100–130 days to maturity for seeded leek/allium production. Stalk size and cultivar maturity should still be checked before harvest.',

      source: {
        agency:
          'University of Florida IFAS Extension',

        office:
          'UF/IFAS',

        title:
          'Chapter 12. Onion, Leek, and Chive Production',

        url:
          'https://ask.ifas.ufl.edu/publication/CV299'
      }
    },

    transplanted: {
      minDays: 100,
      maxDays: 130,
      basis: 'after transplanting',
      derived: false,

      note:
        'UF/IFAS production guidance lists approximately 100–130 days to maturity for transplanted leek/allium production. Actual stalk size and cultivar maturity should remain the final harvest guide.',

      source: {
        agency:
          'University of Florida IFAS Extension',

        office:
          'UF/IFAS',

        title:
          'Chapter 12. Onion, Leek, and Chive Production',

        url:
          'https://ask.ifas.ufl.edu/publication/CV299'
      }
    }
  },

    'Swiss Chard': {
    'direct-seeded': {
      minDays: 55,
      maxDays: 70,
      basis: 'after seeding',
      derived: false,

      note:
        'Oregon State University Extension lists approximately 55–70 days to maturity for direct-seeded chard. Begin harvest when leaves reach usable size, while younger inner leaves may remain for continued production.',

      source: {
        agency:
          'Oregon State University Extension Service',

        title:
          'Growing Your Own',

        url:
          'https://extension.oregonstate.edu/sites/extd8/files/catalog/auto/EM9128.pdf'
      }
    }
  },

    Parsley: {
    transplanted: {
      minDays: 70,
      maxDays: 100,
      basis: 'after transplanting',
      derived: false,

      note:
        'FAO ECOCROP notes that parsley leaves may begin to be harvested about 70–100 days after transplanting. Continue harvesting usable outer stems while allowing younger inner growth to develop.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Petroselinum crispum — ECOCROP Crop Profile',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/cropView?id=1661'
      }
    }
  },

    Mint: {
    'rootstock-divisions': {
      minDays: 40,
      maxDays: 55,
      basis: 'after planting',
      derived: false,

      note:
        'FAO ECOCROP states that the first peppermint shoots may be harvested about 40–55 days after planting divided rootstocks. Subsequent harvests depend on regrowth and field condition.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Mentha piperita — ECOCROP Crop Profile',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/cropView?id=2099'
      }
    }
  },

    Dill: {
    'direct-seeded': {
      minDays: 42,
      maxDays: 56,
      basis: 'after sowing',
      derived: false,

      note:
        'Utah State University Extension reports that dill is generally ready for its first fresh-foliage harvest about 6–8 weeks after sowing. Seed harvest occurs considerably later and should be based on mature brown flower heads.',

      source: {
        agency:
          'Utah State University Extension',

        office:
          'USU Extension',

        title:
          'How to Grow Dill in Your Garden',

        url:
          'https://extension.usu.edu/yardandgarden/research/dill-in-the-garden'
      }
    }
  },

    Chives: {
    'direct-seeded': {
      minDays: 60,
      maxDays: 60,
      basis:
        'earliest first harvest after seeding',
      derived: false,

      note:
        'Utah State University Extension states that chives may be harvested as early as about 60 days after seeding. This is a first-harvest benchmark; actual plant size and regrowth condition should still guide cutting.',

      source: {
        agency:
          'Utah State University Extension',

        office:
          'USU Extension',

        title:
          'How to Grow Chives in Your Garden',

        url:
          'https://extension.usu.edu/yardandgarden/research/chives-in-the-garden'
      }
    },

    transplanted: {
      minDays: 30,
      maxDays: 30,
      basis:
        'earliest first harvest after transplanting',
      derived: false,

      note:
        'Utah State University Extension states that chives may be harvested as early as about 30 days after transplanting. This is a first-harvest benchmark rather than a one-time final maturity date.',

      source: {
        agency:
          'Utah State University Extension',

        office:
          'USU Extension',

        title:
          'How to Grow Chives in Your Garden',

        url:
          'https://extension.usu.edu/yardandgarden/research/chives-in-the-garden'
      }
    }
  },

  'Bambara Groundnut': {
    'direct-seeded': {
      minDays: 90,
      maxDays: 180,
      basis:
        'after sowing',
      derived: false,

      note:
        'FAO ECOCROP reports that bunch-type Bambara groundnut generally matures about 90–120 days after sowing, while spreading types generally mature about 120–180 days after sowing. FarmCast uses the combined 90–180 day range so both documented growth habits remain covered.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Vigna subterranea — ECOCROP Crop Profile',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/cropView?id=10830'
      }
    }
  },

  'Horse Gram': {
    'direct-seeded': {
      minDays: 120,
      maxDays: 180,
      basis:
        'seed maturity after sowing',
      derived: false,

      note:
        'FAO ECOCROP reports that Horse Gram grown for seed generally matures in about 120–180 days. The much earlier approximately 40-day period applies to forage production, so FarmCast intentionally uses the seed-maturity range for harvest estimation.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Macrotyloma uniflorum — ECOCROP Crop Profile',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/cropView?id=1399'
      }
    }
  },

  'Moth Bean': {
    'direct-seeded': {
      minDays: 60,
      maxDays: 90,
      basis:
        'seed maturity after planting',
      derived: false,

      note:
        'FAO ECOCROP states that mature Moth Bean seeds are generally obtained about 60–90 days after planting. FarmCast uses this source-backed seed-maturity range for direct-seeded crops.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Vigna aconitifolia — ECOCROP Crop Profile',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/cropView?id=2524'
      }
    }
  },

  'Adzuki Bean': {
    'direct-seeded': {
      minDays: 60,
      maxDays: 190,
      basis:
        'seed ripening after planting',
      derived: false,

      note:
        'FAO ECOCROP reports that Adzuki Bean seed ripening may occur about 60–190 days after planting. The broad range reflects variation among crop types and growing environments, so actual mature pod condition should still be checked before harvest.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Vigna angularis — ECOCROP Crop Profile',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/cropView?id=2147'
          ].join('')
      }
    }
  },

  'Rice Bean': {
    'direct-seeded': {
      minDays: 60,
      maxDays: 150,
      basis:
        'crop maturity after sowing',
      derived: false,

      note:
        'PROSEA reports that Rice Bean generally matures about 60–150 days after sowing. In the Philippines, average time to maturity is reported at about 92 days, while later types may require around 130–150 days.',

      source: {
        agency:
          'PROSEA / PROTA',

        title:
          'Vigna umbellata — Rice Bean',

        url:
          'https://prosea.prota4u.org/view.aspx?id=3'
      }
    }
  },

  'Cluster Bean': {
    'direct-seeded': {
      minDays: 90,
      maxDays: 160,
      basis:
        'seed maturity after sowing',
      derived: false,

      note:
        'FAO ECOCROP reports that Cluster Bean green pods are generally harvested about 50–90 days after sowing, while mature seeds ripen about 90–160 days after sowing. FarmCast uses the mature-seed range because this entry is classified as a grain legume.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Cyamopsis tetragonoloba — ECOCROP Crop Profile',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/cropView?id=830'
      }
    }
  },

  'Tepary Bean': {
    'direct-seeded': {
      minDays: 60,
      maxDays: 120,
      basis:
        'first harvest after sowing',
      derived: false,

      note:
        'FAO ECOCROP reports that the first Tepary Bean harvest may be taken about 60–120 days after sowing and lists a crop cycle of about 60–120 days. Actual mature pod condition should still guide dry-seed harvest.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Phaseolus acutifolius — ECOCROP Crop Profile',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/cropView?id=2516'
      }
    }
  },

  'Faba Bean': {
    'direct-seeded': {
      minDays: 120,
      maxDays: 150,
      basis:
        'mature beans after sowing',
      derived: false,

      note:
        'FAO ECOCROP reports that Faba Bean plants generally mature in about 100–150 days, while mature beans are normally obtained about 120–150 days after sowing. FarmCast uses the mature-bean range for the general grain-legume harvest estimate.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Vicia faba — ECOCROP Crop Profile',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/cropView?id=2146'
      }
    }
  },

  Fenugreek: {
    'direct-seeded': {
      minDays: 90,
      maxDays: 100,
      basis:
        'grain harvest after sowing',
      derived: false,

      note:
        'Tamil Nadu Agricultural University reports a crop duration of about 90–100 days when Fenugreek is grown for grain. Greens may be harvested much earlier at about 20–25 days, so FarmCast intentionally uses the grain-harvest range for the general crop estimate.',

      source: {
        agency:
          'Tamil Nadu Agricultural University',

        title:
          'Horticulture — Spice Crops — Fenugreek',

        url:
          'https://www.agritech.tnau.ac.in/horticulture/horti_spice%20crops_fenugreek.html'
      }
    }
  },

  Anise: {
    'direct-seeded': {
      minDays: 120,
      maxDays: 150,
      basis:
        'crop cycle after sowing',
      derived: false,

      note:
        'FAO ECOCROP reports an Anise crop cycle of about 120–150 days. Its crop description follows development from germination through flowering, seed development, and seed ripening, while Iowa State University Extension recommends direct sowing and harvesting seeds once they turn brown.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Pimpinella anisum — ECOCROP Crop Profile',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/cropView?id=8595'
      }
    }
  },

  Ajwain: {
    'direct-seeded': {
      minDays: 100,
      maxDays: 130,
      basis:
        'maturity after sowing',
      derived: false,

      note:
        'ICAR-Indian Institute of Spices Research reports that Ajwain matures in about 100–130 days after sowing. Seeds are harvested when the umbels turn grey-brown, so FarmCast can use this range directly for the general direct-seeded maturity estimate.',

      source: {
        agency:
          'Indian Council of Agricultural Research',

        office:
          'Indian Institute of Spices Research',

        title:
          'Ajwain (Carom) — Trachyspermum ammi',

        url:
          [
            'https://',
            'spices.res.in/products/spices/ajwain.html'
          ].join('')
      }
    }
  },

  Galangal: {
    'rhizome-pieces': {
      minMonths: 3,
      maxMonths: 3,
      basis:
        'after planting',
      derived: false,

      note:
        'FAO ECOCROP reports that Galangal rhizomes develop rapidly and reach their best harvest quality about three months after planting. PROSEA likewise reports that market rhizomes are harvested at about three months, before older rhizomes become increasingly woody and fibrous.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Alpinia galanga — ECOCROP Crop Profile',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/cropView?id=3052'
          ].join('')
      }
    }
  },

   Nigella: {
    'direct-seeded': {
      minDays: 100,
      maxDays: 150,
      basis:
        'crop cycle after sowing',
      derived: false,

      note:
        'FAO ECOCROP reports that Nigella sativa is an annual herb with a general crop cycle of about 100–150 days. FarmCast uses this source-backed range for direct-seeded Nigella rather than narrowing it to a cultivar-specific maturity period.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Nigella sativa — ECOCROP Crop Profile',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/cropView?id=7987'
          ].join('')
      }
    }
  },

  'French Tarragon': {
    'stem-cuttings': {
      minDays: 42,
      maxDays: 56,
      basis:
        'after setting out',
      derived: true,

      derivationNote:
        'Derived directly from the source-backed first-harvest timing of 6–8 weeks after setting out: 6 × 7 = 42 days and 8 × 7 = 56 days.',

      note:
        'The Midwest Vegetable Production Guide reports that French Tarragon can generally be harvested twice per year, with the first harvest about 6–8 weeks after plants are set out.',

      source: {
        agency:
          'Midwest Vegetable Production Guide',

        title:
          'Leafy Vegetables and Herbs — French Tarragon',

        url:
          [
            'https://',
            'extension.illinois.edu/media/4037/download?inline='
          ].join('')
      }
    },

    'root-divisions': {
      minDays: 42,
      maxDays: 56,
      basis:
        'after setting out',
      derived: true,

      derivationNote:
        'Derived directly from the source-backed first-harvest timing of 6–8 weeks after setting out: 6 × 7 = 42 days and 8 × 7 = 56 days.',

      note:
        'The Midwest Vegetable Production Guide reports that French Tarragon can generally be harvested twice per year, with the first harvest about 6–8 weeks after plants are set out.',

      source: {
        agency:
          'Midwest Vegetable Production Guide',

        title:
          'Leafy Vegetables and Herbs — French Tarragon',

        url:
          [
            'https://',
            'extension.illinois.edu/media/4037/download?inline='
          ].join('')
      }
    }
  },

  'Sweet Marjoram': {
    transplanted: {
      minDays: 49,
      maxDays: 56,
      basis:
        'after planting',
      derived: true,

      derivationNote:
        'Derived directly from Cornell Cooperative Extension guidance that Sweet Marjoram leaves may be used 7–8 weeks from planting: 7 × 7 = 49 days and 8 × 7 = 56 days.',

      note:
        'Cornell Cooperative Extension recommends sowing Sweet Marjoram indoors and transplanting seedlings to the field, and reports that leaves may be used about 7–8 weeks from planting. FarmCast applies this first-harvest estimate only to the transplanted-seedling establishment method.',

      source: {
        agency:
          'Cornell Cooperative Extension',

        title:
          'Herbs — Sweet Marjoram',

        url:
          [
            'https://',
            's3.amazonaws.com/assets.cce.cornell.edu/attachments/22766/Herbs.pdf?1493928858='
          ].join('')
      }
    }
  },

  Borage: {
    'direct-seeded': {
      minDays: 75,
      maxDays: 75,
      basis:
        'seed-crop harvest after sowing',
      derived: false,

      note:
        'Peer-reviewed Chilean agricultural research reports that Borage is ready for harvest at about 75 days after sowing. This FarmCast automatic estimate represents seed-crop maturity; culinary leaves may be used earlier and flowers may be picked as they open.',

      source: {
        agency:
          'Chilean Journal of Agricultural Research',

        title:
          'Borage (Borago officinalis L.) Response to N, P, K, and S Fertilization in South Central Chile',

        url:
          [
            'https://',
            'www.scielo.cl/scielo.php?lng=en&nrm=iso&pid=S0718-58392010000200006&script=sci_arttext&tlng=en'
          ].join('')
      }
    }
  },

  Arugula: {
    'direct-seeded': {
      minDays: 20,
      maxDays: 40,
      basis:
        'after seeding',
      derived: true,

      derivationNote:
        'Broad FarmCast range combining University of Illinois Extension seasonal guidance: summer-grown Arugula may be harvested within about 20 days after seeding, while spring and fall crops are generally harvested about 30–40 days after seeding.',

      note:
        'This range represents first leafy harvest rather than seed maturity. Actual timing varies with season, temperature, cultivar, and desired leaf size.',

      source: {
        agency:
          'University of Illinois Extension',

        title:
          'Arugula: A New Trendy Green from the Old World',

        url:
          [
            'https://',
            'extension.illinois.edu/blogs/good-growing/2018-11-07-arugula-new-trendy-green-old-world'
          ].join('')
      }
    }
  },

  Purslane: {
    'direct-seeded': {
      minDays: 21,
      maxDays: 28,
      basis:
        'first cut after sowing',
      derived: true,

      derivationNote:
        'Derived directly from PROSEA guidance that the first commercial cut is about 3–4 weeks after sowing: 3 × 7 = 21 days and 4 × 7 = 28 days.',

      note:
        'This estimate represents the first leafy harvest. PROSEA also reports that cultivated Purslane may receive successive cuts at about two-week intervals, so later harvests are managed as repeated-cut guidance rather than one final maturity date.',

      source: {
        agency:
          'Plant Resources of South-East Asia',

        office:
          'PROSEA',

        title:
          'Portulaca L. — Purslane',

        url:
          [
            'https://',
            'prosea.prota4u.org/view.aspx?id=2191'
          ].join('')
      }
    }
  },

  'New Zealand Spinach': {
    'direct-seeded': {
      minDays: 50,
      maxDays: 70,
      basis:
        'after seeding',
      derived: false,

      note:
        'Utah State University Extension reports that New Zealand Spinach takes about 50–70 days from seed to harvest. This FarmCast automatic estimate applies only to direct-seeded plants. The same source allows seedlings to be started indoors about 3–4 weeks before transplanting, but it does not provide a separate transplant-to-harvest interval.',

      source: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow New Zealand Spinach in Your Garden',

        url:
          [
            'https://',
            'extension.usu.edu/yardandgarden/research/new-zealand-spinach-in-the-garden'
          ].join('')
      }
    }
  },

  Endive: {
    'direct-seeded': {
      minDays: 60,
      maxDays: 80,
      basis:
        'after seeding',
      derived: false,

      note:
        'Florida IFAS lists approximately 60–80 days from seeding to harvest for Endive/Escarole. FAO ECOCROP notes that individual leaves may be harvested earlier and that developed heads may mature over a broader range, so this FarmCast estimate represents the standard garden harvest window rather than the earliest possible leaf picking.',

      source: {
        agency:
          'University of Florida IFAS Extension',

        title:
          'Endive/Escarole — Florida Fresh',

        url:
          [
            'https://',
            'floridafresh.ifas.ufl.edu/PlantDetails/Details/18'
          ].join('')
      }
    }
  },

  'Corn Salad': {
    'direct-seeded': {
      minDays: 45,
      maxDays: 55,
      basis:
        'after seeding',
      derived: false,

      note:
        'Washington State University Extension lists Corn Salad (Mâche/Feldsalat) as a direct-seeded vegetable with approximately 45–55 days to harvest.',

      source: {
        agency:
          'Washington State University Extension',

        title:
          'Home Vegetable Gardening in Washington',

        url:
          [
            'https://',
            'pubs.extension.wsu.edu/product/home-vegetable-gardening-in-washington-home-garden-series/'
          ].join('')
      }
    },

    transplanted: {
      minDays: 14,
      maxDays: 21,
      basis:
        'after transplanting',
      derived: true,

      derivationNote:
        'Derived directly from Utah State University Extension guidance that harvest can begin about 2–3 weeks after transplanting: 2 × 7 = 14 days and 3 × 7 = 21 days.',

      note:
        'This estimate applies to established transplants. Harvest stage may vary because individual leaves or the entire young rosette can be collected.',

      source: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow Lamb\'s Lettuce in Your Garden',

        url:
          [
            'https://',
            'extension.usu.edu/yardandgarden/research/lambs-lettuce-in-the-garden'
          ].join('')
      }
    }
  },

  Salsify: {
    'direct-seeded': {
      minDays: 110,
      maxDays: 150,
      basis:
        'after seeding',
      derived: false,

      note:
        'Washington State University Extension lists Salsify as a direct-seeded cool-season vegetable with approximately 110–150 days to harvest. Utah State University Extension independently describes regular Salsify as requiring about a 120-day growing period.',

      source: {
        agency:
          'Washington State University Extension',

        title:
          'Chapter 7: Vegetable Gardening — The Pacific Northwest Gardener’s Handbook',

        url:
          [
            'https://',
            'extension.wsu.edu/pnw-gardeners-handbook/chapter-7-vegetable-gardening/'
          ].join('')
      }
    }
  },



};

const RICE_VARIETY_HARVEST_RULES = {
  'tubigan 22': {
    displayName: 'Tubigan 22',

    'direct-seeded': {
      minDays: 108,
      maxDays: 108,
      basis: 'after direct seeding',
      source: {
        agency: 'Philippine Rice Research Institute (PhilRice)',
        title: 'Varieties for More',
        url: 'https://www.philrice.gov.ph/varieties-for-more/'
      }
    },

    'transplanted': {
      minDays: 115,
      maxDays: 115,
      basis: 'after transplanting',
      source: {
        agency: 'Philippine Rice Research Institute (PhilRice)',
        title: 'Varieties for More',
        url: 'https://www.philrice.gov.ph/varieties-for-more/'
      }
    }
  },

  'nsic rc226': {
    displayName: 'NSIC Rc226',

    'direct-seeded': {
      minDays: 104,
      maxDays: 104,
      basis: 'after direct wet seeding',
      note: 'Applies to direct wet-seeded establishment.',
      source: {
        agency: 'Philippine Rice Research Institute (PhilRice)',
        title: 'New varieties released for irrigated lowlands',
        url: 'https://www.philrice.gov.ph/new-varieties-released-for-irrigated-lowlands/'
      }
    },

    'transplanted': {
      minDays: 112,
      maxDays: 112,
      basis: 'after transplanting',
      source: {
        agency: 'Philippine Rice Research Institute (PhilRice)',
        title: 'New varieties released for irrigated lowlands',
        url: 'https://www.philrice.gov.ph/new-varieties-released-for-irrigated-lowlands/'
      }
    }
  },

  'mestiso 29': {
    displayName: 'Mestiso 29',

    'transplanted': {
      minDays: 110,
      maxDays: 110,
      basis: 'after transplanting',
      source: {
        agency: 'Philippine Rice Research Institute (PhilRice)',
        title: 'Varieties for More',
       url: 'https://www.philrice.gov.ph/varieties-for-more/'
      }
    }
  },

  'mestiso 19': {
    displayName: 'Mestiso 19',

    'transplanted': {
      minDays: 110,
      maxDays: 110,
      basis: 'after transplanting',
      source: {
        agency: 'Philippine Rice Research Institute (PhilRice)',
        title: 'Varieties for More',
        url: 'https://www.philrice.gov.ph/varieties-for-more/'
      }
    }
  },

  'mestiso 20': {
    displayName: 'Mestiso 20',

    'transplanted': {
      minDays: 111,
      maxDays: 111,
      basis: 'after transplanting',
      source: {
        agency: 'Philippine Rice Research Institute (PhilRice)',
        title: 'Varieties for More',
        url: 'https://www.philrice.gov.ph/varieties-for-more/'
      }
    }
  }
};

const CROP_STAGE_HARVEST_WINDOWS = {
  Ampalaya: {
    stage: 'flowering',
    minDays: 18,
    maxDays: 20,
    basis: 'after farmer-observed flowering',
    source: {
      agency: 'Agricultural Training Institute (ATI)',
      office: 'ATI MIMAROPA',
      title: 'Gabay sa Produksyon ng Ampalaya',
      url: 'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2022-12/gabay_sa_produksyon_ng_ampalaya_final_2.pdf'
    }
  },

  Tomato: {
    stage: 'flowering',
    minDays: 15,
    maxDays: 20,
    basis: 'after farmer-observed flowering',
    source: {
      agency: 'Agricultural Training Institute (ATI)',
      office: 'ATI MIMAROPA',
      title: 'Gabay sa Produksyon ng Kamatis',
      url: 'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2024-06/Gabay%20sa%20Produksyon%20ng%20Kamatis.pdf'
    }
  },

  Lychee: {
    stage: 'flowering',
    minDays: 98,
    maxDays: 106,
    basis:
      'after farmer-observed flowering',

    source: {
      agency:
        'Food and Agriculture Organization of the United Nations',

      office:
        'FAO ECOCROP',

      title:
        'Litchi chinensis — ECOCROP',

      url:
        'https://ecocrop.apps.fao.org/ecocrop/srv/en/cropView?id=1357'
    }
  },

    Longan: {
    stage: 'flowering',
    minDays: 140,
    maxDays: 190,
    basis:
      'after farmer-observed flowering',

    source: {
      agency:
        'University of Florida IFAS Extension',

      title:
        'Longan Growing in the Florida Home Landscape',

      url:
        'https://edis.ifas.ufl.edu/publication/MG049'
    }
  }


};

function updatePlantingMethodOptions() {
  const cropSelect =
    document.getElementById('cropTypeSelect');

  const plantingMethodSelect =
    document.getElementById('cropPlantingMethod');

  if (!cropSelect || !plantingMethodSelect) return;

  const cropType =
    cropSelect.value;

  const cropReference =
    getCropReference(
      cropType
    );

  const referencePlantingMethods =
    Array.isArray(
      cropReference?.plantingMethods
    )
      ? cropReference.plantingMethods
      : [];


  const options =
    referencePlantingMethods;
  if (!options.length) {
    plantingMethodSelect.innerHTML =
      '<option value="">Select a crop first</option>';

    plantingMethodSelect.value = '';

    updateCropVarietyHint();
    updateCropPlantingDateLabel();
    updateAddCropHarvestEstimate();

    return;
  }

  const previousValue =
    plantingMethodSelect.value;

  plantingMethodSelect.innerHTML =
    options
      .map(option => `
        <option value="${option.value}">
          ${option.label}
        </option>
      `)
      .join('');

  const previousStillValid =
    options.some(
      option => option.value === previousValue
    );

  if (previousStillValid) {
    plantingMethodSelect.value = previousValue;
  } else {
    plantingMethodSelect.value =
      options[0]?.value || '';
  }

  updateCropVarietyHint();
  updateCropPlantingDateLabel();
  updateAddCropHarvestEstimate();
}

function updateCropVarietySuggestions() {
  const cropSelect = document.getElementById('cropTypeSelect');
  const varietyInput = document.getElementById('cropVariety');

  if (!cropSelect || !varietyInput) return;

  const isRice = cropSelect.value === 'Rice';

  if (isRice) {
    varietyInput.setAttribute('list', 'riceVarietySuggestions');
    varietyInput.placeholder = 'e.g. NSIC Rc226';
  } else {
    varietyInput.removeAttribute('list');
    varietyInput.placeholder = 'Enter variety (optional)';
  }
}

function updateCropVarietyHint() {
  const cropSelect = document.getElementById('cropTypeSelect');
  const varietyInput = document.getElementById('cropVariety');
  const plantingMethodSelect = document.getElementById('cropPlantingMethod');
  const hint = document.getElementById('cropVarietyHint');

  if (!cropSelect || !varietyInput || !hint) return;

  const cropType = cropSelect.value;
  const variety = varietyInput.value.trim();

  if (cropType !== 'Rice' || !variety) {
    hint.style.display = 'none';
    hint.textContent = '';
    return;
  }

  const normalizedVariety =
    normalizeRiceVarietyName(variety);

  const varietyRules =
    RICE_VARIETY_HARVEST_RULES[normalizedVariety];

  hint.style.display = 'block';

  if (!varietyRules) {
    hint.textContent =
      'Rice variety not yet verified in FarmCast. No automatic harvest estimate will be applied unless source-backed timing is available.';
    return;
  }

  const plantingMethod =
    plantingMethodSelect?.value || 'direct-seeded';

  const methodRule =
    varietyRules[plantingMethod];

  if (!methodRule) {
    hint.textContent =
      '✓ Verified Rice variety, but source-backed timing is not yet available for the selected planting method.';
    return;
  }

  hint.textContent =
    methodRule.note
      ? `✓ Verified variety-specific timing available. ${methodRule.note}`
      : '✓ Verified variety-specific timing is available for this planting method.';
}

document
  .getElementById('cropTypeSelect')
  ?.addEventListener('change', () => {

    updatePlantingMethodOptions();

    updateCropVarietySuggestions();

    updateCropVarietyHint();

    updateMyCropPickerTrigger();

  });


document
  .getElementById('cropVariety')
  ?.addEventListener('input', () => {
    updateCropVarietyHint();
    updateCropPlantingDateLabel();
    updateAddCropHarvestEstimate();
  });

document
  .getElementById('cropPlantingMethod')
  ?.addEventListener('change', () => {
    updateCropVarietyHint();
    updateAddCropHarvestEstimate();
  });

updatePlantingMethodOptions();
updateCropVarietySuggestions();
updateCropVarietyHint();

function formatDateInputLocal(date) {
  return (
    `${date.getFullYear()}-` +
    `${String(date.getMonth() + 1).padStart(2, '0')}-` +
    `${String(date.getDate()).padStart(2, '0')}`
  );
}


function addDaysToDate(dateString, days) {
  const date = new Date(`${dateString}T00:00:00`);

  date.setDate(
    date.getDate() + days
  );

  return date;
}

function addMonthsToDate(dateString, months) {
  const date =
    new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const originalDay =
    date.getDate();

  // Move to day 1 first so dates such as
  // January 31 do not overflow incorrectly.
  date.setDate(1);

  date.setMonth(
    date.getMonth() + months
  );

  const lastDayOfTargetMonth =
    new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

  date.setDate(
    Math.min(
      originalDay,
      lastDayOfTargetMonth
    )
  );

  return date;
}

function normalizeRiceVarietyName(value = '') {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\brc\s+(\d+)/g, 'rc$1');
}

function resolveCropPlantingMethod(crop) {
  if (!crop) return null;

  if (crop.plantingMethod) {

    // Normalize the shared crop-data.js value
    // to FarmCast's existing harvest-rule key.
    if (
      crop.plantingMethod ===
      'transplanted-seedlings'
    ) {
      return 'transplanted';
    }

    return crop.plantingMethod;
  }

  // Legacy compatibility only.
  // Older FarmCast records were created before plantingMethod existed.
  // Preserve previous behavior only for crops whose old app logic
  // already treated planting as direct seeding.
  const legacyDirectSeededCrops = [
    'Rice',
    'Corn',
    'Okra',
    'Sitaw',
    
  ];

  if (legacyDirectSeededCrops.includes(crop.type)) {
    return 'direct-seeded';
  }

  return null;
}

// ── HARVEST RULE INTEGRITY CHECK ──
function normalizeHarvestRulePlantingMethod(
  value = ''
) {

  const method =
    String(
      value || ''
    ).trim();


  // crop-data.js uses this more descriptive
  // value, while existing harvest rules use
  // the canonical "transplanted" key.
  if (
    method ===
    'transplanted-seedlings'
  ) {

    return 'transplanted';

  }


  return method;
}


function hasValidHarvestTiming(
  rule
) {

  if (!rule) {
    return false;
  }


  const hasValidDayRange =
    Number.isFinite(
      rule.minDays
    ) &&
    Number.isFinite(
      rule.maxDays
    ) &&
    rule.minDays > 0 &&
    rule.maxDays >=
      rule.minDays;


  const hasValidMonthRange =
    Number.isFinite(
      rule.minMonths
    ) &&
    Number.isFinite(
      rule.maxMonths
    ) &&
    rule.minMonths > 0 &&
    rule.maxMonths >=
      rule.minMonths;


  return (
    hasValidDayRange ||
    hasValidMonthRange
  );

}


function validateFarmCastHarvestRules() {

  const issues = [];

  let cropHarvestRuleCount =
    0;

  let riceHarvestRuleCount =
    0;

  let stageHarvestRuleCount =
    0;


  // ── Crop-level harvest rules ──
  Object.entries(
    CROP_HARVEST_WINDOWS
  ).forEach(
    ([
      cropName,
      harvestMethods
    ]) => {

      const cropReference =
        getCropReference(
          cropName
        );


      if (!cropReference) {

        issues.push(
          `${cropName}: harvest rules exist but no crop reference was found.`
        );

        return;
      }


      const supportedMethods =
        new Set(
          (
            cropReference
              .plantingMethods ||
            []
          )
            .map(method =>
              normalizeHarvestRulePlantingMethod(
                method?.value
              )
            )
            .filter(Boolean)
        );


      Object.entries(
        harvestMethods || {}
      ).forEach(
        ([
          ruleMethod,
          rule
        ]) => {

          cropHarvestRuleCount++;


          const normalizedRuleMethod =
            normalizeHarvestRulePlantingMethod(
              ruleMethod
            );


          if (
            !supportedMethods.has(
              normalizedRuleMethod
            )
          ) {

            issues.push(
              `${cropName}: harvest rule "${ruleMethod}" does not match a verified planting method.`
            );

          }


          if (
            !hasValidHarvestTiming(
              rule
            )
          ) {

            issues.push(
              `${cropName} / ${ruleMethod}: invalid harvest timing range.`
            );

          }


          if (
            !String(
              rule?.basis ||
              ''
            ).trim()
          ) {

            issues.push(
              `${cropName} / ${ruleMethod}: missing harvest timing basis.`
            );

          }


          if (
            !String(
              rule
                ?.source
                ?.url ||
              ''
            ).trim()
          ) {

            issues.push(
              `${cropName} / ${ruleMethod}: missing harvest-rule source URL.`
            );

          }

        }
      );

    }
  );


  // ── Rice variety-specific rules ──
  const riceReference =
    SPECIAL_CROP_REFERENCES
      ?.Rice;


  const riceSupportedMethods =
    new Set(
      (
        riceReference
          ?.plantingMethods ||
        []
      )
        .map(method =>
          normalizeHarvestRulePlantingMethod(
            method?.value
          )
        )
        .filter(Boolean)
    );


  Object.entries(
    RICE_VARIETY_HARVEST_RULES
  ).forEach(
    ([
      varietyKey,
      varietyRules
    ]) => {

      Object.entries(
        varietyRules || {}
      ).forEach(
        ([
          ruleMethod,
          rule
        ]) => {

          // Metadata only, not a planting method.
          if (
            ruleMethod ===
            'displayName'
          ) {
            return;
          }


          riceHarvestRuleCount++;


          const normalizedRuleMethod =
            normalizeHarvestRulePlantingMethod(
              ruleMethod
            );


          if (
            !riceSupportedMethods.has(
              normalizedRuleMethod
            )
          ) {

            issues.push(
              `Rice ${varietyKey}: harvest rule "${ruleMethod}" is not supported by the special Rice reference.`
            );

          }


          if (
            !hasValidHarvestTiming(
              rule
            )
          ) {

            issues.push(
              `Rice ${varietyKey} / ${ruleMethod}: invalid harvest timing range.`
            );

          }


          if (
            !String(
              rule?.basis ||
              ''
            ).trim()
          ) {

            issues.push(
              `Rice ${varietyKey} / ${ruleMethod}: missing harvest timing basis.`
            );

          }


          if (
            !String(
              rule
                ?.source
                ?.url ||
              ''
            ).trim()
          ) {

            issues.push(
              `Rice ${varietyKey} / ${ruleMethod}: missing source URL.`
            );

          }

        }
      );

    }
  );


  // ── Stage-based harvest rules ──
  const validGrowthStages =
    new Set([
      'seedling',
      'vegetative',
      'flowering',
      'fruiting',
      'ready'
    ]);


  Object.entries(
    CROP_STAGE_HARVEST_WINDOWS
  ).forEach(
    ([
      cropName,
      rule
    ]) => {

      stageHarvestRuleCount++;


      const cropReference =
        getCropReference(
          cropName
        );


      if (!cropReference) {

        issues.push(
          `${cropName}: stage-based harvest rule has no crop reference.`
        );

      }


      const stage =
        String(
          rule?.stage ||
          ''
        ).trim();


      if (
        !validGrowthStages.has(
          stage
        )
      ) {

        issues.push(
          `${cropName}: invalid stage-based harvest stage "${stage || 'missing'}".`
        );

      }


      if (
        !hasValidHarvestTiming(
          rule
        )
      ) {

        issues.push(
          `${cropName}: invalid stage-based harvest timing range.`
        );

      }


      if (
        !String(
          rule?.basis ||
          ''
        ).trim()
      ) {

        issues.push(
          `${cropName}: stage-based harvest rule is missing its timing basis.`
        );

      }


      if (
        !String(
          rule
            ?.source
            ?.url ||
          ''
        ).trim()
      ) {

        issues.push(
          `${cropName}: stage-based harvest rule is missing its source URL.`
        );

      }

    }
  );


  const totalValidatedRules =
    cropHarvestRuleCount +
    riceHarvestRuleCount +
    stageHarvestRuleCount;


  return {

    valid:
      issues.length === 0,

    cropHarvestRuleCount,

    riceHarvestRuleCount,

    stageHarvestRuleCount,

    totalValidatedRules,

    issues

  };

}


const farmCastHarvestRuleReport =
  validateFarmCastHarvestRules();


window.FARMCAST_HARVEST_RULE_REPORT =
  farmCastHarvestRuleReport;


if (
  farmCastHarvestRuleReport.valid
) {

  console.info(
    `✅ FarmCast harvest rules passed integrity check (${farmCastHarvestRuleReport.totalValidatedRules} rules validated).`
  );

} else {

  console.error(
    '❌ FarmCast harvest-rule integrity check failed:',
    farmCastHarvestRuleReport.issues
  );

}

// ── HARVEST GUIDANCE COVERAGE REPORT ──
function getFarmCastHarvestCoverageReport() {

  const automaticHarvestCrops =
    new Set(
      Object.keys(
        CROP_HARVEST_WINDOWS
      )
    );


  const stageBasedHarvestCrops =
    new Set(
      Object.keys(
        CROP_STAGE_HARVEST_WINDOWS
      )
    );


  const automatic = [];

  const stageBasedOnly = [];

  const guidanceOnly = [];

  const noStoredGuidance = [];


  CROPS.forEach(crop => {

    const cropName =
      String(
        crop?.name ||
        ''
      ).trim();


    const hasAutomaticRule =
      automaticHarvestCrops.has(
        cropName
      );


    const hasStageRule =
      stageBasedHarvestCrops.has(
        cropName
      );


    const hasHarvestNote =
      Boolean(
        String(
          crop?.harvestNote ||
          ''
        ).trim()
      );


    if (hasAutomaticRule) {

      automatic.push(
        cropName
      );

      return;

    }


    if (hasStageRule) {

      stageBasedOnly.push(
        cropName
      );

      return;

    }


    if (hasHarvestNote) {

      guidanceOnly.push(
        cropName
      );

      return;

    }


    noStoredGuidance.push(
      cropName
    );

  });


  const harvestNoteCount =
    CROPS.filter(crop =>
      Boolean(
        String(
          crop?.harvestNote ||
          ''
        ).trim()
      )
    ).length;


  const classifiedCount =
    automatic.length +
    stageBasedOnly.length +
    guidanceOnly.length +
    noStoredGuidance.length;


  const riceVarietyCount =
    Object.keys(
      RICE_VARIETY_HARVEST_RULES
    ).length;


  return {

    sharedCropCount:
      CROPS.length,

    classifiedCount,

    classificationComplete:
      classifiedCount ===
      CROPS.length,


    harvestNoteCount,


    automatic: {
      count:
        automatic.length,

      crops:
        automatic
    },


    stageBasedOnly: {
      count:
        stageBasedOnly.length,

      crops:
        stageBasedOnly
    },


    guidanceOnly: {
      count:
        guidanceOnly.length,

      crops:
        guidanceOnly
    },


    noStoredGuidance: {
      count:
        noStoredGuidance.length,

      crops:
        noStoredGuidance
    },


    rice: {
      specialReference:
        Boolean(
          SPECIAL_CROP_REFERENCES
            ?.Rice
        ),

      verifiedVarietyCount:
        riceVarietyCount
    }

  };

}


const farmCastHarvestCoverageReport =
  getFarmCastHarvestCoverageReport();


window.FARMCAST_HARVEST_COVERAGE_REPORT =
  farmCastHarvestCoverageReport;


if (
  farmCastHarvestCoverageReport
    .classificationComplete
) {

  console.info(
    '✅ FarmCast harvest guidance coverage classified all shared crops:',
    {
      automatic:
        farmCastHarvestCoverageReport
          .automatic
          .count,

      stageBasedOnly:
        farmCastHarvestCoverageReport
          .stageBasedOnly
          .count,

      guidanceOnly:
        farmCastHarvestCoverageReport
          .guidanceOnly
          .count,

      noStoredGuidance:
        farmCastHarvestCoverageReport
          .noStoredGuidance
          .count
    }
  );

} else {

  console.error(
    '❌ FarmCast harvest coverage classification is incomplete.',
    farmCastHarvestCoverageReport
  );

}

// ── FARMCAST MASTER CROP INTEGRITY REPORT ──
function getFarmCastIntegrityReport() {

  const checks = {

    cropDataset: {
      passed:
        Boolean(
          farmCastCropDatasetReport
            ?.valid
        ),

      actual:
        farmCastCropDatasetReport
          ?.actualCount || 0,

      expected:
        farmCastCropDatasetReport
          ?.expectedCount || 300
    },


    selectableDataset: {
      passed:
        Boolean(
          farmCastSelectableCropReport
            ?.valid
        ),

      actual:
        farmCastSelectableCropReport
          ?.actualSelectableCount || 0,

      expected:
        farmCastSelectableCropReport
          ?.expectedSelectableCount ||
          (CROPS.length + 1)
    },


    harvestRules: {
      passed:
        Boolean(
          farmCastHarvestRuleReport
            ?.valid
        ),

      validatedRules:
        farmCastHarvestRuleReport
          ?.totalValidatedRules || 0
    },


    harvestCoverage: {
      passed:
        Boolean(
          farmCastHarvestCoverageReport
            ?.classificationComplete
        ),

      classified:
        farmCastHarvestCoverageReport
          ?.classifiedCount || 0,

      expected:
        farmCastHarvestCoverageReport
          ?.sharedCropCount ||
          CROPS.length
    }

  };


  const failedChecks =
    Object.entries(
      checks
    )
      .filter(
        ([, check]) =>
          !check.passed
      )
      .map(
        ([checkName]) =>
          checkName
      );


  const valid =
    failedChecks.length === 0;


  return {

    valid,

    failedChecks,


    summary: {

      sharedCrops:
        farmCastCropDatasetReport
          ?.actualCount || 0,

      selectableCrops:
        farmCastSelectableCropReport
          ?.actualSelectableCount || 0,

      harvestRules:
        farmCastHarvestRuleReport
          ?.totalValidatedRules || 0,

      automaticHarvestCrops:
        farmCastHarvestCoverageReport
          ?.automatic
          ?.count || 0,

      stageBasedOnly:
        farmCastHarvestCoverageReport
          ?.stageBasedOnly
          ?.count || 0,

      guidanceOnly:
        farmCastHarvestCoverageReport
          ?.guidanceOnly
          ?.count || 0,

      noStoredGuidance:
        farmCastHarvestCoverageReport
          ?.noStoredGuidance
          ?.count || 0,

      harvestNotes:
        farmCastHarvestCoverageReport
          ?.harvestNoteCount || 0,

      riceVerifiedVarieties:
        farmCastHarvestCoverageReport
          ?.rice
          ?.verifiedVarietyCount || 0

    },


    checks

  };

}


const farmCastIntegrityReport =
  getFarmCastIntegrityReport();


window.FARMCAST_INTEGRITY_REPORT =
  farmCastIntegrityReport;


if (
  farmCastIntegrityReport.valid
) {

  console.info(
    '✅ FarmCast full crop integrity check PASSED.',
    farmCastIntegrityReport
  );

} else {

  console.error(
    '❌ FarmCast full crop integrity check FAILED:',
    farmCastIntegrityReport
  );

}


function getRiceVarietyHarvestRule(crop) {
  if (crop.type !== 'Rice' || !crop.variety) {
    return null;
  }

  const varietyKey =
    normalizeRiceVarietyName(crop.variety);

  const varietyRules =
    RICE_VARIETY_HARVEST_RULES[varietyKey];

  if (!varietyRules) {
    return null;
  }

  const plantingMethod =
    resolveCropPlantingMethod(crop);

  if (!plantingMethod) {
    return null;
  }

  return varietyRules[plantingMethod] || null;
}

function getRiceVarietyStatus(crop) {
  if (crop.type !== 'Rice' || !crop.variety) {
    return {
      hasVariety: false,
      varietyVerified: false,
      methodSupported: false
    };
  }

  const normalizedVariety =
    normalizeRiceVarietyName(crop.variety);

  const varietyRules =
    RICE_VARIETY_HARVEST_RULES[normalizedVariety];

  if (!varietyRules) {
    return {
      hasVariety: true,
      varietyVerified: false,
      methodSupported: false
    };
  }

  const plantingMethod =
    resolveCropPlantingMethod(crop);

  return {
    hasVariety: true,
    varietyVerified: true,
    methodSupported: Boolean(
      plantingMethod &&
      varietyRules[plantingMethod]
    ),
    displayName:
      varietyRules.displayName || crop.variety

  };
  
}

function getEstimatedHarvestWindow(crop) {
   // 1. Rice variety-specific rule
  const riceVarietyRule =
    getRiceVarietyHarvestRule(crop);

  if (riceVarietyRule) {
    const startDate =
      addDaysToDate(
        crop.planted,
        riceVarietyRule.minDays
      );

    const endDate =
      addDaysToDate(
        crop.planted,
        riceVarietyRule.maxDays
      );

    return {
      available: true,
      sourceBacked: true,
      varietyBased: true,
      minDays: riceVarietyRule.minDays,
      maxDays: riceVarietyRule.maxDays,
      basis: riceVarietyRule.basis,
      note: riceVarietyRule.note || '',
      startDate,
      endDate,
      source: riceVarietyRule.source
    };
  }

  // 2. Existing crop + planting method rules
  const cropRules =
    CROP_HARVEST_WINDOWS[crop.type];

  const plantingMethod =
   resolveCropPlantingMethod(crop);

  const rule =
    plantingMethod
      ? cropRules?.[plantingMethod]
      : null;

  // No validated FarmCast range yet.
  // Keep the existing estimate rather than inventing one.
  if (!rule) {
    return {
      available: false,
      start: null,
      end: null,
      source: null,
      basis: null
    };
  }

  if (!crop.planted) {
    return {
      available: false,
      start: null,
      end: null,
      source: rule.source,
      basis: rule.basis
    };
  }

  const hasDayRange =
    Number.isFinite(rule.minDays) &&
    Number.isFinite(rule.maxDays);

  const hasMonthRange =
    Number.isFinite(rule.minMonths) &&
    Number.isFinite(rule.maxMonths);

  if (!hasDayRange && !hasMonthRange) {
    return {
      available: false,
      start: null,
      end: null,
      source: rule.source,
      basis: rule.basis
    };
  }

  const start =
    hasMonthRange
      ? addMonthsToDate(
          crop.planted,
          rule.minMonths
        )
      : addDaysToDate(
          crop.planted,
          rule.minDays
        );
  
  const end =
    hasMonthRange
      ? addMonthsToDate(
          crop.planted,
          rule.maxMonths
        )
      : addDaysToDate(
          crop.planted,
          rule.maxDays
        );
  
  if (!start || !end) {
    return {
      available: false,
      start: null,
      end: null,
      source: rule.source,
      basis: rule.basis
    };
  }

  const plantedDate =
    new Date(`${crop.planted}T00:00:00`);

  const minDays =
    hasMonthRange
      ? Math.round(
          (start - plantedDate) /
          86400000
        )
      : rule.minDays;

  const maxDays =
    hasMonthRange
      ? Math.round(
          (end - plantedDate) /
          86400000
        )
      : rule.maxDays;

  return {
    available: true,
    start,
    end,
    minDays,
    maxDays,
    minMonths:
      hasMonthRange
        ? rule.minMonths
        : null,
    maxMonths:
      hasMonthRange
        ? rule.maxMonths
        : null,
    source: rule.source,
    basis: rule.basis,
    note: rule.note || '',
    derived: Boolean(rule.derived)
  };
}

function getStageBasedHarvestWindow(crop) {
  const rule = CROP_STAGE_HARVEST_WINDOWS[crop?.type];

  if (!rule) {
    return { available: false };
  }

  const history = Array.isArray(crop.growthHistory)
    ? [...crop.growthHistory]
    : [];

  const observations = history
    .filter(item =>
      item?.stage === rule.stage &&
      item?.date
    )
    .sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    );

  const observation = observations[0];

  if (!observation) {
    return {
      available: false,
      awaitingStage: rule.stage,
      rule
    };
  }

  const startDate = addDaysToDate(
    observation.date,
    rule.minDays
  );

  const endDate = addDaysToDate(
    observation.date,
    rule.maxDays
  );

  if (!startDate || !endDate) {
    return { available: false };
  }

  return {
    available: true,
    startDate,
    endDate,
    observationDate: observation.date,
    minDays: rule.minDays,
    maxDays: rule.maxDays,
    basis: rule.basis,
    source: rule.source
  };
}

function formatFarmDate(date) {
  return date.toLocaleDateString(
    'en-PH',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }
  );
}

function formatHarvestTimingRange(
  harvestWindow
) {
  if (!harvestWindow) return '';

  const basis =
    harvestWindow.basis || '';

  const hasMonthRange =
    Number.isFinite(
      harvestWindow.minMonths
    ) &&
    Number.isFinite(
      harvestWindow.maxMonths
    );

  if (hasMonthRange) {
    if (
      harvestWindow.minMonths ===
      harvestWindow.maxMonths
    ) {
      const unit =
        harvestWindow.minMonths === 1
          ? 'month'
          : 'months';

      return (
        `${harvestWindow.minMonths} ` +
        `${unit} ${basis}`
      );
    }

    return (
      `${harvestWindow.minMonths}–` +
      `${harvestWindow.maxMonths} ` +
      `months ${basis}`
    );
  }

  const hasDayRange =
    Number.isFinite(
      harvestWindow.minDays
    ) &&
    Number.isFinite(
      harvestWindow.maxDays
    );

  if (!hasDayRange) {
    return '';
  }

  if (
    harvestWindow.minDays ===
    harvestWindow.maxDays
  ) {
    const unit =
      harvestWindow.minDays === 1
        ? 'day'
        : 'days';

    return (
      `${harvestWindow.minDays} ` +
      `${unit} ${basis}`
    );
  }

  return (
    `${harvestWindow.minDays}–` +
    `${harvestWindow.maxDays} ` +
    `days ${basis}`
  );
}

function getElapsedPlantingTime(crop) {
  if (!crop?.planted) return null;

  const start = new Date(`${crop.planted}T00:00:00`);

  if (Number.isNaN(start.getTime())) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = Math.max(
    0,
    Math.floor((today - start) / 86400000)
  );

  let basis = 'planting';

  if (crop.plantingMethod === 'direct-seeded') {
    basis = 'sowing';
  } else if (crop.plantingMethod === 'transplanted') {
    basis = 'transplanting';
  }

  return {
    days,
    label: `${days} ${days === 1 ? 'day' : 'days'} since ${basis}`
  };
}

function getPlantingDateLabel(crop) {
  if (crop.plantingMethod === 'transplanted') {
    return 'Date Transplanted';
  }

  if (crop.plantingMethod === 'direct-seeded') {
    return 'Date Sown';
  }

  // Compatibility for older crop records
  return 'Date Planted';
}

// Active crops are loaded from the backend or localStorage.
// Do not preload fake/demo crops in production.
let myCrops = [];
let nextCropId = 1;
let currentCropFilter = 'all';


// Check whether the farmer record
// has a usable harvest date.
function hasValidCropHarvestDate(crop) {

  const harvest =
    String(
      crop?.harvest || ''
    ).trim();

  if (!harvest) {
    return false;
  }

  const harvestDate =
    new Date(
      `${harvest}T00:00:00`
    );

  return !Number.isNaN(
    harvestDate.getTime()
  );
}


// Get crop status based on dates and weather conditions
function getCropStatus(crop) {

  const today =
    new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );


  const weatherAssessment =
    getMyCropWeatherAssessment(
      crop.type
    );


  const weatherRisk =
    weatherAssessment.atRisk
      ? weatherAssessment.reason
      : null;


  /*
     Some FarmCast crops do not yet
     have a verified harvest window.

     Do not invent a harvest date.
     They can still remain active
     crops and use field observations.
  */
  if (
    !hasValidCropHarvestDate(
      crop
    )
  ) {

    if (weatherRisk) {
      return {
        label: 'At Risk',
        color: 'red',
        progress: 0,
        daysLeft: null,
        weatherRisk,
        harvestDateAvailable: false
      };
    }

    return {
      label: 'Growing',
      color: 'green',
      progress: 0,
      daysLeft: null,
      weatherRisk: null,
      harvestDateAvailable: false
    };
  }


  const harvestDate =
    new Date(
      `${crop.harvest}T00:00:00`
    );


  const plantDate =
    new Date(
      `${crop.planted}T00:00:00`
    );


  const daysLeft =
    Math.ceil(
      (
        harvestDate -
        today
      ) /
      86400000
    );


  const totalPlannedDays =
    Math.max(
      1,
      Math.ceil(
        (
          harvestDate -
          plantDate
        ) /
        86400000
      )
    );


  const daysGrown =
    Math.max(
      0,
      Math.floor(
        (
          today -
          plantDate
        ) /
        86400000
      )
    );


  const progress =
    Math.max(
      0,
      Math.min(
        100,
        Math.round(
          (
            daysGrown /
            totalPlannedDays
          ) *
          100
        )
      )
    );


  if (daysLeft <= 0) {
    return {
      label: 'Overdue',
      color: 'red',
      progress,
      daysLeft: 0,
      weatherRisk,
      harvestDateAvailable: true
    };
  }


  if (daysLeft <= 7) {
    return {
      label: 'Ready',
      color: 'amber',
      progress,
      daysLeft,
      weatherRisk,
      harvestDateAvailable: true
    };
  }


  if (weatherRisk) {
    return {
      label: 'At Risk',
      color: 'red',
      progress,
      daysLeft,
      weatherRisk,
      harvestDateAvailable: true
    };
  }


  return {
    label: 'Growing',
    color: 'green',
    progress,
    daysLeft,
    weatherRisk,
    harvestDateAvailable: true
  };

}

function getCropTimelineCheck(crop) {
  const history = Array.isArray(crop.growthHistory)
    ? [...crop.growthHistory]
    : [];

  const stageInfo = {
    seedling: 'Seedling',
    vegetative: 'Vegetative',
    flowering: 'Flowering',
    fruiting: 'Fruiting',
    ready: 'Ready for Harvest'
  };

  const hasFieldObservation = history.length > 0;

  // Get the actual newest observation by date
  history.sort((a, b) =>
    String(a.date).localeCompare(String(b.date))
  );

  const latest = hasFieldObservation
    ? history[history.length - 1]
    : null;

  const stageHarvestWindow = getStageBasedHarvestWindow(crop);
  const estimatedHarvestWindow = getEstimatedHarvestWindow(crop);
  
  const hasSourceBackedHarvestWindow =
    stageHarvestWindow.available ||
    estimatedHarvestWindow.available;

  /*
    No verified or farmer-supplied
    harvest date yet.

    Keep the crop usable without
    fabricating a calendar estimate.
  */
  if (
    latest?.stage !== 'ready' &&
    !hasSourceBackedHarvestWindow &&
    !hasValidCropHarvestDate(crop)
  ) {

    return {
      type: 'normal',
      icon: 'event_busy',
      title:
        'Harvest date not set',

      message:
        'No verified automatic harvest estimate is stored for this crop. Continue recording actual growth observations or enter a farmer estimate when available.'
    };

  }

  const harvestDate = stageHarvestWindow.available
    ? new Date(stageHarvestWindow.startDate)
    : estimatedHarvestWindow.available
      ? new Date(
          estimatedHarvestWindow.startDate ||
          estimatedHarvestWindow.start
        )
      : new Date(`${crop.harvest}T00:00:00`);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysDifference = Math.ceil(
    (harvestDate - today) /
    (1000 * 60 * 60 * 24)
  );

  const stageLabel = latest
    ? (stageInfo[latest.stage] || latest.stage || 'Unknown')
    : 'No field observation yet';

  const activeHarvestWindow =
    stageHarvestWindow.available
      ? stageHarvestWindow
      : estimatedHarvestWindow.available
        ? estimatedHarvestWindow
        : null;

  const harvestTimingLabel =
    activeHarvestWindow
      ? formatHarvestTimingRange(
          activeHarvestWindow
        )
      : null;

  // Farmer observation takes priority
  if (latest?.stage === 'ready') {
    return {
      type: 'ready',
      icon: 'check_circle',
      title: 'Farmer marked this crop Ready',
      message:
        'Field observation takes priority over the calendar-based harvest estimate.'
    };
  }

  // Estimated harvest date already passed
  if (daysDifference < 0) {
    const overdueDays = Math.abs(daysDifference);

    return {
      type: 'warning',
      icon: 'warning',
      title:
        `Estimated harvest date passed ${overdueDays} ` +
        `${overdueDays === 1 ? 'day' : 'days'} ago`,
      message:
        `Latest farmer-observed stage: ${stageLabel}. ` +
        'Review the harvest estimate based on actual field condition.'
    };
  }

  // Estimated harvest is today
  if (daysDifference === 0) {
    return {
      type: 'warning',
      icon: 'event',
      title: 'Estimated harvest date is today',
      message:
        `Latest farmer-observed stage: ${stageLabel}. ` +
        'Confirm crop readiness in the field before harvesting.'
    };
  }

  // Normal future estimate
  return {
    type: 'normal',
    icon: 'schedule',
    title:
      `${daysDifference} ` +
      `${daysDifference === 1 ? 'day' : 'days'} ` +
      (
        hasSourceBackedHarvestWindow
          ? 'before harvest guidance window'
          : 'before estimated harvest'
      ),

    message:
      `${
        latest
          ? `Latest farmer-observed stage: ${stageLabel}.`
          : 'No farmer-observed stage recorded yet.'
      }${
        harvestTimingLabel
          ? ` Source-backed timing: ${harvestTimingLabel}.`
          : ''
      }`
  };
}

 
function filterCrops(el, filter) {
  document.querySelectorAll('.cft').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  currentCropFilter = filter;
  renderCropsPage();
}
 
function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderGrowthHistory(crop) {
  const history = Array.isArray(crop.growthHistory)
    ? [...crop.growthHistory]
    : [];

  if (history.length === 0) {
    return `
      <div class="growth-history-empty">
        No field observations recorded yet.
      </div>
    `;
  }

  const stageInfo = {
    seedling:   { icon: '🌱', label: 'Seedling' },
    vegetative: { icon: '🌿', label: 'Vegetative' },
    flowering:  { icon: '🌼', label: 'Flowering' },
    fruiting:   { icon: '🍅', label: 'Fruiting' },
    ready:      { icon: '✅', label: 'Ready' }
  };

  // Newest observation first
  history.sort((a, b) =>
    String(b.date).localeCompare(String(a.date))
  );

  return history.map(item => {
    const info =
      stageInfo[item.stage] ||
      { icon: '🌱', label: item.stage || 'Unknown' };

    const dateText = item.date
      ? new Date(`${item.date}T00:00:00`).toLocaleDateString(
          'en-PH',
          {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }
        )
      : 'Unknown date';

    return `
      <div class="growth-history-item">

        <div class="growth-history-marker">
          ${info.icon}
        </div>

        <div class="growth-history-content">

          <div class="growth-history-top">
            <strong>${escapeHtml(info.label)}</strong>
            <span>${escapeHtml(dateText)}</span>
          </div>

          ${
            item.note
              ? `
                <div
                  class="growth-history-note collapsed"
                  id="growthNote-${item._id || item.date + '-' + item.stage}">
                  ${escapeHtml(item.note)}
                </div>

                ${
                  item.note && item.note.length > 90
                    ? `
                      <button
                        class="growth-note-toggle"
                        onclick="toggleGrowthNote('${item._id || item.date + '-' + item.stage}', this)">
                        Show more
                      </button>
                    `
                    : ''
                }
              `
              : `
                <div class="growth-history-note muted">
                  No field observation note.
                </div>
              `
          }

          <div class="growth-history-footer">

            <div class="growth-history-source">
              Farmer observation
            </div>

            ${
             item._id
                ? `
                 <div class="growth-history-actions">

                   <button
                     class="growth-history-edit-btn"
                     onclick="openEditGrowthObservation('${crop.id}', '${item._id}')"
                     title="Edit observation">
                     <span class="material-symbols-outlined">edit</span>
                   </button>

                   <button
                     class="growth-history-delete-btn"
                     onclick="deleteGrowthObservation('${crop.id}', '${item._id}')"
                     title="Delete observation">
                     <span class="material-symbols-outlined">delete</span>
                   </button>

                  </div>
                `
                : ''
            }

          </div>
        </div>

      </div>
    `;
  }).join('');
}

function toggleGrowthNote(id, btn) {
  const note = document.getElementById(`growthNote-${id}`);

  if (!note) return;

  const isCollapsed =
    note.classList.contains('collapsed');

  note.classList.toggle('collapsed');

  btn.textContent =
    isCollapsed ? 'Show less' : 'Show more';
}

function openEditGrowthObservation(cropId, observationId) {
  const crop = myCrops.find(
    c => String(c.id) === String(cropId)
  );

  if (!crop) {
    toast('Crop not found.', 'err');
    return;
  }

  const history = Array.isArray(crop.growthHistory)
    ? crop.growthHistory
    : [];

  const observation = history.find(
    item => String(item._id) === String(observationId)
  );

  if (!observation) {
    toast('Observation not found.', 'err');
    return;
  }

  editingGrowthObservationId = observationId;

  document.getElementById('growthStageCropId').value =
    crop.id;

  document.getElementById('growthStageSelect').value =
    observation.stage;

  updateGrowthStageSelectPreview();

  document.getElementById('growthStageDate').value =
    observation.date;

  document.getElementById('growthStageNote').value =
    observation.note || '';

  document.getElementById('growthStageModal').style.display =
    'flex';
}


async function deleteGrowthObservation(cropId, observationId) {
  const crop = myCrops.find(
    c => String(c.id) === String(cropId)
  );

  if (!crop) {
    toast('Crop not found.', 'err');
    return;
  }

  const history = Array.isArray(crop.growthHistory)
    ? crop.growthHistory
    : [];

  const observation = history.find(
    item => String(item._id) === String(observationId)
  );

  if (!observation) {
    toast('Observation not found.', 'err');
    return;
  }

  const confirmed = confirm(
    'Delete this field observation? This cannot be undone.'
  );

  if (!confirmed) return;

  const growthHistory = history.filter(
    item => String(item._id) !== String(observationId)
  );

  // Keep observations chronological
  growthHistory.sort((a, b) =>
    String(a.date).localeCompare(String(b.date))
  );

  // Latest remaining observation determines current stage.
  // If none remain, return to seedling.
  const currentStage = growthHistory.length
    ? growthHistory[growthHistory.length - 1].stage
    : 'seedling';

  try {
    const updatedCrop = await fcCrops.update(cropId, {
      currentStage,
      growthHistory
    });

    const cropIndex = myCrops.findIndex(
      c => String(c.id) === String(cropId)
    );

    if (cropIndex !== -1) {
      myCrops[cropIndex] = updatedCrop;
    }

    renderCropsPage();

    toast('Growth observation deleted.', 'ok');

  } catch (err) {
    console.error(
      'Failed to delete growth observation:',
      err
    );

    toast(
      `Could not delete observation: ${err.message}`,
      'err'
    );
  }
}

function toggleCropDetails(button) {
  const card =
    button.closest('.crop-detail-card');

  if (!card) return;

  const cropId =
    String(card.dataset.id);

  const isExpanded =
    card.classList.toggle('crop-expanded');

  if (isExpanded) {
    expandedCropIds.add(cropId);
  } else {
    expandedCropIds.delete(cropId);
  }

  button.setAttribute(
    'aria-expanded',
    String(isExpanded)
  );

  const label =
    button.querySelector(
      '.cdc-details-toggle-label'
    );

  const icon =
    button.querySelector(
      '.material-symbols-outlined'
    );

  if (label) {
    label.textContent =
      isExpanded
        ? 'Hide details'
        : 'View details';
  }

  if (icon) {
    icon.textContent =
      isExpanded
        ? 'expand_less'
        : 'expand_more';
  }
}

const expandedCropIds =
  new Set();

function renderCropsPage() {
  const filtered = myCrops.filter(crop => {
    if (currentCropFilter === 'all') return true;
    const s = getCropStatus(crop);
    if (currentCropFilter === 'growing')  return s.label === 'Growing';
    if (currentCropFilter === 'ready')    return s.label === 'Ready' || s.label === 'Overdue';
    if (currentCropFilter === 'at-risk')  return s.label === 'At Risk';
    return true;
  });
 
  // Update stat boxes
  const growing = myCrops.filter(c => getCropStatus(c).label === 'Growing').length;
  const ready   = myCrops.filter(c => ['Ready','Overdue'].includes(getCropStatus(c).label)).length;
  const atRisk  = myCrops.filter(c => getCropStatus(c).label === 'At Risk').length;
  const watered = myCrops.filter(c => c.watered).length;
  document.getElementById('csbTotal').textContent   = myCrops.length;
  document.getElementById('csbGrowing').textContent = growing;
  document.getElementById('csbReady').textContent   = ready;
  document.getElementById('csbAtRisk').textContent  = atRisk;
  document.getElementById('csbWatered').textContent = watered;
 
  if (filtered.length === 0) {
    document.getElementById('cropsGrid').innerHTML = `
      <div class="crops-empty">
        <div class="crops-empty-icon">
          <img
            src="assets/ui/stage-seedling.svg"
            alt=""
            class="crops-empty-icon-img"
          >
        </div>

        <p>No crops found. Add your first crop!</p>
        <button class="btn-add-crop" onclick="openAddCropModal()"><span class="material-symbols-outlined">add</span> Add Crop</button>
      </div>`;
    return;
  }
 
  document.getElementById('cropsGrid').innerHTML = filtered.map(crop => {
  const st = getCropStatus(crop);

  const timelineCheck =
    getCropTimelineCheck(crop);

  const cropIconHtml =
    getCropIconHtml(
      crop.type,
      'cdc-crop-icon-img'
    );

  const weatherAssessment =
    getMyCropWeatherAssessment(
      crop.type
    );
  
  const generalCropReferenceHtml =
    renderMyCropGeneralReference(
      crop.type
    );

  const cropReference =
    getCropReference(
      crop.type
    );

  const harvestGuidance =
    typeof cropReference?.harvestNote ===
    'string'
      ? cropReference.harvestNote.trim()
      : '';

    const stageInfo = {
      seedling: {
        icon: 'assets/ui/stage-seedling.svg',
        label: 'Seedling'
      },

      vegetative: {
        icon: 'assets/ui/stage-vegetative.svg',
        label: 'Vegetative'
      },

      flowering: {
        icon: 'assets/ui/stage-flowering.svg',
        label: 'Flowering'
      },

      fruiting: {
        icon: 'assets/ui/stage-fruiting.svg',
        label: 'Fruiting'
      },

      ready: {
        icon: 'assets/ui/stage-ready.svg',
        label: 'Ready for Harvest'
      }
};

    const currentStage = crop.currentStage || 'seedling';
    const stage = stageInfo[currentStage] || stageInfo.seedling;

    const history = Array.isArray(crop.growthHistory)
      ? crop.growthHistory
      : [];

    const latestObservation = history.length
      ? history[history.length - 1]
      : null;

    const observedDate = latestObservation?.date
      ? new Date(latestObservation.date + 'T00:00:00')
          .toLocaleDateString('en-PH', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })
      : 'Not recorded yet';

    const plantedFmt =
      new Date(
        `${crop.planted}T00:00:00`
      ).toLocaleDateString(
        'en-PH',
        {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }
      );


    const harvestFmt =
      hasValidCropHarvestDate(crop)
        ? new Date(
            `${crop.harvest}T00:00:00`
          ).toLocaleDateString(
            'en-PH',
            {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }
          )
        : 'Not set';

    const plantingDateLabel =
      getPlantingDateLabel(crop);

    const harvestWindow =
      getEstimatedHarvestWindow(crop);

    const elapsedPlanting = 
      getElapsedPlantingTime(crop);

    const stageHarvestWindow = 
      getStageBasedHarvestWindow(crop);

    const harvestWindowStart =
      harvestWindow.startDate ||
      harvestWindow.start;

    const harvestWindowEnd =
      harvestWindow.endDate ||
      harvestWindow.end;

    const guidanceOnlyHarvest =
      !harvestWindow.available &&
      Boolean(harvestGuidance) &&
      !hasValidCropHarvestDate(crop);

    const harvestWindowText =
      harvestWindow.available
        ? harvestWindow.minDays ===
          harvestWindow.maxDays
          ? formatFarmDate(
              harvestWindowStart
            )
          : `${formatFarmDate(
              harvestWindowStart
            )} – ${formatFarmDate(
              harvestWindowEnd
            )}`
        : guidanceOnlyHarvest
          ? 'Guidance available'
          : harvestFmt;

    // Weather compatibility
    let weatherCompatHtml = '';

    if (weatherAssessment.available) {

      const tempText =
        Number.isFinite(weatherAssessment.temp)
          ? `${Math.round(weatherAssessment.temp)}°C`
          : 'Current weather';

      weatherCompatHtml = `
        <div
          class="crop-weather-compat ${
            weatherAssessment.atRisk
              ? 'warn'
              : 'ok'
          }"
        >

          <span class="material-symbols-outlined">
            ${
              weatherAssessment.atRisk
                ? 'warning'
                : 'check_circle'
            }
          </span>

          ${
            weatherAssessment.atRisk
              ? escapeHtml(
                  weatherAssessment.reason
                )
              : `${tempText} is within the stored weather limits for ${escapeHtml(crop.type)}`
          }

        </div>
      `;
    }

    const isExpanded =
      expandedCropIds.has(
        String(crop.id)
      );

    return `
      <div
        class="crop-detail-card ${st.color}${isExpanded ? ' crop-expanded' : ''}"
        data-id="${crop.id}"
      >
        <div class="cdc-header">

          <div class="cdc-emoji">
            ${cropIconHtml}
          </div>

          <div class="cdc-info">

            <div class="cdc-name">${crop.type}</div>

            ${crop.variety ? `
              <div class="cdc-variety">
                Variety: ${crop.variety}
              </div>
            ` : ''}

            <div class="cdc-location">
              <span class="material-symbols-outlined" style="font-size:13px">location_on</span>
              ${crop.location}
            </div>
          </div>
          
          <div class="cdc-status status-${st.color}">${st.label}</div>
        </div>
        
        <div class="cdc-mobile-summary">
          <div class="cdc-mobile-summary-item">
            <span class="material-symbols-outlined">
              eco
            </span>

            <div>
              <div class="cdc-mobile-summary-label">
                Stage
              </div>

              <div class="cdc-mobile-summary-value">
                ${stage.label}
              </div>
            </div>
          </div>

          <div class="cdc-mobile-summary-item">
            <span class="material-symbols-outlined">
              calendar_today
            </span>

            <div>
              <div class="cdc-mobile-summary-label">
                ${plantingDateLabel}
              </div>

              <div class="cdc-mobile-summary-value">
                ${plantedFmt}
              </div>
            </div>
          </div>

         <div class="cdc-mobile-summary-item">
           <span class="material-symbols-outlined">
             event_available
           </span>

           <div>
             <div class="cdc-mobile-summary-label">
               Harvest
             </div>

             <div class="cdc-mobile-summary-value">
               ${escapeHtml(harvestWindowText)}
             </div>
           </div>
         </div>
        </div>

        <button
          type="button"
          class="cdc-details-toggle"
          aria-expanded="${isExpanded}"
          onclick="toggleCropDetails(this)"
        >
          <span class="cdc-details-toggle-label">
           ${isExpanded ? 'Hide details' : 'View details'}
          </span>

          <span class="material-symbols-outlined">
            ${isExpanded ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        <!-- START hidden mobile details -->
        <div class="cdc-crop-details">
          
          ${weatherCompatHtml}
        
        <div class="crop-stage-box">
          <div class="crop-stage-heading">
            <div>
              <div class="crop-stage-title">Actual Crop Stage</div>
              <div class="crop-stage-subtitle">
                Farmer-observed field update
              </div>
            </div>

            <button
              class="crop-stage-update-btn"
              onclick="openGrowthStageModal('${crop.id}')">
              <span class="material-symbols-outlined">edit</span>
              Update Stage
            </button>
          </div>


          <div class="crop-stage-current">
            <div class="crop-stage-emoji">
              <img
                src="${escapeHtml(stage.icon)}"
                alt="${escapeHtml(stage.label)}"
                class="crop-stage-icon-img"
              >
            </div>

            <div>
              <div class="crop-stage-name">${stage.label}</div>
              <div class="crop-stage-date">
                ${
                  latestObservation
                    ? `Farmer observed · ${observedDate}`
                    : 'No field observation recorded yet'
                }
              </div>
            </div>
          </div>
          
          <div class="crop-timeline-check ${timelineCheck.type}">

            <div class="crop-timeline-check-icon">
              <span class="material-symbols-outlined">
                ${timelineCheck.icon}
              </span>
          </div>

          <div class="crop-timeline-check-content">
            <div class="crop-timeline-check-label">
              Timeline Check
            </div>

            <div class="crop-timeline-check-title">
              ${escapeHtml(timelineCheck.title)}
            </div>

            <div class="crop-timeline-check-text">
              ${escapeHtml(timelineCheck.message)}
            </div>
          </div>

        </div>


          <!-- COLLAPSIBLE GROWTH HISTORY -->
          <details class="crop-growth-history crop-growth-history-collapsible">

            <summary class="growth-history-summary">

              <div class="growth-history-summary-left">
                <span class="material-symbols-outlined">
                  history
                </span>

                <div>
                  <div class="growth-history-summary-title">
                    Growth History
                  </div>

                  <div class="growth-history-summary-sub">
                    ${history.length}
                    ${history.length === 1 ? 'observation' : 'observations'}
                  </div>
                </div>
              </div>

              <div class="growth-history-summary-action">
                <span class="growth-history-view-text">
                  View
                </span>

                <span class="material-symbols-outlined growth-history-chevron">
                  expand_more
                </span>
              </div>

            </summary>

            <div class="growth-history-list">
              ${renderGrowthHistory(crop)}
            </div>

          </details>
        </div>

        <div class="cdc-meta-grid">
          <div class="cdc-meta-item cdc-meta-primary">
            <span class="material-symbols-outlined">
              calendar_today
            </span>

            <div>
              <div class="cmi-lbl">
                ${plantingDateLabel}
              </div>

              <div class="cmi-val">
                ${plantedFmt}
              </div>

              ${elapsedPlanting ? `
                <div class="cmi-elapsed">
                  ${elapsedPlanting.label}
                </div>
              ` : ''}

            </div>
          </div>

          <div class="cdc-meta-item cdc-meta-primary cdc-harvest-meta">
           <span class="material-symbols-outlined">
             event_available
           </span>



           <div>
             ${
               stageHarvestWindow.available
                 ? `
                   <div class="cmi-val">
                     ${formatFarmDate(stageHarvestWindow.startDate)} – ${formatFarmDate(stageHarvestWindow.endDate)}
                   </div>

                   <div class="cmi-lbl">
                     Estimated Harvest Guidance
                   </div>

                   <div class="cmi-source">
                     <div>
                       ${stageHarvestWindow.minDays}–${stageHarvestWindow.maxDays}
                       days ${stageHarvestWindow.basis}
                     </div>

                     <div class="cmi-source-summary">
                       Source-backed guidance
                     </div>

                     <details class="cmi-source-details">
                       <summary>View source details</summary>

                       <div class="cmi-source-agency">
                         ${stageHarvestWindow.source.agency}
                       </div>

                       <div class="cmi-source-title">
                         ${stageHarvestWindow.source.title}
                       </div>
                     </details>

                     <a
                       class="cmi-source-link"
                       href="${stageHarvestWindow.source.url}"
                       target="_blank"
                       rel="noopener noreferrer"
                       onclick="event.stopPropagation()"
                     >
                       View official reference ↗
                     </a>
                   </div>
                 `
                 : `
                   <div class="cmi-val">
                     ${escapeHtml(harvestWindowText)}
                   </div>

                    <div class="cmi-lbl">
                      ${
                        harvestWindow.available
                          ? 'Estimated Harvest Window'
                          : guidanceOnlyHarvest
                            ? 'Harvest Guidance'
                            : 'Estimated Harvest'
                      }
                    </div>

                   ${
                     harvestWindow.available
                       ? `
                         <div class="cmi-source">
                           <div>
                              ${formatHarvestTimingRange(
                                harvestWindow
                              )}
                           </div>

                           ${harvestWindow.note ? `
                             <div class="cmi-source-derived">
                               ${harvestWindow.note}
                             </div>
                           ` : ''}

                           ${harvestWindow.derived ? `
                             <div class="cmi-source-derived">
                               Derived estimate from source flowering and harvest guidance
                             </div>
                           ` : ''}

                           <div class="cmi-source-summary">
                             ${harvestWindow.varietyBased
                               ? 'PhilRice variety-based maturity guidance'
                               : 'Source-backed estimate'}
                           </div>

                           <details class="cmi-source-details">
                             <summary>View source details</summary>

                             <div class="cmi-source-agency">
                               ${harvestWindow.source.agency}
                             </div>

                             <div class="cmi-source-title">
                               ${harvestWindow.source.title}
                             </div>
                           </details>

                           <a
                             class="cmi-source-link"
                             href="${harvestWindow.source.url}"
                             target="_blank"
                             rel="noopener noreferrer"
                             onclick="event.stopPropagation()"
                           >
                             View official reference ↗
                           </a>
                         </div>
                       `
                      : `
                        ${
                          harvestGuidance
                            ? `
                              <div class="cmi-source">

                                <div class="cmi-source-summary">
                                  Verified harvest guidance
                                </div>

                                <div class="cmi-source-derived">
                                  ${escapeHtml(
                                    harvestGuidance
                                  )}
                                </div>

                                ${
                                  guidanceOnlyHarvest
                                    ? `
                                      <div class="cmi-source-derived">
                                        No automatic harvest date was applied because the verified guidance does not support a safe fixed calendar estimate for this crop.
                                      </div>
                                    `
                                    : ''
                                }

                              </div>
                            `
                            : `
                              <div class="cmi-source">
                                ${
                                  crop.type === 'Rice' &&
                                  crop.variety
                                    ? getRiceVarietyStatus(
                                        crop
                                      ).varietyVerified
                                      ? `Verified Rice variety, but no source-backed timing is available for the selected planting method.`
                                      : `Rice variety not yet verified in FarmCast.`
                                    : `No verified automatic harvest timing is stored for this crop yet.`
                                }
                              </div>
                            `
                        }

                        ${generalCropReferenceHtml}
                      `
               }
             `
  }
</div>
</div>

          <div class="cdc-meta-item">
            <span class="material-symbols-outlined">straighten</span>
            <div><div class="cmi-val">${crop.area} m²</div><div class="cmi-lbl">Area</div></div>
          </div>

          <div class="cdc-meta-item">
            <span class="material-symbols-outlined">water_drop</span>
            <div><div class="cmi-val">${crop.irrigation}</div><div class="cmi-lbl">Irrigation</div></div>
          </div>

        </div>
 
        ${crop.notes ? `<div class="cdc-notes">"${crop.notes}"</div>` : ''}
 
        <div class="cdc-actions">
          <button class="cdc-btn water ${crop.watered ? 'watered' : ''}" onclick="toggleWater('${crop.id}')">
            <span class="material-symbols-outlined">${crop.watered ? 'water' : 'water_drop'}</span>
            ${crop.watered ? 'Watered ✓' : 'Mark Watered'}
          </button>

          <button class="cdc-btn harvest" onclick="markHarvested('${crop.id}')">
            <span class="material-symbols-outlined">agriculture</span>
            Harvest
          </button>

          <button class="cdc-btn delete" onclick="deleteCrop('${crop.id}')">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>

        </div> <!-- cdc-crop-details -->
        </div> <!-- crop-detail-card -->
        `;
  }).join('');
}
 
function toggleWater(id) {
  const crop = myCrops.find(
    c => String(c.id) === String(id)
  );

  if (!crop) return;

  crop.watered = !crop.watered;

  saveCropsLS();
  renderCropsPage();

  toast(
    `${crop.type} marked as ${crop.watered ? 'watered' : 'not watered'}`,
    crop.watered ? 'ok' : 'warn'
  );
}
 
function markHarvested(id) {
  const crop = myCrops.find(
    c => String(c.id) === String(id)
  );

  if (!crop) return;

  if (!confirm(
    `Mark ${crop.type} as harvested and remove from active crops?`
  )) return;

  myCrops = myCrops.filter(
    c => String(c.id) !== String(id)
  );

  saveCropsLS();
  renderCropsPage();

  toast(
    `${crop.type} marked as harvested! Great job!`,
    'ok'
  );
}
 
function deleteCrop(id) {
  const crop = myCrops.find(
    c => String(c.id) === String(id)
  );

  if (!crop) return;

  if (!confirm(
    `Delete ${crop.type} from your crop list?`
  )) return;

  myCrops = myCrops.filter(
    c => String(c.id) !== String(id)
  );

  saveCropsLS();
  renderCropsPage();

  toast(`${crop.type} deleted.`, 'warn');
}

function updateCropPlantingDateLabel() {
  const plantingMethod =
    document.getElementById('cropPlantingMethod')?.value;

  const label =
    document.getElementById('cropPlantedLabel');

  if (!label) return;

  if (
    plantingMethod === 'transplanted' ||
    plantingMethod === 'transplanted-seedlings'
  ) {
    label.textContent = 'Date Transplanted';
    return;
  }

  if (plantingMethod === 'direct-seeded') {
    label.textContent = 'Date Sown';
    return;
  }

  label.textContent = 'Date Planted';
}

document
  .getElementById('cropPlantingMethod')
  ?.addEventListener('change', updateCropPlantingDateLabel
  );

document
  .getElementById('cropDatePlanted')
  ?.addEventListener('change', () => {
    updateAddCropHarvestEstimate();
  });


function updateAddCropHarvestEstimate() {
  const cropType =
    document.getElementById('cropTypeSelect')?.value;

  const variety =
    document.getElementById('cropVariety')?.value.trim() || '';

  const plantingMethod =
    document.getElementById('cropPlantingMethod')?.value || '';

  const planted =
    document.getElementById('cropDatePlanted')?.value;

  const harvestInput =
    document.getElementById('cropDateHarvest');

  const hint =
    document.getElementById('cropHarvestEstimateHint');

  if (!harvestInput) return;


  // Clear a date that belonged to a previously selected crop.
  const previousCropType =
    harvestInput.dataset.cropType || '';

  const cropChanged =
    previousCropType !== cropType;

  if (cropChanged) {
    harvestInput.value = '';
    harvestInput.dataset.estimateSource = '';
  }

  harvestInput.dataset.cropType =
    cropType || '';


  if (!cropType) {
    if (hint) {
      hint.textContent =
        'Select a crop to check harvest guidance.';
    }

    return;
  }


  if (!planted) {
    if (hint) {
      hint.textContent =
        'Enter the planting date to calculate harvest guidance.';
    }

    return;
  }


  const tempCrop = {
    type: cropType,
    variety,
    plantingMethod,
    planted
  };


  const harvestWindow =
    getEstimatedHarvestWindow(tempCrop);

  const cropReference =
    getCropReference(cropType);

  const harvestNote =
    typeof cropReference?.harvestNote ===
    'string'
      ? cropReference.harvestNote.trim()
      : '';


  // 1. Verified source-backed harvest guidance
  if (harvestWindow?.available) {
    const harvestDate =
      harvestWindow.startDate ||
      harvestWindow.start;

    if (harvestDate) {
      harvestInput.value =
        formatDateInputLocal(
          new Date(harvestDate)
        );

      harvestInput.dataset.estimateSource =
        'source-backed';

      if (hint) {
        hint.textContent =
          '✓ Source-backed harvest estimate auto-filled from verified FarmCast guidance.';
      }

      return;
    }
  }


  // 2. No verified automatic estimate
  harvestInput.dataset.estimateSource =
    harvestInput.value
      ? 'manual'
      : harvestNote
        ? 'guidance-only'
        : 'unavailable';

  if (hint) {

    if (harvestInput.value) {
      hint.textContent =
        'Manual farmer estimate.';
    }

    else if (harvestNote) {
      hint.textContent =
        `Verified harvest guidance: ${harvestNote} ` +
        'No automatic date has been applied.';
    }

    else {
      hint.textContent =
        'No verified automatic harvest estimate or harvest timing guidance is stored for this crop yet. You may enter your own farmer estimate or leave this field blank.';
    }

  }

}

document
  .getElementById('cropDateHarvest')
  ?.addEventListener('input', () => {

    const harvestInput =
      document.getElementById('cropDateHarvest');

    const hint =
      document.getElementById(
        'cropHarvestEstimateHint'
      );

    const cropType =
      document.getElementById(
        'cropTypeSelect'
      )?.value || '';

    if (!harvestInput) return;

    if (harvestInput.value) {
      harvestInput.dataset.estimateSource =
        'manual';

      if (hint) {
        hint.textContent =
          'Manual farmer estimate.';
      }

      return;
    }

    const cropReference =
      getCropReference(cropType);

    const harvestNote =
      typeof cropReference?.harvestNote ===
      'string'
        ? cropReference.harvestNote.trim()
        : '';

    harvestInput.dataset.estimateSource =
      harvestNote
        ? 'guidance-only'
        : 'unavailable';

    if (hint) {

      if (harvestNote) {
        hint.textContent =
          `Verified harvest guidance: ${harvestNote} ` +
          'No automatic date has been applied.';
      }

      else {
        hint.textContent =
          'Optional: enter your own estimated harvest date.';
      }

    }
  });

function openAddCropModal() {

  // Always sync My Crops with crop-data.js
  populateMyCropsCropSelect();

  document.getElementById(
    'addCropModal'
  ).style.display = 'flex';

  // Make planting-method options match the selected crop
  updatePlantingMethodOptions();

  updateCropVarietySuggestions();
  updateCropVarietyHint();
  updateCropPlantingDateLabel();

  // Set default planting date
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('cropDatePlanted').value = today;

  updateAddCropHarvestEstimate();
}


 
function closeAddCropModal() {
  document.getElementById('addCropModal').style.display = 'none';
}
 
let editingGrowthObservationId = null;

function updateGrowthStageSelectPreview() {

  const select =
    document.getElementById(
      'growthStageSelect'
    );

  const iconContainer =
    document.getElementById(
      'growthStageSelectIcon'
    );

  if (!select || !iconContainer) {
    return;
  }

  const stageIcons = {
    seedling:
      'assets/ui/stage-seedling.svg',

    vegetative:
      'assets/ui/stage-vegetative.svg',

    flowering:
      'assets/ui/stage-flowering.svg',

    fruiting:
      'assets/ui/stage-fruiting.svg',

    ready:
      'assets/ui/stage-ready.svg'
  };

  const icon =
    stageIcons[select.value];

  if (!icon) {
    iconContainer.innerHTML = '';
    return;
  }

  iconContainer.innerHTML = `
    <img
      src="${escapeHtml(icon)}"
      alt=""
      class="growth-stage-select-icon-img"
    >
  `;
}


function openGrowthStageModal(id) {
  const crop = myCrops.find(
    c => String(c.id) === String(id)
  );

  if (!crop) {
    toast('Crop not found.', 'err');
    return;
  }

  document.getElementById('growthStageCropId').value = crop.id;
  editingGrowthObservationId = null;

  document.getElementById('growthStageSelect').value =
    crop.currentStage || 'seedling';
  
  updateGrowthStageSelectPreview();

  const today = new Date();

  document.getElementById('growthStageDate').value =
    `${today.getFullYear()}-` +
    `${String(today.getMonth() + 1).padStart(2, '0')}-` +
    `${String(today.getDate()).padStart(2, '0')}`;

  document.getElementById('growthStageNote').value = '';

  document.getElementById('growthStageModal').style.display = 'flex';
}

function closeGrowthStageModal() {
  editingGrowthObservationId = null;

  document.getElementById('growthStageModal').style.display =
    'none';
}

async function saveGrowthStage() {
  const cropId =
    document.getElementById('growthStageCropId').value;

  const stage =
    document.getElementById('growthStageSelect').value;

  const date =
    document.getElementById('growthStageDate').value;

  const note =
    document.getElementById('growthStageNote').value.trim();

  if (!cropId || !stage || !date) {
    toast('Please complete the growth stage and observation date.', 'warn');
    return;
  }

  const crop = myCrops.find(
    c => String(c.id) === String(cropId)
  );

  if (!crop) {
    toast('Crop not found.', 'err');
    return;
  }

  const observation = {
    stage,
    date,
    note,
    source: 'farmer'
  };

  const updatedHistory = Array.isArray(crop.growthHistory)
    ? [...crop.growthHistory, observation]
    : [observation];

  try {
    // Local state first
    crop.currentStage = stage;
    crop.growthHistory = updatedHistory;

    saveCropsLS();
    

    const wasEditing = Boolean(editingGrowthObservationId);

    editingGrowthObservationId = null;
    
    closeGrowthStageModal();

    renderCropsPage();

    toast(
      wasEditing
        ? 'Growth observation updated!'
        : 'Growth observation saved to FarmCast!',
      'ok'
    );

  } catch (err) {
    console.error('Failed to save growth stage:', err);
    toast('Failed to save growth stage.', 'err');
  }
}

function saveNewCrop() {
  const type =
    document.getElementById('cropTypeSelect').value;
  
  const variety =
    document.getElementById('cropVariety').value.trim(); 

  const plantingMethod =
    document.getElementById('cropPlantingMethod').value;

  const area = parseInt(
    document.getElementById('cropArea').value
  );

  const planted =
    document.getElementById('cropDatePlanted').value;

  const harvest =
    document.getElementById('cropDateHarvest').value;

  const location =
    document.getElementById('cropLocation').value.trim();

  const irrigation =
    document.getElementById('cropIrrigation').value;

  const notes =
    document.getElementById('cropNotes').value.trim();

  if (!type) {
    toast('Please select a crop.', 'warn');
    return;
  }

  if (!area) {
    toast('Please enter the crop area.', 'warn');
    return;
  }

  if (!planted) {
    toast('Please enter the planting date.', 'warn');
    return;
  }


  if (!location) {
    toast('Please enter the field location.', 'warn');
    return;
  }

  myCrops.push({
    id: nextCropId++,
    type,
    variety,
    plantingMethod,
    area,
    planted,
    harvest,
    location,
    irrigation,
    notes,
    watered: false
  });

  saveCropsLS();
  closeAddCropModal();
  renderCropsPage();

  toast(
    `${type} added to your crops!`,
    'ok'
  );
}

// ═══════════════════════════════════════════════════════
// LOCALSTORAGE — persist myCrops, tasks, pest logs, irr fields
// ═══════════════════════════════════════════════════════

const LS_CROPS      = 'fc_myCrops';
const LS_CROPS_ID   = 'fc_nextCropId';
const LS_TASKS      = 'fc_tasks';
const LS_PEST_LOGS  = 'fc_pestLogs';
const LS_IRR_FIELDS = 'fc_irrFields';
const LS_IRR_FID    = 'fc_nextFieldId';

function lsSave(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
}
function lsLoad(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch(e) { return fallback; }
}

// Override myCrops init with localStorage
const DEFAULT_CROPS = [];

// Re-initialize from localStorage (overrides the previous `let myCrops = [...]`)
myCrops =
  lsLoad(
    LS_CROPS,
    DEFAULT_CROPS
  );

nextCropId =
  lsLoad(
    LS_CROPS_ID,
    1
  );

tasks      = lsLoad(LS_TASKS,     tasks);  // keep default tasks as fallback

function saveCropsLS() { lsSave(LS_CROPS, myCrops); lsSave(LS_CROPS_ID, nextCropId); }
function saveTasksLS() { lsSave(LS_TASKS, tasks); }

function setNav(el, pageId) {
  // Remove active state from navigation
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.remove('active');
  });

  if (el) {
    el.classList.add('active');
  }

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => {
    p.style.display = 'none';
  });

  const titles = {
    'dashboard': 'Farm Weather + Planting Calendar',
    'weather-maps': 'Weather Maps',
    'my-crops': 'My Crops',
    'pest-alerts': 'Pest Alerts',
    'planting-calendar': 'Planting Calendar',
    'irrigation': 'Irrigation',
    'settings': 'Settings',
    'farm-analytics': 'Farm Analytics',
    'harvest-history': 'Harvest History',
    'plant-scanner': 'Plant Health Scanner'
  };

  const page = document.getElementById(`page-${pageId}`);

  if (!page) {
    console.warn(`FarmCast page not found: ${pageId}`);

    const dashboard = document.getElementById('page-dashboard');

    if (dashboard) {
      dashboard.style.display = 'block';
    }

    return;
  }

  // Show selected page
  page.style.display = 'block';

  const title = document.getElementById('topbarTitle');

  if (title) {
    title.textContent = titles[pageId] || 'FarmCast';
  }

  // Page-specific initialization
  switch (pageId) {
    case 'dashboard':

    renderTasks();


    /*
     * Load the farmer's saved location on
     * the first Dashboard visit.
     *
     * Do not refetch every time the farmer
     * switches pages if weather is already
     * loaded.
     */
    if (
      !currentWeather
    ) {
  
      fetchWeather(
        appSettings.city ||
        currentCity,

        appSettings.lat,

        appSettings.lon
      );
  
    }
  
  
    break;

    case 'weather-maps':
      initWeatherMap();
      break;

    case 'my-crops':
      renderCropsPage();
      break;

    case 'pest-alerts':
      renderPestPage();
      break;

    case 'planting-calendar':
      renderCalPage();
      break;

    case 'irrigation':
      renderIrrigationPage();
      break;

    case 'settings':
      updateSettingsFormValues();
      renderFavCropsGrid();

      const lastActive = document.getElementById('settingLastActive');

      if (lastActive) {
        lastActive.textContent =
          new Date().toLocaleString('en-PH');
      }
      break;

    case 'farm-analytics':
      renderFarmAnalytics();
      break;

    case 'harvest-history':
      renderHarvestHistory();
      break;

    case 'plant-scanner':
      initScannerPage();
      break;
  }

  // Mobile: close sidebar after navigation
  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById('mainSidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (sidebar) {
      sidebar.classList.remove('mobile-open');
      sidebar.classList.remove('collapsed');
    }

    if (overlay) {
      overlay.classList.remove('active');
    }
  }
}

// ═══════════════════════════════════════════════════════
// PEST ALERTS PAGE
// ═══════════════════════════════════════════════════════

const PEST_FULL_REFERENCE_META = {

  'Leaf Miner': {
    name:
      'UC IPM — Vegetable Leafminers',
    relative:
      '../vegetable-leafminers/'
  },


  'Spider Mites': {
    name:
      'UC IPM — Spider Mites',
    relative:
      '../spider-mites/'
  },

  'Cutworm': {
    name:
      'UC IPM — Cutworms',
    relative:
      '../cutworms/'
  },

  'Bagrada Bug': {
    name:
      'UC IPM — Bagrada Bug',
    relative:
      '../bagrada-bug/'
  },


}

function getPestFullReference(
  pestName
) {

  // Reuse references already used
  // by Dashboard Pest Alerts.
  const dashboardPest =
    PESTS.find(
      p =>
        p.name === pestName &&
        p.reference?.url
    );

  if (dashboardPest) {
    return dashboardPest.reference;
  }


  const meta =
    PEST_FULL_REFERENCE_META[
      pestName
    ];

  if (!meta) {
    return null;
  }


  const ucIpmBase =
    PESTS.find(
      p => p.name === 'Aphids'
    )?.reference?.url;

  if (!ucIpmBase) {
    return null;
  }


  return {
    name: meta.name,

    url:
      new URL(
        meta.relative,
        ucIpmBase
      ).href
  };

}

function getPestFullReferences(
  pest
) {

  if (!pest) {
    return [];
  }


  const explicitReferences =
    Array.isArray(
      pest.references
    )
      ? pest.references
          .filter(reference =>
            reference?.name &&
            reference?.url
          )
      : [];


  if (
    explicitReferences.length
  ) {

    return explicitReferences;

  }


  const fallbackReference =
    pest.reference ||
    getPestFullReference(
      pest.name
    );


  return fallbackReference
    ? [fallbackReference]
    : [];

}


function renderPestReferenceLinks(
  pest
) {

  const references =
    getPestFullReferences(
      pest
    );


  return references
    .map(
      (
        reference,
        index
      ) => `

        <a
          class="pest-source-link"
          href="${escapeHtml(reference.url)}"
          target="_blank"
          rel="noopener noreferrer"
          onclick="event.stopPropagation()"
        >

          <span class="material-symbols-outlined">
            menu_book
          </span>

          <span>
            ${
              index === 0
                ? 'Reference'
                : 'Supporting source'
            }:
            ${escapeHtml(reference.name)}
          </span>

        </a>

      `
    )
    .join('');

}

const PEST_FULL_DB = [

  {
    name:'Aphids',

    icon:'assets/ui/pest-aphids.svg',

    // Monitored through crop relevance
    // and field inspection.
    // No generic humidity trigger.
    
  
    level:'monitor',
  
    crops:[
      'Tomato',
      'Eggplant',
      'Sitaw',
      'Pechay'
    ],


    signs:
      'Small soft-bodied aphids may cluster on tender shoots, stems, or leaf undersides. Check for curled or yellowing leaves, sticky honeydew, ants, or sooty mold.',


    treatment:
      'Inspect affected growth first. On sturdy plants, aphids may be dislodged with water, while localized heavily infested shoots or leaves may be removed. Use nonchemical controls first.',


    prevention:
      'Avoid excessive nitrogen fertilizer. Check transplants and nearby weeds for aphids, and conserve natural enemies such as lady beetles, lacewings, syrphid fly larvae, and parasitoid wasps.',


    references: [

      {
        name:
          'UC IPM — Aphids',

        url:
          'https://ipm.ucanr.edu/home-and-landscape/aphids/'
      },

      {
        name:
          'Philippine Vegetable Industry Roadmap 2021–2025',

        url:
          'https://www.pcaf.da.gov.ph/wp-content/uploads/2022/06/Philippine-Vegetable-Industry-Roadmap-2021-2025.pdf'
      }

    ]
  },

  {
    name:'Rice Stem Borer',

    icon:
      'assets/ui/pest-stem-borer.svg',

    // Monitored through Rice relevance
    // and field inspection.
    // No generic temperature trigger.
    

    level:'monitor',

    crops:[
      'Rice'
    ],

    signs:
      'Inspect rice for deadheart symptoms during vegetative growth and whiteheads during reproductive growth. Check affected tillers for stem-boring damage and confirm pest presence through field inspection.',


    treatment:
      'Confirm an active infestation before taking action. Use integrated pest-management practices such as field sanitation, thorough land preparation, removal of visible egg masses where practical, and locally recommended biological control measures.',


    prevention:
      'Monitor fields regularly, avoid excessive nitrogen fertilizer, conserve beneficial organisms, and coordinate locally appropriate synchronized planting and other preventive practices.',


    references:[

      {
        name:
          'DA-PhilRice — Rice Stemborer Advisory',

        url:
          'https://www.philrice.gov.ph/philrice-warns-of-major-rice-pest-threats-in-early-2026/'
      },

      {
        name:
          'DA-PhilRice — Pest Infestation Advisory',

        url:
          'https://www.philrice.gov.ph/philrice-urges-farmers-to-watch-out-for-pest-infestations/'
      }

    ]
  },


  {
    name:'Asian Corn Borer',

    icon:
      'assets/ui/pest-stem-borer.svg',

    // Corn-specific pest.
    // Monitored through crop relevance
    // and field inspection.
    // No generic weather threshold.
    

    level:'monitor',

    crops:[
      'Corn'
    ],


    signs:
      'Inspect corn leaves for small feeding holes and check the tassel and stalk for boring damage. Egg masses may also be found on leaves. Advanced stalk damage can weaken the plant and may lead to stalk breakage.',


    treatment:
      'Confirm Asian corn borer infestation before taking action. Prioritize integrated pest-management practices and follow locally appropriate guidance from agricultural authorities or crop-protection specialists.',


    prevention:
      'Scout corn regularly, maintain field sanitation, practice crop rotation where appropriate, and coordinate locally recommended planting and biological pest-management practices. Conserve beneficial organisms that naturally attack Asian corn borer.',


    references:[

      {
        name:
          'DA RFO 5 — Asian Corn Borer Biological Control Guide',

        url:
          'https://bicol.da.gov.ph/wp-content/uploads/2019/03/Earwigs-Trichogramma-Biological-Control-against-Asian-Corn-Borer.pdf'
      },

      {
        name:
          'DA-CAR — Insect Pests and Diseases of Corn',

        url:
          'https://car.da.gov.ph/wp-content/uploads/2023/06/CORN-Pests-and-Diseases.pdf'
      }

    ]
  },

  {
    name:'Whitefly',

    icon:
      'assets/ui/pest-whitefly.svg',

    // Monitored through crop relevance
    // and field inspection.
    // No generic humidity threshold.
    

    level:'monitor',

    crops:[
      'Tomato',
      'Eggplant',
      'Okra'
    ],


    signs:
      'Tiny white adults may fly from the plant when disturbed. Inspect leaf undersides for adults and nymphs, and check for yellowing leaves, sticky honeydew, or black sooty mold.',


    treatment:
      'Confirm whitefly presence before taking action. Remove isolated heavily infested leaves where practical, monitor adults with yellow sticky traps, and use nonchemical or biological management practices first.',


    prevention:
      'Inspect new plants before adding them to the field, remove nearby host weeds and crop residues, conserve natural enemies, maintain good field sanitation, and consider reflective mulch for young susceptible crops where appropriate.',


    references:[

      {
        name:
          'UC IPM — Whiteflies',

        url:
          'https://ipm.ucanr.edu/home-and-landscape/whiteflies/'
      },

      {
        name:
          'World Vegetable Center — Whitefly IPM Guide',

        url:
          'https://avrdc.org/download/v4pp/training-farmers/1-4-ipm/Whitefly_factsheet.pdf'
      },

      {
        name:
          'UF/IFAS — Insect Management for Okra',

        url:
          'https://ask.ifas.ufl.edu/publication/IG152'
      }

    ]
  },

  {
    name:
      'Phytophthora Root & Crown Rot',

    icon:
      'assets/ui/pest-root-rot.svg',

    // Monitored through crop relevance,
    // drainage conditions, and field
    // inspection.
    // Rain alone is not a disease trigger.
    

    level:'monitor',

    crops:[
      'Tomato',
      'Eggplant',
      'Bell Pepper'
    ],

  
    signs:
      'Watch for plants that wilt or yellow even when water is available. Inspect roots and the crown for water-soaked, brown, or decayed tissue, especially in poorly drained areas.',

    treatment:
      'If symptoms are present, improve drainage and avoid further soil saturation. Confirm the disease through crop-specific diagnosis or local agricultural guidance before choosing a treatment.',

    prevention:
      'Avoid prolonged soil saturation and standing water. Maintain good drainage, irrigate only as needed, and consider raised beds where drainage is a recurring problem.',

    references:[

      {
        name:
          'UC IPM — Phytophthora Root and Crown Rot',

        url:
          'https://ipm.ucanr.edu/home-and-landscape/phytophthora-root-and-crown-rot/'
      },
      {
        name:
          'UC IPM — Water Management and Pest Problems',

        url:
          'https://ipm.ucanr.edu/home-and-landscape/water-management-and-pest-problems/'
      }

    ]
  },

  {
    name:'Leaf Miner',

    icon:
      'assets/ui/pest-leaf-miner.svg',

    // Vegetable leafminer activity and
    // development can be influenced by
    // temperature, host availability,
    // natural enemies, and field conditions.
    // No generic humidity threshold.
    

    level:'monitor',

    crops:[
      'Sitaw',
      'Ampalaya',
      'Pechay'
    ],


    signs:
      'Look for winding or serpentine whitish mines inside leaves. Small pale feeding punctures may also appear on the leaf surface, while heavy mining can cause damaged leaves to dry or drop.',


    treatment:
      'Confirm active leaf mines before taking action. Remove heavily infested leaves where practical and continue regular field inspection. Preserve natural enemies that help suppress leafminer populations.',


    prevention:
      'Scout seedlings and young plants regularly, remove infested crop residue and nearby host weeds where practical, and conserve beneficial parasitoid wasps. Yellow sticky traps may be used to monitor adult leafminer activity.',


    reference:
      getPestFullReference(
        'Leaf Miner'
      )
  },  

  {
    name:'Onion Thrips',

    icon:
      'assets/ui/pest-thrips.svg',

    // Onion and garlic thrips must be
    // confirmed through crop inspection.
    // No generic humidity threshold.
    
  
    level:'monitor',
  
    crops:[
      'Onion',
      'Garlic'
    ],
  
  
    signs:
      'Inspect inner leaves and leaf folds for small slender thrips and silvery or scarred feeding damage. Heavy feeding may give onion foliage an overall silvery appearance.',
  
  
    treatment:
      'Confirm thrips presence and visible crop injury before taking action. Continue field monitoring and prioritize cultural and biological integrated pest-management practices while conserving natural enemies.',
  
  
    prevention:
      'Scout onion and garlic regularly, manage nearby weeds and alternate host plants where appropriate, and conserve beneficial insects. Do not rely on weather conditions alone to determine infestation.',
  
  
    references:[
  
      {
        name:
          'UC IPM — Thrips in Onion and Garlic',

        url:
          'https://ipm.ucanr.edu/agriculture/onion-and-garlic/thrips/'
      },

      {
        name:
          'Philippine National Standard — GAP for Onion Production',

        url:
          'https://ppssd.buplant.da.gov.ph/storage/app/public/LegalReference/PNS_BAFS%20108_2014%20Code%20of%20GAP%20for%20Onion%20Production.pdf'
      }

    ]
  },

  {
    name:'Corn Thrips',

    icon:
      'assets/ui/pest-thrips.svg',

    // Corn can host different thrips
    // species from those commonly
    // emphasized in onion production.
    // No generic weather threshold.

  
    level:'monitor',

    crops:[
      'Corn'
    ],

    signs:
      'Inspect young corn plants, whorls, tassels, ears, and leaf undersides for thrips. Heavy feeding on seedlings may cause stunting and distorted leaves with browned edges.',

    treatment:
      'Confirm that thrips are causing meaningful crop injury before taking action. Young corn can sometimes recover from thrips feeding, so continue scouting and preserve beneficial insects rather than treating based on thrips presence alone.',

    prevention:
      'Maintain good field sanitation, monitor young plants and developing ears, manage nearby weeds where appropriate, and conserve beneficial insects that help regulate thrips populations.',

    references:[
  
      {
        name:
          'UC IPM — Thrips in Corn',

        url:
          'https://ipm.ucanr.edu/agriculture/corn/thrips/'
      }

    ]
  },

  {
    name:'Spider Mites',

    icon:
      'assets/ui/pest-spider-mites.svg',

    // Spider mite populations can increase
    // under warm, dry, dusty conditions
    // and on water-stressed plants.
    // Weather alone does not confirm
    // an active infestation.
    
  
    level:'monitor',
  
    crops:[
      'Tomato',
      'Eggplant',
      'Corn'
    ],
  
  
    signs:
      'Inspect leaf undersides for tiny moving mites, eggs, and fine webbing. Feeding may cause white or yellow stippling, bronzing, yellowing, or drying of affected leaves.',
  
  
    treatment:
       'Confirm spider mites are present before taking action. On sturdy plants, water may be used to dislodge mites from leaf undersides where practical. Continue monitoring and preserve natural enemies before considering crop-specific control measures.',
  
  
    prevention:
      'Avoid plant water stress, reduce dusty field conditions, manage nearby weed hosts where appropriate, and conserve predatory mites and beneficial insects. Avoid unnecessary broad-spectrum insecticide use because it can disrupt natural enemies.',
   
  
    reference:
      getPestFullReference(
        'Spider Mites'
      )
  },

  {
    name:'Cutworm',

    icon:
      'assets/ui/pest-cutworm.svg',

    // Cutworm risk depends on field history,
    // weeds and alternate hosts, young crop
    // stage, and actual feeding damage.
    // Rain alone does not confirm elevated
    // cutworm risk.
    
  
    level:'monitor',
  
    crops:[
      'Corn',
      'Tomato',
      'Rice'
    ],
  
  
    signs:
      'In corn and tomato, inspect young plants for stems clipped at or near the soil surface. Cutworm larvae often hide in the soil, under clods, or near plant debris during the day. In rice, cutworms are less common but may cut or feed on leaves.',
  
  
    treatment:
      'Confirm cutworm activity before taking action. Inspect the soil around recently damaged plants and affected field areas, and prioritize field sanitation and other locally appropriate integrated pest-management practices.',
  
  
    prevention:
      'Remove weeds and crop residues that may shelter cutworms, prepare fields before planting where appropriate, and inspect seedlings and field edges regularly for early feeding damage.',
  
  
    references:[
  
      {
        name:
          'UC IPM — Cutworms in Corn',
  
        url:
          'https://ipm.ucanr.edu/agriculture/corn/cutworms/'
      },
  
      {
        name:
          'UC IPM — Cutworms in Tomato',
  
        url:
          'https://ipm.ucanr.edu/agriculture/tomato/cutworms/'
      },
  
      {
        name:
          'DA-PhilRice — Rice Pest FAQs',
  
        url:
          'https://dbmp.philrice.gov.ph/FAQs/src/search.php'
      }
  
    ]
  },

  {
    name:'Diamondback Moth',

    icon:
      'assets/ui/pest-diamondback-moth.svg',

    // Temperature can influence
    // diamondback moth development,
    // but temperature alone does not
    // confirm an elevated infestation risk.
    // Field scouting remains necessary.
    
  
    level:'monitor',
  
    crops:[
      'Pechay',
      'Cabbage',
      'Broccoli',
      'Cauliflower'
    ],


    signs:
      'Inspect leaf undersides for small green larvae and characteristic windowpane-like feeding damage. Older larvae may create small holes and can damage growing points, cabbage leaves, broccoli heads, or cauliflower heads.',

  
    treatment:
      'Confirm diamondback moth larvae and feeding damage before taking action. Continue regular crop scouting and prioritize cultural and biological integrated pest-management practices while conserving natural enemies.',
  
  
    prevention:
      'Rotate away from Brassica crops between plantings where practical, remove cruciferous weeds and crop residues that may serve as hosts, and conserve parasitoid wasps and other beneficial organisms.',
  
  
    references:[

      {
        name:
          'UC IPM — Diamondback Moth',

        url:
          'https://ipm.ucanr.edu/agriculture/cole-crops/diamondback-moth/'
      }

    ]
  },

  {
    name:'Bagrada Bug',

    icon:
      'assets/ui/pest-bagrada-bug.svg',

    // Warmer temperatures can increase
    // Bagrada bug activity and development,
    // but temperature alone does not confirm
    // an elevated field infestation.
    // Crop relevance and scouting are required.
    
  
    level:'monitor',
  
    crops:[
      'Cabbage',
      'Broccoli',
      'Cauliflower'
    ],
  
  
    signs:
     'Inspect young plants for small black bugs with orange and white markings. Look for white or light-green starburst-shaped feeding lesions, stippling, wilting, stunting, damaged growing points, or malformed and multiple heads.',


    treatment:
      'Confirm Bagrada bugs or characteristic feeding damage before taking action. When populations are still very low, bugs may be removed by hand where practical. Continue frequent scouting of young plants and field edges.',


    prevention:
      'Inspect seedlings and transplants before planting, remove nearby cruciferous weeds that may serve as hosts, clear crop residues after harvest, and monitor young plants regularly because they are especially vulnerable to feeding damage.',


    references:[

      {
        name:
          'UC IPM — Bagrada Bug in Cole Crops',
  
        url:
          'https://ipm.ucanr.edu/agriculture/cole-crops/bagrada-bug/'
      },
  
      {
        name:
          'UC IPM — Bagrada Bug',
  
         url:
          'https://ipm.ucanr.edu/home-and-landscape/bagrada-bug/'
      }

    ]
  },

  {
    name:'Fall Armyworm',

    icon:
      'assets/ui/pest-fall-armyworm.svg',

    // Temperature influences Fall Armyworm
    // development, but temperature alone
    // does not confirm pest presence or an
    // elevated field infestation.
    // Field scouting remains necessary.
    
  
    level:'monitor',
  
    crops:[
      'Corn',
      'Rice',
      'Sorghum'
    ],
  
  
    signs:
      'Inspect leaves and growing points for fresh chewing damage, ragged holes, egg masses, and young larvae. In corn, check the whorl for fresh leaf damage and frass. In rice and sorghum, inspect young foliage for active feeding damage.',
  
  
    treatment:
      'Confirm current Fall Armyworm activity through field scouting before taking action. Remove egg masses or young larvae by hand where practical, continue monitoring affected plants, and prioritize locally appropriate integrated pest-management practices while conserving natural enemies.',
  
  
    prevention:
      'Scout fields regularly from crop emergence, especially while plants are young. Record fresh feeding damage and pest observations, maintain good field sanitation, and conserve beneficial organisms that naturally help suppress Fall Armyworm.',
  
  
    references:[
  
      {
        name:
          'FAO — Fall Armyworm',
  
        url:
          'https://www.fao.org/pest-and-pesticide-management/ipm/fall-armyworm/en/'
      },
  
      {
        name:
          'FAO — Fall Armyworm Scouting Guidance',
  
        url:
          'https://www.fao.org/fileadmin/templates/fcc/Fall_Armyworm/web_FINAL-guidance-note-2.pdf'
      },
  
      {
        name:
          'DA — Fall Armyworm Management Project',
  
        url:
          'https://www.da.gov.ph/wp-content/uploads/2021/04/mo26_s2021.pdf'
      }
  
    ]
  },

  {
    name:'Brown Planthopper',

    icon:
      'assets/ui/pest-brown-planthopper.svg',

    // Higher humidity can contribute to
    // favorable Brown Planthopper conditions,
    // together with crop stage, dense planting,
    // nitrogen level, and field management.
    // Weather alone does not confirm
    // an active infestation.
    
  
    level:'monitor',
  
    crops:[
      'Rice'
    ],
  
  
    signs:
      'Inspect the lower portions and base of rice tillers for brown planthopper adults and nymphs. Feeding may cause lower leaves to yellow and progressively dry. Heavy infestations can produce irregular brown patches of dried plants known as hopperburn.',
  
  
    treatment:
      'Confirm Brown Planthopper presence and population level through field inspection before taking action. If populations are high, follow locally appropriate integrated pest-management guidance and manage field water conditions appropriately while conserving beneficial organisms.',
   
  
    prevention:
      'Inspect rice fields regularly, avoid excessive nitrogen fertilizer and overly dense planting, use appropriate water management, and consider locally recommended resistant varieties and synchronized planting practices.',
  
  
    references:[
  
      {
        name:
          'DA-PhilRice — Brown Planthopper Population Guidance',
  
        url:
          'https://www.philrice.gov.ph/check-population-to-determine-counter-action-against-bph-rice-pest-expert/'
      },
  
      {
        name:
          'DA-PhilRice — 2026 Rice Pest Advisory',
  
        url:
          'https://www.philrice.gov.ph/philrice-warns-of-major-rice-pest-threats-in-early-2026/'
      },
  
      {
        name:
          'DA-PhilRice — Rice Field Pest Monitoring Advisory',
  
        url:
          'https://www.philrice.gov.ph/philrice-issues-warning-vs-rice-field-pest-threats/'
      }
  
    ]
  },

  {
    name:'Powdery Mildew',

    icon:
      'assets/ui/pest-powdery-mildew.svg',

    // Powdery mildew can develop without
    // free water on leaf surfaces.
    // Humidity, temperature, shade, host crop,
    // and field conditions all influence disease.
    // No generic low-humidity threshold.
    
 
    level:'monitor',
  
    crops:[
      'Okra',
      'Cucumber',
      'Squash',
      'Melon',
      'Watermelon'
    ],
  
  
    signs:
      'Inspect leaves, petioles, and stems for white powdery fungal growth. Early infections may begin as pale or yellow spots before powdery growth becomes obvious. Affected leaves may later yellow, curl, become brown and papery, or dry out.',
  
   
    treatment:
      'Confirm powdery mildew symptoms before taking action. Remove heavily affected plant material where practical, improve air circulation around plants, and continue monitoring nearby leaves for new powdery growth. Follow crop-specific disease-management guidance when symptoms continue to spread.',
  
  
    prevention:
      'Use resistant or less susceptible varieties when available, provide adequate plant spacing and sunlight, maintain good field sanitation, control nearby weed hosts, and avoid excessive nitrogen fertilizer that can promote dense susceptible growth.',
  
  
    references:[
  
      {
        name:
          'UC IPM — Powdery Mildew on Vegetables',
  
        url:
          'https://ipm.ucanr.edu/home-and-landscape/powdery-mildew-on-vegetables/'
      },
  
      {
        name:
          'UC IPM — Powdery Mildew on Cucurbits',
  
        url:
          'https://ipm.ucanr.edu/home-and-landscape/powdery-mildew-on-cucurbits/'
      },
  
      {
        name:
          'DA-ATI — Squash Production Guide',
  
        url:
          'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2022-12/squash_production_guide_leaflet.pdf'
      }
  
    ]
  },

];

let pestLogs = lsLoad(
  LS_PEST_LOGS,
  [

    {
      id:1,
      date:'2026-03-10',
      pest:'Aphids',
      crop:'Tomato',
      location:'North Field A',
      severity:'medium',
      notes:
        'Observed aphid clusters on young growth and leaf undersides. Monitoring the affected plants.'
    },

    {
      id:2,
      date:'2026-03-12',
      pest:'Rice Stem Borer',
      crop:'Rice',
      location:'Paddy Field',
      severity:'low',
      notes:
        'Observed several rice tillers with visible stem-borer damage. Monitoring the affected area.'
    },

    {
      id:3,
      date:'2026-03-14',
      pest:'Phytophthora Root & Crown Rot',
      crop:'Tomato',
      location:'Back Lot',
      severity:'high',
      notes:
        'Observed wilting and brown, water-soaked tissue near the crown in a poorly drained area.'
    }

  ]
);

let nextPestLogId = lsLoad('fc_nextPestLogId', 4);

function getPestCropRelevanceHtml(
  pest
) {

  if (!pest) {
    return '';
  }


  const affectedCrops =
    Array.isArray(pest.crops)
      ? pest.crops
      : [];


  const plantedCrops =
    Array.isArray(myCrops)
      ? myCrops
      : [];


  const plantedCropNames =
    plantedCrops
      .map(crop =>
        String(
          crop?.type || ''
        ).trim()
      )
      .filter(Boolean);


  const matchingCrops =
    affectedCrops.filter(
      affectedCrop =>

        plantedCropNames.some(
          plantedCrop =>

            plantedCrop.toLowerCase() ===
            String(
              affectedCrop
            )
              .trim()
              .toLowerCase()

        )

    );


  const uniqueMatchingCrops =
    [...new Set(matchingCrops)];


  if (plantedCropNames.length === 0) {

    return `
      <div class="pfi-crop-relevance no-crop">

        <img
          src="assets/ui/stage-seedling.svg"
          alt=""
          class="pfi-crop-relevance-icon"
        >

        <div>

          <span class="pfi-crop-relevance-label">
            Farm relevance
          </span>

          <span class="pfi-crop-relevance-text">
            No crops added in My Crops yet.
          </span>

        </div>

      </div>
    `;

  }


  if (uniqueMatchingCrops.length === 0) {

    return `
      <div class="pfi-crop-relevance no-match">

        <img
          src="assets/ui/stage-seedling.svg"
          alt=""
          class="pfi-crop-relevance-icon"
        >

        <div>

          <span class="pfi-crop-relevance-label">
            Farm relevance
          </span>

          <span class="pfi-crop-relevance-text">
            No matching crop currently planted.
          </span>

        </div>

      </div>
    `;

  }


  return `
    <div class="pfi-crop-relevance has-match">

      <img
        src="assets/ui/stage-seedling.svg"
        alt=""
        class="pfi-crop-relevance-icon"
      >

      <div>

        <span class="pfi-crop-relevance-label">
          Relevant to your crops
        </span>

        <span class="pfi-crop-relevance-text">
          ${uniqueMatchingCrops
            .map(crop =>
              escapeHtml(crop)
            )
            .join(', ')}
        </span>

      </div>

    </div>
  `;

}

function renderPestPage() {

    const pestPageData =
      PEST_FULL_DB;

   
    // Weather is context only.
    // Pest monitoring priority is based
    // on crop relevance and field inspection.

    const banner =
      document.getElementById(
        'pestAlertBanner'
      );

    const bannerIcon =
      document.getElementById(
        'pabIcon'
      );
  
    const bannerTitle =
      document.getElementById(
        'pabTitle'
      );
  
    const bannerSub =
      document.getElementById(
        'pabSub'
      );
  
  
    if (banner) {
      banner.className =
        'pest-alert-banner ok';
    }
  
  
    if (bannerIcon) {
      bannerIcon.src =
        'assets/ui/pest-status-analyzing.svg';
    }
  
  
    if (bannerTitle) {
      bannerTitle.textContent =
        'Pest Monitoring Advisory';
    }
  
 
    if (bannerSub) {
      bannerSub.textContent =
        'Weather provides farm context only and does not confirm pest presence. Crop relevance and field inspection are used to guide monitoring.';
    }


    const plantedCropNames =
      Array.isArray(myCrops)
        ? myCrops
            .map(crop =>
              String(
                crop?.type || ''
              )
                .trim()
                .toLowerCase()
            )
            .filter(Boolean)
        : [];
   
  
    // Crop-relevant pests and diseases
    const active =
      pestPageData.filter(pest => {
  
        const affectedCrops =
          Array.isArray(pest.crops)
            ? pest.crops
            : [];


        return affectedCrops.some(
          affectedCrop =>
            plantedCropNames.includes(
              String(affectedCrop)
                .trim()
                .toLowerCase()
            )
        );
  
      });
 

  // Pest monitoring summary
  const pestActiveSummary =
    document.getElementById(
      'pestActiveSummary'
    );

  const pestMonitoredSummary =
    document.getElementById(
      'pestMonitoredSummary'
    );


  if (pestActiveSummary) {

    pestActiveSummary.textContent =
      `${active.length} Crop ${
        active.length === 1
          ? 'Match'
          : 'Matches'
      }`;

  }


  if (pestMonitoredSummary) {

    pestMonitoredSummary.textContent =
      `${pestPageData.length} ${
        pestPageData.length === 1
          ? 'Pest'
          : 'Pests'
      } Monitored`;

  }


  const pestFullList =
    document.getElementById(
      'pestFullList'
    );


  const otherMonitoredPests =
    pestPageData.filter(
      pest =>
        !active.includes(pest)
    );


  const pestMonitoredSection =
    document.getElementById(
      'pestMonitoredSection'
    );

  const pestMonitoredList =
    document.getElementById(
      'pestMonitoredList'
    );

  const pestMonitoredToggleText =
    document.getElementById(
      'pestMonitoredToggleText'
    );


  if (
    pestMonitoredSection &&
    pestMonitoredList &&
    pestMonitoredToggleText
  ) {

    pestMonitoredSection.hidden =
      otherMonitoredPests.length === 0;


    pestMonitoredToggleText.textContent =
      `Other Monitored Pests (${otherMonitoredPests.length})`;


    pestMonitoredList.innerHTML =
      otherMonitoredPests
        .map(p => `

          <div class="pest-monitored-item">

            <div class="pest-monitored-icon">

              <img
                src="${p.icon}"
                alt=""
                class="pest-monitored-icon-img"
              >
  
            </div>
  
  
            <div class="pest-monitored-info">
  
              <div class="pest-monitored-name">
                ${escapeHtml(p.name)}
              </div>
  
              <div class="pest-monitored-note">
                Monitored — no matching crop currently in My Crops
              </div>

              <div class="pest-source-row">
                ${renderPestReferenceLinks(
                  p
                )}
              </div>
  
            </div>
  
  
            <span class="pest-monitored-status">
              Monitored
            </span>
  
          </div>
  
        `)
        .join('');

  }


  if (!pestFullList) return;

  if (active.length === 0) {
    pestFullList.innerHTML = `
      <div class="pest-full-empty">

        <div class="pest-full-empty-icon">
          <img
            src="assets/ui/pest-status-low.svg"
            alt=""
            class="pest-full-empty-icon-img"
          >
       </div>

        <div>

          <strong>
            No Crop-Specific Matches
          </strong>

          <p>
            None of the monitored pests or diseases currently match
            the crops saved in My Crops. Continue regular field inspection.
          </p>

        </div>

      </div>
    `;

}   else {
    pestFullList.innerHTML = active.map(p => `
      <div class="pest-full-item ${p.level}">
        <div class="pfi-top">
          <div class="pfi-icon">
            <img
              src="${p.icon}"
              alt=""
              class="pfi-icon-img"
            >
          </div>

          <div class="pfi-info">

            <div class="pfi-name">
              ${p.name}
            </div>

            <div class="pfi-crops">
              May affect: ${p.crops.slice(0, 3).join(', ')}
            </div>
          </div>

          <div class="pest-level level-${p.level}">
            <div class="pest-pulse"></div>
            ${p.level.charAt(0).toUpperCase() + p.level.slice(1)}
          </div>
           
        </div>


        ${getPestCropRelevanceHtml(
          p
        )}


        <div class="pfi-detail">

         <div class="pfi-section">
           <span class="pfi-label">
             Signs to inspect:
           </span>

           ${p.signs}
         </div>

         <div class="pfi-section">
           <span class="pfi-label">
             If confirmed:
           </span>

           ${p.treatment}
         </div>

      </div>


      <div class="pest-source-row">


        ${renderPestReferenceLinks(
          p
        )}

      </div>


        <button
          class="pfi-log-btn"
          onclick="quickLogPest('${p.name}')"
        >
          + Log Sighting
        </button>
      </div>
    `).join('');
  }

  // Pest badge count
  const badge = document.getElementById('pestBadge');

  if (badge) {
    badge.textContent =
      active.length;
  }
  // Prevention tips
  document.getElementById(
    'preventionTips'
  ).innerHTML = [

    {
      icon:
        'assets/ui/stage-vegetative.svg',
      tip:
        'Maintain proper plant spacing to allow air circulation.'
    },

    {
      icon:
        'assets/ui/quick-water.svg',
      tip:
        'Avoid overhead watering — wet leaves encourage fungal growth.'
    },

    {
      icon:
        'assets/ui/scanner-detect.svg',
      tip:
        'Scout fields regularly and inspect crops for visible pest or disease signs.'
    },

    {
      icon:
        'assets/ui/stage-seedling.svg',
      tip:
        'Rotate crops each season to break pest life cycles.'
    },

    {
      icon:
        'assets/ui/pest-cleanup.svg',
      tip:
        'Remove crop debris and weeds that harbor pests.'
    },

    {
      icon:
        'assets/ui/pest-beneficial-insect.svg',
      tip:
        'Encourage beneficial insects like ladybugs and spiders.'
    }

  ].map(t => `

    <div class="prev-tip">

      <div class="pt-icon">
        <img
          src="${t.icon}"
          alt=""
          class="pt-icon-img"
        >
      </div>

      <div class="pt-text">
        ${t.tip}
      </div>

    </div>

  `).join('');

  // Pest guide (encyclopedia)
  document.getElementById(
    'pestGuideList'
  ).innerHTML =
    pestPageData.map(p => `

    <div class="pest-guide-item" onclick="this.classList.toggle('open')">
      <div class="pgi-header">
        <span class="pgi-icon">
          <img
            src="${p.icon}"
            alt=""
            class="pgi-icon-img"
          >
        </span>

        <span class="pgi-name">
          ${p.name}
        </span>
        
        <span class="pest-level level-${p.level}" style="margin-left:auto">${p.level}</span>
        <span class="material-symbols-outlined pgi-arrow">expand_more</span>
      </div>

      <div class="pgi-body">

        <div class="pfi-section">
          <span class="pfi-label">
            Signs:
          </span>

          ${p.signs}
        </div>

        <div class="pfi-section">
          <span class="pfi-label">
            Treatment:
          </span>

          ${p.treatment}
        </div>

        <div class="pfi-section">
          <span class="pfi-label">
            Prevention:
          </span>

          ${p.prevention}
        </div>


        ${
          getPestFullReferences(p).length
            ? `
              <div class="pest-source-row">
                ${renderPestReferenceLinks(p)}
              </div>
            `
            : ''
        }

      </div>

    </div>
  `).join('');

  // Pest log
  renderPestLog();
}

function toggleOtherMonitoredPests() {

  const list =
    document.getElementById(
      'pestMonitoredList'
    );

  const toggle =
    document.getElementById(
      'pestMonitoredToggle'
    );

  const chevron =
    document.getElementById(
      'pestMonitoredChevron'
    );


  if (!list) return;


  const willOpen =
    list.hidden;


  list.hidden =
    !list.hidden;


  if (toggle) {

    toggle.setAttribute(
      'aria-expanded',
      String(willOpen)
    );

  }


  if (chevron) {

    chevron.textContent =
      willOpen
        ? 'expand_less'
        : 'expand_more';

  }

}

function renderPestLog() {
  const list = document.getElementById('pestLogList');
  if (!list) return;
  if (pestLogs.length === 0) {
    list.innerHTML = '<div style="color:var(--text-muted);padding:16px;font-size:.85rem;text-align:center">No pest sightings logged yet.</div>';
    return;
  }
  list.innerHTML = [...pestLogs].reverse().map(l => `
    <div class="pest-log-item ${l.severity}">
      <div class="pli-top">
        <div class="pli-pest">${l.pest}</div>
        <div class="pest-level level-${l.severity}">${l.severity}</div>
        <div class="pli-date">${l.date}</div>
        <button class="pli-del" onclick="deletePestLog('${l.id}')"><span class="material-symbols-outlined" style="font-size:15px">delete</span></button>
      </div>

      <div class="pli-info">

        <span class="pli-info-item">

          <img
            src="assets/ui/stage-seedling.svg"
            alt=""
            class="pli-info-icon"
          >

          <span>
            ${l.crop}
          </span>

        </span>

        <span class="pli-info-separator">
          ·
        </span>

        <span class="pli-info-item">

          <img
            src="assets/ui/pest-location.svg"
            alt=""
            class="pli-info-icon"
          >

          <span>
            ${l.location}
          </span>

        </span>

      </div>

      ${l.notes ? `<div class="pli-notes">${l.notes}</div>` : ''}
    </div>
  `).join('');
}

function populatePestLogTypeOptions(
  selectedValue = ''
) {

  const select =
    document.getElementById(
      'logPestType'
    );

  if (!select) return;


  const pestNames =
    [
      ...new Set(
        PEST_FULL_DB
          .map(pest =>
            String(
              pest?.name || ''
            ).trim()
          )
          .filter(Boolean)
      )
    ];


  select.innerHTML = '';


  const placeholder =
    document.createElement(
      'option'
    );

  placeholder.value = '';
  placeholder.textContent =
    'Select observation…';

  select.appendChild(
    placeholder
  );


  pestNames.forEach(name => {

    const option =
      document.createElement(
        'option'
      );

    option.value = name;
    option.textContent = name;

    select.appendChild(
      option
    );

  });


  const otherOption =
    document.createElement(
      'option'
    );

  otherOption.value = 'Other';
  otherOption.textContent =
    'Other';

  select.appendChild(
    otherOption
  );


  if (
    selectedValue &&
    [
      ...select.options
    ].some(
      option =>
        option.value ===
        selectedValue
    )
  ) {

    select.value =
      selectedValue;

  }

}


function quickLogPest(
  pestName
) {

  openLogPestModal(
    pestName
  );

}


function openLogPestModal(
  selectedPest = ''
) {

  populatePestLogTypeOptions(
    selectedPest
  );

  document.getElementById(
    'logPestModal'
  ).style.display =
    'flex';

}

function closeLogPestModal() { document.getElementById('logPestModal').style.display = 'none'; }
function savePestLog() {
  const pest = document.getElementById('logPestType').value;
  const sev  = document.getElementById('logPestSeverity').value;
  const crop = document.getElementById('logPestCrop').value.trim();
  const loc  = document.getElementById('logPestLocation').value.trim();
  const notes= document.getElementById('logPestNotes').value.trim();
  if (!pest || !crop || !loc) { toast('Please fill in all required fields.', 'warn'); return; }
  const today = new Date().toISOString().split('T')[0];
  pestLogs.push({ id: nextPestLogId++, date: today, pest, crop, location: loc, severity: sev, notes });
  lsSave(LS_PEST_LOGS, pestLogs); lsSave('fc_nextPestLogId', nextPestLogId);
  closeLogPestModal();
  renderPestLog();

  toast(
    `Field observation logged: ${pest} on ${crop}`,
    'ok'
  );
}

function deletePestLog(id) {
  pestLogs = pestLogs.filter(l => l.id !== id);
  lsSave(LS_PEST_LOGS, pestLogs);
  renderPestLog();
  toast('Log entry deleted.', 'warn');
}

function refreshPestPage() { renderPestPage(); toast('Pest monitoring refreshed!', 'ok'); }

// ═══════════════════════════════════════════════════════
// PLANTING CALENDAR PAGE
// ═══════════════════════════════════════════════════════

let calYear  = new Date().getFullYear();
let calMonth = new Date().getMonth(); // 0-indexed
let calSelectedDate = null;

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// Best planting months per crop (Philippine context)
const PLANTING_GUIDE = [
  {
    crop: 'Tomato',
    months: [10,11,0,1],
    note: 'Oct–Feb (cool dry season ideal)'
  },
  {
    crop: 'Corn',
    months: [0,1,2,6,7],
    note: 'Jan–Mar & Jul–Aug'
  },
  {
    crop: 'Rice',
    months: [5,6,10,11],
    note: 'Jun–Jul (wet season) & Nov–Dec (dry)'
  },
  {
    crop: 'Pechay',
    months: [10,11,0,1,2],
    note: 'Oct–Mar (cool season)'
  },
  {
    crop: 'Eggplant',
    months: [0,1,2,3],
    note: 'Jan–Apr'
  },
  {
    crop: 'Ampalaya',
    months: [1,2,3,4],
    note: 'Feb–May'
  },
  {
    crop: 'Sitaw',
    months: [2,3,4,5],
    note: 'Mar–Jun'
  },
  {
    crop: 'Kamote',
    months: [5,6,7,8],
    note: 'Jun–Sep (rainy season)'
  },
  {
    crop: 'Garlic',
    months: [9,10,11],
    note: 'Oct–Dec'
  },
  {
    crop: 'Onion',
    months: [9,10,11,0],
    note: 'Oct–Jan'
  }
];

function renderCalPage() {

  renderCalGrid();

  renderCalList();

  renderBestPlanting();

  applyCalendarView();

}

function renderCalGrid() {
  const title = `${MONTH_NAMES[calMonth]} ${calYear}`;
  document.getElementById('calMonthTitle').textContent = title;

  const firstDay = new Date(calYear, calMonth, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

  // Build crop events map for this month
  const cropEvents = {};
  myCrops.forEach(crop => {
    // Planted date
    const pd = new Date(crop.planted);
    if (pd.getFullYear() === calYear && pd.getMonth() === calMonth) {
      const key = pd.getDate();
      if (!cropEvents[key]) cropEvents[key] = [];
      cropEvents[key].push({
        type: 'planted',
        crop: crop.type,
        color: 'green'
      });
    }
    // Harvest date
    if (
      hasValidCropHarvestDate(
        crop
      )
    ) {

    const hd =
      new Date(
        `${crop.harvest}T00:00:00`
      );

    if (
      hd.getFullYear() === calYear &&
      hd.getMonth() === calMonth
    ) {

    const key = hd.getDate();

      if (!cropEvents[key]) {
        cropEvents[key] = [];
      }

      cropEvents[key].push({
        type: 'harvest',
        crop: crop.type,
        color: 'amber'
      });

        }

    }

  }); // ← closes myCrops.forEach(crop => { ... })
  

  let html = '';
  // Empty cells for first week
  for (let i = 0; i < firstDay; i++) html += '<div class="cal-cell empty"></div>';

  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isToday = dateKey === todayKey;
    const isSelected = calSelectedDate === dateKey;
    const events = cropEvents[d] || [];
    const dotsHtml = events.slice(0,3).map(e =>
      `<div class="cal-dot ${e.color}" title="${e.type==='planted'?'Planted':'Harvest'}: ${e.crop}"></div>`
    ).join('');

    html += `<div class="cal-cell${isToday?' today':''}${isSelected?' selected':''}" onclick="selectCalDate('${dateKey}', ${d})">
      <div class="cal-cell-num">${d}</div>
      ${dotsHtml ? `<div class="cal-cell-dots">${dotsHtml}</div>` : ''}
    </div>`;
  }
  document.getElementById('calDaysGrid').innerHTML = html;
}

function renderCalList() {

  const list =
    document.getElementById(
      'calListView'
    );


  if (!list) {
    return;
  }


  const events = [];


  myCrops.forEach(
    crop => {

      const cropName =
        crop.type ||
        'Crop';


      const cropLocation =
        crop.location ||
        'Saved field';


      const iconHtml =
        getCropIconHtml(
          cropName,
          'cal-list-crop-icon-img'
        );


      const plantedValue =
        String(
          crop.planted ||
          ''
        ).trim();


      if (plantedValue) {

        const plantedDate =
          new Date(
            `${plantedValue}T00:00:00`
          );


        if (
          !Number.isNaN(
            plantedDate.getTime()
          ) &&
          plantedDate.getFullYear() ===
            calYear &&
          plantedDate.getMonth() ===
            calMonth
        ) {

          events.push({
            date: plantedDate,
            crop: cropName,
            location: cropLocation,
            icon: iconHtml,
            type: 'planted',
            color: 'green'
          });

        }

      }


      if (
        hasValidCropHarvestDate(
          crop
        )
      ) {

        const harvestDate =
          new Date(
            `${crop.harvest}T00:00:00`
          );


        if (
          harvestDate.getFullYear() ===
            calYear &&
          harvestDate.getMonth() ===
            calMonth
        ) {

          events.push({
            date: harvestDate,
            crop: cropName,
            location: cropLocation,
            icon: iconHtml,
            type: 'harvest',
            color: 'amber'
          });

        }

      }

    }
  );


  events.sort(
    (a, b) =>
      a.date -
      b.date
  );


  if (!events.length) {

    list.innerHTML = `
      <div class="cal-list-empty">
        No planting or harvest events
        saved for this month.
      </div>
    `;

    return;

  }


  list.innerHTML =
    events.map(event => {

      const day =
        event.date
          .toLocaleDateString(
            'en-PH',
            {
              month: 'short',
              day: 'numeric'
            }
          );


      const weekday =
        event.date
          .toLocaleDateString(
            'en-PH',
            {
              weekday: 'short'
            }
          );


      const typeLabel =
        event.type ===
        'planted'
          ? 'Planted'
          : 'Expected Harvest';


      return `
        <div class="cal-list-event ${event.color}">

          <div class="cal-list-date">

            <strong>
              ${escapeHtml(day)}
            </strong>

            <span>
              ${escapeHtml(weekday)}
            </span>

          </div>


          <div class="cal-list-icon">
            ${event.icon}
          </div>


          <div class="cal-list-info">

            <strong>
              ${escapeHtml(event.crop)}
            </strong>

            <span>
              ${escapeHtml(event.location)}
            </span>

          </div>


          <span class="cal-list-type ${event.color}">
            ${typeLabel}
          </span>

        </div>
      `;

    }).join('');

}

function applyCalendarView() {

  const view =
    appSettings.calView ===
    'list'
      ? 'list'
      : 'calendar';


  const gridHeader =
    document.getElementById(
      'calGridHeader'
    );


  const grid =
    document.getElementById(
      'calDaysGrid'
    );


  const list =
    document.getElementById(
      'calListView'
    );


  const selectedDayCard =
    document.getElementById(
      'calSelectedDayCard'
    );


  const showList =
    view ===
    'list';


  gridHeader?.classList.toggle(
    'cal-view-hidden',
    showList
  );


  grid?.classList.toggle(
    'cal-view-hidden',
    showList
  );


  list?.classList.toggle(
    'cal-view-hidden',
    !showList
  );


  selectedDayCard?.classList.toggle(
    'cal-view-hidden',
    showList
  );

}

function selectCalDate(dateKey, day) {
  calSelectedDate = dateKey;
  renderCalGrid(); // Re-render to show selected

  const date = new Date(calYear, calMonth, day);
  const label = date.toLocaleDateString('en-PH', { weekday:'long', month:'long', day:'numeric', year:'numeric' });
  document.getElementById('calSelectedDateTitle').textContent = label;

  // Find events on this date
  const events = [];

  myCrops.forEach(crop => {

    const iconHtml =
      getCropIconHtml(
        crop.type,
        'cei-crop-icon-img'
      );

    if (crop.planted === dateKey) {
      events.push({
        icon: iconHtml,
        text: `${crop.type} planted at ${crop.location}`,
        color: 'green'
      });
    }
 
    if (crop.harvest === dateKey) {
      events.push({
        icon: iconHtml,
        text: `${crop.type} expected harvest at ${crop.location}`,
        color: 'amber'
      });
    }

});

  const eventsEl = document.getElementById('calDayEvents');
  if (events.length === 0) {
    eventsEl.innerHTML = '<div class="cal-no-events">No crop events on this date.</div>';
  } else {
    eventsEl.innerHTML = events.map(e => `
      <div class="cal-event-item ${e.color}">
        <div class="cei-icon">${e.icon}</div>
        <div class="cei-text">${e.text}</div>
      </div>
    `).join('');
  }
}

function changeCalMonth(dir) {
  calMonth += dir;
  if (calMonth < 0)  { calMonth = 11; calYear--; }
  if (calMonth > 11) { calMonth = 0;  calYear++; }
  calSelectedDate = null;
  renderCalGrid();
  renderCalList();
  renderBestPlanting();
  applyCalendarView();
  document.getElementById('calSelectedDateTitle').textContent = 'Select a date';
  document.getElementById('calDayEvents').innerHTML = '<div class="cal-no-events">Click a date to see crop events</div>';
}

function goToToday() {
  const t = new Date();
  calYear = t.getFullYear(); calMonth = t.getMonth();
  calSelectedDate = null;
  renderCalGrid();
  renderCalList();
  renderBestPlanting();
  applyCalendarView();
}

function renderBestPlanting() {

  const list =
    document.getElementById(
      'bestPlantingList'
    );

  if (!list) return;

  list.innerHTML =
    PLANTING_GUIDE.map(p => {

      const active =
        p.months.includes(calMonth);

      const cropIconHtml =
        getCropIconHtml(
          p.crop,
          'bpl-crop-icon-img'
        );

      return `
        <div class="bpl-item${active ? ' active' : ''}">

          <div class="bpl-crop">

            <span class="bpl-crop-icon">
              ${cropIconHtml}
            </span>

            <span>
              ${escapeHtml(p.crop)}
            </span>

          </div>

          <div class="bpl-note${active ? ' active' : ''}">

            ${
              active
                ? `
                  <span class="material-symbols-outlined">
                    check_circle
                  </span>

                  <span>
                    Good time to plant!
                  </span>
                `
                : escapeHtml(p.note)
            }

          </div>

        </div>
      `;

    }).join('');
}

// ═══════════════════════════════════════════════════════
// IRRIGATION PAGE
// ═══════════════════════════════════════════════════════

let irrFields = lsLoad(LS_IRR_FIELDS, [
  { id:1, name:'North Field A', crop:'Tomato',  area:300,  type:'Drip',      freq:2, waterAmt:150,  lastWatered:'2026-03-14', wateredToday:false },
  { id:2, name:'South Field B', crop:'Corn',    area:500,  type:'Sprinkler', freq:3, waterAmt:300,  lastWatered:'2026-03-13', wateredToday:false },
  { id:3, name:'Paddy Field',   crop:'Rice',    area:1000, type:'Flood',     freq:1, waterAmt:1200, lastWatered:'2026-03-15', wateredToday:true  },
  { id:4, name:'Back Lot',      crop:'Kamote',  area:400,  type:'Rain-fed',  freq:7, waterAmt:0,    lastWatered:'2026-03-10', wateredToday:false },
  { id:5, name:'Garden Plot',   crop:'Okra',    area:80,   type:'Manual',    freq:2, waterAmt:40,   lastWatered:'2026-03-14', wateredToday:false },
]);
let nextFieldId = lsLoad(LS_IRR_FID, 6);

const WATER_TIPS = [
  {
    icon: 'assets/ui/irrigation-morning.svg',
    tip: 'Water early morning (5–7 AM) to reduce evaporation and leaf disease.'
  },

  {
    icon: 'assets/ui/quick-water.svg',
    tip: 'Drip irrigation uses 30–50% less water than flood irrigation.'
  },

  {
    icon: 'assets/ui/irrigation-rain.svg',
    tip: 'Skip irrigation if 10mm+ rain is forecast in the next 24 hours.'
  },

  {
    icon: 'assets/ui/quick-soil-temp.svg',
    tip: 'Water more frequently during hot weather (above 32°C).'
  },

  {
    icon: 'assets/ui/stage-seedling.svg',
    tip: 'Mulching around crops reduces soil moisture loss by up to 70%.'
  },

  {
    icon: 'assets/ui/irrigation-soil-depth.svg',
    tip: 'Check soil moisture at 5–10cm depth before irrigating.'
  },

  {
    icon: 'assets/ui/irrigation-due.svg',
    tip: 'Avoid watering at midday — most water is lost to evaporation.'
  },
];

function renderIrrigationPage() {
  const today = new Date().toISOString().split('T')[0];

  // Stats
  const wateredToday = irrFields.filter(f => f.wateredToday).length;
  const dueToday = irrFields.filter(f => {
    if (f.wateredToday) return false;
    const last = new Date(f.lastWatered);
    const due  = new Date(last.getTime() + f.freq * 86400000);
    return due <= new Date();
  }).length;

  document.getElementById('irrTotalFields').textContent  = irrFields.length;
  document.getElementById('irrWateredToday').textContent = wateredToday;
  document.getElementById('irrDueToday').textContent     = dueToday;

  // Rain chance
  const rainChance = currentWeather ? (currentWeather.main.humidity > 80 ? '60%' : currentWeather.main.humidity > 60 ? '30%' : '10%') : '--%';
  document.getElementById('irrRainChance').textContent = rainChance;

  // Recommendation banner
  let recClass = 'ok';

  let recTitle =
    'Go ahead with watering';

  let recSub =
    'Current conditions are good for irrigation.';

  let recIcon =
    'assets/ui/watered.svg';


  if (currentWeather) {

    const h =
      currentWeather.main.humidity;

    const desc =
      currentWeather.weather[0]
        .description
        .toLowerCase();

    const isRain =
      desc.includes('rain');


    if (isRain) {

      recClass = 'warn';

      recTitle =
        'Skip irrigation today';

      recSub =
        'It is currently raining. Natural rainfall should be sufficient.';

      recIcon =
        'assets/ui/irrigation-rain.svg';

    } else if (h > 85) {

      recClass = 'warn';

      recTitle =
        'Reduce watering';

      recSub =
        `High humidity (${h}%) — over-watering risk. Water only crops that are visibly dry.`;

      recIcon =
        'assets/ui/at-risk.svg';

    } else if (
      currentWeather.main.temp > 33
    ) {

      recTitle =
        'Increase watering frequency';

      recSub =
        'High temperature detected. Water crops in early morning and late afternoon.';

      recIcon =
        'assets/ui/quick-soil-temp.svg';
    }
  }


  const recEl =
    document.getElementById(
      'irrRecommendation'
    );

  recEl.className =
    `irr-recommendation fade-in fade-in-1 ${recClass}`;

  document.getElementById(
    'irrRecTitle'
  ).textContent =
    recTitle;

  document.getElementById(
    'irrRecSub'
  ).textContent =
    recSub;


  const recIconEl =
    document.getElementById(
      'irrRecIcon'
    );

  if (recIconEl) {
    recIconEl.src =
      recIcon;
  }

  // Field list
  document.getElementById('irrFieldList').innerHTML = irrFields.map(f => {
    const last = new Date(f.lastWatered);
    const due  = new Date(last.getTime() + f.freq * 86400000);
    const isDue = due <= new Date() && !f.wateredToday;
    const daysAgo = Math.floor((new Date() - last) / 86400000);
    const totalL = f.waterAmt;

    const cropIconHtml =
      getCropIconHtml(
        f.crop,
        'ifi-crop-icon-img'
      );

    return `
      <div class="irr-field-item${f.wateredToday ? ' watered' : ''}${isDue ? ' due' : ''}">

        <div class="ifi-left">

          <div class="ifi-name">
            ${f.name}
          </div>

          <div class="ifi-meta">

            <span class="ifi-crop-icon">
              ${cropIconHtml}
            </span>

            <span>
              ${f.crop} · ${f.area} m² · ${f.type}
            </span>

          </div>

          <div class="ifi-status">

            ${
              f.wateredToday
                ? `
                  <span class="ifi-badge ok">
                    <img
                      src="assets/ui/watered.svg"
                      alt=""
                      class="ifi-badge-icon"
                    >
                    Watered Today
                  </span>
                `
                : isDue
                  ? `
                    <span class="ifi-badge warn">
                      <img
                        src="assets/ui/irrigation-due.svg"
                        alt=""
                        class="ifi-badge-icon"
                      >
                      Due for Watering
                    </span>
                  `
                  : `
                    <span class="ifi-badge">
                      ${
                        daysAgo === 0
                          ? 'Watered today'
                          : `${daysAgo}d ago`
                      }
                    </span>
                  `
            }

            <span class="ifi-freq">
              Every ${f.freq} day${f.freq > 1 ? 's' : ''}
            </span>

          </div>

        </div>


        <div class="ifi-right">

          ${
            f.type !== 'Rain-fed'
              ? `
                <div class="ifi-amount">
                  ${totalL}L
                </div>

                <div class="ifi-amt-lbl">
                  per session
                </div>
              `
              : `
                <div class="ifi-amount ifi-rain-fed-icon">
                  <img
                    src="assets/ui/irrigation-rain.svg"
                    alt=""
                    class="ifi-rain-fed-img"
                  >
                </div>

                <div class="ifi-amt-lbl">
                  rain-fed
                </div>
              `
          }

          <button
            class="ifi-btn${f.wateredToday ? ' done' : ''}"
            onclick="toggleFieldWater('${f.id}')"
          >
            ${f.wateredToday ? '✓ Done' : 'Water Now'}
          </button>

          <button
            class="ifi-del-btn"
            onclick="deleteField('${f.id}')"
          >
            <span
              class="material-symbols-outlined"
              style="font-size:15px"
            >
              delete
            </span>
          </button>

        </div>

      </div>
    `;

  }).join('');

  // Today's schedule
  const scheduled = irrFields
    .filter(f => {
      const last = new Date(f.lastWatered);
      const due  = new Date(last.getTime() + f.freq * 86400000);
      return due <= new Date() || f.wateredToday;
    })
    .sort((a,b) => a.wateredToday - b.wateredToday);

  const schedEl = document.getElementById('irrScheduleList');
  if (scheduled.length === 0) {
    schedEl.innerHTML = '<div style="color:var(--text-muted);padding:16px;font-size:.85rem;text-align:center">No irrigation scheduled for today.</div>';
  } else {
    schedEl.innerHTML = scheduled.map((f,i) => `
      <div class="irr-sched-item${f.wateredToday?' done':''}">
        <div class="isi-time">${['5:00 AM','6:00 AM','7:00 AM','8:00 AM','4:00 PM','5:00 PM'][i] || '—'}</div>
        <div class="isi-info">
          <div class="isi-name">${f.name}</div>
          <div class="isi-meta">${f.crop} · ${f.type}</div>
        </div>
        <div class="isi-check${f.wateredToday?' ok':''}">${f.wateredToday ? '✓' : '○'}</div>
      </div>
    `).join('');
  }

  // Weekly chart (simple bar chart)
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const usage = days.map(() => Math.floor(Math.random() * 2000 + 500));
  const maxUsage = Math.max(...usage);
  document.getElementById('waterChartWrap').innerHTML = `
    <div class="wc-chart">
      ${days.map((d,i) => `
        <div class="wc-bar-wrap">
          <div class="wc-val">${usage[i]}L</div>
          <div class="wc-bar"><div class="wc-fill" style="height:${Math.round((usage[i]/maxUsage)*100)}%"></div></div>
          <div class="wc-day">${d}</div>
        </div>
      `).join('')}
    </div>
    <div class="wc-total">Total this week: ${usage.reduce((a,b)=>a+b,0).toLocaleString()}L</div>
  `;

  // Tips
  document.getElementById(
    'waterTipsList'
  ).innerHTML =
    WATER_TIPS.map(t => `
      <div class="water-tip-item">

        <div class="wti-icon">
          <img
            src="${t.icon}"
            alt=""
            class="wti-icon-img"
          >
        </div>

        <div class="wti-text">
          ${t.tip}
        </div>

      </div>
    `).join('');
}

function toggleFieldWater(id) {
  const f = irrFields.find(f => f.id === id);
  if (!f) return;
  f.wateredToday = !f.wateredToday;
  if (f.wateredToday) f.lastWatered = new Date().toISOString().split('T')[0];
  lsSave(LS_IRR_FIELDS, irrFields);
  renderIrrigationPage();
    toast(
      `${f.name} marked as ${
        f.wateredToday
          ? 'watered'
          : 'not watered'
      }`,
      f.wateredToday
        ? 'ok'
        : 'warn'
    );
}

function deleteField(id) {
  const f = irrFields.find(f => f.id === id);
  if (!f || !confirm(`Delete "${f.name}" from irrigation?`)) return;
  irrFields = irrFields.filter(f => f.id !== id);
  lsSave(LS_IRR_FIELDS, irrFields);
  renderIrrigationPage();
  toast(`${f.name} deleted.`, 'warn');
}

function openAddFieldModal() {

  const irrigationType =
    document.getElementById(
      'fieldIrrType'
    );

  if (irrigationType) {

    irrigationType.value =
      appSettings.defaultIrrigationMethod ||
      'Manual';

  }


  const modal =
    document.getElementById(
      'addFieldModal'
    );

  if (modal) {
    modal.style.display =
      'flex';
  }

}


function closeAddFieldModal() {
  document.getElementById(
    'addFieldModal'
  ).style.display =
    'none';
}

function saveNewField() {
  const name     = document.getElementById('fieldName').value.trim();
  const crop     = document.getElementById('fieldCrop').value.trim();
  const area     = parseInt(document.getElementById('fieldArea').value);
  const type     = document.getElementById('fieldIrrType').value;
  const freq     = parseInt(document.getElementById('fieldFreq').value) || 2;
  const waterAmt = parseInt(document.getElementById('fieldWaterAmt').value) || 0;
  if (!name || !crop || !area) { toast('Please fill in required fields.', 'warn'); return; }
  irrFields.push({ id: nextFieldId++, name, crop, area, type, freq, waterAmt, lastWatered: new Date().toISOString().split('T')[0], wateredToday: false });
  lsSave(LS_IRR_FIELDS, irrFields); lsSave(LS_IRR_FID, nextFieldId);
  closeAddFieldModal();
  renderIrrigationPage();
    toast(
      `${name} added to irrigation!`,
      'ok'
    );
}

// ═══════════════════════════════════════════════════════
// SETTINGS SYSTEM — Full localStorage-backed control center
// ═══════════════════════════════════════════════════════

const LS_SETTINGS    = 'fc_settings';
const LS_NOTIFS      = 'fc_notifications';
const LS_NOTIF_ID    = 'fc_nextNotifId';
const LS_OFFICIAL_SEEN = 'fc_official_advisories_seen';
const DEFAULT_FARMER_AVATAR =
  'assets/ui/avatar-farmer-green.svg';

const LEGACY_FARMER_AVATARS = {
  '👨‍🌾':
    'assets/ui/avatar-farmer-green.svg',

  '👩‍🌾':
    'assets/ui/avatar-farmer-woman.svg',

  '🧑‍🌾':
    'assets/ui/avatar-farmer-young.svg',

  '👴':
    'assets/ui/avatar-farmer-senior-man.svg',

  '👵':
    'assets/ui/avatar-farmer-senior-woman.svg',

  '🌾':
    'assets/ui/avatar-farmer-green.svg'
};

// ── DEFAULT SETTINGS ──
const DEFAULT_SETTINGS = {

  // Profile
  name: 'Juan Dela Cruz',
  email: '',
  farmName: 'Bulacan Farm',
  farmSize: '3.2',
  role: 'owner',
  phone: '',
  avatar: DEFAULT_FARMER_AVATAR,

  // Location
  city: 'San Miguel, Bulacan',
  lat: '14.99',
  lon: '120.93',
  defaultPage: 'dashboard',

  // Notifications
  rainAlert: true,
  windAlert: true,
  dailyBriefing: true,
  briefingTime: '05:00',
  quietHours: true,
  quietFrom: '21:00',
  quietUntil: '06:00',
  harvestReminderDays: 7,
  thresholdTemp: 35,

  // Crops / farm preferences
  favCrops: ['Rice','Corn','Tomato'],
  calView: 'calendar',
  defaultIrrigationMethod: 'Manual',

  // Display
  theme: 'dark',
  tempUnit: 'C',
  windUnit: 'kph',
  fontSize: 'medium',

  // System
  lastExport: null,

};

let appSettings = lsLoad(LS_SETTINGS, DEFAULT_SETTINGS);
// Merge defaults for any missing keys (for upgrades)
appSettings = Object.assign({}, DEFAULT_SETTINGS, appSettings);

// Upgrade old emoji avatars to local SVG avatars.
if (
  LEGACY_FARMER_AVATARS[
    appSettings.avatar
  ]
) {

  appSettings.avatar =
    LEGACY_FARMER_AVATARS[
      appSettings.avatar
    ];

  lsSave(
    LS_SETTINGS,
    appSettings
  );

}

// Remove deprecated weather-driven pest settings.
if (
  'pestNotif' in appSettings ||
  'pestSensitivity' in appSettings
) {

  delete appSettings.pestNotif;
  delete appSettings.pestSensitivity;

  lsSave(
    LS_SETTINGS,
    appSettings
  );

}

// Remove deprecated non-functional
// language preference from older settings.
if (
  'language' in appSettings
) {

  delete appSettings.language;

  lsSave(
    LS_SETTINGS,
    appSettings
  );

}


// ── TEMPERATURE & WIND CONVERSION UTILITIES ──
function displayTemp(celsius) {
  if (appSettings.tempUnit === 'F') {
    const f = (celsius * 9/5) + 32;
    return Math.round(f) + '°F';
  }
  return Math.round(celsius) + '°C';
}
function displayTempRaw(celsius) {
  if (appSettings.tempUnit === 'F') return Math.round((celsius * 9/5) + 32);
  return Math.round(celsius);
}
function tempUnitLabel() { return appSettings.tempUnit === 'F' ? '°F' : '°C'; }

function displayWind(ms) {
  const kph = ms * 3.6;
  if (appSettings.windUnit === 'mph') return (kph * 0.621371).toFixed(1) + ' mph';
  return kph.toFixed(1) + ' kph';
}
function windUnitLabel() { return appSettings.windUnit === 'mph' ? 'mph' : 'kph'; }

// ── PATCH displayWeatherData to use unit converters ──
const _origDisplayWeatherData = displayWeatherData;
displayWeatherData = function(data) {
  currentWeather = data;
  const tempC     = data.main.temp;
  const feelsC    = data.main.feels_like;
  const humidity  = data.main.humidity;
  const cloud     = data.clouds.all;
  const vis       = data.visibility ? (data.visibility/1000).toFixed(1) : '--';
  const desc      = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
  const icon      = getWeatherEmoji(data.weather[0].icon, data.weather[0].description);

  document.getElementById('heroLocation').textContent = `${data.sys.country} · Lat ${data.coord.lat.toFixed(2)}, Lon ${data.coord.lon.toFixed(2)}`;
  document.getElementById('heroCity').textContent     = `${data.name}, ${data.sys.country}`;
  document.getElementById('heroDate').textContent     = new Date().toLocaleDateString('en-PH', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  // Animated weather scene instead of static emoji
  renderAnimatedWeather(data.weather[0].icon, data.weather[0].description);
  document.getElementById('heroTemp').innerHTML       = `${displayTempRaw(tempC)}<sup>${tempUnitLabel()}</sup>`;
  document.getElementById('heroDesc').textContent     = desc;
  document.getElementById('heroFeels').textContent    = `Feels like ${displayTemp(feelsC)}`;
  document.getElementById('statHumidity').textContent = `${humidity}%`;
  document.getElementById('statWind').textContent     = displayWind(data.wind.speed);
  document.getElementById('statCloud').textContent    = `${cloud}%`;
  document.getElementById('statVis').textContent      = `${vis} km`;

  const cond   = assessFarmCondition(data);
  const banner = document.getElementById('farmCondBanner');
  banner.className = `farm-condition${cond.type==='warn'?' warn':cond.type==='danger'?' danger':''}`;
  banner.querySelector('.condition-dot').className = `condition-dot${cond.type==='warn'?' warn':cond.type==='danger'?' danger':''}`;
  document.getElementById('farmCondText').innerHTML = cond.text;

  const waterNeed = humidity < 40 ? 'High' : humidity < 65 ? 'Moderate' : 'Low';
  document.getElementById('waterNeed').textContent  = waterNeed;
  document.getElementById('waterNeed').className    = `qs-value ${humidity<40?'qs-red':humidity<65?'qs-amber':'qs-blue'}`;
  const soilC = tempC - 3 + Math.random()*2;
  document.getElementById('soilTemp').textContent   = displayTemp(soilC);

  // Fix Active Crops quick stat
  const activeCropsEl = document.getElementById('qsActiveCrops');
  if (activeCropsEl && typeof myCrops !== 'undefined') {
    activeCropsEl.textContent = myCrops.length;
    const readyCount = myCrops.filter(c => {
      const s = getCropStatus(c);
      return s.label === 'Ready' || s.label === 'Overdue';
    }).length;
    const subEl = activeCropsEl.nextElementSibling;
    if (subEl) subEl.textContent = `${readyCount} ready to harvest`;
  }

  const isDay = Date.now()/1000 > data.sys.sunrise && Date.now()/1000 < data.sys.sunset;
  const uv = isDay ? Math.max(0, Math.round(10 - cloud/12)) : 0;
  document.getElementById('uvIndex').textContent = uv;
  document.getElementById('uvLabel').textContent = uv<=2?'Low':uv<=5?'Moderate':uv<=7?'High':'Very High';

  renderPestAlerts();

  // ── REAL-TIME NOTIFICATION CHECKS ──
  checkWeatherAlerts(
    data
  );

  checkDailyWeatherBriefing(
    data
  );


  toast(
    `Weather updated for ${data.name}`,
    'ok'
  );
};

// ── PATCH renderForecastAndCalendar for unit conversion ──
const _origRenderForecast = renderForecastAndCalendar;
renderForecastAndCalendar = function(forecastData, currentData) {

  lastPlantingForecastData = forecastData;
  lastPlantingCurrentData = currentData;

  const timezone = currentData.timezone;
  const daily = {};
  forecastData.list.forEach(item => {
    const d = new Date((item.dt + timezone) * 1000);
    const key = d.toISOString().split('T')[0];
    if (!daily[key]) daily[key] = { temps:[], icons:[], humidity:[], wind:[], dt: item.dt };
    daily[key].temps.push(item.main.temp);
    daily[key].icons.push(item.weather[0].icon);
    daily[key].humidity.push(item.main.humidity);
    daily[key].wind.push(item.wind.speed);
  });

  const days = Object.entries(daily).slice(0,7);
  const today = new Date().toLocaleDateString('en-PH', { weekday:'short' });
  const daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  document.getElementById('forecastStrip').innerHTML = days.map(([key,val],i) => {
    const date    = new Date(key);
    const dayName = daysOfWeek[date.getDay()];
    const avgC    = val.temps.reduce((a,b)=>a+b,0)/val.temps.length;
    const minC    = Math.min(...val.temps);
    const icon    = getWeatherEmoji(val.icons[Math.floor(val.icons.length/2)]);
    return `<div class="fc-day${i===0?' active':''}" onclick="document.querySelectorAll('.fc-day').forEach(d=>d.classList.remove('active'));this.classList.add('active')">
      <div class="fc-day-name">${dayName}</div>
      <div class="fc-icon">${getMiniWeatherScene(val.icons[Math.floor(val.icons.length/2)])}</div>
      <div class="fc-temp-high">${displayTempRaw(avgC)}°</div>
      <div class="fc-temp-low">${displayTempRaw(minC)}°</div>
    </div>`;
  }).join('');

  const calRow =
  document.getElementById('calendarRow');

  const monthNames =
    ['Jan','Feb','Mar','Apr','May','Jun',
     'Jul','Aug','Sep','Oct','Nov','Dec'];

  const filteredCrops =
    getFilteredPlantingCrops();

  updatePlantingCropCount(
    filteredCrops.length
  );

  calRow.innerHTML = days.map(([key,val],i) => {
    const date      = new Date(key + 'T00:00:00');
    const dayNum    = date.getDate();
    const label     = `${monthNames[date.getMonth()]} ${dayNum}` + (date.toLocaleDateString('en-PH',{weekday:'short'})===today?' (Today)':'');
    const avgC      = val.temps.reduce((a,b)=>a+b,0)/val.temps.length;
    const avgWind   = val.wind.reduce((a,b)=>a+b,0)/val.wind.length * 3.6;
    const isRaining = val.icons.some(ic=>ic.startsWith('09')||ic.startsWith('10'));
    const weatherIcon = getWeatherEmoji(val.icons[Math.floor(val.icons.length/2)]);
    
    const displayedCrops =
      pickStablePlantingCrops(
        filteredCrops,
        key,
        2
      );

    const cropsHtml = displayedCrops.length
      ? displayedCrops.map(crop => {

        const assess = 
          assessCrop(crop, avgC, avgWind, isRaining);

        return `
        <div
          class="crop-card ${assess.status}"
          onclick="openPlantingCropDetails(
            decodeURIComponent('${encodeURIComponent(crop.name)}'),
            '${assess.status}',
            decodeURIComponent('${encodeURIComponent(assess.reason)}')
          )"
        >

          <div class="crop-top">
          <div class="crop-icon">
            <img
              src="${crop.icon}"
              alt="${crop.name}"
              class="crop-icon-img"
            >
          </div>

          <div class="crop-name">
            ${crop.name}
          </div>
        </div>

        <div class="crop-badge badge-${assess.status}">${assess.status.toUpperCase()}</div>
        <div class="crop-reason">${assess.reason}</div>
      </div>`;
      }).join('')
      : `
        <div class="crop-filter-empty">
          No crops match your search.
        </div>
      `;


    return `<div class="cal-day">
      <div class="cal-date${i===0?' today':''}">
        <div class="cal-date-num">${dayNum}</div><div>${label}</div>
      </div>
      <div class="cal-weather-icon">${getMiniWeatherScene(val.icons[Math.floor(val.icons.length/2)])}</div>
      <div class="cal-crops">${cropsHtml}</div>
    </div>`;
  }).join('');
};

// ── APPLY SETTINGS ON LOAD ──
function applyAllSettings() {
  applyTheme(appSettings.theme);
  applyFontSize(appSettings.fontSize);
  updateSidebarProfile();
  updateSettingsFormValues();
  checkHarvestReminders();
}

function updateFarmerAvatarUI() {

  const avatarPath =
    appSettings.avatar ||
    DEFAULT_FARMER_AVATAR;


  const profileAvatar =
    document.getElementById(
      'profileAvatarImg'
    );

  if (profileAvatar) {
    profileAvatar.src =
      avatarPath;
  }


  const sidebarAvatar =
    document.getElementById(
      'sidebarUserAvatar'
    );

  if (sidebarAvatar) {
    sidebarAvatar.src =
      avatarPath;
  }


  document
    .querySelectorAll(
      '#avatarPicker .avatar-option'
    )
    .forEach(option => {

      option.classList.toggle(
        'active',
        option.dataset.avatar ===
          avatarPath
      );

    });

}

function getFarmRoleLabel(
  role
) {

  const labels = {
    owner:
      'Farm Owner',

    worker:
      'Farm Worker',

    tech:
      'Agricultural Technician',

    researcher:
      'Researcher / Student'
  };


  return (
    labels[role] ||
    'Farm User'
  );

}


function updateSettingsProfileSummary() {

  const nameEl =
    document.getElementById(
      'profileSummaryName'
    );

  const metaEl =
    document.getElementById(
      'profileSummaryMeta'
    );

  const contactEl =
    document.getElementById(
      'profileSummaryContact'
    );


  if (nameEl) {

    nameEl.textContent =
      appSettings.name ||
      'FarmCast User';

  }


  if (metaEl) {

    const role =
      getFarmRoleLabel(
        appSettings.role
      );

    const farm =
      appSettings.farmName ||
      'Unnamed Farm';

    const size =
      appSettings.farmSize
        ? ` · ${appSettings.farmSize} ha`
        : '';


    metaEl.textContent =
      `${role} · ${farm}${size}`;

  }


  if (contactEl) {

    const contact =
      [
        appSettings.email,
        appSettings.phone
      ]
        .filter(Boolean)
        .join(' · ');


    contactEl.textContent =
      contact ||
      'Contact details not set';

  }

}

function updateSidebarProfile() {

  const nameEl =
    document.getElementById(
      'sidebarUserName'
    );

  const farmEl =
    document.getElementById(
      'sidebarUserFarm'
    );


  if (nameEl) {
    nameEl.textContent =
      appSettings.name;
  }

  if (farmEl) {
    farmEl.textContent =
      `${appSettings.farmName} · ${appSettings.farmSize} ha`;
  }


  updateFarmerAvatarUI();
  updateSettingsProfileSummary(); 

}

function saveSettingImmediate(
  key,
  value
) {

  appSettings[key] =
    value;


  lsSave(
    LS_SETTINGS,
    appSettings
  );


  if (
    key ===
    'quietHours'
  ) {

    updateQuietHoursUI();

  }


  if (
    key ===
    'dailyBriefing'
  ) {

    updateDailyBriefingUI();

  }

}

function updateQuietHoursUI() {

  const enabled =
    Boolean(
      appSettings.quietHours
    );


  const timeGrid =
    document.getElementById(
      'quietHoursTimeGrid'
    );


  const quietFrom =
    document.getElementById(
      'quietFrom'
    );


  const quietUntil =
    document.getElementById(
      'quietUntil'
    );


  if (quietFrom) {

    quietFrom.disabled =
      !enabled;

  }


  if (quietUntil) {

    quietUntil.disabled =
      !enabled;

  }


  if (timeGrid) {

    timeGrid.classList.toggle(
      'is-disabled',
      !enabled
    );

  }

}

function updateDailyBriefingUI() {

  const enabled =
    Boolean(
      appSettings.dailyBriefing
    );


  const timeRow =
    document.getElementById(
      'dailyBriefingTimeRow'
    );


  const briefingTime =
    document.getElementById(
      'settingBriefingTime'
    );


  if (briefingTime) {

    briefingTime.disabled =
      !enabled;

  }


  if (timeRow) {

    timeRow.classList.toggle(
      'is-disabled',
      !enabled
    );

  }

}

// ═══ SETTINGS NAVIGATION ═══
function showSettingsSection(el, sectionId) {
  document.querySelectorAll('.settings-nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.settings-section').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  document.getElementById(sectionId).classList.add('active');
}

// ═══ PROFILE SETTINGS ═══
function setAvatar(
  avatarPath
) {

  /*
   * Avatar selection is only a preview.
   *
   * The actual User profile is persisted
   * when Save Profile is pressed.
   */
  appSettings.avatar =
    avatarPath;


  updateFarmerAvatarUI();


  toast(
    'Avatar selected. Click Save Profile to save it.',
    'ok'
  );

}

function saveProfileSettings() {
  appSettings.name     = document.getElementById('settingName').value.trim() || appSettings.name;
  appSettings.email    = document.getElementById('settingEmail').value.trim();
  appSettings.farmName = document.getElementById('settingFarmName').value.trim() || appSettings.farmName;
  appSettings.role     = document.getElementById('settingRole').value;
  appSettings.farmSize = document.getElementById('settingFarmSize').value || appSettings.farmSize;
  appSettings.phone    = document.getElementById('settingPhone').value.trim();
  lsSave(LS_SETTINGS, appSettings);
  updateSidebarProfile();
  toast(
    'Profile saved successfully!',
    'ok'
  );

  addNotification(
    'system',
    'Profile Updated',
    `Your profile (${appSettings.name}) has been saved.`
  );
}

function confirmSignOut() {

  if (
    !confirm(
      'Sign out of FarmCast? Your local data will be preserved.'
    )
  ) {
    return;
  }


  /*
   * Use the centralized auth logout so
   * every sign-out path clears the same
   * session keys.
   */
  if (
    typeof fcAuth !==
      'undefined' &&
    typeof fcAuth.logout ===
      'function'
  ) {

    fcAuth.logout();

    return;

  }


  /*
   * Safe fallback if the API helper is
   * unavailable for some reason.
   */
  localStorage.removeItem(
    'fc_token'
  );

  localStorage.removeItem(
    'fc_authUser'
  );

  localStorage.removeItem(
    'fc_user'
  );


  window.location.href =
    'login.html';

}

// ═══ LOCATION SETTINGS ═══
async function applyLocationFromSearch() {

  const input =
    document.getElementById(
      'settingLocationSearch'
    );


  const status =
    document.getElementById(
      'locationStatus'
    );


  const val =
    input?.value
      .trim();


  if (!val) {

    toast(
      'Please enter a location.',
      'warn'
    );

    return;

  }


  if (status) {

    status.className =
      'location-status';

    status.innerHTML = `
      <span
        class="material-symbols-outlined"
        style="animation:spin .7s linear infinite"
      >
        refresh
      </span>

      Checking farm location…
    `;

  }


  try {

    /*
     * Verify the location only.
     *
     * Do NOT call fetchWeather() here
     * because that function changes the
     * active Dashboard weather location.
     */
    const response =
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          encodeURIComponent(
            val
          )
        }&units=metric&appid=${API_KEY}`
      );


    if (!response.ok) {

      throw new Error(
        'Location not found.'
      );

    }


    const weatherData =
      await response.json();


    const lat =
      weatherData.coord.lat
        .toFixed(4);


    const lon =
      weatherData.coord.lon
        .toFixed(4);


    const latInput =
      document.getElementById(
        'settingLat'
      );


    const lonInput =
      document.getElementById(
        'settingLon'
      );


    if (latInput) {
      latInput.value =
        lat;
    }


    if (lonInput) {
      lonInput.value =
        lon;
    }


    /*
     * Keep the canonical location name
     * returned by the weather service
     * in the form only.
     *
     * appSettings and localStorage are
     * intentionally untouched until
     * Save Location is pressed.
     */
    if (
      input &&
      weatherData.name
    ) {

      input.value =
        weatherData.name;

    }


    if (status) {

      status.className =
        'location-status ok';

      status.innerHTML = `
        <span class="material-symbols-outlined">
          check_circle
        </span>

        Location verified. Click
        <strong>Save Location</strong>
        to use it as your farm location.
      `;

    }


    toast(
      'Location verified. Click Save Location to save it.',
      'ok'
    );


  } catch (error) {

    console.warn(
      'Location verification failed:',
      error
    );


    if (status) {

      status.className =
        'location-status error';

      status.innerHTML = `
        <span class="material-symbols-outlined">
          error
        </span>

        Location not found. Check the city or municipality name.
      `;

    }


    toast(
      'Could not verify that location.',
      'err'
    );

  }

}

function getGPSLocation() {

  if (
    !navigator.geolocation
  ) {

    toast(
      'Geolocation is not supported by your browser.',
      'err'
    );

    return;

  }


  const status =
    document.getElementById(
      'locationStatus'
    );


  if (status) {

    status.className =
      'location-status';

    status.innerHTML = `
      <span
        class="material-symbols-outlined"
        style="animation:spin .7s linear infinite"
      >
        refresh
      </span>

      Getting GPS location…
    `;

  }


  navigator.geolocation.getCurrentPosition(

    async position => {

      const lat =
        position.coords.latitude
          .toFixed(4);


      const lon =
        position.coords.longitude
          .toFixed(4);


      const latInput =
        document.getElementById(
          'settingLat'
        );


      const lonInput =
        document.getElementById(
          'settingLon'
        );


      const searchInput =
        document.getElementById(
          'settingLocationSearch'
        );


      /*
       * Preview the detected coordinates
       * in the form only.
       *
       * Nothing is persisted yet.
       */
      if (latInput) {
        latInput.value =
          lat;
      }


      if (lonInput) {
        lonInput.value =
          lon;
      }


      try {

        /*
         * Use OpenWeather only to identify
         * the city associated with these
         * coordinates.
         */
        const response =
          await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${
              encodeURIComponent(
                lat
              )
            }&lon=${
              encodeURIComponent(
                lon
              )
            }&units=metric&appid=${API_KEY}`
          );


        if (!response.ok) {

          throw new Error(
            'Unable to identify GPS location.'
          );

        }


        const data =
          await response.json();


        const cityName =
          String(
            data.name ||
            ''
          )
            .trim();


        if (!cityName) {

          throw new Error(
            'GPS location has no city name.'
          );

        }


        if (searchInput) {

          searchInput.value =
            cityName;

        }


        if (status) {

          status.className =
            'location-status ok';

          status.innerHTML = `
            <span class="material-symbols-outlined">
              my_location
            </span>

            GPS detected
            <strong>${cityName}</strong>.
            Click
            <strong>Save Location</strong>
            to use it.
          `;

        }


        toast(
          `GPS location found: ${cityName}. Click Save Location to save it.`,
          'ok'
        );


      } catch (error) {

        console.warn(
          'GPS city lookup failed:',
          error
        );


        /*
         * Coordinates can still be shown,
         * but do not claim that the farm
         * location has been saved.
         */
        if (status) {

          status.className =
            'location-status error';

          status.innerHTML = `
            <span class="material-symbols-outlined">
              warning
            </span>

            GPS coordinates were detected,
            but the city could not be identified.
            Search for your city before saving.
          `;

        }


        toast(
          'GPS coordinates found, but the city could not be identified.',
          'warn'
        );

      }

    },


    error => {

      if (status) {

        status.className =
          'location-status error';

        status.innerHTML = `
          <span class="material-symbols-outlined">
            error
          </span>

          GPS error: ${error.message}
        `;

      }


      toast(
        'Could not get GPS location.',
        'err'
      );

    }

  );

}

function saveLocationSettings() {
  appSettings.lat = document.getElementById('settingLat').value;
  appSettings.lon = document.getElementById('settingLon').value;
  lsSave(LS_SETTINGS, appSettings);
  toast('Location settings saved!', 'ok');
}


function saveThresholdSettings() {

  const tempInput =
    document.getElementById(
      'thresholdTemp'
    );


  const enteredTemp =
    parseFloat(
      tempInput?.value
    );


  if (
    Number.isFinite(
      enteredTemp
    )
  ) {

    /*
     * Keep the saved threshold
     * internally in Celsius.
     */
    appSettings.thresholdTemp =
      appSettings.tempUnit === 'F'
        ? (
            (
              enteredTemp -
              32
            ) *
            5 /
            9
          )
        : enteredTemp;

  }


  appSettings.harvestReminderDays =
    parseInt(
      document.getElementById(
        'harvestReminderDays'
      ).value
    ) ||
    7;


  lsSave(
    LS_SETTINGS,
    appSettings
  );


  toast(
    'Alert thresholds saved!',
    'ok'
  );


  addNotification(
    'system',
    'Settings Updated',
    'Weather alert thresholds have been saved.'
  );

}

// ═══ CROP PREFERENCES ═══

function sortCropsByFavoritePreference(
  crops
) {

  const favoriteCrops =
    Array.isArray(
      appSettings.favCrops
    )
      ? appSettings.favCrops
      : [];


  const favoriteOrder =
    new Map(
      favoriteCrops.map(
        (cropName, index) => [
          cropName,
          index
        ]
      )
    );


  return [
    ...crops
  ].sort(
    (a, b) => {

      const aFavorite =
        favoriteOrder.has(
          a.name
        );

      const bFavorite =
        favoriteOrder.has(
          b.name
        );


      if (
        aFavorite &&
        !bFavorite
      ) {
        return -1;
      }


      if (
        !aFavorite &&
        bFavorite
      ) {
        return 1;
      }


      if (
        aFavorite &&
        bFavorite
      ) {

        return (
          favoriteOrder.get(
            a.name
          ) -
          favoriteOrder.get(
            b.name
          )
        );

      }


      return a.name.localeCompare(
        b.name
      );

    }
  );

}

function renderFavCropsGrid() {

  const el =
    document.getElementById(
      'favCropsGrid'
    );

  if (!el) return;


  const crops =
    getMyCropPickerDataset();


  el.innerHTML =
    crops.map(crop => `

      <div
        class="fav-crop-item${
          appSettings.favCrops.includes(
            crop.name
          )
            ? ' selected'
            : ''
        }"
        onclick="toggleFavCrop(
          this,
          decodeURIComponent(
            '${encodeURIComponent(crop.name)}'
          )
        )"
      >

        ${getCropIconHtml(
          crop.name,
          'fav-crop-icon-img'
        )}

        <span>
          ${escapeHtml(crop.name)}
        </span>

      </div>

    `).join('');
}

function toggleFavCrop(el, crop) {
  el.classList.toggle('selected');
  if (appSettings.favCrops.includes(crop)) {
    appSettings.favCrops = appSettings.favCrops.filter(c => c !== crop);
  } else {
    appSettings.favCrops.push(crop);
  }
}

function saveFavCrops() {

  lsSave(
    LS_SETTINGS,
    appSettings
  );


  populateMyCropsCropSelect();
  renderMyCropPicker();


  toast(
    'Favorite crop preferences saved!',
    'ok'
  );

}

function setCalView(
  el,
  view
) {

  document
    .querySelectorAll(
      '#calViewSelector .sens-btn'
    )
    .forEach(button =>
      button.classList.remove(
        'active'
      )
    );


  el.classList.add(
    'active'
  );


  saveSettingImmediate(
    'calView',
    view
  );


  renderCalList();

  applyCalendarView();


  toast(
    `Planting Calendar view set to ${
      view === 'list'
        ? 'List'
        : 'Calendar'
    }`,
    'ok'
  );

}

// ═══ DISPLAY SETTINGS ═══
function setTheme(el, theme) {
  document.querySelectorAll('.theme-opt').forEach(b => b.classList.remove('active'));
  el.classList.add('active');

  saveSettingImmediate(
    'theme',
    theme
  );

  applyTheme(
    theme
  );

  toast(
    `${
      theme === 'dark'
        ? 'Dark'
        : 'Light'
    } mode activated!`,
    'ok'
  );
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'light') {
    root.style.setProperty('--bg',  '#f4f6f9');
    root.style.setProperty('--bg2', '#ffffff');
    root.style.setProperty('--bg3', '#eef1f5');
    root.style.setProperty('--text','#1a1f2e');
    root.style.setProperty('--text-muted','#5a6478');
    root.style.setProperty('--text-dim','#9aa0b0');
    root.style.setProperty('--border','rgba(0,0,0,0.08)');
    root.style.setProperty('--border2','rgba(0,0,0,0.14)');
  } else {
    root.style.setProperty('--bg',  '#0d1117');
    root.style.setProperty('--bg2', '#161b22');
    root.style.setProperty('--bg3', '#1c2333');
    root.style.setProperty('--text','#e6edf3');
    root.style.setProperty('--text-muted','#7d8590');
    root.style.setProperty('--text-dim','#484f58');
    root.style.setProperty('--border','rgba(255,255,255,0.07)');
    root.style.setProperty('--border2','rgba(255,255,255,0.12)');
  }
}

function setTempUnit(
  el,
  unit
) {

  document
    .querySelectorAll(
      '#tempUnitSelector .unit-btn'
    )
    .forEach(button =>
      button.classList.remove(
        'active'
      )
    );


  el.classList.add(
    'active'
  );


  saveSettingImmediate(
    'tempUnit',
    unit
  );


  const thresholdInput =
    document.getElementById(
      'thresholdTemp'
    );

  const thresholdLabel =
    document.getElementById(
      'thresholdTempUnit'
    );


  if (thresholdLabel) {

    thresholdLabel.textContent =
      unit === 'F'
        ? '°F'
        : '°C';

  }


  if (thresholdInput) {

    const thresholdC =
      Number(
        appSettings.thresholdTemp
      );


    if (unit === 'F') {

      thresholdInput.value =
        Math.round(
          (
            thresholdC *
            9 /
            5
          ) +
          32
        );

      thresholdInput.min =
        '68';

      thresholdInput.max =
        '113';

    } else {

      thresholdInput.value =
        Math.round(
          thresholdC *
          10
        ) /
        10;

      thresholdInput.min =
        '20';

      thresholdInput.max =
        '45';

    }

  }


  if (currentWeather) {

    displayWeatherData(
      currentWeather
    );

  }


  /*
   * Refresh the cached 7-day forecast
   * and Smart Planting Calendar too,
   * so °C / °F changes appear
   * immediately without another API call.
   */
  if (
    lastPlantingForecastData &&
    lastPlantingCurrentData
  ) {

    renderForecastAndCalendar(
      lastPlantingForecastData,
      lastPlantingCurrentData
    );

  }

  refreshMapWeatherUnits();

  toast(
    `Temperature unit set to ${
      unit === 'F'
        ? '°F Fahrenheit'
        : '°C Celsius'
    }`,
    'ok'
  );

}

function setWindUnit(
  el,
  unit
) {

  document
    .querySelectorAll(
      '#windUnitSelector .unit-btn'
    )
    .forEach(button =>
      button.classList.remove(
        'active'
      )
    );


  el.classList.add(
    'active'
  );


  saveSettingImmediate(
    'windUnit',
    unit
  );


  if (currentWeather) {

    displayWeatherData(
      currentWeather
    );

  }


  refreshMapWeatherUnits();


  if (
    currentMapLayerName ===
    'wind_new'
  ) {

    renderMapLegend(
      'wind_new'
    );

  }


  toast(
    `Wind unit set to ${
      unit === 'mph'
        ? 'mph'
        : 'km/h'
    }`,
    'ok'
  );

}

function setFontSize(
  el,
  size
) {

  document
    .querySelectorAll(
      '#fontSizeSelector .sens-btn'
    )
    .forEach(
      button =>
        button.classList.remove(
          'active'
        )
    );


  el.classList.add(
    'active'
  );


  saveSettingImmediate(
    'fontSize',
    size
  );


  applyFontSize(
    size
  );


  toast(
    `Font size set to ${size}`,
    'ok'
  );

}

function applyFontSize(
  size
) {

  /*
   * Most FarmCast text uses rem units,
   * so the root font size must change.
   *
   * Medium keeps the current interface
   * at its normal 16px rem baseline.
   */
  const rootSizes = {
    small: '15px',
    medium: '16px',
    large: '18px'
  };


  const rootSize =
    rootSizes[size] ||
    rootSizes.medium;


  document.documentElement
    .style.fontSize =
      rootSize;


  /*
   * Keep normal inherited body text
   * proportional to the selected size.
   *
   * Medium:
   * 16px × 0.875 = 14px
   */
  document.body
    .style.fontSize =
      '0.875rem';

}

function openFarmCastBugReport() {

  window.open(
    'https://github.com/Kyross101/farmcast/issues/new',
    '_blank',
    'noopener,noreferrer'
  );

}


function openFarmCastRepository() {

  window.open(
    'https://github.com/Kyross101/farmcast',
    '_blank',
    'noopener,noreferrer'
  );

}


function showFarmCastAbout() {

  toast(
    'FarmCast v1.0.0 — Smart Agriculture Management and Decision Support System',
    'ok'
  );

}

// ═══ DATA EXPORT ═══

async function getBackupScannerHistory() {

  /*
   * Scanner history is loaded only when
   * the scanner page is opened.
   *
   * For a true backup, try the backend
   * directly even if that page has not
   * been visited during this session.
   */
  try {

    if (
      typeof fcScanHistory !==
        'undefined' &&
      typeof fcScanHistory.getAll ===
        'function'
    ) {

      const syncedHistory =
        await fcScanHistory.getAll();


      if (
        Array.isArray(
          syncedHistory
        )
      ) {

        return syncedHistory;

      }

    }

  } catch (error) {

    console.warn(
      'Scanner history backup is using local fallback:',
      error
    );

  }


  try {

    const localHistory =
      JSON.parse(
        localStorage.getItem(
          'fc_scanHistory'
        ) ||
        '[]'
      );


    return Array.isArray(
      localHistory
    )
      ? localHistory
      : [];

  } catch {

    return [];

  }

}


function cleanBackupRecord(
  record
) {

  if (
    !record ||
    typeof record !==
      'object'
  ) {

    return record;

  }


  /*
   * Remove MongoDB/account metadata.
   *
   * These values are server-specific
   * and must never be required when
   * restoring the backup later.
   */
  const {
    _id,
    user,
    __v,
    ...portableRecord
  } = record;


  return portableRecord;

}


function cleanBackupCollection(
  collection
) {

  if (
    !Array.isArray(
      collection
    )
  ) {

    return [];

  }


  return collection.map(
    cleanBackupRecord
  );

}

function cleanBackupSettings(
  settings
) {

  const source =
    settings &&
    typeof settings ===
      'object'
      ? settings
      : {};


  const portableSettings =
    {};


  /*
   * Only export settings that are
   * officially supported by the
   * current FarmCast version.
   *
   * This automatically excludes:
   * - MongoDB _id / user / __v
   * - createdAt / updatedAt
   * - deprecated settings
   * - unexpected backend fields
   */
  Object
    .keys(
      DEFAULT_SETTINGS
    )
    .forEach(key => {

      portableSettings[key] =
        source[key] !==
        undefined
          ? source[key]
          : DEFAULT_SETTINGS[key];

    });


  return portableSettings;

}

let pendingFarmCastBackup =
  null;


function isPlainBackupObject(
  value
) {

  return (
    value !== null &&
    typeof value ===
      'object' &&
    !Array.isArray(
      value
    )
  );

}


function hasOnlyAllowedBackupKeys(
  object,
  allowedKeys
) {

  return Object
    .keys(
      object
    )
    .every(
      key =>
        allowedKeys.includes(
          key
        )
    );

}

function isBackupText(
  value
) {

  return (
    typeof value ===
      'string' &&
    value.trim()
      .length > 0
  );

}


function isBackupDate(
  value
) {

  return (
    isBackupText(
      value
    ) &&
    !Number.isNaN(
      Date.parse(
        value
      )
    )
  );

}


function isBackupNumber(
  value,
  minimum = null
) {

  const number =
    Number(
      value
    );


  if (
    !Number.isFinite(
      number
    )
  ) {
    return false;
  }


  if (
    minimum !== null &&
    number < minimum
  ) {
    return false;
  }


  return true;

}

function isBackupTime(
  value
) {

  return (
    typeof value ===
      'string' &&
    /^(?:[01]\d|2[0-3]):[0-5]\d$/
      .test(
        value
      )
  );

}

function validateFarmCastBackupRecords(
  backup,
  errors
) {

  const data =
    backup.data;


  const plantingMethods =
    new Set([
      'direct-seeded',
      'transplanted',
      'cloves',
      'cuttings'
    ]);


  const cropStages =
    new Set([
      'seedling',
      'vegetative',
      'flowering',
      'fruiting',
      'ready'
    ]);


  const harvestQualities =
    new Set([
      'excellent',
      'good',
      'poor'
    ]);


  const pestSeverities =
    new Set([
      'low',
      'medium',
      'high'
    ]);


  const scanSeverities =
    new Set([
      'none',
      'low',
      'medium',
      'high',
      'unknown'
    ]);


  const notificationTypes =
    new Set([
      'weather',
      'official',
      'pest',
      'plant-health',
      'harvest',
      'system'
    ]);


  const taskPriorities =
    new Set([
      'low',
      'med',
      'high'
    ]);


  /*
   * CROPS
   */
  if (
    Array.isArray(
      data.crops
    )
  ) {

    data.crops.forEach(
      (crop, index) => {

        const label =
          `crops[${index}]`;


        if (
          !isBackupText(
            crop.type
          )
        ) {

          errors.push(
            `${label} has no valid crop type.`
          );

        }


        if (
          !plantingMethods.has(
            crop.plantingMethod
          )
        ) {

          errors.push(
            `${label} has an invalid planting method.`
          );

        }


        if (
          !isBackupNumber(
            crop.area,
            0.000001
          )
        ) {

          errors.push(
            `${label} has an invalid area.`
          );

        }


        if (
          !isBackupDate(
            crop.planted
          )
        ) {

          errors.push(
            `${label} has an invalid planting date.`
          );

        }


        if (
          !isBackupDate(
            crop.harvest
          )
        ) {

          errors.push(
            `${label} has an invalid harvest date.`
          );

        }


        if (
          !isBackupText(
            crop.location
          )
        ) {

          errors.push(
            `${label} has no valid location.`
          );

        }


        if (
          crop.currentStage !==
            undefined &&
          !cropStages.has(
            crop.currentStage
          )
        ) {

          errors.push(
            `${label} has an invalid growth stage.`
          );

        }


        if (
          crop.growthHistory !==
            undefined
        ) {

          if (
            !Array.isArray(
              crop.growthHistory
            )
          ) {

            errors.push(
              `${label} has invalid growth history.`
            );

          } else {

            crop.growthHistory.forEach(
              (entry, historyIndex) => {

                if (
                  !isPlainBackupObject(
                    entry
                  ) ||
                  !cropStages.has(
                    entry.stage
                  ) ||
                  !isBackupDate(
                    entry.date
                  )
                ) {

                  errors.push(
                    `${label}.growthHistory[${historyIndex}] is invalid.`
                  );

                }

              }
            );

          }

        }

      }
    );

  }


  /*
   * HARVEST HISTORY
   */
  if (
    Array.isArray(
      data.harvestHistory
    )
  ) {

    data.harvestHistory.forEach(
      (record, index) => {

        const label =
          `harvestHistory[${index}]`;


        if (
          !isBackupText(
            record.crop
          ) ||
          !isBackupDate(
            record.date
          ) ||
          !isBackupText(
            record.location
          )
        ) {

          errors.push(
            `${label} is missing required harvest information.`
          );

        }


        if (
          !isBackupNumber(
            record.area,
            0.000001
          ) ||
          !isBackupNumber(
            record.yield,
            0.000001
          )
        ) {

          errors.push(
            `${label} has invalid area or yield values.`
          );

        }


        if (
          record.quality !==
            undefined &&
          !harvestQualities.has(
            record.quality
          )
        ) {

          errors.push(
            `${label} has an invalid quality value.`
          );

        }

      }
    );

  }


  /*
   * IRRIGATION
   */
  if (
    Array.isArray(
      data.irrigationFields
    )
  ) {

    data.irrigationFields.forEach(
      (field, index) => {

        const label =
          `irrigationFields[${index}]`;


        if (
          !isBackupText(
            field.name
          ) ||
          !isBackupText(
            field.crop
          )
        ) {

          errors.push(
            `${label} is missing required field information.`
          );

        }


        if (
          !isBackupNumber(
            field.area,
            0.000001
          )
        ) {

          errors.push(
            `${label} has an invalid area.`
          );

        }


        if (
          field.freq !==
            undefined &&
          !isBackupNumber(
            field.freq,
            0
          )
        ) {

          errors.push(
            `${label} has an invalid irrigation frequency.`
          );

        }


        if (
          field.waterAmt !==
            undefined &&
          !isBackupNumber(
            field.waterAmt,
            0
          )
        ) {

          errors.push(
            `${label} has an invalid water amount.`
          );

        }

      }
    );

  }


  /*
   * PEST LOGS
   */
  if (
    Array.isArray(
      data.pestLogs
    )
  ) {

    data.pestLogs.forEach(
      (log, index) => {

        const label =
          `pestLogs[${index}]`;


        if (
          !isBackupText(
            log.pest
          ) ||
          !isBackupText(
            log.crop
          ) ||
          !isBackupText(
            log.location
          ) ||
          !isBackupDate(
            log.date
          )
        ) {

          errors.push(
            `${label} is missing required pest-log information.`
          );

        }


        if (
          log.severity !==
            undefined &&
          !pestSeverities.has(
            log.severity
          )
        ) {

          errors.push(
            `${label} has an invalid severity.`
          );

        }

      }
    );

  }


  /*
   * TASKS
   */
  if (
    Array.isArray(
      data.tasks
    )
  ) {

    data.tasks.forEach(
      (task, index) => {

        const label =
          `tasks[${index}]`;


        if (
          !isBackupText(
            task.label
          ) ||
          !isBackupText(
            task.time
          )
        ) {

          errors.push(
            `${label} is invalid.`
          );

        }


        if (
          typeof task.done !==
            'boolean'
        ) {

          errors.push(
            `${label} has an invalid completion state.`
          );

        }


        if (
          !taskPriorities.has(
            task.priority
          )
        ) {

          errors.push(
            `${label} has an invalid priority.`
          );

        }

      }
    );

  }


  /*
   * NOTIFICATIONS
   */
  if (
    Array.isArray(
      data.notifications
    )
  ) {

    data.notifications.forEach(
      (notification, index) => {

        const label =
          `notifications[${index}]`;


        if (
          !notificationTypes.has(
            notification.type
          ) ||
          !isBackupText(
            notification.title
          ) ||
          !isBackupText(
            notification.body
          )
        ) {

          errors.push(
            `${label} is invalid.`
          );

        }


        if (
          !isBackupDate(
            notification.time
          )
        ) {

          errors.push(
            `${label} has an invalid date.`
          );

        }


        if (
          typeof notification.read !==
            'boolean'
        ) {

          errors.push(
            `${label} has an invalid read state.`
          );

        }

      }
    );

  }


  /*
   * PLANT SCANNER HISTORY
   */
  if (
    Array.isArray(
      data.scannerHistory
    )
  ) {

    data.scannerHistory.forEach(
      (scan, index) => {

        const label =
          `scannerHistory[${index}]`;


        if (
          !isBackupText(
            scan.plant
          )
        ) {

          errors.push(
            `${label} has no valid plant name.`
          );

        }


        if (
          scan.severity !==
            undefined &&
          !scanSeverities.has(
            scan.severity
          )
        ) {

          errors.push(
            `${label} has an invalid severity.`
          );

        }


        if (
          scan.confidence !==
            undefined &&
          (
            !isBackupNumber(
              scan.confidence,
              0
            ) ||
            Number(
              scan.confidence
            ) > 100
          )
        ) {

          errors.push(
            `${label} has an invalid confidence value.`
          );

        }

      }
    );

  }


  /*
   * CURRENT SETTINGS VALUES
   */
  if (
    isPlainBackupObject(
      data.settings
    )
  ) {

    const settings =
      data.settings;
    
    const booleanSettingKeys = [
      'rainAlert',
      'windAlert',
      'dailyBriefing',
      'quietHours'
    ];


    booleanSettingKeys.forEach(
      key => {

        if (
          typeof settings[key] !==
            'boolean'
        ) {

          errors.push(
            `Backup contains an invalid ${key} setting.`
          );

        }

      }
    );


    [
      'briefingTime',
      'quietFrom',
      'quietUntil'
    ].forEach(
      key => {

        if (
          !isBackupTime(
            settings[key]
          )
        ) {

          errors.push(
            `Backup contains an invalid ${key} time.`
          );

      }

    }
  );


  if (
    !isBackupNumber(
      settings.thresholdTemp,
      20
    ) ||
    Number(
      settings.thresholdTemp
    ) > 45
  ) {

    errors.push(
      'Backup contains an invalid temperature threshold.'
    );

  }


  if (
    !Number.isInteger(
      Number(
        settings.harvestReminderDays
      )
    ) ||
    Number(
      settings.harvestReminderDays
    ) < 1 ||
    Number(
      settings.harvestReminderDays
    ) > 30
  ) {

    errors.push(
      'Backup contains an invalid harvest-reminder range.'
    );

  }


  if (
    ![
      'dashboard',
      'weather-maps',
      'planting-calendar',
      'my-crops'
    ].includes(
      settings.defaultPage
    )
  ) {

    errors.push(
      'Backup contains an invalid startup page.'
    );

  }


  if (
    ![
      'Manual',
      'Drip',
      'Sprinkler',
      'Flood',
      'Rain-fed'
    ].includes(
      settings.defaultIrrigationMethod
    )
  ) {

    errors.push(
      'Backup contains an invalid irrigation-method preference.'
    );

  }


    if (
      ![
        'dark',
        'light'
      ].includes(
        settings.theme
      )
    ) {

      errors.push(
        'Backup contains an invalid theme setting.'
      );

    }


    if (
      ![
        'C',
        'F'
      ].includes(
        settings.tempUnit
      )
    ) {

      errors.push(
        'Backup contains an invalid temperature unit.'
      );

    }


    if (
      ![
        'kph',
        'mph'
      ].includes(
        settings.windUnit
      )
    ) {

      errors.push(
        'Backup contains an invalid wind unit.'
      );

    }


    if (
      ![
        'small',
        'medium',
        'large'
      ].includes(
        settings.fontSize
      )
    ) {

      errors.push(
        'Backup contains an invalid font-size setting.'
      );

    }


    if (
      ![
        'calendar',
        'list'
      ].includes(
        settings.calView
      )
    ) {

      errors.push(
        'Backup contains an invalid calendar view.'
      );

    }


    if (
      !Array.isArray(
        settings.favCrops
      ) ||
      settings.favCrops.some(
        crop =>
          !isBackupText(
            crop
          )
      )
    ) {

      errors.push(
        'Backup contains invalid favorite-crop preferences.'
      );

    }

  }

}


function validateFarmCastBackup(
  backup
) {

  const errors =
    [];


  if (
    !isPlainBackupObject(
      backup
    )
  ) {

    return {
      valid: false,
      errors: [
        'Backup root must be a JSON object.'
      ]
    };

  }


  const allowedRootKeys = [
    'farmcastBackup',
    'backupVersion',
    'exportedAt',
    'data',
    'counters'
  ];


  if (
    !hasOnlyAllowedBackupKeys(
      backup,
      allowedRootKeys
    )
  ) {

    errors.push(
      'Backup contains unsupported top-level fields.'
    );

  }


  if (
    backup.farmcastBackup !==
      true
  ) {

    errors.push(
      'This is not a FarmCast backup file.'
    );

  }


  if (
    backup.backupVersion !==
      1
  ) {

    errors.push(
      'Unsupported FarmCast backup version.'
    );

  }


  if (
    typeof backup.exportedAt !==
      'string' ||
    Number.isNaN(
      Date.parse(
        backup.exportedAt
      )
    )
  ) {

    errors.push(
      'Backup export date is invalid.'
    );

  }


  if (
    !isPlainBackupObject(
      backup.data
    )
  ) {

    errors.push(
      'Backup data section is missing or invalid.'
    );

  }


  if (
    !isPlainBackupObject(
      backup.counters
    )
  ) {

    errors.push(
      'Backup counters section is missing or invalid.'
    );

  }


  if (
    errors.length >
      0
  ) {

    return {
      valid: false,
      errors
    };

  }


  const allowedDataKeys = [
    'crops',
    'harvestHistory',
    'irrigationFields',
    'pestLogs',
    'tasks',
    'notifications',
    'scannerHistory',
    'settings'
  ];


  if (
    !hasOnlyAllowedBackupKeys(
      backup.data,
      allowedDataKeys
    )
  ) {

    errors.push(
      'Backup data contains unsupported fields.'
    );

  }


  const collectionKeys = [
    'crops',
    'harvestHistory',
    'irrigationFields',
    'pestLogs',
    'tasks',
    'notifications',
    'scannerHistory'
  ];


  collectionKeys.forEach(
    key => {

      if (
        !Array.isArray(
          backup.data[key]
        )
      ) {

        errors.push(
          `${key} must be an array.`
        );

        return;

      }


      const hasInvalidRecord =
        backup.data[key]
          .some(
            record =>
              !isPlainBackupObject(
                record
              )
          );


      if (
        hasInvalidRecord
      ) {

        errors.push(
          `${key} contains an invalid record.`
        );

      }

    }
  );


  if (
    !isPlainBackupObject(
      backup.data.settings
    )
  ) {

    errors.push(
      'Backup settings are invalid.'
    );

  } else {

    const allowedSettingKeys =
      Object.keys(
        DEFAULT_SETTINGS
      );


    if (
      !hasOnlyAllowedBackupKeys(
        backup.data.settings,
        allowedSettingKeys
      )
    ) {

      errors.push(
        'Backup settings contain unsupported fields.'
      );

    }

  }


  const allowedCounterKeys = [
    'nextCropId',
    'nextHarvestId',
    'nextFieldId',
    'nextPestLogId',
    'nextNotifId'
  ];


  if (
    !hasOnlyAllowedBackupKeys(
      backup.counters,
      allowedCounterKeys
    )
  ) {

    errors.push(
      'Backup counters contain unsupported fields.'
    );

  }


  allowedCounterKeys.forEach(
    key => {

      const value =
        backup.counters[key];


      if (
        !Number.isInteger(
          value
        ) ||
        value < 1
      ) {

        errors.push(
          `${key} is invalid.`
        );

      }

    }
  );

  /*
   * Validate the actual records before
   * allowing a destructive restore.
   */
  validateFarmCastBackupRecords(
    backup,
    errors
  );


  return {
    valid:
      errors.length === 0,

    errors
  };

}


function setRestoreBackupStatus(
  message,
  type = 'info'
) {

  const status =
    document.getElementById(
      'restoreBackupStatus'
    );

  const icon =
    document.getElementById(
      'restoreBackupStatusIcon'
    );

  const text =
    document.getElementById(
      'restoreBackupStatusText'
    );


  if (
    !status ||
    !icon ||
    !text
  ) {
    return;
  }


  const styles = {

    info: {
      icon: 'info',
      color:
        'var(--blue)'
    },

    success: {
      icon:
        'check_circle',
      color:
        'var(--green)'
    },

    error: {
      icon: 'error',
      color:
        'var(--red)'
    }

  };


  const selectedStyle =
    styles[type] ||
    styles.info;


  status.style.display =
    'flex';


  icon.textContent =
    selectedStyle.icon;


  icon.style.color =
    selectedStyle.color;


  text.textContent =
    message;

}

function setRestoreBackupActionEnabled(
  enabled
) {

  const button =
    document.getElementById(
      'restoreBackupButton'
    );


  if (!button) return;


  button.disabled =
    !enabled;

}

function selectFarmCastBackupFile() {

  const input =
    document.getElementById(
      'restoreBackupFile'
    );


  if (!input) return;


  /*
   * Selecting another file invalidates
   * the previously validated backup.
   */
  pendingFarmCastBackup =
    null;


  setRestoreBackupActionEnabled(
    false
  );


  input.value =
    '';


  input.click();

}


async function handleFarmCastBackupFile(
  event
) {

  const input =
    event.target;


  const file =
    input.files?.[0];


  pendingFarmCastBackup =
    null;
  
  setRestoreBackupActionEnabled(
    false
  );

  if (!file) {
    return;
  }


  setRestoreBackupStatus(
    'Checking backup file…',
    'info'
  );


  if (
    !file.name
      .toLowerCase()
      .endsWith(
        '.json'
      )
  ) {

    setRestoreBackupStatus(
      'Please select a FarmCast JSON backup file.',
      'error'
    );


    toast(
      'Please select a JSON backup file.',
      'warn'
    );


    input.value =
      '';

    return;

  }


  const MAX_BACKUP_SIZE =
    50 *
    1024 *
    1024;


  if (
    file.size >
    MAX_BACKUP_SIZE
  ) {

    setRestoreBackupStatus(
      'Backup file is larger than the supported 50 MB limit.',
      'error'
    );


    toast(
      'Backup file is too large.',
      'err'
    );


    input.value =
      '';

    return;

  }


  try {

    const text =
      await file.text();


    const backup =
      JSON.parse(
        text
      );


    const validation =
      validateFarmCastBackup(
        backup
      );


    if (
      !validation.valid
    ) {

      console.warn(
        'Invalid FarmCast backup:',
        validation.errors
      );


      setRestoreBackupStatus(
        `Invalid backup: ${
          validation.errors[0]
        }`,
        'error'
      );


      toast(
        'This backup file is not valid for FarmCast.',
        'err'
      );


      input.value =
        '';

      return;

    }


    pendingFarmCastBackup =
      backup;
    
    setRestoreBackupActionEnabled(
      true
    );

    const backupDate =
      new Date(
        backup.exportedAt
      ).toLocaleString(
        'en-PH'
      );


    const data =
      backup.data;


    setRestoreBackupStatus(
      `Valid FarmCast backup from ${backupDate}. ` +
      `${data.crops.length} crops, ` +
      `${data.harvestHistory.length} harvest records, ` +
      `${data.irrigationFields.length} irrigation fields, ` +
      `${data.pestLogs.length} pest logs, and ` +
      `${data.scannerHistory.length} scan records found.`,
      'success'
    );


    toast(
      'FarmCast backup validated successfully!',
      'ok'
    );


  } catch (error) {

    console.error(
      'Backup validation error:',
      error
    );


    setRestoreBackupStatus(
      'The selected file is not valid JSON.',
      'error'
    );


    toast(
      'Could not read the backup file.',
      'err'
    );


    pendingFarmCastBackup =
      null;

  } finally {

    input.value =
      '';

  }

}

function buildRestoredSettingsPreservingAccount(
  backupSettings
) {

  const authUser =
    typeof getAuthUser ===
      'function'
      ? getAuthUser()
      : null;


  const restored =
    Object.assign(
      {},
      DEFAULT_SETTINGS,
      cleanBackupSettings(
        backupSettings
      )
    );


  /*
   * Restore farm preferences but never
   * replace the identity/profile of the
   * currently signed-in account.
   */
  const currentAvatar =
    authUser?.avatar ||
    appSettings.avatar ||
    DEFAULT_FARMER_AVATAR;


  restored.name =
    authUser?.name ||
    appSettings.name ||
    restored.name;


  restored.email =
    authUser?.email ||
    appSettings.email ||
    restored.email;


  restored.farmName =
    authUser?.farmName ||
    appSettings.farmName ||
    restored.farmName;


  restored.farmSize =
    authUser?.farmSize ??
    appSettings.farmSize ??
    restored.farmSize;


  restored.role =
    authUser?.role ||
    appSettings.role ||
    restored.role;


  restored.phone =
    authUser?.phone ||
    appSettings.phone ||
    restored.phone;

  /*
   * Farm location also belongs to the
   * currently signed-in User profile.
   *
   * A backup from another account must
   * never replace it.
   */
  restored.city =
    authUser?.city ??
    appSettings.city ??
    restored.city;


  restored.lat =
    authUser?.lat ??
    appSettings.lat ??
    restored.lat;


  restored.lon =
    authUser?.lon ??
    appSettings.lon ??
    restored.lon;


  restored.avatar =
    LEGACY_FARMER_AVATARS[
      currentAvatar
    ] ||
    currentAvatar ||
    DEFAULT_FARMER_AVATAR;


  return restored;

}

function persistFarmCastBackupLocally(
  backup
) {

  const data =
    backup.data;


  const counters =
    backup.counters;


  const restoredSettings =
    buildRestoredSettingsPreservingAccount(
      data.settings
    );


  /*
   * The scanner history is already
   * restored to MongoDB.
   *
   * Do not duplicate potentially large
   * base64 images into localStorage.
   */
  localStorage.removeItem(
    'fc_scanHistory'
  );


  localStorage.removeItem(
    LS_OFFICIAL_SEEN
  );


  localStorage.removeItem(
    'fc_irrFid'
  );


  const localValues = [

    [
      LS_CROPS,
      data.crops
    ],

    [
      LS_CROPS_ID,
      counters.nextCropId
    ],

    [
      LS_TASKS,
      data.tasks
    ],

    [
      LS_PEST_LOGS,
      data.pestLogs
    ],

    [
      'fc_nextPestLogId',
      counters.nextPestLogId
    ],

    [
      LS_IRR_FIELDS,
      data.irrigationFields
    ],

    [
      LS_IRR_FID,
      counters.nextFieldId
    ],

    [
      LS_HARVEST,
      data.harvestHistory
    ],

    [
      LS_HARVEST_ID,
      counters.nextHarvestId
    ],

    [
      LS_NOTIFS,
      data.notifications
    ],

    [
      LS_NOTIF_ID,
      counters.nextNotifId
    ],

    [
      LS_SETTINGS,
      restoredSettings
    ]

  ];


  localValues.forEach(
    ([key, value]) => {

      localStorage.setItem(
        key,
        JSON.stringify(
          value
        )
      );

    }
  );


  return restoredSettings;

}

async function restoreFarmCastBackup() {

  const backup =
    pendingFarmCastBackup;


  if (!backup) {

    toast(
      'Choose and validate a FarmCast backup first.',
      'warn'
    );

    return;

  }


  /*
   * Validate again immediately before
   * the destructive operation.
   */
  const validation =
    validateFarmCastBackup(
      backup
    );


  if (
    !validation.valid
  ) {

    pendingFarmCastBackup =
      null;


    setRestoreBackupActionEnabled(
      false
    );


    setRestoreBackupStatus(
      `Backup is no longer valid: ${
        validation.errors[0]
      }`,
      'error'
    );


    toast(
      'Backup validation failed.',
      'err'
    );

    return;

  }


  if (
    typeof fcBackup ===
      'undefined' ||
    typeof fcBackup.restore !==
      'function'
  ) {

    setRestoreBackupStatus(
      'FarmCast restore service is unavailable.',
      'error'
    );


    toast(
      'Restore service is unavailable.',
      'err'
    );

    return;

  }


  const data =
    backup.data;


  const backupDate =
    new Date(
      backup.exportedAt
    ).toLocaleString(
      'en-PH'
    );


  const firstConfirm =
    confirm(
      `Restore FarmCast backup from ${backupDate}?\n\n` +
      `This will replace your current synced workspace with:\n` +
      `• ${data.crops.length} crop records\n` +
      `• ${data.harvestHistory.length} harvest records\n` +
      `• ${data.irrigationFields.length} irrigation fields\n` +
      `• ${data.pestLogs.length} pest logs\n` +
      `• ${data.scannerHistory.length} plant scans\n\n` +
      `Your current login account will NOT be replaced.`
    );


  if (!firstConfirm) {
    return;
  }


  const finalConfirm =
    confirm(
      'Final confirmation: replace the current FarmCast workspace with this backup?\n\n' +
      'This action cannot be undone unless you already created a backup of the current workspace.'
    );


  if (!finalConfirm) {
    return;
  }


  const restoreButton =
    document.getElementById(
      'restoreBackupButton'
    );


  setRestoreBackupActionEnabled(
    false
  );


  if (restoreButton) {
    restoreButton.textContent =
      'Restoring…';
  }


  setRestoreBackupStatus(
    'Restoring FarmCast workspace securely…',
    'info'
  );


  let serverRestored =
    false;


  try {

    /*
     * Server first.
     *
     * The backend uses a MongoDB
     * transaction, so local data is not
     * changed unless the server restore
     * succeeds completely.
     */
    await fcBackup.restore({

      crops:
        data.crops,

      harvestHistory:
        data.harvestHistory,

      irrigationFields:
        data.irrigationFields,

      pestLogs:
        data.pestLogs,

      scannerHistory:
        data.scannerHistory,

      settings:
        cleanBackupSettings(
          data.settings
        )

    });


    serverRestored =
      true;


    const restoredSettings =
      persistFarmCastBackupLocally(
        backup
      );


    appSettings = {
      ...restoredSettings
    };


    pendingFarmCastBackup =
      null;


    setRestoreBackupStatus(
      'FarmCast backup restored successfully. Reloading…',
      'success'
    );


    toast(
      'FarmCast backup restored successfully!',
      'ok'
    );


    setTimeout(
      () => {
        location.reload();
      },
      900
    );


  } catch (error) {

    console.error(
      'FarmCast restore error:',
      error
    );


    if (
      serverRestored
    ) {

      /*
       * Very unusual case:
       * MongoDB succeeded but browser
       * storage could not be written.
       *
       * Reload so server-backed records
       * still return from MongoDB.
       */
      setRestoreBackupStatus(
        'Server restore succeeded, but this browser could not save the local copy. Reloading from the server…',
        'error'
      );


      toast(
        'Server data restored. Reloading FarmCast…',
        'warn'
      );


      setTimeout(
        () => {
          location.reload();
        },
        1400
      );


      return;

    }


    setRestoreBackupStatus(
      'Restore failed. Your existing FarmCast server data was preserved.',
      'error'
    );


    toast(
      'FarmCast restore failed. No server data was replaced.',
      'err'
    );


    setRestoreBackupActionEnabled(
      true
    );


    if (restoreButton) {
      restoreButton.textContent =
        'Restore';
    }

  }

}

async function exportFarmCastBackup() {

  try {

    const scannerBackup =
      await getBackupScannerHistory();


    const exportedAt =
      new Date()
        .toISOString();


    const backup = {

      farmcastBackup: true,

      backupVersion: 1,

      exportedAt,


      data: {

        crops:
          cleanBackupCollection(
            typeof myCrops !==
              'undefined'
              ? myCrops
              : []
          ),


        harvestHistory:
          cleanBackupCollection(
            typeof harvestHistory !==
              'undefined'
              ? harvestHistory
              : []
          ),


        irrigationFields:
          cleanBackupCollection(
            typeof irrFields !==
              'undefined'
              ? irrFields
              : []
          ),


        pestLogs:
          cleanBackupCollection(
            typeof pestLogs !==
              'undefined'
              ? pestLogs
              : []
          ),


        tasks:
          Array.isArray(
            tasks
          )
            ? tasks
            : [],


        notifications:
          Array.isArray(
            notifications
          )
            ? notifications
            : [],


        scannerHistory:
          cleanBackupCollection(
            scannerBackup
          ),


        settings:
          cleanBackupSettings(
            appSettings
          )

      },


      counters: {

        nextCropId:
          typeof nextCropId !==
            'undefined'
            ? nextCropId
            : 1,


        nextHarvestId:
          typeof nextHarvestId !==
            'undefined'
            ? nextHarvestId
            : 1,


        nextFieldId:
          typeof nextFieldId !==
            'undefined'
            ? nextFieldId
            : 1,


        nextPestLogId:
          typeof nextPestLogId !==
            'undefined'
            ? nextPestLogId
            : 1,


        nextNotifId:
          typeof nextNotifId !==
            'undefined'
            ? nextNotifId
            : 1

      }

    };


    /*
     * Authentication/session information
     * is deliberately never included.
     *
     * Examples excluded:
     * fc_token
     * fc_user
     * fc_authUser
     * remembered login information
     */
    const json =
      JSON.stringify(
        backup,
        null,
        2
      );


    const blob =
      new Blob(
        [json],
        {
          type:
            'application/json;charset=utf-8'
        }
      );


    const url =
      URL.createObjectURL(
        blob
      );


    const link =
      document.createElement(
        'a'
      );


    const dateStamp =
      new Date()
        .toISOString()
        .slice(
          0,
          10
        );


    link.href =
      url;

    link.download =
      `farmcast-backup-${dateStamp}.json`;


    document.body.appendChild(
      link
    );


    link.click();


    document.body.removeChild(
      link
    );


    URL.revokeObjectURL(
      url
    );


    const now =
      new Date()
        .toLocaleString(
          'en-PH'
        );


    appSettings.lastExport =
      now;


    lsSave(
      LS_SETTINGS,
      appSettings
    );


    const lastExport =
      document.getElementById(
        'lastExportTime'
      );


    if (lastExport) {

      lastExport.textContent =
        now;

    }


    toast(
      'FarmCast backup downloaded!',
      'ok'
    );


    addNotification(
      'system',
      'FarmCast Backup Created',
      'A complete FarmCast workspace backup was downloaded successfully.'
    );

  } catch (error) {

    console.error(
      'FarmCast backup error:',
      error
    );


    toast(
      'Could not create the FarmCast backup.',
      'err'
    );

  }

}

function escapeCSVCell(
  value
) {

  if (
    value === null ||
    value === undefined
  ) {
    return '""';
  }


  let text =
    String(value);


  /*
   * Prevent spreadsheet apps from
   * interpreting user-entered text
   * as formulas.
   */
  if (
    /^[=+\-@]/.test(
      text.trimStart()
    )
  ) {

    text =
      `'${text}`;

  }


  return `"${text.replace(
    /"/g,
    '""'
  )}"`;

}

function exportCSV(type) {
  let data, headers, rows, filename;

  if (type === 'crops') {
    headers = ['ID','Type','Area (m²)','Planted','Harvest','Location','Irrigation','Notes','Watered'];
    
    rows =
      (
        typeof myCrops !==
        'undefined'
        ? myCrops
        : []
      ).map(c => [
        c.id,
        c.type,
        c.area,
        c.planted,
        c.harvest,
        c.location,
        c.irrigation,
        c.notes || '',
        c.watered
          ? 'Yes'
          : 'No'
      ]);
    
    filename = 'farmcast_crops.csv';
  } else if (type === 'harvest') {
    headers = ['ID','Crop','Date','Location','Area (m²)','Yield (kg)','Quality','Notes'];
    
    rows =
      (
        typeof harvestHistory !==
        'undefined'
          ? harvestHistory
          : []
      ).map(h => [
        h.id,
        h.crop,
        h.date,
        h.location,
        h.area,
        h.yield,
        h.quality,
        h.notes || ''
      ]);
    
    filename = 'farmcast_harvest.csv';
  } else if (type === 'irrigation') {
    headers = ['ID','Name','Crop','Area (m²)','Type','Frequency (days)','Water/Session (L)','Last Watered'];
    rows = (typeof irrFields !== 'undefined' ? irrFields : []).map(f =>
      [f.id, f.name, f.crop, f.area, f.type, f.freq, f.waterAmt, f.lastWatered]
    );
    filename = 'farmcast_irrigation.csv';
  } else if (type === 'pests') {
    headers = ['ID','Pest','Date','Crop','Location','Severity','Notes'];
    
    rows =
      (
        typeof pestLogs !==
        'undefined'
          ? pestLogs
          : []
      ).map(p => [
        p.id,
        p.pest,
        p.date,
        p.crop,
        p.location,
        p.severity,
        p.notes || ''
      ]);
    
    filename = 'farmcast_pests.csv';
  } else return;

  const csvRows = [
    headers.map(
      escapeCSVCell
    ).join(','),

    ...rows.map(row =>
      row.map(
        escapeCSVCell
      ).join(',')
    )
  ];


  const csv =
    '\uFEFF' +
    csvRows.join(
      '\r\n'
    );


  const blob =
    new Blob(
      [csv],
      {
        type:
          'text/csv;charset=utf-8;'
      }
    );
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);

  const now = new Date().toLocaleString('en-PH');
  appSettings.lastExport = now;
  lsSave(LS_SETTINGS, appSettings);
  const lte = document.getElementById('lastExportTime');
  if (lte) lte.textContent = now;

  toast(
    `${filename} downloaded!`,
    'ok'
  );

  addNotification(
    'system',
    'Data Exported',
    `${filename} was downloaded successfully.`
  );
}

function buildResetSettingsPreservingAccount() {

  const authUser =
    typeof getAuthUser === 'function'
      ? getAuthUser()
      : null;


  return {

    ...DEFAULT_SETTINGS,


    name:
      authUser?.name ||
      appSettings.name ||
      DEFAULT_SETTINGS.name,


    email:
      authUser?.email ||
      appSettings.email ||
      '',


    farmName:
      authUser?.farmName ||
      appSettings.farmName ||
      DEFAULT_SETTINGS.farmName,


    farmSize:
      authUser?.farmSize ??
      appSettings.farmSize ??
      DEFAULT_SETTINGS.farmSize,


    role:
      authUser?.role ||
      appSettings.role ||
      DEFAULT_SETTINGS.role,


    phone:
      authUser?.phone ||
      appSettings.phone ||
    '',


  /*
   * Reset workspace preferences without
   * resetting the farmer's saved location.
   */
  city:
    authUser?.city ??
    appSettings.city ??
    DEFAULT_SETTINGS.city,


  lat:
    authUser?.lat ??
    appSettings.lat ??
    DEFAULT_SETTINGS.lat,


  lon:
    authUser?.lon ??
    appSettings.lon ??
    DEFAULT_SETTINGS.lon,


  avatar:
    authUser?.avatar ||
    appSettings.avatar ||
    DEFAULT_FARMER_AVATAR

  };

}


function clearLocalFarmWorkspaceData() {

  /*
   * Store empty arrays instead of simply
   * deleting the keys.
   *
   * Some FarmCast modules have sample data
   * as their fallback, so removing the key
   * would make those records return.
   */

  lsSave(
    LS_CROPS,
    []
  );

  lsSave(
    LS_CROPS_ID,
    1
  );


  lsSave(
    LS_TASKS,
    []
  );


  lsSave(
    LS_PEST_LOGS,
    []
  );

  lsSave(
    'fc_nextPestLogId',
    1
  );


  lsSave(
    LS_IRR_FIELDS,
    []
  );

  lsSave(
    LS_IRR_FID,
    1
  );


  lsSave(
    LS_HARVEST,
    []
  );

  lsSave(
    LS_HARVEST_ID,
    1
  );


  lsSave(
    LS_NOTIFS,
    []
  );

  lsSave(
    LS_NOTIF_ID,
    1
  );


  const resetSettings =
    buildResetSettingsPreservingAccount();


  appSettings = {
    ...resetSettings
  };


  lsSave(
    LS_SETTINGS,
    appSettings
  );


  /*
   * Clear secondary local-only state.
   * Authentication is deliberately
   * NOT removed.
   */
  [
    LS_OFFICIAL_SEEN,
    'fc_scanHistory',
    'fc_sidebarCollapsed',

    // Clean up old incorrect key too.
    'fc_irrFid'
  ].forEach(key => {

    localStorage.removeItem(
      key
    );

  });


  return resetSettings;

}


function confirmResetData() {

  if (
    !confirm(
      'Reset FarmCast data stored on this device? Crops, harvests, irrigation fields, pest logs, scan history, notifications, and preferences will be cleared. Your login account will be kept. If cloud sync is unavailable, synced records may return when the server reconnects.'
    )
  ) {
    return;
  }


  if (
    !confirm(
      'Last chance — reset the local FarmCast workspace?'
    )
  ) {
    return;
  }


  clearLocalFarmWorkspaceData();


  toast(
    'Local farm workspace reset. Reloading…',
    'warn'
  );


  setTimeout(
    () =>
      location.reload(),
    1500
  );

}

// ═══ SETTINGS FORM POPULATION ═══
function updateSettingsFormValues() {
  const s = appSettings;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  const setChk = (id, val) => { const el = document.getElementById(id); if (el) el.checked = val; };

  set('settingName', s.name);
  set('settingEmail', s.email);
  set('settingFarmName', s.farmName);
  set('settingRole', s.role);
  set('settingFarmSize', s.farmSize);
  set('settingPhone', s.phone);

  set(
    'settingDefaultIrrigation',
    s.defaultIrrigationMethod
  );

  set('settingLocationSearch', s.city);

  set('settingLat', s.lat);
  set('settingLon', s.lon);
  set('settingDefaultPage', s.defaultPage);

  const thresholdForDisplay =
    s.tempUnit === 'F'
      ? Math.round(
          (
            Number(
              s.thresholdTemp
            ) *
            9 /
            5
          ) +
          32
        )
      : Math.round(
          Number(
            s.thresholdTemp
          ) *
          10
        ) /
        10;


  set(
    'thresholdTemp',
    thresholdForDisplay
  );


  const thresholdInput =
    document.getElementById(
      'thresholdTemp'
    );


  if (thresholdInput) {

    thresholdInput.min =
      s.tempUnit === 'F'
        ? '68'
        : '20';

    thresholdInput.max =
      s.tempUnit === 'F'
        ? '113'
        : '45';

  }


  set(
    'harvestReminderDays',
    s.harvestReminderDays
  );

  set('settingBriefingTime', s.briefingTime);
  set('quietFrom', s.quietFrom);
  set('quietUntil', s.quietUntil);
  set('settingLanguage', s.language);

  setChk(
    'toggleRainAlert',
    s.rainAlert
  );

  setChk(
    'toggleWindAlert',
    s.windAlert
  );

  setChk(
    'toggleDailyBriefing',
    s.dailyBriefing
  );

  setChk(
    'toggleQuietHours',
    s.quietHours
  );


  updateQuietHoursUI();
  updateDailyBriefingUI();

  // Profile + sidebar farmer avatar
  updateFarmerAvatarUI();

  // Last export
  const lte = document.getElementById('lastExportTime');
  if (lte) lte.textContent = s.lastExport || 'Never';

  // Last active
  const la = document.getElementById('settingLastActive');
  if (la) la.textContent = new Date().toLocaleString('en-PH');

  // Temp unit selector
  document.querySelectorAll('#tempUnitSelector .unit-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.includes(s.tempUnit));
  });
  // Wind unit selector
  document.querySelectorAll('#windUnitSelector .unit-btn').forEach(b => {
    b.classList.toggle('active', (s.windUnit==='mph' ? b.textContent.includes('mph') : b.textContent.includes('km')));
  });
  // Theme selector
  document.querySelectorAll('.theme-opt').forEach(b => {
    b.classList.toggle('active', b.classList.contains(s.theme));
  });
  // Font size
  document.querySelectorAll('#fontSizeSelector .sens-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.toLowerCase() === s.fontSize);
  });
  // Cal view
  document.querySelectorAll('#calViewSelector .sens-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.toLowerCase() === s.calView);
  });
  // Threshold temp unit label
  const ttul = document.getElementById('thresholdTempUnit');
  if (ttul) ttul.textContent = s.tempUnit === 'F' ? '°F' : '°C';

  renderFavCropsGrid();
}

// ═══════════════════════════════════════════════════════
// NOTIFICATIONS SYSTEM — Real-time alerts
// ═══════════════════════════════════════════════════════

const hasStoredNotifications =
  localStorage.getItem(
    LS_NOTIFS
  ) !== null;


let notifications =
  lsLoad(
    LS_NOTIFS,
    []
  );


let nextNotifId =
  lsLoad(
    LS_NOTIF_ID,
    1
  );


let notifFilterCurrent =
  'all';


/*
 * Add welcome/sample notifications
 * only on the true first run.
 *
 * An intentionally saved empty array
 * means the farmer cleared notifications
 * or reset the workspace, so do not
 * recreate the samples.
 */
if (
  !hasStoredNotifications
) {

  notifications = [

    {
      id: 1,
      type: 'system',
      title: 'Welcome to FarmCast!',
      body:
        'Your smart farm management app is ready. Set up your profile in Settings.',
      time:
        new Date(
          Date.now() -
          3600000
        ).toISOString(),
      read: false
    },


    {
      id: 2,
      type: 'harvest',
      title:
        'Harvest Reminder: Pechay',
      body:
        'Pechay at Greenhouse 1 is due for harvest in 3 days.',
      time:
        new Date(
          Date.now() -
          7200000
        ).toISOString(),
      read: false
    },


    {
      id: 3,
      type: 'pest',
      title:
        'Pest Monitoring Reminder',
      body:
        'Review Pest Alerts for crops saved in My Crops and inspect plants for visible signs before recording a pest sighting.',
      time:
        new Date(
          Date.now() -
          10800000
        ).toISOString(),
      read: true
    }

  ];


  lsSave(
    LS_NOTIFS,
    notifications
  );


  lsSave(
    LS_NOTIF_ID,
    4
  );


  nextNotifId =
    4;

}

function getNotificationIconPath(
  type
) {

  const iconMap = {

    weather:
      'assets/ui/weather-partly-cloudy.svg',

    official:
      'assets/ui/pest-status-danger.svg',

    pest:
      'assets/ui/analytics-pest.svg',

    'plant-health':
      'assets/ui/scanner-disease.svg',

    harvest:
      'assets/ui/analytics-harvest.svg',

    system:
      'assets/ui/farmcast-logo.svg'

  };


  return (
    iconMap[type] ||
    'assets/ui/farmcast-logo.svg'
  );

}

function addNotification(
  type,
  title,
  body,
  sourceUrl = null,
  dedupeKey = null
) {
  // Check quiet hours
  if (appSettings.quietHours) {
    const now  = new Date();
    const hour = now.getHours() * 60 + now.getMinutes();
    const [qfH, qfM] = appSettings.quietFrom.split(':').map(Number);
    const [quH, quM] = appSettings.quietUntil.split(':').map(Number);
    const qFrom = qfH * 60 + qfM;
    const qUntil= quH * 60 + quM;
    const inQuiet = qFrom > qUntil
      ? (hour >= qFrom || hour < qUntil)
      : (hour >= qFrom && hour < qUntil);
    if (inQuiet) return false; // suppress during quiet hours
  }


    notifications.unshift({

    id:
      nextNotifId++,

    type,

    title,

    body,

    sourceUrl,

    dedupeKey,

    time:
      new Date()
        .toISOString(),

    read:
      false

  });

  if (notifications.length > 50) notifications = notifications.slice(0, 50);
  lsSave(LS_NOTIFS, notifications);
  lsSave(LS_NOTIF_ID, nextNotifId);
  updateNotifBadge();
  renderNotifList();

  return true;
}

function hasRecentNotification(type, title, cooldownHours = 6) {
  const cooldownMs = cooldownHours * 60 * 60 * 1000;
  const now = Date.now();

  return notifications.some(n => {
    if (n.type !== type || n.title !== title) return false;

    const notifTime = new Date(n.time).getTime();

    return now - notifTime < cooldownMs;
  });
}

function getSeenOfficialAdvisories() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(LS_OFFICIAL_SEEN) || '[]'
    );

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function markOfficialAdvisorySeen(id) {
  if (!id) return;

  const seen = getSeenOfficialAdvisories();

  if (!seen.includes(id)) {
    seen.push(id);
  }

  const trimmed = seen.slice(-100);

  localStorage.setItem(
    LS_OFFICIAL_SEEN,
    JSON.stringify(trimmed)
  );
}

function addOfficialAdvisory({
  title,
  body,
  source = 'PAGASA',
  location = currentCity,
  issuedAt = null,
  sourceUrl = null
}) {
  let issuedText = 'Check official source for issuance time';

  if (issuedAt) {
    const issuedDate = new Date(issuedAt);

    if (!Number.isNaN(issuedDate.getTime())) {
      issuedText =
        issuedDate.toLocaleString('en-PH', {
          timeZone: 'Asia/Manila',
          dateStyle: 'medium',
          timeStyle: 'short'
        }) + ' PHT';
    }
  }

  return addNotification(
    'official',
    title,
    `DOST-PAGASA published an official weather advisory. Issued: ${issuedText}. Tap to open the official PAGASA document.`,
    sourceUrl
  );
}

function notifyNewOfficialAdvisories(advisories) {
  const seen = getSeenOfficialAdvisories();

  advisories.forEach(advisory => {
    if (!advisory.id) return;

    if (seen.includes(advisory.id)) {
      return;
    }

    const added = addOfficialAdvisory({
      title: advisory.title || 'Weather Advisory',
      body:
        advisory.message ||
        'DOST-PAGASA has published an official advisory.',
      source: advisory.source || 'DOST-PAGASA',
      location:
        advisory.location ||
        'See advisory for affected areas',
      issuedAt: advisory.issuedAt,
      sourceUrl: advisory.sourceUrl || null
    });

    if (added) {
      markOfficialAdvisorySeen(advisory.id);
    }
  });
}

function updateOfficialAdvisorySummary(
  count = null,
  sourceState = 'checking'
) {

  const countEl =
    document.getElementById(
      'officialAdvisoryCount'
    );


  const checkedEl =
    document.getElementById(
      'officialAdvisoryChecked'
    );


  const sourceEl =
    document.getElementById(
      'officialAdvisorySourceState'
    );


  if (countEl) {

    countEl.textContent =
      Number.isInteger(count)
        ? `${count} Recent`
        : '-- Recent';

  }


  if (checkedEl) {

    const checkedTime =
      new Date()
        .toLocaleTimeString(
          'en-PH',
          {
            timeZone:
              'Asia/Manila',

            hour:
              'numeric',

            minute:
              '2-digit'
          }
        );


    checkedEl.textContent =
      `Checked ${checkedTime}`;

  }


  if (sourceEl) {

    sourceEl.dataset.state =
      sourceState;


    if (
      sourceState ===
      'connected'
    ) {

      sourceEl.textContent =
        'PAGASA Connected';

    } else if (
      sourceState ===
      'partial'
    ) {

      sourceEl.textContent =
        'PAGASA Partial';

    } else if (
      sourceState ===
      'unavailable'
    ) {

      sourceEl.textContent =
        'PAGASA Unavailable';

    } else {

      sourceEl.textContent =
        'Checking PAGASA';

    }

  }

}

async function loadOfficialAdvisories() {
  try {
    const response = await fetch(
      `${window.FARMCAST_CONFIG.API_URL}/advisories`
    );

    if (!response.ok) {
      throw new Error(
        `Advisory service returned ${response.status}`
      );
    }

    const data = await response.json();

    const advisories = Array.isArray(data.advisories)
      ? data.advisories
      : [];

    const weatherAdvisorySourceAvailable =
      data?.sources
        ?.weatherAdvisories;

    const advisorySourceStates = [
      data?.sources
        ?.weatherAdvisories,

      data?.sources
        ?.tropicalCycloneBulletins,

      data?.sources
        ?.dailyWeather
    ]
      .filter(
        value =>
        typeof value ===
        'boolean'
      );


    const availableSourceCount =
      advisorySourceStates
        .filter(Boolean)
        .length;


    const advisorySourceState =
      advisorySourceStates.length === 0
        ? 'unavailable'

        : availableSourceCount ===
          advisorySourceStates.length
            ? 'connected'

        : availableSourceCount > 0
          ? 'partial'

          : 'unavailable';


    updateOfficialAdvisorySummary(
      advisories.length,
      advisorySourceState
    );

    if (
      weatherAdvisorySourceAvailable ===
        false &&
      advisories.length === 0
    ) {
      const container =
        document.getElementById(
          'officialAdvisoryList'
        );

      if (container) {
        container.innerHTML = `
          <div class="official-advisory-empty official-advisory-empty-warning">

            <div class="official-advisory-empty-icon">
              <img
                src="assets/ui/advisory-unavailable.svg"
                alt=""
                class="official-advisory-empty-icon-img"
              >
            </div>

            <div>
              <strong>
                PAGASA weather advisory source unavailable
              </strong>

              <p>
                FarmCast could not reach the official
                DOST-PAGASA weather advisory source.
                Please try again later.
              </p>
            </div>
          </div>
        `;
      }

      return;
    }

    renderOfficialAdvisories(advisories);

    if (
      weatherAdvisorySourceAvailable ===
        false &&
      advisories.length > 0
    ) {
      const container =
        document.getElementById(
          'officialAdvisoryList'
        );

      if (container) {
        container.insertAdjacentHTML(
          'afterbegin',
          `
            <div class="official-advisory-partial">

              <img
                src="assets/ui/advisory-info.svg"
                alt=""
                class="official-advisory-partial-icon"
              >

              <div>
                <strong>
                  Partial PAGASA feed available
                </strong>

                <p>
                  Some official weather advisory data
                  is temporarily unavailable.
                  Available cyclone bulletins are still
                  shown below.
                </p>
              </div>
            </div>
          `
        );
      }
    }

    notifyNewOfficialAdvisories(advisories);

  } catch (error) {
    console.warn(
      'Unable to load official advisories:',
      error.message
    );

    updateOfficialAdvisorySummary(
      null,
      'unavailable'
    );

    const container =
      document.getElementById('officialAdvisoryList');

    if (container) {
      container.innerHTML = `
        <div class="official-advisory-empty official-advisory-empty-warning">

          <div class="official-advisory-empty-icon">
            <img
              src="assets/ui/advisory-unavailable.svg"
              alt=""
              class="official-advisory-empty-icon-img"
            >
          </div>

          <div>
            <strong>Official advisory source unavailable</strong>
            <p>
              FarmCast could not retrieve the latest
              DOST-PAGASA advisory documents.
            </p>
          </div>
        </div>
      `;
    }
  }  
}

function renderOfficialAdvisories(advisories) {
  const container = document.getElementById(
    'officialAdvisoryList'
  );

  if (!container) return;

  if (!advisories.length) {
    container.innerHTML = `
      <div class="official-advisory-empty official-advisory-empty-clear">

        <div class="official-advisory-empty-icon">
          <img
            src="assets/ui/advisory-clear.svg"
            alt=""
            class="official-advisory-empty-icon-img"
          >
        </div>

        <div>
          <strong>No recent official advisories</strong>

          <p>
            No recent DOST-PAGASA weather advisory
            documents were detected by FarmCast.
          </p>
        </div>
      </div>
    `;

    return;
  }

    const advisoryCardsHtml =
      advisories.map(
        (advisory, index) => {

    const issuedDate = advisory.issuedAt
      ? new Date(advisory.issuedAt)
      : null;

    const issuedTime =
      issuedDate && !Number.isNaN(issuedDate.getTime())
        ? issuedDate.getTime()
        : null;

    const ageHours = issuedTime
      ? (Date.now() - issuedTime) / (1000 * 60 * 60)
      : null;

    const advisoryStatus =
      ageHours !== null && ageHours <= 3
        ? 'NEW'
        : 'RECENT';

    const advisoryStatusClass =
      advisoryStatus === 'NEW'
        ? 'status-new'
        : 'status-recent';

    const issuedText =
      issuedDate && !Number.isNaN(issuedDate.getTime())
        ? issuedDate.toLocaleString('en-PH', {
            timeZone: 'Asia/Manila',
            dateStyle: 'medium',
            timeStyle: 'short'
          }) + ' PHT'
        : 'Issuance time unavailable';

    return `
      <article
        class="official-advisory-card${
          index > 0
            ? ' official-advisory-extra'
            : ''
        }"
        ${
          index > 0
            ? 'hidden'
            : ''
        }
      >

        <div class="official-advisory-header">

          <div class="official-advisory-badges">

            <span class="official-advisory-badge">

              <img
                src="assets/ui/advisory-official.svg"
                alt=""
                class="official-advisory-badge-icon"
              >

                OFFICIAL

              </span>

            <span class="official-advisory-status ${advisoryStatusClass}">
              ${advisoryStatus}
            </span>
        </div>

        <span class="official-advisory-source">
            ${escapeAdvisoryHtml(
              advisory.source || 'Official Source'
            )}
          </span>

        </div>

        <h3>
          ${escapeAdvisoryHtml(
            advisory.title || 'Weather Advisory'
          )}
        </h3>

        <p class="official-advisory-message">
          ${escapeAdvisoryHtml(
            advisory.message || ''
          )}
        </p>

        <div class="official-advisory-meta">

          <span class="official-meta-item">
            <span class="official-meta-label">Affected areas</span>

            <span class="official-meta-value">

              <img
                src="assets/ui/advisory-location.svg"
                alt=""
                class="official-meta-icon"
              >

              ${escapeAdvisoryHtml(
                advisory.location ||
                'See official advisory for affected areas'
              )}

            </span>

          </span>

            <span class="official-meta-item">
              <span class="official-meta-label">Issued</span>

              <span class="official-meta-value">

                <img
                  src="assets/ui/advisory-time.svg"
                  alt=""
                  class="official-meta-icon"
                >

                ${issuedText}

              </span>

            </span>

        </div>

        ${advisory.sourceUrl ? `
          <a
            class="official-advisory-link"
            href="${escapeAdvisoryHtml(advisory.sourceUrl)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="official-advisory-link-label">

              <img
                src="assets/ui/advisory-document.svg"
                alt=""
                class="official-advisory-document-icon"
              >

              Open Official PAGASA Document

            </span>

            <img
              src="assets/ui/advisory-open.svg"
              alt=""
              class="official-advisory-open-icon"
           >

          </a>
        ` : ''}

            </article>
          `;
      }
    ).join('');


    const hiddenAdvisoryCount =
      Math.max(
        advisories.length - 1,
        0
      );


    container.innerHTML =
      advisoryCardsHtml +
      (
        hiddenAdvisoryCount > 0
          ? `
            <button
              type="button"
              class="official-advisory-toggle"
              aria-expanded="false"
              data-hidden-count="${hiddenAdvisoryCount}"
              onclick="toggleOfficialAdvisories(this)"
            >
              Show ${hiddenAdvisoryCount} more ${
                hiddenAdvisoryCount === 1
                  ? 'advisory'
                  : 'advisories'
              }
            </button>
          `
          : ''
      );

}

function toggleOfficialAdvisories(
  button
) {

  const container =
    document.getElementById(
      'officialAdvisoryList'
    );


  if (
    !container ||
    !button
  ) {
    return;
  }


  const isExpanded =
    button.getAttribute(
      'aria-expanded'
    ) === 'true';


  const shouldExpand =
    !isExpanded;


  container
    .querySelectorAll(
      '.official-advisory-extra'
    )
    .forEach(card => {

      card.hidden =
        !shouldExpand;

    });


  button.setAttribute(
    'aria-expanded',
    String(
      shouldExpand
    )
  );


  const hiddenCount =
    Number(
      button.dataset.hiddenCount
    ) || 0;


  button.textContent =
    shouldExpand
      ? 'Show less'
      : `Show ${hiddenCount} more ${
          hiddenCount === 1
            ? 'advisory'
            : 'advisories'
        }`;

}

function escapeAdvisoryHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function checkDailyWeatherBriefing(
  data
) {

  if (
    !data ||
    !appSettings.dailyBriefing
  ) {
    return;
  }


  const briefingTime =
    appSettings.briefingTime ||
    '05:00';


  const [
    briefingHour,
    briefingMinute
  ] =
    briefingTime
      .split(':')
      .map(Number);


  if (
    !Number.isFinite(
      briefingHour
    ) ||
    !Number.isFinite(
      briefingMinute
    )
  ) {
    return;
  }


  const now =
    new Date();


  const currentMinutes =
    (
      now.getHours() *
      60
    ) +
    now.getMinutes();


  const briefingMinutes =
    (
      briefingHour *
      60
    ) +
    briefingMinute;


  /*
   * Do not send before the
   * farmer's selected time.
   */
  if (
    currentMinutes <
    briefingMinutes
  ) {
    return;
  }


  const title =
    'Daily Weather Briefing';


  /*
   * Only one briefing
   * per calendar day.
   */
  const alreadySentToday =
    notifications.some(
      notification => {

        if (
          notification.type !==
            'weather' ||
          notification.title !==
            title
        ) {
          return false;
        }


        const notificationDate =
          new Date(
            notification.time
          );


        return (
          notificationDate
            .toDateString() ===
          now.toDateString()
        );

      }
    );


  if (
    alreadySentToday
  ) {
    return;
  }


  const description =
    data.weather?.[0]
      ?.description ||
    'current weather conditions';


  const formattedDescription =
    description
      .charAt(0)
      .toUpperCase() +
    description.slice(1);


  const temperature =
    displayTemp(
      data.main.temp
    );


  const humidity =
    data.main.humidity;


  const wind =
    displayWind(
      data.wind.speed
    );


  addNotification(
    'weather',
    title,
    `${data.name}: ${formattedDescription}. Temperature ${temperature}, humidity ${humidity}%, wind ${wind}. Review today's farm activities using the latest FarmCast weather conditions.`
  );

}

function checkWeatherAlerts(data) {
  if (!data) return;

  const temp = data.main.temp;
  const desc = data.weather[0].description.toLowerCase();
  const windKph = data.wind.speed * 3.6;
  const isRain = desc.includes('rain') || desc.includes('drizzle');
  const isHeavyRain = isRain && data.main.humidity > 85;

  const threshold =
    Number(
      appSettings.thresholdTemp
    );


  // Temperature alert
  if (
    Number.isFinite(
      threshold
    ) &&
    temp >
      threshold
  ) {

    const title =
      '🌡️ FarmCast Heat Risk';


    if (
      !hasRecentNotification(
        'weather',
        title,
        6
      )
    ) {
  
      addNotification(
        'weather',
        title,
        `Temperature in ${data.name} is ${displayTemp(temp)}, above your configured threshold of ${displayTemp(threshold)}. Monitor crops for heat stress and review irrigation needs.`
      );
 
    }

  }

  // Heavy rain
  if (isHeavyRain && appSettings.rainAlert) {
    const title = '🌧️ FarmCast Rain Risk';

    if (!hasRecentNotification('weather', title, 6)) {
      addNotification(
        'weather',
        title,
        `Rain and high humidity are currently detected in ${data.name}. Monitor field drainage and avoid unnecessary irrigation. Source: FarmCast weather analysis.`
      );
    }
  }

  // High wind
  if (windKph > 40 && appSettings.windAlert) {
    const title = '💨 FarmCast Strong Wind Risk';

    if (!hasRecentNotification('weather', title, 6)) {
      addNotification(
        'weather',
        title,
        `Strong wind conditions are detected in ${data.name}. Consider securing young plants and delaying sensitive field activities. Source: FarmCast weather analysis.`
      );
    }
  }

}

function checkHarvestReminders() {

  if (
    typeof myCrops ===
    'undefined'
  ) {
    return;
  }


  const days =
    Number(
      appSettings
        .harvestReminderDays
    ) ||
    7;


  const today =
    new Date();


  myCrops.forEach(
    crop => {

      if (
        !hasValidCropHarvestDate(
          crop
        )
      ) {
        return;
      }


      const harvestDate =
        new Date(
          `${crop.harvest}T00:00:00`
        );


      const daysLeft =
        Math.ceil(
          (
            harvestDate -
            today
          ) /
          86400000
        );


      if (
        daysLeft < 0 ||
        daysLeft > days
      ) {
        return;
      }


      /*
       * Unique reminder for each
       * saved crop record.
       */
      const reminderKey =
        `harvest:${crop.id}`;


      const alreadyNotifiedToday =
        notifications.some(
          notification => {

            if (
              notification.type !==
              'harvest'
            ) {
              return false;
            }


            if (
              notification.dedupeKey !==
              reminderKey
            ) {
              return false;
            }


            return (
              new Date(
                notification.time
              ).toDateString() ===
              today.toDateString()
            );

          }
        );


      if (
        alreadyNotifiedToday
      ) {
        return;
      }


      const cropName =
        crop.type ||
        'Crop';


      const cropLocation =
        crop.location ||
        'Saved field';


      addNotification(
        'harvest',
        `Harvest Reminder: ${cropName}`,
        `${cropName} at ${cropLocation} is due for harvest in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}. Plan your harvest activities.`,
        null,
        reminderKey
      );

    }
  );

}

function updateNotifBadge() {
  const unread = notifications.filter(n => !n.read).length;
  const badge = document.getElementById('notifBadge');
  if (!badge) return;
  badge.style.display = unread > 0 ? 'block' : 'none';
  badge.textContent   = unread > 9 ? '9+' : unread;
  const footer = document.getElementById('notifFooterText');
  if (footer) footer.textContent = `${unread} unread notification${unread !== 1 ? 's' : ''}`;
}

function renderNotifList() {
  const list = document.getElementById('notifList');
  if (!list) return;

  let filtered = notifications.filter(n => notifFilterCurrent === 'all' || n.type === notifFilterCurrent);

  if (filtered.length === 0) {
    list.innerHTML = '<div class="notif-empty"><span class="material-symbols-outlined">notifications_none</span><p>No notifications yet</p></div>';
    return;
  }

  list.innerHTML = filtered.map(n => {
    const time = timeAgo(new Date(n.time));
    return `
      <div
        class="notif-item${n.read ? '' : ' unread'}${n.type === 'official' ? ' notif-official' : ''}"
        onclick="handleNotifClick('${n.id}')"
      >
      <div
        class="ni-icon type-${n.type}"
      >
        <img
          src="${getNotificationIconPath(
            n.type
          )}"
          alt=""
          class="ni-icon-img"
        >
      </div>

      <div class="ni-body">
        <div class="ni-title">${n.title}</div>
        <div class="ni-text">${n.body}</div>
        <div class="ni-time">${time}</div>
      </div>
      <div class="ni-actions">
        ${!n.read ? '<div class="ni-dot"></div>' : ''}
        <button class="ni-del" onclick="deleteNotif(event, '${n.id}')">
          <span class="material-symbols-outlined" style="font-size:15px">close</span>
        </button>
      </div>
    </div>`;
  }).join('');
}

function timeAgo(date) {
  const diff = Math.floor((Date.now() - date) / 1000);
  if (diff < 60)   return 'Just now';
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400)return `${Math.floor(diff/3600)}h ago`;
  return date.toLocaleDateString('en-PH', { month:'short', day:'numeric' });
}

function markNotifRead(id) {
  const n = notifications.find(
    x => String(x.id) === String(id)
  );

  if (n) {
    n.read = true;
    lsSave(LS_NOTIFS, notifications);
  }

  updateNotifBadge();
  renderNotifList();
}

function markAllNotifRead() {
  notifications.forEach(n => n.read = true);
  lsSave(LS_NOTIFS, notifications);
  updateNotifBadge();
  renderNotifList();
  toast('All notifications marked as read.', 'ok');
}

function handleNotifClick(id) {
  const notif = notifications.find(
    n => String(n.id) === String(id)
  );

  if (!notif) return;

  markNotifRead(id);

  if (
    notif.type === 'official' &&
    notif.sourceUrl
  ) {
    window.open(
      notif.sourceUrl,
      '_blank',
      'noopener,noreferrer'
    );
  }
}


function deleteNotif(e, id) {
  e.stopPropagation();

  notifications = notifications.filter(
    n => String(n.id) !== String(id)
  );

  lsSave(LS_NOTIFS, notifications);
  updateNotifBadge();
  renderNotifList();
}

function clearAllNotif() {
  if (!confirm('Clear all notifications?')) return;

  notifications = [];

  lsSave(LS_NOTIFS, notifications);

  updateNotifBadge();
  renderNotifList();

  toast('All notifications cleared.', 'ok');
}

function filterNotif(el, filter) {
  document.querySelectorAll('.nft').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  notifFilterCurrent = filter;
  renderNotifList();
}

function toggleNotificationPanel() {
  const panel   = document.getElementById('notifPanel');
  const overlay = document.getElementById('notifOverlay');
  const isOpen  = panel.classList.contains('open');
  panel.classList.toggle('open');
  overlay.classList.toggle('show');
  if (!isOpen) {
    renderNotifList();
    updateNotifBadge();
  }
}

// ── INIT — Connect frontend to backend ──
async function initApp() {
  // 1. Apply settings from localStorage first (instant)
  applyAllSettings();
  updateNotifBadge();
  renderNotifList();

  // 2. Load all data from backend (replaces localStorage data)
  const backendReady =
    await loadAllDataFromBackend();

  // Use backend CRUD only when backend data loaded successfully.
  // Otherwise keep the existing localStorage CRUD functions.
  if (backendReady) {
    patchScriptJsWithAPI();
  } else {
    console.warn(
      '⚠️ FarmCast is using local crop data because the backend is unavailable.'
    );
  }
  // 4. Start with default page
  const user = getAuthUser();
  const defaultPage = appSettings.defaultPage || 'dashboard';
  const navEl = document.querySelector(`[data-page="${defaultPage}"]`);
  if (navEl) setNav(navEl, defaultPage);
  else {
    document.getElementById('page-dashboard').style.display = 'block';
    renderTasks();

    fetchWeather(
      appSettings.city ||
      currentCity,

      appSettings.lat,

      appSettings.lon
   );

  }
}

initApp();

// ═══════════════════════════════════════════════════════
// HARVEST HISTORY — Full CRUD + localStorage
// ═══════════════════════════════════════════════════════

const LS_HARVEST    = 'fc_harvestHistory';
const LS_HARVEST_ID = 'fc_nextHarvestId';

const DEFAULT_HARVESTS = [
  { id:1, crop:'Pechay',   date:'2026-02-10', location:'Greenhouse 1',  area:100,  yield:45,  quality:'excellent', notes:'Very healthy batch. Sold at market.' },
  { id:2, crop:'Sitaw',    date:'2026-02-18', location:'West Field',    area:150,  yield:62,  quality:'good',      notes:'Good yield. Minor pest damage on 10%.' },
  { id:3, crop:'Okra',     date:'2026-02-25', location:'Garden Plot',   area:80,   yield:28,  quality:'good',      notes:'First harvest of the season.' },
  { id:4, crop:'Eggplant', date:'2026-03-02', location:'East Lot',      area:200,  yield:110, quality:'excellent', notes:'Best eggplant yield in 2 seasons!' },
  { id:5, crop:'Tomato',   date:'2026-03-08', location:'North Field A', area:300,  yield:185, quality:'good',      notes:'Slight cracking due to irregular watering.' },
  { id:6, crop:'Kamote',   date:'2026-03-12', location:'Back Lot',      area:400,  yield:320, quality:'excellent', notes:'Excellent tuber size. Good market price.' },
  { id:7, crop:'Pechay',   date:'2026-03-14', location:'Greenhouse 1',  area:100,  yield:38,  quality:'poor',      notes:'Affected by root rot after heavy rain.' },
  { id:8, crop:'Corn',     date:'2026-01-15', location:'South Field B', area:500,  yield:430, quality:'good',      notes:'Sweet corn. Sold directly to buyer.' },
];

let harvestHistory = lsLoad(LS_HARVEST,    DEFAULT_HARVESTS);
let nextHarvestId  = lsLoad(LS_HARVEST_ID, 9);
let currentHHFilter = 'all';

function renderHarvestHistory() {
  updateHHStats();
  renderHHTable();
  renderHHYieldChart();
}

function updateHHStats() {
  const totalKg   = harvestHistory.reduce((s,h) => s + Number(h.yield), 0);
  const thisMonth = harvestHistory.filter(h => {
    const d = new Date(h.date), n = new Date();
    return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
  }).length;
  const byYield = {};
  harvestHistory.forEach(h => { byYield[h.crop] = (byYield[h.crop]||0) + Number(h.yield); });
  const bestCrop = Object.entries(byYield).sort((a,b)=>b[1]-a[1])[0];

  document.getElementById('hhTotalHarvests').textContent = harvestHistory.length;
  document.getElementById('hhTotalKg').textContent       = totalKg.toFixed(1) + ' kg';
  document.getElementById('hhThisMonth').textContent     = thisMonth;

  const bestCropEl =
    document.getElementById(
      'hhBestCrop'
    );

  if (bestCropEl) {
 
    if (bestCrop) {

      const bestCropName =
        bestCrop[0];

      bestCropEl.innerHTML = `
        ${getCropIconHtml(
          bestCropName,
          'hh-best-crop-icon-img'
        )}

        <span>
          ${escapeHtml(bestCropName)}
        </span>
      `;

    } else {

      bestCropEl.textContent =
        '—';

    }

  }

}

function renderHHTable() {
  const sortVal = document.getElementById('hhSortSelect')?.value || 'date-desc';
  let filtered  = harvestHistory.filter(h => currentHHFilter === 'all' || h.quality === currentHHFilter);
  filtered = filtered.slice().sort((a,b) => {
    if (sortVal==='date-desc')  return new Date(b.date)-new Date(a.date);
    if (sortVal==='date-asc')   return new Date(a.date)-new Date(b.date);
    if (sortVal==='yield-desc') return Number(b.yield)-Number(a.yield);
    if (sortVal==='crop')       return a.crop.localeCompare(b.crop);
    return 0;
  });

  const qMeta = {
    excellent: {
      label: 'Excellent',
      icon: 'assets/ui/harvest-quality-excellent.svg'
    },

    good: {
      label: 'Good',
      icon: 'assets/ui/harvest-quality-good.svg'
    },

    poor: {
      label: 'Poor',
      icon: 'assets/ui/harvest-quality-poor.svg'
    }
  };

  const qClass = {
    excellent: 'hh-q-excellent',
    good: 'hh-q-good',
    poor: 'hh-q-poor'
  };

  if (filtered.length === 0) {
    document.getElementById('hhTableBody').innerHTML =
      '<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:30px">No harvest records found.</td></tr>';
    return;
  }

  document.getElementById('hhTableBody').innerHTML = filtered.map(h => `
    <tr class="hh-row">

      <td>
        <div class="hh-crop-cell">

          ${getCropIconHtml(
            h.crop,
            'hh-crop-icon-img'
          )}

          <span>
            ${escapeHtml(h.crop)}
          </span>

        </div>
      </td>
      
      <td>${new Date(h.date).toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'})}</td>
      <td><span class="hh-location">${h.location}</span></td>
      <td>${h.area} m²</td>
      
      <td><strong class="hh-yield">${Number(h.yield).toFixed(1)} kg</strong></td>
      
      <td>
        <span
          class="hh-quality ${
            qClass[h.quality] || ''
          }"
        >

          ${
            qMeta[h.quality]
              ? `
                <img
                  src="${qMeta[h.quality].icon}"
                  alt=""
                  class="hh-quality-icon-img"
                >

                <span>
                  ${qMeta[h.quality].label}
                </span>
              `
              : `
                <span>
                  ${escapeHtml(
                    h.quality || 'Unknown'
                  )}
                </span>
              `
          }

        </span>
      </td>

      <td><span class="hh-notes-text">${h.notes||'—'}</span></td>
      <td><button class="hh-del-btn" onclick="deleteHarvest('${h.id}')" title="Delete">
        <span class="material-symbols-outlined" style="font-size:16px">delete</span></button></td>
    </tr>`).join('');
}

function renderHHYieldChart() {
  const byYield = {};
  harvestHistory.forEach(h => { byYield[h.crop] = (byYield[h.crop]||0) + Number(h.yield); });
  const sorted = Object.entries(byYield).sort((a,b)=>b[1]-a[1]);
  const maxY   = sorted[0]?.[1] || 1;
  const colors = ['#3fb950','#58a6ff','#e3a008','#f85149','#ce93d8','#4db8ff','#ffd54f','#a5d6a7'];

  document.getElementById('hhYieldChart').innerHTML = `
    <div class="hyc-bars">
      ${sorted.map(([crop,kg],i) => `
        <div class="hyc-bar-wrap">
          <div class="hyc-val">${kg.toFixed(0)} kg</div>
          <div class="hyc-bar-outer">
            <div class="hyc-bar-fill" style="height:${Math.round((kg/maxY)*100)}%;background:${colors[i%colors.length]}"></div>
          </div>

          <div class="hyc-label">

            ${getCropIconHtml(
              crop,
              'hyc-crop-icon-img'
            )}

            <span>
              ${escapeHtml(crop)}
            </span>

          </div>
        
        </div>`).join('')}
    </div>
    <div class="hyc-total">Combined yield: <strong>${harvestHistory.reduce((s,h)=>s+Number(h.yield),0).toFixed(1)} kg</strong> from ${harvestHistory.length} harvests</div>`;
}

function filterHarvest(el, filter) {
  document.querySelectorAll('.hft').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  currentHHFilter = filter;
  renderHHTable();
}

function deleteHarvest(id) {
  const h = harvestHistory.find(x => x.id===id);
  if (!h || !confirm(`Delete harvest record for ${h.crop}?`)) return;
  harvestHistory = harvestHistory.filter(x => x.id!==id);
  lsSave(LS_HARVEST, harvestHistory);
  renderHarvestHistory();
  toast(`${h.crop} harvest record deleted.`, 'warn');
}

function openLogHarvestModal() {

  const cropSelect =
    document.getElementById(
      'hhCropType'
    );


  if (cropSelect) {

    const crops =
      getMyCropPickerDataset();


    cropSelect.innerHTML =
      '<option value="">Select crop…</option>' +
      crops.map(crop => `

        <option value="${escapeHtml(crop.name)}">
          ${escapeHtml(crop.name)}
        </option>

      `).join('');


    cropSelect.value = '';

  }


  document.getElementById(
    'logHarvestModal'
  ).style.display =
    'flex';


  document.getElementById(
    'hhDate'
  ).value =
    new Date()
      .toISOString()
      .split('T')[0];

}

function closeLogHarvestModal() { document.getElementById('logHarvestModal').style.display = 'none'; }

function saveHarvestLog() {
  const crop    = document.getElementById('hhCropType').value;
  const date    = document.getElementById('hhDate').value;
  const location= document.getElementById('hhLocation').value.trim();
  const area    = parseFloat(document.getElementById('hhArea').value);
  const yieldKg = parseFloat(document.getElementById('hhYield').value);
  const quality = document.getElementById('hhQuality').value;
  const notes   = document.getElementById('hhNotes').value.trim();

  if (!crop||!date||!location||!area||!yieldKg) { toast('Please fill in all required fields.','warn'); return; }
  harvestHistory.push({ id:nextHarvestId++, crop, date, location, area, yield:yieldKg, quality, notes });
  lsSave(LS_HARVEST, harvestHistory);
  lsSave(LS_HARVEST_ID, nextHarvestId);
  closeLogHarvestModal();
  renderHarvestHistory();
  toast(`${crop} harvest logged! 🌾`, 'ok');
}

// ═══════════════════════════════════════════════════════
// FARM ANALYTICS PAGE
// ═══════════════════════════════════════════════════════

let currentAnFilter = 'all';

function renderFarmAnalytics() {
  updateAnKPIs();
  renderAnBarChart();
  renderAnWeatherImpact();
  renderAnLandChart();
  renderAnPerfList();
  renderAnIrrEff();
  renderAnMonthlySummary();
}

function updateAnKPIs() {
  const totalKg    = harvestHistory.reduce((s,h)=>s+Number(h.yield),0);
  const totalWater = (typeof irrFields!=='undefined')
    ? irrFields.reduce((s,f)=>s+(f.type!=='Rain-fed'?f.waterAmt*f.freq:0),0) : 0;
  const excellent  = harvestHistory.filter(h=>h.quality==='excellent').length;
  const yieldRate  = harvestHistory.length>0 ? Math.round((excellent/harvestHistory.length)*100) : 0;
  const pestCount  = (typeof pestLogs!=='undefined') ? pestLogs.length : 0;
  const active     = (typeof myCrops!=='undefined') ? myCrops.length : 0;

  document.getElementById('anTotalHarvest').textContent = totalKg.toFixed(0)+' kg';
  document.getElementById('anHarvestSub').textContent   = `from ${harvestHistory.length} harvest${harvestHistory.length!==1?'s':''}`;
  document.getElementById('anTotalWater').textContent   = totalWater.toLocaleString()+' L';
  document.getElementById('anWaterSub').textContent     = `across ${typeof irrFields!=='undefined'?irrFields.length:0} fields`;
  document.getElementById('anYieldRate').textContent    = yieldRate+'%';
  document.getElementById('anYieldSub').textContent     = `${excellent} excellent of ${harvestHistory.length}`;
  
  document.getElementById(
    'anPestCount'
  ).textContent =
    pestCount;


  const anPestSub =
    document.getElementById(
      'anPestSub'
    );


  if (anPestSub) {

    const isHighPestCount =
      pestCount > 3;

    const pestStatusIcon =
      isHighPestCount
        ? 'assets/ui/pest-status-warning.svg'
        : 'assets/ui/pest-status-low.svg';

    const pestStatusText =
      isHighPestCount
        ? 'Above average'
        : 'Under control';


    anPestSub.innerHTML = `

      <img
        src="${pestStatusIcon}"
        alt=""
        class="an-pest-status-img"
      >

      <span>
        ${pestStatusText}
      </span>

    `;

  }


  document.getElementById(
    'anActiveCrops'
  ).textContent =
    active;

    document.getElementById('anActiveSub').textContent    = `${typeof myCrops!=='undefined'?myCrops.filter(c=>c.watered).length:0} watered today`;
}


function renderAnBarChart() {
  const crops = (typeof myCrops!=='undefined') ? myCrops.filter(c=>{
    if (currentAnFilter==='all') return true;
    const s = getCropStatus(c);
    if (currentAnFilter==='growing') return s.label==='Growing';
    if (currentAnFilter==='ready')   return s.label==='Ready'||s.label==='Overdue';
    return true;
  }) : [];

  if (crops.length===0) {
    document.getElementById('anBarChart').innerHTML =
      '<div style="color:var(--text-muted);text-align:center;padding:30px;font-size:.85rem">No crops to display.</div>';
    return;
  }
  const colors = { green:'#3fb950', amber:'#e3a008', red:'#f85149' };

  document.getElementById('anBarChart').innerHTML = `
    <div class="an-chart-bars">
      ${crops.map(crop => {
        const st = getCropStatus(crop);

        const col =
          colors[st.color] ||
          '#3fb950';

        const hasProgressEstimate =
          st.harvestDateAvailable !== false;

        const progressLabel =
          hasProgressEstimate
            ? `${st.progress}%`
            : 'No estimate';

        return `
          <div class="an-bar-item">

            <div class="an-bar-header">

              <span class="an-bar-crop">

                ${getCropIconHtml(
                  crop.type,
                  'an-bar-crop-img'
                )}

                <span>
                  ${escapeHtml(crop.type)}
                </span>

              </span>

              <span
                class="an-bar-pct"
                style="color:${
                  hasProgressEstimate
                    ? col
                    : 'var(--text-muted)'
                }"
              >
                ${progressLabel}
              </span>

            </div>
          
          <div class="an-bar-track">
            <div
              class="an-bar-fill"
              style="
                width:${
                  hasProgressEstimate
                    ? st.progress
                    : 0
                }%;
                background:${col}
              "
            ></div>
          </div>

          <div class="an-bar-meta">
            <span class="cdc-status status-${st.color}" style="font-size:0.65rem;padding:2px 7px">${st.label}</span>
            <span style="font-size:0.7rem;color:var(--text-muted)">${crop.location} · ${crop.area} m²</span>
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

function setAnFilter(el, filter) {
  document.querySelectorAll('.an-filter-tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  currentAnFilter = filter;
  renderAnBarChart();
}

function renderAnWeatherImpact() {

  const crops =
    (typeof myCrops !== 'undefined')
      ? myCrops
      : [];

  const w =
    currentWeather;


  if (
    !w ||
    crops.length === 0
  ) {

    document.getElementById(
      'anWeatherImpact'
    ).innerHTML =
      '<div style="color:var(--text-muted);text-align:center;padding:20px;font-size:.85rem">Search for a city to see weather impact analysis.</div>';

    return;
  }


  document.getElementById(
    'anWeatherImpact'
  ).innerHTML = `

    <div class="an-wi-list">

      ${crops.map(crop => {

        const assessment =
          getMyCropWeatherAssessment(
            crop.type
          );


        let impact =
          'neutral';

        let iconPath =
          'assets/ui/weather-cloudy.svg';

        let reason =
          'No verified weather limits are stored for this crop.';


        if (
          assessment.available &&
          assessment.atRisk
        ) {

          impact =
            'negative';


          if (
            assessment.reason ===
              'Temperature too low' ||
            assessment.reason ===
              'Cold damage risk'
          ) {

            iconPath =
              'assets/ui/weather-snow.svg';

            reason =
              Number.isFinite(
                assessment.temp
              )
                ? `${assessment.reason} (${Math.round(
                    assessment.temp
                  )}°C).`
                : assessment.reason;

          }

          else if (
            assessment.reason ===
            'Heat stress risk'
          ) {

            iconPath =
              'assets/ui/weather-clear.svg';

            reason =
              Number.isFinite(
                assessment.temp
              )
                ? `Heat stress risk (${Math.round(
                    assessment.temp
                  )}°C).`
                : assessment.reason;

          }

          else if (
            assessment.reason ===
            'High wind risk'
          ) {

            iconPath =
              'assets/ui/at-risk.svg';

            reason =
              Number.isFinite(
                assessment.windKph
              )
                ? `High wind risk (${Math.round(
                    assessment.windKph
                  )} km/h).`
                : assessment.reason;

          }

          else {

            iconPath =
              'assets/ui/at-risk.svg';

            reason =
              assessment.reason ||
              'Current weather may be outside the stored crop limits.';

          }

        }

        else if (
          assessment.available
        ) {

          impact =
            'positive';

          iconPath =
            'assets/ui/pest-status-low.svg';

          reason =
            'Current weather is within the stored crop limits.';

        }

        else {

          impact =
            'neutral';

          iconPath =
            'assets/ui/weather-cloudy.svg';

          reason =
            assessment.reason ===
            'Weather data unavailable'
              ? 'Weather data is currently unavailable.'
              : 'No verified weather limits are stored for this crop.';

        }


        return `

          <div class="an-wi-item ${impact}">

            <div class="an-wi-crop">

              ${getCropIconHtml(
                crop.type,
                'an-wi-crop-img'
              )}

              <span>
                ${escapeHtml(crop.type)}
              </span>

            </div>


            <div class="an-wi-icon">

              <img
                src="${escapeHtml(
                  iconPath
                )}"
                alt=""
                class="an-wi-status-img"
              >

            </div>


            <div class="an-wi-reason">
              ${escapeHtml(reason)}
            </div>

          </div>

        `;

      }).join('')}

    </div>
  `;
}

function renderAnLandChart() {
  const crops = (typeof myCrops!=='undefined') ? myCrops : [];
  if (crops.length===0) {
    document.getElementById('anLandChart').innerHTML =
      '<div style="color:var(--text-muted);text-align:center;padding:20px;font-size:.85rem">No crops added yet.</div>';
    return;
  }
  const totalArea = crops.reduce((s,c)=>s+Number(c.area),0);
  const colors = ['#3fb950','#58a6ff','#e3a008','#f85149','#ce93d8','#4db8ff','#ffd54f','#a5d6a7','#ff8a65','#80cbc4'];

  document.getElementById('anLandChart').innerHTML = `
    <div class="an-land-list">
      ${crops.map((crop,i)=>{
        const pct = totalArea>0 ? Math.round((Number(crop.area)/totalArea)*100) : 0;
        const col = colors[i%colors.length];

        return `
          <div class="an-land-item">

            <div class="an-land-label">

              <span
                class="an-land-dot"
                style="background:${col}"
              ></span>

              <span class="an-land-crop">

                ${getCropIconHtml(
                  crop.type,
                  'an-land-crop-img'
                )}

                <span>
                  ${escapeHtml(crop.type)}
                </span>

              </span>

              <span class="an-land-area">
                ${Number(crop.area).toLocaleString()} m²
              </span>

            </div>


            <div class="an-land-bar-track">

              <div
                class="an-land-bar-fill"
                style="
                  width:${pct}%;
                  background:${col}
                "
              ></div>

            </div>


            <div class="an-land-pct">
              ${pct}%
            </div>

          </div>
        `;

      }).join('')}
      <div class="an-land-total">Total farm area: <strong>${totalArea.toLocaleString()} m²</strong> (${(totalArea/10000).toFixed(2)} ha)</div>
    </div>`;
}

function renderAnPerfList() {

  const byYield = {};

  harvestHistory.forEach(h => {
    byYield[h.crop] =
      (byYield[h.crop] || 0) +
      Number(h.yield);
  });


  const sorted =
    Object.entries(byYield)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);


  const rankIcons = [
    'assets/ui/analytics-rank-1.svg',
    'assets/ui/analytics-rank-2.svg',
    'assets/ui/analytics-rank-3.svg',
    'assets/ui/analytics-rank-4.svg',
    'assets/ui/analytics-rank-5.svg',
    'assets/ui/analytics-rank-6.svg'
  ];


  if (sorted.length === 0) {

    document.getElementById(
      'anPerfList'
    ).innerHTML =
      '<div style="color:var(--text-muted);text-align:center;padding:20px;font-size:.85rem">No harvest data yet. Log your first harvest!</div>';

    return;
  }


  const maxY =
    sorted[0][1];


  document.getElementById(
    'anPerfList'
  ).innerHTML = `

    <div class="an-perf-items">

      ${sorted.map(([crop, kg], i) => `

        <div class="an-perf-item">

          <span class="an-perf-medal">
            <img
              src="${rankIcons[i]}"
              alt="Rank ${i + 1}"
              class="an-perf-rank-img"
            >
          </span>


          <span class="an-perf-crop">

            ${getCropIconHtml(
              crop,
              'an-perf-crop-img'
            )}

            <span>
              ${escapeHtml(crop)}
            </span>

          </span>


          <div class="an-perf-bar-track">
            <div
              class="an-perf-bar"
              style="width:${Math.round(
                (kg / maxY) * 100
              )}%"
            ></div>
          </div>


          <span class="an-perf-kg">
            ${kg.toFixed(0)} kg
          </span>

        </div>

      `).join('')}

    </div>
  `;
}

function renderAnIrrEff() {
  const fields = (typeof irrFields!=='undefined') ? irrFields : [];
  if (fields.length===0) {
    document.getElementById('anIrrEff').innerHTML =
      '<div style="color:var(--text-muted);text-align:center;padding:20px;font-size:.85rem">No irrigation fields added yet.</div>';
    return;
  }
  const effMap = { 'Drip':92, 'Sprinkler':75, 'Flood':55, 'Manual':68, 'Rain-fed':100 };
  document.getElementById('anIrrEff').innerHTML = `
    <div class="an-irr-list">
      ${fields.map(f=>{
        const eff = effMap[f.type]||70;
        const col = eff>=85?'var(--green)':eff>=65?'var(--amber)':'var(--red)';
        return `<div class="an-irr-item">
          <div class="an-irr-top"><span class="an-irr-name">${f.name}</span><span class="an-irr-eff-val" style="color:${col}">${eff}% efficient</span></div>
          <div class="an-irr-type">${f.type} · ${f.crop} · ${f.area} m²</div>
          <div class="an-irr-bar-track"><div class="an-irr-bar-fill" style="width:${eff}%;background:${col}"></div></div>
        </div>`;
      }).join('')}
    </div>
    <div class="an-irr-note">Efficiency = water delivered to crop roots vs total applied</div>`;
}

function renderAnMonthlySummary() {
  const months = [];
  const now = new Date();
  for (let i=4; i>=0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth()-i, 1);
    const m=d.getMonth(), y=d.getFullYear();
    const label = d.toLocaleDateString('en-PH',{month:'short',year:'numeric'});
    const harvests = harvestHistory.filter(h=>{ const hd=new Date(h.date); return hd.getMonth()===m&&hd.getFullYear()===y; });
    const totalKg  = harvests.reduce((s,h)=>s+Number(h.yield),0);
    const pests    = (typeof pestLogs!=='undefined') ? pestLogs.filter(l=>{ const ld=new Date(l.date); return ld.getMonth()===m&&ld.getFullYear()===y; }).length : 0;
    months.push({ label, harvests:harvests.length, totalKg, pests });
  }
  document.getElementById('anMonthlySummary').innerHTML = `
    <div class="an-monthly-list">
      ${months.map(m=>`
        <div class="an-monthly-row">
          <div class="an-month-label">${m.label}</div>

          <div class="an-month-stats">

            <span class="an-ms-item green">

              <img
                src="assets/ui/analytics-harvest.svg"
                alt=""
                class="an-ms-icon-img"
              >

              <span>
                ${m.harvests} harvests
              </span>

            </span>


            <span class="an-ms-item blue">

              <img
                src="assets/ui/analytics-yield.svg"
                alt=""
                class="an-ms-icon-img"
              >

              <span>
                ${m.totalKg.toFixed(0)} kg
              </span>

            </span>


            <span
              class="an-ms-item ${
                m.pests > 3
                  ? 'red'
                  : 'muted'
              }"
            >

              <img
                src="assets/ui/analytics-pest.svg"
                alt=""
                class="an-ms-icon-img"
              >

              <span>
                ${m.pests} pests
              </span>

            </span>

          </div>

        </div>`).join('')}
    </div>`;
}

// ═══════════════════════════════════════════════════════
// AI CROP DISEASE DETECTION — TensorFlow.js
// ═══════════════════════════════════════════════════════

// Disease database with Philippine-relevant crop diseases
const DISEASE_DB = {
  // Tomato diseases
  'Tomato': {
    diseases: [
      { name: 'Tomato Late Blight',       keywords: ['blight','dark','brown','lesion'],     severity: 'high',   color: 'red'   },
      { name: 'Tomato Early Blight',       keywords: ['spot','ring','yellow','leaf'],        severity: 'medium', color: 'amber' },
      { name: 'Tomato Leaf Curl Virus',    keywords: ['curl','yellow','mosaic','virus'],     severity: 'high',   color: 'red'   },
      { name: 'Tomato Healthy',            keywords: ['green','fresh','healthy','vibrant'],  severity: 'none',   color: 'green' },
    ]
  },
  'Corn': {
    diseases: [
      { name: 'Corn Gray Leaf Spot',       keywords: ['gray','spot','streak','lesion'],      severity: 'medium', color: 'amber' },
      { name: 'Corn Northern Blight',      keywords: ['blight','brown','cigar','lesion'],    severity: 'high',   color: 'red'   },
      { name: 'Corn Smut',                 keywords: ['gall','black','smut','fungus'],       severity: 'high',   color: 'red'   },
      { name: 'Corn Healthy',              keywords: ['green','fresh','corn','leaf'],        severity: 'none',   color: 'green' },
    ]
  },
  'Rice': {
    diseases: [
      { name: 'Rice Blast',                keywords: ['blast','diamond','gray','lesion'],    severity: 'high',   color: 'red'   },
      { name: 'Rice Brown Spot',           keywords: ['brown','spot','oval','lesion'],       severity: 'medium', color: 'amber' },
      { name: 'Rice Bacterial Blight',     keywords: ['yellow','wilt','blight','water'],     severity: 'high',   color: 'red'   },
      { name: 'Rice Healthy',              keywords: ['green','fresh','rice','paddy'],       severity: 'none',   color: 'green' },
    ]
  },
  'Eggplant': {
    diseases: [
      { name: 'Eggplant Phomopsis Blight', keywords: ['blight','brown','fruit','stem'],     severity: 'high',   color: 'red'   },
      { name: 'Eggplant Cercospora Spot',  keywords: ['spot','circle','gray','yellow'],     severity: 'medium', color: 'amber' },
      { name: 'Eggplant Healthy',          keywords: ['green','fresh','purple','healthy'],  severity: 'none',   color: 'green' },
    ]
  },
  'Pechay': {
    diseases: [
      { name: 'Pechay Downy Mildew',       keywords: ['mildew','yellow','gray','fuzzy'],    severity: 'medium', color: 'amber' },
      { name: 'Pechay Black Rot',          keywords: ['black','rot','vein','yellow'],       severity: 'high',   color: 'red'   },
      { name: 'Pechay Healthy',            keywords: ['green','fresh','leafy','healthy'],   severity: 'none',   color: 'green' },
    ]
  },
};

// Treatment recommendations per severity
const TREATMENTS = {
  high: [
    '🚨 Isolate affected plants immediately to prevent spread',
    '💊 Apply appropriate fungicide/bactericide (consult local agronomist)',
    '🗑️ Remove and destroy severely infected plant parts',
    '📋 Document and report to your local DA extension office',
    '🔄 Do not replant same crop in affected area for 1 season',
  ],
  medium: [
    '⚠️ Monitor affected plants daily for progression',
    '🌿 Apply neem oil or organic fungicide as preventive measure',
    '✂️ Prune and remove infected leaves carefully',
    '💧 Reduce overhead watering — water at base of plant',
    '🌬️ Improve air circulation between plants',
  ],
  none: [
    '✅ Continue current farming practices',
    '💧 Maintain regular watering schedule',
    '🌱 Apply balanced fertilizer as scheduled',
    '🔍 Keep monitoring every 3-5 days for early detection',
    '📅 Next scheduled check: in 3 days',
  ],
};


// ── OPEN AI DETECT MODAL ──
async function openAIDetect(cropId, cropType) {
  aiCurrentCropId   = cropId;
  aiCurrentCropType = cropType;
  aiImageData       = null;

  // Set crop info
  const aiCropIcon =
    document.getElementById(
      'aiCropEmoji'
    );

  const aiCropName =
    document.getElementById(
      'aiCropName'
    );


  if (aiCropIcon) {

    aiCropIcon.innerHTML =
      getCropIconHtml(
        cropType,
        'ai-crop-icon-img'
      );

  }


  if (aiCropName) {

    aiCropName.textContent =
      cropType;

  }

  // Reset modal state
  showAISection('upload');
  document.getElementById('aiAnalyzeBtn').style.display = 'none';

  // Update model status
  const statusEl = document.getElementById('aiModelStatus');
  if (aiReady) {
    statusEl.innerHTML = '<span class="material-symbols-outlined" style="font-size:14px;color:var(--green)">check_circle</span> AI Ready';
    statusEl.className = 'ai-model-status ready';
  } else {
    statusEl.innerHTML = '<span class="material-symbols-outlined" style="font-size:14px">downloading</span> Loading AI…';
    statusEl.className = 'ai-model-status loading';
    // Pre-load model in background
    loadAIModel();
  }

  document.getElementById('aiDetectModal').style.display = 'flex';
}

function closeAIDetect() {
  document.getElementById('aiDetectModal').style.display = 'none';
  closeAICamera();
  aiImageData = null;
}

// ── SHOW/HIDE SECTIONS ──
function showAISection(section) {
  document.getElementById('aiUploadArea').style.display  = section === 'upload'   ? 'flex' : 'none';
  document.getElementById('aiCameraWrap').style.display  = section === 'camera'   ? 'flex' : 'none';
  document.getElementById('aiPreviewWrap').style.display = section === 'preview'  ? 'flex' : 'none';
  document.getElementById('aiAnalyzing').style.display   = section === 'analyzing'? 'flex' : 'none';
  document.getElementById('aiResult').style.display      = section === 'result'   ? 'flex' : 'none';
}

// ── Roboflow removed – replaced with Python server call ──

// Kept for compatibility – no model loading needed
async function loadAIModel() {
  aiReady = true;
  return true;
}

// ── CAMERA FUNCTIONS ──
async function openAICamera() {
  try {
    aiCameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    document.getElementById('aiCameraVideo').srcObject = aiCameraStream;
    showAISection('camera');
  } catch (err) {
    toast('Camera access denied. Please use file upload instead.', 'warn');
  }
}

function closeAICamera() {
  if (aiCameraStream) {
    aiCameraStream.getTracks().forEach(t => t.stop());
    aiCameraStream = null;
  }
  if (document.getElementById('aiCameraWrap').style.display !== 'none') {
    showAISection('upload');
  }
}

function captureAIPhoto() {
  const video  = document.getElementById('aiCameraVideo');
  const canvas = document.getElementById('aiCameraCanvas');
  canvas.width  = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  aiImageData = canvas.toDataURL('image/jpeg', 0.9);
  closeAICamera();
  showPreview(aiImageData);
}

// ── FILE UPLOAD ──
function handleAIFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    toast('Please select an image file.', 'warn'); return;
  }
  if (file.size > 10 * 1024 * 1024) {
    toast('Image too large. Please use a photo under 10MB.', 'warn'); return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    aiImageData = e.target.result;
    showPreview(aiImageData);
  };
  reader.readAsDataURL(file);
  // Reset file input
  event.target.value = '';
}

function showPreview(src) {
  document.getElementById('aiPreviewImg').src = src;
  showAISection('preview');
  document.getElementById('aiAnalyzeBtn').style.display = 'flex';
}

function retakeAIPhoto() {
  aiImageData = null;
  document.getElementById('aiAnalyzeBtn').style.display = 'none';
  showAISection('upload');
}

// ── RUN AI DETECTION (using Python server, not Roboflow) ──
async function runAIDetection() {
  if (!aiImageData) { toast('Please take or upload a photo first.', 'warn'); return; }

  showAISection('analyzing');
  document.getElementById('aiAnalyzeBtn').style.display = 'none';
  document.getElementById('aiAnalyzingSub').textContent = 'Connecting to AI server…';

  try {
    document.getElementById('aiAnalyzingSub').textContent = 'Analyzing plant with FarmCast AI…';

    // Use the same Python server as the scanner
    const result = await scanWithPythonAI(aiImageData);

    if (!result.success) {
      throw new Error(result.error || 'AI server returned an error');
    }

    // Extract plant and disease info from result
    const analysis   = result.analysis   || {};
    const detections = result.detections || [];

    if (!analysis || !analysis.health_status) {
      throw new Error('AI server returned no reliable analysis.');
    }

    const healthStatus =
      analysis.health_status ||
      'Unable to determine';
    const severity     = analysis.severity || 'unknown';
    const confidence   = Number(analysis.confidence ?? 0);

    let color = 'amber';

    if (healthStatus === 'Healthy') {
  color = 'green';
    } else if (healthStatus === 'No specific disease detected') {
  color = 'green';
    } else if (healthStatus === 'Unable to determine') {
  color = 'amber';
    } else if (severity === 'high') {
  color = 'red';
    } else if (severity === 'medium') {
  color = 'amber';
    }

    const disease = {
      name:        healthStatus,
      severity:    severity,
      confidence:  confidence,
      color:       color,
      treatments:  Array.isArray(analysis.treatments)
        ? analysis.treatments
        : [],
      description: analysis.description || '',
    };

    await new Promise(r => setTimeout(r, 300));
    showAIResult(disease, detections);

  } catch (err) {
    console.error('AI Detection error:', err);
    // No fallback simulation – show error
    toast(`AI analysis failed: ${err.message}`, 'err');
    showAISection('upload');
    document.getElementById('aiAnalyzeBtn').style.display = 'flex';
  }
}

// ── MATCH DISEASE FROM PREDICTIONS (REMOVED simulation) ──
function matchDiseaseFromPredictions(predictions, cropType) {
  // No longer used – kept for compatibility
  return null;
}

// ── SHOW AI RESULT ──
function showAIResult(disease, rawPredictions) {
  showAISection('result');
  document.getElementById('aiAnalyzeBtn').style.display = 'none';

  const isHealthy = disease.severity === 'none';
  const colorMap  = { red: '#f85149', amber: '#e3a008', green: '#3fb950' };
  const col       = colorMap[disease.color] || '#3fb950';

  // Header
  document.getElementById('aiResultIcon').textContent   = isHealthy ? '✅' : disease.severity === 'high' ? '🚨' : '⚠️';
  document.getElementById('aiResultStatus').textContent = disease.name;
  document.getElementById('aiResultStatus').style.color = col;
  document.getElementById('aiResultConf').textContent   = `${Number(disease.confidence ?? 0)}% AI confidence`;

  // Disease card
  const diseaseCard = document.getElementById('aiDiseaseCard');
  if (!isHealthy) {
    diseaseCard.style.display = 'block';
    diseaseCard.style.borderColor = col;
    document.getElementById('aiDiseaseName').textContent  = `🦠 ${disease.name}`;
    document.getElementById('aiDiseaseName').style.color  = col;
    document.getElementById('aiDiseaseDesc').textContent  =
      `Severity: ${disease.severity.toUpperCase()} — ${
        disease.severity === 'high'
          ? 'Immediate action required to prevent crop loss.'
          : 'Monitor closely and apply treatment to prevent spreading.'
      }`;
  } else {
    diseaseCard.style.display = 'none';
  }

  // Recommendations
  const recs = disease.treatments && disease.treatments.length > 0
    ? disease.treatments.map(r => `<div class="ai-rec-item">${r}</div>`)
    : TREATMENTS[disease.severity]?.map(r => `<div class="ai-rec-item">${r}</div>`) || [];
  document.getElementById('aiRecsList').innerHTML = recs.join('');

  // Add to pest log if disease detected
 if (!isHealthy && aiCurrentCropType) {
   const crop = myCrops.find(
     c => String(c._id || c.id) === String(aiCurrentCropId)
   );

  const confidence = Number.isFinite(Number(disease.confidence))
    ? `${Number(disease.confidence).toFixed(1)}%`
    : null;

  addNotification(
    'plant-health',
    `🦠 Possible ${disease.name}`,
    `The AI scanner identified signs consistent with ${disease.name} on ${aiCurrentCropType} at ${crop?.location || 'your farm'}.${confidence ? ` Confidence: ${confidence}.` : ''} Inspect the plant and review the scan result before taking action.`
  );

  toast(
    `⚠️ Possible ${disease.name} detected on ${aiCurrentCropType}. Check notifications.`,
    'warn'
  );
} else if (isHealthy) {
    toast(`✅ ${aiCurrentCropType} looks healthy! No disease detected.`, 'ok');
  }
}


// PLANT HEALTH SCANNER — Real-time Object Detection
// Uses the Python FastAPI AI server with local YOLO models

// ── STATE ──
let scannerCamStream   = null;
let scannerImageData   = null;
let scannerHistory     = [];
let currentScanResult  = null;
let rtDetectionLoop    = null; // real-time loop handle
let rtIsRunning        = false;
let rtCanvas           = null;
let rtCtx              = null;
let rtLastCapture      = 0;
const RT_INTERVAL      = 3500; // ms between API calls (3.5s for Render free tier)

// Colors for bounding boxes
const BOX_COLORS = {
  plant:   '#3fb950', // green for plant identification
  disease: '#f85149', // red for disease
  healthy: '#58a6ff', // blue for healthy
};

// ── INIT SCANNER PAGE ──
function initScannerPage() {
  resetScanner();
  loadScanHistory();
  // Update model status
  const statusEl  = document.getElementById('scannerModelStatus');
  const statusTxt = document.getElementById('scannerModelText');
  if (statusEl) {
    statusEl.className    = 'scanner-model-status ready';
    statusTxt.textContent = '🌿 AI Server Ready';
  }
}

// ── SCAN AGAIN ──
async function scanAgain() {
  // Reset previous result and realtime state
  resetScanner();

  // Open camera again.
  // openScannerCamera() will restart realtime detection
  // once the video metadata is ready.
  await openScannerCamera();
}

// ── RESET SCANNER ──
function resetScanner() {
  stopRealTimeDetection();
  scannerImageData = null;
  document.getElementById('sdzContent').style.display           = 'flex';
  document.getElementById('scannerCameraView').style.display    = 'none';
  document.getElementById('scannerPreviewView').style.display   = 'none';
  document.getElementById('scannerAnalyzingView').style.display = 'none';
  document.getElementById('scannerResultCard').style.display    = 'none';
  // Show empty state on right panel
  const emptyEl = document.getElementById('scannerRightEmpty');
  if (emptyEl) emptyEl.style.display = 'flex';
  // Clear RT canvas
  const rtCanvasEl = document.getElementById('rtDetectionCanvas');
  if (rtCanvasEl) rtCanvasEl.style.display = 'none';
}

// ── OPEN CAMERA (Real-time) ──
async function openScannerCamera() {
  try {
    scannerCamStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    const video = document.getElementById('scannerVideo');
    video.srcObject = scannerCamStream;

    document.getElementById('sdzContent').style.display         = 'none';
    document.getElementById('scannerCameraView').style.display  = 'flex';

    // Start real-time detection after video loads
    video.onloadedmetadata = () => {
      startRealTimeDetection();
    };
  } catch (err) {
    toast('Camera access denied. Please use file upload.', 'warn');
  }
}

function closeScannerCamera() {
  stopRealTimeDetection();
  if (scannerCamStream) {
    scannerCamStream.getTracks().forEach(t => t.stop());
    scannerCamStream = null;
  }
  document.getElementById('scannerCameraView').style.display = 'none';
  document.getElementById('sdzContent').style.display        = 'flex';
  // Hide RT canvas
  const rtCanvasEl = document.getElementById('rtDetectionCanvas');
  if (rtCanvasEl) rtCanvasEl.style.display = 'none';
}

// ── REAL-TIME DETECTION LOOP ──
// ── UPDATED REAL-TIME DETECTION LOOP (WITH OVERLAY Z-INDEX FIX) ──
// ── SEQUENTIAL REAL-TIME DETECTION (PREVENTS OVERLOAD & 502 ERRORS) ──
// ── REAL-TIME DETECTION LOOP (FIXED CANVAS ID MATCHING) ──
let isDetectingFrame = false;

function startRealTimeDetection() {
  if (rtIsRunning) return;
  rtIsRunning = true;
  isDetectingFrame = false;

  let rtCanvasEl = document.getElementById('rtDetectionCanvas');
  const cameraWrap = document.getElementById('scannerCameraView');

  if (!rtCanvasEl && cameraWrap) {
    rtCanvasEl = document.createElement('canvas');
    rtCanvasEl.id = 'rtDetectionCanvas';
    rtCanvasEl.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; z-index:10; pointer-events:none; border-radius:var(--r);';
    cameraWrap.style.position = 'relative';
    cameraWrap.appendChild(rtCanvasEl);
  } else if (rtCanvasEl) {
    rtCanvasEl.style.display = 'block';
    rtCanvasEl.style.zIndex = '10';
  }

  rtCanvas = rtCanvasEl;
  if (rtCanvas) {
    rtCtx = rtCanvas.getContext('2d');
  }

  const statusBadge =
    document.getElementById(
      'rtStatusBadge'
    );

  const statusText =
    document.getElementById(
      'rtStatusText'
    );

  if (statusBadge) {
    statusBadge.className =
      'rt-status-badge detecting';
  }

  if (statusText) {
    statusText.textContent =
      'Detecting…';
  }

  // Poll local AI server every 200ms for active bounding boxes
  rtDetectionLoop = setInterval(async () => {
    if (!rtIsRunning || isDetectingFrame) return;
    await runRealTimeFrame();
  }, 200);
}

// ── STOP REAL-TIME DETECTION (Clean Reset) ──
function stopRealTimeDetection() {
  rtIsRunning = false;
  isDetectingFrame = false; // Reset lock flag for future camera sessions

  // Clear interval loop
  if (rtDetectionLoop) { 
    clearInterval(rtDetectionLoop); 
    rtDetectionLoop = null; 
  }

  // Clear and hide canvas overlay
  const rtCanvasEl = document.getElementById('rtDetectionCanvas') || rtCanvas;
  if (rtCanvasEl) {
    const ctx = rtCanvasEl.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, rtCanvasEl.width, rtCanvasEl.height);
    }
    rtCanvasEl.style.display = 'none'; // Hide overlay completely
  }
}

// Prevent overlapping real-time AI requests
let rtDetectionBusy = false;

// ── REAL-TIME FRAME RUNNER ──
async function runRealTimeFrame() {
  if (rtDetectionBusy) return;

  const video = document.getElementById('scannerVideo');
  if (!video || !video.videoWidth || !video.videoHeight) return;

  const capCanvas = document.getElementById('scannerCanvas');
  let rtCanvas = document.getElementById('rtDetectionCanvas');
  const cameraWrap = document.getElementById('scannerCameraView');

  // Ensure overlay canvas exists
  if (!rtCanvas && cameraWrap) {
    rtCanvas = document.createElement('canvas');
    rtCanvas.id = 'rtDetectionCanvas';

    rtCanvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      pointer-events: none;
      border-radius: var(--r);
    `;

    cameraWrap.style.position = 'relative';
    cameraWrap.appendChild(rtCanvas);

  } else if (rtCanvas) {
    rtCanvas.style.display = 'block';
    rtCanvas.style.zIndex = '10';
  }

  if (!capCanvas || !rtCanvas) return;

  rtDetectionBusy = true;

  try {
    // ── Capture camera frame ──
    capCanvas.width = video.videoWidth;
    capCanvas.height = video.videoHeight;

    const capCtx = capCanvas.getContext('2d');
    capCtx.drawImage(
      video,
      0,
      0,
      capCanvas.width,
      capCanvas.height
    );

    // ── Match overlay to displayed video size ──
    const rect = video.getBoundingClientRect();

    const displayWidth = Math.round(rect.width);
    const displayHeight = Math.round(rect.height);

    if (displayWidth <= 0 || displayHeight <= 0) {
      return;
    }

    if (
      rtCanvas.width !== displayWidth ||
      rtCanvas.height !== displayHeight
    ) {
      rtCanvas.width = displayWidth;
      rtCanvas.height = displayHeight;

      console.log(
        `[RT] Canvas resized to ${displayWidth}x${displayHeight}`
      );
    }

    // ── Convert frame to JPEG ──
    const blob = await new Promise(resolve =>
      capCanvas.toBlob(resolve, 'image/jpeg', 0.65)
    );

    if (!blob) {
      throw new Error('Unable to capture camera frame.');
    }

    const formData = new FormData();
    formData.append('file', blob, 'frame.jpg');

    // ── Send to crop detector ──
    const res = await fetch(`${AI_SERVER_URL}/detect`, { // ito  kasi url rin to sya para sa detect, kapag inadapt mo yung url sa taas
        method: 'POST',
        body: formData
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    const detections = Array.isArray(data.detections)
      ? data.detections
      : [];

    const ctx = rtCanvas.getContext('2d');

    // Clear only AFTER we have a new response
    ctx.clearRect(
      0,
      0,
      rtCanvas.width,
      rtCanvas.height
    );

    // ── No crop detected ──
    if (detections.length === 0) {
      const labelEl =
        document.getElementById(
          'rtLiveLabels'
        );

      if (labelEl) {
        labelEl.innerHTML = `
          <span class="rt-label-empty rt-label-empty-state">

            <img
              src="assets/ui/scanner-detect.svg"
              alt=""
              class="rt-label-empty-icon"
            >

            <span>
              No supported crop detected
            </span>

          </span>
        `;
      }

      return;
    }

    // /detect is now crop detection only
    const plantPreds = [];

    detections.forEach(det => {
      if (!det.bbox || !det.label) return;

      const bbox = det.bbox;

      plantPreds.push({
        class: String(det.label),
        confidence: Number(det.confidence ?? 0),

        // Backend bbox uses normalized TOP-LEFT x/y
        x: Number(bbox.x) * rtCanvas.width,
        y: Number(bbox.y) * rtCanvas.height,

        width:
          Number(bbox.width) * rtCanvas.width,

        height:
          Number(bbox.height) * rtCanvas.height
      });
    });

    console.log('[RT] Crop predictions:', plantPreds);

    // Crop detector = green boxes
    drawBoundingBoxes(
      plantPreds,
      '#3fb950',
      'plant'
    );

    if (typeof updateRTLabels === 'function') {
      updateRTLabels(plantPreds, []);
    }

  } catch (err) {
    console.warn('[RT] Detection error:', err);

    const labelEl =
      document.getElementById('rtLiveLabels');

    if (labelEl) {
      labelEl.innerHTML = `
        <span class="rt-label-empty rt-label-empty-state error">

          <img
            src="assets/ui/at-risk.svg"
            alt=""
            class="rt-label-empty-icon"
          >

          <span>
            Detection unavailable
          </span>

        </span>
      `;
    }

  } finally {
    rtDetectionBusy = false;
  }
}

// ── UPDATED DRAW BOUNDING BOXES (DeepSeek Fix) ──
function drawBoundingBoxes(predictions, color, type) {
  const rtCanvasEl = document.getElementById('rtDetectionCanvas');
  if (!rtCanvasEl || !predictions || predictions.length === 0) return;

  const ctx = rtCanvasEl.getContext('2d');
  if (rtCanvasEl.width === 0 || rtCanvasEl.height === 0) {
    console.warn('[drawBBox] Canvas zero size');
    return;
  }

  predictions.forEach(pred => {
    const conf = Math.round(pred.confidence);
    if (conf < 10) return; // Lower threshold to ensure rendering

    const x = pred.x, y = pred.y, w = pred.width, h = pred.height;
    if (x + w < 0 || y + h < 0 || x > rtCanvasEl.width || y > rtCanvasEl.height) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, w, h);

    const label = `${pred.class} (${conf}%)`;
    ctx.font = 'bold 13px "DM Sans", sans-serif';
    const tw = ctx.measureText(label).width;
    const labelY = Math.max(0, y - 22);
    ctx.fillStyle = color;
    ctx.fillRect(x, labelY, tw + 12, 22);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(label, x + 6, Math.max(15, labelY + 16));

    const cs = 10;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x, y+cs); ctx.lineTo(x, y); ctx.lineTo(x+cs, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x+w-cs, y); ctx.lineTo(x+w, y); ctx.lineTo(x+w, y+cs); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y+h-cs); ctx.lineTo(x, y+h); ctx.lineTo(x+cs, y+h); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x+w-cs, y+h); ctx.lineTo(x+w, y+h); ctx.lineTo(x+w, y+h-cs); ctx.stroke();
  });
}

// ── UPDATE LIVE LABELS BELOW CAMERA ──
function updateRTLabels(plantPreds, diseasePreds) {
  const labelEl = document.getElementById('rtLiveLabels');
  if (!labelEl) return;

  const allPreds = [
    ...plantPreds.map(p   => ({ ...p, type: 'plant' })),
    ...diseasePreds.map(p => ({ ...p, type: 'disease' }))
  ]
    .filter(p => Number(p.confidence ?? 0) > 0)
    .sort((a, b) => Number(b.confidence ?? 0) - Number(a.confidence ?? 0))
    .slice(0, 5);

  if (allPreds.length === 0) {
    labelEl.innerHTML =
      '<span class="rt-label-empty">Point camera at a plant…</span>';
    return;
  }

  labelEl.innerHTML = allPreds.map(p => {
    const conf = Math.round(Number(p.confidence ?? 0));

    const color =
      p.type === 'disease' ? 'red' : 'green';

    const iconSrc =
      p.type === 'disease'
        ? 'assets/ui/scanner-disease.svg'
        : 'assets/ui/scanner-leaf.svg';

    const label =
      p.class || p.label || 'Unknown';

    return `
      <span class="rt-label-tag ${color}">

        <img
          src="${iconSrc}"
          alt=""
          class="rt-label-tag-icon"
        >

        <span>
          ${label}
        </span>

        <strong>
          ${conf}%
        </strong>

      </span>
    `;

  }).join('');
}

// ── CAPTURE PHOTO from live camera ──
function captureScannerPhoto() {
  stopRealTimeDetection();
  const video  = document.getElementById('scannerVideo');
  const canvas = document.getElementById('scannerCanvas');
  canvas.width  = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  scannerImageData = canvas.toDataURL('image/jpeg', 0.9);

  // Stop camera after capture
  if (scannerCamStream) {
    scannerCamStream.getTracks().forEach(t => t.stop());
    scannerCamStream = null;
  }
  document.getElementById('scannerCameraView').style.display   = 'none';
  const rtCanvasEl = document.getElementById('rtDetectionCanvas');
  if (rtCanvasEl) rtCanvasEl.style.display = 'none';

  showScannerPreview(scannerImageData);
}

// ── FILE UPLOAD ──
function handleScannerFile(event) {
  const file = event.target.files[0];
  if (!file || !file.type.startsWith('image/')) { toast('Please select an image.', 'warn'); return; }
  const reader = new FileReader();
  reader.onload = (e) => { scannerImageData = e.target.result; showScannerPreview(scannerImageData); };
  reader.readAsDataURL(file);
  event.target.value = '';
}

function handleScannerDrop(event) {
  event.preventDefault();
  document.getElementById('scannerDropzone').classList.remove('drag-over');
  const file = event.dataTransfer.files[0];
  if (!file || !file.type.startsWith('image/')) { toast('Please drop an image file.', 'warn'); return; }
  const reader = new FileReader();
  reader.onload = (e) => { scannerImageData = e.target.result; showScannerPreview(scannerImageData); };
  reader.readAsDataURL(file);
}

function showScannerPreview(src) {
  document.getElementById('sdzContent').style.display          = 'none';
  document.getElementById('scannerPreviewView').style.display  = 'flex';
  document.getElementById('scannerPreviewImg').src             = src;
}

// ==========================================
// 1. HELPER: Convert Base64/DataURI to Blob
// ==========================================
function dataURItoBlob(dataURI) {
    if (!dataURI) return null;
    if (dataURI instanceof Blob) return dataURI;

    try {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        
        return new Blob([ab], { type: mimeString });
    } catch (e) {
        console.error("Error converting image data to Blob:", e);
        return null;
    }
}

// ==========================================
// 2. MAIN AI SCAN FUNCTION (Fixes Blob Error)
// ==========================================
async function scanWithPythonAI(imageData) {
    const imageBlob = dataURItoBlob(imageData);

    if (!imageBlob) {
        throw new Error("Invalid image format. Please capture or upload a photo again.");
    }

    const formData = new FormData();
    formData.append('file', imageBlob, 'capture.jpg');

    // Direktang nakaturo sa Localhost Port 8000
    const response = await fetch(`${AI_SERVER_URL}/scan`, { // ito kasi, url kapag binago mo yung url sa live deploymeent, meron karing iaadapt dito, na fetch sa python server na nagrurun sa backend
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error(`AI Server error: ${response.status}`);
    }

    return await response.json();
}

// ==========================================
// 3. RUN PLANT SCAN HANDLER
// ==========================================
async function runPlantScan() {
    if (!scannerImageData) { 
        toast('Please provide a plant photo first.', 'warn'); 
        return; 
    }

    document.getElementById('scannerPreviewView').style.display    = 'none';
    document.getElementById('scannerAnalyzingView').style.display  = 'flex';
    document.getElementById('scannerAnalyzingImg').src             = scannerImageData;
    document.getElementById('scannerAnalyzingSub').textContent     = '🤖 Running FarmCast AI scan…';
    document.getElementById('scannerResultCard').style.display     = 'none';

    try {
        document.getElementById('scannerAnalyzingSub').textContent = '🐍 Analyzing plant…';

        // Call Python AI Server with converted image payload
        const result = await scanWithPythonAI(scannerImageData);
        console.log('Python AI result:', result);

        if (!result.success) {
            throw new Error(result.error || 'AI server error');
        }

        const analysis   = result.analysis   || {};
        const detections = result.detections || [];

       if (!analysis || !analysis.health_status) {
           throw new Error('AI server returned no reliable analysis.');
       }

       const identified = {
           name: analysis.plant_name || 'Unknown',
           emoji: getPlantEmoji(analysis.plant_name || 'Unknown'),
           type: analysis.plant_type || 'Crop',
           confidence: Number(analysis.confidence ?? 0),
       };

       const healthStatus = String(
           analysis.health_status || 'Unable to determine'
       ).trim();

       const severity = String(
           analysis.severity || 'unknown'
       ).toLowerCase();

       const confidence = Number(
           analysis.confidence ?? 0
       );

       let color = 'amber';

       if (
          healthStatus === 'Healthy' ||
          healthStatus === 'No specific disease detected'
       ) {
          color = 'green';
       } else if (healthStatus === 'Unable to determine') {
          color = 'amber';
       } else if (severity === 'high') {
          color = 'red';
       } else if (severity === 'medium') {
          color = 'amber';
       } else if (severity === 'low') {
          color = 'low';
       }

       const disease = {
           name: healthStatus,
           severity: severity,
           confidence: confidence,
           color: color,
           treatments: Array.isArray(analysis.treatments)
               ? analysis.treatments
               : [],
           description: analysis.description || '',
       };

       await new Promise(r => setTimeout(r, 300));
       showScannerResult(identified, disease, detections);

       } catch (err) {
           console.error('Scanner error:', err);
           toast(`AI analysis failed: ${err.message}`, 'err');
           resetScanner();
       }
}

// ── GET PLANT EMOJI ──
function getPlantEmoji(className) {
  const name = className.toLowerCase();
  const emojiMap = {
    'apple':'🍎','orange':'🍊','banana':'🍌','tomato':'🍅','pear':'🍐',
    'potato':'🥔','pineapple':'🍍','onion':'🧅','cucumber':'🥒',
    'cauliflower':'🥦','cabbage':'🥬','garlic':'🧄','ginger':'🫚',
    'guava':'🍈','bitter melon':'🥒','brinjal':'🍆','eggplant':'🍆',
    'capsicum':'🫑','green chili':'🌶️','lady finger':'🥦',
    'dragon fruit':'🐉','sugar apple':'🍏','corn':'🌽','rice':'🌾',
    'mango':'🥭','papaya':'🍈','coconut':'🥥','sitaw':'🫛',
    'ampalaya':'🥒','pechay':'🥬','kamote':'🍠',
  };
  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (name.includes(key)) return emoji;
  }
  return '🌿';
}

// ── SHOW SCANNER RESULT ──
function showScannerResult(plant, disease, rawPredictions) {
  document.getElementById('scannerAnalyzingView').style.display = 'none';
  document.getElementById('scannerResultCard').style.display    = 'flex';

  const emptyEl = document.getElementById('scannerRightEmpty');
  if (emptyEl) emptyEl.style.display = 'none';

  const statusName = String(disease.name || 'Unable to determine').trim();
  const severity   = String(disease.severity || 'unknown').toLowerCase();
  const confidence = Number(disease.confidence ?? 0);

  const isHealthy =
    statusName === 'Healthy' ||
    statusName === 'No specific disease detected';

  const isUnknown =
    statusName === 'Unable to determine';

  const isPossibleDisease =
    !isHealthy &&
    !isUnknown;

  const colorMap = {
    red:   '#f85149',
    amber: '#e3a008',
    low:   '#58a6ff',
    green: '#3fb950',
    none:  '#3fb950'
  };

  let col = colorMap[disease.color] || '#e3a008';

  if (isHealthy) {
    col = '#3fb950';
  } else if (isUnknown) {
    col = '#e3a008';
  }

  // ── Plant info ──
  const plantEmojiEl =
    document.getElementById(
     'srcPlantEmoji'
    );

  const plantName =
    String(
      plant.name ||
      'Unknown'
    ).trim();


  const matchedFarmCastCrop =
    getMyCropPickerDataset()
      .find(crop =>
        crop.name.toLowerCase() ===
        plantName.toLowerCase()
      );


  if (plantEmojiEl) {

    if (matchedFarmCastCrop) {

      plantEmojiEl.innerHTML =
        getCropIconHtml(
          matchedFarmCastCrop.name,
          'src-plant-icon-img'
        );

    } else {

      plantEmojiEl.innerHTML = `
        <span
          class="material-symbols-outlined"
          style="
            font-size:2rem;
            color:var(--green)
          "
        >
          yard
        </span>
      `;

    }

  }


  document.getElementById(
    'srcPlantName'
  ).textContent =
    plantName;

  document.getElementById('srcPlantType').textContent =
    `${plant.type || 'Crop'} • ${Number(plant.confidence ?? 0)}% AI confidence`;

  // ── Health badge ──
  const badge = document.getElementById('srcHealthBadge');

  if (isHealthy) {
    badge.style.background  = 'var(--green-dim)';
    badge.style.borderColor = 'rgba(63,185,80,0.3)';
    badge.style.color       = 'var(--green)';

    document.getElementById('srcHealthIcon').textContent = '✅';

    document.getElementById('srcHealthLabel').textContent =
      statusName === 'Healthy'
        ? 'Healthy'
        : 'No Specific Disease Detected';

  } else if (isUnknown) {
    badge.style.background  = `${col}22`;
    badge.style.borderColor = `${col}55`;
    badge.style.color       = col;

    document.getElementById('srcHealthIcon').textContent = '❓';
    document.getElementById('srcHealthLabel').textContent =
      'Unable to Determine';

  } else {
    badge.style.background  = `${col}22`;
    badge.style.borderColor = `${col}55`;
    badge.style.color       = col;

    document.getElementById('srcHealthIcon').textContent =
      severity === 'high' ? '🚨' : '⚠️';

    document.getElementById('srcHealthLabel').textContent =
      'Possible Disease';
  }

  // ── Disease / analysis info ──
  const diseaseInfo = document.getElementById('srcDiseaseInfo');

  if (isHealthy) {
    diseaseInfo.style.display = 'none';

  } else {
    diseaseInfo.style.display = 'block';

    document.getElementById('srcDiseaseName').textContent =
      statusName;

    document.getElementById('srcDiseaseName').style.color =
      col;

    document.getElementById('srcDiseaseConf').textContent =
      `${confidence}% AI confidence`;

    const sev = document.getElementById('srcSeverityBadge');

    if (isUnknown) {
      sev.textContent = 'UNCERTAIN';
    } else {
      sev.textContent = severity.toUpperCase();
    }

    sev.style.background  = `${col}22`;
    sev.style.color       = col;
    sev.style.borderColor = `${col}55`;

    const description =
      disease.description ||
      (
        isUnknown
          ? 'The AI could not produce a reliable diagnosis from this image.'
          : `FarmCast AI detected a possible plant condition.`
      );

    document.getElementById('srcDiseaseDesc').textContent =
      description;
  }

  // ── Confidence meter ──
  const safeConfidence = Math.max(
    0,
    Math.min(100, confidence)
  );

  document.getElementById('srcConfPct').textContent =
    `${safeConfidence}%`;

  document.getElementById('srcConfFill').style.width =
    `${safeConfidence}%`;

  document.getElementById('srcConfFill').style.background =
    safeConfidence >= 80
      ? 'var(--green)'
      : safeConfidence >= 50
        ? 'var(--amber)'
        : 'var(--red)';

  // ── Recommendations ──
  let recs = [];

  if (
    Array.isArray(disease.treatments) &&
    disease.treatments.length > 0
  ) {
    recs = disease.treatments.map(
      r => `<div class="src-rec-item">${r}</div>`
    );

  } else if (isHealthy) {
    recs = [
      '✅ Continue normal crop care.',
      '💧 Maintain a regular watering schedule.',
      '🔍 Continue routine monitoring for visible symptoms.'
    ].map(
      r => `<div class="src-rec-item">${r}</div>`
    );

  } else if (isUnknown) {
    recs = [
      '📷 Take another photo in good lighting.',
      '🍃 Keep the affected leaf clearly visible.',
      '🔍 Avoid blurry, distant, or cluttered images.'
    ].map(
      r => `<div class="src-rec-item">${r}</div>`
    );

  } else {
    recs = [
      '🔍 Monitor the affected plant closely.',
      '✂️ Remove heavily affected plant material when appropriate.',
      '💧 Avoid prolonged moisture on affected leaves.',
      '📋 Rescan the plant if symptoms change or spread.'
    ].map(
      r => `<div class="src-rec-item">${r}</div>`
    );
  }

  document.getElementById('srcRecsList').innerHTML =
    recs.join('');

  // ── Save current result ──
  currentScanResult = {
    id: Date.now(),
    timestamp: new Date().toISOString(),

    plant: plant.name || 'Unknown',
    emoji: plant.emoji || '🌿',
    type: plant.type || 'Crop',

    disease: statusName,
    severity: severity,
    confidence: safeConfidence,

    imageData: scannerImageData,
  };

  // ── Notifications / toast ──
  if (isPossibleDisease) {
    addNotification(
      'plant-health',
      `🦠 Possible ${statusName}`,
      `FarmCast AI identified signs consistent with ${statusName} on ${plant.name || 'the scanned crop'}. AI confidence: ${safeConfidence}%. Inspect the plant and review the scan result before taking action.`
    );

    toast(
      `⚠️ Possible ${statusName} on ${plant.name || 'crop'}. Check the scan result.`,
      'warn'
    );

  } else if (isUnknown) {
    toast(
      '⚠️ AI could not determine a reliable diagnosis. Try scanning again.',
      'warn'
    );

  } else if (statusName === 'No specific disease detected') {
    toast(
      `✅ No specific disease detected on ${plant.name || 'crop'}.`,
      'ok'
    );

  } else {
    toast(
      `✅ ${plant.name || 'Plant'} appears healthy.`,
      'ok'
    );
  }
}

// ── SAVE SCAN RESULT ──
async function resizeImageForDB(base64, maxWidth = 120, maxHeight = 120) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let w = img.width, h = img.height;
      if (w > maxWidth)  { h = Math.round(h * maxWidth / w);  w = maxWidth; }
      if (h > maxHeight) { w = Math.round(w * maxHeight / h); h = maxHeight; }
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', 0.6));
    };
    img.onerror = () => resolve('');
    img.src = base64;
  });
}

async function saveScanResult() {
  if (!currentScanResult) return;
  try {
    const thumbnail = currentScanResult.imageData ? await resizeImageForDB(currentScanResult.imageData) : '';
    const saved = await fcScanHistory.save({
      plant: currentScanResult.plant, emoji: currentScanResult.emoji,
      plantType: currentScanResult.type, disease: currentScanResult.disease,
      severity: currentScanResult.severity, confidence: currentScanResult.confidence,
      imageData: thumbnail,
    });
    scannerHistory.unshift({ ...saved, id: saved._id || saved.id });
    if (scannerHistory.length > 50) scannerHistory = scannerHistory.slice(0, 50);
    renderScannerHistory();
    toast('Scan result saved to MongoDB! 📋', 'ok');
  } catch (err) {
    console.error('Save scan error:', err);
    scannerHistory.unshift(currentScanResult);
    if (scannerHistory.length > 20) scannerHistory = scannerHistory.slice(0, 20);
    localStorage.setItem('fc_scanHistory', JSON.stringify(scannerHistory));
    renderScannerHistory();
    toast('Saved locally (check backend connection).', 'warn');
  }
}

// ── LOAD SCAN HISTORY ──
async function loadScanHistory() {
  try {
    scannerHistory = await fcScanHistory.getAll();
    renderScannerHistory();
  } catch (err) {
    scannerHistory = JSON.parse(localStorage.getItem('fc_scanHistory') || '[]');
    renderScannerHistory();
  }
}

// ── RENDER HISTORY ──
function renderScannerHistory() {
  const list = document.getElementById('scannerHistoryList');
  if (!list) return;

  if (scannerHistory.length === 0) {
    list.innerHTML = `<div class="scanner-history-empty">
      <span class="material-symbols-outlined" style="font-size:36px;opacity:0.3">yard</span>
      <p>No scans yet.<br>Scan a plant to get started!</p>
    </div>`;
    return;
  }

  const colorMap = {
    high:   'var(--red)',
    medium: 'var(--amber)',
    low:    'var(--blue)',
    none:   'var(--green)',
    unknown:'var(--amber)'
  };

  list.innerHTML = scannerHistory.map(item => {
    const date = new Date(
      item.timestamp || item.createdAt
    ).toLocaleDateString('en-PH', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const diseaseName = String(
      item.disease || 'Unable to determine'
    ).trim();

    const severity = String(
      item.severity || 'unknown'
    ).toLowerCase();

    const confidence = Number(
      item.confidence ?? 0
    );


    const plantName =
      String(
        item.plant ||
       'Unknown'
      ).trim();


    const matchedFarmCastCrop =
      getMyCropPickerDataset()
        .find(crop =>
          crop.name.toLowerCase() ===
          plantName.toLowerCase()
        );


    const plantIconHtml =
      matchedFarmCastCrop
        ? getCropIconHtml(
            matchedFarmCastCrop.name,
            'shi-crop-icon-img'
          )
        : escapeHtml(
            item.emoji ||
            '🌿'
          );


    const isHealthy =
      diseaseName === 'Healthy';

    const isNoSpecificDisease =
      diseaseName === 'No specific disease detected';

    const isUnknown =
      diseaseName === 'Unable to determine';

    let col = colorMap[severity] || 'var(--amber)';
    let statusText = `⚠️ ${diseaseName}`;

    if (isHealthy) {
      col = 'var(--green)';
      statusText = '✅ Healthy';

    } else if (isNoSpecificDisease) {
      col = 'var(--green)';
      statusText = '✅ No Specific Disease Detected';

    } else if (isUnknown) {
      col = 'var(--amber)';
      statusText = '❓ Unable to Determine';
    }

    const itemId = item._id || item.id || 0;

    return `<div class="scanner-history-item">
      ${
        item.imageData
          ? `
              <img
                src="${item.imageData}"
                class="shi-thumb"
                alt=""
              >
            `
          : `
              <div class="shi-thumb shi-no-img">
                ${plantIconHtml}
              </div>
            `
      }

      <div
        class="shi-info"
        onclick="viewHistoryItem('${itemId}')"
        style="cursor:pointer;flex:1"
      >
        <div class="shi-plant">

          <span class="shi-plant-icon">
            ${plantIconHtml}
          </span>

          <span>
            ${escapeHtml(plantName)}
          </span>

        </div>

        <div class="shi-disease" style="color:${col}">
          ${statusText}
        </div>

        <div class="shi-date">${date}</div>
      </div>

      <div class="shi-right">
        <div
          class="shi-badge"
          style="background:${col}22;color:${col};border-color:${col}44"
        >
          ${confidence}%
        </div>

        <button
          class="shi-delete-btn"
          onclick="deleteHistoryItem('${itemId}')"
          title="Delete this scan"
        >
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>`;
  }).join('');
}


// ── VIEW HISTORY ITEM ──
function viewHistoryItem(id) {
  const item = scannerHistory.find(
    h => String(h._id || h.id) === String(id)
  );

  if (!item) return;

  const diseaseName = String(
    item.disease || 'Unable to determine'
  ).trim();

  const confidence = Number(
    item.confidence ?? 0
  );

  const isHealthy =
    diseaseName === 'Healthy' ||
    diseaseName === 'No specific disease detected';

  const isUnknown =
    diseaseName === 'Unable to determine';

  let toastType = 'warn';

  if (isHealthy) {
    toastType = 'ok';
  }

  const plantName =
    String(
      item.plant ||
      'Unknown'
    ).trim();


  const message =
    isUnknown
      ? `${plantName} — Unable to determine (${confidence}% AI confidence)`
      : `${plantName} — ${diseaseName} (${confidence}% AI confidence)`;


  toast(
    message,
    toastType
  );
}

async function deleteHistoryItem(id) {
  const idText =
    String(id || '');

  const isMongoId =
    /^[a-f\d]{24}$/i.test(
      idText
    );

  if (isMongoId) {
    try {
      await fcScanHistory.delete(
        idText
      );
    } catch (err) {
      console.warn(
        'Backend delete failed, removing locally:',
        err
      );
    }
  }

  scannerHistory =
    scannerHistory.filter(
      h =>
        String(
          h._id || h.id
        ) !== idText
    );

  localStorage.setItem(
    'fc_scanHistory',
    JSON.stringify(
      scannerHistory
    )
  );

  renderScannerHistory();

  toast(
    'Scan deleted! 🗑️',
    'warn'
  );
}

async function clearScanHistory() {
  if (scannerHistory.length === 0) return;
  if (!confirm('Clear all scan history from MongoDB?')) return;
  try {
    await fcScanHistory.clearAll();
    scannerHistory = [];
    localStorage.removeItem('fc_scanHistory');
    renderScannerHistory();
    toast('Scan history cleared.', 'warn');
  } catch (err) {
    scannerHistory = [];
    localStorage.removeItem('fc_scanHistory');
    renderScannerHistory();
    toast('Scan history cleared locally.', 'warn');
  }
}

// ═══════════════════════════════════════════════════════
// TASK 1 — COLLAPSIBLE DASHBOARD CARDS
// ═══════════════════════════════════════════════════════

function toggleCard(headerEl) {
  const card        = headerEl.closest('.card');
  const collapsible = card.querySelector('.card-collapsible');
  const icon        = headerEl.querySelector('.card-collapse-icon');
  if (!collapsible) return;

  const isOpen = !collapsible.classList.contains('collapsed');

  if (isOpen) {
    // Collapse
    collapsible.style.maxHeight = collapsible.scrollHeight + 'px';
    collapsible.offsetHeight; // force reflow
    collapsible.style.maxHeight = '0';
    collapsible.style.overflow  = 'hidden';
    collapsible.classList.add('collapsed');
    if (icon) icon.textContent = 'expand_more';
    card.classList.add('card-collapsed');
  } else {
    // Expand
    collapsible.style.maxHeight = collapsible.scrollHeight + 'px';
    collapsible.classList.remove('collapsed');
    if (icon) icon.textContent = 'expand_less';
    card.classList.remove('card-collapsed');
    // Remove max-height after animation
    setTimeout(() => { collapsible.style.maxHeight = ''; collapsible.style.overflow = ''; }, 350);
  }

}

// ═══════════════════════════════════════════════════════
// FARM ANALYTICS — COLLAPSE / EXPAND ALL
// ═══════════════════════════════════════════════════════

function setAnalyticsCardsCollapsed(
  shouldCollapse
) {

  const analyticsPage =
    document.getElementById(
      'page-farm-analytics'
    );

  if (!analyticsPage) return;


  const cards =
    analyticsPage.querySelectorAll(
      '.an-grid .card'
    );


  cards.forEach(card => {

    const header =
      card.querySelector(
        '.card-header'
      );

    const collapsible =
      card.querySelector(
        '.card-collapsible'
      );

    if (
      !header ||
      !collapsible
    ) {
      return;
    }


    const isCollapsed =
      collapsible.classList.contains(
        'collapsed'
      );


    /*
       Reuse the existing tested
       FarmCast card animation.
    */
    if (
      shouldCollapse &&
      !isCollapsed
    ) {
      toggleCard(header);
    }


    if (
      !shouldCollapse &&
      isCollapsed
    ) {
      toggleCard(header);
    }

  });

}


// ═══════════════════════════════════════════════════════
// ANIMATED WEATHER FUNCTIONS (RESTORED)
// ═══════════════════════════════════════════════════════

function renderAnimatedWeather(iconCode, desc = '') {
  const el = document.getElementById('heroIcon');
  if (!el) return;

  if (iconCode.startsWith('01')) {
    el.innerHTML = `<div class="weather-scene">
      <div class="sun-rays">${[0,45,90,135,180,225,270,315].map(deg =>
        `<div class="sun-ray" style="transform:rotate(${deg}deg) translateX(-50%)"></div>`
      ).join('')}</div>
      <div class="sun"></div></div>`;
  } else if (iconCode.startsWith('02') || iconCode.startsWith('03')) {
    el.innerHTML = `<div class="weather-scene">
      <div class="sun-behind"></div>
      <div class="cloud cloud-back"></div>
      <div class="cloud cloud-main"></div></div>`;
  } else if (iconCode.startsWith('04')) {
    el.innerHTML = `<div class="weather-scene">
      <div class="cloud cloud-back"></div>
      <div class="cloud cloud-main"></div></div>`;
  } else if (iconCode.startsWith('09')) {
    el.innerHTML = `<div class="weather-scene">
      <div class="rain-cloud"></div>
      <div class="rain-drops">${[1,2,3,4,5,6].map(()=>`<div class="rain-drop"></div>`).join('')}</div></div>`;
  } else if (iconCode.startsWith('10')) {
    el.innerHTML = `<div class="weather-scene">
      <div class="sun-behind" style="opacity:0.5;top:5px;left:5px;width:28px;height:28px"></div>
      <div class="rain-cloud"></div>
      <div class="rain-drops">${[1,2,3,4,5,6].map(()=>`<div class="rain-drop"></div>`).join('')}</div></div>`;
  } else if (iconCode.startsWith('11')) {
    el.innerHTML = `<div class="weather-scene">
      <div class="thunder-cloud"></div>
      <div class="rain-drops" style="top:38px;left:14px">${[1,2,3,4].map(()=>`<div class="rain-drop"></div>`).join('')}</div>
      <div class="lightning"></div></div>`;
  } else if (iconCode.startsWith('13')) {
    el.innerHTML = `<div class="weather-scene">
      <div class="snow-cloud"></div>
      <div class="snowflakes"><div class="snowflake">❄</div><div class="snowflake">❄</div><div class="snowflake">❄</div><div class="snowflake">❄</div></div></div>`;
  } else if (iconCode.startsWith('50')) {
    el.innerHTML = `<div class="weather-scene">
      <div class="fog-lines"><div class="fog-line"></div><div class="fog-line"></div><div class="fog-line"></div><div class="fog-line"></div></div></div>`;
  } else {
    el.innerHTML = `<div class="weather-scene"><div class="sun"></div></div>`;
  }
}

function getMiniWeatherScene(iconCode = '') {

  /* ☀️ CLEAR */
  if (iconCode.startsWith('01')) {
    return `
      <div class="mini-scene">
        <div class="mini-sun">
          <div class="mini-sun-rays"></div>
          <div class="mini-sun-core"></div>
        </div>
      </div>
    `;
  }


  /* 🌤️ PARTLY CLOUDY */
  if (iconCode.startsWith('02')) {
    return `
      <div class="mini-scene">
        <div class="mini-sun-sm"></div>
        <div class="mini-cloud"></div>
      </div>
    `;
  }


  /* ☁️ CLOUDY */
  if (
    iconCode.startsWith('03') ||
    iconCode.startsWith('04')
  ) {
    return `
      <div class="mini-scene">
        <div class="mini-cloud mini-cloud-2"></div>
        <div class="mini-cloud"></div>
      </div>
    `;
  }


  /* 🌧️ RAIN */
  if (
    iconCode.startsWith('09') ||
    iconCode.startsWith('10')
  ) {
    return `
      <div class="mini-scene">

        <div class="mini-cloud mini-dark"></div>

        <div class="mini-rain">
          <div class="mini-drop"></div>
          <div class="mini-drop"></div>
          <div class="mini-drop"></div>
        </div>

      </div>
    `;
  }


  /* ⛈️ THUNDERSTORM */
  if (iconCode.startsWith('11')) {
    return `
      <div class="mini-scene">

        <div class="mini-cloud mini-dark"></div>

        <div class="mini-rain">
          <div class="mini-drop"></div>
          <div class="mini-drop"></div>
          <div class="mini-drop"></div>
        </div>

        <div class="mini-lightning">⚡</div>

      </div>
    `;
  }


  /* ❄️ SNOW */
  if (iconCode.startsWith('13')) {
    return `
      <div class="mini-scene">

        <div class="mini-cloud"></div>

        <div class="mini-snow">
          ❄
        </div>

      </div>
    `;
  }


  /* 🌫️ FOG */
  if (iconCode.startsWith('50')) {
    return `
      <div class="mini-scene">
        <div class="mini-fog"></div>
      </div>
    `;
  }


  /* FALLBACK */
  return `
    <div class="mini-scene">
      <div class="mini-sun">
        <div class="mini-sun-rays"></div>
        <div class="mini-sun-core"></div>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════
// SIDEBAR TOGGLE
// ═══════════════════════════════════════════════════════
let sidebarCollapsed = false;

function toggleSidebar() {

  // Mobile: use mobile drawer behavior instead
  if (window.innerWidth <= 768) {
    toggleMobileSidebar();
    return;
  }

  const sidebar = document.getElementById('mainSidebar');
  if (!sidebar) return;

  sidebarCollapsed = !sidebarCollapsed;

  if (sidebarCollapsed) {
    sidebar.classList.add('collapsed');
  } else {
    sidebar.classList.remove('collapsed');
  }

  if (typeof weatherMap !== 'undefined' && weatherMap) {
    setTimeout(() => weatherMap.invalidateSize(), 350);
  }

  localStorage.setItem('fc_sidebarCollapsed', sidebarCollapsed);
}

// Restore sidebar state on load
// Desktop only — mobile sidebar should always start uncollapsed

function enableHorizontalDragScroll() {
  const sliders = document.querySelectorAll('.calendar-scroll');

  sliders.forEach(slider => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    slider.addEventListener('mousedown', e => {
      isDown = true;
      slider.classList.add('dragging');

      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('dragging');
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('dragging');
    });

    slider.addEventListener('mousemove', e => {
      if (!isDown) return;

      e.preventDefault();

      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;

      slider.scrollLeft = scrollLeft - walk;
    });
    // Mobile touch swipe
    let touchStartX = 0;
    let touchStartY = 0;
    let touchScrollLeft = 0;

    slider.addEventListener(
      'touchstart',
      e => {
        const touch = e.touches[0];

        touchStartX =
          touch.clientX;

        touchStartY =
          touch.clientY;

        touchScrollLeft =
          slider.scrollLeft;

        slider.classList.add(
          'dragging'
        );
      },
      { passive: true }
    );

    slider.addEventListener(
      'touchmove',
      e => {
        if (!e.touches.length) return;

      const touch =
        e.touches[0];

      const deltaX =
        touch.clientX -
        touchStartX;

      const deltaY =
        touch.clientY -
        touchStartY;

      // Horizontal swipe only
      if (
        Math.abs(deltaX) >
        Math.abs(deltaY)
      ) {
        e.preventDefault();

        slider.scrollLeft =
          touchScrollLeft -
          deltaX;
      }
    },
    { passive: false }
  );

  slider.addEventListener(
    'touchend',
    () => {
      slider.classList.remove(
        'dragging'
      );
    }
  );

  });
}


document.addEventListener('DOMContentLoaded', () => {

  // Load official government advisories
  loadOfficialAdvisories();

  // Enable desktop drag scrolling
  enableHorizontalDragScroll();

  const sidebar = document.getElementById('mainSidebar');

  if (!sidebar) return;

  if (
    window.innerWidth > 768 &&
    localStorage.getItem('fc_sidebarCollapsed') === 'true'
  ) {
    sidebarCollapsed = true;
    sidebar.classList.add('collapsed');
  } else {
    sidebar.classList.remove('collapsed');
  }

});

// ── MOBILE SIDEBAR TOGGLE ──
function toggleMobileSidebar() {
  const sidebar = document.getElementById('mainSidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (!sidebar) return;

  const isOpen = sidebar.classList.contains('mobile-open');

  // Mobile should never keep desktop collapsed state
  sidebar.classList.remove('collapsed');

  if (isOpen) {
    sidebar.classList.remove('mobile-open');

    if (overlay) {
      overlay.classList.remove('active');
    }
  } else {
    sidebar.classList.add('mobile-open');

    if (overlay) {
      overlay.classList.add('active');
    }
  }
}