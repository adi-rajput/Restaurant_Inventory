defmodule Inventory.InventoryMovement do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "inventory_movements" do
    field :quantity, :integer
    field :movement_type, :string # IN, OUT, ADJUSTMENT
    belongs_to :item, Inventory.Item

    timestamps()
  end

  @doc false
  def changeset(movement, attrs) do
    movement
    |> cast(attrs, [:quantity, :movement_type, :item_id])
    |> validate_required([:quantity, :movement_type, :item_id])
    |> validate_inclusion(:movement_type, ["IN", "OUT", "ADJUSTMENT"])
    |> validate_quantity_logic()
  end

  defp validate_quantity_logic(changeset) do
    type = get_field(changeset, :movement_type)
    qty = get_field(changeset, :quantity)

    cond do
      type in ["IN", "OUT"] and qty != nil and qty <= 0 ->
        add_error(changeset, :quantity, "must be positive for IN/OUT operations")
      qty == 0 ->
        add_error(changeset, :quantity, "cannot be zero")
      true ->
        changeset
    end
  end
end
