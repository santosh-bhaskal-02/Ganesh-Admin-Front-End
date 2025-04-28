import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import Cookies from "js-cookie";

import { motion } from "framer-motion";
import SkeletonCustomForm from "../../Skeleton/SkeletonCustomForm";
import NoCustomFormList from "./NoCustomForm";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function CustomFormList() {
  const [formList, setFormList] = useState([]);
  const [loading, setLoading] = useState(true);
  const authToken = Cookies.get("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/custom-idol/fetch-list`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setFormList(response.data.result || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="p-6 bg-white-50 rounded-2xl max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 border-b-2 pb-2">
        Custom Suggestions
      </h2>

      {loading ? (
        <div className="p-6 max-w-5xl mx-auto space-y-4">
          {[...Array(4)].map((_, idx) => (
            <SkeletonCustomForm key={idx} />
          ))}
        </div>
      ) : formList.length === 0 ? (
        <NoCustomFormList />
      ) : (
        <div className="space-y-4">
          {formList.map((form, index) => (
            <motion.div
              key={form._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-5 bg-blue-50 rounded-xl flex justify-between items-center shadow-md hover:shadow-xl transition-all duration-300">
              {/* Left Info */}
              <div className="flex items-center gap-5">
                {/* Photo */}
                {form.thumbnail?.image_url ? (
                  <img
                    src={form.thumbnail.image_url}
                    alt="custom-idol"
                    className="w-20 h-20 rounded-xl object-cover border shadow"
                  />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center bg-gray-100 border rounded-xl text-gray-400 text-sm">
                    No Image
                  </div>
                )}

                {/* Text Info */}
                <div className="space-y-1 text-gray-700">
                  <p className="font-semibold">
                    <span className="text-yellow-600">Suggestion:</span> {form.suggestion}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Height:</span> {form.size}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">User:</span>{" "}
                    {form.user?.firstName
                      ? `${form.user.firstName} ${form.user.lastName}`
                      : "N/A"}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">User Id:</span>{" "}
                    {form.user?._id?.toUpperCase()}
                  </p>
                </div>
              </div>

              {/* View Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/dashboard/custom-idol/${form._id}`)}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-xl shadow transition">
                <Eye className="w-5 h-5" />
                View
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomFormList;
