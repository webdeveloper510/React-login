import React, { useState } from "react";

const Dashboard = () => {
  // Sample data for the table
  const [websites, setWebsites] = useState([
    {
      country: "United States",
      url: "https://example.com",
      serviceProvider: "GoDaddy",
    },
    {
      country: "India",
      url: "https://example.in",
      serviceProvider: "Hostinger",
    },
    {
      country: "Germany",
      url: "https://example.de",
      serviceProvider: "Bluehost",
    },
  ]);

  return (
    <div className="w-10/12 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Submitted Websites</h2>

      {/* Table to Display Submitted Websites */}
      {websites.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Sr No</th>
              <th className="border border-gray-300 p-2">Country</th>
              <th className="border border-gray-300 p-2">URL</th>
              <th className="border border-gray-300 p-2">Service Provider</th>
            </tr>
          </thead>
          <tbody>
            {websites.map((website, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{website.country}</td>
                <td className="border border-gray-300 p-2">
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {website.url}
                  </a>
                </td>
                <td className="border border-gray-300 p-2">{website.serviceProvider}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center">No websites added yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
