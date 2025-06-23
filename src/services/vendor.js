import { apiClient } from "./config";

export const apiVendorProfile = async (userData) => {
  try {
    const response = await apiClient.post('/vendors/profile', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// services/vendor.js
export const apiAddListing = async (formData) => {
  try {
    const response = await apiClient.post('/assets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding listing:', error);
    throw error;
  }
};

export const apiUpdateListing = async (id, formData) => {
  try {
    const response = await apiClient.patch(`/assets/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating listing:', error);
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

// export const apiGetVendorListings = () => apiClient.get('/assets/me');

// export const apiDeleteListing = (id) => apiClient.delete(`/assets/me/${id}`);

// export const apiUpdateListing = async (id, formData) => {
//     try {
//         const response = await apiClient.patch(`/assets/me/${id}`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         return response;
//     } catch (error) {
//         console.error('Update error:', error);
//         throw error;
//     }
// };

// services/vendor.js
export const apiGetVendorListings = async () => {
  try {
    const response = await apiClient.get('/assets/me');
    // Handle the response structure with count and assets array
    return {
      count: response.data?.count || 0,
      assets: Array.isArray(response.data?.assets) ? response.data.assets : []
    };
  } catch (error) {
    console.error('Error fetching vendor listings:', error);
    throw error;
  }
};

export const apiDeleteListing = async (id) => {
  try {
    const response = await apiClient.delete(`/assets/${assetid}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting listing:', error);
    throw error;
  }
};

// GET  /vendor/orders               // apiGetVendorOrders
// PATCH /vendor/orders/:id/status  // apiUpdateOrderStatus

