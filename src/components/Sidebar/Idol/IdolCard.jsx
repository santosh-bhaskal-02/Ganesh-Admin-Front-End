import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { IdolContext } from "../../Context/IdolContext";
import { useNavigate } from "react-router-dom";
import { Pencil, Eye, X } from "lucide-react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function IdolCard({ id, thumbnail, title, category, price }) {
  const { setIdolId } = useContext(IdolContext);
  const navigate = useNavigate();
  const [idol, setIdol] = useState(null);
  const [imageSrc, setImageSrc] = useState("");

  const editIdol = () => {
    navigate(`/dashboard/edit-idol/${id}`);
  };

  const handleViewMore = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/api/products/${id}`);
      if (response.status === 200) {
        setIdol(response.data);
        setImageSrc(response.data.thumbnail?.image_url || "fallback-image.jpg");
      }
      setIdolId(id);
    } catch (err) {
      console.error("Error fetching idol details:", err);
    }
  };

  const closeModal = () => setIdol(null);

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      <div className="border border-gray-200 bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
        <img
          src={thumbnail}
          alt={title}
          className="aspect-square w-full rounded-xl object-cover bg-gray-100 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="flex flex-col items-center mt-4 text-center">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-yellow-600 transition">
            {title}
          </h3>
          <p className="text-gray-500 mt-1 text-sm">{category}</p>
          <p className="font-semibold text-lg text-yellow-600 mt-1">₹ {price}</p>
          <div className="flex gap-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-yellow-500 transition"
              onClick={editIdol}>
              <Pencil size={16} /> Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-sky-700 transition"
              onClick={() => handleViewMore(id)}>
              <Eye size={16} /> View
            </motion.button>
          </div>
        </div>
      </div>

      {idol && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-2xl max-w-2xl w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition">
              <X size={24} />
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src={imageSrc}
                  alt={idol.title}
                  className="w-full max-w-xs rounded-xl shadow-lg object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  onError={() => setImageSrc("fallback-image.jpg")}
                />
              </div>
              <div className="w-full md:w-1/2 space-y-3 text-gray-700">
                <h1 className="text-2xl font-bold">{idol.title}</h1>
                <p className="text-sm text-gray-500">
                  {idol.category?.name} | Size: {idol.size}
                </p>
                <p className="text-xl text-red-600 font-semibold">₹ {idol.price}</p>
                <p className="text-sm text-red-500">Limited Stock Available</p>
                <p className="text-sm">{idol.reachDisciption}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-semibold">Quantity:</span>
                  <div className="px-3 py-1 border rounded-md text-lg">{idol.stock}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default IdolCard;
