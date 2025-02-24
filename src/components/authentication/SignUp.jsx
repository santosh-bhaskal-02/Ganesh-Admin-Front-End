import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
//import "./signup.css";
const apiUrl = import.meta.env.VITE_BACK_END_URL;

const SignupForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName:"",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/api/users/signup/admin`, formData);

      if (response.status === 201) {
        console.log(response.data);
        alert(response.data.message);
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
      console.error("Error ", err.response);
    }

    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
       
          {step === 1 && (
            <div className="space-y-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="First Name"
                required
              />

              <input
                type="text"
                name="lastName"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Last Name"
                required
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Mobile Number"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Email"
                required
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-[#008080]  text-white rounded-md"
                >
                  Next
                </button>
              </div>
            </div>
          )}


          {step === 2 && (
            <div className="space-y-4">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="New Password"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Confirm Password"
                required
              />
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#008080]  text-white rounded-md"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}

  
          <div className="mt-4 text-center">
            <p>
              Do you have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
