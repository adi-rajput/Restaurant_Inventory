defmodule InventoryWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :inventory

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  @session_options [
    store: :cookie,
    key: "_inventory_key",
    signing_salt: "CHANGE_ME"
  ]

  # Serve at "/" the static files from "priv/static" directory.
  # These are the files we want to serve as static assets.
  @static_paths ~w(assets fonts images favicon.ico robots.txt index.html)

  plug Plug.Static,
    at: "/",
    from: :inventory,
    gzip: false,
    only: @static_paths

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    plug Phoenix.CodeReloader
    plug Phoenix.Ecto.CheckRepoStatus, otp_app: :inventory
  end

  plug Plug.RequestId
  plug Plug.Telemetry, event_prefix: [:phoenix, :endpoint]

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()

  plug Plug.MethodOverride
  plug Plug.Head
  plug Plug.Session, @session_options
  
  # Add CORS - allows configuration via FRONTEND_URL env var
  # Add CORS - allows configuration via FRONTEND_URL env var
  plug CORSPlug, origin: Application.get_env(:inventory, :frontend_url, "http://localhost:5173")

  plug InventoryWeb.Router
end
