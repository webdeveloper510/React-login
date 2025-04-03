import axios from "axios";

export const API_URL = "https://loanai.askgig.com";

export const addWebsite = async (websiteData) => {
  try {
    const response = await axios.post(`${API_URL}/add-loan-url`, {
      ...websiteData
    });
    return response.data;
  } catch (error) {
    console.error("Error adding website:", error);
    return error;
  }
};

export const getWebsites = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-admin-data`);
    console.log("🚀 ~ getWebsites ~ response:", response.data);   
    return response.data;
  } catch (error) {
    console.error("Error fetching websites:", error);
    return { status: "error", data: [] }; 
  }
};
export const addcountry = async (countryData) => {
  try {
    const response = await axios.post(`${API_URL}/add-country`,countryData );
    return response;
  } catch (error) {
    console.error("Error adding country:", error);
    return error;
  }
};

export const getcountry = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-country-data`,getcountry);
    console.log("🚀 ~ getcountry ~ response:", response)
    return response;
   
  } catch (error) {
    console.error("Error fetching getcountry:", error);
    return error;
  }
};
export const deleteCountry = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-country/${id}/`,);
    console.log("🚀 ~ deleteCountry ~ response:", response);
    return response;
  } catch (error) {
    console.error(
      "Error deleting country:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};