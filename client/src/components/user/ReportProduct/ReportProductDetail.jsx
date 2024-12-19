import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  getAllReportProduct,
  getProductReportById,
} from "@/service/reportService"; // API

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReportProductDetail = () => {
  const [productReports, setProductReports] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [reportData, setReportData] = useState({
    total_sold: 0,
    revenue: 0,
    cost: 0,
    profit: 0,
  });

  useEffect(() => {
    const fetchAllProductReports = async () => {
      try {
        const response = await getAllReportProduct();
        const reports = response.data?.DT || [];
        setProductReports(reports);
      } catch (error) {
        console.error("Error fetching all product reports:", error);
      }
    };

    fetchAllProductReports();
  }, []);

  useEffect(() => {
    const fetchProductReport = async () => {
      if (selectedProductId) {
        try {
          const response = await getProductReportById(selectedProductId);
          console.log("response", response);
          const report = response.data?.DT || {};
          setReportData({
            total_sold: parseFloat(report.total_sold) || 0,
            revenue: parseFloat(report.revenue) || 0,
            cost: parseFloat(report.cost) || 0,
            profit: parseFloat(report.profit) || 0,
          });
        } catch (error) {
          console.error("Error fetching product report by ID:", error);
        }
      }
    };

    fetchProductReport();
  }, [selectedProductId]);

  const handleProductChange = (event) => {
    setSelectedProductId(parseInt(event.target.value, 10));
  };

  const data = {
    labels: ["Total Sold", "Revenue", "Total Cost", "Profit"], // Show all categories
    datasets: [
      {
        label: "Total Sold",
        data: [reportData.total_sold, null, null, null], // Value only in the first category
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
        borderWidth: 1,
      },
      {
        label: "Revenue",
        data: [null, reportData.revenue, null, null], // Value only in the second category
        backgroundColor: "#D1001F",
        borderColor: "#B71C1C",
        borderWidth: 1,
      },
      {
        label: "Total Cost",
        data: [null, null, reportData.cost, null], // Value only in the third category
        backgroundColor: "#FFC107",
        borderColor: "#FFA000",
        borderWidth: 1,
      },
      {
        label: "Profit",
        data: [null, null, null, reportData.profit], // Value only in the fourth category
        backgroundColor: "#2196F3",
        borderColor: "#1976D2",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Product Report",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}`, // Format y-axis values as currency
        },
      },
      x: {
        stacked: true,
      },
    },
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-700">
        Product Detail Report
      </h2>

      <div className="flex justify-center mb-6">
        <select
          value={selectedProductId || ""}
          onChange={handleProductChange}
          className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select an product report</option>
          {productReports.map((report) => (
            <option key={report.id} value={report.id}>
              {report.product.name} (ID: {report.id})
            </option>
          ))}
        </select>
      </div>

      {selectedProductId ? (
        <div className="mt-8">
          <div className="max-w-4xl mx-auto p-6 bg-gray-50 border rounded-lg shadow-md">
            <Bar data={data} options={options} />
          </div>
        </div>
      ) : (
        <div className="mt-8 text-center text-gray-600">
          Please select a product to view the report.
        </div>
      )}
    </div>
  );
};

export default ReportProductDetail;
