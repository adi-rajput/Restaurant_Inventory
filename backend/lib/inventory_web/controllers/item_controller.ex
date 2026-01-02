defmodule InventoryWeb.ItemController do
  use InventoryWeb, :controller

  alias Inventory

  action_fallback InventoryWeb.FallbackController

  def index(conn, _params) do
    items = Inventory.list_items_with_stock()
    render(conn, "index.json", items: items)
  end

  def create(conn, %{"item" => item_params}) do
    with {:ok, %Inventory.Item{} = item} <- Inventory.create_item(item_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/items/#{item}")
      |> render("show.json", item: item)
    end
  end

  def show_movements(conn, %{"id" => id}) do
    movements = Inventory.list_movements(id)
    render(conn, "movements.json", movements: movements)
  end
end
