import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { apiFarmerProfile, apiGetFarmerProfile, apiUpdateFarmerProfile } from '../../services/farmer';

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
  const [existingProfile, setExistingProfile] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  // Check for existing profile on component mount
  useEffect(() => {
    checkExistingProfile();
  }, []);

  const checkExistingProfile = async () => {
    try {
      const response = await apiGetFarmerProfile();
      if (response && response.data) {
        console.log('Existing profile found:', response.data);
        setExistingProfile(response.data);
        setIsUpdateMode(true);
        
        // Pre-populate form with existing data
        setFormData({
          farmSize: response.data.farmSize || '',
          cropTypes: Array.isArray(response.data.cropTypes) 
            ? response.data.cropTypes.join(', ') 
            : response.data.cropTypes || '',
          region: response.data.region || '',
          experienceYears: response.data.experienceYears?.toString() || '',
        });

        // If profile is complete, notify parent immediately
        if (response.data.farmSize && response.data.cropTypes && response.data.region && response.data.experienceYears) {
          if (onComplete) {
            onComplete();
          }
        }
      }
    } catch (error) {
      console.log('No existing profile found, will create new one');
      setIsUpdateMode(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form is submitting...", { isUpdateMode });
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
      
      let res;
      if (isUpdateMode) {
        // Use update API if it exists, otherwise try create
        try {
          res = await apiUpdateFarmerProfile(payload);
          console.log("Update API Response:", res);
        } catch (updateError) {
          console.log("Update failed, trying create:", updateError);
          res = await apiFarmerProfile(payload);
          console.log("Create API Response:", res);
        }
      } else {
        res = await apiFarmerProfile(payload);
        console.log("Create API Response:", res);
      }
      
      if (res && res.data) {
        setProfile(res.data);
        await Swal.fire('Success', 
          isUpdateMode ? 'Profile updated successfully!' : 'Profile created successfully!', 
          'success'
        );
        
        // Call onComplete immediately after successful profile creation/update
        if (onComplete) {
          onComplete();
        }
      } else {
        console.error("Unexpected response structure:", res);
        throw new Error("Invalid response structure");
      }
    } catch (err) {
      console.error("Full error object:", err);
      
      // Handle "profile already exists" error specifically
      if (err.response?.data?.message?.includes('already exists')) {
        console.log("Profile exists, switching to update mode");
        setIsUpdateMode(true);
        await checkExistingProfile();
        
        Swal.fire({
          title: 'Profile Found',
          text: 'Your profile already exists. You can update it using the form below.',
          icon: 'info'
        });
      } else {
        let errorMessage = 'Failed to save profile';
        if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.message) {
          errorMessage = err.message;
        }
        
        Swal.fire('Error', errorMessage, 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const skipToProfile = () => {
    if (existingProfile && onComplete) {
      onComplete();
    }
  };

  // If we have a complete existing profile, show option to continue
  if (existingProfile && !isUpdateMode) {
    return (
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold mb-2">Profile Already Exists</h2>
        <p><strong>Farm Size:</strong> {existingProfile.farmSize}</p>
        <p><strong>Crop Types:</strong> {
          Array.isArray(existingProfile.cropTypes) 
            ? existingProfile.cropTypes.join(', ') 
            : existingProfile.cropTypes
        }</p>
        <p><strong>Region:</strong> {existingProfile.region}</p>
        <p><strong>Experience:</strong> {existingProfile.experienceYears} years</p>

        <div className="flex gap-4">
          <button
            onClick={skipToProfile}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Continue to Dashboard
          </button>
          <button
            onClick={() => setIsUpdateMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {isUpdateMode ? 'Update Farmer Profile' : 'Create Farmer Profile'}
      </h2>
      
      {isUpdateMode && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-blue-700 text-sm">
            You're updating your existing profile. Modify any fields you want to change.
          </p>
        </div>
      )}

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

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting 
              ? 'Saving...' 
              : isUpdateMode 
                ? 'Update Profile' 
                : 'Create Profile'
            }
          </button>

          {existingProfile && (
            <button
              type="button"
              onClick={skipToProfile}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Skip to Dashboard
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FarmerProfileForm;