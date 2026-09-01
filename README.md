# 🌾 FarmCast — Smart Farm Weather Platform

> A full-stack AI-powered smart farming web application designed to help Filipino farmers monitor weather, manage crops, analyze plant health, and make better farming decisions.

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-2ea44f?style=for-the-badge)](https://kyross101.github.io/farmcast/)
[![GitHub](https://img.shields.io/badge/GitHub-Kyross101%2Ffarmcast-181717?style=for-the-badge&logo=github)](https://github.com/Kyross101/farmcast)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-FastAPI-009688?style=for-the-badge&logo=python&logoColor=white)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

## 🌐 Live Demo

**FarmCast:**  
https://kyross101.github.io/farmcast/

> **Development note:** FarmCast currently uses Cloudflare Quick Tunnels to connect the GitHub Pages frontend to development backend services. Server-dependent features are available while those backend services and tunnels are online.

---

## 🌱 Features

### 🌦️ Weather Dashboard
- Real-time weather information
- Location-based weather search
- Temperature, humidity, rainfall, and wind monitoring
- Multi-day weather forecast
- Agricultural weather insights
- Responsive farm overview

### 🗺️ Weather Maps
- Interactive maps powered by Leaflet.js
- Weather visualization layers
- Location-based monitoring
- Mobile-friendly map interface

### 🌾 My Crops
- Add, edit, and manage crops
- Track crop growth progress
- Monitor planting and expected harvest dates
- Weather compatibility information
- Watering and harvest tracking

### 📅 Smart Planting Calendar
- Crop planting schedule overview
- Crop growth timeline
- Weather-aware planning information
- Touch-friendly mobile navigation

### 🐛 Pest Alerts
- Weather-related pest risk information
- Pest sighting records
- Prevention tips and recommendations

### 💧 Irrigation Management
- Irrigation field monitoring
- Water usage tracking
- Watered status controls
- Irrigation scheduling tools

### 🤖 AI Plant Health Scanner

FarmCast includes an AI-assisted plant scanner powered by a dedicated Python/FastAPI service.

- Live camera support
- Image upload support
- Crop detection
- Plant disease detection
- Detection confidence results
- Possible disease identification
- Crop health recommendations
- Scan history storage

The AI backend uses local YOLO/Ultralytics computer-vision models and exposes dedicated detection endpoints to the FarmCast frontend.

### 📊 Farm Analytics
- Farm KPI overview
- Crop growth statistics
- Harvest monitoring
- Water usage information
- Weather impact analysis
- Crop performance summaries

### 🌾 Harvest History
- Harvest record management
- Sortable/filterable history
- Yield information
- Farm production tracking

### ⚙️ Settings
- Farm profile settings
- Weather alert thresholds
- Notification preferences
- Quiet hours
- Language preferences
- Data export tools
- Application customization

---

## 🔐 Account & Password Recovery

FarmCast includes a complete account system:

- User registration
- Secure login
- Password hashing with bcrypt
- JWT authentication
- Forgot Password workflow
- Email-based password reset
- Expiring password reset links
- Hashed reset tokens
- Sign out

Password reset emails are delivered through Resend. Sensitive email credentials remain on the backend and are loaded through environment variables.

---

## 📱 Responsive Design

FarmCast is designed for desktop and mobile use, including:

- Responsive dashboard
- Collapsible mobile sidebar
- Responsive top navigation
- Mobile weather search
- Touch-friendly planting calendar
- Responsive settings pages
- Mobile camera support for plant scanning


## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose|
| **Auth** | JWT, bcrypt|
| **AI Backend** | Python, FastAPI, |
| **Computer Vision** | YOLO / Ultralytics |
| **Maps** | Leaflet.js |
| **Weather API** | OpenWeatherMap |
| **Password Email** | Resend |
| **Frontend Hosting** | GitHub Pages |
| **Backend Connectivity** | Cloudflare Tunnel |
| **Version Control** | GitHub |

---

## 🏗️ System Architecture

FarmCast separates the frontend, application backend, and AI backend:

```text
GitHub Pages — FarmCast Frontend
          │
          ├── Weather & Map Services
          │
          ├── Cloudflare Tunnel
          │       └── Node.js / Express Backend
          │             ├── Authentication
          │             ├── Farm Data API
          │             └── MongoDB
          │
          └── Cloudflare Tunnel
                  └── Python / FastAPI AI Backend
                        ├── Crop Detection
                        └── Plant Disease Detection

## 📁 Project Structure
```bash
farmcast/
├── index.html         
├── login.html   
├── reset-password.html          
├── api.js                
├── script.js             
├── style.css              
├── login.css              
├── login.js   
├── reset-password.js             
└── farmcast-backend/
    ├── server.js          
    ├── ai_server.py        
    ├── requirements.txt   
    ├── Procfile           
    ├── .env               
    ├── middleware/
    │   └── auth.js         
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

## ⚙️ Frontend Configuration
FarmCast uses config.js as the central location for backend service endpoints.

```bash
window.FARMCAST_CONFIG = {
  API_URL: 'YOUR_BACKEND_API_URL/api',
  AI_URL: 'YOUR_AI_SERVER_URL'
};
```

## 🚀 Running Locally

### Prerequisites
- Node.js v18+
- Python 3.10+
- MongoDB Database
- Required weather/map configuration
- Resend API key for password recovery email
- OpenWeatherMap API key
- FarmCast AI model files and Python dependencies

### 1. Clone the repository
```bash
git clone https://github.com/Kyross101/farmcast.git
cd farmcast
```

### 2. Install the Node.js backend
```bash
cd farmcast-backend
npm install
```

Create `.env` file inside `farmcast-backend/`:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
PORT=5000
```

### 3. Start the Node.js backend
```bash
node server.js
```

### 4. Start the Python AI backend
```bash
Run the FarmCast FastAPI AI server on port 8000 using the AI environment and model files configured for the project
```

### 5. Development tunnels
```bash
During the current development deployment, Cloudflare Quick Tunnels expose the local backend services.

Update only the corresponding values in config.js when the temporary tunnel addresses change.
```

## 🔒 Security

FarmCast uses several security practices:

```bash
- Password hashing
- JWT-based authentication
- Expiring password reset tokens
- Hashed reset tokens stored in the database
- Generic password-recovery responses
- Backend environment variables for sensitive credentials
- Separate frontend, application backend, and AI services

.env files and other sensitive configuration must never be committed to source control.

Because frontend JavaScript is delivered to the browser, public frontend configuration should never contain private secrets.
```

## 🚦Current Status
```bash
FarmCast v1.0 — Core functionality operational

Working areas include:

- Authentication
- Email password recovery
- Weather monitoring
- Weather maps
- Crop management
- Planting tools
- Irrigation
- Pest monitoring
- Farm analytics
- Harvest history
- AI-assisted plant scanning
- Responsive desktop/mobile interfaces

The project is currently in its final feature-polish and deployment-optimization stage.
```

## 🎓 Project Purpose
```bash
FarmCast was developed as an academic smart-agriculture project exploring how modern web technologies, weather information, farm-management tools, and artificial intelligence can be combined to support agricultural decision-making, with a focus on Filipino farmers.
```

## ⚠️ Disclaimer
```bash
FarmCast's AI plant-health results, weather information, and agricultural recommendations are intended as decision-support information.

They should not be treated as a replacement for professional agricultural diagnosis or expert advice.

AI predictions and third-party weather information may vary in accuracy.
```

## 👨‍💻 Developer
```bash
**Kyross Geane Palen**
- GitHub: [@Kyross101](https://github.com/Kyross101)
- Email: kyrossgeanepalen@gmail.com
```

## 📄📄 License
```bash
All rights reserved.

This project and its source code may not be copied, redistributed, modified, sold, or used commercially without permission from the project owner.
```
```bash
<p align="center"> <strong>🌾 FarmCast — Smarter insights. Healthier crops. Better farming.</strong> </p> ```
```