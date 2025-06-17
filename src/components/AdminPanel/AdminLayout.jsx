// components/Admin/AdminLayout.jsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          navigate(`/admin/${tab}`);
        }}
        onLogout={() => {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }}
      />

      {/* <main className="flex-1 bg-gray-100 p-6 overflow-y-auto"> */}
       <main className="flex-1 bg-gray-50 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;