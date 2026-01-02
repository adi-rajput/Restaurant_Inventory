defmodule Inventory.StockCalculator do
  @moduledoc """
  Pure logic for calculating stock from movements.
  """

  alias Inventory.InventoryMovement

  @doc """
  Calculates the current stock level based on a list of movements.
  
  Logic:
  - IN: Adds to stock
  - OUT: Subtracts from stock
  - ADJUSTMENT: Adds (negative value implies subtraction)
  """
  def calculate_stock(movements) when is_list(movements) do
    Enum.reduce(movements, 0, fn movement, acc ->
      apply_movement(acc, movement)
    end)
  end

  defp apply_movement(current_stock, %InventoryMovement{movement_type: "IN", quantity: qty}) do
    current_stock + qty
  end

  defp apply_movement(current_stock, %InventoryMovement{movement_type: "OUT", quantity: qty}) do
    current_stock - qty
  end

  defp apply_movement(current_stock, %InventoryMovement{movement_type: "ADJUSTMENT", quantity: qty}) do
    current_stock + qty
  end

  # Map-based versions for testing or manual logic
  defp apply_movement(current_stock, %{movement_type: "IN", quantity: qty}), do: current_stock + qty
  defp apply_movement(current_stock, %{movement_type: "OUT", quantity: qty}), do: current_stock - qty
  defp apply_movement(current_stock, %{movement_type: "ADJUSTMENT", quantity: qty}), do: current_stock + qty

  # Handle cases where struct might be different or partial
  defp apply_movement(acc, _), do: acc

  @doc """
  Checks if a proposed movement would result in negative stock.
  Returns :ok or {:error, :insufficient_stock}
  """
  def check_stock_availability(current_stock, movement_type, quantity) do
    projected = case movement_type do
      "IN" -> current_stock + quantity
      "OUT" -> current_stock - quantity
      "ADJUSTMENT" -> current_stock + quantity
      _ -> current_stock
    end

    if projected < 0 do
      {:error, :insufficient_stock}
    else
      :ok
    end
  end
end
