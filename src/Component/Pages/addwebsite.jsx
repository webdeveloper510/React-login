import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa"; // Import icons

const countries = [
  "United States", "United Kingdom", "Germany", "France", "India", "Canada", "Australia"
];

const AddWebsite = () => {
  const [formData, setFormData] = useState({
    url: "",
    country: "",
    serviceProvider: "",
    fields: [], // List of additional fields
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Website added successfully!");
  };

  // Add new field
  const addField = () => {
    setFormData({
      ...formData,
      fields: [...formData.fields, { label: "", type: "", value: "" }],
    });
  };

  // Update a specific field
  const handleFieldChange = (index, e) => {
    const updatedFields = [...formData.fields];
    updatedFields[index][e.target.name] = e.target.value;
    setFormData({ ...formData, fields: updatedFields });
  };

  // Remove a field
  const removeField = (index) => {
    const updatedFields = formData.fields.filter((_, i) => i !== index);
    setFormData({ ...formData, fields: updatedFields });
  };

  return (
    <div className="w-10/12 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Website</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
                {/* Country Dropdown */}
                <div>
          <label className="block text-gray-700">Country:</label>
          <select
            name="country"
            value={formData.country}
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
            name="serviceProvider"
            value={formData.serviceProvider}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="Enter Service Provider"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full btn_submit"
        >
          Submit
        </button>

        {/* Dynamic List Fields */}
        <div className="mt-6 addtional_sec">
          <h3 className="text-xl font-semibold mb-2">Additional Fields</h3>

          {formData.fields.map((field, index) => (
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