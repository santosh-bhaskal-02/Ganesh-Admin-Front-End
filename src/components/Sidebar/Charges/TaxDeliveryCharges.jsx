import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AlertBox from "../../Error/AlertBox";
import LoadingSpinner from "../../Error/LoadingSpinner";
import DialogBox from "../../Error/DialogBox";
import { Truck, Percent, Save } from "lucide-react";
import ErrorPage from "../../Error/ErrorPage";
import { motion, AnimatePresence } from "framer-motion";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

const TaxDeliveryCharges = () => {
  const [tax, setTax] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState("");
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const authToken = Cookies.get("adminAuthToken");

  if (!authToken) return <ErrorPage />;

  const fetchCharges = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/charges/fetch`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      console.log(res);
      setTax(res.data.taxRate);
      setDeliveryCharge(res.data.deliveryCharge);
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      setAlert({
        type: "error",
        title: "Error",
        message: "Failed to fetch settings",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharges();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tax === "" || deliveryCharge === "") {
      return setAlert({
        type: "error",
        title: "Missing Input",
        message: "Both tax and delivery charge are required.",
      });
    }

    const formattedTax = parseFloat(tax).toFixed(2);
    const formattedDelivery = parseFloat(deliveryCharge).toFixed(2);

    setLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/api/charges/add`,
        {
          tax: parseFloat(formattedTax),
          deliveryCharge: parseFloat(formattedDelivery),
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setAlert({
        type: "success",
        title: "Success",
        message: "Settings updated successfully!",
      });
    } catch (error) {
      console.error("Failed to update settings:", error);
      setAlert({
        type: "error",
        title: "Error",
        message: "Could not update settings.",
      });
    } finally {
      fetchCharges();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-yellow-200 flex items-center justify-center px-4 py-10">
      {loading && <LoadingSpinner />}
      <AnimatePresence>
        {alert && (
          <AlertBox
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClick={() => setAlert(null)}
          />
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
              onConfirm={handleSubmit}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="bg-blue-100 p-6 sm:p-8 rounded-xl shadow-lg border border-blue-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-800">
            Update Charges
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Tax Input */}
            <div className="flex items-center gap-3 border border-blue-300 bg-white rounded-md px-4 py-3 shadow-sm hover:shadow-md transition">
              <Percent className="text-blue-600 w-5 h-5" />
              <input
                type="number"
                step="0.01"
                value={tax}
                onChange={(e) => setTax(e.target.value)}
                placeholder="Tax Percentage (%)"
                className="flex-1 bg-transparent outline-none text-gray-800 text-sm sm:text-base"
                required
              />
            </div>

            {/* Delivery Input */}
            <div className="flex items-center gap-3 border border-blue-300 bg-white rounded-md px-4 py-3 shadow-sm hover:shadow-md transition">
              <Truck className="text-green-600 w-5 h-5" />
              <input
                type="number"
                step="0.01"
                value={deliveryCharge}
                onChange={(e) => setDeliveryCharge(e.target.value)}
                placeholder="Delivery Charge (₹)"
                className="flex-1 bg-transparent outline-none text-gray-800 text-sm sm:text-base"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-700 text-white py-3 rounded-lg font-medium shadow-md hover:opacity-90 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}>
              <div className="flex items-center justify-center gap-2">
                <Save className="w-5 h-5" />
                {loading ? "Saving..." : "Save Charges"}
              </div>
            </button>
          </form>
        </div>

        {/* Display Section */}
        <div className="bg-yellow-50 p-6 sm:p-8 rounded-2xl shadow-xl border border-yellow-200">
          <h3 className="text-2xl font-bold mb-6 text-yellow-800 text-center">
            Current Charges
          </h3>
          <ul className="space-y-4 text-gray-800">
            <li className="flex justify-between items-center bg-white shadow-sm border border-yellow-100 px-4 py-3 rounded-xl">
              <span>Tax:</span>
              <span className="font-semibold text-blue-600">
                {parseFloat(tax).toFixed(2)} %
              </span>
            </li>
            <li className="flex justify-between items-center bg-white shadow-sm border border-yellow-100 px-4 py-3 rounded-xl">
              <span>Delivery Charge:</span>
              <span className="font-semibold text-green-600">
                ₹ {parseFloat(deliveryCharge).toFixed(2)}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaxDeliveryCharges;
