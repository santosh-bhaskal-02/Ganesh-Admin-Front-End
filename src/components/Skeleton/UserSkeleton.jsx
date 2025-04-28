import React from "react";

const UserSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-10 px-4 sm:px-6 animate-pulse">
      {/* User Info Skeleton */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl shadow-2xl p-6 sm:p-8 mb-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
          <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gray-300 rounded-full" />

          <div className="flex-1 w-full text-center md:text-left space-y-3">
            <div className="h-6 w-40 bg-gray-300 rounded" />
            <div className="h-4 w-32 bg-gray-300 rounded mx-auto md:mx-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="h-4 w-full bg-gray-300 rounded" />
              <div className="h-4 w-full bg-gray-300 rounded" />
            </div>

            {/* Address Skeleton */}
            <div className="mt-6 bg-white rounded-lg shadow-inner p-4 space-y-2">
              <div className="h-5 w-36 bg-purple-200 rounded" />
              <div className="ml-4 space-y-1">
                <div className="h-4 w-48 bg-gray-200 rounded" />
                <div className="h-4 w-60 bg-gray-200 rounded" />
                <div className="h-4 w-52 bg-gray-200 rounded" />
                <div className="h-4 w-40 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Skeleton */}
      <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden space-y-6 p-4 sm:p-6">
        <div className="h-7 w-40 bg-indigo-200 rounded mb-4" />

        {[1, 2].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-24 h-24 bg-gray-200 rounded-lg" />
            <div className="flex-1 w-full space-y-2">
              <div className="h-5 w-48 bg-gray-300 rounded" />
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-20 bg-green-200 rounded" />
              <div className="h-8 w-24 bg-indigo-300 rounded" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <div className="h-10 w-32 bg-gray-300 rounded-lg" />
      </div>
    </div>
  );
};

export default UserSkeleton;
