# 🏥 MediNova - Full Stack Repository

Welcome to the MediNova project! This repository follows a professional full-stack architecture with a clean separation between the frontend and backend.

## 📁 Project Structure

```text
root/
├── frontend/        # React + Vite Application
│   ├── src/         # UI Components and Logic
│   ├── public/      # Static Assets
│   └── package.json # Frontend Dependencies
├── backend/         # Node.js + Express API
│   ├── models/      # Database Schemas
│   ├── routes/      # API Endpoints
│   └── server.js    # Backend Entrance
├── render.yaml      # Deployment Configuration
└── package.json     # Root Management Scripts
```

## 🚀 Getting Started

To run the project locally, you can use the root orchestration scripts:

### Prerequisites
Ensure you have **Node.js** and **npm** installed.

### 1. Install Dependencies
Run from the root directory:
```bash
npm run install:all
```

### 2. Run Development Servers
Open two terminal windows or use:
```bash
# Start Frontend (Vite)
npm run frontend

# Start Backend (Node)
npm run backend
```

## 🌐 API Configuration
The frontend uses the `VITE_API_URL` environment variable to communicate with the backend. Ensure `.env` files are configured correctly in their respective folders.

---
Designed with ❤️ for a healthier world.
