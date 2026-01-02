# Restaurant Inventory Management System

## Overview
A high-performance inventory management system designed for restaurants. Features a real-time dashboard, stock movement tracking, and dynamic availability calculation.

## Tech Stack
- **Fullstack:** Bundled as a single Elixir Release
- **Backend:** Phoenix (Elixir), PostgreSQL
- **Frontend:** React, TypeScript, Framer Motion, Tailwind CSS
- **Deployment:** Dockerized (Optimized for Fly.io)

---

## 🚀 Quick Start (Local)

### Prerequisites
- Docker (Recommended) **OR**
- Elixir 1.14+ & Node.js 20+

### Automatic Setup (Windows)
Run the provided batch scripts:
1. `start_backend.bat` - Sets up the database and starts Phoenix.
2. In a separate terminal, `cd frontend && npm install && npm run dev`.

---

## 🚢 Deployment (GitHub + Fly.io)

### 1. Preparation
This project is configured to serve the frontend via the backend for high performance.
- Root contains the `Dockerfile` for multi-stage builds.
- `.gitignore` is set up to exclude local secrets and large dependencies.

### 2. Push to GitHub
```bash
git init
git add .
git commit -m "Initialize deployment-ready inventory system"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### 3. Deploy to Fly.io
```bash
# 1. Login
fly auth login

# 2. Launch (Creates app and DB)
fly launch

# 3. Set secrets
fly secrets set SECRET_KEY_BASE=$(mix phx.gen.secret) PHX_HOST=your-app.fly.dev

# 4. Deploy
fly deploy
```

---

## 🛠️ Post-Deployment Commands
Once deployed, run these to setup your remote database:

**Run Migrations:**
```bash
fly ssh console -C "/app/bin/inventory eval 'Inventory.Release.migrate'"
```

**Seed Initial Data:**
```bash
fly ssh console -C "/app/bin/inventory eval 'Inventory.Release.seed'"
```

---

## 📄 License
MIT
