import Config

# Do not print debug messages in production
config :logger, level: :info

# For production, don't forget to configure the url host
# to something meaningful, Phoenix uses this information
# when generating URLs.

# Configures the endpoint
config :inventory, InventoryWeb.Endpoint,
  url: [host: "example.com", port: 80],
  cache_static_manifest: "priv/static/cache_manifest.json"

# Runtime configuration that pulls values from training/environment variables
# is usually placed in config/runtime.exs.
