import axios from "axios";

export const API_URL = "https://loanai.askgig.com";

export const addWebsite = async (websiteData) => {
  try {
    const response = await axios.post(`${API_URL}/add-loan-url`, {
      country_name: websiteData.country_name,
      url: websiteData.url,
      finance_name: websiteData.finance_name,
      extra_fields: websiteData.extra_fields.map(field => ({
        label: field.label,
        type: field.type,
        value: field.value
      }))
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
    console.log("🚀 ~ getWebsites ~ response:", response)
    return response.data;
   
  } catch (error) {
    console.error("Error fetching websites:", error);
    return error;
  }
};
