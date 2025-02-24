import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  DoughnutController,
} from "chart.js";
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";
import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  DoughnutController
);

const HomeDashboard = () => {
  const [idolCount, setIdolCount] = useState(null);
  const [usersCount, setUsersCount] = useState(null);
  const [totalSales, setTotalSales] = useState(null);
  const [totalOrders, setTotalOrders] = useState(null);
  const [inventoryCount, setInventoryCount] = useState(null);
  const [totalOrderItems, setTotalOrderItems] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const authToken = Cookies.get("adminAuthToken");
      if (!authToken) {
        console.error("No auth token found.");
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/api/dashboard/fetch`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        console.log(response.data);
        setIdolCount(response.data.productsCount);
        setUsersCount(response.data.usersCount);
        setTotalSales(response.data.totalSales);
        setTotalOrders(response.data.totalOrders);
        setInventoryCount(response.data.inventoryCount);
        setTotalOrderItems(response.data.totalOrderItems);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const pieData = {
    labels: ["Sold", "Available"],
    datasets: [
      {
        data: [totalOrderItems, inventoryCount],
        backgroundColor: ["#f87171", "#60a5fa"],
      },
    ],
  };

  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Sales",
        data: 0,
        backgroundColor: "#4ade80",
      },
    ],
  };

  const doughnutData = {
    labels: ["Gold", "Silver", "Clay"],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ["#FFD700", "#C0C0C0", "#D2691E"],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800"> Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        <StatCard title="Total Inventory" value={inventoryCount} color="bg-orange-500" />
        <StatCard title="Total Idols" value={idolCount} color="bg-orange-500" />
        <StatCard title="Active Users" value={usersCount} color="bg-blue-500" />
        <StatCard title="Total Orders" value={totalOrders} color="bg-blue-500" />
        <StatCard
          title="Total Orders Items"
          value={totalOrderItems}
          color="bg-blue-500"
        />
        <StatCard title="Total Sales" value={`₹ ${totalSales}`} color="bg-green-500" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ChartCard title="Idol Sales Overview" ChartComponent={<Pie data={pieData} />} />
        <ChartCard title="Sales Revenue" ChartComponent={<Line data={barData} />} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ChartCard
          title="Material Usage"
          ChartComponent={<Doughnut data={doughnutData} />}
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`${color} text-white p-6 rounded-lg shadow-lg`}>
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const ChartCard = ({ title, ChartComponent }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    {ChartComponent}
  </div>
);

export default HomeDashboard;
