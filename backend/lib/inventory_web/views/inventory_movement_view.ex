defmodule InventoryWeb.InventoryMovementView do
  use InventoryWeb, :view
  alias InventoryWeb.InventoryMovementView

  def render("show.json", %{movement: movement}) do
    %{data: render_one(movement, InventoryMovementView, "movement.json")}
  end

  def render("movement.json", %{inventory_movement: movement}) do
    %{
      id: movement.id,
      quantity: movement.quantity,
      movement_type: movement.movement_type,
      inserted_at: movement.inserted_at
    }
  end
end
