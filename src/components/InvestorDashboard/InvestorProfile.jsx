// components/InvestorDashboard/InvestorProfile.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { apiInvestorProfile } from '../../services/investor';

const InvestorProfile = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    investmentFocus: '',
    contactEmail: '',
    phone: '',
    portfolioSize: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await apiInvestorProfile(formData);
      Swal.fire('Success', 'Investor profile created successfully!', 'success');
      setProfile(response.profile);
      setIsSubmitted(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Failed to create profile', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && profile) {
    return (
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Profile Summary</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li><strong>Company Name:</strong> {profile.companyName}</li>
          <li><strong>Investment Focus:</strong> {profile.investmentFocus}</li>
          <li><strong>Contact Email:</strong> {profile.contactEmail}</li>
          <li><strong>Phone:</strong> {profile.phone}</li>
          <li><strong>Portfolio Size:</strong> {profile.portfolioSize}</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Investor Company Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
            placeholder="GreenGrowth Capital"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Investment Focus</label>
          <textarea
            name="investmentFocus"
            placeholder="Sustainable Agriculture and Climate Solutions"
            value={formData.investmentFocus}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            placeholder="investor@greengrowth.com"
            value={formData.contactEmail}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="+1234567890"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Portfolio Size</label>
          <input
            type="text"
            name="portfolioSize"
            placeholder="50M+ USD"
            value={formData.portfolioSize}
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
    </div>
  );
};

export default InvestorProfile;