# Restaurant Inventory Management System

## Overview
A high-performance inventory management system for restaurants. Features a real-time dashboard and stock movement tracking.

## 🚢 Deployment (No Credit Card Method)

You can deploy this project for FREE without a credit card using:
1.  **Vercel** (for the Frontend)
2.  **Gigalixir** (for the Backend/Database) - Gigalixir has a free tier that doesn't require a card.

---

### Phase 1: Push to GitHub
1. Create a new repository on GitHub.
2. In your project root:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

---

### Phase 2: Deploy Backend (Gigalixir)
1. Sign up at [Gigalixir](https://gigalixir.com/) (No card required).
2. Install the [Gigalixir CLI](https://gigalixir.readthedocs.io/en/latest/main.html#install-the-command-line-interface).
3. Create your app:
```bash
gigalixir login
gigalixir create -n your-app-name
gigalixir pg:create --free
```
4. Configure environment variables:
```bash
gigalixir config:set SECRET_KEY_BASE=$(mix phx.gen.secret)
gigalixir config:set PHX_HOST=your-app-name.gigalixirapp.com
```
5. Deploy:
```bash
git push gigalixir main
```

---

### Phase 3: Deploy Frontend (Vercel)
1. Sign up at [Vercel](https://vercel.com/).
2. Click **Add New Project** and import your GitHub repo.
3. **Important Configuration**:
   - **Root Directory**: Select the `frontend` folder.
   - **Environment Variables**: Add `VITE_API_URL` with your Gigalixir URL (e.g., `https://your-app-name.gigalixirapp.com/api`).
4. Click **Deploy**.

---

## 🛠️ Local Development
1. Run `start_backend.bat` for the server.
2. `cd frontend && npm install && npm run dev` for the UI.

## 📄 License
MIT
