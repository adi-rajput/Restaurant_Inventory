# Testing Strategy & Quality Assurance

This project maintains a high standard of quality through automated testing and strict validation logic.

## 1. Test Overview
The test suite is divided into three main layers:
- **Unit Tests**: Verifying the pure logic of stock calculations.
- **Integration Tests**: Ensuring the API endpoints interact correctly with the database.
- **Validation Tests**: Confirming that incorrect data (like negative stock or invalid movements) is rejected correctly.

---

## 2. Core Test Scenarios

### 📦 Inventory Logic (`test/inventory/stock_calculator_test.exs`)
- **Stock Summation**: Verifies that `IN`, `OUT`, and `ADJUSTMENT` movements are correctly summed.
- **Boundary Conditions**: Ensures stock logic behaves correctly with empty movement lists.
- **Availability Guard**: Tests the logic that prevents `OUT` movements if they would result in negative stock.

### 🌐 API Controllers (`test/inventory_web/controllers/`)
- **Item Lifecycle**: Tests creating items and listing them.
- **Movement Tracking**: Verifies that posting a movement updates the computed stock level correctly.
- **Error Handling**: Confirms that 422 Unprocessable Entity is returned for invalid data, with clear JSON error messages.

---

## 3. The "Pure Logic" Pattern
We follow the **Functional Core, Imperative Shell** pattern:
- The **Core** logic (`StockCalculator`) is "pure"—it doesn't touch the database. This makes it incredibly fast and easy to test every possible edge case.
- The **Shell** (Controllers/Contexts) handles the database and side effects, tested via standard integration tests.

---

## 4. How to Run Tests
Tests are executed in an isolated environment using the `MIX_ENV=test` configuration and a dedicated database (`inventory_test`).

```bash
# Run all tests
.\run_tests.bat

# Or via command line (inside backend folder)
mix test
```

## 5. Continuous Quality
- **Type Safety**: TypeScript is used in the frontend to prevent runtime UI errors.
- **Ecto Changesets**: Used in the backend as a first line of defense for data integrity.
- **Visual Feedback**: The test suite outputs clear summaries of passing and failing scenarios, ensuring regressions are caught immediately.
