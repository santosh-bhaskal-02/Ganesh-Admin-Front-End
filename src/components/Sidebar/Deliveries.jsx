import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AlertBox from "./AlertBox";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const authToken = Cookies.get("adminAuthToken");
      if (!authToken) {
        setAlert({
          type: "error",
          title: "Authentication Error",
          message: "No auth token found.",
        });
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/api/products/orders/allorders`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (!Array.isArray(response.data)) {
          console.error("Unexpected API response:", response.data);
          setDeliveries([]);
          return;
        }
        console.log(response.data);
        setDeliveries(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setAlert({
          type: "error",
          title: "Fetch Failed",
          message: "Could not retrieve orders.",
        });
        setDeliveries([]);
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    const authToken = Cookies.get("adminAuthToken");

    try {
      const response = await axios.put(
        `${apiUrl}/api/products/orders/update/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setDeliveries((prevDeliveries) =>
          prevDeliveries.map((delivery) =>
            delivery._id === id ? { ...delivery, status: newStatus } : delivery
          )
        );
        setAlert({
          type: "success",
          title: "Update Successful",
          message: "Order status updated!",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setAlert({
        type: "error",
        title: "Update Failed",
        message: "Could not update order status.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8 flex justify-center items-center">
      {/* Show AlertBox if alert exists */}
      {alert && (
        <AlertBox
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClick={() => setAlert(null)}
        />
      )}

      <div className="max-w-7xl w-full bg-white p-10 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold mb-8 text-gray-900 text-center uppercase tracking-wider">
          Deliveries Management
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
            <thead>
              <tr className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm uppercase">
                <th className="py-4 px-6 text-left font-semibold">Order ID</th>
                <th className="py-4 px-6 text-left font-semibold">Customer Name</th>
                <th className="py-4 px-6 text-left font-semibold">Delivery Address</th>
                <th className="py-4 px-6 text-left font-semibold">Status</th>
                <th className="py-4 px-6 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((delivery, index) => (
                <tr
                  key={delivery._id}
                  className={`hover:bg-gradient-to-r hover:from-purple-200 hover:to-blue-200 transition-colors duration-200 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}>
                  <td className="py-4 px-6 text-gray-800 font-medium">{delivery._id}</td>
                  <td className="py-4 px-6 text-gray-800 font-medium">
                    {delivery.shipAddress.firstName + " " + delivery.shipAddress.lastName}
                  </td>
                  <td className="py-4 px-6 text-gray-800 font-medium">
                    {delivery.shipAddress ? (
                      <div className="text-sm leading-relaxed">
                        {delivery.shipAddress.address1}, {delivery.shipAddress.city},
                        <br />
                        {delivery.shipAddress.state} - {delivery.shipAddress.zip},<br />
                        {delivery.shipAddress.country}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col items-start">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          delivery.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : delivery.status === "Dispatched"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-green-100 text-green-600"
                        }`}>
                        {delivery.status}
                      </span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            delivery.status === "Pending"
                              ? "bg-yellow-500 w-1/3"
                              : delivery.status === "Dispatched"
                              ? "bg-blue-500 w-2/3"
                              : "bg-green-500 w-full"
                          }`}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <select
                      value={delivery.status}
                      onChange={(e) => updateStatus(delivery._id, e.target.value)}
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-sm shadow-sm bg-white">
                      <option value="Pending">Pending</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Deliveries;
