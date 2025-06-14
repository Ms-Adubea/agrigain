// components/FarmerDashboard/FarmerProfileForm.jsx

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { apiFarmerProfile } from '../../services/farmer';


const FarmerProfileForm = () => {
  const [formData, setFormData] = useState({
    farmName: '',
    farmLocation: '',
    farmSize: '',
    mainProduce: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiFarmerProfile(formData);
      Swal.fire('Success', 'Profile created successfully!', 'success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Failed to create profile', 'error');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Farmer Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="farmName"
          placeholder="Farm Name"
          value={formData.farmName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="farmLocation"
          placeholder="Farm Location"
          value={formData.farmLocation}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="farmSize"
          placeholder="Farm Size (e.g. 5 hectares)"
          value={formData.farmSize}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="mainProduce"
          placeholder="Main Produce (e.g. Tomatoes)"
          value={formData.mainProduce}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FarmerProfileForm;
