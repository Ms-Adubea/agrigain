// services/investor.js

export const apiInvestorProfile = async (userData) => {
  try {
    const response = await apiClient.post('investors/profile', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};