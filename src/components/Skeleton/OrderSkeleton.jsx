// components/OrderTableSkeleton.jsx
import React from "react";

const OrderTableSkeleton = () => {
  const rows = Array.from({ length: 5 });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg animate-pulse">
        <thead className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-white rounded-t-lg">
          <tr>
            <th className="px-6 py-3 text-left text-lg font-semibold rounded-l-lg">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-lg font-semibold">Customer</th>
            <th className="px-6 py-3 text-left text-lg font-semibold">Status</th>
            <th className="px-6 py-3 text-left text-lg font-semibold">Total Price</th>
            <th className="px-6 py-3 text-left text-lg font-semibold rounded-r-lg">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">
                <div className="h-4 w-32 bg-gray-300 rounded-md" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-40 bg-gray-300 rounded-md" />
              </td>
              <td className="px-6 py-4">
                <div className="h-6 w-20 bg-gray-300 rounded-full" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-20 bg-gray-300 rounded-md" />
              </td>
              <td className="px-6 py-4">
                <div className="h-8 w-24 bg-gray-300 rounded-lg" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTableSkeleton;
