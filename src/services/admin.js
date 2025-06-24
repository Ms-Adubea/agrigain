// services/admin.js
import { apiClient } from "./config";

export const apiAdminRegister = async (userData) => {
  const res = await apiClient.post('/users/register', userData);
  return res.data;
};

export const apiAdminLogin = async (credentials) => {
  const response = await apiClient.post('/users/signIn', credentials);
  return response.data; // contains { accessToken }
};

// services/admin.js
export const apiGetAllUsers = async () => {
  try {
    // Note: The documentation shows email/password in body but this is unusual for GET requests
    // Typically authentication would be via headers (Bearer token)
    const response = await apiClient.get('/admin/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error.response?.data || error.message);
    throw error;
  }
};

export const apiApproveUserStatus = async (userId, status) => {
  try {
    const response = await apiClient.patch(`/admin/users/${userId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating status for user ${userId}:`, error.response?.data || error.message);
    throw error;
  }
};

export const apiChangeUserRole = async (userId, role) => {
  try {
    const response = await apiClient.patch(`/admin/users/role/${userId}`, { role });
    return response.data;
  } catch (error) {
    console.error(`Error changing role for user ${userId}:`, error.response?.data || error.message);
    throw error;
  }
};

// services/admin.js

// GET all projects
export const apiGetAllProjects = async () => {
  const res = await apiClient.get('/investments');
  return res.data;
};

// POST new project
export const apiCreateProject = async (data) => {
  const res = await apiClient.post('/admin/investments', data);
  return res.data;
};

// PATCH update project
export const apiUpdateProject = async (id, data) => {
  const res = await apiClient.patch(`/admin/investments/${id}`, data);
  return res.data;
};

// PATCH archive or delete
export const apiDeleteProject = async (id) => {
  const res = await apiClient.delete(`/admin/investments/${id}`);
  return res.data;
};

