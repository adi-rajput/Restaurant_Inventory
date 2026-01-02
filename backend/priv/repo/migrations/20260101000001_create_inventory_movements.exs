defmodule Inventory.Repo.Migrations.CreateInventoryMovements do
  use Ecto.Migration

  def change do
    create table(:inventory_movements, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :item_id, references(:items, on_delete: :delete_all, type: :binary_id), null: false
      add :quantity, :integer, null: false
      add :movement_type, :string, null: false

      timestamps()
    end

    create index(:inventory_movements, [:item_id])
  end
end
