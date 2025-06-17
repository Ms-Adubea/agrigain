import { apiClient } from "./config";

export const apiVendorProfile = async (userData) => {
  try {
    const response = await apiClient.post('/vendors/profile', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiAddListing = async (userData) => {
  try {
    const response = await apiClient.post('/assets', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// services/vendor.js
export const apiGetMarketplaceProducts = async () => {
  try {
    const response = await apiClient.get('/assets');
    // Ensure we always return an array
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching marketplace products:', error);
    throw error;
  }
};

export const apiGetVendorListings = () => apiClient.get('/assets/me');

export const apiDeleteListing = (id) => apiClient.delete(`/assets/me/${id}`);

export const apiUpdateListing = async (id, formData) => {
    try {
        const response = await apiClient.patch(`/assets/me/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error('Update error:', error);
        throw error;
    }
};

// GET  /vendor/orders               // apiGetVendorOrders
// PATCH /vendor/orders/:id/status  // apiUpdateOrderStatus

