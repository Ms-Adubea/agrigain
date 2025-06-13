import { apiClient } from "./config"


export const apiRegister = async (payload) => {
    return await apiClient.post ( '/users/register', payload)
}
export const apiLogin = async (payload) => {
    return await apiClient.post ( '/users/signin', payload)
}

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
