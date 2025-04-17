import React, { useContext } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { BsBoxSeam } from "react-icons/bs";

function AccountDropdown() {
  const { setSignIn } = useContext(AuthContext);

  const handleLogout = () => {
    try {
      Cookies.remove("adminAuthToken");
      Cookies.remove("adminId");
      setSignIn(false);
    } catch (err) {
      console.error("Error logging out: ", err);
    }
  };

  return (
    <div className="absolute right-0 mt-4 w-60 rounded-xl shadow-xl border border-white/20 bg-white/80 backdrop-blur-md z-50 animate-fade-in">
      <ul className="divide-y divide-gray-200">
        <li>
          <Link
            to="/profile"
            className="flex items-center gap-3 px-5 py-4 text-gray-700 hover:bg-blue-50 transition-all duration-200 font-medium rounded-t-xl">
            <FaUserCircle size={20} className="text-blue-600" />
            My Profile
          </Link>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-5 py-4 text-red-600 hover:bg-red-50 transition-all duration-200 font-medium rounded-b-xl">
            <IoMdLogOut size={20} />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AccountDropdown;
