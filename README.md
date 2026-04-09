# 🏥 MediNova: Modern Full-Stack Hospital Platform

![MediNova Logo](https://img.shields.io/badge/MediNova-Hospital_Platform-emerald?style=for-the-badge&logo=heart)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![Tech](https://img.shields.io/badge/Stack-React_|_Node_|_MongoDB-navy?style=for-the-badge)

Welcome to **MediNova**, a premium, state-of-the-art medical platform designed to provide seamless healthcare services through AI-driven diagnostics, smart scheduling, and multi-language support.

---

## ✨ Key Features

- **🤖 AI Symptom Predictor**: Advanced diagnostic assistance powered by Google Gemini AI.
- **💬 NovaBot Chat**: Intelligent health assistant supporting English, Hindi, and Telugu.
- **🎙️ Voice Assistant**: Hands-free interaction for patients with accessibility needs.
- **📅 Smart Appointments**: Easy-to-use booking system for medical consultations.
- **🏥 Department Navigation**: Guided access to specialized hospital departments (Cardiology, Orthopedics, etc.).
- **🌐 Real-time SMS Alerts**: Appointment confirmations and emergency notifications via Twilio.
- **📱 Premium Responsive Design**: A stunning, mobile-first UI with glassmorphism and smooth animations.

---

## 🏗️ Project Architecture

```text
root/
├── frontend/           # React + Vite (UI Layer)
│   ├── src/            # Components, Contexts, Hooks
│   └── tailwind.config # Visual Design System
├── backend/            # Node.js + Express (API Layer)
│   ├── models/         # MongoDB Schemas
│   ├── routes/         # AI, Appointments, SMS Logic
│   └── utils/          # AI Fallback & Middleware
├── render.yaml         # Cloud Deployment Spec
└── package.json        # Root Orchestration
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18 or higher
- **MongoDB**: Atlas Cluster or Local Instance
- **Gemini API Key**: From [Google AI Studio](https://aistudio.google.com/)

### 2. Installation
Run the following command in the **root** directory to install all dependencies for both frontend and backend:
```powershell
npm run install:all
```

### 3. Environment Setup
Create a `.env` file in both `frontend/` and `backend/` directories:

**Backend (`backend/.env`):**
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_number
MY_PHONE_NUMBER=your_verified_number
```

**Frontend (`frontend/.env`):**
```env
VITE_API_URL=http://localhost:5000
```

### 4. Running Locally
You can start both servers using the root scripts:
```powershell
# Open two terminals or use:
npm run backend   # Backend at port 5000
npm run frontend  # Frontend at port 5173
```

---

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, TypeScript, TailwindCSS 3 |
| **Backend** | Node.js, Express, ES Modules |
| **Database** | MongoDB + Mongoose |
| **AI** | Google Generative AI (Gemini Flash 1.5) |
| **Animations** | Framer Motion, Lucide Icons |
| **Deployment** | Render (Backend), Vercel (Frontend) |

---

## 📡 API Endpoints

- `POST /api/ai/predict`: AI diagnosis based on symptoms.
- `POST /api/ai/chat`: Interactive chat with NovaBot.
- `POST /api/appointments`: Create and manage bookings.
- `GET /`: Health check.

---

## 🔒 Security & Privacy
- Environment variables are strictly ignored by Git.
- Real-time fallback mechanisms ensure the system remains functional even if AI services are down.
- Data validation using Mongoose schemas.

---

Learning PR workflow 🚀
Second PR 🚀

