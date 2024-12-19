import { useEffect, useState } from "react";
import { getAllOrder } from "../../../service/orderService";
import { createOrderReport } from "@/service/reportService";

const CreateReportOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    fetchAllOrder();
  }, []);

  useEffect(() => {
    if (orders.length > 0 && selectedOrderId) {
      const selectedOrder = orders.find(
        (order) => order.id === Number(selectedOrderId)
      );
      setTotalRevenue(selectedOrder ? selectedOrder.total_amount : "");
    } else {
      setTotalRevenue(0);
    }
  }, [selectedOrderId, orders]);

  useEffect(() => {
    if (totalRevenue && totalCost) {
      setTotalProfit(totalRevenue - totalCost);
    }
  }, [totalRevenue, totalCost]);

  const fetchAllOrder = async () => {
    try {
      const res = await getAllOrder();
      if (res && res.data && res.data.DT) {
        setOrders(res.data.DT);
      }
    } catch (error) {
      console.error("Error fetching order list:", error);
    }
  };

  const handleOrderChange = (e) => {
    const selectedId = e.target.value;
    setSelectedOrderId(selectedId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOrderId || !totalRevenue || !totalCost || !totalProfit) {
      return;
    }

    const reportData = {
      order_id: selectedOrderId,
      total_revenue: totalRevenue,
      total_cost: totalCost,
      total_profit: totalProfit,
    };

    try {
      const response = await createOrderReport(reportData);
      if (response.data && response.data.EC === 0) {
        alert("Create order report is success");
        // Reset form
        setSelectedOrderId("");
        setTotalRevenue(0);
        setTotalCost(0);
        setTotalProfit(0);
      }
    } catch (error) {
      console.log("Error creating report");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Create Order Report
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Order ID Field */}
        <div className="flex flex-col gap-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="order_id"
          >
            Order ID
          </label>
          <select
            id="order_id"
            value={selectedOrderId}
            onChange={handleOrderChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Order ID</option>
            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.id}
              </option>
            ))}
          </select>
        </div>

        {/* Total Revenue Field */}
        <div className="flex flex-col gap-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="total_revenue"
          >
            Total Revenue
          </label>
          <input
            type="number"
            id="total_revenue"
            value={totalRevenue}
            onChange={(e) => setTotalRevenue(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter total revenue"
            disabled
          />
        </div>

        {/* Total Cost Field */}
        <div className="flex flex-col gap-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="total_cost"
          >
            Total Cost
          </label>
          <input
            type="number"
            id="total_cost"
            value={totalCost}
            onChange={(e) => setTotalCost(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter total cost"
          />
        </div>

        {/* Total Profit Field */}
        <div className="flex flex-col gap-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="total_profit"
          >
            Total Profit
          </label>
          <input
            type="number"
            id="total_profit"
            value={totalProfit}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Total profit"
            disabled
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Order Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReportOrder;
