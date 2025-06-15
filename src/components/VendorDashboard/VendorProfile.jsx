// components/VendorDashboard/VendorProfile.jsx

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { apiVendorProfile } from '../../services/vendor';

const VendorProfile = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessAddress: '',
    contactNumber: '',
    registrationNumber: '',
    businessType: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiVendorProfile(formData);
      Swal.fire('Success', 'Vendor profile created!', 'success');
      setIsSubmitted(true);
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Failed to create profile', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Vendor Profile</h2>
      {isSubmitted ? (
        <p className="text-green-700 font-semibold">Profile successfully submitted.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Business Address</label>
            <input
              type="text"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Business Type</label>
            <input
              type="text"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
};

export default VendorProfile;