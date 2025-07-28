"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import NewNavbar from './NewNavbar';
import navbarConfig from './navbarConfig';
import { getUserRole, getUserData, getUserName, getUserEmail, getAuthToken, isDummyUser } from '../../utils/localStorage';

const NavbarWrapper = () => {

  const { user, userRole, token, isDummyUser: isDummyFromState, loading } = useSelector((state) => state.auth);

  // Get data from localStorage as fallback
  const role = userRole || getUserRole();
  const localToken = getAuthToken();
  const localUser = getUserData();
  const isDummy = isDummyFromState || isDummyUser();
  const userData = user || localUser;

  // Only authenticated if both token and user exist
  const isAuthenticated = (token && user) || (localToken && localUser);

  // Prevent rendering until auth state is loaded
  if (loading) return null; // or a spinner if you want

  // Get navbar configuration based on user role
  const config = navbarConfig.getNavbarConfig(role, isAuthenticated, isDummy);

  // Populate user info if authenticated
  if (isAuthenticated) {
    const fallbackUserData = {
      fullName: getUserName() || (isDummy ? `${role?.toUpperCase()} User (Demo)` : `${role?.toUpperCase()} User`),
      email: getUserEmail() || `${role}@example.com`,
      role: role || 'USER'
    };
    config.userInfo = {
      name: userData?.fullName || userData?.name || fallbackUserData.fullName,
      fullName: userData?.fullName || userData?.name || fallbackUserData.fullName,
      email: userData?.email || fallbackUserData.email,
      role: userData?.role || role || 'USER',
      isDummyUser: isDummy
    };
  }

  return (
    <NewNavbar navItems={config.navItems} userInfo={config.userInfo} />
  );
};

export default NavbarWrapper;
