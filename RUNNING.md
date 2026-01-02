# How to Run the Restaurant Inventory System

## 1. Prerequisites
- **PostgreSQL**: Must be installed and running.
  - Default User: `postgres`
  - Default Password: `password`
  - *If yours is different, edit `backend/config/dev.exs`*
- **Elixir**: Must be installed.
- **Node.js**: Must be installed.

## 2. Start the Application

### Step A: Backend (The API)
1. Open a terminal in this folder.
2. Run the startup script:
   ```cmd
   .\start_backend.bat
   ```
   *This handles installing dependencies, setting up the database, and starting the server.*
   
   **Success Indicator:** You will see "Running InventoryWeb.Endpoint with cowboy 2.5.0 at 127.0.0.1:4000".

### Step B: Frontend (The UI)
1. Open a **new** terminal.
2. Navigate to the frontend:
   ```cmd
   cd frontend
   ```
3. Start the dev server:
   ```cmd
   npm run dev
   ```
   **Success Indicator:** You will see "Local: http://localhost:5173/".

## 3. How to Use
1. Open your browser to **http://localhost:5173**.
2. **Create Item**: Enter "Tomato", SKU "TOM-1", Unit "kg" -> Click Create.
3. **Add Stock**: 
   - Select "Tomato" from the dropdown.
   - Select "IN" (Receive).
   - Enter Quantity (e.g., 50).
   - Click Save.
4. **View Stock**: The list on the right will update (Stock: 50).
5. **Consume Stock**: 
   - Select "Tomato", Select "OUT", Quantity 10.
   - Click Save.
   - Stock becomes 40.

## 4. Running Tests
To verify the logic (no negative stock, correct calculations):
1. Run:
   ```cmd
   .\run_tests.bat
   ```
