import Config

config :inventory,
  ecto_repos: [Inventory.Repo],
  generators: [timestamp_type: :utc_datetime, binary_id: true]

# Configures the endpoint
config :inventory, InventoryWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Phoenix.Endpoint.Cowboy2Adapter,
  render_errors: [
    formats: [json: InventoryWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: Inventory.PubSub,
  live_view: [signing_salt: "SECRET_SALT_CHANGE_ME"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

import_config "#{config_env()}.exs"
