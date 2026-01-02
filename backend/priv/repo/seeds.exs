alias Inventory.Repo
alias Inventory.Item

# Add some initial items to the inventory
items = [
  %{name: "Ladoo", sku: "LAD-001", unit: "pcs"},
  %{name: "Tomato", sku: "VEG-TOM-001", unit: "kg"},
  %{name: "Milk", sku: "DAI-MLK-001", unit: "litre"},
  %{name: "Basmati Rice", sku: "GRN-RIC-001", unit: "kg"}
]

# Clear existing data - Optional but good for fresh deploy
# Repo.delete_all(Inventory.InventoryMovement)
# Repo.delete_all(Item)

Enum.each(items, fn attrs ->
  case Repo.get_by(Item, sku: attrs.sku) do
    nil -> Repo.insert!(Item.changeset(%Item{}, attrs))
    _item -> :ok
  end
end)
