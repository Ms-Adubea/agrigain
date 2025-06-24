import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiApplyToInvest } from '../../services/investor'; // Make sure this is correctly implemented

const InvestmentApplication = () => {
  const { id } = useParams(); // The investment ID from route param
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    principal: '',
    paymentMethod: 'mobile_money',
    paymentDetails: {
      mobileNumber: '',
      mobileName: ''
    },
    nextOfKin: '',
    contactDetails: {
      phone: '',
      email: '',
      address: ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields
    if (name.startsWith('paymentDetails.')) {
      setFormData(prev => ({
        ...prev,
        paymentDetails: {
          ...prev.paymentDetails,
          [name.split('.')[1]]: value
        }
      }));
    } else if (name.startsWith('contactDetails.')) {
      setFormData(prev => ({
        ...prev,
        contactDetails: {
          ...prev.contactDetails,
          [name.split('.')[1]]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await apiApplyToInvest(id, formData);
      setMessage(response.message || 'Application submitted successfully!');
      setTimeout(() => navigate('/dashboard/investor'), 2000); // redirect after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Apply for Investment</h2>

      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Principal Amount (USD)</label>
          <input
            type="number"
            name="principal"
            value={formData.principal}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="mobile_money">Mobile Money</option>
            {/* Extend if needed */}
          </select>
        </div>

        <div>
          <label className="block font-medium">Mobile Name</label>
          <input
            type="text"
            name="paymentDetails.mobileName"
            value={formData.paymentDetails.mobileName}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Mobile Number</label>
          <input
            type="text"
            name="paymentDetails.mobileNumber"
            value={formData.paymentDetails.mobileNumber}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Next of Kin</label>
          <input
            type="text"
            name="nextOfKin"
            value={formData.nextOfKin}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            name="contactDetails.phone"
            value={formData.contactDetails.phone}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="contactDetails.email"
            value={formData.contactDetails.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            name="contactDetails.address"
            value={formData.contactDetails.address}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Submitting...' : 'Apply'}
        </button>
      </form>
    </div>
  );
};

export default InvestmentApplication;
