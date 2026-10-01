// ============================================
// FARMCAST — api.js
// Centralized API helper — all backend calls go here
// Add this BEFORE script.js in dashboard.html:
// <script src="api.js"></script>
// ============================================

const API_BASE = window.FARMCAST_CONFIG.API_URL;

// ── TOKEN HELPERS ──
function getToken()        { return localStorage.getItem('fc_token'); }
function saveToken(token)  { localStorage.setItem('fc_token', token); }
function removeToken()     { localStorage.removeItem('fc_token'); }
function getAuthUser()     { return JSON.parse(localStorage.getItem('fc_authUser') || 'null'); }

let farmCastSessionExpiryHandled =
  false;


function clearFarmCastAuthSession() {

  removeToken();


  localStorage.removeItem(
    'fc_authUser'
  );


  /*
   * Legacy FarmCast user cache.
   */
  localStorage.removeItem(
    'fc_user'
  );


  /*
   * IMPORTANT:
   * Do not remove fc_cache_owner_id.
   *
   * It is needed to identify who owns
   * the preserved local workspace.
   */

}


function handleExpiredFarmCastSession() {

  /*
   * Several API calls can fail with 403
   * at the same time during page load.
   *
   * Show only one warning and schedule
   * only one redirect.
   */
  if (
    farmCastSessionExpiryHandled
  ) {
    return;
  }


  farmCastSessionExpiryHandled =
    true;


  clearFarmCastAuthSession();


  toast(
    'Session expired. Please login again.',
    'warn'
  );


  setTimeout(
    () => {

      window.location.href =
        'login.html';

    },
    1500
  );

}

function saveAuthUser(
  user
) {

  localStorage.setItem(
    'fc_authUser',
    JSON.stringify(
      user
    )
  );


  /*
   * Remember which account owns the
   * current local FarmCast workspace.
   *
   * This key deliberately survives logout
   * so the next login can detect an
   * account switch.
   */
  const userId =
    user?.id ||
    user?._id;


  if (userId) {

    localStorage.setItem(
      'fc_cache_owner_id',
      String(
        userId
      )
    );

  }

}

// ── BASE FETCH with JWT header ──
async function apiFetch(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await res.json();

  // Token missing, invalid, or expired.
  if (
    res.status === 401 ||
    res.status === 403
  ) {

    handleExpiredFarmCastSession();


    throw new Error(
      'Unauthorized'
    );

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

    /*
     * End only the authenticated session.
     *
     * The workspace owner marker and local
     * FarmCast data deliberately remain.
     */
    clearFarmCastAuthSession();


    window.location.href =
      'login.html';

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
// BACKUP / RESTORE
// ══════════════════════════════════════════════

const fcBackup = {

  async restore(
    backupData
  ) {

    return await apiFetch(
      '/backup/restore',
      {
        method:
          'POST',

        body:
          JSON.stringify(
            backupData
          )
      }
    );

  }

};

// ══════════════════════════════════════════════
// INIT — Load all data from backend on page load
// Called in script.js DOMContentLoaded
// ══════════════════════════════════════════════

async function loadAllDataFromBackend() {
  try {
    if (!getToken()) {
      window.location.href = 'login.html';
      return false;
    }

    const [
      crops,
      harvests,
      irrFieldsData,
      pestLogsData,
      settingsData
    ] = await Promise.all([
      fcCrops.getAll(),
      fcHarvest.getAll(),
      fcIrrigation.getAll(),
      fcPests.getAll(),
      fcSettings.get()
    ]);

    myCrops = crops;
    harvestHistory = harvests;
    irrFields = irrFieldsData;
    pestLogs = pestLogsData;

    const user =
      getAuthUser();


    const hasLocalSettings =
      localStorage.getItem(
        'fc_settings'
      ) !== null;


    if (settingsData) {

    /*
     * Only accept settings supported by
     * the current FarmCast version.
     *
     * This prevents deprecated backend
     * fields from returning to the app.
     */
    const safeBackendSettings =
      typeof cleanBackupSettings ===
        'function'
        ? cleanBackupSettings(
            settingsData
          )
        : settingsData;
  
  
    /*
     * FarmCast is local-first.
     *
     * Existing local preferences take
     * priority over backend settings.
     * On a device with no local settings,
     * backend values can initialize them.
     */
    appSettings =
      hasLocalSettings
        ? Object.assign(
            {},
            DEFAULT_SETTINGS,
            safeBackendSettings,
            appSettings
          )
        : Object.assign(
            {},
            DEFAULT_SETTINGS,
            safeBackendSettings
          );


    /*
     * Account/profile identity remains
     * owned by the authenticated User.
     */
    if (user) {

      const savedAvatar =
        user.avatar ||
        appSettings.avatar ||
        DEFAULT_FARMER_AVATAR;


      appSettings.name =
        user.name ||
        appSettings.name;


      appSettings.email =
        user.email ||
        appSettings.email;


      appSettings.farmName =
        user.farmName ||
        appSettings.farmName;


      appSettings.farmSize =
       user.farmSize ??
        appSettings.farmSize;


      appSettings.role =
        user.role ||
        appSettings.role;
  
  
      appSettings.phone =
        user.phone ||
        appSettings.phone;

  
      appSettings.city =
        user.city ||
        appSettings.city;


      appSettings.lat =
        user.lat ||
        appSettings.lat;


      appSettings.lon =
        user.lon ||
        appSettings.lon;


      appSettings.avatar =
        LEGACY_FARMER_AVATARS[
          savedAvatar
        ] ||
        savedAvatar ||
        DEFAULT_FARMER_AVATAR;

    }


    lsSave(
      'fc_settings',
      appSettings
    );

  }

  /*
   * Backend settings may be different from
   * the defaults/local values that were
   * applied before the API finished loading.
   *
   * Re-apply the final merged settings now
   * so a fresh browser/device immediately
   * reflects the saved FarmCast preferences.
   */
  if (
    typeof applyAllSettings ===
    'function'
  ) {

    applyAllSettings();

  }

    if (user) {

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
          user.name ||
          user.username ||
          appSettings.name;

      }


      if (farmEl) {

        farmEl.textContent =
          `${
            user.farmName ||
            appSettings.farmName ||
            'My Farm'
          } · ${
            user.farmSize ||
            appSettings.farmSize ||
            '0'
          } ha`;

      }


      /*
       * Keep the new SVG farmer-avatar system.
       *
       * Older accounts may still contain an
       * emoji avatar, so migrate it before
       * updating the image element.
      */
     const savedAvatar =
       user.avatar ||
       appSettings.avatar ||
       DEFAULT_FARMER_AVATAR;


      appSettings.avatar =
        LEGACY_FARMER_AVATARS[
          savedAvatar
        ] ||
        savedAvatar ||
        DEFAULT_FARMER_AVATAR;


      lsSave(
        'fc_settings',
        appSettings
      );


      updateFarmerAvatarUI();

    }

    console.log(
      '✅ All data loaded from backend!'
    );

    return true;

  } catch (err) {
    console.error(
      'Error loading data from backend:',
      err
    );

    console.warn(
      '⚠️ Falling back to localStorage...'
    );

    return false;
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
    
    const type       = 
      document.getElementById('cropTypeSelect').value;
    const variety =
      document.getElementById('cropVariety').value.trim();
    const plantingMethod = 
      document.getElementById('cropPlantingMethod').value;
    const area       = 
      parseInt(document.getElementById('cropArea').value);
    const planted    = 
      document.getElementById('cropDatePlanted').value;
    const harvest    = 
      document.getElementById('cropDateHarvest').value;
    const location   = 
      document.getElementById('cropLocation').value.trim();
    const irrigation = 
      document.getElementById('cropIrrigation').value;
    const notes      = 
      document.getElementById('cropNotes').value.trim();

    if (!type || !area || !planted || !harvest || !location) {
      toast('Please fill in all required fields.', 'warn'); return;
    }
    try {
      const newCrop = await fcCrops.add({ type, variety, plantingMethod, area, planted, harvest, location, irrigation, notes });
      myCrops.push(newCrop);
      closeAddCropModal();
      renderCropsPage();
      toast(`${type} added to your crops! 🌱`, 'ok');
    } catch (err) {
      toast(`Error: ${err.message}`, 'err');
    }
  };

  // Override saveGrowthStage — save observation to MongoDB
  saveGrowthStage = async function() {
    const cropId =
      document.getElementById('growthStageCropId').value;

    const stage =
      document.getElementById('growthStageSelect').value;

    const date =
      document.getElementById('growthStageDate').value;

    const note =
      document.getElementById('growthStageNote').value.trim();

    if (!cropId || !stage || !date) {
      toast(
        'Please complete the growth stage and observation date.',
        'warn'
      );
      return;
    }

    const crop = myCrops.find(
      c => String(c.id) === String(cropId)
    );

    if (!crop) {
      toast('Crop not found.', 'err');
      return;
    }

    // Do not allow future observations
    const today = new Date();
    const localToday =
      `${today.getFullYear()}-` +
      `${String(today.getMonth() + 1).padStart(2, '0')}-` +
      `${String(today.getDate()).padStart(2, '0')}`;

    if (date > localToday) {
      toast('Observation date cannot be in the future.', 'warn');
      return;
    }

    let growthHistory = Array.isArray(crop.growthHistory)
      ? [...crop.growthHistory]
      : [];

    if (editingGrowthObservationId) {

      const observationIndex = growthHistory.findIndex(
        item =>
          String(item._id) ===
          String(editingGrowthObservationId)
      );

      if (observationIndex === -1) {
        toast('Observation not found.', 'err');
        return;
      }

      growthHistory[observationIndex] = {
        ...growthHistory[observationIndex],
        stage,
        date,
        note,
        source: 'farmer'
      };

    } else {

      growthHistory.push({
        stage,
        date,
        note,
        source: 'farmer'
      });

    }

    // Keep history chronological
    growthHistory.sort((a, b) =>
      String(a.date).localeCompare(String(b.date))
    );

    // The newest observation determines the current stage
    const currentStage =
      growthHistory[growthHistory.length - 1].stage;

    try {
      const updatedCrop = await fcCrops.update(cropId, {
        currentStage,
        growthHistory
      });

      // Replace local copy with the version returned by MongoDB
      const cropIndex = myCrops.findIndex(
        c => String(c.id) === String(cropId)
      );

      if (cropIndex !== -1) {
        myCrops[cropIndex] = updatedCrop;
      }

      closeGrowthStageModal();
      renderCropsPage();

      toast('Growth observation saved to FarmCast! 🌱', 'ok');

    } catch (err) {
      console.error('Failed to save growth observation:', err);

      toast(
        `Could not save observation: ${err.message}`,
        'err'
      );
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

      toast(
        'Profile saved successfully!',
        'ok'
      );

    } catch (err) {
      toast(`Error: ${err.message}`, 'err');
    }
  };

  saveLocationSettings =
    async function() {

      const cityInput =
        document.getElementById(
          'settingLocationSearch'
        );


      const latInput =
        document.getElementById(
          'settingLat'
        );


      const lonInput =
        document.getElementById(
          'settingLon'
        );


      const city =
        cityInput?.value
          .trim() ||
        appSettings.city ||
        '';


      const lat =
        latInput?.value
          .trim() ||
        '';


      const lon =
        lonInput?.value
          .trim() ||
        '';


      const latitude =
        Number(
          lat
        );


      const longitude =
        Number(
          lon
        );


      if (
        !city
      ) {

        toast(
          'Please enter a city or municipality.',
          'warn'
        );

        return;

      }


     if (
        !Number.isFinite(
          latitude
        ) ||
        latitude < -90 ||
        latitude > 90
      ) {
  
        toast(
          'Please enter a valid latitude.',
          'warn'
        );
  
        return;
  
      }
  
  
      if (
        !Number.isFinite(
          longitude
        ) ||
        longitude < -180 ||
        longitude > 180
      ) {
  
        toast(
          'Please enter a valid longitude.',
          'warn'
        );
  
        return;
  
      }
 
  
      try {
  
        const result =
          await fcAuth.updateProfile({
            city,
            lat,
            lon
          });
  
  
        /*
         * Keep the cached authenticated
         * user synchronized with MongoDB.
         */
        saveAuthUser({
          ...getAuthUser(),
          ...result.user
        });
  
  
        appSettings.city =
          city;
  
  
        appSettings.lat =
          lat;
  
  
        appSettings.lon =
          lon;
  
  
        lsSave(
          'fc_settings',
          appSettings
        );
  
  
        currentCity =
          city;
  
  
        updateSettingsFormValues();
  
  
        toast(
          'Farm location saved successfully!',
          'ok'
        );
  
  
      } catch (err) {
 
        console.error(
          'Location save error:',
          err
        );
 

        toast(
          `Could not save farm location: ${err.message}`,
          'err'
        );

      }

    };

  saveThresholdSettings =
    async function() {

      const tempInput =
        document.getElementById(
          'thresholdTemp'
        );
  
  
      const reminderInput =
        document.getElementById(
          'harvestReminderDays'
        );
  
  
      const enteredTemp =
        parseFloat(
          tempInput?.value
        );
  
  
      /*
       * FarmCast always stores the
       * temperature threshold internally
       * in Celsius.
       *
       * Fahrenheit is display-only.
       */
      if (
        Number.isFinite(
          enteredTemp
        )
      ) {
  
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
          reminderInput?.value
        ) ||
        7;
  
 
      /*
       * Local-first:
       * keep the browser preference safe
       * before attempting cloud sync.
       */
      lsSave(
        'fc_settings',
        appSettings
      );
  
  
      try {
  
        await fcSettings.save({
  
          thresholdTemp:
            appSettings.thresholdTemp,
  
          harvestReminderDays:
            appSettings.harvestReminderDays
  
        });
  
  
        toast(
          'Alert settings saved!',
          'ok'
        );
  
  
      } catch (err) {
  
        console.warn(
          'Settings cloud sync failed:',
          err
        );
  
  
        toast(
          'Saved locally. Cloud sync is temporarily unavailable.',
          'warn'
        );
  
      }
 
 
      addNotification(
        'system',
        'Settings Updated',
        'Weather alert thresholds have been saved.'
      );
  
    };

  saveFavCrops =
    async function() {

      /*
       * Save locally first because FarmCast
       * treats the browser copy as the
       * active preference cache.
       */
      lsSave(
        'fc_settings',
        appSettings
      );
  
  
      populateMyCropsCropSelect();
      renderMyCropPicker();
  
  
      try {
  
        await fcSettings.save({
          favCrops:
            appSettings.favCrops
        });
  
  
        toast(
          'Favorite crop preferences saved!',
          'ok'
        );
  
  
      } catch (err) {
  
        toast(
          'Favorites saved locally. Cloud sync is temporarily unavailable.',
          'warn'
        );
  
      }
  
    };
  
  /*
   * Keep rapid saves for the same setting
   * in the exact order the farmer selected
   * them.
   *
   * Different settings can still sync
   * independently.
   */
  const farmCastSettingSaveQueues =
    new Map();

  // Save settings on toggle changes
  saveSettingImmediate =
    async function(
      key,
      value
    ) {

      /*
       * Local-first:
       * update the active preference and
       * browser cache immediately.
       */
      appSettings[key] =
        value;
  
  
      lsSave(
        'fc_settings',
        appSettings
      );
  
 
      /*
       * Preserve Settings UI side effects.
       */
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
  
  
      /*
       * Serialize cloud saves PER SETTING.
       *
       * Example:
       * Dark → Light → Dark
       *
       * MongoDB will receive those updates
       * in that exact order instead of
       * letting slower older requests win.
       */
      const previousSave =
        farmCastSettingSaveQueues.get(
          key
        ) ||
        Promise.resolve();
  
  
      const currentSave =
        previousSave
          .catch(
            () => {
              /*
               * A failed older request must
               * not block newer values.
               */
            }
          )
          .then(
            () =>
              fcSettings.save({
                [key]:
                  value
              })
          );
  
  
      farmCastSettingSaveQueues.set(
        key,
        currentSave
      );
  
  
      try {
  
        await currentSave;
  
  
      } catch (err) {
  
        /*
         * Local value is already saved.
         */
         console.warn(
          `Could not sync setting "${key}" to FarmCast:`,
          err
        );
  
  
      } finally {
  
        /*
         * Only remove the queue entry if
         * this is still the newest request
         * for this setting.
         */
        if (
          farmCastSettingSaveQueues.get(
            key
          ) ===
           currentSave
        ) {

          farmCastSettingSaveQueues.delete(
            key
          );
  
        }

      }

    };

  // Override confirmResetData
  confirmResetData =
    async function() {

      if (
        !confirm(
          'Reset your FarmCast workspace? Synced crops, harvests, irrigation fields, pest logs, scan history, notifications, and preferences will be deleted. Your login account will be kept.'
        )
      ) {
        return;
      }


      if (
        !confirm(
          'Last chance — permanently reset the FarmCast workspace?'
        )
      ) {
        return;
      }
  
  
      try {
  
        const resetSettings =
          buildResetSettingsPreservingAccount();
  
  
        /*
         * Reset the complete server-backed
         * FarmCast workspace in ONE MongoDB
         * transaction.
         *
         * The existing backup restore endpoint
         * already provides all-or-nothing
         * replacement semantics.
         *
         * Empty collections = reset workspace.
         */
        await fcBackup.restore({
  
          crops:
            [],
  
          harvestHistory:
            [],
  
          irrigationFields:
            [],
  
          pestLogs:
            [],
  
          scannerHistory:
            [],
  
          settings:
            cleanBackupSettings(
              resetSettings
            )
  
        });
  
  
        /*
         * Only clear browser data AFTER
         * the MongoDB transaction succeeds.
         */
        clearLocalFarmWorkspaceData();
  
  
        toast(
          'Farm workspace reset. Reloading…',
          'warn'
        );
  
  
        setTimeout(
          () =>
            location.reload(),
          1500
        );
  
  
      } catch (error) {
  
        console.error(
          'FarmCast reset failed:',
          error
        );
  
  
        toast(
          'Farm workspace reset failed. Your existing data was preserved.',
          'err'
        );
  
      }

    };


    console.log(
      '✅ API patches applied to script.js functions!'
    );
  
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
