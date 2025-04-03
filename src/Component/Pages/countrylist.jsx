import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addcountry, getcountry, deleteCountry } from "../../Api";

const CountryManagement = () => {
  const [countries, setCountries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCountry, setNewCountry] = useState("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewCountry("");
  };

  const handleAddCountry = async () => {
    try {
      let payload = { country_name: newCountry }
      const data = await addcountry(payload)
      toast.success("Country added successfully!");
      closeModal();
      getCountry();
    }
    catch (error) {
      toast.error(error.message);
    }

  };
  useEffect(() => {
    getCountry();
  }, []);

  const getCountry = async () => {
    try {
      const response = await getcountry();
      console.log("🚀 ~ API Response1111:", response.data.data);
      setCountries(response.data.data);
    } catch (error) {
      console.error("Error fetching getcountry:", error);
    }
  };

  const handleDeleteCountry = async (id) => {
    try {
      await deleteCountry(id);
      toast.success("Country deleted successfully!");
      setCountries((prev) => prev.filter((country) => country.name !== id));
      closeModal();
    } catch (error) {
      toast.error(error.message || "Failed to delete country.");
    }
  };

  return (
    <div className="w-10/12 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Country Management</h2>

      {/* Country Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Sr No</th>
            <th className="border border-gray-300 p-2">Country Name</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country, index) => (
            <tr key={country.id || index} className="text-center">
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{country.name}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleDeleteCountry(country.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Country Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white p-2 rounded-md flex items-center space-x-2 hover:bg-blue-600"
        >
          <FaPlus />
          <span>Add Country</span>
        </button>
      </div>

      {/* Modal for Adding Country */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Country"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-xl font-bold mb-4">Add New Country</h2>
          <input
            type="text"
            name="country_name"
            value={newCountry}
            onChange={(e) => setNewCountry(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
            placeholder="Enter country name"
          />
          <div className="flex justify-end space-x-3">
            <button
              onClick={closeModal}
              className="bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCountry}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            >
              Add
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CountryManagement;
