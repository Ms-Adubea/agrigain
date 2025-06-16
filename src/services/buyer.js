export const apiBuyerProfile = async (userData) => {
  try {
    const response = await apiClient.post('/buyers/profile', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};