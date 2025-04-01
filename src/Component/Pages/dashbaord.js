import React, { useState, useEffect } from "react";
import { getWebsites } from "../../Api";

const Dashboard = () => {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await getWebsites();
        console.log("🚀 ~ API Response:", response);

        if (response?.status === "success" && Array.isArray(response.data)) {
          setWebsites(response.data);
        } else {
          console.error("Invalid API response format", response);
        }
      } catch (error) {
        console.error("Error fetching websites:", error);
      }
    };

    fetchWebsites();
  }, []);

  return (
    <div className="w-10/12 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Submitted Websites</h2>

      {websites.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Sr No</th>
              <th className="border border-gray-300 p-2">Country</th>
              <th className="border border-gray-300 p-2">URL</th>
              <th className="border border-gray-300 p-2">Service Provider</th>
              <th className="border border-gray-300 p-2">Custom Data</th>
            </tr>
          </thead>
          <tbody>
            {websites.map((website, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{website.country_name}</td>
                <td className="border border-gray-300 p-2">
                  <a
                    href={website.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {website.website_url}
                  </a>
                </td>
                <td className="border border-gray-300 p-2">
                  {website.finance_company_name?.company_name || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {website.finance_company_name?.custom_data?.length > 0 ? (
                    <ul className="text-left">
                      {website.finance_company_name.custom_data.map((item, idx) => (
                        <li key={idx} className="text-sm">
                          <strong>{item.key}</strong>: {item.value}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No Custom Data"
                  )}
                </td>
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
