import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const apiUrl = import.meta.env.VITE_BACK_END_URL;

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const authToken = Cookies.get("adminAuthToken");
      if (!authToken) {
        console.error("No auth token found.");
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/api/users/login/userlist`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (!Array.isArray(response.data.usersList)) {
          console.error("Unexpected API response:", response.data);
          setUsers([]);
          return;
        }

        console.log("user", response.data.usersList);
        setUsers(response.data.usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users.");
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleViewMore = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl  bg-white p-8 rounded-xl shadow-lg ">
        <h2 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">Users</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-xl shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex flex-col items-center">
                <img
                  src={
                    user.profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt={user.firstName}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-300 shadow-sm"
                />

                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  {user.firstName + " " + user.lastName}
                </h3>
                <p className="text-gray-500 mb-4">{user.email}</p>

                <button
                  onClick={() => handleViewMore(user)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-md hover:from-blue-500 hover:to-purple-500 transition-colors duration-300">
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full transform transition-transform duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-700">
                {selectedUser.firstName + " " + selectedUser.lastName}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-xl font-semibold">
                &times;
              </button>
            </div>

            <div className="flex flex-col items-center">
              <img
                src={selectedUser.profilePic}
                alt={selectedUser.name}
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-300 shadow-lg"
              />
              <p className="text-gray-700 mb-2 text-lg">
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p className="text-gray-700 mb-4 text-lg">
                <strong>ID:</strong> {selectedUser.id}
              </p>
            </div>

            <button
              onClick={closeModal}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-md hover:from-blue-500 hover:to-purple-500 transition-colors duration-300">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
