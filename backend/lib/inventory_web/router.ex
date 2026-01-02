defmodule InventoryWeb.Router do
  use InventoryWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", InventoryWeb do
    pipe_through :api

    resources "/items", ItemController, only: [:index, :create]
    get "/items/:id/movements", ItemController, :show_movements
    
    resources "/movements", InventoryMovementController, only: [:create]
  end

  # Frontend landing and SPA catch-all
  scope "/", InventoryWeb do
    get "/*path", PageController, :index
  end
end
