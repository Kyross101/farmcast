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
    ...(token
      ? { 'Authorization': `Bearer ${token}` }
      : {}),
    ...(options.headers || {})
  };

  let res;

  try {
    res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });
  } catch (error) {
    console.error('FarmCast API connection error:', error);

    throw new Error(
      'Cannot confirm a response from the FarmCast server. ' +
      'Check your connection and saved records before retrying.'
    );
  }

  const contentType =
    (res.headers.get('content-type') || '')
      .toLowerCase();

  let data;

  if (contentType.includes('json')) {
    try {
      data = await res.json();
    } catch (error) {
      throw new Error(
        'FarmCast server returned an invalid response.'
      );
    }
  }

  // Handle confirmed authentication failures.
  if (
    (res.status === 401 || res.status === 403) &&
    data !== undefined
  ) {
    handleExpiredFarmCastSession();

    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    throw new Error(
      (
        data &&
        typeof data.message === 'string' &&
        data.message.trim()
      ) ||
      `FarmCast server error (HTTP ${res.status}). ` +
      'Check your records before retrying.'
    );
  }

  if (data === undefined) {
    throw new Error(
      'Unexpected response from FarmCast server.'
    );
  }

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

  async recordWatering(cropId, wateringData) {
    const data = await apiFetch(
      `/crops/${encodeURIComponent(cropId)}/watering`,
      {
        method: 'POST',
        body: JSON.stringify(wateringData)
      }
    );
  
    if (
      !data.crop?._id ||
      String(data.crop._id) !== String(cropId) ||
      !data.field?._id
    ) {
      throw new Error(
        'Watering response could not be verified. ' +
        'Refresh before retrying.'
      );
    }
  
    return data;
  },

  async completeHarvest(id, harvestData) {
    const data = await apiFetch(
      `/crops/${encodeURIComponent(id)}/harvest`,
      {
        method: 'POST',
        body: JSON.stringify(harvestData)
      }
    );

    if (!data.record?._id) {
      throw new Error(
        'Harvest response could not be verified.'
      );
    }

    return {
      ...data,
      record: {
        ...data.record,
        id: data.record._id,
        yield: Number(data.record.yield)
      }
    };
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

  async archive(id) {
    const data = await apiFetch(
      `/irrigation/${encodeURIComponent(id)}/archive`,
      {
        method: 'POST'
      }
    );

    if (
      !data.field?._id ||
      String(data.field._id) !== String(id)
    ) {
      throw new Error(
        'Archive response could not be verified.'
      );
    }
  
    return {
      ...data.field,
      id: data.field._id
    };
  },

  async restore(id) {
    const data = await apiFetch(
      `/irrigation/${encodeURIComponent(id)}/restore`,
      {
        method: 'POST'
      }
    );

    if (
      !data.field?._id ||
      String(data.field._id) !== String(id)
    ) {
      throw new Error(
        'Restore response could not be verified.'
      );
    }

    return {
      ...data.field,
      id: data.field._id
    };
  },
  
  async recordWatering(id, wateringData) {
    const data = await apiFetch(
      `/irrigation/${encodeURIComponent(id)}/watering`,
      {
        method: 'POST',
        body: JSON.stringify(wateringData)
      }
    );

    if (!data.field?._id) {
      throw new Error(
        'Watering response could not be verified.'
      );
    }

    return {
      ...data.field,
      id: data.field._id
    };
  },

  async attributeWatering(id, date, cropId) {
    const data = await apiFetch(
      `/irrigation/${encodeURIComponent(id)}/watering/attribute-crop`,
      {
        method: 'POST',
        body: JSON.stringify({ date, cropId })
      }
    );

    if (
      !data.field?._id ||
      String(data.field._id) !== String(id)
    ) {
      throw new Error(
        'Crop attribution response could not be verified.'
      );
    }

    return {
      ...data.field,
      id: data.field._id
    };
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

    const irrigationFieldId =
      document.getElementById('cropIrrigationFieldId')
        ?.value || null;

    const notes      = 
      document.getElementById('cropNotes').value.trim();

    if (!type || !area || !planted || !harvest || !location) {
      toast('Please fill in all required fields.', 'warn'); return;
    }
    try {
      const newCrop = await fcCrops.add({
        type,
        variety,
        plantingMethod,
        area,
        planted,
        harvest,
        location,
        irrigation,
        irrigationFieldId,
        notes
      });

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

  // Enable secure crop-to-irrigation linking.
  cropFieldLinkBackendEnabled = true;

  // Associate an existing field-only record with a crop.
  // Requires the farmer's explicit confirmation.
  async function confirmWateringCropAttribution(
    field,
    date,
    crop
  ) {
    if (wateringSessionInFlight) return;

    const cropId = String(crop?._id || crop?.id || '');
    const fieldId = String(field?._id || field?.id || '');

    const entry = field?.wateringHistory?.find(
      item => item.date === date
    );

    if (!cropId || !fieldId || !entry || entry.cropId) {
      toast(
        'The watering record is no longer field-only. Refresh first.',
        'warn'
      );
      return;
    }

    const recordedLiters = Number(entry.liters);

    if (!confirm(
      `Was the existing ${recordedLiters} L watering ` +
      `on ${date} actually used for ${crop.type} ` +
      `(${crop.location || 'unknown location'})?\n\n` +
      'Only confirm if this crop truly received that water. ' +
      'No new liters will be added.'
    )) {
      return;
    }

    wateringSessionInFlight = true;

    try {
      const updated = await fcIrrigation.attributeWatering(
        fieldId,
        date,
        cropId
      );

      // Backend confirmed the existing record's association.
      Object.assign(field, updated);

      try {
        lsSave(LS_IRR_FIELDS, irrFields);

        renderCropsPage();
        renderIrrigationPage();
        renderFarmAnalytics();

        toast(
          `${recordedLiters} L record attributed to ${crop.type}. ` +
          'Check My Crops and Irrigation History.',
          'ok'
        );

      } catch (renderError) {
        console.error(
          'Crop association saved, but screen refresh failed:',
          renderError
        );

        toast(
          'Crop association saved on the server. ' +
          'Reload FarmCast to refresh the display.',
          'warn'
        );
      }

    } catch (error) {
      toast(
        `Could not confirm crop association: ${error.message}. ` +
        'Refresh history before retrying.',
        'err'
      );

    } finally {
      wateringSessionInFlight = false;
    }
  }

  // Used by the crop selector in Irrigation History.
  attributeHistoryWatering = async function(
    fieldId,
    date,
    button
  ) {
    const field = irrFields.find(
      f => String(f._id || f.id) === String(fieldId)
    );

    const cropId =
      button?.closest('.ifi-history-assign')
        ?.querySelector('select')?.value || '';

    const crop = myCrops.find(
      item =>
        String(item._id || item.id) === String(cropId) &&
        String(item.irrigationFieldId || '') ===
          String(fieldId)
    );

    if (!field || !crop) {
      toast(
        'Choose a linked crop for this record.',
        'warn'
      );
      return;
    }

    await confirmWateringCropAttribution(
      field,
      date,
      crop
    );
  };

  saveCropFieldLink = async function() {
    if (
      !pendingCropFieldLinkId ||
      cropFieldLinkSaving
    ) return;

    const crop = myCrops.find(
      item =>
        String(item._id || item.id) ===
        pendingCropFieldLinkId
    );

    const select = document.getElementById(
      'cropFieldLinkSelect'
    );

    const fieldId = select?.value || '';

    if (!crop) {
      toast(
        'Crop not found. Refresh and try again.',
        'err'
      );
      return;
    }
  
    // Only allow an existing, active field.
    const chosenField = irrFields.find(
      field =>
        field._id === fieldId &&
        !field.archivedAt
    );
  
    if (!chosenField) {
      toast(
        'Choose an active irrigation field first.',
        'warn'
      );
      return;
    }
  
    const saveButton = document.getElementById(
      'cropFieldLinkSaveBtn'
    );
  
    cropFieldLinkSaving = true;
  
    if (saveButton) {
      saveButton.disabled = true;
    }
  
    let saved = false;
  
    try {
      // Remember the chosen field only if it changed.
      if (
        String(crop.irrigationFieldId || '') !== fieldId
      ) {
      const updated = await fcCrops.update(
        crop._id || crop.id,
        {
          irrigationFieldId: fieldId
        }
      );

      Object.assign(crop, updated);

      lsSave(LS_CROPS, myCrops);
    }

    saved = true;

  } catch (error) {
    toast(
      `Could not select field: ${error.message}`,
      'err'
    );

  } finally {
    cropFieldLinkSaving = false;

    if (saveButton) {
      saveButton.disabled = false;
    }
  }

  if (!saved) return;

  closeCropFieldLinkModal();
  renderCropsPage();

  // Do not create a duplicate daily watering record.
  if (isCropWateredToday(crop)) {
    toast(
      'Watering is already recorded for this crop today. ' +
      'Review its saved details in Irrigation History.',
      'ok'
    );
    return;
  }

  // A shared/manual field may already have a watering
  // session belonging to another crop or the field itself.
  if (hasLinkedFieldWateringConflict(crop)) {
    toast(
      'This irrigation field already has a watering ' +
      'record today. FarmCast currently allows one ' +
      'session per field per date. Review Irrigation ' +
      'History before recording anything else.',
      'warn'
    );
    return;
  }

  // Continue directly to the existing watering recorder.
  // Watering is not recorded until Save Watering is pressed.
  openWateringSessionModal(
    fieldId,
    crop._id || crop.id
  );
};

  // Remove only the crop-to-field association.
  // Historical watering records remain untouched.
  stopUsingWateringField = async function() {
    if (
      !pendingCropFieldLinkId ||
      cropFieldLinkSaving
    ) return;

    const crop = myCrops.find(
      item =>
        String(item._id || item.id) ===
        pendingCropFieldLinkId
    );
  
    if (!crop) {
      toast(
        'Crop not found. Refresh and try again.',
        'err'
      );
      return;
    }
  
    if (!crop.irrigationFieldId) {
      toast(
        'This crop is not using an irrigation field.',
        'warn'
      );
      return;
    }
  
    if (!confirm(
      `Stop using the current field for ${crop.type}?\n\n` +
      'Past watering records will remain saved.'
    )) return;
  
    const stopButton = document.getElementById(
      'cropFieldStopUsingBtn'
    );
  
    const continueButton = document.getElementById(
      'cropFieldLinkSaveBtn'
    );
  
    cropFieldLinkSaving = true;
  
    if (stopButton) stopButton.disabled = true;
    if (continueButton) continueButton.disabled = true;
  
    let saved = false;
  
    try {
      const updated = await fcCrops.update(
        crop._id || crop.id,
        {
          irrigationFieldId: null
        }
      );
  
      // Verify the backend actually removed the link.
      if (
        !updated ||
        String(updated._id || updated.id) !==
          String(crop._id || crop.id) ||
        updated.irrigationFieldId != null
      ) {
        throw new Error(
          'Could not verify that the field was unlinked.'
        );
      }
  
      Object.assign(crop, updated);
  
      lsSave(LS_CROPS, myCrops);
  
      saved = true;
  
    } catch (error) {
      toast(
        `Could not update watering field: ${error.message}. ` +
        'Refresh before retrying.',
        'err'
      );
  
    } finally {
      cropFieldLinkSaving = false;
  
      if (stopButton) stopButton.disabled = false;
      if (continueButton) continueButton.disabled = false;
    }
  
    if (!saved) return;
  
    closeCropFieldLinkModal();
    renderCropsPage();
  
    toast(
      'Crop is no longer using this field. Watering history was kept.',
      'ok'
    );
  };

  // My Crops watering uses the linked Irrigation field.
  toggleWater = async function(id) {
  if (wateringSessionInFlight) return;

  const crop = myCrops.find(
    item =>
      String(item._id || item.id) === String(id)
  );

  if (!crop) {
    toast('Crop not found.', 'err');
    return;
  }

  if (isCropWateredToday(crop)) {
    toast(
      'This crop already has a confirmed watering ' +
      'record today. View the details in Irrigation.',
      'ok'
    );
    return;
  }

  const linkedField =
    getCropLinkedIrrigationField(crop);

  const today = getIrrigationLocalDate();

  const fieldOnlyEntry =
    linkedField?.wateringHistory?.find(
      entry =>
        entry.date === today &&
        !entry.cropId
    );

  // Reuse existing saved liters after explicit confirmation.
  // Never create a duplicate watering record.
  if (fieldOnlyEntry) {
    await confirmWateringCropAttribution(
      linkedField,
      today,
      crop
    );
    return;
  }

  if (hasLinkedFieldWateringConflict(crop)) {
    toast(
      'This field already has watering recorded ' +
      'today for another crop. Review Irrigation ' +
      'History before trying again.',
      'warn'
    );
    return;
  }

  // Direct watering — no mandatory field selection.
  openCropWateringModal(crop._id || crop.id);
};

  // Open the harvest form instead of deleting the crop.
  markHarvested = function(id) {
    openLogHarvestModal(id);
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

    // Complete a crop directly from My Crops.
    if (pendingCropHarvestId) {
      if (harvestCompletionInFlight) return;

      const cropId = pendingCropHarvestId;

      const activeCrop = myCrops.find(
        c => String(c._id || c.id) === String(cropId)
      );

      if (!activeCrop) {
        toast('Crop not found. Refresh your records.', 'err');
        return;
      }

      if (!confirm(
        `Save the ${activeCrop.type} harvest and remove ` +
        'this crop from My Crops?'
      )) {
        return;
      }

      harvestCompletionInFlight = true;

      const saveButton = document.querySelector(
        '#logHarvestModal .btn-save'
      );

      if (saveButton) saveButton.disabled = true;

      let result;

      try {
        result = await fcCrops.completeHarvest(cropId, {
          date,
          location,
          area,
          yield: yieldKg,
          quality,
          notes
        });
      } catch (error) {
        harvestCompletionInFlight = false;

        if (saveButton) saveButton.disabled = false;

        toast(
          `${error.message} Check My Crops and Harvest History ` +
          'before retrying.',
          'err'
        );

        return;
      }

      // Server transaction has succeeded.
      myCrops = myCrops.filter(
        c => String(c._id || c.id) !== String(cropId)
      );

      const savedId = String(result.record.id);

      if (!harvestHistory.some(
        h => String(h._id || h.id) === savedId
      )) {
        harvestHistory.push(result.record);
      }

      // Update local display caches after confirmed saving.
      lsSave(LS_CROPS, myCrops);
      lsSave(LS_HARVEST, harvestHistory);

      harvestCompletionInFlight = false;

      if (saveButton) saveButton.disabled = false;

      closeLogHarvestModal();
      renderCropsPage();
      renderHarvestHistory();

      toast(
        `${activeCrop.type} harvested and recorded successfully!`,
        'ok'
      );

      return;
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
    if (wateringSessionInFlight) return;

    const field = irrFields.find(
      f => String(f._id || f.id) === String(id)
    );

    if (!field || field.archivedAt) return;

    const today = getIrrigationLocalDate();

    const hasRecordedToday =
      Array.isArray(field.wateringHistory) &&
      field.wateringHistory.some(
        event => event.date === today
      );

    // If no watering was recorded today,
    // open the form to record actual liters.
    if (!hasRecordedToday) {
      openWateringSessionModal(id);
      return;
    }

    if (!confirm(
      `Undo today's recorded watering for ${field.name}?`
    )) {
      return;
    }

    wateringSessionInFlight = true;

    let undoConfirmed = false;
    let refreshFailed = false;

    try {
      // Undo the record on the backend first.
      const updated = await fcIrrigation.recordWatering(
        id,
        {
          action: 'undo',
          date: today
        }
      );

      // The backend returned a verified updated field.
      // Any subsequent UI failure must not be treated
      // as an unsuccessful database operation.
      undoConfirmed = true;

      try {
        Object.assign(field, updated);

        lsSave(LS_IRR_FIELDS, irrFields);

        // Update all dependent sections.
        renderIrrigationPage();
        renderCropsPage();
        renderFarmAnalytics();

      } catch (refreshError) {
        refreshFailed = true;

        console.error(
          'Watering undone, but screen refresh failed:',
          refreshError
        );
      }

    } catch (err) {
      // The server did not confirm the Undo operation.
      // Do not automatically send another request.
      toast(
        `${err.message} Check watering history ` +
        'before retrying.',
        'err'
      );

    } finally {
      wateringSessionInFlight = false;
    }

    if (undoConfirmed) {
      if (refreshFailed) {
        toast(
          'Watering was undone on the server, but ' +
          'the screen could not refresh. Reload to ' +
          'view the latest records.',
          'warn'
        );

      } else {
        toast(
          'Watering record undone successfully.',
          'ok'
        );
      }
    }
  };

    saveWateringSession = async function() {

    // Prevent duplicate requests or saving without
    // a selected crop/irrigation field.
    if (
      wateringSessionInFlight ||
      (!pendingWaterCropId && !pendingWaterFieldId)
    ) {
      return;
    }

    // Read farmer-entered optional details once.
    // Used by both My Crops and Irrigation.
    const wateringDetails =
      getWateringSessionExtraDetails();

    if (!wateringDetails) {
      return;
    }

    // Validate actual liters before asking for confirmation.
    const litersElement = document.getElementById(
      'wateringActualLiters'
    );

    const litersText =
      litersElement?.value.trim() ?? '';

    const actualLiters = Number(litersText);

    if (
      litersText === '' ||
      !Number.isFinite(actualLiters) ||
      actualLiters < 0.01
    ) {
      toast(
        'Enter the actual water used in liters.',
        'warn'
      );
      return;
    }

    // Use the same local date in the confirmation
    // and subsequent backend request.
    const sessionDate = getIrrigationLocalDate();

    // Recheck local records before asking the farmer
    // to confirm a new crop watering session.
    if (pendingWaterCropId) {
      const selectedCrop = myCrops.find(
        item =>
          String(item._id || item.id) ===
          String(pendingWaterCropId)
      );

      if (!selectedCrop) {
        toast(
          'Crop record is unavailable. Refresh and try again.',
          'err'
        );
        return;
      }

      const linkedField =
        getCropLinkedIrrigationField(selectedCrop);

      const existingSession =
        linkedField?.wateringHistory?.some(
          entry => entry?.date === sessionDate
        ) || false;

      if (existingSession) {
        toast(
          'This linked field already has a watering ' +
          'record for today. Review Irrigation History ' +
          'before saving another session.',
          'warn'
        );
        return;
      }
    }

    // A manual irrigation field must have an explicit
    // crop choice or an explicit Field only selection.
    let selectedIrrigationCropId = null;

    if (!pendingWaterCropId && pendingWaterFieldId) {
      const selectedField = irrFields.find(
        item =>
          String(item._id || item.id) ===
          String(pendingWaterFieldId)
      );

      if (!selectedField) {
        toast(
          'Irrigation field not found. Refresh and try again.',
          'err'
        );
        return;
      }

      if (selectedField.sourceCropId) {
        selectedIrrigationCropId =
          String(selectedField.sourceCropId);

      } else {
        const cropSelect = document.getElementById(
          'wateringTargetCrop'
        );

        const selectedValue = cropSelect?.value || '';

        if (!selectedValue) {
          toast(
            'Choose which crop was watered, or Field only.',
            'warn'
          );
          return;
        }

        if (selectedValue !== '__field_only__') {
          const matchingCrop = myCrops.find(
            item =>
              String(item._id || item.id) ===
                selectedValue &&
              String(item.irrigationFieldId || '') ===
                String(pendingWaterFieldId)
          );

          if (!matchingCrop) {
            toast(
              'Selected crop is not linked to this field.',
              'warn'
            );
            return;
          }

          selectedIrrigationCropId = selectedValue;
        }
      }
    }

    // Refresh the displayed date before confirmation.
    // This also covers a form left open across midnight.
    const sessionDateDisplay = document.getElementById(
      'wateringSessionDate'
    );

    if (sessionDateDisplay) {
      sessionDateDisplay.textContent = sessionDate;
    }

    const selectedName = document.getElementById(

      'wateringSessionFieldName'
    )?.textContent?.trim() || 'Selected crop or field';

    const soilLabels = {
      dry: 'Dry',
      'slightly-dry': 'Slightly Dry',
      moist: 'Moist'
    };

    const confirmationLines = [
      `Record watering for ${selectedName}?`,
      '',
      `Date: ${sessionDate}`,
      `Actual water used: ${actualLiters} L`
    ];

    if (wateringDetails.areaWatered !== null) {
      confirmationLines.push(
        `Area watered: ${wateringDetails.areaWatered} m²`
      );
    }

    if (wateringDetails.irrigationMethod) {
      confirmationLines.push(
        `Method: ${wateringDetails.irrigationMethod}`
      );
    }

    if (wateringDetails.soilCondition) {
      confirmationLines.push(
        'Soil: ' +
        (
          soilLabels[wateringDetails.soilCondition] ||
          wateringDetails.soilCondition
        )
      );
    }

    if (wateringDetails.notes) {
      confirmationLines.push(
        `Notes: ${wateringDetails.notes}`
      );
    }

    if (!pendingWaterCropId) {
      const targetCrop = myCrops.find(
        item =>
          String(item._id || item.id) ===
          String(selectedIrrigationCropId)
      );

      confirmationLines.push(
        'Credited to: ' +
        (
          targetCrop
            ? `${targetCrop.type} — ${targetCrop.location || 'Farm'}`
            : 'Field only (not a specific crop)'
        )
      );
    }

    confirmationLines.push(
      '',
      'Save this watering record to Irrigation History?'
    );

    // Nothing is sent to the server until confirmed.
    if (!confirm(confirmationLines.join('\n'))) {
      return;
    }

    // My Crops: save watering and automatically create/reuse
    // the related irrigation record.
    if (pendingWaterCropId) {
      if (wateringSessionInFlight) return;

      const crop = myCrops.find(
        item =>
          String(item._id || item.id) ===
          pendingWaterCropId
      );

      if (!crop) {
        toast(
          'Crop not found. Refresh and try again.',
          'err'
        );
        return;
      }

      const input = document.getElementById(
        'wateringActualLiters'
      );

      const raw = input?.value.trim() || '';
      const liters = Number(raw);

      if (
        raw === '' ||
        !Number.isFinite(liters) ||
        liters < 0.01
      ) {
        toast(
          'Enter the actual water used in liters.',
          'warn'
        );
        return;
      }

      const saveButton = document.getElementById(
        'wateringSessionSaveBtn'
      );

      wateringSessionInFlight = true;

      if (saveButton) {
        saveButton.disabled = true;
      }

      let result;

      try {

        result = await fcCrops.recordWatering(
          crop._id || crop.id,
          {
            date: sessionDate,
            liters,

            // Optional farmer-entered details.
            ...wateringDetails
          }
        );

      } catch (error) {
        toast(
          `Could not confirm watering: ${error.message} ` +
          'Refresh your records before retrying.',
          'err'
        );

      } finally {
        wateringSessionInFlight = false;

        if (saveButton) {
          saveButton.disabled = false;
        }
      }

    if (!result) return;

      // The backend has already confirmed that watering
      // was saved in My Crops and Irrigation.
      let refreshFailed = false;

      try {
        // Update the selected crop.
        Object.assign(crop, {
          ...result.crop,
          id: result.crop._id
        });

        // Update or insert its linked irrigation field.
        const savedField = {
          ...result.field,
          id: result.field._id
        };

        const fieldIndex = irrFields.findIndex(
          item =>
            String(item._id || item.id) ===
            String(savedField._id)
        );

        if (fieldIndex === -1) {
          irrFields.unshift(savedField);
        } else {
          Object.assign(
            irrFields[fieldIndex],
            savedField
          );
        }

        // Refresh the local compatibility cache.
        lsSave(LS_CROPS, myCrops);
        lsSave(LS_IRR_FIELDS, irrFields);

        // Refresh the affected FarmCast sections.
        renderCropsPage();
        renderIrrigationPage();
        renderFarmAnalytics();

      } catch (refreshError) {
        refreshFailed = true;

        console.error(
          'Crop watering saved but UI refresh failed:',
          refreshError
        );
      }

      // Saving is complete. Close the confirmation form.
      closeWateringSessionModal();

      if (refreshFailed) {
        toast(
          'Watering was saved on the server in My Crops ' +
          'and Irrigation, but the screen could not fully ' +
          'refresh. Reload to view the latest records.',
          'warn'
        );

      } else {
        toast(
          'Watering saved in My Crops and Irrigation.',
          'ok'
        );
      }

      return;
    }

    if (!pendingWaterFieldId || wateringSessionInFlight) {
      return;
    }

    const input = document.getElementById(
      'wateringActualLiters'
    );

    const raw = input.value.trim();
    const liters = Number(raw);

    if (
      raw === '' ||
      !Number.isFinite(liters) ||
      liters < 0.01
    ) {
      toast(
        'Enter the actual water used in liters.',
        'warn'
      );
      return;
    }

    const fieldId = pendingWaterFieldId;

    const field = irrFields.find(
      f => String(f._id || f.id) === fieldId
    );

    if (!field) {
      toast('Irrigation field not found.', 'err');
      return;
    }

    const date = sessionDate;

    const saveButton = document.getElementById(
      'wateringSessionSaveBtn'
    );

    wateringSessionInFlight = true;

    if (saveButton) {
      saveButton.disabled = true;
    }

    let saved = false;
    let refreshFailed = false;

    try {
      // Record the actual watering details on the server.
      const updated = await fcIrrigation.recordWatering(
        fieldId,
        {
          action: 'water',
          date,
          liters,
          cropId: selectedIrrigationCropId,

          // Optional farmer-entered details.
          ...wateringDetails
        }
      );

      // The server returned a verified watering record.
      // Mark the save as successful BEFORE refreshing UI.
      saved = true;

      try {
        // Update the local irrigation record.
        Object.assign(field, updated);

        lsSave(LS_IRR_FIELDS, irrFields);

        // Refresh all dependent sections.
        renderIrrigationPage();
        renderCropsPage();
        renderFarmAnalytics();

      } catch (refreshError) {

        // A screen rendering error does not mean
        // that the database transaction failed.
        refreshFailed = true;

        console.error(
          'Watering saved, but screen refresh failed:',
          refreshError
        );
      }

    } catch (err) {

      // This handles an unconfirmed server response.
      // Do not automatically retry a watering request.
      toast(
        `${err.message} Check saved watering records ` +
        'before retrying.',
        'err'
      );

    } finally {

      wateringSessionInFlight = false;

      if (saveButton) {
        saveButton.disabled = false;
      }
    }

    if (saved) {

      closeWateringSessionModal();

      if (refreshFailed) {

        toast(
          'Watering was saved on the server, but the ' +
          'screen could not refresh. Reload to view ' +
          'the latest records.',
          'warn'
        );

      } else {

        toast(
          `${field.name} watering recorded successfully!`,
          'ok'
        );
      }
    }
  };

  // Archive an active field without losing history.
  archiveField = async function(id) {
    if (irrigationArchiveActionInFlight) return;

    const field = irrFields.find(
      item => String(item._id || item.id) === String(id)
    );
  
    if (!field || field.archivedAt) return;
  
    const linkedCrop = myCrops.some(
      crop =>
        String(crop.irrigationFieldId || '') ===
        String(field._id || field.id)
    );
  
    if (linkedCrop) {
      toast(
        'This field is still used by a crop. ' +
        'Change that crop’s watering field before archiving.',
        'warn'
      );
      return;
    }
  
    if (!confirm(
      `Archive "${field.name}"?\n\n` +
      'The field will be removed from the active watering schedule. ' +
     'Its watering history will be kept.'
    )) return;
  
    irrigationArchiveActionInFlight = true;
  
    try {
      const updated = await fcIrrigation.archive(
        field._id || field.id
      );
  
      Object.assign(field, updated);
  
      lsSave(LS_IRR_FIELDS, irrFields);
  
      renderIrrigationPage();
      renderCropsPage();
      renderFarmAnalytics();
  
      toast(
        `${field.name} archived. Watering history preserved.`,
        'ok'
      );
  
    } catch (error) {
      toast(
        `Could not confirm archive: ${error.message}. ` +
        'Refresh before retrying.',
        'err'
      );
  
    } finally {
      irrigationArchiveActionInFlight = false;
    }
  };

  // Restore an archived irrigation field.
  restoreArchivedField = async function(id) {
    if (irrigationArchiveActionInFlight) return;
  
    const field = irrFields.find(
      item => String(item._id || item.id) === String(id)
    );
 
    if (!field || !field.archivedAt) return;
  
    irrigationArchiveActionInFlight = true;
  
    try {
      const updated = await fcIrrigation.restore(
        field._id || field.id
      );
  
      Object.assign(field, updated);

      lsSave(LS_IRR_FIELDS, irrFields);

      renderIrrigationPage();
      renderCropsPage();
      renderFarmAnalytics();
  
      toast(
        `${field.name} restored to active fields.`,
        'ok'
      );
  
    } catch (error) {
      toast(
        `Could not confirm restore: ${error.message}. ` +
        'Refresh before retrying.',
        'err'
      );
  
    } finally {
      irrigationArchiveActionInFlight = false;
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


        /*
         * The saved farm location changed.
         * Force Dashboard weather to reload
         * from the newly saved coordinates.
         */
        currentWeather =
          null;


        if (
          typeof syncWeatherMapToSavedLocation ===
            'function'
        ) {

          syncWeatherMapToSavedLocation(
            lat,
            lon,
            city
          );

        }


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
      Number(
        tempInput?.value
      );


    const enteredReminderDays =
      Number(
        reminderInput?.value
      );


    /*
     * Temperature input uses the currently
     * selected display unit.
     *
     * Internally FarmCast still stores
     * thresholdTemp in Celsius.
     */
    const minDisplayTemp =
      appSettings.tempUnit === 'F'
        ? 68
        : 20;


    const maxDisplayTemp =
      appSettings.tempUnit === 'F'
        ? 113
        : 45;


    if (
      !Number.isFinite(
        enteredTemp
      ) ||
      enteredTemp <
        minDisplayTemp ||
      enteredTemp >
        maxDisplayTemp
    ) {

      toast(
        appSettings.tempUnit === 'F'
          ? 'Temperature threshold must be between 68°F and 113°F.'
          : 'Temperature threshold must be between 20°C and 45°C.',
        'warn'
      );

      return;

    }


    if (
      !Number.isInteger(
        enteredReminderDays
      ) ||
      enteredReminderDays < 1 ||
      enteredReminderDays > 30
    ) {

      toast(
        'Harvest reminder must be between 1 and 30 whole days.',
        'warn'
      );

      return;

    }


    const thresholdCelsius =
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


    appSettings.thresholdTemp =
      thresholdCelsius;


    appSettings.harvestReminderDays =
      enteredReminderDays;


    /*
     * Local-first after validation.
     *
     * Invalid values never reach either
     * localStorage or MongoDB.
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
