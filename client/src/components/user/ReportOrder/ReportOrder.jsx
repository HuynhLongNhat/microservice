import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getAllOrderReport } from "@/service/reportService"; // API

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

const ReportOrder = () => {
  const [reportData, setReportData] = useState({
    totalRevenue: 0,
    totalCost: 0,
    totalProfit: 0,
  });

  useEffect(() => {
    fetchAllOrderReports();
  }, []);

  const fetchAllOrderReports = async () => {
    try {
      const response = await getAllOrderReport();
      const reports = response.data?.DT || [];
      if (reports.length > 0) {
        setReportData({
          totalRevenue: reports.reduce(
            (sum, report) => sum + parseFloat(report.total_revenue),
            0
          ),
          totalCost: reports.reduce(
            (sum, report) => sum + parseFloat(report.total_cost),
            0
          ),
          totalProfit: reports.reduce(
            (sum, report) => sum + parseFloat(report.total_profit),
            0
          ),
        });
      }
    } catch (error) {
      console.error("Error fetching all order reports:", error);
    }
  };

  const data = {
    labels: ["Revenue", "Cost", "Profit"],
    datasets: [
      {
        label: "Revenue",
        data: [reportData.totalRevenue, null, null],
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
        borderWidth: 1,
      },
      {
        label: "Cost",
        data: [null, reportData.totalCost, null],
        backgroundColor: "#FFC107",
        borderColor: "#FFA000",
        borderWidth: 1,
      },
      {
        label: "Profit",
        data: [null, null, reportData.totalProfit],
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
        text: "Order Reports",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}`,
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
        Order Reports
      </h2>

      <div className="mt-8">
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 border rounded-lg shadow-md">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ReportOrder;
