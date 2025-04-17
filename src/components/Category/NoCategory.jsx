import React from "react";

const NoCategory = () => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-sm flex items-center space-x-3">
      <svg
        className="w-6 h-6 text-yellow-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
        />
      </svg>
      <span className="text-sm font-medium">
        No categories found. Please add a new category to get started.
      </span>
    </div>
  );
};

export default NoCategory;
