import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { apiFarmerProfile, apiUpdateFarmerProfile } from '../../services/farmer';

const allowedCrops = ["maize", "rice", "cassava", "yam", "sorghum", "tomato", "tomatoes", "pepper", "onion"];

const FarmerProfileForm = ({ onComplete, existingProfile }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    deliveryAddress: '',
    contactNumber: '',
    farmSize: '',
    cropTypes: '',
    region: '',
    experienceYears: '',
    preferredProduce: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingProfile) {
      setFormData({
        fullName: existingProfile.fullName || '',
        deliveryAddress: existingProfile.deliveryAddress || '',
        contactNumber: existingProfile.contactNumber || '',
        farmSize: existingProfile.farmSize || '',
        cropTypes: existingProfile.cropTypes?.join(', ') || '',
        region: existingProfile.region || '',
        experienceYears: existingProfile.experienceYears || '',
        preferredProduce: existingProfile.preferredProduce?.join(', ') || ''
      });
    }
  }, [existingProfile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cropList = formData.cropTypes
      .split(',')
      .map(crop => crop.trim().toLowerCase())
      .filter(crop => crop);

    const produceList = formData.preferredProduce
      .split(',')
      .map(produce => produce.trim())
      .filter(produce => produce);

    const invalidCrops = cropList.filter(crop => !allowedCrops.includes(crop));
    if (invalidCrops.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Crop Types',
        text: `These crops are not supported: ${invalidCrops.join(', ')}`,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        cropTypes: cropList,
        preferredProduce: produceList,
        experienceYears: parseInt(formData.experienceYears),
      };
      
      const res = existingProfile 
        ? await apiUpdateFarmerProfile(payload)
        : await apiFarmerProfile(payload);
      
      if (res?.data) {
        await Swal.fire(
          'Success', 
          `Profile ${existingProfile ? 'updated' : 'created'} successfully!`, 
          'success'
        );
        onComplete(res.data);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (err) {
      Swal.fire(
        'Error',
        err.response?.data?.message || err.message || `Failed to ${existingProfile ? 'update' : 'create'} profile`,
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {existingProfile ? 'Update' : 'Create'} Farmer Profile
      </h2>
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
          <label className="block mb-1 font-medium">Farm Size</label>
          <input
            type="text"
            name="farmSize"
            value={formData.farmSize}
            onChange={handleChange}
            placeholder="e.g. 5 acres"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Crop Types (comma-separated)</label>
          <input
            type="text"
            name="cropTypes"
            value={formData.cropTypes}
            onChange={handleChange}
            placeholder="e.g. maize, rice, tomato"
            className="w-full p-2 border rounded"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Allowed: {allowedCrops.join(', ')}</p>
        </div>

        <div>
          <label className="block mb-1 font-medium">Preferred Produce (comma-separated)</label>
          <input
            type="text"
            name="preferredProduce"
            value={formData.preferredProduce}
            onChange={handleChange}
            placeholder="e.g. Tomatoes, Yam, Maize"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Region</label>
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
            placeholder="e.g. Northern Region"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Years of Experience</label>
          <input
            type="number"
            name="experienceYears"
            value={formData.experienceYears}
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
          {isSubmitting ? 'Submitting...' : (existingProfile ? 'Update Profile' : 'Create Profile')}
        </button>
      </form>
    </div>
  );
};

export default FarmerProfileForm;