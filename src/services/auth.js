import { apiClient } from "./config"


export const apiRegister = async (payload) => {
    try {
        const response = await apiClient.post('/users/register', payload);
        return response.data;
    } catch (error) {
        // Re-throw the error to be handled by the calling component
        throw error;
    }
};

export const apiLogin = async (payload) => {
    try {
        const response = await apiClient.post('/users/signIn', payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// export const apiSignin = async (payload) => {
//     return await apiClient.post ( '/vendors/login', payload)
// }
// export const apiGetAdverts = async () => {
//     return await apiClient.get ( '/adverts' )
// }
// export const apiPostAdverts = async (payload) => {
//     return await apiClient.post ( '/adverts' )
// }
// export const apiEditAdverts = async (payload) => {
//     return await apiClient.patch ( '/adverts/6718ceea33c080a3aeb00efc' )
// }
