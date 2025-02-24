import React, { useEffect, useState } from "react";
import { EyeIcon, XCircleIcon, CircleCheck, Truck, Hourglass } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
const apiUrl = import.meta.env.VITE_BACK_END_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const authToken = Cookies.get("adminAuthToken");
      if (!authToken) {
        console.error("No auth token found.");
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/api/products/orders/allorders`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (!Array.isArray(response.data)) {
          console.error("Unexpected API response:", response.data);
          setOrders([]);
          return;
        }

        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("Failed to fetch orders.");
        setOrders([]);
      }
    };

    fetchOrders();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order._id.includes(searchQuery);
    const matchesStatus =
      !filterStatus || order.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-wide">
        Order Management
      </h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by Order ID..."
          className="w-full md:w-2/3 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">Filter by Status</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white text-lg font-serif">
            <tr>
              <th className="p-5 text-left">Order ID</th>
              <th className="p-5 text-left">User</th>
              <th className="p-5 text-left">Items</th>
              <th className="p-5 text-left">Total (₹)</th>
              <th className="p-5 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-200 transition font-sans">
                <td className="p-5 font-medium text-gray-700">{order._id}</td>
                <td className="p-5 font-medium text-gray-700">
                  {order.user.firstName + " " + order.user.lastName}
                </td>
                <td className="p-5 text-gray-600">{order.orderItems.length} items</td>
                <td className="p-5 text-gray-700 font-bold">₹ {order.totalPrice}</td>
                <td className="p-5 flex gap-3">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="bg-indigo-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-indigo-700 text-lg font-serif">
                    <EyeIcon className="h-6 w-6" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-y-auto relative">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Order Details</h2>
            <div className="grid grid-cols-2 gap-6 text-lg">
              <p>
                <strong>Order ID:</strong> {selectedOrder._id}
              </p>
              <p>
                <strong>User:</strong>{" "}
                {selectedOrder.user.firstName + " " + selectedOrder.user.lastName}
              </p>
              <p>
                <strong>Address:</strong> {selectedOrder.shipAddress.address1},{" "}
                {selectedOrder.shipAddress.city}, {selectedOrder.shipAddress.state},{" "}
                {selectedOrder.shipAddress.country} - {selectedOrder.shipAddress.zip}
              </p>
              <p>
                <strong>Total Price:</strong> ₹ {selectedOrder.totalPrice}
              </p>
              <p>
                <strong>Status:</strong>
                <span
                  className={
                    selectedOrder.status === "pending"
                      ? "text-yellow-500"
                      : selectedOrder.status === "shipped"
                      ? "text-blue-500"
                      : "text-green-500"
                  }>
                  {selectedOrder.status}
                </span>
              </p>

              <div className="w-full col-span-2 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    selectedOrder.status === "pending"
                      ? "bg-yellow-500 w-1/3"
                      : selectedOrder.status === "shipped"
                      ? "bg-blue-500 w-2/3"
                      : "bg-green-500 w-full"
                  }`}></div>
              </div>
            </div>
            <h3 className="text-2xl font-semibold mt-6 mb-4">Items Ordered:</h3>
            <div className="space-y-5">
              {selectedOrder.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-6 p-5 bg-gray-100 rounded-lg">
                  <img
                    className="w-28 h-28 object-cover rounded-lg"
                    src={item.product.thumbnail.image_url}
                    alt="Product"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{item.product.title}</h3>
                    <p className="text-lg text-gray-500">₹ {item.product.price}</p>
                    <p className="text-lg text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-lg text-gray-700">
                      {item.product.reachDisciption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full hover:bg-red-600">
              <XCircleIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
