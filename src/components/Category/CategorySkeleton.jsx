
import React from "react";

const CategorySkeleton = () => {
  return (
    <li className="flex justify-between items-center bg-white shadow-sm border border-yellow-100 px-4 py-3 rounded-xl animate-pulse">
      <span className="h-4 w-32 bg-gray-300 rounded-md"></span>
      <div className="flex space-x-3">
        <span className="h-5 w-5 bg-gray-300 rounded-full"></span>
        <span className="h-5 w-5 bg-gray-300 rounded-full"></span>
      </div>
    </li>
  );
};

export default CategorySkeleton;
