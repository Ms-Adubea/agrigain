// components/BuyerDashboard/BuyerProfile.jsx

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { apiBuyerProfile } from '../../services/buyer';

const BuyerProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    deliveryAddress: '',
    contactNumber: '',
  });
  const [preferredProduce, setPreferredProduce] = useState([]);
  const [inputProduce, setInputProduce] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProduceInput = (e) => {
    setInputProduce(e.target.value);
  };

  const handleProduceKeyDown = (e) => {
    if (e.key === 'Enter' && inputProduce.trim()) {
      e.preventDefault();
      if (!preferredProduce.includes(inputProduce.trim())) {
        setPreferredProduce([...preferredProduce, inputProduce.trim()]);
        setInputProduce('');
      }
    }
  };

  const removeProduce = (item) => {
    setPreferredProduce(preferredProduce.filter((p) => p !== item));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiBuyerProfile({ ...formData, preferredProduce });
      Swal.fire('Success', 'Buyer profile created successfully!', 'success');
      setIsSubmitted(true);
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Failed to create profile', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Buyer Profile</h2>
      {isSubmitted ? (
        <p className="text-green-700 font-semibold">Profile submitted successfully.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Delivery Address</label>
            <input
              type="text"
              name="deliveryAddress"
              value={formData.deliveryAddress}
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
            <label className="block mb-1 font-medium">Preferred Produce</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {preferredProduce.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeProduce(item)}
                    className="ml-1 text-xs text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={inputProduce}
              onChange={handleProduceInput}
              onKeyDown={handleProduceKeyDown}
              placeholder="Type and press Enter"
              className="w-full p-2 border rounded"
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

export default BuyerProfile;