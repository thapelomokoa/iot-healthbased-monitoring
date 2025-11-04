# IoT Health Monitoring Full Package

## Frontend (Static)
- index.html, doctor_dashboard.html, gym_dashboard.html, patient_portal.html, login.html
- Uses ThingSpeak channel 3128115
- All-in-one live chart (BPM, Temp, Humidity)
- Responsive, clean professional design

## Backend (PDF API)
- Run backend/server.js
- POST /api/pdf accepts JSON: patient, doctor, bpm, temp, hum
- Returns downloadable PDF

## How to run
1. Backend:
  cd backend
  npm install
  npm start
2. Frontend:
  Open any HTML file in browser
