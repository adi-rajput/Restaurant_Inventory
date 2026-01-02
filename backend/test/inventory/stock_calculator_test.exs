defmodule Inventory.StockCalculatorTest do
  use ExUnit.Case, async: true
  alias Inventory.StockCalculator

  describe "calculate_stock/1" do
    test "calculates correct stock with various movements" do
      movements = [
        %{movement_type: "IN", quantity: 100},
        %{movement_type: "OUT", quantity: 30},
        %{movement_type: "ADJUSTMENT", quantity: -5},
        %{movement_type: "IN", quantity: 10}
      ]

      # 100 - 30 - 5 + 10 = 75
      assert StockCalculator.calculate_stock(movements) == 75
    end

    test "returns 0 for empty list" do
      assert StockCalculator.calculate_stock([]) == 0
    end
  end

  describe "check_stock_availability/3" do
    test "allows movement when stock is sufficient" do
      assert StockCalculator.check_stock_availability(10, "OUT", 5) == :ok
    end

    test "allows IN movement regardless of stock" do
      assert StockCalculator.check_stock_availability(0, "IN", 100) == :ok
    end

    test "rejects movement when stock would become negative" do
      # 5 - 10 = -5 -> Error
      assert StockCalculator.check_stock_availability(5, "OUT", 10) == {:error, :insufficient_stock}
    end

    test "rejects negative adjustment exceeding stock" do
      assert StockCalculator.check_stock_availability(5, "ADJUSTMENT", -10) == {:error, :insufficient_stock}
    end
  end
end
