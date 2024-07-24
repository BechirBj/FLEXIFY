// src/pages/Profile.tsx
import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Profile</h2>

        {/* Profile Information */}
        <div className="bg-white p-6 shadow-md rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-4">Profile Information</h3>
          <div className="space-y-4">
            <div>
              <span className="font-semibold">Name:</span> John Doe
            </div>
            <div>
              <span className="font-semibold">Email:</span> johndoe@example.com
            </div>
          </div>
        </div>

        {/* Goals and Preferences */}
        <div className="bg-white p-6 shadow-md rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-4">Goals and Preferences</h3>
          <p>Set your fitness goals and app preferences here.</p>
        </div>

        {/* Logout Button */}
        <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
