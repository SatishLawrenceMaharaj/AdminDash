"use client";
import React, { useState } from 'react';
import { Bell, User, Lock, Mail, CheckCircle } from 'lucide-react';

function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  const toggleNotifications = () => setNotifications(prev => !prev);
  const toggleEmailUpdates = () => setEmailUpdates(prev => !prev);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-50">Settings</h1>

        {/* User Preferences Section */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">User Preferences</h2>
          <div className="flex items-center mb-4">
            <User className="text-gray-500 dark:text-gray-400 mr-3" />
            <span className="text-gray-700 dark:text-gray-300">Change Username</span>
          </div>
          <div className="flex items-center">
            <Lock className="text-gray-500 dark:text-gray-400 mr-3" />
            <span className="text-gray-700 dark:text-gray-300">Change Password</span>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Notifications</h2>
          <div className="flex items-center mb-4">
            <Bell className={`text-gray-500 dark:text-gray-400 mr-3 ${notifications ? 'text-blue-500' : 'text-gray-500'}`} />
            <span className="text-gray-700 dark:text-gray-300">Enable Notifications</span>
            <button
              onClick={toggleNotifications}
              className={`ml-auto px-4 py-2 rounded ${notifications ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {notifications ? 'Enabled' : 'Disabled'}
            </button>
          </div>
          <div className="flex items-center">
            <Mail className={`text-gray-500 dark:text-gray-400 mr-3 ${emailUpdates ? 'text-blue-500' : 'text-gray-500'}`} />
            <span className="text-gray-700 dark:text-gray-300">Receive Email Updates</span>
            <button
              onClick={toggleEmailUpdates}
              className={`ml-auto px-4 py-2 rounded ${emailUpdates ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {emailUpdates ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>

        {/* Account Details Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Account Details</h2>
          <div className="flex items-center mb-4">
            <CheckCircle className="text-gray-500 dark:text-gray-400 mr-3" />
            <span className="text-gray-700 dark:text-gray-300">Account Status: Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
