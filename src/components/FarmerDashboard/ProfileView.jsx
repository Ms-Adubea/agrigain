// components/FarmerDashboard/ProfileView.js
import React from 'react';

const ProfileView = ({ profile, onEdit }) => {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
        <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold mb-4">Your Farmer Profile</h2>
        <button
          onClick={onEdit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Your Farmer Profile</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
          <p><strong>Full Name:</strong> {profile.fullName}</p>
          <p><strong>Contact Number:</strong> {profile.contactNumber}</p>
          <p><strong>Delivery Address:</strong> {profile.deliveryAddress}</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Farm Information</h3>
          <p><strong>Farm Size:</strong> {profile.farmSize}</p>
          <p><strong>Experience:</strong> {profile.experienceYears} years</p>
          <p><strong>Region:</strong> {profile.region}</p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-lg mb-2">Crops & Produce</h3>
        <div className="flex flex-wrap gap-2"> Crop Type =
          {profile.cropTypes?.map((crop, index) => (
            <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {crop}
            </span>
          ))}
        </div>
        <div className="mt-2">
          <p><strong>Preferred Produce:</strong></p>
          <div className="flex flex-wrap gap-2 mt-1">
            {profile.preferredProduce?.map((produce, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {produce}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;