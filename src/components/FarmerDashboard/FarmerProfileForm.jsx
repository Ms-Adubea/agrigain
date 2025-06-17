import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { apiFarmerProfile } from '../../services/farmer';

const allowedCrops = ["maize", "rice", "cassava", "yam", "sorghum", "tomato", "pepper", "onion"];

const FarmerProfileForm = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    farmSize: '',
    cropTypes: '',
    region: '',
    experienceYears: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form is submitting...");
//     setIsSubmitting(true);

//     const cropList = formData.cropTypes
//       .split(',')
//       .map(crop => crop.trim().toLowerCase())
//       .filter(crop => crop);

//     // Validate crop types
//     const invalidCrops = cropList.filter(crop => !allowedCrops.includes(crop));
//     if (invalidCrops.length > 0) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Invalid Crop Types',
//         text: `These crops are not supported: ${invalidCrops.join(', ')}`,
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const payload = {
//         ...formData,
//         cropTypes: cropList,
//         experienceYears: parseInt(formData.experienceYears),
//       };

// console.log("Sending payload:", payload);

//       const res = await apiFarmerProfile(payload);
//       setProfile(res.data);
//       Swal.fire('Success', 'Profile created successfully!', 'success');
//     } catch (err) {
//       Swal.fire('Error', err.response?.data?.message || 'Failed to create profile', 'error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form is submitting...");
  setIsSubmitting(true);

  const cropList = formData.cropTypes
    .split(',')
    .map(crop => crop.trim().toLowerCase())
    .filter(crop => crop);

  // Validate crop types
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
      experienceYears: parseInt(formData.experienceYears),
    };

    console.log("Sending payload:", payload);
    
    // Add debugging for the API call
    const res = await apiFarmerProfile(payload);
    console.log("API Response:", res); // Debug the full response
    
    // Check if response has expected structure
    if (res && res.data) {
      setProfile(res.data);
      Swal.fire('Success', 'Profile created successfully!', 'success');
    } else {
      console.error("Unexpected response structure:", res);
      throw new Error("Invalid response structure");
    }
  } catch (err) {
    console.error("Full error object:", err);
    console.error("Error response:", err.response);
    console.error("Error message:", err.message);
    
    // More detailed error handling
    let errorMessage = 'Failed to create profile';
    if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    Swal.fire('Error', errorMessage, 'error');
  } finally {
    setIsSubmitting(false);
  }
};

  const goToDashboard = () => {
    if (onComplete) onComplete();
  };

  if (profile) {
    return (
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold mb-2">Profile Created</h2>
        <p><strong>Farm Size:</strong> {profile.farmSize}</p>
        <p><strong>Crop Types:</strong> {profile.cropTypes.join(', ')}</p>
        <p><strong>Region:</strong> {profile.region}</p>
        <p><strong>Experience:</strong> {profile.experienceYears} years</p>

        <button
          onClick={goToDashboard}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Farmer Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="e.g. 3"
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

export default FarmerProfileForm;
