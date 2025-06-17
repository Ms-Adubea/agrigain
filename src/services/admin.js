// services/admin.js

export const apiAdminRegister = async (userData) => {
  const res = await apiClient.post('/users/register', userData);
  return res.data;
};

export const apiAdminLogin = async (credentials) => {
  const response = await apiClient.post('/users/signIn', credentials);
  return response.data; // contains { accessToken }
};

// Get all users
export const apiGetAllUsers = async () => {
  const res = await apiClient.get('/admin/users');
  return res.data;
};

// Approve user
export const apiApproveUserStatus = async (userId, status) => {
  return await apiClient.patch(`/admin/users/${userId}/status`, { status });
};

// Change role
export const apiChangeUserRole = async (userId, role) => {
  return await apiClient.patch(`/admin/users/role/${userId}`, { role });
};

// services/admin.js

// GET all projects
export const apiGetAllProjects = async () => {
  const res = await apiClient.get('/admin/projects');
  return res.data;
};

// POST new project
export const apiCreateProject = async (data) => {
  const res = await apiClient.post('/admin/projects', data);
  return res.data;
};

// PATCH update project
export const apiUpdateProject = async (id, data) => {
  const res = await apiClient.patch(`/admin/projects/${id}`, data);
  return res.data;
};

// PATCH archive or delete
export const apiArchiveProject = async (id) => {
  const res = await apiClient.patch(`/admin/projects/${id}/archive`);
  return res.data;
};
