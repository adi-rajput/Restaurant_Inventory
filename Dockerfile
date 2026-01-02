# --- Stage 1: Build the Frontend ---
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# --- Stage 2: Build the Backend Release ---
FROM elixir:1.14-alpine AS backend-builder
RUN apk add --no-cache build-base git

WORKDIR /app/backend
# Install hex + rebar
RUN mix local.hex --force && \
    mix local.rebar --force

# Set environment to production for building
ENV MIX_ENV=prod

# Install dependencies
COPY backend/mix.exs backend/mix.lock ./
RUN mix deps.get --only prod
RUN mix deps.compile

# Copy code and config
COPY backend/lib ./lib
COPY backend/priv ./priv
COPY backend/config ./config

# Copy the built frontend from Stage 1 to backend's priv/static
RUN mkdir -p priv/static
COPY --from=frontend-builder /app/frontend/dist/ ./priv/static/

# Digest static assets
RUN mix phx.digest

# Build the release
RUN mix release

# --- Stage 3: Final Production Image ---
FROM alpine:3.18
RUN apk add --no-cache libstdc++ openssl ncurses-libs

WORKDIR /app
COPY --from=backend-builder /app/backend/_build/prod/rel/inventory ./

# Set the environment
ENV MIX_ENV=prod
ENV PORT=4000

# Copy entrypoint script
COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

# Start command
CMD ["./entrypoint.sh"]
