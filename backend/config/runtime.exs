import Config

# General config for all environments when env vars are present
database_url = System.get_env("DATABASE_URL")
if database_url do
  config :inventory, Inventory.Repo,
    url: database_url,
    pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10")
end

if config_env() == :prod do
  database_url = database_url || raise "environment variable DATABASE_URL is missing."
  
  config :inventory, Inventory.Repo,
    url: database_url,
    ssl: true,
    socket_options: if(System.get_env("ECTO_IPV6") in ~w(true 1), do: [:inet6], else: [])

  secret_key_base =
    System.get_env("SECRET_KEY_BASE") ||
      raise """
      environment variable SECRET_KEY_BASE is missing.
      You can generate one by calling: mix phx.gen.secret
      """

  host = System.get_env("PHX_HOST") || "example.com"
  port = String.to_integer(System.get_env("PORT") || "4000")

  config :inventory, InventoryWeb.Endpoint,
    server: true,
    url: [host: host, port: 443, scheme: "https"],
    http: [
      ip: {0, 0, 0, 0, 0, 0, 0, 0},
      port: port
    ],
    secret_key_base: secret_key_base

  # Set the frontend URL for CORS
  config :inventory, :frontend_url, System.get_env("FRONTEND_URL") || "http://localhost:5173"
end
