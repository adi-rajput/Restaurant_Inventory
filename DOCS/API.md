# API Documentation

The Inventory Management System exposes a RESTful JSON API. All responses follow the `data` wrapper format.

## Base URL
- **Local**: `http://localhost:4000/api`
- **Production**: `https://your-app-name.onrender.com/api`

---

## 📦 Items

### Get All Items
`GET /items`
Returns an array of all items with their dynamically computed current stock levels.
- **Example Response**:
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Basmati Rice",
      "sku": "GRN-RIC-001",
      "unit": "kg",
      "stock": 45
    }
  ]
}
```

### Create New Item
`POST /items`
- **Payload**:
```json
{
  "item": {
    "name": "Milk",
    "sku": "DAI-001",
    "unit": "litre"
  }
}
```

---

## 🔄 Movements

### Record Movement
`POST /movements`
Records a new stock movement (IN, OUT, or ADJUSTMENT).
- **Payload**:
```json
{
  "movement": {
    "item_id": "uuid",
    "quantity": 10,
    "movement_type": "IN"
  }
}
```

### Get Item History
`GET /items/:id/movements`
Returns a history of all movements for a specific item.

---

## 🛡️ Error Handling
The API uses standard HTTP status codes:
- **200/201**: Success
- **400**: Bad Request (Invalid data)
- **422**: Unprocessable Entity (Validation failed)
- **500**: Internal Server Error
