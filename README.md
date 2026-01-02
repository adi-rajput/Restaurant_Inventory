# 🍽️ Restaurant Inventory Management System

A production-ready, full-stack application for managing restaurant stocks with a high-performance Elixir backend and a stunning, animated React frontend.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://restaurant-inventory-i0s3.onrender.com)
[![Tech Stack](https://img.shields.io/badge/Stack-Elixir%20|%20React%20|%20Postgres-blue)](#tech-stack)

---

## 📖 Project Documentation
I have prepared detailed documentation to showcase the technical depth of this project:
1.  **[System Architecture](./DOCS/ARCHITECTURE.md)**: High-level overview and design decisions.
2.  **[Technical Deep Dive](./DOCS/TECHNICAL_DETAILS.md)**: Challenges solved and implementation highlights.
3.  **[API Reference](./DOCS/API.md)**: Full endpoint documentation.

---

## ✨ Key Features
- **Dynamic Ledger**: Stocks are calculated from an audit trail, ensuring 100% data integrity.
- **Premium UI**: Crafted with Tailwind CSS and Framer Motion for a smooth, high-end user experience.
- **Micro-animations**: Interactive elements that provide immediate feedback.
- **Robust Backend**: Built with Phoenix/Elixir for exceptional reliability and concurrency.
- **Fully Dockerized**: Professional-grade multi-stage containerization.

---

## 🛠️ Tech Stack
- **Backend**: Elixir, Phoenix Framework, Ecto
- **Frontend**: React (TypeScript), Framer Motion, Lucide-React
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Neon Serverless)
- **Deployment**: Render (Docker Runtime)

---

## 🚀 Quick Setup

### Prerequisites
- Elixir 1.14+
- Node.js 18+
- PostgreSQL

### Local Development
1.  **Backend**: 
    ```bash
    cd backend
    mix deps.get
    mix ecto.setup
    mix phx.server
    ```
2.  **Frontend**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

---

## 🏗️ Production Build
The project uses a multi-stage Docker build to package the React frontend inside the Phoenix release:
```bash
docker build -t inventory-app .
docker run -p 4000:4000 inventory-app
```

---

## 📄 License
MIT
