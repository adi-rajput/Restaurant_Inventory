import Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test isolation per socket.
config :inventory, Inventory.Repo,
  username: "postgres",
  password: "password",
  hostname: "localhost",
  database: "inventory_test#{System.get_env("MIX_TEST_PARTITION")}",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: 10

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :inventory, InventoryWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "Vp1ZpL/z9N6U8z7Bv7u9z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7",
  server: false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
