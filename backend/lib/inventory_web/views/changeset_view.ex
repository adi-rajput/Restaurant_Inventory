defmodule InventoryWeb.ChangesetView do
  use InventoryWeb, :view

  @doc """
  Traverses and translates changeset errors.

  See `Ecto.Changeset.traverse_errors/2` and
  `InventoryWeb.ErrorHelpers.translate_error/1` for more details.
  """
  def render("error.json", %{changeset: changeset}) do
    # Simple traversal if ErrorHelpers not fully implemented
    errors = Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
      Regex.replace(~r"%{(\w+)}", msg, fn _, key ->
        opts |> Keyword.get(String.to_existing_atom(key), key) |> to_string()
      end)
    end)

    %{errors: errors}
  end
end
