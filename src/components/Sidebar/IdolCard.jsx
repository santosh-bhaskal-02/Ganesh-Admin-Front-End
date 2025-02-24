import React, { useContext, useState } from "react";
import { IdolContext } from "../Context/IdolContext";
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
    navigate(`/dashboard/edit_Idol/${id}`);
  };

  const handleViewMore = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/api/products/${id}`);
      if (response.status === 200) {
        setIdol(response.data);
      }
      setImageSrc(response.data.thumbnail?.image_url || "fallback-image.jpg");
    } catch (err) {
      console.error("Error fetching idol details:", err);
    }
    setIdolId(id);
  };

  const closeModal = () => {
    setIdol(null);
  };

  return (
    <div className="group relative">
      <div className="border border-gray-300 p-6 hover:shadow-lg transition duration-200 ease-in-out rounded-lg">
        <img
          src={thumbnail}
          alt="thumbnail"
          className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        />
        <div className="flex flex-col items-center mt-4">
          <h3 className="font-semibold text-lg mt-4 text-gray-800 hover:text-gray-900 cursor-pointer">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-500">{category}</p>
          <p className="font-bold text-lg text-gray-900">₹ {price}</p>
          <div className="flex gap-2 mt-4">
            <button
              className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={editIdol}>
              <Pencil size={16} /> Edit
            </button>
            <button
              className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => handleViewMore(id)}>
              <Eye size={16} /> View
            </button>
          </div>
        </div>
      </div>

      {idol && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-2xl w-full transform transition-transform duration-300 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800">
              <X size={24} />
            </button>
            <div className="flex flex-col md:flex-row rounded-lg p-6 space-y-6 md:space-y-0 md:space-x-6">
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src={imageSrc}
                  alt={idol.title}
                  className="w-full md:w-80 rounded-lg shadow-md transform hover:scale-105 transition duration-300"
                  loading="lazy"
                  onError={() => setImageSrc("fallback-image.jpg")}
                />
              </div>

              <div className="w-full md:w-1/2 space-y-4">
                <h1 className="text-2xl font-bold text-gray-800">{idol.title}</h1>
                <p className="text-gray-500 text-sm">
                  {idol.category?.name} | Size: {idol.size}
                </p>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-semibold text-red-600">
                    ₹ {idol.price}
                  </span>
                </div>
                <p className="text-sm text-red-500 font-semibold">
                  Limited Stock Available
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {idol.reachDisciption}
                </p>
                <div className="flex items-center space-x-4">
                  <span className="font-semibold">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
                    <span className="text-lg">{idol.stock}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IdolCard;
