import React from "react";

const UserCard = ({ user, onClick }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
      <div className="flex flex-col items-center">
        <img
          src={
            user.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt={user.firstName}
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow mb-3"
        />
        <h3 className="text-lg font-semibold text-gray-700">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{user.email}</p>
        <button
          onClick={onClick}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md shadow hover:from-blue-500 hover:to-purple-500 transition">
          View More
        </button>
      </div>
    </div>
  );
};

export default UserCard;
