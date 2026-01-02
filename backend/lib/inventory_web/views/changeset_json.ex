defmodule InventoryWeb.ChangesetJSON do
  @moduledoc """
  Translates changeset errors to JSON.
  """

  @doc """
  Traverses and translates changeset errors.
  """
  def render("error.json", %{changeset: changeset}) do
    errors = Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
      Regex.replace(~r"%{(\w+)}", msg, fn _, key ->
        opts |> Keyword.get(String.to_existing_atom(key), key) |> to_string()
      end)
    end)

    %{errors: errors}
  end
end
