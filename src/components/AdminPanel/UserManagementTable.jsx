// components/Admin/UserManagementTable.jsx
import React, { useEffect, useState } from 'react';
import { apiGetAllUsers, apiApproveUserStatus, apiChangeUserRole } from '../../services/admin';
import Swal from 'sweetalert2';

const UserManagementTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    role: '',
    status: '',
    search: ''
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await apiGetAllUsers();
      setUsers(data);
    } catch (err) {
      console.error('Fetch users error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Failed to load users',
        text: err.response?.data?.message || 'Please try again later',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      const result = await Swal.fire({
        title: 'Confirm Approval',
        text: 'Are you sure you want to approve this user?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, approve',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        await apiApproveUserStatus(userId, 'approved');
        Swal.fire('Approved!', 'User status has been updated.', 'success');
        fetchUsers();
      }
    } catch (err) {
      console.error('Approve user error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Failed to approve user',
        text: err.response?.data?.message || 'Please try again later',
      });
    }
  };

  const handleChangeRole = async (userId, currentRole) => {
    try {
      const { value: role } = await Swal.fire({
        title: 'Change User Role',
        input: 'select',
        inputOptions: {
          buyer: 'Buyer',
          farmer: 'Farmer',
          vendor: 'Vendor',
          investor: 'Investor',
          admin: 'Admin',
        },
        inputValue: currentRole,
        inputPlaceholder: 'Select new role',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to select a role!';
          }
        }
      });

      if (role) {
        const result = await Swal.fire({
          title: 'Confirm Role Change',
          text: `Change user role to ${role}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, change it',
          cancelButtonText: 'No, cancel'
        });

        if (result.isConfirmed) {
          await apiChangeUserRole(userId, role);
          Swal.fire('Changed!', 'User role has been updated.', 'success');
          fetchUsers();
        }
      }
    } catch (err) {
      console.error('Change role error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Failed to change role',
        text: err.response?.data?.message || 'Please try again later',
      });
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const filteredUsers = users.filter(user => {
    return (
      (filter.role === '' || user.role === filter.role) &&
      (filter.status === '' || user.status === filter.status) &&
      (filter.search === '' || 
       user.email.toLowerCase().includes(filter.search.toLowerCase()) ||
       `${user.firstName} ${user.lastName}`.toLowerCase().includes(filter.search.toLowerCase()))
    );
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button 
          onClick={fetchUsers}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Search</label>
            <input
              type="text"
              name="search"
              value={filter.search}
              onChange={handleFilterChange}
              placeholder="Search by name or email"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              name="role"
              value={filter.role}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="">All Roles</option>
              <option value="buyer">Buyer</option>
              <option value="farmer">Farmer</option>
              <option value="vendor">Vendor</option>
              <option value="investor">Investor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={filter.status}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilter({ role: '', status: '', search: '' })}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-2">Loading users...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600">
                              {user.firstName?.charAt(0) || ''}{user.lastName?.charAt(0) || ''}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.phone || 'No phone'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                            user.role === 'farmer' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${user.status === 'approved' ? 'bg-green-100 text-green-800' :
                            user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {user.status !== 'approved' && (
                            <button
                              onClick={() => handleApprove(user.id)}
                              className="text-green-600 hover:text-green-900"
                              title="Approve User"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => handleChangeRole(user.id, user.role)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Change Role"
                          >
                            Change Role
                          </button>
                          {user.status === 'approved' && (
                            <button
                              onClick={() => handleApprove(user.id, 'suspended')}
                              className="text-red-600 hover:text-red-900"
                              title="Suspend User"
                            >
                              Suspend
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No users found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementTable;