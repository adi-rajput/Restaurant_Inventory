defmodule Inventory do
  @moduledoc """
  The Inventory context.
  """

  import Ecto.Query, warn: false
  alias Inventory.Repo
  alias Inventory.Item
  alias Inventory.InventoryMovement
  alias Inventory.StockCalculator

  @doc """
  Returns the list of items with their current calculated stock.
  """
  def list_items_with_stock do
    # Optimized SQL calculation
    query = from i in Item,
      left_join: m in assoc(i, :inventory_movements),
      group_by: i.id,
      select: %{
        id: i.id,
        name: i.name,
        sku: i.sku,
        unit: i.unit,
        stock: fragment("SUM(CASE 
          WHEN ? = 'IN' THEN ? 
          WHEN ? = 'OUT' THEN -? 
          ELSE ? END)", 
          m.movement_type, m.quantity, 
          m.movement_type, m.quantity, 
          m.quantity)
      }

    Repo.all(query)
    |> Enum.map(fn map -> 
      Map.update!(map, :stock, &(&1 || 0)) # Handle null sum
    end)
  end

  def list_items do
    Repo.all(Item)
  end

  def create_item(attrs \\ %{}) do
    %Item{}
    |> Item.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Creates a movement. 
  Checks for stock availability if movement is OUT.
  """
  def create_movement(attrs \\ %{}) do
    item_id = attrs["item_id"] || attrs[:item_id]
    type = attrs["movement_type"] || attrs[:movement_type]
    qty = (attrs["quantity"] || attrs[:quantity]) |> to_integer()

    Repo.transaction(fn ->
      # Lock item to prevent race conditions (optional but good practice)
      # item = Repo.get!(Item, item_id, lock: "FOR UPDATE") 
      
      # Calculate current stock
      current_stock = get_stock(item_id)
      
      # Validate
      case StockCalculator.check_stock_availability(current_stock, type, qty) do
        :ok ->
          %InventoryMovement{}
          |> InventoryMovement.changeset(attrs)
          |> Repo.insert()
          |> case do
            {:ok, movement} -> movement
            {:error, changeset} -> Repo.rollback(changeset)
          end
        {:error, _reason} ->
          Repo.rollback(:insufficient_stock)
      end
    end)
  end

  def get_stock(item_id) do
    # Calculate stock for a single item
    query = from m in InventoryMovement,
      where: m.item_id == ^item_id
      
    movements = Repo.all(query)
    StockCalculator.calculate_stock(movements)
  end

  def list_movements(item_id) do
    from(m in InventoryMovement, 
      where: m.item_id == ^item_id, 
      order_by: [desc: m.inserted_at])
    |> Repo.all()
  end

  defp to_integer(val) when is_binary(val), do: String.to_integer(val)
  defp to_integer(val), do: val
end
