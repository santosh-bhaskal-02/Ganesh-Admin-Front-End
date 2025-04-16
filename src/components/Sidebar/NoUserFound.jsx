import React from "react";
import { Ban } from "lucide-react";
import { motion } from "framer-motion";

const NoUsersFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-blue-100 p-10 rounded-3xl shadow-xl border border-yellow-300 max-w-xl mx-auto mt-10">
      <div className="bg-white p-6 rounded-full shadow-lg mb-6 border-4 border-yellow-200">
        <Ban className="w-12 h-12 text-yellow-500" />
      </div>
      <h2 className="text-2xl font-bold text-blue-700 mb-2">No Users Found</h2>
      <p className="text-gray-600 text-center">
        We couldn't find any users that match your search criteria.
        <br />
        Please try again with a different name or email.
      </p>
    </motion.div>
  );
};

export default NoUsersFound;
