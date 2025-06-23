// services/investor.js
import { apiClient } from "./config";

export const apiInvestorProfile = async (userData) => {
  try {
    const response = await apiClient.post('investors/profile', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiGetAllInvestments = async () => {
  try {
    const response = await apiClient.get('/investments');
    // Handle the array response structure
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching marketplace products:', error);
    throw error;
  }
};