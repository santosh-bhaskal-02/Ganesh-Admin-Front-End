import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AlertBox from "../Error/AlertBox";
import { Pencil, Trash2 } from "lucide-react";
import ErrorPage from "../Error/ErrorPage";
import LoadingSpinner from "../Error/LoadingSpinner";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const authToken = Cookies.get("adminAuthToken");

  if (!authToken) {
    console.error("No auth token found.");
    return <ErrorPage />;
  }

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/products/category/fetch`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!response.data) {
        setAlert({
          type: "error",
          title: "Oops!",
          message: "Something went wrong. Try again.",
        });
        return;
      }
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setAlert({
        type: "error",
        title: "Oops!",
        message: "Failed to fetch categories.",
      });
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      return setAlert({ type: "error", title: "Error", message: "Category is required" });
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/products/category/add`,
        { category: categoryName },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      if (!response) {
        setAlert({
          type: "error",
          title: "Error",
          message: "Category Not added..!",
        });
      }
      setAlert({
        type: "success",
        title: "Added",
        message: "Category added successfully",
      });

      fetchCategory();
    } catch (error) {
      console.log(error);
      setAlert({ type: "error", title: "Error", message: "Action failed" });
    } finally {
      fetchCategory();
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    setEdit(true);
    setLoading(true);
    try {
      const response = await axios.put(
        `${apiUrl}/api/products/category/update/${categoryId}`,
        { category: categoryName },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      if (!response) {
        setAlert({
          type: "error",
          title: "Error",
          message: "Category updation failed..!",
        });
        return;
      }
      setAlert({
        type: "success",
        title: "Updated",
        message: "Category updated successfully",
      });
      setCategoryName("");
      setCategoryId("");
      setEdit(false);
    } catch (error) {
      setAlert({
        type: "error",
        title: "Error",
        message: "Internal server Error..!",
      });
    } finally {
      fetchCategory();
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${apiUrl}/api/products/category/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      if (!response) {
        setAlert({
          type: "error",
          title: "Error",
          message: "Category deletion failed..!",
        });
      }

      setAlert({ type: "success", title: "Deleted", message: "Category deleted" });
      fetchCategory();
    } catch (error) {
      console.error("Delete failed", error);
      setAlert({
        type: "error",
        title: "Error",
        message: "Category deletion failed..!",
      });
    } finally {
      fetchCategory();
      setLoading(false);
    }
  };

  const handleSetEdit = (id, name) => {
    setEdit(true);
    setCategoryName(name);
    setCategoryId(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-yellow-100 flex items-center justify-center px-4 py-10">
      {alert && (
        <AlertBox
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClick={() => setAlert(null)}
        />
      )}

      {loading && <LoadingSpinner />}

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="bg-blue-100 p-6 sm:p-8 rounded-xl shadow-lg border border-blue-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-800">
            {edit ? "Edit Category" : "Add New Category"}
          </h2>
          <form
            onSubmit={edit ? handleEdit : handleSubmit}
            className="space-y-4 sm:space-y-5">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-4 py-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter category name"
            />
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-700 text-white py-3 rounded-lg font-medium shadow-md hover:opacity-90 transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}>
                {edit ? "Update Category" : "Add Category"}
              </button>
            </div>
          </form>
        </div>

        {/* Category List Section */}
        <div className="bg-yellow-50 p-6 sm:p-8 rounded-2xl shadow-xl border border-yellow-200">
          <h3 className="text-2xl font-bold mb-6 text-yellow-800 text-center">
            Category List
          </h3>
          <ul className="space-y-4 max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-300">
            {categories.length === 0 ? (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-sm flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                  />
                </svg>
                <span className="text-sm font-medium">
                  No categories found. Please add a new category to get started.
                </span>
              </div>
            ) : (
              categories.map((cat) => (
                <li
                  key={cat._id}
                  className="flex justify-between items-center bg-white shadow-sm hover:shadow-md border border-yellow-100 px-4 py-3 rounded-xl transition-all duration-200">
                  <span className="text-gray-800 font-medium break-words">
                    {cat.name}
                  </span>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleSetEdit(cat._id, cat.name)}
                      className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-110">
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="text-red-500 hover:text-red-700 transition-transform transform hover:scale-110">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
