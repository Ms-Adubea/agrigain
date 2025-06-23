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
    
    // Handle both possible response structures
    if (Array.isArray(response.data)) {
      return response.data; // If API returns array directly
    } else if (response.data?.produce) {
      return response.data.produce; // If API returns { produce: [...] }
    }
    
    return []; // Default fallback
  } catch (error) {
    console.error('Error fetching all produce:', error);
    throw error;
  }
};

export const apiMakeOrder = async (userData) => {
  try {
    const response = await apiClient.post('/orders', userData);
    return response.data;
  } catch (error) {
    console.error("Add produce failed:", error);
    throw error;
  }
};

export const apiGetMarketplaceProducts = async () => {
  try {
    const response = await apiClient.get('/assets');
    // Handle the array response structure
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching marketplace products:', error);
    throw error;
  }
};