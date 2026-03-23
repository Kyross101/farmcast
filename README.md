# 🌾 FarmCast — Smart Farm Weather Platform

> A full-stack AI-powered web application designed to help Filipino farmers monitor weather, manage crops, detect plant diseases, and make smarter farming decisions.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-farmcast--r0hs.onrender.com-green?style=for-the-badge)](https://farmcast-r0hs.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Kyross101%2Ffarmcast-black?style=for-the-badge&logo=github)](https://github.com/Kyross101/farmcast)
[![Node.js](https://img.shields.io/badge/Node.js-Express-brightgreen?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![Python](https://img.shields.io/badge/Python-FastAPI-blue?style=for-the-badge&logo=python)](https://fastapi.tiangolo.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://mongodb.com)

---

## 🌐 Live Demo

👉 **[https://farmcast-r0hs.onrender.com](https://farmcast-r0hs.onrender.com)**

> ⚠️ **Note:** Hosted on Render free tier — the app may take **1-2 minutes** to wake up on first visit. Please be patient!

---

## 📸 Features

### 🌤️ Dashboard
- Real-time weather data powered by OpenWeatherMap API
- Animated weather scenes (sun, rain, thunder, snow, fog)
- 7-day weather forecast
- Planting calendar with weather compatibility
- Quick farm stats overview

### 🗺️ Weather Maps
- Interactive maps using Leaflet.js
- Multiple weather layers (temperature, precipitation, wind, clouds)
- Location search for any city

### 🌱 My Crops
- Add, edit, and delete crops
- Track crop growth progress
- Weather compatibility checker
- Watered toggle per crop
- Harvest tracking

### 🐛 Pest Alerts
- Weather-driven pest risk analysis
- Pest log with CRUD operations
- Prevention tips and recommendations

### 📅 Planting Calendar
- Full monthly calendar grid
- Crop event markers
- Animated weather per day

### 💧 Irrigation
- Field tracker with watered toggle
- Weekly water usage chart
- Irrigation scheduling

### 📊 Farm Analytics
- 5 KPI cards
- Crop growth progress bars
- Weather impact analysis
- Yield tracking

### 🌾 Harvest History
- Complete harvest log with sort and filter
- Yield bar chart
- Export-ready data table

### 🔍 Plant Health Scanner
- Live camera with real-time detection
- Upload photo for analysis
- Claude AI plant identification
- Disease detection and recommendations
- Scan history saved to MongoDB

> ⚠️ **Known Issue:** The Plant Health Scanner AI is currently under improvement. The Python AI server (YOLOv8 + Claude AI) is hosted on Render free tier which causes slow response times and occasional timeouts. This feature is actively being improved.

### ⚙️ Settings
- Language switcher (English / Filipino / Taglish)
- Farm profile settings
- Notification preferences

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **AI Server** | Python, FastAPI, YOLOv8, Claude AI (Anthropic) |
| **Auth** | JWT (JSON Web Tokens) |
| **Maps** | Leaflet.js |
| **Weather API** | OpenWeatherMap |
| **Deployment** | Render.com |
| **Version Control** | GitHub |

---

## 📁 Project Structure

```
farmcast/
├── dashboard.html          ← Main app page
├── login.html              ← Login/Register page
├── api.js                  ← Centralized API helper
├── script.js               ← Main frontend logic (~3800 lines)
├── style.css               ← All styles (~3100 lines)
├── login.css               ← Login page styles
├── login.js                ← Login/Register logic
└── farmcast-backend/
    ├── server.js           ← Express server + static file serving
    ├── ai_server.py        ← Python FastAPI + YOLOv8 + Claude AI
    ├── requirements.txt    ← Python dependencies
    ├── Procfile            ← Render deployment config
    ├── .env                ← Environment variables (not committed)
    ├── middleware/
    │   └── auth.js         ← JWT middleware
    ├── models/
    │   ├── User.js
    │   ├── Crop.js
    │   ├── Harvest.js
    │   ├── IrrigationField.js
    │   ├── PestLog.js
    │   ├── Settings.js
    │   └── ScanHistory.js
    └── routes/
        ├── auth.js
        ├── crops.js
        ├── harvest.js
        ├── irrigation.js
        ├── pests.js
        ├── settings.js
        └── scanhistory.js
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js v18+
- Python 3.10+
- MongoDB Atlas account
- OpenWeatherMap API key
- Anthropic (Claude) API key

### 1. Clone the repository
```bash
git clone https://github.com/Kyross101/farmcast.git
cd farmcast
```

### 2. Setup Backend (Node.js)
```bash
cd farmcast-backend
npm install
```

Create `.env` file inside `farmcast-backend/`:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
ANTHROPIC_API_KEY=your_claude_api_key
```

### 3. Setup Python AI Server
```bash
cd farmcast-backend
pip install -r requirements.txt
```

### 4. Run the servers

**Terminal 1 — Node.js backend:**
```bash
cd farmcast-backend
node server.js
```

**Terminal 2 — Python AI server:**
```bash
cd farmcast-backend
python -m uvicorn ai_server:app --port 8000 --reload
```

### 5. Open in browser
Open `login.html` with Live Server or visit `http://localhost:5000`

---

## 🌱 Improvements Planned

- [ ] Fix Plant Health Scanner AI — improve accuracy and response time
- [ ] Deploy Python AI server on a faster hosting service
- [ ] Add PWA support (installable on mobile)
- [ ] Add plant-specific YOLO model for better detection
- [ ] Offline mode support
- [ ] Push notifications for pest alerts
- [ ] Export farm data to PDF/Excel

---

## 👨‍💻 Developer

**Kyross Geane Palen**
- GitHub: [@Kyross101](https://github.com/Kyross101)
- Email: kyrossgeanepalen@gmail.com

---

## 📄 License

This project is developed as a thesis project. All rights reserved.

---

<p align="center">Made with ❤️ for Filipino Farmers 🌾</p>
