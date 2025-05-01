import React, {useEffect, useState} from "react";
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
} from "chart.js";
import {Pie, Line} from "react-chartjs-2";
import axios from "axios";
import Cookies from "js-cookie";
import ErrorPage from "../../Error/ErrorPage";
import {
    FaUsers,
    FaBoxOpen,
    FaShoppingBag,
    FaShoppingCart,
    FaCoins,
    FaBoxes,
} from "react-icons/fa";

import DashboardCardSkelton from "../../Skeleton/DashboardCardSkeleton";
import DashboardChartSkelton from "../../Skeleton/DashBoardChartSkeleton";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement
);

const Dashboard = () => {
    const [idolCount, setIdolCount] = useState(null);
    const [usersCount, setUsersCount] = useState(null);
    const [totalSales, setTotalSales] = useState(null);
    const [totalOrders, setTotalOrders] = useState(null);
    const [inventoryCount, setInventoryCount] = useState(null);
    const [totalOrderItems, setTotalOrderItems] = useState(null);
    const [loading, setLoading] = useState(true);

    const authToken = Cookies.get("adminAuthToken");

    if (!authToken) return <ErrorPage/>;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(`${apiUrl}/api/dashboard/fetch`, {
                    headers: {Authorization: `Bearer ${authToken}`},
                });

                setIdolCount(data.productsCount.productsCount);
                setUsersCount(data.usersCount.count);
                setTotalSales(data.totalSales);
                setTotalOrders(data.totalOrders);
                setInventoryCount(data.inventoryCount);
                setTotalOrderItems(data.totalOrderItems);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
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
                backgroundColor: ["#fbbf24", "#fde68a"],
            },
        ],
    };

    const lineData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
            {
                label: "Sales",
                data: [12, 19, 10, 14, 22],
                backgroundColor: "rgba(255, 215, 0, 0.5)",
                borderColor: "#FFD700",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="p-6 bg-gradient-to-br from-yellow-50 via-white to-blue-100 min-h-screen">
            <h1 className="text-4xl font-bold text-yellow-800 mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {loading ? (
                    Array.from({length: 6}).map((_, i) => <DashboardCardSkelton key={i}/>)
                ) : (
                    <>
                        <StatCard
                            icon={<FaBoxes/>}
                            title="Total Inventory"
                            value={inventoryCount}
                            color={{bg: "bg-yellow-400", text: "text-yellow-900"}}
                        />
                        <StatCard
                            icon={<FaBoxOpen/>}
                            title="Total Idols"
                            value={idolCount}
                            color={{bg: "bg-blue-500", text: "text-white"}}
                        />
                        <StatCard
                            icon={<FaUsers/>}
                            title="Active Users"
                            value={usersCount}
                            color={{bg: "bg-yellow-400", text: "text-yellow-900"}}
                        />
                        <StatCard
                            icon={<FaShoppingCart/>}
                            title="Total Orders"
                            value={totalOrders}
                            color={{bg: "bg-blue-500", text: "text-white"}}
                        />
                        <StatCard
                            icon={<FaShoppingBag/>}
                            title="Order Items"
                            value={totalOrderItems}
                            color={{bg: "bg-yellow-400", text: "text-yellow-900"}}
                        />
                        <StatCard
                            icon={<FaCoins/>}
                            title="Total Sales"
                            value={`₹ ${totalSales}`}
                            color={{bg: "bg-blue-500", text: "text-white"}}
                        />
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                {loading ? (
                    <>
                        <DashboardChartSkelton/>
                        <DashboardChartSkelton/>
                    </>
                ) : (
                    <>
                        <ChartCard title="Inventory Status" ChartComponent={<Pie data={pieData}/>}/>
                        <ChartCard title="Sales Trend" ChartComponent={<Line data={lineData}/>}/>
                    </>
                )}
            </div>
        </div>
    );
};

const StatCard = ({title, value, icon, color}) => (
    <div
        className={`${color.bg} ${color.text} p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-start gap-2`}>
        <div className="text-3xl">{icon}</div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

const ChartCard = ({title, ChartComponent}) => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-yellow-700">{title}</h3>
        {ChartComponent}
    </div>
);

export default Dashboard;
