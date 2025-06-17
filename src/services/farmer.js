
// export const apiFarmerProfile = async (userData) => {
//   try {
//     const response = await apiClient.post('/farmers/profile', userData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const apiFarmerProfile = async (userData) => {
  try {
    console.log("API function triggered");
    const response = await apiClient.post('/farmers/profile', userData);
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};


export const apiGetFarmerProfile = async (payload) => {
    return await apiClient.get( '/farmers/profile')
}

export const apiAddProduce = async (userData) => {
  try {
    const response = await apiClient.post('/produce', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiGetUserProduce = async () => {
    return await apiClient.get('/produce')
};

export const apiDeleteProduce = async (id) => {
    return await apiClient.delete(`/produce/${id}`)
};

export const apiUpdateProduce = async (id, formData) => {
    try {
        const response = await apiClient.patch(`/produce/${id}`, formData, {
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