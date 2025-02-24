import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AlertBox from "./AlertBox";
import { useNavigate, useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

const Addidol = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const { pid } = useParams();
  const [imageSrc, setImageSrc] = useState("");
  const [idol, setIdol] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    stock: 1,
    category: "",
    size: 1,
    price: "",
    reachDisciption: "",
    image: null,
    image_url: "",
  });

  useEffect(() => {
    const fetchIdolDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/products/${pid}`);
        if (response.status === 200) {
          setFormData((prev) => ({
            ...prev,
            ...response.data,
            image_url: response.data.thumbnail?.image_url || "",
            category: response.data.category.id,
          }));
          setImageSrc(response.data.thumbnail?.image_url || "fallback-image.jpg");
        }
      } catch (err) {
        console.error("Error fetching idol details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (pid) fetchIdolDetails();
  }, [pid]);

  useEffect(() => {
    const fetchCategory = async () => {
      const authToken = Cookies.get("adminAuthToken");
      if (!authToken) {
        console.error("No auth token found.");
        return;
      }

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

        if (response.data) setCategory(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setAlert({
          type: "error",
          title: "Oops!",
          message: "Failed to fetch categories.",
        });
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const authToken = Cookies.get("adminAuthToken");
    const adminId = Cookies.get("adminId");

    if (!adminId || !authToken) {
      setAlert({
        type: "error",
        title: "Oops!",
        message: "Authentication failed. Please log in again.",
      });
      setLoading(false);
      return;
    }

    /*if (!formData.image) {
      setAlert({ type: "error", title: "Oops!", message: "Please upload an image." });
      setLoading(false);
      return;
    }*/

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("size", formData.size);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.reachDisciption);

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      } else {
        formDataToSend.append("image_url", formData.image_url);
      }

      console.log(formDataToSend.get("category"));
      console.log(formDataToSend.get("title"));

      const response = await axios.put(
        `${apiUrl}/api/products/update/${pid}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log(response.data);
      setAlert({
        type: "success",
        title: "Successful!",
        message: response.data.message,
      });

      setFormData((prev) => ({
        ...prev,
        ...response.data.updatedProduct,
        image_url: response.data.updatedProduct.thumbnail?.image_url || "",
        category: response.data.updatedProduct.category.id,
      }));
    } catch (error) {
      setAlert({
        type: "error",
        title: "Oops!",
        message: "Idol not updated. Try again.",
      });
      console.error("Error uploading product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${apiUrl}/api/products/delete/${pid}`);

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      {alert && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-[1000]">
          <AlertBox
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClick={() => setAlert(null)}
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-300 relative">
        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition flex items-center gap-1">
          <Trash2 size={20} />
          Delete
        </button>

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Edit Idol Details
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Idol Name</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 px-4 py-3 w-full border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter idol name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="mt-1 px-4 py-3 w-full border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter stock quantity"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 px-4 py-3 w-full border rounded-lg shadow-sm">
                <option value="">Select Category</option>
                {category.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Size (1 - 25 feet)
              </label>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
                className="mt-1 px-4 py-3 w-full border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
                {[...Array(25)].map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1} feet
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-1 px-4 py-3 w-full border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Add Description
              </label>
              <textarea
                name="description"
                value={formData.reachDisciption}
                onChange={handleChange}
                required
                className="mt-1 px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none"
                placeholder="Enter description"
              />
            </div>
          </div>

          <div className="space-y-6">
            <img
              src={formData.image_url}
              alt="thumbnail"
              className="aspect-square w-full rounded-md bg-gray-200 object-cover lg:aspect-auto lg:h-80"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                className="mt-1 px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none"
              />
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:opacity-90 focus:outline-none">
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addidol;
