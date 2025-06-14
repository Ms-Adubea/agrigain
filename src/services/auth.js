import { apiClient } from "./config"


// export const apiRegister = async (payload) => {
//     try {
//         const response = await apiClient.post('/users/register', payload);
//         return response.data;
//     } catch (error) {
//         // Re-throw the error to be handled by the calling component
//         throw error;
//     }
// };

// export const apiLogin = async (payload) => {
//     try {
//         const response = await apiClient.post('/users/signIn', payload);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };


// Login function
export const apiLogin = async (credentials) => {
  try {
    const response = await apiClient.post('/users/signIn', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Register function
export const apiRegister = async (userData) => {
  try {
    const response = await apiClient.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};