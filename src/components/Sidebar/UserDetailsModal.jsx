import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingBag as ShoppingBagIcon,
  LocalShipping as LocalShippingIcon,
  ReceiptLong as ReceiptLongIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import LoadingSpinner from "../Error/LoadingSpinner";
import UserSkeleton from "../Error/UserSkeleton";
import NoOrder from "../Error/NoOrder";
import AlertBox from "../Error/AlertBox";
import DialogBox from "../Error/DialogBox";
import { AnimatePresence, motion } from "framer-motion";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

const UserDetailsPage = () => {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const authToken = Cookies.get("adminAuthToken");

  useEffect(() => {
    const fetchUser = async () => {
      if (!authToken) return;

      try {
        const response = await axios.get(`${apiUrl}/api/users/login/userlist/${userId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const [showDialog, setShowDialog] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/api/users/login/delete/${userId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setAlert({
        type: "success",
        title: "Successful!",
        message: "User deleted successfully.",
      });

      setRedirect(true);
    } catch (error) {
      console.error("Error deleting user:", error);
      setAlert({ type: "error", title: "Oops!", message: "Failed to delete user." });
    } finally {
      setShowDialog(false);
    }
  };

  useEffect(() => {
    if (redirect) {
      const timer = setTimeout(() => {
        navigate("/dashboard/users");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [redirect]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-10 px-4 sm:px-6">
      {loading && <UserSkeleton />}
      <AnimatePresence>
        {alert && (
          <motion.div
            key="alert"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex justify-center items-center bg-black/40 z-[999]">
            <AlertBox
              type={alert.type}
              title={alert.title}
              message={alert.message}
              onClick={() => {
                setAlert(null);
                if (redirect) navigate("/dashboard/users");
              }}
            />
          </motion.div>
        )}

        {!alert && showDialog && (
          <motion.div
            key="dialog"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex justify-center items-center bg-black/40 z-[999]">
            <DialogBox
              open={showDialog}
              onClose={() => setShowDialog(false)}
              onConfirm={handleDelete}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8">
          {/* Profile Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt={user.firstName}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-md"
            />
          </div>

          {/* User Info Section */}
          <div className="flex flex-col gap-4">
            {/* Name and ID */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600 text-sm italic">User ID: {user.id}</p>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 bg-indigo-50 p-4 rounded-xl shadow-inner">
              <div className="flex items-center gap-2 text-sm text-gray-800">
                <ShoppingBagIcon className="text-blue-600" />
                <span className="font-semibold">Email:</span> {user.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-800">
                <LocalShippingIcon className="text-green-600" />
                <span className="font-semibold">Phone:</span>{" "}
                {user.phone || "Not Provided"}
              </div>
            </div>

            {/* Address */}
            {user.address && (
              <div className="bg-purple-50 p-4 rounded-xl shadow-inner">
                <h3 className="text-base sm:text-lg font-semibold text-purple-700 mb-2 flex items-center gap-2">
                  <ReceiptLongIcon className="text-purple-500" />
                  Address Details
                </h3>
                <div className="text-gray-700 text-sm space-y-1 ml-1">
                  <p>
                    {user.address.firstName} {user.address.lastName}
                  </p>
                  <p>{user.address.address1}</p>
                  <p>
                    {user.address.city}, {user.address.state}
                  </p>
                  <p>
                    {user.address.country} - {user.address.zip}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-end mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/dashboard/users/user/edit_address/${userId}`)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition-all text-sm font-semibold">
            <EditIcon fontSize="small" />
            Edit User
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDialog(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-all text-sm font-semibold">
            <DeleteIcon fontSize="small" />
            Delete User
          </motion.button>
        </div>
      </div>

      {/* Orders Section */}
      <motion.div
        className="bg-gradient-to-br from-blue-50 via-white to-white py-10 px-2 sm:px-4 md:px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden">
            <div className="space-y-8 p-4 sm:p-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800 mb-6">
                Your Orders
              </h2>

              {user.orders?.length === 0 ? (
                <NoOrder />
              ) : (
                user.orders.map((order) => (
                  <motion.div
                    key={order._id}
                    className="bg-white rounded-xl p-4 flex flex-col border-b sm:flex-row items-center gap-4 hover:shadow-2xl transition-all"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}>
                    <img
                      src={
                        order.orderItems[0]?.product?.thumbnail?.image_url ||
                        "https://via.placeholder.com/100"
                      }
                      alt="Product"
                      className="w-24 h-24 object-cover rounded-lg border"
                    />

                    <div className="flex-1 w-full">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                        {order.orderItems[0]?.product?.title}
                      </h3>
                      <p className="text-gray-600 flex items-center gap-2 mt-1 text-sm">
                        <LocalShippingIcon className="text-blue-500" fontSize="small" />
                        Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600 flex items-center gap-2 mt-1 text-sm">
                        <ReceiptLongIcon className="text-yellow-600" fontSize="small" />
                        Status: {order.status}
                      </p>
                    </div>

                    <div className="text-right sm:min-w-[120px]">
                      <p className="text-green-600 font-bold text-base sm:text-lg flex items-center justify-end gap-1">
                        <CurrencyRupeeIcon fontSize="small" />
                        {order.orderItems[0]?.product?.price}
                      </p>
                      <Link
                        to={`/dashboard/users/user/order_details/${order._id}`}
                        className="mt-2 inline-block px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-sm font-medium shadow">
                        View Order
                      </Link>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.history.back()}
            className="flex items-center gap-2 py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-base font-medium shadow-md transition-all duration-200">
            <ArrowBackIcon fontSize="small" />
            Go Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDetailsPage;
