import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Eye } from "lucide-react";
import ErrorPage from "../Error/ErrorPage";
import NoUsersFound from "./NoUserFound";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const authToken = Cookies.get("adminAuthToken");
  if (!authToken) return <ErrorPage />;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users/login/userlist`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const userList = response.data.usersList || [];
        setUsers(userList);
        setFilteredUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleViewMore = (userId) => {
    navigate(`/dashboard/users/user/${userId}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(value) ||
        user.lastName.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-blue-200 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-bold text-center text-purple-800 mb-8">
          Manage Users
        </h2>

        <div className="mb-10 max-w-md mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name or email..."
            className="w-full px-5 py-3 border border-purple-300 rounded-2xl shadow focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-2xl shadow-md text-center">
                  <Skeleton circle height={90} width={90} className="mx-auto mb-4" />
                  <Skeleton height={20} width={`60%`} className="mx-auto mb-2" />
                  <Skeleton height={15} width={`80%`} className="mx-auto mb-3" />
                  <Skeleton height={36} width={`50%`} className="mx-auto" />
                </div>
              ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <NoUsersFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white/90 rounded-2xl shadow-lg p-6 text-center backdrop-blur-md border border-purple-100">
                <img
                  src={
                    user.profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt={user.firstName}
                  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-purple-200 shadow mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-gray-600 mb-4 break-words max-w-full truncate">
                  {user.email}
                </p>

                <button
                  onClick={() => handleViewMore(user.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow hover:from-purple-700 hover:to-indigo-700 transition-all">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Users;
