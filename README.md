# Restaurant Inventory Management System

## Overview
A high-performance inventory management system for restaurants.

## 🚢 "No Credit Card" Deployment Guide (Render + Neon)

This is the most reliable way to deploy for free without a credit card.

### Step 1: Create a Free Database (Neon.tech)
1.  Sign up at [Neon.tech](https://neon.tech/).
2.  Create a project and copy your **Connection String** (`postgres://...`).

### Step 2: Push to GitHub
```bash
git init
git add .
git commit -m "Root deployment"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### Step 3: Deploy to Render.com
1.  Sign up at [Render.com](https://render.com/) via GitHub.
2.  **New +** > **Web Service** > Select your repo.
3.  **Runtime**: Select `Docker`.
4.  **Instance Type**: Select `Free`.
5.  **Environment Variables** (Add these in "Advanced"):
    - `DATABASE_URL`: (Your Neon connection string)
    - `SECRET_KEY_BASE`: (Run `mix phx.gen.secret` locally to generate)
    - `PHX_HOST`: `your-app-name.onrender.com`
6.  **Deploy!** Render will build your React UI and Phoenix API into one single link.

---

## 🛠️ Local Development
- Backend: `start_backend.bat`
- Frontend: `cd frontend && npm install && npm run dev`

## 📄 License
MIT
