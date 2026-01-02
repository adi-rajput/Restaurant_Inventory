defmodule InventoryWeb.InventoryMovementController do
  use InventoryWeb, :controller

  alias Inventory
  alias Inventory.InventoryMovement

  action_fallback InventoryWeb.FallbackController

  def create(conn, %{"movement" => movement_params}) do
    case Inventory.create_movement(movement_params) do
      {:ok, %InventoryMovement{} = movement} ->
        conn
        |> put_status(:created)
        # |> put_resp_header("location", ~p"/api/movements/#{movement}")
        |> render("show.json", movement: movement)
      
      {:error, :insufficient_stock} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: %{detail: "Insufficient stock for this OUT movement"}})

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(InventoryWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
