import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { signIn, setSignIn } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("Login");
    //setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/users/signup/admin/authenticate`,
        loginData
      );

      if (response.status === 200) {
        // console.log("User Found");
        alert(response.data.message);

        const { token, userId } = response.data;

        //console.log(userId);
        Cookies.set("adminAuthToken", token, { secure: true, sameSite: "Strict" });
        Cookies.set("adminId", userId, { secure: true, sameSite: "Strict" });

        const adminIdCookie = Cookies.get("adminId");
        const adminAuthTokenCookie = Cookies.get("adminAuthToken");
        console.log(adminIdCookie);

        if (!adminIdCookie || !adminAuthTokenCookie) {
          console.error("User is not authenticated. Missing token or userId.");
          alert("Something went wrong. Please try again.");
        }
        console.log(signIn);
        setSignIn(true);

        navigate("/Dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
      console.error("Error ", err.response.data.message);
    }
  };

  return (
    <div className="  min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-blue-600">Welcome Back</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={loginData.email}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={loginData.password}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#008080]  hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200">
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Forgot your password?{" "}
            <Link to="/ForgotPassword" className="text-blue-600 hover:text-blue-800">
              Reset it
            </Link>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Don't have an account?{" "}
            <Link to="/SignUp" className="text-blue-600 hover:text-blue-800">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
