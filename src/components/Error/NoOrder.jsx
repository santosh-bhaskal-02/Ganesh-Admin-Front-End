import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

function NoOrder() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-pink-100 via-purple-100 to-indigo-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-lg shadow-2xl border border-white/30 rounded-3xl p-10 text-center max-w-md w-full"
      >
        <LocalMallOutlinedIcon
          style={{ fontSize: 90 }}
          className="text-purple-500 drop-shadow mb-4"
        />

        <h1 className="text-3xl font-bold text-gray-800 mb-2">No Orders Yet</h1>
        <p className="text-gray-600 mb-6">
          Looks like you haven’t placed any orders. Let’s get shopping!
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/explore")}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-full shadow-md hover:shadow-indigo-300 transition"
        >
          Start Shopping
        </motion.button>
      </motion.div>
    </div>
  );
}

export default NoOrder;
