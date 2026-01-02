defmodule InventoryWeb.PageController do
  use InventoryWeb, :controller

  def index(conn, _params) do
    # This serves the built index.html from priv/static
    conn
    |> put_resp_header("content-type", "text/html")
    |> send_file(200, Path.join(:code.priv_dir(:inventory), "static/index.html"))
  end
end
