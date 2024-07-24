// src/pages/Settings.tsx
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>

        {/* Notification Settings */}
        <div className="bg-white p-6 shadow-md rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-4">Notification Settings</h3>
          <p>Manage your email or push notifications here.</p>
        </div>

        {/* Account Management */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-bold mb-4">Account Management</h3>
          <p>Change password, delete account, and more.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
