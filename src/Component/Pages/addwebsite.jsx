import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { addWebsite } from "../../Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const countries = [
  "United States", "United Kingdom", "Germany", "France", "India", "Canada", "Australia"
];

const AddWebsite = () => {
  const [formData, setFormData] = useState({
    url: "",
    country_name: "",
    finance_name: "",
    extra_fields: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await addWebsite({
        url: formData.url,
        country_name: formData.country_name,
        finance_name: formData.finance_name,
        extra_fields: formData.extra_fields,
      });

      console.log("Website added successfully:", response);

      if (response.status === 201) {
        toast.success("Website added successfully!");
        setFormData({
          url: "",
          country_name: "",
          finance_name: "",
          extra_fields: [],
        });
      } 
    } catch (err) {
      console.error("Submission error:", err);
      
      if (err.response?.status === 500) {
        const errorMessage = err.response?.data?.message || "Invalid request. Please check your input.";
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        setError("Failed to add website. Please try again.");
        toast.error("Failed to add website. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const addField = () => {
    setFormData((prev) => ({
      ...prev,
      extra_fields: [...prev.extra_fields, { label: "", type: "", value: "" }],
    }));
  };

  const handleFieldChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFields = [...prev.extra_fields];
      updatedFields[index] = {
        ...updatedFields[index],
        [name]: value,
      };
      return {
        ...prev,
        extra_fields: updatedFields,
      };
    });
  };

  const removeField = (index) => {
    setFormData((prev) => ({
      ...prev,
      extra_fields: prev.extra_fields.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="w-10/12 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Website</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Country:</label>
          <select
            name="country_name"
            value={formData.country_name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* URL Input */}
        <div>
          <label className="block text-gray-700">Website URL:</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="https://example.com"
          />
        </div>

        {/* Service Provider Input */}
        <div>
          <label className="block text-gray-700">Service Provider Name:</label>
          <input
            type="text"
            name="finance_name"
            value={formData.finance_name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="Enter Service Provider"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-500 text-white p-2 rounded-md w-full btn_submit ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        {/* Dynamic List Fields */}
        <div className="mt-6 addtional_sec">
          <h3 className="text-xl font-semibold mb-2">Additional Fields</h3>

          {formData.extra_fields.map((field, index) => (
            <div key={index} className="flex items-center space-x-2 mb-3">
              <input
                type="text"
                name="label"
                placeholder="Label"
                value={field.label}
                onChange={(e) => handleFieldChange(index, e)}
                className="w-1/3 p-2 border rounded-md"
              />
              <input
                type="text"
                name="type"
                placeholder="Type"
                value={field.type}
                onChange={(e) => handleFieldChange(index, e)}
                className="w-1/3 p-2 border rounded-md"
              />
              <input
                type="text"
                name="value"
                placeholder="Value"
                value={field.value}
                onChange={(e) => handleFieldChange(index, e)}
                className="w-1/3 p-2 border rounded-md"
              />
              <button
                type="button"
                onClick={() => removeField(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))}

          {/* Add Field Button */}
          <button
            type="button"
            onClick={addField}
            className="flex items-center space-x-2 text-green-500 font-semibold mt-2"
          >
            <FaPlus />
            <span>Add Field</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWebsite;
