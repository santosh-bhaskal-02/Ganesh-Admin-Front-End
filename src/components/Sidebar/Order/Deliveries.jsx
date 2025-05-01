import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {
    LocalShipping as LocalShippingIcon,
    Person as PersonIcon,
    ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import DeliverySkeleton from "../../Skeleton/DeliverySkeleton";
import LoadingSpinner from "../../Error/LoadingSpinner";
import NoOrder from "../../Error/NoOrder";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

const Deliveries = () => {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [alert, setAlert] = useState(null);

    const [loading, setLoading] = useState(true);
    const [statusloading, setStatusLoading] = useState(false);
    const [orderStatus, setOrderStatus] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const authToken = Cookies.get("adminAuthToken");
            if (!authToken) {
                console.error("Unauthorized");
                return;
            }

            try {
                const [ResOrders, ResOrderStaus] = await Promise.all([
                    axios.get(`${apiUrl}/api/products/orders/allorders`, {
                        headers: {Authorization: `Bearer ${authToken}`},
                    }),
                    axios.get(`${apiUrl}/api/products/orders/fetch/status`, {
                        headers: {Authorization: `Bearer ${authToken}`},
                    }),
                ]);

                if (!Array.isArray(ResOrders.data)) {
                    setOrders([]);
                    return;
                }

                setOrders(ResOrders.data);
                setOrderStatus(ResOrderStaus.data.orderStatus);
                console.log(orderStatus);
            } catch (error) {
                console.error("Fetch failed:", error);
                setAlert({
                    type: "error",
                    title: "Error",
                    message: "Unable to fetch delivery orders.",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const updateStatus = async (orderId, newStatus) => {
        setStatusLoading(true);
        const token = Cookies.get("adminAuthToken");
        try {
            const response = await axios.put(
                `${apiUrl}/api/products/orders/update/${orderId}`,
                {status: newStatus},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? {...order, status: newStatus} : order
                    )
                );
            }
        } catch (error) {
            console.error("Status update failed:", error);
        } finally {
            setStatusLoading(false);
        }
    };

    const filteredOrders = orders.filter((order) => {
        const matchSearch = order._id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus =
            !filterStatus || order.status.toLowerCase() === filterStatus.toLowerCase();
        return matchSearch && matchStatus;
    });

    /*const statusOptions = [
      "Awaiting for Payment",
      "Payment Successful",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];*/
    const getStatusStyles = (status) => {
        switch (status) {
            case "Delivered":
                return "bg-green-200 text-green-700";
            case "Cancelled":
                return "bg-red-200 text-red-700";
            case "Shipped":
                return "bg-blue-200 text-blue-700";
            case "Out for Delivery":
                return "bg-orange-200 text-orange-700";
            default:
                return "bg-yellow-200 text-yellow-700";
        }
    };

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-white py-10 px-4 md:px-6"
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4}}>
            {statusloading && <LoadingSpinner/>}
            {alert && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-[1000]">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3
                            className={`text-${
                                alert.type === "success" ? "green" : "red"
                            }-500 font-bold`}>
                            {alert.title}
                        </h3>
                        <p>{alert.message}</p>
                        <button
                            onClick={() => setAlert(null)}
                            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                            Close
                        </button>
                    </div>
                </div>
            )}

            <h1 className="text-4xl font-bold text-center text-blue-500 mb-8 ">
                Delivery Management
            </h1>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <input
                    type="text"
                    placeholder="Search by Order ID..."
                    className="w-full md:w-2/3 p-4 border border-blue-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    className="p-4 border border-blue-300 rounded-lg w-full md:w-1/3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="">All</option>

                    {orderStatus.map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                            {statusOption}
                        </option>
                    ))}
                </select>
            </div>
            {loading ? (
                <DeliverySkeleton/>
            ) : filteredOrders.length == 0 ? (
                <NoOrder/>
            ) : (
                <>
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
                            <thead className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-t-lg">
                            <tr>
                                <th className="px-6 py-3 text-left text-lg font-semibold rounded-l-lg">
                                    Order ID
                                </th>
                                <th className="px-6 py-3 text-left text-lg font-semibold">Customer</th>
                                <th className="px-6 py-3 text-left text-lg font-semibold">Address</th>
                                <th className="px-6 py-3 text-left text-lg font-semibold">Status</th>
                                <th className="px-6 py-3 text-left text-lg font-semibold">Update</th>
                                <th className="px-6 py-3 text-left text-lg font-semibold rounded-r-lg">
                                    Action
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredOrders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="hidden md:table-row border-b hover:bg-blue-50">
                                    <td className="px-6 py-4 text-gray-800 rounded-l-lg">{"ODID" + order._id.toUpperCase()}</td>
                                    <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                                        <PersonIcon fontSize="small"/>
                                        {order.shipAddress?.firstName} {order.shipAddress?.lastName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {order.shipAddress?.address1}, {order.shipAddress?.city},<br/>
                                        {order.shipAddress?.state} - {order.shipAddress?.zip}
                                    </td>
                                    <td className="px-6 py-4">
                      <span
                          className={`px-3 py-1 rounded-full text-xs ${getStatusStyles(
                              order.status
                          )}`}>
                        {order.status}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateStatus(order._id, e.target.value)}
                                            className="p-2 rounded-md border border-gray-300 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                                            {orderStatus.map((statusOption) => (
                                                <option key={statusOption} value={statusOption}>
                                                    {statusOption}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 rounded-r-lg">
                                        <Link
                                            to={`/dashboard/users/user/order-details/${order._id}`}
                                            className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 text-sm font-medium shadow">
                                            <ShoppingCartIcon fontSize="small"/>
                                            View Order
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </motion.div>
    );
};

export default Deliveries;
