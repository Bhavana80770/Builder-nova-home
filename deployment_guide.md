# 🚀 MediNova Deployment Guide

This guide explains how to deploy the MediNova platform from scratch.

## 📋 Prerequisites
1.  **GitHub Account**: Your code must be pushed to a GitHub repository.
2.  **Vercel Account**: For hosting the React Frontend.
3.  **Render Account**: For hosting the Node.js Backend.
4.  **MongoDB Atlas Account**: For the database.

---

## 🏗️ Step 1: Backend Deployment (Render)

1.  **Create a New Web Service**:
    *   Sign in to [Render](https://render.com).
    *   Click **New +** > **Web Service**.
    *   Connect your GitHub repository.
2.  **Configure Settings**:
    *   **Name**: `medinova-backend`
    *   **Environment**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node backend/server.js`
3.  **Environment Variables**:
    *   Go to the **Environment** tab in Render.
    *   Add `MONGODB_URI`: (Your MongoDB Atlas connection string).
    *   Add `PORT`: `5000` (or leave it to Render's default).
4.  **Deploy**: Render will automatically deploy once you save. **Copy the Service URL** (e.g., `https://medinova-backend.onrender.com`).

---

## 🎨 Step 2: Frontend Deployment (Vercel)

1.  **Import Project**:
    *   Sign in to [Vercel](https://vercel.com).
    *   Click **Add New** > **Project**.
    *   Import your GitHub repository.
2.  **Configure Settings**:
    *   **Framework Preset**: `Vite`.
    *   **Root Directory**: `./` (Current directory).
    *   **Build Command**: `npm run build`.
    *   **Output Directory**: `dist`.
3.  **Environment Variables**:
    *   Expand the **Environment Variables** section.
    *   **Key**: `VITE_API_BASE_URL`
    *   **Value**: (The Render Service URL you copied in Step 1).
4.  **Deploy**: Click **Deploy**. Vercel will build your site and provide a production URL.

---

## 🛢️ Step 3: Database Setup (MongoDB Atlas)

1.  Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a **Database User** and **Password**.
3.  In **Network Access**, whitelist `0.0.0.0/0` (Allow access from anywhere) so Render can connect.
4.  Copy the **SRV Connection String** and use it in the Render `MONGODB_URI` variable.

---

## ✅ Deployment Checklist
- [ ] Backend is live and returning `{ "success": true }` at `/api/appointments` (test with a browser).
- [ ] Frontend `VITE_API_BASE_URL` matches the backend URL exactly (no trailing slash).
- [ ] MongoDB Network Access is set to allow the Render server.

> [!IMPORTANT]
> Always use `https://` for the `VITE_API_BASE_URL` in production. For local testing, keep using `http://localhost:5000`.
