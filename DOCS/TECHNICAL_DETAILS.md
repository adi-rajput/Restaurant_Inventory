# Technical Details & Implementation Highlights

This document covers the "How" and "Why" behind the technical decisions made in the Restaurant Inventory Management System.

## 1. Inventory Logic: The "Computed Source of Truth"
**Problem**: Traditional inventory systems often suffer from "data drift" where the stock count in the database doesn't match the history of movements.
**Solution**: We implement a **Computed Ledger**. The current stock for any item is never just a "number" in its own column; it is calculated by summing the history of `IN`, `OUT`, and `ADJUSTMENT` movements. This ensures that every item has a full audit trail.

---

## 2. Production-Grade Deployment (Docker)
The `Dockerfile` in this project is highly optimized:
- **Build Caching**: Dependencies (npm and mix) are installed in separate layers to speed up rebuilds.
- **Security**: The final production image is based on `Alpine Linux`, drastically reducing the attack surface by excluding unnecessary tools.
- **Self-Healing**: The `entrypoint.sh` script handles database migrations before the server starts. If a migration fails, the server won't start, preventing "split-state" bugs where code and database are out of sync.

---

## 3. UI/UX: The "Wow" Factor
Recruiters notice detail. We didn't build a basic dashboard; we built a **Premium Interface**:
- **Micro-Animations**: Uses `Framer Motion` for table row entrance, loading bounce effects, and smooth transitions.
- **Glassmorphism**: The UI uses semi-transparent surfaces with backdrop blur (`backdrop-blur-md`) to create a modern, high-end feel.
- **Zero-State Handling**: Custom "Spectral Scans" and empty-state illustrations ensure the app looks professional even when there is no data.
- **Responsive Design**: Built from the ground up to work on tablets and desktops (Kitchen iPads vs. Office Laptops).

---

## 4. API Design & Type Safety
- **DTOs (Data Transfer Objects)**: The frontend and backend share clear interfaces defined in TypeScript (`types/inventory.ts`).
- **Input Validation**: The backend uses Elixir `Changesets` to validate data *before* it touches the database, ensuring no "junk" data can ever be saved.
- **RESTful Principles**: The API follows standard REST conventions, making it predictable and easy for other developers to integrate with.

---

## 5. Overcoming Challenges
- **SSL Requirements**: Configured the backend to support `sslmode=require` for secure connection to serverless database providers like Neon.
- **SPA Routing**: Implemented a "catch-all" controller in Phoenix to ensure that React Router works perfectly even if a user refreshes their browser on a custom path.
- **Cross-Platform Compatibility**: Created `.bat` scripts and `Docker` configs to ensure the project runs identically on Windows (local) and Linux (production).
