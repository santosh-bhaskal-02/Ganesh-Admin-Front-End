import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import AccountDropdown from "./AccountDropdown";

import {
  Home as HomeIcon,
  Info as InfoIcon,
  Phone as PhoneIcon,
  ShoppingCart as ShoppingCartIcon,
  Login as LoginIcon,
  HowToReg as HowToRegIcon,
  AccountCircleOutlined as AccountIcon,
} from "@mui/icons-material";

const Navbar = () => {
  const { signIn, setSignIn } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRefDesktop = useRef(null);
  const dropdownRefMobile = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    Cookies.remove("adminAuthToken");
    Cookies.remove("adminId");
    setSignIn(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRefDesktop.current &&
        !dropdownRefDesktop.current.contains(e.target) &&
        dropdownRefMobile.current &&
        !dropdownRefMobile.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NavLink = ({ to, icon: Icon, label }) => (
    <Link
      to={to}
      className="flex items-center gap-2 px-4 py-2 text-white hover:text-blue-400 transition duration-200 ease-in-out">
      <Icon fontSize="small" />
      {label}
    </Link>
  );

  return (
    <nav className="sticky top-0 w-full z-50 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-white">
        {/* Logo */}
        <div
          onClick={() => navigate("/explore")}
          className="flex items-center gap-2 cursor-pointer">
          <img src="/Ganesh-logo.png" alt="Logo" className="w-32 h-12 object-contain" />
        </div>
        

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" icon={HomeIcon} label="Home" />
          <NavLink to="/about_us" icon={InfoIcon} label="About Us" />
          <NavLink to="/contact_us" icon={PhoneIcon} label="Contact Us" />
          <NavLink to="/contact_us" icon={InfoIcon} label="DashBoard" />

          {!signIn ? (
            <Link
              to={isLoginPage ? "/signup" : "/login"}
              className="bg-blue-600 px-4 py-2 rounded-md flex items-center gap-1 hover:bg-blue-700 transition">
              {isLoginPage ? (
                <HowToRegIcon fontSize="small" />
              ) : (
                <LoginIcon fontSize="small" />
              )}
              {isLoginPage ? "Sign Up" : "Login"}
            </Link>
          ) : (
            <div ref={dropdownRefDesktop} className="relative">
              <AccountIcon
                onClick={toggleDropdown}
                className="cursor-pointer hover:text-blue-400 transition"
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-md z-50 w-40">
                  <AccountDropdown onLogout={handleLogout} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Right */}
        <div className="md:hidden flex items-center space-x-4">
          <ShoppingCartIcon
            onClick={() => navigate("/cart")}
            className="cursor-pointer hover:text-blue-400 transition"
          />
          {!signIn ? (
            <Link
              to="/login"
              className="bg-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition flex items-center">
              <LoginIcon fontSize="small" className="mr-1" />
              Login
            </Link>
          ) : (
            <div ref={dropdownRefMobile} className="relative">
              <AccountIcon
                onClick={toggleDropdown}
                className="cursor-pointer hover:text-blue-400 transition"
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-md z-50 w-40">
                  <AccountDropdown onLogout={handleLogout} />
                </div>
              )}
            </div>
          )}
          <button onClick={toggleMobileMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-4 space-y-3 animate-slideDown">
          <NavLink to="/" icon={HomeIcon} label="Home" />
          <NavLink to="/about_us" icon={InfoIcon} label="About Us" />
          <NavLink to="/contact_us" icon={PhoneIcon} label="Contact Us" />
          {!signIn && (
            <Link
              to="/login"
              className="block bg-blue-600 text-center py-2 rounded hover:bg-blue-700 transition">
              <LoginIcon fontSize="small" className="mr-1 inline" />
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
