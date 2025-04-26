import React from "react";
import { Inbox, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function NoCustomFormList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-16 bg-blue-50 rounded-2xl max-w-3xl mx-auto text-center h-96">
      <div className="flex flex-col items-center justify-center gap-6 h-full">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-yellow-100 p-6 rounded-full shadow-md">
          <Inbox className="text-blue-500" size={56} />
        </motion.div>

        <h2 className="text-3xl font-bold text-blue-700">No Custom Suggestions</h2>
        <p className="text-gray-600 max-w-md">
          You haven't received any custom idol suggestions yet. When users submit ideas,
          they will be listed here beautifully!
        </p>

        <div className="flex justify-center items-center mt-6 gap-2 text-yellow-500 animate-bounce">
          <Sparkles size={24} />
          <span className="text-sm font-medium">Awaiting creativity...</span>
        </div>
      </div>
    </motion.div>
  );
}

export default NoCustomFormList;
