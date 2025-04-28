import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingSpinner from "../../Error/LoadingSpinner";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  ClipboardListIcon,
  TextQuoteIcon,
  RulerIcon,
  InfoIcon,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import DialogBox from "../../Error/DialogBox";
import AlertBox from "../../Error/AlertBox";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

const steps = [
  "Accepted",
  "Awaiting for Payment",
  "Payment Successful",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const StatusProgressBar = ({ currentStatus }) => {
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div className="flex items-center justify-between gap-2 mt-8 overflow-x-auto">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-1">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              index <= currentIndex
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}>
            {index + 1}
          </div>
          <span className="text-xs">{step}</span>
          {index < steps.length - 1 && (
            <div
              className={`w-8 h-1 ${
                index < currentIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

function CustomFormDetails() {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const authToken = Cookies.get("authToken");
  const [Alert, setAlert] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [statusDropdown, setStatusDropdown] = useState("");

  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/custom-idol/fetch-list/${formId}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        setForm(response.data.result);
        setStatusDropdown(response.data.result.status || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFormDetails();
  }, [formId]);

  const handleSubmit = async (status) => {
    try {
      await axios.put(
        `${apiUrl}/api/custom-idol/update/status/${formId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      setForm((prev) => ({ ...prev, status }));
      setAlert({
        type: "success",
        title: "Successful!",
        message: "Status updated successfully.",
      });
    } catch (error) {
      console.error("Error updating status:", error);
      setAlert({
        type: "error",
        title: "Oops!",
        message: "Failed to update status.",
      });
    } finally {
      setShowDialog(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!form) return <p className="text-red-500 text-center mt-10">Form not found.</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 md:p-10 bg-white rounded-2xl shadow-2xl max-w-4xl mx-auto mt-10 space-y-10">
      {Alert && (
        <motion.div
          key="alert"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 flex justify-center items-center bg-black/40 z-[999]">
          <AlertBox
            type={Alert.type}
            title={Alert.title}
            message={Alert.message}
            onClick={() => setAlert(null)}
          />
        </motion.div>
      )}

      {!Alert && showDialog && (
        <motion.div
          key="dialog"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 flex justify-center items-center bg-black/40 z-[999]">
          <DialogBox
            open={showDialog}
            onClose={() => setShowDialog(false)}
            onConfirm={() => handleSubmit("Rejected")}
          />
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-extrabold text-blue-700 flex items-center gap-3 border-b pb-4">
        <ClipboardListIcon className="w-8 h-8 text-yellow-500" />
        Suggestion Details
      </motion.h2>

      <StatusProgressBar currentStatus={form.status} />

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-lg">
        <div className="space-y-3">
          <p className="flex items-center gap-2">
            <TextQuoteIcon className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-blue-700">Suggestion:</span>{" "}
            {form.suggestion}
          </p>
          <p className="flex items-center gap-2">
            <RulerIcon className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-blue-700">Height:</span> {form.size} ft
          </p>
          <p className="flex items-center gap-2">
            <InfoIcon className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-blue-700">Specifications:</span>{" "}
            {form.otherSpecifications}
          </p>
          <p className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-blue-700">Created At:</span>{" "}
            {new Date(form.createdDate).toLocaleString()}
          </p>
        </div>

        {form.thumbnail?.image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center items-start">
            <img
              src={form.thumbnail.image_url}
              alt="Custom Idol"
              className="rounded-xl border border-yellow-300 shadow-md w-full max-w-sm object-cover"
            />
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-400 shadow-inner">
        <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
          <UserIcon className="w-6 h-6 text-yellow-500" />
          User Information
        </h3>
        <div className="space-y-3 text-gray-700 text-lg">
          <p className="flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-blue-500" />
            <span className="font-medium text-blue-800">Name:</span>{" "}
            {form.user?.firstName} {form.user?.lastName}
          </p>
          <p className="flex items-center gap-2">
            <MailIcon className="w-5 h-5 text-blue-500" />
            <span className="font-medium text-blue-800">Email:</span> {form.user?.email}
          </p>
          <p className="flex items-center gap-2">
            <PhoneIcon className="w-5 h-5 text-blue-500" />
            <span className="font-medium text-blue-800">Phone:</span> {form.user?.phone}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-medium text-blue-800">User ID:</span>{" "}
            {form.user?.id?.toUpperCase()}
          </p>
        </div>
      </motion.div>

      {form.status !== "Rejected" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-6 mt-8 flex-wrap">
          {form.status === "Accepted" ? (
            <select
              value={statusDropdown}
              onChange={(e) => {
                setStatusDropdown(e.target.value);
                handleSubmit(e.target.value);
              }}
              className="px-4 py-2 rounded-lg border border-blue-400 text-blue-700 shadow-md">
              <option value="">Update Status</option>
              {steps.slice(1).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          ) : (
            <>
              <button
                onClick={() => handleSubmit("Accepted")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-200">
                <CheckCircle className="w-5 h-5" />
                Accept
              </button>

              <button
                onClick={() => setShowDialog(true)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-200">
                <XCircle className="w-5 h-5" />
                Reject
              </button>
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default CustomFormDetails;
