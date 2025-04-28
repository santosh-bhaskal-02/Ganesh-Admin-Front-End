import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ErrorPage from "../../../Error/ErrorPage";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function AddAddress() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState({});
  const [addressDetails, setAddressDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const authToken = Cookies.get("adminAuthToken");

  if (!userId || !authToken) {
    console.error("User is not authenticated. Missing token or userId.");
    return <ErrorPage />;
  }

  useEffect(() => {
    async function fetchAddress() {
      try {
        const response = await axios.post(
          `${apiUrl}/api/users/signup/address/${userId}`,

          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            credentials: "include",
          }
        );
        console.log(response.data);
        if (response.status === 200) {
          if (!response.data.address) {
          }
          setAddressDetails(response.data.address);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchAddress();
  }, []);

  const handleChange = (event) => {
    //console.log(event.target.name, " , ",event.target.value);
    const { name, value } = event.target;
    console.log(value);

    setAddressDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateAddress = () => {
    let fNameError = "";
    let lNameError = "";
    let emailError = "";
    let phoneError = "";
    let address1Error = "";
    let cityError = "";
    let stateError = "";
    let zipError = "";
    let countryError = "";

    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]{10}$/;
    console.log("trim", !addressDetails.firstName.trim());
    if (!addressDetails.firstName) {
      fNameError = "Please Enter your First Name.";
    }

    if (!addressDetails.lastName) {
      lNameError = "Please Enter your Last Name.";
    }

    if (!addressDetails.email || !emailRegex.test(addressDetails.email)) {
      emailError = "Please enter a valid email address.";
    }

    if (!addressDetails.phone || !phoneRegex.test(addressDetails.phone)) {
      phoneError = "Please enter a valid 10-digit phone number.";
    }

    if (!addressDetails.address1) {
      address1Error = "Please Enter your Address Line1.";
    }

    if (!addressDetails.city) {
      cityError = "Please Enter your City Name.";
    }

    if (!addressDetails.state) {
      stateError = "Please Enter your State Name.";
    }

    if (!addressDetails.zip) {
      zipError = "Please Enter your zip code.";
    }

    //if (!addressDetails.country) {
    //countryError = "Please select Country Name.";
    //}

    if (
      fNameError ||
      lNameError ||
      emailError ||
      phoneError ||
      address1Error ||
      cityError ||
      stateError ||
      zipError ||
      countryError
    ) {
      setErrors({
        fName: fNameError,
        lName: lNameError,
        email: emailError,
        phone: phoneError,
        address1: address1Error,
        city: cityError,
        state: stateError,
        zip: zipError,
        country: countryError,
      });
      return false;
    }
    return true;
  };

  const addAddress = async (event) => {
    event.preventDefault();
    //console.log("1",event);
    if (!validateAddress()) {
      return;
    }
    console.log("1", addressDetails);
    setLoading(!loading);
    try {
      const response = await axios.post(`${apiUrl}/api/users/signup/add_address/${userId}`, {
        addressDetails,
        header: {
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
      });
      //  console.log(response.data);
      if (response.status == 200) {
        alert("Address Added Successfully");
        navigate(`/dashboard/users/user/${userId}`);
        return;
      }
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setAddressDetails({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address1: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    });
    setErrors({});
  };

  const handleBack = () => {
    navigate(`/dashboard/users/user/${userId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center space-x-2 px-6 py-4 bg-blue-50 border-b border-gray-200">
          <button
            onClick={handleBack}
            className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowBackIosNewRoundedIcon fontSize="small" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>

        {/* Form Section */}
        <div className="px-6 py-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Address Information
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Use a permanent address where you can receive orders.
          </p>

          <form className="space-y-6" onSubmit={addAddress}>
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={handleChange}
                  value={addressDetails.firstName}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                />
                {error.fName && (
                  <p className="text-red-500 text-sm mt-1">{error.fName}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  value={addressDetails.lastName}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                />
                {error.lName && (
                  <p className="text-red-500 text-sm mt-1">{error.lName}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={addressDetails.email}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              />
              {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone No.
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                onChange={handleChange}
                value={addressDetails.phone}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              />
              {error.phone && <p className="text-red-500 text-sm mt-1">{error.phone}</p>}
            </div>

            {/* Address Fields */}
            <div>
              <label
                htmlFor="address1"
                className="block text-sm font-medium text-gray-700">
                Address Line 1
              </label>
              <input
                type="text"
                id="address1"
                name="address1"
                onChange={handleChange}
                value={addressDetails.address1}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              />
              {error.address1 && (
                <p className="text-red-500 text-sm mt-1">{error.address1}</p>
              )}
            </div>

            {/* City and State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  onChange={handleChange}
                  value={addressDetails.city}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                />
                {error.city && <p className="text-red-500 text-sm mt-1">{error.city}</p>}
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  onChange={handleChange}
                  value={addressDetails.state}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                />
                {error.state && (
                  <p className="text-red-500 text-sm mt-1">{error.state}</p>
                )}
              </div>
            </div>

            {/* ZIP and Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                  ZIP / Postal Code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  onChange={handleChange}
                  value={addressDetails.zip}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                />
                {error.zip && <p className="text-red-500 text-sm mt-1">{error.zip}</p>}
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  onChange={handleChange}
                  value={addressDetails.country}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500">
                  <option value="" disabled>
                    Select Country
                  </option>
                  <option value="India">India</option>
                </select>
                {error.country && (
                  <p className="text-red-500 text-sm mt-1">{error.country}</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="reset"
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-red-500 hover:text-white transition">
                Clear
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-lg text-white ${
                  loading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700"
                }`}>
                {!loading ? "Submit" : "Saving..."}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
