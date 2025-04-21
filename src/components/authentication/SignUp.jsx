import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Key,
  User,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";
import AlertBox from "../Error/AlertBox";
import LoadingSpinner from "../Error/LoadingSpinner";
const apiUrl = import.meta.env.VITE_BACK_END_URL;

const SignupForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.email || !validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
      if (otpSent && (!otp || otp.length !== 6)) {
        newErrors.otp = "Please enter a valid 6-digit OTP.";
      }
    }

    if (step === 2) {
      if (!formData.firstName.trim() || !/^[A-Za-z]{2,}$/.test(formData.firstName)) {
        newErrors.firstName = "Enter a valid first name (letters only, min 2 chars).";
      }
      if (!formData.lastName.trim() || !/^[A-Za-z]{2,}$/.test(formData.lastName)) {
        newErrors.lastName = "Enter a valid last name (letters only, min 2 chars).";
      }
    }

    if (step === 3) {
      if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone)) {
        newErrors.phone = "Enter a valid 10-digit phone number.";
      }
    }

    if (step === 4) {
      if (
        !formData.password ||
        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(formData.password)
      ) {
        newErrors.password =
          "Password must be at least 6 characters with letters & numbers.";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const sendOtp = async (event) => {
    event.preventDefault();
    if (!formData.email || !validateEmail(formData.email)) {
      setErrors({ email: "Please enter a valid email." });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/users/signup/send_otp`, {
        email: formData.email,
      });
      if (response) {
        if (!response.data.success) {
          throw new Error("failed to verify OTP");
        }
        setOtpSent(true);
        setAlert({
          type: "success",
          title: "OTP Sent Successfully!",
          message: response.data.message,
        });
      }
    } catch (err) {
      setAlert({
        type: "error",
        title: "Oops!",
        message: err.response?.data.message || "Failed to send OTP.",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (event) => {
    event.preventDefault();
    if (!otp) {
      setErrors({ otp: "Please enter OTP." });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/users/signup/verify_otp`, {
        email: formData.email,
        otp,
      });
      if (response) {
        console.log(response.data);
        setStep(2);
        setAlert({
          type: "success",
          title: "OTP Verified!",
          message: response.data.message,
        });
      }
    } catch (err) {
      setAlert({
        type: "error",
        title: "Invalid OTP!",
        message: err.response?.data.message || "Invalid OTP.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/users/signup/admin`, formData);
      if (response.status === 201) {
        setAlert({
          type: "success",
          title: "Signup Successful!",
          message: response.data.message,
        });
        navigate("/login");
      }
    } catch (err) {
      setAlert({
        type: "error",
        title: "Signup Failed",
        message: err.response?.data.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      {loading && <LoadingSpinner />}
      {alert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[1000]">
          <AlertBox
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClick={() => setAlert(null)}
          />
        </div>
      )}

      <div className="w-full max-w-lg bg-white rounded-lg p-8 shadow-lg transition-all">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          <CheckCircle className="inline-block text-blue-600 mr-2" />
          Admin Signup
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Complete the form in 4 simple steps.
        </p>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`h-2 w-2 rounded-full transition ${
                  step >= num ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">{step} / 4</span>
        </div>

        <form
          className="space-y-5"
          onSubmit={
            step === 1
              ? otpSent
                ? verifyOtp
                : sendOtp
              : step === 4
              ? handleSubmit
              : nextStep
          }>
          {/* Step 1: Email & OTP */}
          {step === 1 && (
            <>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full pl-10 p-3 border-2 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              {otpSent && (
                <div className="relative mt-4">
                  <Key
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                    size={20}
                  />
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pl-12 p-4 bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
                  />
                </div>
              )}
            </>
          )}

          {/* Step 2: Name */}
          {step === 2 &&
            ["firstName", "lastName"].map((field) => (
              <>
                <div key={field} className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={field === "firstName" ? "First Name" : "Last Name"}
                    className="w-full pl-10 p-3 border-2 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
              </>
            ))}

          {/* Step 3: Mobile */}
          {step === 3 && (
            <>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full pl-10 p-3 border-2 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </>
          )}

          {/* Step 4 - Password */}
          {step === 4 &&
            ["password", "confirmPassword"].map((field, index) => (
              <div key={field} className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={
                    field === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field === "password" ? "Password" : "Confirm Password"}
                  className="w-full pl-10 p-3 border-2 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() =>
                    field === "password"
                      ? setShowPassword((prev) => !prev)
                      : setShowConfirmPassword((prev) => !prev)
                  }>
                  {field === "password" ? (
                    showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )
                  ) : showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </span>
                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
              </div>
            ))}

          {/* Buttons */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            {loading
              ? step === 1
                ? "Sending OTP..."
                : "Processing..."
              : step === 4
              ? "Sign Up"
              : "Next"}
          </button>

          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="w-full py-2 mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg">
              Back
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
