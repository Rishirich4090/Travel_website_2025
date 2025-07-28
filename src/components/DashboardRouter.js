"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import SuperAdminDashboard from './dashboards/SuperAdminDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import UserDashboard from './dashboards/UserDashboard';
import { getUserRole, isDummyUser } from '../utils/localStorage';
import useAuth from '../hooks/useAuth';

const DashboardRouter = () => {
  // Use auth hook to ensure proper authentication state
  const authHook = useAuth(true); // Require authentication
  const { userRole, user, isDummyUser: isDummyFromState } = useSelector((state) => state.auth);
  
  // Get role from localStorage as fallback
  const role = userRole || getUserRole() || 'USER';
  const isDummy = isDummyFromState || isDummyUser();

  console.log('DashboardRouter - Role:', role, 'isDummy:', isDummy, 'authLoading:', authHook.loading);

  // Show loading while auth is being checked
  if (authHook.loading || !authHook.isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Block settings page for non-real-admins (superadmin, user, dummy admin)
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin/settings')) {
    if (role?.toUpperCase() !== 'ADMIN' || isDummy) {
      // Redirect to dashboard if not real admin
      window.location.replace('/dashboard');
      return null;
    }
  }

  switch (role?.toUpperCase()) {
    case 'SUPERADMIN':
      return <SuperAdminDashboard isDummyUser={isDummy} />;
    case 'ADMIN':
      return <AdminDashboard isDummyUser={isDummy} />;
    case 'USER':
    default:
      return <UserDashboard isDummyUser={isDummy} />;
  }
};

export default DashboardRouter;
