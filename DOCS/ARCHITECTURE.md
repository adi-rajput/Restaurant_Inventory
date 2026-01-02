# System Architecture: Restaurant Inventory Management

## 1. High-Level Overview
The system is built using a **Monolith-over-Service** approach. While the frontend and backend are developed as separate entities, they are bundled into a single high-performance Docker container for production deployment.

### Components:
- **Frontend**: React (TypeScript) SPA (Single Page Application).
- **Backend**: Phoenix (Elixir) API + Web Server.
- **Database**: PostgreSQL (managed via Neon.tech in production).
- **Deployment**: Multi-stage Docker build hosted on Render.com.

---

## 2. Infrastructure Flow
```text
[User Browser] 
      |
      V
[Render.com Load Balancer]
      |
      V
[Docker Container (Phoenix Server)] --- [Neon PostgreSQL]
      |
      +--> [Static Assets (React + CSS)]
      +--> [API Requests (JSON)]
```

---

## 3. Technology Rationale

### Backend: Elixir & Phoenix
- **Efficiency**: Built on the Erlang VM (BEAM), the backend handles thousands of concurrent connections with minimal overhead.
- **Reliability**: Uses a supervision tree architecture where processes can crash and restart without affecting the whole system.
- **Speed**: Phoenix provides sub-millisecond response times for API requests.

### Frontend: React & Framer Motion
- **TypeScript**: Ensures type safety across the application, reducing runtime errors.
- **Vite**: Ultra-fast build tool for a smooth developer experience.
- **Framer Motion**: Implements professional micro-animations that enhance the "feel" of the UI, making it stand out to users/recruiters.
- **Tailwind CSS**: A utility-first CSS framework that allows for rapid, consistent UI development.

### Database: PostgreSQL + Ecto
- **Ecto**: A robust database wrapper for Elixir that provides safe queries and powerful migrations.
- **PostgreSQL**: The gold standard for relational data, ensuring data integrity for inventory records.

---

## 4. Key Architectural Patterns

### Single-Container Deployment
Instead of hosting the frontend on Vercel and the backend on Render, we use a **Multi-Stage Docker Build**.
1. **Stage 1 (Node)**: Builds the React assets into optimized static files.
2. **Stage 2 (Elixir)**: Compiles the backend and copies the React assets into the Phoenix `priv/static` folder.
3. **Stage 3 (Alpine)**: Creates a tiny, secure production image containing only the compiled "Release."

### Automated Production Migrations
We use a custom `Inventory.Release` module. This allows the Docker container to run database migrations automatically on startup without requiring the Elixir development environment to be installed on the production server.

### Real-Time Polling
The frontend implements a high-frequency polling strategy with **AnimatePresence**. This ensures that even without WebSockets, the UI feels fast and "live" as stock levels change.
