import React from "react";

const OrderSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, idx) => (
        <tr key={idx} className="animate-pulse border-b">
          <td className="px-6 py-4">
            <div className="h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full shadow-inner"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full shadow-inner"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-28 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full shadow-inner"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full shadow-inner"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-8 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md shadow"></div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default OrderSkeleton;
