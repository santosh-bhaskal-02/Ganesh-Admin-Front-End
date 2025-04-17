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
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import DialogBox from "../Error/DialogBox";
import AlertBox from "../Error/AlertBox";
import ErrorPage from "../Error/ErrorPage";
import LoadingSpinner from "../Error/LoadingSpinner";
import { useParams, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

const EditIdol = () => {
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    stock: 1,
    category: "",
    size: 1,
    price: "",
    description: "",
    image: null,
  });
  const [idolPreview, setIdolPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const authToken = Cookies.get("adminAuthToken");
  const { idolId } = useParams();
  const navigate = useNavigate();

  if (!authToken) return <ErrorPage />;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, idolRes] = await Promise.all([
          axios.get(`${apiUrl}/api/products/category/fetch`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          axios.get(`${apiUrl}/api/products/${idolId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
        ]);

        setCategory(categoryRes.data);
        const idol = idolRes.data;

        setFormData({
          title: idol.title,
          stock: idol.stock,
          category: idol.category,
          size: idol.size,
          price: idol.price,
          description: idol.description,
          image: null,
        });
        console.log(idol);
        setIdolPreview(idol.thumbnail.image_url);
      } catch (error) {
        console.error("Error fetching data:", error);
        setAlert({
          type: "error",
          title: "Oops!",
          message: "Failed to fetch idol or category data.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idolId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    setIdolPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    //e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("size", formData.size);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      if (formData.image) formDataToSend.append("image", formData.image);

      await axios.put(`${apiUrl}/api/products/update/${idolId}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setAlert({
        type: "success",
        title: "Updated!",
        message: "Idol updated successfully.",
      });

      setTimeout(() => navigate("/dashboard/idols"), 2000);
    } catch (error) {
      console.error("Update failed:", error);
      setAlert({
        type: "error",
        title: "Oops!",
        message: "Failed to update idol.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`${apiUrl}/api/products/delete/${idolId}`);

      console.log(response.data);
      if (!response) {
        setAlert({
          type: "error",
          title: "Oops!",
          message: "Failed to delete the product.",
        });
      }
      setAlert({
        type: "success",
        title: "Successful!",
        message: response.data.message,
      });
      setLoading(false);
      navigate("/dashboard/idols");
    } catch (error) {
      console.error("Error deleting product:", error);
      setAlert({
        type: "error",
        title: "Oops!",
        message: "Idol not Deleted. Try again.",
      });
    }
  };
  return (
    <div>
      {loading && <LoadingSpinner />}
      <motion.div
        className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-white py-10 px-4 md:px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}>
        <AnimatePresence>
          {alert && (
            <AlertBox
              type={alert.type}
              title={alert.title}
              message={alert.message}
              onClick={() => setAlert(null)}
            />
          )}

          {!alert && showDialog && (
            <motion.div
              key="dialog"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 flex justify-center items-center bg-black/40 z-[999]">
              <DialogBox
                open={showDialog}
                onClose={() => setShowDialog(false)}
                onConfirm={handleDelete}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div
          //onSubmit={handleUpdate}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
          <h2 className="text-3xl font-extrabold text-yellow-500 mb-6 text-center">
            Edit Idol
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <FormInput
              icon={<FileText />}
              label="Idol Name"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter idol name"
            />
            <FormInput
              icon={<Layers />}
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock quantity"
            />
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700">
                <List className="w-4 h-4 text-yellow-500" />
                Category
              </label>
              <select
                name="category"
                value={formData.category.id}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg px-3 py-2 shadow-sm outline-none"
                required>
                <option value="">Select a category</option>
                {category.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <FormInput
              icon={<Ruler />}
              label="Size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="Size (inches)"
            />
            <FormInput
              icon={<IndianRupee />}
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
            />
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
            />
            {idolPreview && (
              <div className="mt-4">
                <img
                  src={idolPreview}
                  alt="Idol Preview"
                  className="w-64 h-80 object-cover rounded-2xl shadow-lg border border-yellow-300 transition duration-300 hover:scale-105"
                />
              </div>
            )}
          </div>

          <div className="pt-4">
            <div className="pt-4 flex gap-4">
              {/* Delete Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowDialog(true)} // Show the dialog on delete button click
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-lg font-semibold bg-red-500 hover:bg-red-600 text-white shadow-lg">
                <Trash2 className="w-5 h-5" />
                Delete
              </motion.button>

              {/* Update Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleUpdate}
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-lg font-semibold transition duration-300 ${
                  loading
                    ? "bg-yellow-300 text-yellow-800 cursor-not-allowed"
                    : "bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg"
                }`}>
                <Upload className="w-5 h-5" />
                {loading ? "Updating..." : "Update Idol"}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dialog for delete confirmation */}
      {showDialog && (
        <motion.div
          key="dialog"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 flex justify-center items-center bg-black/40 z-[999]">
          <DialogBox
            open={showDialog}
            onClose={() => setShowDialog(false)}
            onConfirm={handleDelete}
          />
        </motion.div>
      )}
    </div>
  );
};

const FormInput = ({ icon, label, ...props }) => (
  <div>
    <label className="flex items-center gap-2 font-semibold text-gray-700">
      {React.cloneElement(icon, { className: "w-4 h-4 text-yellow-500" })}
      {label}
    </label>
    <div className="mt-1 flex items-center gap-3 border rounded-lg px-3 py-2 shadow-sm">
      {React.cloneElement(icon, { className: "w-4 h-4 text-gray-400" })}
      <input {...props} className="w-full outline-none" required />
    </div>
  </div>
);

export default EditIdol;
