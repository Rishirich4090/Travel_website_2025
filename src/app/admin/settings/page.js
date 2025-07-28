'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import ThemeTab from './tabs/ThemeTab';
import LandingTab from './tabs/LandingTab';
import WebsiteTab from './tabs/WebsiteTab';
import DestinationTab from './tabs/DestinationTab';

const AdminSettings = () => {
  const searchParams = useSearchParams();
  // Get user info from Redux (auth state)
  const { user, userRole, isDummyUser } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'theme');

  // Handle tab change from URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['theme', 'landing', 'website'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Only allow real admin to see settings
  const isRealAdmin = userRole === 'ADMIN' && isDummyUser !== true;

  const tabs = isRealAdmin ? [
    { id: 'theme', label: 'Theme Settings', icon: '🎨' },
    { id: 'landing', label: 'Landing Page', icon: '📱' },
    { id: 'website', label: 'Website Settings', icon: '⚙️' },
    { id: 'destination', label: 'Destinations', icon: '🌍' }
  ] : [];

  if (!isRealAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8 w-[77vw]">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10 flex flex-col justify-between px-4 py-5 sm:px-6 sm:flex-row sm:items-center sm:gap-8 bg-white rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Admin Settings</h1>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 max-w-3xl">
                Manage your application settings and configurations
              </p>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
                >
                  <option>Current Workspace</option>
                  <option>Personal</option>
                  <option>Team</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8 sm:mb-10">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6 overflow-x-auto pb-px scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center transition-all duration-200 ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <span className={`mr-2 ${activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'}`}>
                    {tab.icon}
                  </span>
                  {tab.label}
                  {tab.notification && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {tab.notification}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Optional Tab-Specific Header */}
          <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              {tabs.find(t => t.id === activeTab)?.icon && (
                <span className="mr-2 text-gray-500">
                  {tabs.find(t => t.id === activeTab)?.icon}
                </span>
              )}
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'theme' && <ThemeTab />}
            {activeTab === 'landing' && <LandingTab />}
            {activeTab === 'website' && <WebsiteTab />}
            {activeTab === 'destination' && <DestinationTab />}
          </div>
        </div>

        {/* Footer Help Section */}
        <div className="mt-8 text-center sm:text-left">
          <div className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
            <svg className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Need help with settings? <a href="#" className="ml-1 text-blue-600 hover:text-blue-800">Contact support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
