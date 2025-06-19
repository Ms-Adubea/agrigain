import { apiClient } from "./config";

export const apiBuyerProfile = async (userData) => {
  try {
    const response = await apiClient.post('/buyers/profile', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// services/farmer.js
export const apiGetAllProduce = async () => {
  try {
    const response = await apiClient.get('/produce');
    // Ensure we always return an array
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching all produce:', error);
    throw error;
  }
};