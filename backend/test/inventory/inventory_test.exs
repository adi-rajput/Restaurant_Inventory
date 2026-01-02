defmodule Inventory.InventoryTest do
  use Inventory.DataCase

  alias Inventory

  describe "items" do
    test "list_items_with_stock/0 returns items with calculated stock" do
      {:ok, item} = Inventory.create_item(%{name: "Tomato", sku: "TOM-001", unit: "kg"})
      
      # Add movements
      Inventory.create_movement(%{item_id: item.id, movement_type: "IN", quantity: 100})
      Inventory.create_movement(%{item_id: item.id, movement_type: "OUT", quantity: 20})

      [fetched_item] = Inventory.list_items_with_stock()
      assert fetched_item.id == item.id
      assert fetched_item.stock == 80
    end
  end

  describe "movements" do
    test "create_movement/1 fails when stock insufficient" do
      {:ok, item} = Inventory.create_item(%{name: "Milk", sku: "MILK-001", unit: "litre"})
      
      # Try to take out more than we have (0)
      assert {:error, :insufficient_stock} = 
        Inventory.create_movement(%{item_id: item.id, movement_type: "OUT", quantity: 10})
    end
  end
end
