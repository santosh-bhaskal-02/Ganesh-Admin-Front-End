import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingSpinner from "../Error/LoadingSpinner";
// import SignInErrorPage from "../404ErrorPage/SignInErrorPage";
import ErrorPage from "../Error/ErrorPage";
import AlertBox from "../Error/AlertBox";
import {
  CheckCircle,
  LocalShipping,
  HourglassTop,
  Paid,
  DirectionsBike,
  AccessTime,
  Receipt,
  EventAvailable,
  LocationOn,
  MailOutline,
  Phone,
  AttachMoney,
  ReceiptLong,
  Calculate,
  Percent,
  Cancel,
} from "@mui/icons-material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { motion } from "framer-motion";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function OrderDetails() {
  const { orderId } = useParams();
  const [alert, setAlert] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const authToken = Cookies.get("adminAuthToken");
  //console.log(authToken);
  if (!authToken) {
    console.error("User is not authenticated. Missing token or userId.");
    return <ErrorPage />;
  }

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        const response = await axios.get(
          `${apiUrl}/api/products/orders/get/user_orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            credentials: "include",
          }
        );
        if (response.status === 200) {
          setOrder(response.data);
        }
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrderDetails();
  }, [orderId]);

  const getProgressIndex = (status) => {
    const stages = [
      "Awaiting for Payment",
      "Payment Successful",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];
    return stages.indexOf(status);
  };

  const formatDateTime = (isoString) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(isoString).toLocaleString("en-IN", options);
  };

  const progressSteps = [
    { label: "Awaiting for Payment", icon: <HourglassTop /> },
    { label: "Payment Successful", icon: <CurrencyRupeeIcon /> },
    { label: "Shipped", icon: <LocalShipping /> },
    { label: "Out for Delivery", icon: <DirectionsBike /> },
    { label: "Delivered", icon: <CheckCircle /> },
    { label: "Cancelled", icon: <Cancel /> },
  ];

  const handleCancelOrder = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${apiUrl}/api/products/orders/cancel_order/${order._id}`,
        { status: "Cancelled" },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        setOrder({ ...order, status: "Cancelled" });
        setAlert({
          type: "success",
          title: "Successful!",
          message: "Order Cancellation Successful!",
        });
      }
    } catch (err) {
      console.error("Error cancelling order:", err);
      setAlert({
        type: "error",
        title: "Oops!",
        message: err.response?.data?.message || "Something went wrong. Try again!",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!order) return <ErrorPage />;

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-white py-10 px-4">
      {alert && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-[1000]">
          <AlertBox
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClick={() => setAlert(null)}
          />
        </div>
      )}

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-8 space-y-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Order Details
        </h2>
        {order.status === "Cancelled" && (
          <div className="flex justify-center items-center mb-6">
            <div className="flex items-center gap-2 bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-full shadow-sm">
              <Cancel className="text-red-500" />
              <span className="font-medium">This order has been cancelled</span>
            </div>
          </div>
        )}
        {/* Order Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Receipt className="text-blue-600" />
            <span className="font-medium">
              <span className="text-gray-900 font-semibold">Order ID:</span>
              {order._id.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <AccessTime className="text-green-600" />
            <span className="font-medium">
              <span className="text-gray-900 font-semibold">Placed on:</span>{" "}
              {formatDateTime(order.orderDate)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <EventAvailable className="text-purple-600" />
            <span className="font-medium">
              <span className="text-gray-900 font-semibold">Expected Delivery:</span>{" "}
              {new Date(order.deliveredAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="relative mb-10 px-4">
          <div className="absolute top-5 left-5 right-5 h-1 bg-gray-300 z-0 rounded-full" />
          <div
            className={`absolute top-5 left-5 h-1 z-10 rounded-full transition-all duration-500 ${
              order.status === "Cancelled" ? "bg-red-500" : "bg-green-500"
            }`}
            style={{
              width: `${
                order.status === "Cancelled"
                  ? "100%"
                  : (getProgressIndex(order.status) / (progressSteps.length - 1)) * 100
              }%`,
            }}
          />
          <div className="flex justify-between relative z-20">
            {progressSteps.map((step, index) => {
              const isCancelled = order.status === "Cancelled";
              const isActive = isCancelled
                ? step.label === "Cancelled"
                : index <= getProgressIndex(order.status);

              return (
                <div key={index} className="flex flex-col items-center w-20 text-center">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-white mb-2 transition-all duration-300 ${
                      isCancelled
                        ? step.label === "Cancelled"
                          ? "bg-red-500"
                          : "bg-gray-300"
                        : isActive
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}>
                    {step.icon}
                  </div>
                  <span className="text-xs text-gray-700">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>
        {/* Items */}
        <motion.div
          className="bg-gradient-to-br from-pink-50 via-white to-blue-50 p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}>
          {order.orderItems.map((item) => (
            <div className="flex flex-col p-6 border-b md:flex-row gap-6">
              <img
                className="w-32 h-32 object-cover rounded-lg shadow-lg border-2 border-blue-300"
                src={item.product.thumbnail.image_url}
                alt="Product"
              />
              <div className="flex-1 space-y-2">
                <h3 className="text-2xl font-semibold text-blue-800 hover:text-blue-600 transition-all duration-300">
                  {item.product.title}
                </h3>
                <p className="text-gray-600 flex items-center gap-1">
                  <CurrencyRupeeIcon fontSize="small" className="text-green-500" />
                  {item.product.price}
                </p>
                <p className="text-sm text-gray-700">{item.product.reachDisciption}</p>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-indigo-600 mb-1 flex items-center gap-1">
                <LocationOn fontSize="small" className="text-indigo-500" /> Delivery
                Address
              </h4>
              <p>{order.shipAddress.address1}</p>
              <p>
                {order.shipAddress.city}, {order.shipAddress.state} -{" "}
                {order.shipAddress.zip}
              </p>
              <p>{order.shipAddress.country}</p>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-600 mb-1">Contact</h4>
              <p className="flex items-center gap-1">
                <MailOutline fontSize="small" className="text-indigo-500" />{" "}
                {order.shipAddress.email}
              </p>
              <p className="flex items-center gap-1">
                <Phone fontSize="small" className="text-indigo-500" /> +91{" "}
                {order.shipAddress.phone}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t pt-4">
            <h4 className="font-semibold text-teal-600 mb-2 flex items-center gap-1">
              <ReceiptLong fontSize="small" className="text-teal-500" /> Order Summary
            </h4>
            <div className="flex justify-between text-gray-700 mb-1">
              <span className="flex items-center gap-1">
                <CurrencyRupeeIcon fontSize="small" className="text-green-500" />
                Subtotal
              </span>
              <span>₹ {order.subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-1">
              <span className="flex items-center gap-1">
                <LocalShipping fontSize="small" className="text-gray-600" /> Shipping
              </span>
              <span>₹ {order.taxCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-1">
              <span className="flex items-center gap-1">
                <Percent fontSize="small" className="text-gray-600" /> Tax
              </span>
              <span>₹ {order.shippingCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 mt-2">
              <span className="flex items-center gap-1">
                <Calculate fontSize="small" className="text-gray-600" /> Total
              </span>
              <span>₹ {order.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {order.status !== "Cancelled" && order.status !== "Delivered" && (
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCancelOrder}
                className="relative group overflow-hidden px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:from-red-600 hover:to-pink-600 transition duration-300">
                <span className="absolute inset-0 group-hover:scale-110 bg-white opacity-10 transition duration-300 rounded-full" />
                <Cancel className="mr-2" /> Cancel Order
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default OrderDetails;
