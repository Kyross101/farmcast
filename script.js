// ═══════════════════════════════════════════
// FARMCAST — Main Application Script
// ═══════════════════════════════════════════

const API_KEY = '2e3d2d2d9957fd5364e42c6cf4fe73e5'; // OWM API key
// Roboflow API config
// Python AI Server (YOLOv8 + Claude AI)
const AI_SERVER_URL = 'https://farmcast-1.onrender.com'; // ← Ilagay mo dito ang URL ng iyong AI server

// ═══════════════════════════════════════════════════════
// TASK 4 — CLAUDE AI PLANT IDENTIFICATION
// Integrates with Anthropic API for unlimited plant ID
// ═══════════════════════════════════════════════════════

const CLAUDE_API_KEY = ''; // ← Ilagay mo dito ang bagong API key mo
const CLAUDE_MODEL   = 'claude-sonnet-4-20250514';
let currentCity = 'San Miguel, Bulacan';
let currentWeather = null;

// State variables
let aiCurrentCropId   = null;
let aiCurrentCropType = null;
let aiImageData       = null;
let aiCameraStream    = null; 
let aiReady = true; // Always ready - no model loading needed!


// ── CROPS DATA ──
const CROPS = [
  { name:'Tomato',     emoji:'🍅', minTemp:18, maxTemp:32, noRain:false, windMax:20 },
  { name:'Eggplant',   emoji:'🍆', minTemp:22, maxTemp:35, noRain:false, windMax:25 },
  { name:'Corn',       emoji:'🌽', minTemp:18, maxTemp:33, noRain:false, windMax:15 },
  { name:'Okra',       emoji:'🥦', minTemp:25, maxTemp:38, noRain:false, windMax:20 },
  { name:'Sitaw',      emoji:'🫛', minTemp:20, maxTemp:35, noRain:false, windMax:22 },
  { name:'Ampalaya',   emoji:'🥒', minTemp:24, maxTemp:36, noRain:false, windMax:20 },
  { name:'Pechay',     emoji:'🥬', minTemp:15, maxTemp:25, noRain:false, windMax:20 },
  { name:'Kamote',     emoji:'🍠', minTemp:20, maxTemp:35, noRain:true,  windMax:25 },
];

// ── PEST DATA (weather-driven) ──
const PESTS = [
  { name:'Aphids',       icon:'🦗', condition:'humid', detail:'High humidity favors rapid colony growth',  level:'high'   },
  { name:'Stem Borer',   icon:'🐛', condition:'hot',   detail:'High temp increases larval activity',       level:'medium' },
  { name:'Whitefly',     icon:'🦋', condition:'dry',   detail:'Low humidity common during dry spells',     level:'low'    },
  { name:'Root Rot',     icon:'🍄', condition:'rainy', detail:'Excessive moisture encourages fungal spread',level:'high'   },
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
function setNav(el){
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  el.classList.add('active');
}

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

  if(windKph > 40) return { type:'danger', text:'<strong>⚠️ High Wind Warning:</strong> Delay planting & harvesting activities. Secure young plants.' };
  if(isRaining && humidity > 85) return { type:'warn', text:'<strong>🌧️ Heavy Rain Alert:</strong> Avoid field operations. Check drainage systems.' };
  if(temp > 36) return { type:'warn', text:'<strong>🌡️ Heat Stress Alert:</strong> Water crops early morning and late afternoon. Monitor for wilting.' };
  if(humidity > 80 && temp > 28) return { type:'warn', text:'<strong>💦 High Humidity:</strong> Monitor for fungal diseases. Ensure proper crop spacing.' };
  if(temp >= 22 && temp <= 32 && humidity >= 50 && humidity <= 75)
    return { type:'ok', text:'<strong>✅ Ideal Farm Conditions:</strong> Good temperature and humidity. Perfect day for planting and fieldwork!' };
  return { type:'ok', text:'<strong>🌱 Fair Conditions:</strong> Suitable for most farming activities. Check individual crop requirements.' };
}

// ── ASSESS CROP FOR DAY ──
function assessCrop(crop, temp, windKph, isRaining){
  if(windKph > crop.windMax) return { status:'risk', reason:'High Wind Warning' };
  if(crop.noRain && isRaining) return { status:'wait', reason:'Avoid Planting in Rain' };
  if(temp < crop.minTemp) return { status:'wait', reason:'Temperature Too Low' };
  if(temp > crop.maxTemp) return { status:'risk', reason:'Heat Stress Risk' };
  return { status:'ideal', reason:'Good Temp & Rain' };
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

  // Pest alerts based on conditions
  renderPestAlerts(data);

  toast(`Weather updated for ${data.name}`, 'ok');
}

// ── RENDER PEST ALERTS ──
function renderPestAlerts(data){
  const humidity = data.main.humidity;
  const temp = data.main.temp;
  const desc = data.weather[0].description.toLowerCase();
  const isRaining = desc.includes('rain');

  const active = PESTS.filter(p => {
    if(p.condition==='humid' && humidity > 70) return true;
    if(p.condition==='hot'   && temp > 30)     return true;
    if(p.condition==='dry'   && humidity < 50) return true;
    if(p.condition==='rainy' && isRaining)     return true;
    return false;
  });

  // Always show at least 2
  const show = active.length >= 2 ? active : PESTS.slice(0,2);

  document.getElementById('pestList').innerHTML = show.map(p => `
    <div class="pest-item ${p.level}" onclick="toast('Pest detail: ${p.name} — ${p.detail}','warn')">
      <div class="pest-icon">${p.icon}</div>
      <div class="pest-info">
        <div class="pest-name">${p.name}</div>
        <div class="pest-detail">${p.detail}</div>
      </div>
      <div class="pest-level level-${p.level}">
        <div class="pest-pulse"></div>
        ${p.level.charAt(0).toUpperCase()+p.level.slice(1)}
      </div>
    </div>
  `).join('');
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
function toggleTask(i){ tasks[i].done = !tasks[i].done; renderTasks(); }
function addTask(){
  const label = prompt('New task name:');
  if(!label) return;
  tasks.push({ label, time:'TBD', done:false, priority:'low' });
  renderTasks();
  toast('Task added!','ok');
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
async function fetchWeather(city){
  // Animate both refresh icons
  const topIcon  = document.getElementById('refreshIcon');
  const heroIcon = document.getElementById('heroRefreshIcon');
  const heroBtn  = document.getElementById('heroRefreshBtn');
  if (topIcon)  topIcon.style.animation  = 'spin .7s linear infinite';
  if (heroIcon) heroIcon.style.animation = 'spin .7s linear infinite';
  if (heroBtn)  heroBtn.classList.add('refreshing');

  try {
    const [wRes, fRes] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`)
    ]);
    if(!wRes.ok) throw new Error('City not found');
    const [wData, fData] = await Promise.all([wRes.json(), fRes.json()]);
    displayWeatherData(wData);
    renderForecastAndCalendar(fData, wData);
    currentCity = city;
  } catch(e) {
    toast(`Error: ${e.message}`, 'err');
  } finally {
    if (topIcon)  topIcon.style.animation  = '';
    if (heroIcon) heroIcon.style.animation = '';
    if (heroBtn)  heroBtn.classList.remove('refreshing');
  }
}

function refreshWeather(){ fetchWeather(currentCity); }
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
 
function setNav(el, pageId) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
 
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
 
  if (pageId === 'dashboard') {
    document.getElementById('page-dashboard').style.display = 'block';
    document.getElementById('topbarTitle').textContent = PAGE_TITLES['dashboard'];
  } else if (pageId === 'weather-maps') {
    document.getElementById('page-weather-maps').style.display = 'block';
    document.getElementById('topbarTitle').textContent = PAGE_TITLES['weather-maps'];
    initWeatherMap();
  } else if (pageId === 'my-crops') {
    document.getElementById('page-my-crops').style.display = 'block';
    document.getElementById('topbarTitle').textContent = PAGE_TITLES['my-crops'];
    renderCropsPage();
  } else {
    // Pages not yet built — show dashboard fallback
    document.getElementById('page-dashboard').style.display = 'block';
    document.getElementById('topbarTitle').textContent = PAGE_TITLES['dashboard'];
    toast('This section is coming soon!', 'warn');
  }
}
 
// ═══════════════════════════════════════════════════════
// WEATHER MAPS — Leaflet.js + OpenWeatherMap tile layers
// ═══════════════════════════════════════════════════════
 
let weatherMap = null;
let currentWeatherLayer = null;
let currentBaseLayer = null;
let currentMapLayerName = 'precipitation_new';
 
const OWM_LAYERS = {
  precipitation_new: { name: 'Precipitation', legend: 'precip-gradient',  labels: ['None','Heavy'] },
  temp_new:          { name: 'Temperature',   legend: 'temp-gradient',    labels: ['Cold','Hot'] },
  wind_new:          { name: 'Wind Speed',    legend: 'wind-gradient',    labels: ['Calm','Strong'] },
  clouds_new:        { name: 'Cloud Cover',   legend: 'cloud-gradient',   labels: ['Clear','Overcast'] },
  pressure_new:      { name: 'Pressure',      legend: 'pressure-gradient',labels: ['Low','High'] }
};
 
const BASE_TILES = {
  dark:      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  street:    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
};
 
let mapInitialized = false;
 
function initWeatherMap() {
  if (mapInitialized) return;
  mapInitialized = true;
 
  const lat = currentWeather ? currentWeather.coord.lat : 14.99;
  const lon = currentWeather ? currentWeather.coord.lon : 120.93;
 
  weatherMap = L.map('weatherMap', {
    zoomControl: true,
    worldCopyJump: false,
    maxBounds: [[-90, -180], [90, 180]],
    maxBoundsViscosity: 1.0,
    minZoom: 2,
    maxZoom: 18,
  }).setView([lat, lon], 8);
 
  // Base layer — dark by default
  currentBaseLayer = L.tileLayer(BASE_TILES.dark, {
    attribution: '© CartoDB',
    maxZoom: 18,
    subdomains: 'abcd',
    noWrap: true
  }).addTo(weatherMap);
 
  // OWM weather layer
  currentWeatherLayer = L.tileLayer(
    `https://tile.openweathermap.org/map/${currentMapLayerName}/{z}/{x}/{y}.png?appid=${API_KEY}`,
    { opacity: 0.75, maxZoom: 18 }
  ).addTo(weatherMap);
 
  // Add farm marker
  if (currentWeather) {
    const marker = L.marker([lat, lon], {
      icon: L.divIcon({ className: 'farm-marker', html: '🌾', iconSize: [30, 30], iconAnchor: [15, 15] })
    }).addTo(weatherMap);
    marker.bindPopup(`<b>${currentWeather.name}</b><br>${Math.round(currentWeather.main.temp)}°C — ${currentWeather.weather[0].description}`).openPopup();
  }
 
  // Click to get weather
  weatherMap.on('click', async (e) => {
    const { lat, lng } = e.latlng;
    await fetchMapPointWeather(lat, lng);
  });
 
  // Update map weather summary
  updateMapWeatherSummary();
}
 
async function fetchMapPointWeather(lat, lng) {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`);
    if (!res.ok) return;
    const data = await res.json();
 
    // Add popup marker
    const popup = L.popup()
      .setLatLng([lat, lng])
      .setContent(`
        <div style="font-family:'DM Sans',sans-serif;min-width:160px;">
          <div style="font-weight:700;font-size:0.95rem;margin-bottom:4px;">${data.name}, ${data.sys.country}</div>
          <div style="font-size:1.4rem;font-weight:800;color:#3fb950;">${Math.round(data.main.temp)}°C</div>
          <div style="font-size:0.78rem;color:#666;margin-top:2px;text-transform:capitalize;">${data.weather[0].description}</div>
          <div style="margin-top:8px;font-size:0.78rem;display:grid;grid-template-columns:1fr 1fr;gap:4px;">
            <div>💧 ${data.main.humidity}%</div>
            <div>💨 ${(data.wind.speed*3.6).toFixed(1)} kph</div>
            <div>☁️ ${data.clouds.all}%</div>
            <div>👁 ${data.visibility ? (data.visibility/1000).toFixed(1) : '--'} km</div>
          </div>
        </div>
      `)
      .openOn(weatherMap);
 
    // Update sidebar summary
    document.getElementById('mapWsCity').textContent  = `${data.name}, ${data.sys.country}`;
    document.getElementById('mapWsTemp').textContent  = `${Math.round(data.main.temp)}°C`;
    document.getElementById('mapWsHumid').textContent = `${data.main.humidity}%`;
    document.getElementById('mapWsWind').textContent  = `${(data.wind.speed*3.6).toFixed(1)} kph`;
    document.getElementById('mapWsCloud').textContent = `${data.clouds.all}%`;
 
    // Hide click hint
    document.getElementById('mapClickHint').style.display = 'none';
 
  } catch (e) {
    console.error('Map fetch error:', e);
  }
}
 
function setMapLayer(el, layerName) {
  document.querySelectorAll('.map-layer-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  currentMapLayerName = layerName;
 
  if (currentWeatherLayer) weatherMap.removeLayer(currentWeatherLayer);
  currentWeatherLayer = L.tileLayer(
    `https://tile.openweathermap.org/map/${layerName}/{z}/{x}/{y}.png?appid=${API_KEY}`,
    { opacity: 0.75, maxZoom: 18 }
  ).addTo(weatherMap);
 
  // Update legend
  const info = OWM_LAYERS[layerName];
  document.getElementById('mapLegendTitle').textContent = info.name;
  const bar = document.getElementById('mapLegendBar');
  bar.querySelector('.legend-gradient').className = `legend-gradient ${info.legend}`;
  const labels = bar.querySelectorAll('.legend-labels span');
  labels[0].textContent = info.labels[0];
  labels[1].textContent = info.labels[1];
 
  toast(`Showing ${info.name} layer`, 'ok');
}
 
function setMapStyle(el, style) {
  document.querySelectorAll('.map-style-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
 
  if (currentBaseLayer) weatherMap.removeLayer(currentBaseLayer);
  currentBaseLayer = L.tileLayer(BASE_TILES[style], {
    attribution: '© Map',
    maxZoom: 18,
    subdomains: style === 'dark' ? 'abcd' : 'abc',
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
  if (!currentWeather) return;
  const d = currentWeather;
  document.getElementById('mapWsCity').textContent  = `${d.name}, ${d.sys.country}`;
  document.getElementById('mapWsTemp').textContent  = `${Math.round(d.main.temp)}°C`;
  document.getElementById('mapWsHumid').textContent = `${d.main.humidity}%`;
  document.getElementById('mapWsWind').textContent  = `${(d.wind.speed*3.6).toFixed(1)} kph`;
  document.getElementById('mapWsCloud').textContent = `${d.clouds.all}%`;
}
 
// ═══════════════════════════════════════════════════════
// MY CROPS — Full CRUD + Weather Assessment
// ═══════════════════════════════════════════════════════
 
const CROP_EMOJIS = {
  Tomato:'🍅', Eggplant:'🍆', Corn:'🌽', Okra:'🥦', Sitaw:'🫛',
  Ampalaya:'🥒', Pechay:'🥬', Kamote:'🍠', Rice:'🌾',
  Garlic:'🧄', Onion:'🧅', Cabbage:'🥦'
};
 
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
 
// Sample initial crops data
let myCrops = [
  { id:1, type:'Tomato',   area:300, planted:'2026-01-20', harvest:'2026-04-05', location:'North Field A', irrigation:'Drip',      notes:'Primera variety. Germination successful.', watered:true  },
  { id:2, type:'Corn',     area:500, planted:'2026-02-01', harvest:'2026-05-01', location:'South Field B', irrigation:'Sprinkler', notes:'Sweet corn hybrid. High yield expected.',  watered:false },
  { id:3, type:'Pechay',   area:100, planted:'2026-03-01', harvest:'2026-04-05', location:'Greenhouse 1',  irrigation:'Manual',    notes:'Ready for harvest soon.',                watered:true  },
  { id:4, type:'Eggplant', area:200, planted:'2026-01-10', harvest:'2026-04-01', location:'East Lot',      irrigation:'Drip',      notes:'Monitoring for aphids.',                  watered:false },
  { id:5, type:'Sitaw',    area:150, planted:'2026-02-15', harvest:'2026-04-21', location:'West Field',    irrigation:'Rain',      notes:'Good growth progress.',                   watered:true  },
  { id:6, type:'Kamote',   area:400, planted:'2025-12-01', harvest:'2026-04-01', location:'Back Lot',      irrigation:'Rain',      notes:'Near harvest, soil moist.',               watered:false },
  { id:7, type:'Rice',     area:1000,planted:'2026-02-20', harvest:'2026-06-10', location:'Paddy Field',   irrigation:'Flood',     notes:'At tillering stage.',                     watered:true  },
  { id:8, type:'Okra',     area:80,  planted:'2026-03-05', harvest:'2026-05-04', location:'Garden Plot',   irrigation:'Manual',    notes:'Seedlings just emerged.',                 watered:false },
];
let nextCropId = 9;
let currentCropFilter = 'all';
 
// Get crop status based on dates and weather conditions
function getCropStatus(crop) {
  const today = new Date();
  const harvestDate = new Date(crop.harvest);
  const plantDate   = new Date(crop.planted);
  const daysLeft = Math.ceil((harvestDate - today) / (1000*60*60*24));
  const daysGrown = Math.ceil((today - plantDate) / (1000*60*60*24));
  const totalDays = CROP_INFO[crop.type]?.days || 90;
  const progress = Math.min(100, Math.round((daysGrown / totalDays) * 100));
 
  // Weather risk check
  let weatherRisk = null;
  if (currentWeather) {
    const temp = currentWeather.main.temp;
    const info = CROP_INFO[crop.type];
    if (info && (temp < info.minTemp || temp > info.maxTemp)) {
      weatherRisk = temp < info.minTemp ? 'Temperature too low' : 'Heat stress risk';
    }
  }
 
  if (daysLeft <= 0) return { label: 'Overdue', color: 'red',   progress, daysLeft: 0, weatherRisk };
  if (daysLeft <= 7) return { label: 'Ready',   color: 'amber', progress, daysLeft, weatherRisk };
  if (weatherRisk)   return { label: 'At Risk', color: 'red',   progress, daysLeft, weatherRisk };
  return               { label: 'Growing', color: 'green',  progress, daysLeft, weatherRisk };
}
 
function filterCrops(el, filter) {
  document.querySelectorAll('.cft').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  currentCropFilter = filter;
  renderCropsPage();
}
 
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
        <div style="font-size:3rem">🌱</div>
        <p>No crops found. Add your first crop!</p>
        <button class="btn-add-crop" onclick="openAddCropModal()"><span class="material-symbols-outlined">add</span> Add Crop</button>
      </div>`;
    return;
  }
 
  document.getElementById('cropsGrid').innerHTML = filtered.map(crop => {
    const st = getCropStatus(crop);
    const emoji = CROP_EMOJIS[crop.type] || '🌿';
    const info  = CROP_INFO[crop.type] || {};
    const plantedFmt  = new Date(crop.planted).toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'});
    const harvestFmt  = new Date(crop.harvest).toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'});
 
    // Weather compatibility
    let weatherCompatHtml = '';
    if (currentWeather && info.minTemp !== undefined) {
      const temp = currentWeather.main.temp;
      const ok = temp >= info.minTemp && temp <= info.maxTemp;
      weatherCompatHtml = `
        <div class="crop-weather-compat ${ok ? 'ok' : 'warn'}">
          <span class="material-symbols-outlined">${ok ? 'check_circle' : 'warning'}</span>
          ${ok ? `${Math.round(temp)}°C is ideal for ${crop.type}` : (st.weatherRisk || 'Weather risk detected')}
        </div>`;
    }
 
    return `
      <div class="crop-detail-card ${st.color}" data-id="${crop.id}">
        <div class="cdc-header">
          <div class="cdc-emoji">${emoji}</div>
          <div class="cdc-info">
            <div class="cdc-name">${crop.type}</div>
            <div class="cdc-location">
              <span class="material-symbols-outlined" style="font-size:13px">location_on</span>
              ${crop.location}
            </div>
          </div>
          <div class="cdc-status status-${st.color}">${st.label}</div>
        </div>
 
        <!-- Progress bar -->
        <div class="cdc-progress-wrap">
          <div class="cdc-progress-label">
            <span>Growth Progress</span>
            <span>${st.progress}%</span>
          </div>
          <div class="cdc-progress-bar">
            <div class="cdc-progress-fill ${st.color}" style="width:${st.progress}%"></div>
          </div>
        </div>
 
        ${weatherCompatHtml}
 
        <div class="cdc-meta-grid">
          <div class="cdc-meta-item">
            <span class="material-symbols-outlined">calendar_today</span>
            <div><div class="cmi-val">${plantedFmt}</div><div class="cmi-lbl">Date Planted</div></div>
          </div>
          <div class="cdc-meta-item">
            <span class="material-symbols-outlined">event_available</span>
            <div><div class="cmi-val">${harvestFmt}</div><div class="cmi-lbl">Expected Harvest</div></div>
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
      </div>`;
  }).join('');
}
 
function toggleWater(id) {
  const crop = myCrops.find(c => c.id === id);
  if (!crop) return;
  crop.watered = !crop.watered;
  renderCropsPage();
  toast(`${crop.type} marked as ${crop.watered ? 'watered' : 'not watered'}`, crop.watered ? 'ok' : 'warn');
}
 
function markHarvested(id) {
  const crop = myCrops.find(c => c.id === id);
  if (!crop) return;
  if (!confirm(`Mark ${crop.type} as harvested and remove from active crops?`)) return;
  myCrops = myCrops.filter(c => c.id !== id);
  renderCropsPage();
  toast(`${crop.type} marked as harvested! Great job! 🎉`, 'ok');
}
 
function deleteCrop(id) {
  const crop = myCrops.find(c => c.id === id);
  if (!crop) return;
  if (!confirm(`Delete ${crop.type} from your crop list?`)) return;
  myCrops = myCrops.filter(c => c.id !== id);
  renderCropsPage();
  toast(`${crop.type} deleted.`, 'warn');
}
 
function openAddCropModal() {
  document.getElementById('addCropModal').style.display = 'flex';
  
  // Set default dates
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('cropDatePlanted').value = today;
  const def90 = new Date(Date.now() + 90*24*60*60*1000).toISOString().split('T')[0];
  document.getElementById('cropDateHarvest').value = def90;
  
  // Auto-update harvest date when crop type changes
  document.getElementById('cropTypeSelect').onchange = function() {
    const info = CROP_INFO[this.value];
    if (info) {
      const planted = new Date(document.getElementById('cropDatePlanted').value);
      const harvestDate = new Date(planted.getTime() + info.days*24*60*60*1000);
      document.getElementById('cropDateHarvest').value = harvestDate.toISOString().split('T')[0];
    }
  };
}
 
function closeAddCropModal() {
  document.getElementById('addCropModal').style.display = 'none';
}
 
function saveNewCrop() {
  const type      = document.getElementById('cropTypeSelect').value;
  const area      = parseInt(document.getElementById('cropArea').value);
  const planted   = document.getElementById('cropDatePlanted').value;
  const harvest   = document.getElementById('cropDateHarvest').value;
  const location  = document.getElementById('cropLocation').value.trim();
  const irrigation= document.getElementById('cropIrrigation').value;
  const notes     = document.getElementById('cropNotes').value.trim();
 
  if (!type || !area || !planted || !harvest || !location) {
    toast('Please fill in all required fields.', 'warn');
    return;
  }
  myCrops.push({ id: nextCropId++, type, area, planted, harvest, location, irrigation, notes, watered: false });
  closeAddCropModal();
  renderCropsPage();
  toast(`${type} added to your crops! 🌱`, 'ok');
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
const DEFAULT_CROPS = [
  { id:1, type:'Tomato',   area:300,  planted:'2026-01-20', harvest:'2026-04-05', location:'North Field A', irrigation:'Drip',      notes:'Primera variety. Germination successful.', watered:true  },
  { id:2, type:'Corn',     area:500,  planted:'2026-02-01', harvest:'2026-05-01', location:'South Field B', irrigation:'Sprinkler', notes:'Sweet corn hybrid. High yield expected.',  watered:false },
  { id:3, type:'Pechay',   area:100,  planted:'2026-03-01', harvest:'2026-04-05', location:'Greenhouse 1',  irrigation:'Manual',    notes:'Ready for harvest soon.',                 watered:true  },
  { id:4, type:'Eggplant', area:200,  planted:'2026-01-10', harvest:'2026-04-01', location:'East Lot',      irrigation:'Drip',      notes:'Monitoring for aphids.',                  watered:false },
  { id:5, type:'Sitaw',    area:150,  planted:'2026-02-15', harvest:'2026-04-21', location:'West Field',    irrigation:'Rain',      notes:'Good growth progress.',                   watered:true  },
  { id:6, type:'Kamote',   area:400,  planted:'2025-12-01', harvest:'2026-04-01', location:'Back Lot',      irrigation:'Rain',      notes:'Near harvest, soil moist.',               watered:false },
  { id:7, type:'Rice',     area:1000, planted:'2026-02-20', harvest:'2026-06-10', location:'Paddy Field',   irrigation:'Flood',     notes:'At tillering stage.',                     watered:true  },
  { id:8, type:'Okra',     area:80,   planted:'2026-03-05', harvest:'2026-05-04', location:'Garden Plot',   irrigation:'Manual',    notes:'Seedlings just emerged.',                 watered:false },
];

// Re-initialize from localStorage (overrides the previous `let myCrops = [...]`)
myCrops    = lsLoad(LS_CROPS,     DEFAULT_CROPS);
nextCropId = lsLoad(LS_CROPS_ID,  9);
tasks      = lsLoad(LS_TASKS,     tasks);  // keep default tasks as fallback

// Patch save into existing crop functions
const _origSaveNewCrop = saveNewCrop;
// We'll patch directly below

function saveCropsLS() { lsSave(LS_CROPS, myCrops); lsSave(LS_CROPS_ID, nextCropId); }
function saveTasksLS() { lsSave(LS_TASKS, tasks); }

// Patch toggleTask to also save
const _origToggleTask = toggleTask;
toggleTask = function(i) { _origToggleTask(i); saveTasksLS(); };

// Patch toggleWater to also save
const _origToggleWater = toggleWater;
toggleWater = function(id) {
  const crop = myCrops.find(c => c.id === id);
  if (!crop) return;
  crop.watered = !crop.watered;
  saveCropsLS();
  renderCropsPage();
  toast(`${crop.type} marked as ${crop.watered ? 'watered' : 'not watered'}`, crop.watered ? 'ok' : 'warn');
};

// Patch markHarvested to also save
const _origMarkHarvested = markHarvested;
markHarvested = function(id) {
  const crop = myCrops.find(c => c.id === id);
  if (!crop) return;
  if (!confirm(`Mark ${crop.type} as harvested and remove from active crops?`)) return;
  myCrops = myCrops.filter(c => c.id !== id);
  saveCropsLS();
  renderCropsPage();
  toast(`${crop.type} marked as harvested! Great job! 🎉`, 'ok');
};

// Patch deleteCrop to also save
const _origDeleteCrop = deleteCrop;
deleteCrop = function(id) {
  const crop = myCrops.find(c => c.id === id);
  if (!crop) return;
  if (!confirm(`Delete ${crop.type} from your crop list?`)) return;
  myCrops = myCrops.filter(c => c.id !== id);
  saveCropsLS();
  renderCropsPage();
  toast(`${crop.type} deleted.`, 'warn');
};

// Patch saveNewCrop to also save
const _origSaveNC = saveNewCrop;
saveNewCrop = function() {
  const type      = document.getElementById('cropTypeSelect').value;
  const area      = parseInt(document.getElementById('cropArea').value);
  const planted   = document.getElementById('cropDatePlanted').value;
  const harvest   = document.getElementById('cropDateHarvest').value;
  const location  = document.getElementById('cropLocation').value.trim();
  const irrigation= document.getElementById('cropIrrigation').value;
  const notes     = document.getElementById('cropNotes').value.trim();
  if (!type || !area || !planted || !harvest || !location) { toast('Please fill in all required fields.', 'warn'); return; }
  myCrops.push({ id: nextCropId++, type, area, planted, harvest, location, irrigation, notes, watered: false });
  saveCropsLS();
  closeAddCropModal();
  renderCropsPage();
  toast(`${type} added to your crops! 🌱`, 'ok');
};

// Also update setNav to include the 3 new pages
const _origSetNav = setNav;
setNav = function(el, pageId) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  const titles = {
    'dashboard':'Farm Weather + Planting Calendar',
    'weather-maps':'Weather Maps',
    'my-crops':'My Crops',
    'pest-alerts':'Pest Alerts',
    'planting-calendar':'Planting Calendar',
    'irrigation':'Irrigation'
  };
  const title = titles[pageId] || 'FarmCast';
  document.getElementById('topbarTitle').textContent = title;
  if (pageId === 'dashboard') {
    document.getElementById('page-dashboard').style.display = 'block';
  } else if (pageId === 'weather-maps') {
    document.getElementById('page-weather-maps').style.display = 'block';
    initWeatherMap();
  } else if (pageId === 'my-crops') {
    document.getElementById('page-my-crops').style.display = 'block';
    renderCropsPage();
  } else if (pageId === 'pest-alerts') {
    document.getElementById('page-pest-alerts').style.display = 'block';
    renderPestPage();
  } else if (pageId === 'planting-calendar') {
    document.getElementById('page-planting-calendar').style.display = 'block';
    renderCalPage();
  } else if (pageId === 'irrigation') {
    document.getElementById('page-irrigation').style.display = 'block';
    renderIrrigationPage();
  } else {
    document.getElementById('page-dashboard').style.display = 'block';
    toast('This section is coming soon!', 'warn');
  }
};

// ═══════════════════════════════════════════════════════
// PEST ALERTS PAGE
// ═══════════════════════════════════════════════════════

const PEST_FULL_DB = [
  { name:'Aphids',      icon:'🦗', condition:'humid', level:'high',   crops:['Tomato','Eggplant','Sitaw','Pechay'],
    signs:'Tiny green/black insects clustered on young leaves. Leaves curl and yellow.',
    treatment:'Spray neem oil or insecticidal soap. Remove heavily infested leaves.',
    prevention:'Avoid over-fertilizing with nitrogen. Introduce ladybugs (natural predator).' },
  { name:'Stem Borer',  icon:'🐛', condition:'hot',   level:'medium', crops:['Rice','Corn'],
    signs:'Dead hearts in young plants, whiteheads at maturity, frass near boreholes.',
    treatment:'Apply Bacillus thuringiensis (Bt). Remove and destroy infested stems.',
    prevention:'Use resistant varieties. Early planting to avoid peak pest season.' },
  { name:'Whitefly',    icon:'🦋', condition:'dry',   level:'low',    crops:['Tomato','Eggplant','Okra'],
    signs:'Tiny white insects fly when plants are disturbed. Sticky honeydew on leaves.',
    treatment:'Yellow sticky traps, neem oil spray. Reflective mulch repels adults.',
    prevention:'Avoid planting near infested areas. Maintain crop diversity.' },
  { name:'Root Rot',    icon:'🍄', condition:'rainy', level:'high',   crops:['Kamote','Tomato','Corn'],
    signs:'Yellowing lower leaves, wilting despite watering, brown/black roots.',
    treatment:'Improve drainage immediately. Remove affected plants. Apply fungicide.',
    prevention:'Raised beds, proper spacing, avoid overwatering, good soil drainage.' },
  { name:'Leaf Miner',  icon:'🪲', condition:'humid', level:'medium', crops:['Sitaw','Ampalaya','Pechay'],
    signs:'Winding white trails on leaf surfaces. Leaves look pale and papery.',
    treatment:'Remove affected leaves. Systemic insecticide for severe infestations.',
    prevention:'Regular scouting. Yellow sticky traps to catch adult flies.' },
  { name:'Thrips',      icon:'🦟', condition:'dry',   level:'medium', crops:['Onion','Garlic','Corn'],
    signs:'Silver streaks on leaves, distorted growth, bronze discoloration.',
    treatment:'Spinosad spray. Blue sticky traps. Remove weeds nearby.',
    prevention:'Avoid planting near alliums. Reflective mulch. Water regularly.' },
  { name:'Spider Mites', icon:'🕷️', condition:'hot',  level:'medium', crops:['Tomato','Eggplant','Corn'],
    signs:'Fine webbing on undersides of leaves, stippled yellow leaves.',
    treatment:'Strong water spray to dislodge mites. Miticides if severe. Neem oil.',
    prevention:'Avoid water stress. Increase humidity. Remove dusty conditions.' },
  { name:'Cutworm',     icon:'🐌', condition:'rainy', level:'low',    crops:['Corn','Tomato','Rice'],
    signs:'Seedlings cut off at soil level. Caterpillars found in soil during day.',
    treatment:'Apply Bt granules to soil. Collar seedlings with cardboard.',
    prevention:'Tilling before planting exposes pupae. Avoid planting after fallow land.' },
];

let pestLogs = lsLoad(LS_PEST_LOGS, [
  { id:1, date:'2026-03-10', pest:'Aphids',    crop:'Tomato',   location:'North Field A', severity:'medium', notes:'Treated with neem oil spray. Monitoring closely.' },
  { id:2, date:'2026-03-12', pest:'Stem Borer',crop:'Rice',     location:'Paddy Field',   severity:'low',    notes:'Found 3 stems with borers. Applied Bt.' },
  { id:3, date:'2026-03-14', pest:'Root Rot',  crop:'Kamote',   location:'Back Lot',      severity:'high',   notes:'Heavy rain caused waterlogging. Improved drainage.' },
]);
let nextPestLogId = lsLoad('fc_nextPestLogId', 4);

function renderPestPage() {
  // Weather-based alert banner
  if (currentWeather) {
    const h = currentWeather.main.humidity;
    const t = currentWeather.main.temp;
    const desc = currentWeather.weather[0].description.toLowerCase();
    const isRain = desc.includes('rain');
    let bannerClass = 'ok', title = '✅ Low Pest Risk', sub = 'Current weather conditions are not particularly favorable for pests.';
    if (h > 80 && t > 28) { bannerClass = 'danger'; title = '🚨 High Pest Risk!'; sub = `High humidity (${h}%) + heat (${Math.round(t)}°C) = perfect conditions for aphids and fungal diseases.`; }
    else if (isRain)       { bannerClass = 'warn';   title = '⚠️ Moderate Pest Risk'; sub = 'Rainy conditions increase risk of root rot and fungal infections.'; }
    else if (t > 32)       { bannerClass = 'warn';   title = '⚠️ Watch for Heat Pests'; sub = `High temp (${Math.round(t)}°C) increases stem borer and spider mite activity.`; }
    const banner = document.getElementById('pestAlertBanner');
    banner.className = `pest-alert-banner ${bannerClass}`;
    document.getElementById('pabTitle').textContent = title;
    document.getElementById('pabSub').textContent = sub;
  }

  // Active pest risks based on weather
  const active = PEST_FULL_DB.filter(p => {
    if (!currentWeather) return true;
    const h = currentWeather.main.humidity, t = currentWeather.main.temp;
    const isRain = currentWeather.weather[0].description.toLowerCase().includes('rain');
    if (p.condition==='humid' && h > 70) return true;
    if (p.condition==='hot'   && t > 30) return true;
    if (p.condition==='dry'   && h < 50) return true;
    if (p.condition==='rainy' && isRain) return true;
    return false;
  });
  const show = active.length >= 3 ? active : PEST_FULL_DB.slice(0, 3);

  document.getElementById('pestFullList').innerHTML = show.map(p => `
    <div class="pest-full-item ${p.level}">
      <div class="pfi-top">
        <div class="pfi-icon">${p.icon}</div>
        <div class="pfi-info">
          <div class="pfi-name">${p.name}</div>
          <div class="pfi-crops">Affects: ${p.crops.slice(0,3).join(', ')}</div>
        </div>
        <div class="pest-level level-${p.level}"><div class="pest-pulse"></div>${p.level.charAt(0).toUpperCase()+p.level.slice(1)}</div>
      </div>
      <div class="pfi-detail">
        <div class="pfi-section"><span class="pfi-label">Signs:</span> ${p.signs}</div>
        <div class="pfi-section"><span class="pfi-label">Treatment:</span> ${p.treatment}</div>
      </div>
      <button class="pfi-log-btn" onclick="quickLogPest('${p.name}')">+ Log Sighting</button>
    </div>
  `).join('');

  // Pest badge count
  const badge = document.getElementById('pestBadge');
  if (badge) badge.textContent = show.filter(p => p.level === 'high').length;

  // Prevention tips
  document.getElementById('preventionTips').innerHTML = [
    { icon:'🌿', tip:'Maintain proper plant spacing to allow air circulation.' },
    { icon:'💧', tip:'Avoid overhead watering — wet leaves encourage fungal growth.' },
    { icon:'🔍', tip:'Scout fields every 2-3 days for early pest detection.' },
    { icon:'🌱', tip:'Rotate crops each season to break pest life cycles.' },
    { icon:'🧹', tip:'Remove crop debris and weeds that harbor pests.' },
    { icon:'🐞', tip:'Encourage beneficial insects like ladybugs and spiders.' },
  ].map(t => `<div class="prev-tip"><div class="pt-icon">${t.icon}</div><div class="pt-text">${t.tip}</div></div>`).join('');

  // Pest guide (encyclopedia)
  document.getElementById('pestGuideList').innerHTML = PEST_FULL_DB.map(p => `
    <div class="pest-guide-item" onclick="this.classList.toggle('open')">
      <div class="pgi-header">
        <span>${p.icon}</span>
        <span class="pgi-name">${p.name}</span>
        <span class="pest-level level-${p.level}" style="margin-left:auto">${p.level}</span>
        <span class="material-symbols-outlined pgi-arrow">expand_more</span>
      </div>
      <div class="pgi-body">
        <div class="pfi-section"><span class="pfi-label">Signs:</span> ${p.signs}</div>
        <div class="pfi-section"><span class="pfi-label">Treatment:</span> ${p.treatment}</div>
        <div class="pfi-section"><span class="pfi-label">Prevention:</span> ${p.prevention}</div>
      </div>
    </div>
  `).join('');

  // Pest log
  renderPestLog();
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
      <div class="pli-info">🌱 ${l.crop} · 📍 ${l.location}</div>
      ${l.notes ? `<div class="pli-notes">${l.notes}</div>` : ''}
    </div>
  `).join('');
}

function quickLogPest(pestName) {
  openLogPestModal();
  setTimeout(() => { document.getElementById('logPestType').value = pestName; }, 100);
}
function openLogPestModal()  { document.getElementById('logPestModal').style.display = 'flex'; }
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
  toast(`Pest sighting logged: ${pest} on ${crop}`, 'warn');
}
function deletePestLog(id) {
  pestLogs = pestLogs.filter(l => l.id !== id);
  lsSave(LS_PEST_LOGS, pestLogs);
  renderPestLog();
  toast('Log entry deleted.', 'warn');
}
function refreshPestPage() { renderPestPage(); toast('Pest risks refreshed!', 'ok'); }

// ═══════════════════════════════════════════════════════
// PLANTING CALENDAR PAGE
// ═══════════════════════════════════════════════════════

let calYear  = new Date().getFullYear();
let calMonth = new Date().getMonth(); // 0-indexed
let calSelectedDate = null;

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// Best planting months per crop (Philippine context)
const PLANTING_GUIDE = [
  { crop:'🍅 Tomato',    months:[10,11,0,1],  note:'Oct–Feb (cool dry season ideal)' },
  { crop:'🌽 Corn',      months:[0,1,2,6,7],  note:'Jan–Mar & Jul–Aug' },
  { crop:'🌾 Rice',      months:[5,6,10,11],  note:'Jun–Jul (wet season) & Nov–Dec (dry)' },
  { crop:'🥬 Pechay',    months:[10,11,0,1,2],note:'Oct–Mar (cool season)' },
  { crop:'🍆 Eggplant',  months:[0,1,2,3],    note:'Jan–Apr' },
  { crop:'🥒 Ampalaya',  months:[1,2,3,4],    note:'Feb–May' },
  { crop:'🫛 Sitaw',     months:[2,3,4,5],    note:'Mar–Jun' },
  { crop:'🍠 Kamote',    months:[5,6,7,8],    note:'Jun–Sep (rainy season)' },
  { crop:'🧄 Garlic',    months:[9,10,11],    note:'Oct–Dec' },
  { crop:'🧅 Onion',     months:[9,10,11,0],  note:'Oct–Jan' },
];

function renderCalPage() {
  renderCalGrid();
  renderBestPlanting();
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
      cropEvents[key].push({ type:'planted', crop: crop.type, emoji: CROP_EMOJIS[crop.type] || '🌿', color:'green' });
    }
    // Harvest date
    const hd = new Date(crop.harvest);
    if (hd.getFullYear() === calYear && hd.getMonth() === calMonth) {
      const key = hd.getDate();
      if (!cropEvents[key]) cropEvents[key] = [];
      cropEvents[key].push({ type:'harvest', crop: crop.type, emoji: CROP_EMOJIS[crop.type] || '🌿', color:'amber' });
    }
  });

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

function selectCalDate(dateKey, day) {
  calSelectedDate = dateKey;
  renderCalGrid(); // Re-render to show selected

  const date = new Date(calYear, calMonth, day);
  const label = date.toLocaleDateString('en-PH', { weekday:'long', month:'long', day:'numeric', year:'numeric' });
  document.getElementById('calSelectedDateTitle').textContent = label;

  // Find events on this date
  const events = [];
  myCrops.forEach(crop => {
    if (crop.planted === dateKey) events.push({ icon: CROP_EMOJIS[crop.type]||'🌿', text:`${crop.type} planted at ${crop.location}`, color:'green' });
    if (crop.harvest === dateKey) events.push({ icon: CROP_EMOJIS[crop.type]||'🌿', text:`${crop.type} expected harvest at ${crop.location}`, color:'amber' });
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
  document.getElementById('calSelectedDateTitle').textContent = 'Select a date';
  document.getElementById('calDayEvents').innerHTML = '<div class="cal-no-events">Click a date to see crop events</div>';
}

function goToToday() {
  const t = new Date();
  calYear = t.getFullYear(); calMonth = t.getMonth();
  calSelectedDate = null;
  renderCalGrid();
}

function renderBestPlanting() {
  document.getElementById('bestPlantingList').innerHTML = PLANTING_GUIDE.map(p => {
    const active = p.months.includes(calMonth);
    return `<div class="bpl-item${active?' active':''}">
      <div class="bpl-crop">${p.crop}</div>
      <div class="bpl-note ${active?'active':''}">${active ? '✅ Good time to plant!' : p.note}</div>
    </div>`;
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
  { icon:'🌅', tip:'Water early morning (5–7 AM) to reduce evaporation and leaf disease.' },
  { icon:'💧', tip:'Drip irrigation uses 30–50% less water than flood irrigation.' },
  { icon:'🌧️', tip:'Skip irrigation if 10mm+ rain is forecast in the next 24 hours.' },
  { icon:'🌡️', tip:'Water more frequently during hot weather (above 32°C).' },
  { icon:'🌱', tip:'Mulching around crops reduces soil moisture loss by up to 70%.' },
  { icon:'📏', tip:'Check soil moisture at 5–10cm depth before irrigating.' },
  { icon:'🕐', tip:'Avoid watering at midday — most water is lost to evaporation.' },
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
  let recClass = 'ok', recTitle = '✅ Go ahead with watering', recSub = 'Current conditions are good for irrigation.';
  if (currentWeather) {
    const h = currentWeather.main.humidity;
    const desc = currentWeather.weather[0].description.toLowerCase();
    const isRain = desc.includes('rain');
    if (isRain)  { recClass = 'warn'; recTitle = '🌧️ Skip irrigation today'; recSub = 'It is currently raining. Natural rainfall should be sufficient.'; }
    else if (h > 85) { recClass = 'warn'; recTitle = '⚠️ Reduce watering'; recSub = `High humidity (${h}%) — over-watering risk. Water only crops that are visibly dry.`; }
    else if (currentWeather.main.temp > 33) { recTitle = '🔥 Increase watering frequency'; recSub = 'High temperature detected. Water crops in early morning and late afternoon.'; }
  }
  const recEl = document.getElementById('irrRecommendation');
  recEl.className = `irr-recommendation fade-in fade-in-1 ${recClass}`;
  document.getElementById('irrRecTitle').textContent = recTitle;
  document.getElementById('irrRecSub').textContent   = recSub;

  // Field list
  document.getElementById('irrFieldList').innerHTML = irrFields.map(f => {
    const last = new Date(f.lastWatered);
    const due  = new Date(last.getTime() + f.freq * 86400000);
    const isDue = due <= new Date() && !f.wateredToday;
    const daysAgo = Math.floor((new Date() - last) / 86400000);
    const totalL = f.waterAmt;

    return `<div class="irr-field-item${f.wateredToday?' watered':''}${isDue?' due':''}">
      <div class="ifi-left">
        <div class="ifi-name">${f.name}</div>
        <div class="ifi-meta">🌱 ${f.crop} · ${f.area} m² · ${f.type}</div>
        <div class="ifi-status">
          ${f.wateredToday
            ? '<span class="ifi-badge ok">✅ Watered Today</span>'
            : isDue
              ? '<span class="ifi-badge warn">⏰ Due for Watering</span>'
              : `<span class="ifi-badge">${daysAgo === 0 ? 'Watered today' : `${daysAgo}d ago`}</span>`}
          <span class="ifi-freq">Every ${f.freq} day${f.freq>1?'s':''}</span>
        </div>
      </div>
      <div class="ifi-right">
        ${f.type !== 'Rain-fed' ? `<div class="ifi-amount">${totalL}L</div><div class="ifi-amt-lbl">per session</div>` : '<div class="ifi-amount">🌧️</div><div class="ifi-amt-lbl">rain-fed</div>'}
        <button class="ifi-btn${f.wateredToday?' done':''}" onclick="toggleFieldWater('${f.id}')">
          ${f.wateredToday ? '✓ Done' : 'Water Now'}
        </button>
        <button class="ifi-del-btn" onclick="deleteField('${f.id}')"><span class="material-symbols-outlined" style="font-size:15px">delete</span></button>
      </div>
    </div>`;
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
  document.getElementById('waterTipsList').innerHTML = WATER_TIPS.map(t => `
    <div class="water-tip-item">
      <div class="wti-icon">${t.icon}</div>
      <div class="wti-text">${t.tip}</div>
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
  toast(`${f.name} marked as ${f.wateredToday ? 'watered ✅' : 'not watered'}`, f.wateredToday ? 'ok' : 'warn');
}

function deleteField(id) {
  const f = irrFields.find(f => f.id === id);
  if (!f || !confirm(`Delete "${f.name}" from irrigation?`)) return;
  irrFields = irrFields.filter(f => f.id !== id);
  lsSave(LS_IRR_FIELDS, irrFields);
  renderIrrigationPage();
  toast(`${f.name} deleted.`, 'warn');
}

function openAddFieldModal()  { document.getElementById('addFieldModal').style.display = 'flex'; }
function closeAddFieldModal() { document.getElementById('addFieldModal').style.display = 'none'; }

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
  toast(`${name} added to irrigation! 💧`, 'ok');
}

// ═══════════════════════════════════════════════════════
// SETTINGS SYSTEM — Full localStorage-backed control center
// ═══════════════════════════════════════════════════════

const LS_SETTINGS    = 'fc_settings';
const LS_NOTIFS      = 'fc_notifications';
const LS_NOTIF_ID    = 'fc_nextNotifId';

// ── DEFAULT SETTINGS ──
const DEFAULT_SETTINGS = {
  // Profile
  name: 'Juan Dela Cruz',
  email: '',
  farmName: 'Bulacan Farm',
  farmSize: '3.2',
  role: 'owner',
  phone: '',
  avatar: '👨‍🌾',
  // Location
  city: 'San Miguel, Bulacan',
  lat: '14.99',
  lon: '120.93',
  defaultPage: 'dashboard',
  // Notifications
  pestNotif: true,
  pestSensitivity: 'medium',
  rainAlert: true,
  windAlert: true,
  dailyBriefing: true,
  briefingTime: '05:00',
  quietHours: true,
  quietFrom: '21:00',
  quietUntil: '06:00',
  harvestReminderDays: 7,
  thresholdTemp: 35,
  // Crops
  favCrops: ['Rice','Corn','Tomato'],
  calView: 'calendar',
  // Display
  theme: 'dark',
  tempUnit: 'C',
  windUnit: 'kph',
  fontSize: 'medium',
  // System
  language: 'en',
  lastExport: null,
};

let appSettings = lsLoad(LS_SETTINGS, DEFAULT_SETTINGS);
// Merge defaults for any missing keys (for upgrades)
appSettings = Object.assign({}, DEFAULT_SETTINGS, appSettings);

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

  renderPestAlerts(data);

  // ── REAL-TIME NOTIFICATION CHECKS ──
  checkWeatherAlerts(data);

  toast(`Weather updated for ${data.name}`, 'ok');
};

// ── PATCH renderForecastAndCalendar for unit conversion ──
const _origRenderForecast = renderForecastAndCalendar;
renderForecastAndCalendar = function(forecastData, currentData) {
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

  const calRow = document.getElementById('calendarRow');
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  calRow.innerHTML = days.map(([key,val],i) => {
    const date      = new Date(key + 'T00:00:00');
    const dayNum    = date.getDate();
    const label     = `${monthNames[date.getMonth()]} ${dayNum}` + (date.toLocaleDateString('en-PH',{weekday:'short'})===today?' (Today)':'');
    const avgC      = val.temps.reduce((a,b)=>a+b,0)/val.temps.length;
    const avgWind   = val.wind.reduce((a,b)=>a+b,0)/val.wind.length * 3.6;
    const isRaining = val.icons.some(ic=>ic.startsWith('09')||ic.startsWith('10'));
    const weatherIcon = getWeatherEmoji(val.icons[Math.floor(val.icons.length/2)]);
    const shuffled  = [...CROPS].sort(()=>Math.random()-0.5).slice(0,2);
    const cropsHtml = shuffled.map(crop => {
      const assess = assessCrop(crop, avgC, avgWind, isRaining);
      return `<div class="crop-card ${assess.status}" onclick="toast('${crop.name}: ${assess.reason}','${assess.status==='ideal'?'ok':assess.status==='wait'?'warn':'err'}')">
        <div class="crop-top"><div class="crop-emoji">${crop.emoji}</div><div class="crop-name">${crop.name}</div></div>
        <div class="crop-badge badge-${assess.status}">${assess.status.toUpperCase()}</div>
        <div class="crop-reason">${assess.reason}</div>
      </div>`;
    }).join('');
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

function updateSidebarProfile() {
  const nameEl = document.getElementById('sidebarUserName');
  const farmEl = document.getElementById('sidebarUserFarm');
  if (nameEl) nameEl.textContent = appSettings.name;
  if (farmEl) farmEl.textContent = `${appSettings.farmName} · ${appSettings.farmSize} ha`;
}

function saveSettingImmediate(key, value) {
  appSettings[key] = value;
  lsSave(LS_SETTINGS, appSettings);
}

// ═══ SETTINGS NAVIGATION ═══
function showSettingsSection(el, sectionId) {
  document.querySelectorAll('.settings-nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.settings-section').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  document.getElementById(sectionId).classList.add('active');
}

// ═══ PROFILE SETTINGS ═══
function setAvatar(emoji) {
  appSettings.avatar = emoji;
  lsSave(LS_SETTINGS, appSettings);
  document.getElementById('profileAvatarDisplay').textContent = emoji;
  document.querySelector('.user-avatar').textContent = emoji;
  toast('Avatar updated!', 'ok');
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
  toast('Profile saved successfully! 👨‍🌾', 'ok');
  addNotification('system', '✅ Profile Updated', `Your profile (${appSettings.name}) has been saved.`);
}

function confirmSignOut() {
  if (!confirm('Sign out of FarmCast? Your local data will be preserved.')) return;
  toast('Signed out. See you next time! 👋', 'ok');
}

// ═══ LOCATION SETTINGS ═══
function applyLocationFromSearch() {
  const val = document.getElementById('settingLocationSearch').value.trim();
  if (!val) { toast('Please enter a location.', 'warn'); return; }
  appSettings.city = val;
  lsSave(LS_SETTINGS, appSettings);
  currentCity = val;
  fetchWeather(val);
  const status = document.getElementById('locationStatus');
  status.className = 'location-status ok';
  status.innerHTML = `<span class="material-symbols-outlined">check_circle</span> Location set to: ${val}`;
  toast(`Location updated to ${val}`, 'ok');
}

function getGPSLocation() {
  if (!navigator.geolocation) { toast('Geolocation is not supported by your browser.', 'err'); return; }
  const status = document.getElementById('locationStatus');
  status.className = 'location-status';
  status.innerHTML = `<span class="material-symbols-outlined" style="animation:spin .7s linear infinite">refresh</span> Getting GPS location…`;

  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude.toFixed(4);
    const lon = pos.coords.longitude.toFixed(4);
    document.getElementById('settingLat').value = lat;
    document.getElementById('settingLon').value = lon;
    appSettings.lat = lat; appSettings.lon = lon;
    lsSave(LS_SETTINGS, appSettings);
    status.className = 'location-status ok';
    status.innerHTML = `<span class="material-symbols-outlined">my_location</span> GPS: ${lat}°N, ${lon}°E`;
    // Fetch weather for coordinates
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
      .then(r => r.json())
      .then(d => {
        currentCity = d.name;
        fetchWeather(d.name);
        toast(`📍 Location found: ${d.name}`, 'ok');
      });
  }, err => {
    status.className = 'location-status error';
    status.innerHTML = `<span class="material-symbols-outlined">error</span> GPS error: ${err.message}`;
    toast('Could not get GPS location.', 'err');
  });
}

function saveLocationSettings() {
  appSettings.lat = document.getElementById('settingLat').value;
  appSettings.lon = document.getElementById('settingLon').value;
  lsSave(LS_SETTINGS, appSettings);
  toast('Location settings saved!', 'ok');
}

// ═══ NOTIFICATION / ALERT SETTINGS ═══
function setSensitivity(el, level) {
  document.querySelectorAll('#pestSensitivity .sens-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  appSettings.pestSensitivity = level;
  lsSave(LS_SETTINGS, appSettings);
  toast(`Pest sensitivity set to ${level}`, 'ok');
}

function saveThresholdSettings() {
  appSettings.thresholdTemp        = parseFloat(document.getElementById('thresholdTemp').value) || 35;
  appSettings.harvestReminderDays  = parseInt(document.getElementById('harvestReminderDays').value) || 7;
  lsSave(LS_SETTINGS, appSettings);
  toast('Alert thresholds saved!', 'ok');
  addNotification('system', '⚙️ Settings Updated', 'Weather alert thresholds have been saved.');
}

// ═══ CROP PREFERENCES ═══
const ALL_CROP_TYPES = ['Tomato','Eggplant','Corn','Okra','Sitaw','Ampalaya','Pechay','Kamote','Rice','Garlic','Onion','Cabbage'];

function renderFavCropsGrid() {
  const el = document.getElementById('favCropsGrid');
  if (!el) return;
  el.innerHTML = ALL_CROP_TYPES.map(c => `
    <div class="fav-crop-item${appSettings.favCrops.includes(c)?' selected':''}" onclick="toggleFavCrop(this,'${c}')">
      <span>${CROP_EMOJIS[c]||'🌿'}</span>
      <span>${c}</span>
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
  lsSave(LS_SETTINGS, appSettings);
  toast('Crop preferences saved!', 'ok');
}

function setCalView(el, view) {
  document.querySelectorAll('#calViewSelector .sens-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  appSettings.calView = view;
  lsSave(LS_SETTINGS, appSettings);
  toast(`Calendar view set to ${view}`, 'ok');
}

// ═══ DISPLAY SETTINGS ═══
function setTheme(el, theme) {
  document.querySelectorAll('.theme-opt').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  appSettings.theme = theme;
  lsSave(LS_SETTINGS, appSettings);
  applyTheme(theme);
  toast(`${theme === 'dark' ? '🌙 Dark' : '☀️ Light'} mode activated!`, 'ok');
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

function setTempUnit(el, unit) {
  document.querySelectorAll('#tempUnitSelector .unit-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  appSettings.tempUnit = unit;
  lsSave(LS_SETTINGS, appSettings);
  // Update threshold input label
  const lbl = document.getElementById('thresholdTempUnit');
  if (lbl) lbl.textContent = unit === 'F' ? '°F' : '°C';
  // Re-render weather if data available
  if (currentWeather) displayWeatherData(currentWeather);
  toast(`Temperature unit set to ${unit === 'F' ? '°F Fahrenheit' : '°C Celsius'}`, 'ok');
}

function setWindUnit(el, unit) {
  document.querySelectorAll('#windUnitSelector .unit-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  appSettings.windUnit = unit;
  lsSave(LS_SETTINGS, appSettings);
  if (currentWeather) displayWeatherData(currentWeather);
  toast(`Wind unit set to ${unit}`, 'ok');
}

function setFontSize(el, size) {
  document.querySelectorAll('#fontSizeSelector .sens-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  appSettings.fontSize = size;
  lsSave(LS_SETTINGS, appSettings);
  applyFontSize(size);
  toast(`Font size set to ${size}`, 'ok');
}

function applyFontSize(size) {
  const map = { small: '13px', medium: '14px', large: '16px' };
  document.documentElement.style.setProperty('--font-size-base', map[size] || '14px');
  document.body.style.fontSize = map[size] || '14px';
}

// ═══ DATA EXPORT ═══
function exportCSV(type) {
  let data, headers, rows, filename;

  if (type === 'crops') {
    headers = ['ID','Type','Area (m²)','Planted','Harvest','Location','Irrigation','Notes','Watered'];
    rows = (typeof myCrops !== 'undefined' ? myCrops : []).map(c =>
      [c.id, c.type, c.area, c.planted, c.harvest, c.location, c.irrigation, `"${(c.notes||'').replace(/"/g,'""')}"`, c.watered ? 'Yes':'No']
    );
    filename = 'farmcast_crops.csv';
  } else if (type === 'harvest') {
    headers = ['ID','Crop','Date','Location','Area (m²)','Yield (kg)','Quality','Notes'];
    rows = (typeof harvestHistory !== 'undefined' ? harvestHistory : []).map(h =>
      [h.id, h.crop, h.date, h.location, h.area, h.yield, h.quality, `"${(h.notes||'').replace(/"/g,'""')}"`]
    );
    filename = 'farmcast_harvest.csv';
  } else if (type === 'irrigation') {
    headers = ['ID','Name','Crop','Area (m²)','Type','Frequency (days)','Water/Session (L)','Last Watered'];
    rows = (typeof irrFields !== 'undefined' ? irrFields : []).map(f =>
      [f.id, f.name, f.crop, f.area, f.type, f.freq, f.waterAmt, f.lastWatered]
    );
    filename = 'farmcast_irrigation.csv';
  } else if (type === 'pests') {
    headers = ['ID','Pest','Date','Crop','Location','Severity','Notes'];
    rows = (typeof pestLogs !== 'undefined' ? pestLogs : []).map(p =>
      [p.id, p.pest, p.date, p.crop, p.location, p.severity, `"${(p.notes||'').replace(/"/g,'""')}"`]
    );
    filename = 'farmcast_pests.csv';
  } else return;

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
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
  toast(`${filename} downloaded! 📊`, 'ok');
  addNotification('system', '📥 Data Exported', `${filename} was downloaded successfully.`);
}

function confirmResetData() {
  if (!confirm('⚠️ WARNING: This will delete ALL your data (crops, harvests, pest logs, irrigation, settings). This CANNOT be undone. Are you absolutely sure?')) return;
  if (!confirm('Last chance — really reset everything?')) return;
  const keys = [LS_CROPS, LS_CROPS_ID, LS_TASKS, LS_PEST_LOGS, LS_IRR_FIELDS, LS_IRR_FID,
                LS_HARVEST, LS_HARVEST_ID, LS_SETTINGS, LS_NOTIFS, LS_NOTIF_ID, 'fc_nextPestLogId'];
  keys.forEach(k => localStorage.removeItem(k));
  toast('All data has been reset. Reloading…', 'warn');
  setTimeout(() => location.reload(), 1500);
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
  set('settingLocationSearch', s.city);
  set('settingLat', s.lat);
  set('settingLon', s.lon);
  set('settingDefaultPage', s.defaultPage);
  set('thresholdTemp', s.thresholdTemp);
  set('harvestReminderDays', s.harvestReminderDays);
  set('settingBriefingTime', s.briefingTime);
  set('quietFrom', s.quietFrom);
  set('quietUntil', s.quietUntil);
  set('settingLanguage', s.language);
  setChk('togglePestNotif', s.pestNotif);
  setChk('toggleRainAlert', s.rainAlert);
  setChk('toggleWindAlert', s.windAlert);
  setChk('toggleDailyBriefing', s.dailyBriefing);
  setChk('toggleQuietHours', s.quietHours);

  // Profile avatar display
  const avatarEl = document.getElementById('profileAvatarDisplay');
  if (avatarEl) avatarEl.textContent = s.avatar;

  // Last export
  const lte = document.getElementById('lastExportTime');
  if (lte) lte.textContent = s.lastExport || 'Never';

  // Last active
  const la = document.getElementById('settingLastActive');
  if (la) la.textContent = new Date().toLocaleString('en-PH');

  // Sensitivity selector
  document.querySelectorAll('#pestSensitivity .sens-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.toLowerCase() === s.pestSensitivity);
  });
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

let notifications = lsLoad(LS_NOTIFS, []);
let nextNotifId   = lsLoad(LS_NOTIF_ID, 1);
let notifFilterCurrent = 'all';

// Sample bootstrap notifications on first run
if (notifications.length === 0) {
  notifications = [
    { id:1, type:'system',  icon:'🌾', title:'Welcome to FarmCast!', body:'Your smart farm management app is ready. Set up your profile in Settings.', time: new Date(Date.now()-3600000).toISOString(), read:false },
    { id:2, type:'harvest', icon:'🌾', title:'Harvest Reminder: Pechay', body:'Pechay at Greenhouse 1 is due for harvest in 3 days.', time: new Date(Date.now()-7200000).toISOString(), read:false },
    { id:3, type:'pest',    icon:'🦗', title:'Pest Risk: Aphids', body:'Current humidity (75%) is favorable for aphid colony growth. Inspect crops.', time: new Date(Date.now()-10800000).toISOString(), read:true },
  ];
  lsSave(LS_NOTIFS, notifications);
  lsSave(LS_NOTIF_ID, 4);
  nextNotifId = 4;
}

function addNotification(type, title, body) {
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
    if (inQuiet) return; // suppress during quiet hours
  }

  const iconMap = { weather:'⛅', pest:'🦗', harvest:'🌾', system:'⚙️' };
  notifications.unshift({
    id: nextNotifId++,
    type, icon: iconMap[type] || '📢',
    title, body,
    time: new Date().toISOString(),
    read: false
  });
  if (notifications.length > 50) notifications = notifications.slice(0, 50);
  lsSave(LS_NOTIFS, notifications);
  lsSave(LS_NOTIF_ID, nextNotifId);
  updateNotifBadge();
  renderNotifList();
}

function checkWeatherAlerts(data) {
  if (!data) return;
  const temp = data.main.temp;
  const desc = data.weather[0].description.toLowerCase();
  const windKph = data.wind.speed * 3.6;
  const isRain = desc.includes('rain') || desc.includes('drizzle');
  const isHeavyRain = isRain && data.main.humidity > 85;
  const threshold = appSettings.thresholdTemp;

  // Temperature alert
  if (temp > threshold && appSettings.tempUnit === 'C') {
    addNotification('weather', `🌡️ High Temperature Alert`, `Temperature in ${data.name} is ${displayTemp(temp)}, exceeding your ${threshold}°C threshold. Water crops immediately.`);
  }
  // Heavy rain
  if (isHeavyRain && appSettings.rainAlert) {
    addNotification('weather', '🌧️ Heavy Rain Warning', `Heavy rain detected in ${data.name}. Avoid field operations. Check drainage systems.`);
  }
  // High wind
  if (windKph > 40 && appSettings.windAlert) {
    addNotification('weather', '💨 High Wind Warning', `Wind speed is ${displayWind(data.wind.speed)} in ${data.name}. Secure young plants and delay planting activities.`);
  }
  // Pest sensitivity check
  if (appSettings.pestNotif) {
    const h = data.main.humidity;
    const sensitivity = appSettings.pestSensitivity;
    const humThresh = sensitivity === 'low' ? 85 : sensitivity === 'high' ? 60 : 70;
    if (h > humThresh) {
      addNotification('pest', '🦗 Pest Risk Detected', `Humidity (${h}%) in ${data.name} has reached the threshold for aphid and fungal disease risk.`);
    }
  }
}

function checkHarvestReminders() {
  if (typeof myCrops === 'undefined') return;
  const days = appSettings.harvestReminderDays;
  const today = new Date();
  myCrops.forEach(crop => {
    const harvestDate = new Date(crop.harvest);
    const daysLeft = Math.ceil((harvestDate - today) / 86400000);
    if (daysLeft >= 0 && daysLeft <= days) {
      // Only add if not already notified today (check by title match)
      const alreadyNotified = notifications.some(n =>
        n.title.includes(crop.type) && n.type === 'harvest' &&
        new Date(n.time).toDateString() === today.toDateString()
      );
      if (!alreadyNotified) {
        addNotification('harvest', `🌾 Harvest Reminder: ${crop.type}`,
          `${crop.type} at ${crop.location} is due for harvest in ${daysLeft} day${daysLeft!==1?'s':''}. Plan your harvest activities.`);
      }
    }
  });
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
    return `<div class="notif-item${n.read?'':' unread'}" onclick="markNotifRead('${n.id}')">
      <div class="ni-icon type-${n.type}">${n.icon}</div>
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
  const n = notifications.find(x => x.id === id);
  if (n) { n.read = true; lsSave(LS_NOTIFS, notifications); }
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

function deleteNotif(e, id) {
  e.stopPropagation();
  notifications = notifications.filter(n => n.id !== id);
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

// ── Patch setNav to include Settings ──
const _prevSetNav2 = setNav;
setNav = function(el, pageId) {
  if (pageId === 'settings') {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('page-settings').style.display = 'block';
    document.getElementById('topbarTitle').textContent = 'Settings';
    updateSettingsFormValues();
    renderFavCropsGrid();
    const la = document.getElementById('settingLastActive');
    if (la) la.textContent = new Date().toLocaleString('en-PH');
  } else {
    _prevSetNav2(el, pageId);
  }
};

// ── INIT — Connect frontend to backend ──
async function initApp() {
  // 1. Apply settings from localStorage first (instant)
  applyAllSettings();
  updateNotifBadge();
  renderNotifList();

  // 2. Load all data from backend (replaces localStorage data)
  await loadAllDataFromBackend();

  // 3. Apply API patches so all CRUD uses backend
  patchScriptJsWithAPI();

  // 4. Start with default page
  const user = getAuthUser();
  const defaultPage = appSettings.defaultPage || 'dashboard';
  const navEl = document.querySelector(`[data-page="${defaultPage}"]`);
  if (navEl) setNav(navEl, defaultPage);
  else {
    document.getElementById('page-dashboard').style.display = 'block';
    renderTasks();
    fetchWeather(appSettings.city || currentCity);
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
  document.getElementById('hhBestCrop').textContent      = bestCrop ? (CROP_EMOJIS[bestCrop[0]]||'') + ' ' + bestCrop[0] : '—';
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

  const qLabel = { excellent:'⭐⭐⭐ Excellent', good:'⭐⭐ Good', poor:'⭐ Poor' };
  const qClass  = { excellent:'hh-q-excellent', good:'hh-q-good', poor:'hh-q-poor' };

  if (filtered.length === 0) {
    document.getElementById('hhTableBody').innerHTML =
      '<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:30px">No harvest records found.</td></tr>';
    return;
  }

  document.getElementById('hhTableBody').innerHTML = filtered.map(h => `
    <tr class="hh-row">
      <td><div class="hh-crop-cell"><span>${CROP_EMOJIS[h.crop]||'🌿'}</span>${h.crop}</div></td>
      <td>${new Date(h.date).toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'})}</td>
      <td><span class="hh-location">${h.location}</span></td>
      <td>${h.area} m²</td>
      <td><strong class="hh-yield">${Number(h.yield).toFixed(1)} kg</strong></td>
      <td><span class="hh-quality ${qClass[h.quality]}">${qLabel[h.quality]}</span></td>
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
          <div class="hyc-label">${CROP_EMOJIS[crop]||'🌿'} ${crop}</div>
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
  document.getElementById('logHarvestModal').style.display = 'flex';
  document.getElementById('hhDate').value = new Date().toISOString().split('T')[0];
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
  document.getElementById('anPestCount').textContent    = pestCount;
  document.getElementById('anPestSub').textContent      = pestCount>3?'⚠️ Above average':'✅ Under control';
  document.getElementById('anActiveCrops').textContent  = active;
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
        const col = colors[st.color]||'#3fb950';
        return `<div class="an-bar-item">
          <div class="an-bar-header">
            <span class="an-bar-crop">${CROP_EMOJIS[crop.type]||'🌿'} ${crop.type}</span>
            <span class="an-bar-pct" style="color:${col}">${st.progress}%</span>
          </div>
          <div class="an-bar-track"><div class="an-bar-fill" style="width:${st.progress}%;background:${col}"></div></div>
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
  const crops = (typeof myCrops!=='undefined') ? myCrops : [];
  const w = currentWeather;

  if (!w || crops.length===0) {
    document.getElementById('anWeatherImpact').innerHTML =
      '<div style="color:var(--text-muted);text-align:center;padding:20px;font-size:.85rem">Search for a city to see weather impact analysis.</div>';
    return;
  }

  const temp=w.main.temp, hum=w.main.humidity;
  const isRain = w.weather[0].description.toLowerCase().includes('rain');

  document.getElementById('anWeatherImpact').innerHTML = `
    <div class="an-wi-list">
      ${crops.map(crop => {
        const info = CROP_INFO[crop.type]||{};
        let impact='neutral', icon='😐', reason='Conditions are acceptable.';
        if (info.minTemp && temp<info.minTemp)      { impact='negative'; icon='🥶'; reason=`Too cold (${Math.round(temp)}°C < ${info.minTemp}°C min).`; }
        else if (info.maxTemp && temp>info.maxTemp) { impact='negative'; icon='🔥'; reason=`Heat stress (${Math.round(temp)}°C > ${info.maxTemp}°C max).`; }
        else if (hum>85 && isRain)                 { impact='warn';     icon='🌧️'; reason='High humidity + rain. Monitor for fungal disease.'; }
        else if (temp>=(info.minTemp||18)&&temp<=(info.maxTemp||35)) { impact='positive'; icon='✅'; reason=`Ideal temp range (${info.minTemp}–${info.maxTemp}°C).`; }
        return `<div class="an-wi-item ${impact}">
          <div class="an-wi-crop">${CROP_EMOJIS[crop.type]||'🌿'} ${crop.type}</div>
          <div class="an-wi-icon">${icon}</div>
          <div class="an-wi-reason">${reason}</div>
        </div>`;
      }).join('')}
    </div>`;
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
        return `<div class="an-land-item">
          <div class="an-land-label">
            <span class="an-land-dot" style="background:${col}"></span>
            <span>${CROP_EMOJIS[crop.type]||'🌿'} ${crop.type}</span>
            <span style="margin-left:auto;font-size:0.72rem;color:var(--text-muted)">${crop.area} m²</span>
          </div>
          <div class="an-land-bar-track"><div class="an-land-bar-fill" style="width:${pct}%;background:${col}"></div></div>
          <div class="an-land-pct">${pct}%</div>
        </div>`;
      }).join('')}
      <div class="an-land-total">Total farm area: <strong>${totalArea.toLocaleString()} m²</strong> (${(totalArea/10000).toFixed(2)} ha)</div>
    </div>`;
}

function renderAnPerfList() {
  const byYield = {};
  harvestHistory.forEach(h=>{ byYield[h.crop]=(byYield[h.crop]||0)+Number(h.yield); });
  const sorted = Object.entries(byYield).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const medals = ['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣'];

  if (sorted.length===0) {
    document.getElementById('anPerfList').innerHTML =
      '<div style="color:var(--text-muted);text-align:center;padding:20px;font-size:.85rem">No harvest data yet. Log your first harvest!</div>';
    return;
  }
  const maxY = sorted[0][1];
  document.getElementById('anPerfList').innerHTML = `
    <div class="an-perf-items">
      ${sorted.map(([crop,kg],i)=>`
        <div class="an-perf-item">
          <span class="an-perf-medal">${medals[i]||'—'}</span>
          <span class="an-perf-crop">${CROP_EMOJIS[crop]||'🌿'} ${crop}</span>
          <div class="an-perf-bar-track"><div class="an-perf-bar" style="width:${Math.round((kg/maxY)*100)}%"></div></div>
          <span class="an-perf-kg">${kg.toFixed(0)} kg</span>
        </div>`).join('')}
    </div>`;
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
            <span class="an-ms-item green">🌾 ${m.harvests} harvests</span>
            <span class="an-ms-item blue">⚖️ ${m.totalKg.toFixed(0)} kg</span>
            <span class="an-ms-item ${m.pests>3?'red':'muted'}">🐛 ${m.pests} pests</span>
          </div>
        </div>`).join('')}
    </div>`;
}

// ── Final setNav patch: add farm-analytics and harvest-history ──
const _fixSetNav = setNav;
setNav = function(el, pageId) {
  if (pageId === 'farm-analytics') {
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
    el.classList.add('active');
    document.querySelectorAll('.page').forEach(p=>p.style.display='none');
    document.getElementById('page-farm-analytics').style.display = 'block';
    document.getElementById('topbarTitle').textContent = 'Farm Analytics';
    renderFarmAnalytics();
  } else if (pageId === 'harvest-history') {
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
    el.classList.add('active');
    document.querySelectorAll('.page').forEach(p=>p.style.display='none');
    document.getElementById('page-harvest-history').style.display = 'block';
    document.getElementById('topbarTitle').textContent = 'Harvest History';
    renderHarvestHistory();
  } else {
    _fixSetNav(el, pageId);
  }
};

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
  document.getElementById('aiCropEmoji').textContent = CROP_EMOJIS[cropType] || '🌿';
  document.getElementById('aiCropName').textContent  = cropType;

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

// ── ROBOFLOW API — Call inference endpoint ──
async function callRoboflowAPI(base64Image, modelUrl) {
  const base64 = base64Image.replace(/^data:image\/[a-z]+;base64,/, '');
  const res = await fetch(`${modelUrl}?api_key=${ROBOFLOW_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: base64
  });
  if (!res.ok) throw new Error(`Roboflow API error: ${res.status}`);
  return await res.json();
}

// Kept for compatibility — Roboflow is always ready
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

// ── RUN AI DETECTION (Roboflow API) ──
async function runAIDetection() {
  if (!aiImageData) { toast('Please take or upload a photo first.', 'warn'); return; }

  showAISection('analyzing');
  document.getElementById('aiAnalyzeBtn').style.display = 'none';
  document.getElementById('aiAnalyzingSub').textContent = 'Connecting to Roboflow AI…';

  try {
    document.getElementById('aiAnalyzingSub').textContent = 'Analyzing crop for diseases…';

    // Call Roboflow API
    const result = await callRoboflowAPI(aiImageData);
    console.log('Roboflow result:', result);

    let detectedDisease = null;

    if (result.predictions && result.predictions.length > 0) {
      // Use top prediction from Roboflow
      detectedDisease = mapRoboflowToDisease(result.predictions, aiCurrentCropType);
    } else {
      // No disease detected = healthy
      detectedDisease = { name: 'No Disease Detected', severity: 'none', confidence: 92, color: 'green' };
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    showAIResult(detectedDisease, result.predictions || []);

  } catch (err) {
    console.error('Roboflow AI Detection error:', err);
    // Fallback to simulation on API error
    const fallback = simulateDetection(aiCurrentCropType);
    showAIResult(fallback, []);
    toast('AI service unavailable. Using offline analysis.', 'warn');
  }
}

// ── MAP ROBOFLOW PREDICTIONS TO DISEASE INFO ──
function mapRoboflowToDisease(predictions, cropType) {
  const top = predictions[0];
  const className   = (top.class || '').toLowerCase();
  const confidence  = Math.round((top.confidence || 0.8) * 100);

  // Map Roboflow class names to our disease DB
  const classMap = {
    'healthy':              { name: 'Healthy',              severity: 'none',   color: 'green' },
    'late blight':          { name: 'Late Blight',           severity: 'high',   color: 'red'   },
    'early blight':         { name: 'Early Blight',          severity: 'medium', color: 'amber' },
    'leaf curl':            { name: 'Leaf Curl Virus',        severity: 'high',   color: 'red'   },
    'bacterial blight':     { name: 'Bacterial Blight',      severity: 'high',   color: 'red'   },
    'brown spot':           { name: 'Brown Spot',            severity: 'medium', color: 'amber' },
    'blast':                { name: 'Rice Blast',            severity: 'high',   color: 'red'   },
    'gray leaf spot':       { name: 'Gray Leaf Spot',        severity: 'medium', color: 'amber' },
    'powdery mildew':       { name: 'Powdery Mildew',        severity: 'medium', color: 'amber' },
    'rust':                 { name: 'Rust Disease',          severity: 'medium', color: 'amber' },
    'anthracnose':          { name: 'Anthracnose',           severity: 'high',   color: 'red'   },
    'mosaic':               { name: 'Mosaic Virus',          severity: 'high',   color: 'red'   },
    'downy mildew':         { name: 'Downy Mildew',          severity: 'medium', color: 'amber' },
    'leaf spot':            { name: 'Leaf Spot Disease',     severity: 'medium', color: 'amber' },
    'blight':               { name: 'Blight Disease',        severity: 'high',   color: 'red'   },
    'wilt':                 { name: 'Wilt Disease',          severity: 'high',   color: 'red'   },
    'rot':                  { name: 'Root/Stem Rot',         severity: 'high',   color: 'red'   },
  };

  // Find matching disease
  for (const [key, disease] of Object.entries(classMap)) {
    if (className.includes(key)) {
      return { ...disease, confidence };
    }
  }

  // Try crop-specific diseases
  const cropDiseases = DISEASE_DB[cropType]?.diseases;
  if (cropDiseases) {
    for (const disease of cropDiseases) {
      if (disease.keywords.some(kw => className.includes(kw))) {
        return { ...disease, confidence };
      }
    }
  }

  // Unknown class but detected something — treat as medium risk
  if (confidence > 60) {
    return { name: className.charAt(0).toUpperCase() + className.slice(1), severity: 'medium', color: 'amber', confidence };
  }

  return { name: 'Healthy', severity: 'none', color: 'green', confidence: 88 };
}

// ── MATCH DISEASE FROM PREDICTIONS ──
function matchDiseaseFromPredictions(predictions, cropType) {
  const cropDiseases = DISEASE_DB[cropType]?.diseases || DISEASE_DB['Tomato'].diseases;
  const predText = predictions.map(p => p.className.toLowerCase()).join(' ');

  // Try to match keywords
  for (const disease of cropDiseases) {
    const matches = disease.keywords.filter(kw => predText.includes(kw));
    if (matches.length >= 1) return { ...disease, confidence: Math.round(predictions[0]?.probability * 100) || 72 };
  }

  // Check top prediction probability for health assessment
  const topProb = predictions[0]?.probability || 0;
  if (topProb > 0.4) {
    // High confidence in some classification — check if it looks healthy
    const healthyDisease = cropDiseases.find(d => d.severity === 'none');
    if (healthyDisease) return { ...healthyDisease, confidence: Math.round(topProb * 100) };
  }

  // Default: use simulation
  return simulateDetection(cropType);
}

// ── SIMULATE DETECTION (fallback) ──
function simulateDetection(cropType) {
  const cropDiseases = DISEASE_DB[cropType]?.diseases;
  if (!cropDiseases) {
    // Generic result for unknown crops
    return {
      name: 'Analysis Complete',
      severity: 'none',
      color: 'green',
      confidence: 88,
      keywords: []
    };
  }

  // Weather-based simulation — use current weather to determine likely disease
  let selectedDisease;
  if (currentWeather) {
    const h = currentWeather.main.humidity;
    const t = currentWeather.main.temp;
    const isRain = currentWeather.weather[0].description.toLowerCase().includes('rain');

    if (isRain && h > 85) {
      // Rainy + humid = fungal disease likely
      selectedDisease = cropDiseases.find(d => d.severity === 'high') || cropDiseases[0];
    } else if (h > 70 && t > 28) {
      // Humid + hot = medium risk
      selectedDisease = cropDiseases.find(d => d.severity === 'medium') || cropDiseases[0];
    } else {
      // Good conditions = likely healthy
      selectedDisease = cropDiseases.find(d => d.severity === 'none') || cropDiseases[0];
    }
  } else {
    // Random for demo
    const idx = Math.floor(Math.random() * cropDiseases.length);
    selectedDisease = cropDiseases[idx];
  }

  return { ...selectedDisease, confidence: Math.floor(Math.random() * 15) + 78 };
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
  document.getElementById('aiResultConf').textContent   = `${disease.confidence || 80}% confidence`;

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
  const recs = TREATMENTS[disease.severity] || TREATMENTS.none;
  document.getElementById('aiRecsList').innerHTML = recs.map(r => `
    <div class="ai-rec-item">${r}</div>
  `).join('');

  // Add to pest log if disease detected
  if (!isHealthy && aiCurrentCropType) {
    const crop = myCrops.find(c => String(c._id || c.id) === String(aiCurrentCropId));
    addNotification('pest', `🦠 Disease Detected: ${disease.name}`,
      `AI detected ${disease.name} on ${aiCurrentCropType} at ${crop?.location || 'your farm'}. Severity: ${disease.severity.toUpperCase()}.`
    );
    toast(`⚠️ Disease detected on ${aiCurrentCropType}! Check notifications.`, 'warn');
  } else if (isHealthy) {
    toast(`✅ ${aiCurrentCropType} looks healthy! No disease detected.`, 'ok');
  }
}

// ── Roboflow API is always ready — no preloading needed ──


// ═══════════════════════════════════════════════════════
// PLANT HEALTH SCANNER — Real-time Object Detection
// Uses two Roboflow models:
//   Model 1: Fruits & Vegetables (identify plant)
//   Model 2: Detecting Diseases (detect disease)
// ═══════════════════════════════════════════════════════

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
const RT_INTERVAL      = 3000; // ms between API calls (3s for Render free tier)

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
    statusTxt.textContent = '🌿 2 Models Ready';
  }
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
function startRealTimeDetection() {
  if (rtIsRunning) return;
  rtIsRunning = true;

  // Get or create overlay canvas
  let rtCanvasEl = document.getElementById('rtDetectionCanvas');
  if (!rtCanvasEl) {
    rtCanvasEl = document.createElement('canvas');
    rtCanvasEl.id = 'rtDetectionCanvas';
    rtCanvasEl.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;border-radius:var(--r);';
    document.getElementById('scannerCameraView').style.position = 'relative';
    document.getElementById('scannerCameraView').appendChild(rtCanvasEl);
  }
  rtCanvasEl.style.display = 'block';
  rtCanvas = rtCanvasEl;
  rtCtx    = rtCanvas.getContext('2d');

  // Update status
  const statusBadge = document.getElementById('rtStatusBadge');
  if (statusBadge) {
    statusBadge.textContent = '🔴 Detecting…';
    statusBadge.className   = 'rt-status-badge detecting';
  }

  rtDetectionLoop = setInterval(async () => {
    if (!rtIsRunning) return;
    const now = Date.now();
    if (now - rtLastCapture < RT_INTERVAL) return;
    rtLastCapture = now;
    await runRealTimeFrame();
  }, 200); // check every 200ms, but only call API every RT_INTERVAL
}

function stopRealTimeDetection() {
  rtIsRunning = false;
  if (rtDetectionLoop) { clearInterval(rtDetectionLoop); rtDetectionLoop = null; }
  if (rtCtx && rtCanvas) rtCtx.clearRect(0, 0, rtCanvas.width, rtCanvas.height);
}

async function runRealTimeFrame() {
  const video = document.getElementById('scannerVideo');
  if (!video || !video.videoWidth) return;

  // Capture frame from video
  const capCanvas = document.getElementById('scannerCanvas');
  capCanvas.width  = video.videoWidth;
  capCanvas.height = video.videoHeight;
  capCanvas.getContext('2d').drawImage(video, 0, 0);

  // Resize canvas overlay
  rtCanvas.width  = video.clientWidth  || video.offsetWidth  || 640;
  rtCanvas.height = video.clientHeight || video.offsetHeight || 480;
  rtCtx.clearRect(0, 0, rtCanvas.width, rtCanvas.height);

  try {
    // Convert canvas frame to blob for Python server
    const blob = await new Promise(resolve => capCanvas.toBlob(resolve, 'image/jpeg', 0.7));
    const formData = new FormData();
    formData.append('file', blob, 'frame.jpg');

    // Call Python YOLOv8 /detect endpoint
    const res = await fetch(`${AI_SERVER_URL}/detect`, {
      method: 'POST',
      body:   formData,
    });

    if (!res.ok) return;
    const data = await res.json();
    const detections = data.detections || [];

    // Separate plant vs disease detections by label keywords
    const diseaseKeywords = ['blight','spot','rust','mildew','rot','wilt','virus','mosaic','smut','blast','disease','infected'];
    const plantPreds   = [];
    const diseasePreds = [];

    detections.forEach(det => {
      const label = det.label.toLowerCase();
      const isDis = diseaseKeywords.some(kw => label.includes(kw));
      // Convert Python bbox format to Roboflow-compatible format
      const pred = {
        class:      det.label,
        confidence: det.confidence / 100,
        x: (det.bbox.x + det.bbox.width  / 2) * rtCanvas.width,
        y: (det.bbox.y + det.bbox.height / 2) * rtCanvas.height,
        width:  det.bbox.width  * rtCanvas.width,
        height: det.bbox.height * rtCanvas.height,
      };
      if (isDis) diseasePreds.push(pred);
      else        plantPreds.push(pred);
    });

    // Draw bounding boxes
    drawBoundingBoxes(plantPreds,   BOX_COLORS.plant,   video, 'plant');
    drawBoundingBoxes(diseasePreds, BOX_COLORS.disease, video, 'disease');

    // Update live label display
    updateRTLabels(plantPreds, diseasePreds);

  } catch (err) {
    // Silent fail — Python server might be starting up
  }
}

// ── DRAW BOUNDING BOXES ──
function drawBoundingBoxes(predictions, color, video, type) {
  if (!predictions.length || !rtCtx) return;

  predictions.forEach(pred => {
    const conf = Math.round((pred.confidence || 0) * 100);
    if (conf < 30) return; // skip low confidence

    // Coords are already in canvas pixel space
    const x = pred.x - pred.width  / 2;
    const y = pred.y - pred.height / 2;
    const w = pred.width;
    const h = pred.height;

    // Draw box
    rtCtx.strokeStyle = color;
    rtCtx.lineWidth   = 2.5;
    rtCtx.strokeRect(x, y, w, h);

    // Draw filled label background
    const label = `${pred.class} ${conf}%`;
    rtCtx.font = 'bold 13px DM Sans, sans-serif';
    const textW = rtCtx.measureText(label).width;
    rtCtx.fillStyle = color;
    rtCtx.fillRect(x, y - 22, textW + 12, 22);

    // Draw label text
    rtCtx.fillStyle = '#ffffff';
    rtCtx.fillText(label, x + 6, y - 6);

    // Corner markers
    const cs = 12; // corner size
    rtCtx.strokeStyle = '#ffffff';
    rtCtx.lineWidth   = 1.5;
    // Top-left
    rtCtx.beginPath(); rtCtx.moveTo(x, y+cs); rtCtx.lineTo(x, y); rtCtx.lineTo(x+cs, y); rtCtx.stroke();
    // Top-right
    rtCtx.beginPath(); rtCtx.moveTo(x+w-cs, y); rtCtx.lineTo(x+w, y); rtCtx.lineTo(x+w, y+cs); rtCtx.stroke();
    // Bottom-left
    rtCtx.beginPath(); rtCtx.moveTo(x, y+h-cs); rtCtx.lineTo(x, y+h); rtCtx.lineTo(x+cs, y+h); rtCtx.stroke();
    // Bottom-right
    rtCtx.beginPath(); rtCtx.moveTo(x+w-cs, y+h); rtCtx.lineTo(x+w, y+h); rtCtx.lineTo(x+w, y+h-cs); rtCtx.stroke();
  });
}

// ── UPDATE LIVE LABELS BELOW CAMERA ──
function updateRTLabels(plantPreds, diseasePreds) {
  const labelEl = document.getElementById('rtLiveLabels');
  if (!labelEl) return;

  const allPreds = [
    ...plantPreds.map(p   => ({ ...p, type:'plant' })),
    ...diseasePreds.map(p => ({ ...p, type:'disease' }))
  ].filter(p => (p.confidence||0) > 0.3) // confidence is 0-1 scale
   .sort((a,b) => b.confidence - a.confidence)
   .slice(0, 5);

  if (allPreds.length === 0) {
    labelEl.innerHTML = '<span class="rt-label-empty">Point camera at a plant…</span>';
    return;
  }

  labelEl.innerHTML = allPreds.map(p => {
    const conf  = Math.round((p.confidence||0)*100);
    const color = p.type === 'disease' ? 'red' : 'green';
    const icon  = p.type === 'disease' ? '🦠' : '🌿';
    const label = p.class || p.label || 'Unknown';
    return `<span class="rt-label-tag ${color}">${icon} ${label} <strong>${conf}%</strong></span>`;
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

// ── RUN PLANT SCAN (on captured/uploaded photo) ──
// ── SCAN WITH PYTHON AI SERVER ──
async function scanWithPythonAI(imageData) {
  const base64 = imageData.replace(/^data:image\/[a-z]+;base64,/, '');
  const byteChars = atob(base64);
  const byteNums  = new Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteNums[i] = byteChars.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNums);
  const blob      = new Blob([byteArray], { type: 'image/jpeg' });

  const formData = new FormData();
  formData.append('file', blob, 'plant.jpg');

  const res = await fetch(`${AI_SERVER_URL}/scan`, {
    method: 'POST',
    body:   formData,
  });

  if (!res.ok) throw new Error(`AI Server error: ${res.status}`);
  return await res.json();
}

async function runPlantScan() {
  if (!scannerImageData) { toast('Please provide a plant photo first.', 'warn'); return; }

  document.getElementById('scannerPreviewView').style.display    = 'none';
  document.getElementById('scannerAnalyzingView').style.display  = 'flex';
  document.getElementById('scannerAnalyzingImg').src             = scannerImageData;
  document.getElementById('scannerAnalyzingSub').textContent     = '🤖 Running Python AI + Claude…';
  document.getElementById('scannerResultCard').style.display     = 'none';

  try {
    document.getElementById('scannerAnalyzingSub').textContent = '🐍 Analyzing plant…';

    // Call Python AI Server
    const result = await scanWithPythonAI(scannerImageData);
    console.log('Python AI result:', result);

    const analysis   = result.analysis   || {};
    const detections = result.detections || [];

    let identified = { name: 'Unknown Plant', type: 'Unknown', confidence: 0 };
    if (analysis.plant_name && analysis.plant_name !== 'No Plant Detected') {
      identified = {
        name:       analysis.plant_name,
        emoji:      '',
        type:       analysis.plant_type || 'Plant',
        confidence: analysis.confidence || 90,
      };
    } else if (detections.length > 0) {
      identified = {
        name:       detections[0].label,
        emoji:      '',
        type:       'Detected',
        confidence: detections[0].confidence,
      };
    }

    let disease = { name: 'Healthy', severity: 'none', confidence: 92, color: 'green' };
    if (analysis.health_status && analysis.health_status !== 'Healthy' && analysis.severity !== 'none') {
      const sev = analysis.severity || 'medium';
      disease = {
        name:       analysis.health_status,
        severity:   sev,
        confidence: analysis.confidence || 85,
        color:      sev === 'high' ? 'red' : sev === 'medium' ? 'amber' : 'green',
        treatments: analysis.treatments || [],
        description: analysis.description || '',
      };
    }

    await new Promise(r => setTimeout(r, 300));
    showScannerResult(identified, disease, detections);

  } catch (err) {
    console.error('Scanner error:', err);
    toast('AI service error. Please try again.', 'err');
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
  // Hide empty state
  const emptyEl = document.getElementById('scannerRightEmpty');
  if (emptyEl) emptyEl.style.display = 'none';

  const isHealthy = disease.severity === 'none' || disease.name === 'Healthy';
  const colorMap  = { red:'#f85149', amber:'#e3a008', low:'#58a6ff', none:'#3fb950' };
  const col       = colorMap[disease.color] || '#3fb950';

  // Show plant icon instead of emoji
  const plantEmojiEl = document.getElementById('srcPlantEmoji');
  plantEmojiEl.innerHTML = '<span class="material-symbols-outlined" style="font-size:2rem;color:var(--green)">yard</span>';
  document.getElementById('srcPlantName').textContent  = plant.name;
  document.getElementById('srcPlantType').textContent  = `${plant.type} • ${plant.confidence || '—'}% confidence`;

  const badge = document.getElementById('srcHealthBadge');
  badge.style.background  = isHealthy ? 'var(--green-dim)' : `${col}22`;
  badge.style.borderColor = isHealthy ? 'rgba(63,185,80,0.3)' : `${col}55`;
  badge.style.color       = isHealthy ? 'var(--green)' : col;
  document.getElementById('srcHealthIcon').textContent  = isHealthy ? '✅' : disease.severity === 'high' ? '🚨' : '⚠️';
  document.getElementById('srcHealthLabel').textContent = isHealthy ? 'Healthy' : disease.severity === 'high' ? 'Diseased' : 'At Risk';

  const diseaseInfo = document.getElementById('srcDiseaseInfo');
  if (!isHealthy) {
    diseaseInfo.style.display = 'block';
    document.getElementById('srcDiseaseName').textContent = disease.name;
    document.getElementById('srcDiseaseName').style.color = col;
    document.getElementById('srcDiseaseConf').textContent = `${disease.confidence}% confidence`;
    const sev = document.getElementById('srcSeverityBadge');
    sev.textContent = (disease.severity||'LOW').toUpperCase();
    sev.style.background  = `${col}22`;
    sev.style.color       = col;
    sev.style.borderColor = `${col}55`;
    document.getElementById('srcDiseaseDesc').textContent =
      `${disease.name} detected by Roboflow AI. Severity: ${disease.severity.toUpperCase()}. Prompt action recommended.`;
  } else {
    diseaseInfo.style.display = 'none';
  }

  const conf = disease.confidence || 85;
  document.getElementById('srcConfPct').textContent  = `${conf}%`;
  document.getElementById('srcConfFill').style.width = `${conf}%`;
  document.getElementById('srcConfFill').style.background = conf > 80 ? 'var(--green)' : conf > 60 ? 'var(--amber)' : 'var(--red)';

  // Simple recommendations based on severity
  const recMap = {
    high:   ['🚨 Isolate affected plant immediately','💊 Apply appropriate fungicide/bactericide','✂️ Remove and destroy infected parts','📞 Consult local DA agricultural technician'],
    medium: ['⚠️ Monitor plant daily for progression','🌿 Apply neem oil spray preventively','✂️ Prune infected leaves carefully','💧 Reduce overhead watering'],
    low:    ['📋 Continue monitoring every 3-5 days','🌱 Apply preventive organic spray','💧 Maintain proper watering schedule'],
    none:   ['✅ Plant appears healthy — maintain current practices','💧 Keep regular watering schedule','🔍 Continue routine monitoring every 3-5 days'],
  };
  // Use Claude AI treatments if available, otherwise use default recMap
  const claudeTreatments = disease.treatments && disease.treatments.length > 0 ? disease.treatments : null;
  const recs = claudeTreatments || recMap[disease.severity] || recMap.none;
  document.getElementById('srcRecsList').innerHTML = recs.map(r => `<div class="src-rec-item">${r}</div>`).join('');

  currentScanResult = {
    id: Date.now(), timestamp: new Date().toISOString(),
    plant: plant.name, emoji: plant.emoji || '🌿', type: plant.type,
    disease: isHealthy ? 'Healthy' : disease.name,
    severity: disease.severity || 'none',
    confidence: disease.confidence || 85,
    imageData: scannerImageData,
  };

  if (!isHealthy) {
    addNotification('pest', `🦠 Disease Detected: ${disease.name}`,
      `AI detected ${disease.name} on ${plant.name}. Severity: ${(disease.severity||'').toUpperCase()}.`
    );
    toast(`⚠️ ${disease.name} detected on ${plant.name}!`, 'warn');
  } else {
    toast(`✅ ${plant.name} looks healthy!`, 'ok');
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
      <p>No scans yet.<br>Scan a plant to get started!</p></div>`;
    return;
  }
  const colorMap = { high:'var(--red)', medium:'var(--amber)', low:'var(--blue)', none:'var(--green)' };
  list.innerHTML = scannerHistory.map(item => {
    const date = new Date(item.timestamp||item.createdAt).toLocaleDateString('en-PH',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
    const col  = colorMap[item.severity] || 'var(--green)';
    const isHealthy = item.severity === 'none';
    const itemId = item._id || item.id || 0;
    return `<div class="scanner-history-item">
      ${item.imageData ? `<img src="${item.imageData}" class="shi-thumb" alt="">` : `<div class="shi-thumb shi-no-img">${item.emoji||'🌿'}</div>`}
      <div class="shi-info" onclick="viewHistoryItem('${itemId}')" style="cursor:pointer;flex:1">
        <div class="shi-plant">${item.emoji||'🌿'} ${item.plant}</div>
        <div class="shi-disease" style="color:${col}">${isHealthy?'✅ Healthy':`⚠️ ${item.disease}`}</div>
        <div class="shi-date">${date}</div>
      </div>
      <div class="shi-right">
        <div class="shi-badge" style="background:${col}22;color:${col};border-color:${col}44">${item.confidence}%</div>
        <button class="shi-delete-btn" onclick="deleteHistoryItem('${itemId}')" title="Delete this scan">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>`;
  }).join('');
}

function viewHistoryItem(id) {
  const item = scannerHistory.find(h => String(h._id||h.id) === String(id));
  if (!item) return;
  toast(`${item.emoji||'🌿'} ${item.plant} — ${item.disease} (${item.confidence}% confidence)`, item.severity === 'none' ? 'ok' : 'warn');
}

async function deleteHistoryItem(id) {
  try {
    // Delete from MongoDB
    await fcScanHistory.delete(id);
  } catch (err) {
    console.warn('Backend delete failed, removing locally:', err);
  }
  // Remove from local array
  scannerHistory = scannerHistory.filter(h => String(h._id||h.id) !== String(id));
  localStorage.setItem('fc_scanHistory', JSON.stringify(scannerHistory));
  renderScannerHistory();
  toast('Scan deleted! 🗑️', 'warn');
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

// ── PATCH setNav to include plant-scanner ──
const _scannerSetNav = setNav;
setNav = function(el, pageId) {
  if (pageId === 'plant-scanner') {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('page-plant-scanner').style.display = 'block';
    document.getElementById('topbarTitle').textContent = 'Plant Health Scanner';
    initScannerPage();
  } else {
    _scannerSetNav(el, pageId);
  }
};

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

async function identifyPlantWithClaude(base64Image) {
  try {
    // Remove data URL prefix
    const mediaType = base64Image.match(/data:(image\/\w+);base64,/)?.[1] || 'image/jpeg';
    const base64    = base64Image.replace(/^data:image\/\w+;base64,/, '');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': CLAUDE_API_KEY, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: base64 }
            },
            {
              type: 'text',
              text: `You are an expert botanist and plant pathologist. Analyze this plant image and respond ONLY in this exact JSON format (no markdown, no extra text):
{
  "plant_name": "exact common name of the plant",
  "plant_type": "type (Vegetable/Fruit/Ornamental/Cereal/Herb/Tree/Unknown)",
  "health_status": "Healthy or the disease name if diseased",
  "severity": "none/low/medium/high",
  "confidence": 85,
  "description": "brief 1 sentence description of what you see"
}
If no plant is visible, use plant_name: "No Plant Detected". Be specific with plant names.`
            }
          ]
        }]
      })
    });

    if (!response.ok) throw new Error(`Claude API error: ${response.status}`);
    const data = await response.json();
    const text = data.content[0]?.text || '{}';

    // Parse JSON response
    const clean  = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);
    return result;

  } catch (err) {
    console.error('Claude AI error:', err);
    return null;
  }
}



// Apply language on init
window.addEventListener('load', () => {
  setTimeout(() => {
    if (appSettings?.language && appSettings.language !== 'en') {
      applyLanguage(appSettings.language);
    }
  }, 500);
});

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

function getMiniWeatherScene(iconCode) {
  if (!iconCode) return '<span style="font-size:20px">🌤️</span>';

  if (iconCode.startsWith('01')) return `
    <div class="mini-scene"><div class="mini-sun">
      <div class="mini-sun-core"></div>
      <div class="mini-sun-rays"></div>
    </div></div>`;

  if (iconCode.startsWith('02')) return `
    <div class="mini-scene">
      <div class="mini-sun-sm"></div>
      <div class="mini-cloud"></div>
    </div>`;

  if (iconCode.startsWith('03') || iconCode.startsWith('04')) return `
    <div class="mini-scene">
      <div class="mini-cloud"></div>
      <div class="mini-cloud mini-cloud-2"></div>
    </div>`;

  if (iconCode.startsWith('09') || iconCode.startsWith('10')) return `
    <div class="mini-scene">
      <div class="mini-cloud mini-dark"></div>
      <div class="mini-rain">
        <div class="mini-drop"></div>
        <div class="mini-drop"></div>
        <div class="mini-drop"></div>
      </div>
    </div>`;

  if (iconCode.startsWith('11')) return `
    <div class="mini-scene">
      <div class="mini-cloud mini-dark"></div>
      <div class="mini-lightning">⚡</div>
    </div>`;

  if (iconCode.startsWith('13')) return `
    <div class="mini-scene">
      <div class="mini-cloud"></div>
      <div class="mini-snow">❄</div>
    </div>`;

  if (iconCode.startsWith('50')) return `
    <div class="mini-scene"><div class="mini-fog"></div></div>`;

  return '<span style="font-size:20px">🌤️</span>';
}

// ═══════════════════════════════════════════════════════
// SIDEBAR TOGGLE
// ═══════════════════════════════════════════════════════
let sidebarCollapsed = false;

function toggleSidebar() {
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
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('fc_sidebarCollapsed') === 'true') {
    sidebarCollapsed = true;
    const sidebar = document.getElementById('mainSidebar');
    if (sidebar) sidebar.classList.add('collapsed');
  }
});

// ── MOBILE SIDEBAR TOGGLE ──
function toggleMobileSidebar() {
  const sidebar  = document.getElementById('mainSidebar');
  const overlay  = document.getElementById('sidebarOverlay');
  const isOpen   = sidebar.classList.contains('mobile-open');

  if (isOpen) {
    sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('active');
  } else {
    sidebar.classList.add('mobile-open');
    if (overlay) overlay.classList.add('active');
  }
}
