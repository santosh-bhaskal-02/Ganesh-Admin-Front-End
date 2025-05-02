import React, { useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import AlertBox from "../Error/AlertBox";
import LoadingSpinner from "../Error/LoadingSpinner";
const apiUrl = import.meta.env.VITE_BACK_END_URL;
// ... All previous imports remain same

function Login () {
  const navigate = useNavigate();
  const { setSignIn } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [Alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!loginData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(loginData.email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }

    if (!loginData.password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (loginData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/users/signup/admin/authenticate`,
        loginData
      );

      if (response.status === 200) {
        setAlert({
          type: "success",
          title: "Successful!",
          message: response.data.message,
        });

        const { token, userId } = response.data;
        Cookies.set("adminAuthToken", token, { secure: true, sameSite: "Strict" });
        Cookies.set("adminId", userId, { secure: true, sameSite: "Strict" });

        setSignIn(true);
        navigate("/dashboard");
      }
    } catch (err) {
      setAlert({
        type: "error",
        title: "Oops!",
        message: err?.response?.data?.message || "Something went wrong. Try again!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-blue-300 flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Welcome Back
        </h2>

        {loading && <LoadingSpinner />}

        {Alert && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
            <AlertBox
              type={Alert.type}
              title={Alert.title}
              message={Alert.message}
              onClick={() => setAlert(null)}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                required
                placeholder="admin@example.com"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all`}
              />
            </div>
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all`}
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <div className="text-right text-sm">
            <Link to="/ForgotPassword" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50">
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/SignUp" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
