import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import Cookies from "js-cookie";
import LoadingSpinner from "../Error/LoadingSpinner";

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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-yellow-600 mb-6 border-b pb-2">
        Custom Suggestions
      </h2>

      <div className="space-y-4">
        {formList.map((form) => (
          <div
            key={form._id}
            className="p-5 bg-yellow-50 rounded-xl flex justify-between items-center shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Left Info */}
            <div className="flex items-center gap-5">
              {/* Photo */}
              {form.thumbnail?.image_url ? (
                <img
                  src={form.thumbnail.image_url}
                  alt="custom-idol"
                  className="w-20 h-20 rounded-xl object-cover border"
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
                  {`${form.user._id.toUpperCase()}`}
                </p>
              </div>
            </div>

            {/* View Button */}
            <button
              onClick={() => navigate(`/dashboard/custom-idol/${form._id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md transition-colors">
              <Eye className="w-4 h-4" />
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomFormList;
