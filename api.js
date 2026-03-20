// ============================================
// FARMCAST — api.js
// Centralized API helper — all backend calls go here
// Add this BEFORE script.js in dashboard.html:
// <script src="api.js"></script>
// ============================================

const BACKEND_URL = 'http://localhost:5000/api';

// ── TOKEN HELPERS ──
function getToken()        { return localStorage.getItem('fc_token'); }
function saveToken(token)  { localStorage.setItem('fc_token', token); }
function removeToken()     { localStorage.removeItem('fc_token'); }
function getAuthUser()     { return JSON.parse(localStorage.getItem('fc_authUser') || 'null'); }
function saveAuthUser(user){ localStorage.setItem('fc_authUser', JSON.stringify(user)); }

// ── BASE FETCH with JWT header ──
async function apiFetch(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const res = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await res.json();

  // Token expired — redirect to login
  if (res.status === 401 || res.status === 403) {
    removeToken();
    localStorage.removeItem('fc_authUser');
    toast('Session expired. Please login again.', 'warn');
    setTimeout(() => window.location.href = 'login.html', 1500);
    throw new Error('Unauthorized');
  }

  if (!res.ok) throw new Error(data.message || 'Server error');
  return data;
}

// ══════════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════════

const fcAuth = {
  async login(username, password) {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    saveToken(data.token);
    saveAuthUser(data.user);
    return data;
  },

  async register(username, email, password, name, farmName) {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, name, farmName })
    });
    saveToken(data.token);
    saveAuthUser(data.user);
    return data;
  },

  async getMe() {
    return await apiFetch('/auth/me');
  },

  async updateProfile(profileData) {
    return await apiFetch('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  },

  logout() {
    removeToken();
    localStorage.removeItem('fc_authUser');
    window.location.href = 'login.html';
  }
};

// ══════════════════════════════════════════════
// CROPS
// ══════════════════════════════════════════════

const fcCrops = {
  async getAll() {
    const crops = await apiFetch('/crops');
    // Convert MongoDB _id to id for compatibility with existing script.js
    return crops.map(c => ({ ...c, id: c._id }));
  },

  async add(cropData) {
    const data = await apiFetch('/crops', {
      method: 'POST',
      body: JSON.stringify(cropData)
    });
    return { ...data.crop, id: data.crop._id };
  },

  async update(id, updates) {
    const data = await apiFetch(`/crops/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    return { ...data.crop, id: data.crop._id };
  },

  async delete(id) {
    return await apiFetch(`/crops/${id}`, { method: 'DELETE' });
  }
};

// ══════════════════════════════════════════════
// HARVEST HISTORY
// ══════════════════════════════════════════════

const fcHarvest = {
  async getAll() {
    const records = await apiFetch('/harvest');
    return records.map(h => ({ ...h, id: h._id, yield: Number(h.yield) }));
  },

  async add(harvestData) {
    const data = await apiFetch('/harvest', {
      method: 'POST',
      body: JSON.stringify(harvestData)
    });
    return { ...data.record, id: data.record._id };
  },

  async delete(id) {
    return await apiFetch(`/harvest/${id}`, { method: 'DELETE' });
  }
};

// ══════════════════════════════════════════════
// IRRIGATION
// ══════════════════════════════════════════════

const fcIrrigation = {
  async getAll() {
    const fields = await apiFetch('/irrigation');
    return fields.map(f => ({ ...f, id: f._id }));
  },

  async add(fieldData) {
    const data = await apiFetch('/irrigation', {
      method: 'POST',
      body: JSON.stringify(fieldData)
    });
    return { ...data.field, id: data.field._id };
  },

  async update(id, updates) {
    const data = await apiFetch(`/irrigation/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    return { ...data.field, id: data.field._id };
  },

  async delete(id) {
    return await apiFetch(`/irrigation/${id}`, { method: 'DELETE' });
  }
};

// ══════════════════════════════════════════════
// PEST LOGS
// ══════════════════════════════════════════════

const fcPests = {
  async getAll() {
    const logs = await apiFetch('/pests');
    return logs.map(p => ({ ...p, id: p._id }));
  },

  async add(pestData) {
    const data = await apiFetch('/pests', {
      method: 'POST',
      body: JSON.stringify(pestData)
    });
    return { ...data.log, id: data.log._id };
  },

  async delete(id) {
    return await apiFetch(`/pests/${id}`, { method: 'DELETE' });
  }
};

// ══════════════════════════════════════════════
// SETTINGS
// ══════════════════════════════════════════════

const fcSettings = {
  async get() {
    return await apiFetch('/settings');
  },

  async save(settingsData) {
    return await apiFetch('/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData)
    });
  }
};

// ══════════════════════════════════════════════
// INIT — Load all data from backend on page load
// Called in script.js DOMContentLoaded
// ══════════════════════════════════════════════

async function loadAllDataFromBackend() {
  try {
    // Check if logged in
    if (!getToken()) {
      window.location.href = 'login.html';
      return;
    }

    // Load all data in parallel
    const [crops, harvests, irrFieldsData, pestLogsData, settingsData] = await Promise.all([
      fcCrops.getAll(),
      fcHarvest.getAll(),
      fcIrrigation.getAll(),
      fcPests.getAll(),
      fcSettings.get()
    ]);

    // Override in-memory arrays used by script.js
    myCrops        = crops;
    harvestHistory = harvests;
    irrFields      = irrFieldsData;
    pestLogs       = pestLogsData;

    // Apply settings
    if (settingsData) {
      appSettings = Object.assign({}, DEFAULT_SETTINGS, settingsData);
      lsSave('fc_settings', appSettings);
    }

    // Update sidebar with user info
    const user = getAuthUser();
    if (user) {
      const nameEl = document.getElementById('sidebarUserName');
      const farmEl = document.getElementById('sidebarUserFarm');
      if (nameEl) nameEl.textContent = user.name || user.username;
      if (farmEl) farmEl.textContent = `${user.farmName || 'My Farm'} · ${user.farmSize || '0'} ha`;
      const avatarEl = document.querySelector('.user-avatar');
      if (avatarEl) avatarEl.textContent = user.avatar || '👨‍🌾';
    }

    console.log('✅ All data loaded from backend!');

  } catch (err) {
    console.error('Error loading data from backend:', err);
    // Fallback to localStorage if backend fails
    console.warn('⚠️ Falling back to localStorage...');
  }
}

// ══════════════════════════════════════════════
// PATCH script.js functions to use backend API
// These override the localStorage-based versions
// ══════════════════════════════════════════════

// Called after script.js loads
function patchScriptJsWithAPI() {

  // ── CROPS ──

  // Override saveNewCrop
  saveNewCrop = async function() {
    const type       = document.getElementById('cropTypeSelect').value;
    const area       = parseInt(document.getElementById('cropArea').value);
    const planted    = document.getElementById('cropDatePlanted').value;
    const harvest    = document.getElementById('cropDateHarvest').value;
    const location   = document.getElementById('cropLocation').value.trim();
    const irrigation = document.getElementById('cropIrrigation').value;
    const notes      = document.getElementById('cropNotes').value.trim();

    if (!type || !area || !planted || !harvest || !location) {
      toast('Please fill in all required fields.', 'warn'); return;
    }
    try {
      const newCrop = await fcCrops.add({ type, area, planted, harvest, location, irrigation, notes });
      myCrops.push(newCrop);
      closeAddCropModal();
      renderCropsPage();
      toast(`${type} added to your crops! 🌱`, 'ok');
    } catch (err) {
      toast(`Error: ${err.message}`, 'err');
    }
  };

  // Override toggleWater
  toggleWater = async function(id) {
    const crop = myCrops.find(c => String(c.id) === String(id) || String(c._id) === String(id));
    if (!crop) return;
    const newWatered = !crop.watered;
    try {
      await fcCrops.update(id, { watered: newWatered });
      crop.watered = newWatered;
      renderCropsPage();
      toast(`${crop.type} marked as ${newWatered ? 'watered ✅' : 'not watered'}`, newWatered ? 'ok' : 'warn');
    } catch (err) {
      toast(`Error: ${err.message}`, 'err');
    }
  };

  // Override markHarvested
  markHarvested = async function(id) {
    const crop = myCrops.find(c => String(c.id) === String(id) || String(c._id) === String(id));
    if (!crop || !confirm(`Mark ${crop.type} as harvested and remove from active crops?`)) return;
    const mongoId = crop._id || crop.id;
    try {
      await fcCrops.delete(mongoId);
      myCrops = myCrops.filter(c => String(c._id) !== String(mongoId));
      renderCropsPage();
      toast(`${crop.type} marked as harvested! Great job! 🎉`, 'ok');
    } catch (err) {
      toast(`Error: ${err.message}`, 'err');
    }
  };

  // Override deleteCrop
  deleteCrop = async function(id) {
    const crop = myCrops.find(c => String(c.id) === String(id) || String(c._id) === String(id));
    if (!crop || !confirm(`Delete ${crop.type} from your crop list?`)) return;
    // Use MongoDB _id for API call
    const mongoId = crop._id || crop.id;
    try {
      await fcCrops.delete(mongoId);
      myCrops = myCrops.filter(c => String(c._id) !== String(mongoId) && String(c.id) !== String(mongoId));
      renderCropsPage();
      toast(`${crop.type} deleted.`, 'warn');
    } catch (err) {
      toast(`Error: ${err.message}`, 'err');
    }
  };

  // ── HARVEST ──

  saveHarvestLog = async function() {
    const crop     = document.getElementById('hhCropType').value;
    const date     = document.getElementById('hhDate').value;
    const location = document.getElementById('hhLocation').value.trim();
    const area     = parseFloat(document.getElementById('hhArea').value);
    const yieldKg  = parseFloat(document.getElementById('hhYield').value);
    const quality  = document.getElementById('hhQuality').value;
    const notes    = document.getElementById('hhNotes').value.trim();

    if (!crop || !date || !location || !area || !yieldKg) {
      toast('Please fill in all required fields.', 'warn'); return;
    }
    try {
      const record = await fcHarvest.add({ crop, date, location, area, yield: yieldKg, quality, notes });
      harvestHistory.push(record);
      closeLogHarvestModal();
      renderHarvestHistory();
      toast(`${crop} harvest logged! 🌾`, 'ok');
    } catch (err) {
      toast(`Error: ${err.message}`, 'err');
    }
  };

  deleteHarvest = async function(id) {
    const h = harvestHistory.find(x => String(x.id) === String(id) || String(x._id) === String(id));
    if (!h || !confirm(`Delete harvest record for ${h.crop}?`)) return;
    const mongoId = h._id || h.id;
    try {
      await fcHarvest.delete(mongoId);
      harvestHistory = harvestHistory.filter(x => String(x._id) !== String(mongoId));
      renderHarvestHistory();
      toast(`${h.crop} harvest record deleted.`, 'warn');
    } catch (err) {
      toast(`Error: ${err.message}`, 'err');
    }
  };

  // ── IRRIGATION ──

  saveNewField = async function() {
    const name     = document.getElementById('fieldName').value.trim();
    const crop     = document.getElementById('fieldCrop').value.trim();
    const area     = parseInt(document.getElementById('fieldArea').value);
    const type     = document.getElementById('fieldIrrType').value;
    const freq     = parseInt(document.getElementById('fieldFreq').value) || 2;
    const waterAmt = parseInt(document.getElementById('fieldWaterAmt').value) || 0;
    if (!name || !crop || !area) { toast('Please fill in required fields.', 'warn'); return; }
    try {
      const field = await fcIrrigation.add({ name, crop, area, type, freq, waterAmt });
      irrFields.push(field);
      closeAddFieldModal();
      renderIrrigationPage();
      toast(`${name} added to irrigation! 💧`, 'ok');
    } catch (err) {
      toast(`Error: ${err.message}`, 'err');
    }
  };

  toggleFieldWater = async function(id) {
    const f = irrFields.find(f => String(f.id) === String(id) || String(f._id) === String(id));
    if (!f) return;
    const newVal = !f.wateredToday;
    const today  = new Date().toISOString().split('T')[0];
    try {
      await fcIrrigation.update(id, {
        wateredToday: newVal,
        lastWatered: newVal ? today : f.lastWatered
      });
      f.wateredToday = newVal;
      if (newVal) f.lastWatered = today;
      renderIrrigationPage();
      toast(`${f.name} marked as ${newVal ? 'watered ✅' : 'not watered'}`, newVal ? 'ok' : 'warn');
    } catch (err) {
      toast(`Error: ${err.message}`, 'err');
    }
  };

  deleteField = async function(id) {
    const f = irrFields.find(f => String(f.id) === String(id) || String(f._id) === String(id));
    if (!f || !confirm(`Delete "${f.name}" from irrigation?`)) return;
    const mongoId = f._id || f.id;
    try {
      await fcIrrigation.delete(mongoId);
      irrFields = irrFields.filter(f => String(f._id) !== String(mongoId));
      renderIrrigationPage();
      toast(`${f.name} deleted.`, 'warn');
    } catch (err) {
      toast(`Error: ${err.message}`, 'err');
    }
  };

  // ── PEST LOGS ──

  savePestLog = async function() {
    const pest = document.getElementById('logPestType').value;
    const sev  = document.getElementById('logPestSeverity').value;
    const crop = document.getElementById('logPestCrop').value.trim();
    const loc  = document.getElementById('logPestLocation').value.trim();
    const notes= document.getElementById('logPestNotes').value.trim();
    if (!pest || !crop || !loc) { toast('Please fill in all required fields.', 'warn'); return; }
    const today = new Date().toISOString().split('T')[0];
    try {
      const log = await fcPests.add({ pest, crop, location: loc, severity: sev, notes, date: today });
      pestLogs.push(log);
      closeLogPestModal();
      renderPestLog();
      toast(`Pest sighting logged: ${pest} on ${crop}`, 'warn');
    } catch (err) {
      toast(`Error: ${err.message}`, 'err');
    }
  };

  deletePestLog = async function(id) {
    const log = pestLogs.find(l => String(l.id) === String(id) || String(l._id) === String(id));
    const mongoId = log ? (log._id || log.id) : id;
    try {
      await fcPests.delete(mongoId);
      pestLogs = pestLogs.filter(l => String(l._id) !== String(mongoId));
      renderPestLog();
      toast('Log entry deleted.', 'warn');
    } catch (err) {
      toast(`Error: ${err.message}`, 'err');
    }
  };

  // ── SETTINGS ──

  saveProfileSettings = async function() {
    const name     = document.getElementById('settingName').value.trim() || appSettings.name;
    const email    = document.getElementById('settingEmail').value.trim();
    const farmName = document.getElementById('settingFarmName').value.trim() || appSettings.farmName;
    const role     = document.getElementById('settingRole').value;
    const farmSize = document.getElementById('settingFarmSize').value || appSettings.farmSize;
    const phone    = document.getElementById('settingPhone').value.trim();

    try {
      // Update profile in backend
      const result = await fcAuth.updateProfile({ name, email, farmName, role, farmSize, phone, avatar: appSettings.avatar });
      // Update local auth user
      saveAuthUser({ ...getAuthUser(), ...result.user });
      // Update appSettings
      appSettings = { ...appSettings, name, email, farmName, role, farmSize, phone };
      lsSave('fc_settings', appSettings);
      updateSidebarProfile();
      toast('Profile saved successfully! 👨‍🌾', 'ok');
    } catch (err) {
      toast(`Error: ${err.message}`, 'err');
    }
  };

  saveThresholdSettings = async function() {
    appSettings.thresholdTemp       = parseFloat(document.getElementById('thresholdTemp').value) || 35;
    appSettings.harvestReminderDays = parseInt(document.getElementById('harvestReminderDays').value) || 7;
    try {
      await fcSettings.save(appSettings);
      toast('Alert thresholds saved!', 'ok');
    } catch (err) {
      lsSave('fc_settings', appSettings);
      toast('Saved locally (backend error).', 'warn');
    }
  };

  saveFavCrops = async function() {
    try {
      await fcSettings.save({ favCrops: appSettings.favCrops });
      toast('Crop preferences saved!', 'ok');
    } catch (err) {
      lsSave('fc_settings', appSettings);
      toast('Saved locally.', 'warn');
    }
  };

  // Save settings on toggle changes
  saveSettingImmediate = async function(key, value) {
    appSettings[key] = value;
    lsSave('fc_settings', appSettings);
    try {
      await fcSettings.save({ [key]: value });
    } catch (err) {
      // Silent fail — localStorage already saved
    }
  };

  // Override confirmResetData
  confirmResetData = async function() {
    if (!confirm('⚠️ This will delete ALL your data. Cannot be undone. Sure?')) return;
    if (!confirm('Last chance — really reset everything?')) return;
    try {
      // Delete all from backend not implemented (optional)
      const keys = ['fc_myCrops','fc_nextCropId','fc_tasks','fc_pestLogs','fc_irrFields',
                    'fc_irrFid','fc_harvestHistory','fc_nextHarvestId','fc_settings',
                    'fc_notifications','fc_nextNotifId','fc_nextPestLogId'];
      keys.forEach(k => localStorage.removeItem(k));
      toast('Data reset. Reloading…', 'warn');
      setTimeout(() => location.reload(), 1500);
    } catch (err) {
      toast('Error resetting data.', 'err');
    }
  };

  console.log('✅ API patches applied to script.js functions!');
}
// ══════════════════════════════════════════════
// SCAN HISTORY
// ══════════════════════════════════════════════

const fcScanHistory = {
  async getAll() {
    const scans = await apiFetch('/scanhistory');
    return scans.map(s => ({ ...s, id: s._id }));
  },

  async save(scanData) {
    const data = await apiFetch('/scanhistory', {
      method: 'POST',
      body: JSON.stringify(scanData)
    });
    return { ...data.scan, id: data.scan._id };
  },

  async delete(id) {
    return await apiFetch(`/scanhistory/${id}`, { method: 'DELETE' });
  },

  async clearAll() {
    return await apiFetch('/scanhistory', { method: 'DELETE' });
  }
};
