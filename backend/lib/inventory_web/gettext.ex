defmodule InventoryWeb.Gettext do
  @moduledoc """
  A module providing Internationalization with a gettext-based API.

  By using [Gettext](https://hexdocs.pm/gettext),
  your module is already ready and equipped with some
  compile-time guarantees that all message IDs and
  interpolations are present in your translation files.

  See usage example in the `InventoryWeb` module.
  """
  use Gettext, otp_app: :inventory
end
