defmodule InventoryWeb do
  @moduledoc """
  The entrypoint for defining your web interface, such
  as controllers, components, channels, and so on.
  """

  def static_paths, do: ~w(assets fonts images favicon.ico robots.txt index.html)

  def controller do
    quote do
      use Phoenix.Controller, namespace: InventoryWeb

      import Plug.Conn
      use Gettext, backend: InventoryWeb.Gettext
      alias InventoryWeb.Router.Helpers, as: Routes
      use Phoenix.VerifiedRoutes, endpoint: InventoryWeb.Endpoint, router: InventoryWeb.Router, statics: ~w(assets fonts images favicon.ico robots.txt)
    end
  end

  def view do
    quote do
      use Phoenix.View, root: "lib/inventory_web/templates", namespace: InventoryWeb

      # Import convenience functions from controllers
      import Phoenix.Controller,
        only: [get_flash: 1, get_flash: 2, view_module: 1, view_template: 1]

      # Include shared imports and aliases for views
      unquote(view_helpers())
    end
  end

  def router do
    quote do
      use Phoenix.Router, helpers: false

      # Import common connection and controller functions to use in pipelines
      import Plug.Conn
      import Phoenix.Controller
    end
  end

  def channel do
    quote do
      use Phoenix.Channel
    end
  end

  def verified_routes do
    quote do
      use Phoenix.VerifiedRoutes,
        endpoint: InventoryWeb.Endpoint,
        router: InventoryWeb.Router,
        statics: InventoryWeb.static_paths()
    end
  end

  defp view_helpers do
    quote do
      # Import basic rendering functionality (render, render_layout, etc)
      import Phoenix.View
      use Gettext, backend: InventoryWeb.Gettext

      alias InventoryWeb.Router.Helpers, as: Routes
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  def macro(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end

  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
