import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getAllReportProduct } from "@/service/reportService";

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

const ReportProduct = () => {
  const [productReports, setProductReports] = useState([]); // State to hold product report data

  useEffect(() => {
    fetchAllProductReports();
  }, []);

  // Fetch product report data
  const fetchAllProductReports = async () => {
    try {
      const response = await getAllReportProduct();
      const reports = response.data?.DT || [];
      setProductReports(reports);
    } catch (error) {
      console.error("Error fetching product reports:", error);
    }
  };

  // Calculate total values for all products
  const totalValues = productReports.reduce(
    (acc, report) => {
      acc.totalSold += parseFloat(report.total_sold) || 0;
      acc.totalRevenue += parseFloat(report.revenue) || 0;
      acc.totalCost += parseFloat(report.cost) || 0;
      acc.totalProfit += parseFloat(report.profit) || 0;
      return acc;
    },
    {
      totalSold: 0,
      totalRevenue: 0,
      totalCost: 0,
      totalProfit: 0,
    }
  );

  const data = {
    labels: ["Total sold", "Revenue", "Cost", "Profit"],
    datasets: [
      {
        label: "Total sold",
        data: [totalValues.totalSold, null, null, null],
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
        borderWidth: 1,
      },
      {
        label: "Revenue",
        data: [null, totalValues.totalRevenue, null, null],
        backgroundColor: "#D1001F",
        borderColor: "#B71C1C",
        borderWidth: 1,
      },
      {
        label: "Cost",
        data: [null, null, totalValues.totalCost, null],
        backgroundColor: "#FFC107",
        borderColor: "#FFA000",
        borderWidth: 1,
      },
      {
        label: "Profit",
        data: [null, null, null, totalValues.totalProfit],
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
        text: "Product Reports",
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
        Product Reports
      </h2>

      <div className="mt-8">
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 border rounded-lg shadow-md">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ReportProduct;
