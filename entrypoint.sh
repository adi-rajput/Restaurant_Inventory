#!/bin/sh

# Run migrations
/app/bin/inventory eval "Inventory.Release.migrate"

# Seed data (Optional, you can remove this after first run if you want)
# /app/bin/inventory eval "Inventory.Release.seed"

# Start the application
exec /app/bin/inventory start
