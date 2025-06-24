import { apiClient } from "./config";

export const apiFarmerProfile = async (userData) => {
  try {
    console.log("Making API call to /farmers/profile with data:", userData);
    const response = await apiClient.post('/farmers/profile', userData);
    console.log("API call successful:", response);
    return response.data; // Return response.data as expected
  } catch (error) {
    console.error("API call failed:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    throw error;
  }
};

export const apiGetFarmerProfile = async () => {
  try {
    const response = await apiClient.get('/farmers/profile');
    console.log("Get farmer profile response:", response);
    return {
      data: response.data
    };
  } catch (error) {
    console.error("Get farmer profile failed:", error);
    throw error;
  }
};


export const apiAddProduce = async (userData) => {
  try {
    const response = await apiClient.post('/produce', userData);
    return response.data;
  } catch (error) {
    console.error("Add produce failed:", error);
    throw error;
  }
};

export const apiGetUserProduce = async () => {
  try {
    console.log("Fetching user produce from /produce/me");
    const response = await apiClient.get('/produce/me');
    console.log("Get user produce response:", response);
    console.log("Response data:", response.data);
    return response.data; // Make sure to return response.data consistently
  } catch (error) {
    console.error("Get user produce failed:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers
    });
    throw error;
  }
};

export const apiDeleteProduce = async (id) => {
  try {
    const response = await apiClient.delete(`/produce/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete produce failed:", error);
    throw error;
  }
};

export const apiUpdateProduce = async (id, formData) => {
  try {
    console.log("Updating produce with ID:", id, "Data:", formData);
    const response = await apiClient.patch(`/produce/${id}`, formData, {
      headers: {
        'Content-Type': 'application/json', // Changed from multipart/form-data since you're sending JSON
      },
    });
    console.log("Update produce response:", response);
    return response.data;
  } catch (error) {
    console.error('Update produce failed:', error);
    console.error("Error details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    throw error;
  }
};

// services/farmer.js
export const apiUpdateFarmerProfile = async (profileData) => {
  try {
    const response = await apiClient.put('/farmers/profile', profileData);
    return {
      data: response.data
    };
  } catch (error) {
    console.error("Update farmer profile failed:", error);
    throw error;
  }
};