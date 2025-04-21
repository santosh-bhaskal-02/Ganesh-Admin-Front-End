import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  FileText,
  Layers,
  List,
  Ruler,
  IndianRupee,
  ImageIcon,
  StickyNote,
  Upload,
} from "lucide-react";
import { motion } from "framer-motion";

import AlertBox from "../Error/AlertBox";
import ErrorPage from "../Error/ErrorPage";
import LoadingSpinner from "../Error/LoadingSpinner";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

const AddIdol = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [idolPreview, setIdolPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    stock: 1,
    category: "",
    size: 1,
    price: "",
    description: "",
    image: null,
  });

  const authToken = Cookies.get("adminAuthToken");
  const adminId = Cookies.get("adminId");

  if (!authToken) {
    console.error("No auth token found.");
    return <ErrorPage />;
  }

  useEffect(() => {
    if (!authToken) {
      console.error("No auth token found.");
      return;
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

        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setAlert({
          type: "error",
          title: "Oops!",
          message: "Failed to fetch categories.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData.category);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
    setIdolPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.image) {
      setAlert({ type: "error", title: "Oops!", message: "Please upload an image." });
      setLoading(false);
      return;
    }
    if (!formData.category) {
      setAlert({ type: "error", title: "Oops!", message: "Please select a category." });
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("size", formData.size);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.image);

      await axios.post(`${apiUrl}/api/products/add`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      setAlert({
        type: "success",
        title: "Successful!",
        message: "Idol added successfully.",
      });

      setFormData({
        title: "",
        stock: 1,
        category: "",
        size: 1,
        price: "",
        description: "",
        image: null,
      });
    } catch (error) {
      setAlert({ type: "error", title: "Oops!", message: "Idol not added. Try again." });
      console.error("Error uploading product:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && <LoadingSpinner />}
      <motion.div
        className="min-h-screen bg-gradient-to-br from-yellow-200 via-blue-100 to-blue-200 py-10 px-4 md:px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}>
        {alert && (
          <AlertBox
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClick={() => setAlert(null)}
          />
        )}

        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-yellow-200 p-6 sm:p-8 space-y-6">
          <h2 className="text-4xl font-bold text-center text-purple-800 mb-8 flex items-center justify-center gap-3">
            Add New Idol
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Idol Name */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-yellow-500" />
                Idol Name
              </label>
              <div className="mt-1 flex items-center gap-3 border rounded-lg px-3 py-2 shadow-sm">
                <FileText className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter idol name"
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            {/* Stock */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700">
                <Layers className="w-4 h-4 text-yellow-500" />
                Stock
              </label>
              <div className="mt-1 flex items-center gap-3 border rounded-lg px-3 py-2 shadow-sm">
                <Layers className="w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Stock quantity"
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700">
                <List className="w-4 h-4 text-yellow-500" />
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg px-3 py-2 shadow-sm outline-none"
                required>
                {category.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Size */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700">
                <Ruler className="w-4 h-4 text-yellow-500" />
                Size
              </label>
              <div className="mt-1 flex items-center gap-3 border rounded-lg px-3 py-2 shadow-sm">
                <Ruler className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="Size (inches)"
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700">
                <IndianRupee className="w-4 h-4 text-yellow-500" />
                Price
              </label>
              <div className="mt-1 flex items-center gap-3 border rounded-lg px-3 py-2 shadow-sm">
                <IndianRupee className="w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 font-semibold text-gray-700">
                <StickyNote className="w-4 h-4 text-yellow-500" />
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write idol description..."
                rows="3"
                className="mt-1 w-full border rounded-lg px-3 py-2 shadow-sm outline-none"
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="sm:col-span-2">
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <ImageIcon className="w-4 h-4 text-yellow-500" />
              Idol Image
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 w-full"
              required
            />
            {idolPreview && (
              <img
                src={idolPreview}
                alt="Idol Preview"
                className="mt-3 w-32 h-32 object-cover rounded-lg shadow"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              type="submit"
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-lg font-semibold transition duration-300 ${
                loading
                  ? "bg-yellow-300 text-yellow-800 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg"
              }`}>
              <Upload className="w-5 h-5" />
              {loading ? "Submitting..." : "Add Idol"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddIdol;
