defmodule Inventory.Item do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "items" do
    field :name, :string
    field :sku, :string
    field :unit, :string # pcs, kg, litre

    has_many :inventory_movements, Inventory.InventoryMovement

    timestamps()
  end

  @doc false
  def changeset(item, attrs) do
    item
    |> cast(attrs, [:name, :sku, :unit])
    |> validate_required([:name, :sku, :unit])
    |> validate_inclusion(:unit, ["pcs", "kg", "litre"])
    |> unique_constraint(:sku)
  end
end
