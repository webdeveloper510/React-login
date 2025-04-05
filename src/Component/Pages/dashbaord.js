import React from "react";
import "../css/dashboard.css";

const Dashboard = () => {
  const dummyData = [
    {
      title: "Modern Wedding Venue",
      description: "A beautiful venue for weddings and receptions.",
      price: "$1,200",
      external_url: "https://example.com/venue/1",
      media: "https://via.placeholder.com/100"
    },
    {
      title: "Rustic Farmhouse",
      description: "Perfect for countryside weddings.",
      price: null, // Optional
      external_url: null, // Optional
      media: "https://via.placeholder.com/100"
    },
    {
      title: "Urban Rooftop",
      description: "A stylish rooftop venue in the city.",
      price: "$1,800",
      external_url: "https://example.com/venue/3",
      media: "https://via.placeholder.com/100"
    }
  ];

  return (
    <div className="w-10/12 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Added Records</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="border border-gray-300 p-2">Sr No</th>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">External URL</th>
              <th className="border border-gray-300 p-2">Media</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((venue, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{venue.title}</td>
                <td className="border border-gray-300 p-2">{venue.description}</td>
                <td className="border border-gray-300 p-2">
                  {venue.price || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {venue.external_url ? (
                    <a
                      href={venue.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Visit
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  {venue.media ? (
                    <img src={venue.media} alt="Media" className="w-20 h-auto mx-auto" />
                  ) : (
                    "No Media"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
