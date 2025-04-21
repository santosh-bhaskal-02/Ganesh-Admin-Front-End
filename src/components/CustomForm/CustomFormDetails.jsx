import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingSpinner from "../Error/LoadingSpinner";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function CustomFormDetails() {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/custom-idol/fetch-list/${formId}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        console.log(response.data);
        setForm(response.data.result);
      } catch (err) {
        console.log(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFormDetails();
  }, [formId]);

  if (loading) return <LoadingSpinner />;

  if (!form) return <p className="text-red-500">Form not found.</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-yellow-600 mb-6 border-b pb-2">
        Suggestion Details
      </h2>

      {/* Suggestion Info */}
      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-semibold text-gray-800">Suggestion:</span>{" "}
          {form.suggestion}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Height:</span> {form.size} ft
        </p>
        <p>
          <span className="font-semibold text-gray-800">Specifications:</span>{" "}
          {form.otherSpecifications}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Created At:</span>{" "}
          {new Date(form.createdDate).toLocaleString()}
        </p>
      </div>

      {/* Thumbnail Image */}
      {form.thumbnail?.image_url && (
        <div className="mt-6">
          <img
            src={form.thumbnail.image_url}
            alt="Custom Idol"
            className="rounded-lg border shadow-md w-full max-w-md object-cover"
          />
        </div>
      )}

      {/* User Info */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border text-gray-700">
        <h3 className="text-lg font-semibold text-yellow-700 mb-2">User Information</h3>
        <p>
          <span className="font-medium">Name:</span> {form.user?.firstName}{" "}
          {form.user?.lastName}
        </p>
        <p>
          <span className="font-medium">Email:</span> {form.user?.email}
        </p>
        <p>
          <span className="font-medium">Phone:</span> {form.user?.phone}
        </p>
        <p>
          <span className="font-medium">User ID:</span> {form.user?.id?.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

export default CustomFormDetails;
