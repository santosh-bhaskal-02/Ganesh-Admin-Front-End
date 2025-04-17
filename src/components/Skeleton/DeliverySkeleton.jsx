import React from "react";

const DeliverySkeleton = () => {
  const rows = Array.from({ length: 5 });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg animate-pulse">
        <thead className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-t-lg">
          <tr>
            <th className="px-6 py-3 text-left text-lg font-semibold rounded-l-lg">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-lg font-semibold">Customer</th>
            <th className="px-6 py-3 text-left text-lg font-semibold">Address</th>
            <th className="px-6 py-3 text-left text-lg font-semibold">Status</th>
            <th className="px-6 py-3 text-left text-lg font-semibold">Update</th>
            <th className="px-6 py-3 text-left text-lg font-semibold rounded-r-lg">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, index) => (
            <tr key={index} className="hidden md:table-row border-b">
              <td className="px-6 py-4">
                <div className="h-4 w-32 bg-gray-300 rounded-md" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-40 bg-gray-300 rounded-md" />
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="h-3 w-56 bg-gray-300 rounded-md" />
                  <div className="h-3 w-40 bg-gray-300 rounded-md" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="h-6 w-20 bg-gray-300 rounded-full" />
              </td>
              <td className="px-6 py-4">
                <div className="h-8 w-28 bg-gray-300 rounded-md" />
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

export default DeliverySkeleton;
