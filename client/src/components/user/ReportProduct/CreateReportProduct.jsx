import { useEffect, useState } from "react";
import { createReportProduct } from "@/service/reportService";
import { getAllOrderReport } from "@/service/reportService";
import { getAllProduct } from "@/service/productService";
import { getAllOtherItem } from "@/service/orderService";

const CreateReportProduct = () => {
  const [orderReports, setOrderReports] = useState([]);
  const [products, setProducts] = useState([]);
  const [otherItems, setOtherItems] = useState([]);
  const [selectedOrderReportId, setSelectedOrderReportId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    fetchAllOrderReports();
    fetchAllOtherItem();
    fetchAllProduct();
  }, []);

  useEffect(() => {
    if (totalRevenue && totalCost) {
      setTotalProfit(totalRevenue - totalCost);
    }
  }, [totalRevenue, totalCost]);

  const fetchAllOtherItem = async () => {
    try {
      const res = await getAllOtherItem();
      if (res && res.data && res.data.DT) {
        setOtherItems(res.data.DT);
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  const fetchAllOrderReports = async () => {
    try {
      const res = await getAllOrderReport();
      if (res && res.data && res.data.DT) {
        setOrderReports(res.data.DT);
      }
    } catch (error) {
      console.error("Error fetching order reports list:", error);
    }
  };

  const fetchAllProduct = async () => {
    let res = await getAllProduct();
    if (res && res.data && res.data.DT) {
      setProducts(res.data.DT);
    }
  };

  const handleProductChange = (e) => {
    const productId = e.target.value;
    setSelectedProductId(productId);
    const totalQuantity = otherItems
      .filter((item) => item.product_id == productId)
      .reduce((sum, item) => sum + parseInt(item.quantity || 0), 0);
    setQuantity(totalQuantity);
    const totalRevenue = otherItems
      .filter((item) => item.product_id == productId)
      .reduce(
        (sum, item) =>
          sum + parseInt(item.quantity || 0) * parseFloat(item.unit_price || 0),
        0
      );
    setTotalRevenue(totalRevenue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedOrderReportId ||
      !selectedProductId ||
      !quantity ||
      !totalRevenue ||
      !totalCost ||
      !totalProfit
    ) {
      alert("Please fill out all fields!");
      return;
    }

    const reportData = {
      order_report_id: selectedOrderReportId,
      product_id: selectedProductId,
      total_sold: quantity,
      revenue: totalRevenue,
      cost: totalCost,
      profit: totalProfit,
    };

    try {
      const response = await createReportProduct(reportData);
      if (response.data && response.data.EC === 0) {
        alert("Create product report success");
        setQuantity(0);
        setTotalRevenue(0);
        setTotalCost(0);
        setTotalProfit(0);
        setSelectedProductId("");
        setSelectedOrderReportId("");
      }
    } catch (error) {
      console.log("Error creating product report");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Create Product Report
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="order_report_id"
            >
              Order Report ID
            </label>
            <select
              id="order_report_id"
              value={selectedOrderReportId}
              onChange={(e) => setSelectedOrderReportId(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Order Report ID</option>
              {orderReports.map((report) => (
                <option key={report.id} value={report.id}>
                  {report.id}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="product_id"
            >
              Product ID
            </label>
            <select
              id="product_id"
              value={selectedProductId}
              onChange={handleProductChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Product ID</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.id} - {product.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="quantity"
            >
              Quantity Sold
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              disabled
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
              placeholder="Total quantity sold"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="total_revenue"
            >
              Total Revenue
            </label>
            <input
              type="number"
              id="total_revenue"
              value={totalRevenue}
              disabled
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
              placeholder="Total revenue"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="total_cost"
            >
              Total Cost
            </label>
            <input
              type="number"
              id="total_cost"
              value={totalCost}
              onChange={(e) => setTotalCost(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter total cost"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="total_profit"
            >
              Total Profit
            </label>
            <input
              type="number"
              id="total_profit"
              value={totalProfit}
              disabled
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
              placeholder="Total profit"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Product Report
        </button>
      </form>
    </div>
  );
};

export default CreateReportProduct;
