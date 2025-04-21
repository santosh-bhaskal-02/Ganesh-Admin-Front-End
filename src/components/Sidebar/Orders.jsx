import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  LocalShipping as LocalShippingIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

import OrderSkeleton from "../Skeleton/OrderSkeleton";
import NoOrder from "../Error/NoOrder";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [alert, setAlert] = useState(null);
  const [orderStatus, setOrderStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      const authToken = Cookies.get("adminAuthToken");
      if (!authToken) {
        console.error("No auth token found.");
        return;
      }

      try {
        const [ResOrders, ResOrderStatus] = await Promise.all([
          axios.get(`${apiUrl}/api/products/orders/allorders`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          axios.get(`${apiUrl}/api/products/orders/fetch/status`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
        ]);

        if (!Array.isArray(ResOrders.data)) {
          console.error("Unexpected API response:", response.data);
          setOrders([]);
          return;
        }

        setOrders(ResOrders.data);
        setOrderStatus(ResOrderStatus.data.orderStatus);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setAlert({
          type: "error",
          title: "Oops!",
          message: "Failed to fetch orders. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  console.log(orderStatus);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order._id.includes(searchQuery);
    const matchesStatus =
      !filterStatus || order.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-white py-10 px-4 md:px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      {alert && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-[1000]">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3
              className={`text-${
                alert.type === "success" ? "green" : "red"
              }-500 font-bold`}>
              {alert.title}
            </h3>
            <p>{alert.message}</p>
            <button
              onClick={() => setAlert(null)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}

      <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
        Order Management
      </h1>
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <input
          type="text"
          placeholder="Search by Order ID..."
          className="w-full md:w-2/3 p-4 border border-indigo-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="p-4 border border-indigo-300 rounded-lg w-full md:w-1/3 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All</option>
          {orderStatus.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <OrderSkeleton />
      ) : filteredOrders.length === 0 ? (
        <NoOrder />
      ) : (
        <>
          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
              <thead className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-white rounded-t-lg">
                <tr>
                  <th className="px-6 py-3 text-left text-lg font-semibold rounded-l-lg">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-lg font-semibold">Customer</th>
                  <th className="px-6 py-3 text-left text-lg font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-lg font-semibold">
                    Total Price
                  </th>
                  <th className="px-6 py-3 text-left text-lg font-semibold rounded-r-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-yellow-50">
                    <td className="px-6 py-4 text-gray-800 rounded-l-lg">{order._id}</td>
                    <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                      <PersonIcon fontSize="small" /> {order.user.firstName}{" "}
                      {order.user.lastName}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          order.status === "Delivered"
                            ? "bg-green-200 text-green-700"
                            : order.status === "Cancelled"
                            ? "bg-red-200 text-red-700"
                            : order.status === "Shipped"
                            ? "bg-blue-200 text-blue-700"
                            : "bg-yellow-200 text-yellow-700"
                        }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">₹{order.totalPrice}</td>
                    <td className="px-6 py-4 rounded-r-lg">
                      <Link
                        to={`/dashboard/users/user/order_details/${order._id}`}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 text-sm font-medium shadow">
                        <ShoppingCartIcon fontSize="small" />
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

export default Orders;
