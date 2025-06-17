// components/Admin/UserManagementTable.jsx
import React, { useEffect, useState } from 'react';
import { apiGetAllUsers, apiApproveUserStatus, apiChangeUserRole } from '../../services/admin';
import Swal from 'sweetalert2';

const UserManagementTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await apiGetAllUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to load users.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await apiApproveUserStatus(userId, 'approved');
      Swal.fire('Approved', 'User status updated', 'success');
      fetchUsers();
    } catch (err) {
      Swal.fire('Error', 'Failed to approve user.', 'error');
    }
  };

  const handleChangeRole = async (userId) => {
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
      inputPlaceholder: 'Select role',
      showCancelButton: true,
    });

    if (role) {
      try {
        await apiChangeUserRole(userId, role);
        Swal.fire('Updated', 'User role changed successfully', 'success');
        fetchUsers();
      } catch (err) {
        Swal.fire('Error', 'Failed to change role.', 'error');
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="min-w-full bg-white border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-2 border">{user.firstName} {user.lastName}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border capitalize">{user.role}</td>
                <td className="p-2 border capitalize">{user.status}</td>
                <td className="p-2 border space-x-2">
                  {user.status !== 'approved' && (
                    <button
                      onClick={() => handleApprove(user.id)}
                      className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleChangeRole(user.id)}
                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Change Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagementTable;