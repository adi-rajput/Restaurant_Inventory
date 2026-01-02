defmodule InventoryWeb.ItemView do
  use InventoryWeb, :view
  alias InventoryWeb.ItemView

  def render("index.json", %{items: items}) do
    %{data: render_many(items, ItemView, "item.json")}
  end

  def render("show.json", %{item: item}) do
    %{data: render_one(item, ItemView, "item.json")}
  end

  def render("item.json", %{item: item}) do
    %{
      id: item.id,
      name: item.name,
      sku: item.sku,
      unit: item.unit,
      stock: Map.get(item, :stock) # might be nil if not loaded with calculation
    }
  end

  def render("movements.json", %{movements: movements}) do
    %{data: render_many(movements, InventoryWeb.InventoryMovementView, "movement.json")}
  end

  def render("error.json", %{changeset: changeset}) do
    InventoryWeb.ChangesetJSON.render("error.json", %{changeset: changeset})
  end
end
