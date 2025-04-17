import React from "react";
import { motion } from "framer-motion";

function IdolCardSkeleton() {
  return (
    <motion.div
      className="animate-pulse"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      <div className="border border-gray-200 bg-white rounded-2xl p-6 shadow-md">
        <div className="w-full aspect-square bg-gray-200 rounded-xl mb-4" />
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="h-5 w-2/3 bg-gray-300 rounded" />
          <div className="h-4 w-1/3 bg-gray-300 rounded" />
          <div className="h-5 w-1/4 bg-gray-300 rounded" />
          <div className="flex gap-3 mt-4">
            <div className="h-10 w-20 bg-gray-300 rounded-lg" />
            <div className="h-10 w-20 bg-gray-300 rounded-lg" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default IdolCardSkeleton;
