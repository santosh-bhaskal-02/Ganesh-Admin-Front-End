import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleSubmit = (e) => {
    e.preventDefault();
   
     
    const [errors, setErrors] = useState({});
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setSignUpData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    function validate() {
      let emailError = "";
      let passwordError = "";
      let confirmPasswordError = "";
  
      const emailRegex = /\S+@\S+\.\S+/;
  
      if (!signUpData.email || !emailRegex.test(signUpData.email)) {
        emailError = "Please enter a valid email address.";
      }
      if (!signUpData.password || signUpData.password.length < 6) {
        passwordError = "Password must be at least 6 characters long.";
      }
      if (signUpData.password !== signUpData.confirmPassword) {
        confirmPasswordError = "Passwords do not match.";
      }
  
      if (emailError || passwordError || confirmPasswordError) {
        setErrors({
          email: emailError,
          password: passwordError,
          confirmPassword: confirmPasswordError,
        });
        return false;
      }
  
      return true;
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!validate()) return;
      setLoading(true);
  
      const { email, password } = signUpData;
      const payload = { email, password };
  
      try {
        console.log("Request payload:", payload);
        const response = await axios.put(
          `${apiUrl}/api/users/login/resetPassword`,
          payload
        );
  
        console.log("Server response:", response);
        if (response.status === 200) {
          alert("Password updated successfully!");
          navigate("/login");
        }
      } catch (err) {
        console.error("Error occurred:", err);
        const errorMessage =
          err.response?.data?.message || "Something went wrong. Please try again.";
        alert(errorMessage);
      } finally {
        setLoading(false);
      }
    };
  

  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Forgot Password
        </h2>
        {isSubmitted ? (
          <div className="text-center text-green-500">
            <p>
              An email has been sent to {email} with instructions to reset your
              password.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Reset Link
            </button>
          </form>
        )}
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Remembered your password?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
