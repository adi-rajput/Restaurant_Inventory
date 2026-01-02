defmodule Inventory.Application do
  # See https://hexdocs.pm/elixir/Application.html
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      Inventory.Repo,
      {Phoenix.PubSub, name: Inventory.PubSub},
      InventoryWeb.Endpoint
    ]

    opts = [strategy: :one_for_one, name: Inventory.Supervisor]
    Supervisor.start_link(children, opts)
  end

  @impl true
  def config_change(changed, _new, removed) do
    InventoryWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
