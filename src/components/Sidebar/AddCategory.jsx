import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AlertBox from "./AlertBox";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adminId = Cookies.get("adminId");
    const authToken = Cookies.get("adminAuthToken");

    if (!adminId || !authToken) {
      setAlert({
        type: "error",
        title: "Authentication Failed",
        message: "Please log in again.",
      });
      return;
    }

    if (!categoryName.trim()) {
      setAlert({
        type: "error",
        title: "Validation Error",
        message: "Category name is required.",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${apiUrl}/api/products/category/add`,
        { category: categoryName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setAlert({
        type: "success",
        title: "Category Added",
        message: "Successfully added category!",
      });
      setCategoryName("");
    } catch (error) {
      setAlert({ type: "error", title: "Error", message: "Failed to add category." });
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
      {alert && (
        <AlertBox
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClick={() => setAlert(null)}
        />
      )}

      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg border border-gray-300">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Add New Category
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              name="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              className="mt-1 px-4 py-3 w-full border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter category name"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:opacity-90 focus:outline-none ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}>
              {loading ? "Adding..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
