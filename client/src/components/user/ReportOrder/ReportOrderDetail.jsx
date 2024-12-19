import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getAllOrderReport, getOrderReportById } from "@/service/reportService"; // API

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

const ReportOrderDetail = () => {
  const [orderReports, setOrderReports] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [reportData, setReportData] = useState({
    totalRevenue: 0,
    totalCost: 0,
    totalProfit: 0,
  });

  useEffect(() => {
    const fetchAllOrderReports = async () => {
      try {
        const response = await getAllOrderReport();
        const reports = response.data?.DT || [];
        setOrderReports(reports);
      } catch (error) {
        console.error("Error fetching all order reports:", error);
      }
    };

    fetchAllOrderReports();
  }, []);

  useEffect(() => {
    const fetchOrderReport = async () => {
      if (selectedOrderId) {
        try {
          const response = await getOrderReportById(selectedOrderId);
          console.log("response", response);
          const report = response.data?.DT || {};
          setReportData({
            totalRevenue: parseFloat(report.total_revenue) || 0,
            totalCost: parseFloat(report.total_cost) || 0,
            totalProfit: parseFloat(report.total_profit) || 0,
          });
        } catch (error) {
          console.error("Error fetching order report by ID:", error);
        }
      }
    };

    fetchOrderReport();
  }, [selectedOrderId]);

  const handleOrderChange = (event) => {
    setSelectedOrderId(parseInt(event.target.value, 10));
  };

  const data = {
    labels: ["Revenue", "Cost", "Profit"], // English labels
    datasets: [
      {
        label: "Revenue",
        data: [reportData.totalRevenue, null, null], // Value only in the first category
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
        borderWidth: 1,
      },
      {
        label: "Cost",
        data: [null, reportData.totalCost, null], // Value only in the second category
        backgroundColor: "#FFC107",
        borderColor: "#FFA000",
        borderWidth: 1,
      },
      {
        label: "Profit",
        data: [null, null, reportData.totalProfit], // Value only in the third category
        backgroundColor: "#2196F3",
        borderColor: "#1976D2",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: `Order Report ${selectedOrderId}`, // Dynamic title in English
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}`, // Format y-axis values as needed
        },
      },
      x: {
        stacked: true, // Optional: Stack bars if needed
      },
    },
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-700">
        Detailed Order Report
      </h2>

      <div className="flex justify-center mb-6">
        <select
          value={selectedOrderId || ""}
          onChange={handleOrderChange}
          className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select an order report</option>
          {orderReports.map((report) => (
            <option key={report.id} value={report.id}>
              Order ID: {report.id}
            </option>
          ))}
        </select>
      </div>

      {selectedOrderId ? (
        <div className="mt-8">
          <div className="max-w-4xl mx-auto p-6 bg-gray-50 border rounded-lg shadow-md">
            <Bar data={data} options={options} />
          </div>
        </div>
      ) : (
        <div className="mt-8 text-center text-gray-600">
          Please select a order to view the report.
        </div>
      )}
    </div>
  );
};

export default ReportOrderDetail;
