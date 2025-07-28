"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { logout } from "../redux/slice/authSlice";
import { getPublicColorTheme } from '../redux/slice/publicApiSlice';
import { selectTheme } from "../redux/slice/themeSlice";
import { showToast } from "./Toast";
import { isDummyUser as checkIsDummyUser } from "../utils/localStorage";
import ResponsiveSidebar from "./ResponsiveSidebar";

const DynamicNavbar = ({ navItems = [], userInfo = null, showSearch = false, title = "Weeky Travel" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useSelector((state) => state.publicApi.colorTheme);
  
    useEffect(() => {
      dispatch(getPublicColorTheme());
    }, [dispatch]);
  const { isDummyUser: isDummyFromState } = useSelector((state) => state.auth);
  
  const isDummy = isDummyFromState || checkIsDummyUser();
  
  const handleLogout = () => {
    dispatch(logout());
    router.replace("/");
  };

  const isActiveLink = (href) => {
    return pathname === href || (href !== '/' && pathname.startsWith(href));
  };

  const getRoleBadgeColor = (role) => {
    const baseColors = {
      'SUPERADMIN': 'bg-red-100 text-red-800',
      'ADMIN': 'bg-blue-100 text-blue-800', 
      'USER': 'bg-green-100 text-green-800'
    };
    
    if (isDummy) {
      return `${baseColors[role?.toUpperCase()] || 'bg-gray-100 text-gray-800'} border-2 border-dashed border-yellow-400`;
    }
    
    return baseColors[role?.toUpperCase()] || 'bg-gray-100 text-gray-800';
  };

  // Show demo indicator for dummy users
  const getDemoIndicator = () => {
    if (isDummy) {
      return (
        <span className="ml-2 px-2 py-1 text-xs font-bold bg-yellow-200 text-yellow-800 rounded-full border border-yellow-400">
          DEMO
        </span>
      );
    }
    return null;
  };

  // If user is authenticated, show sidebar instead of navbar
  if (userInfo) {
    return (
      <ResponsiveSidebar
        menuItems={navItems}
        userInfo={userInfo}
        onLogout={handleLogout}
        title={title}
        showSearch={showSearch}
      />
    );
  }

  // For non-authenticated users, show traditional navbar
  return (
    <nav 
      className="w-full px-4 py-4 shadow-md sticky top-0 z-40"
      style={{
        backgroundColor: theme.navbarBgColor || '#ffffff',
        color: theme.navbarTextColor || '#000000',
        borderBottomColor: theme.border
      }}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold" style={{ color: theme.navbarTextColor || theme.primary }}>
            {title}
          </Link>
          {getDemoIndicator()}
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium transition-colors hover:opacity-80 ${
                isActiveLink(item.href) ? 'border-b-2' : ''
              }`}
              style={{ 
                color: isActiveLink(item.href) ? (theme.navbarTextColor || theme.primary) : (theme.navbarTextColor || theme.text),
                borderColor: theme.navbarTextColor || theme.primary
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* User Actions & Search */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Search Bar */}
          {showSearch && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:ring-2"
                style={{
                  borderColor: theme.border,
                  backgroundColor: theme.surface,
                  color: theme.text
                }}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5"
                style={{ color: theme.textSecondary }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          )}

          {userInfo ? (
            <div className="flex items-center space-x-3">
              {/* User Role Badge */}
              {userInfo.role && (
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(userInfo.role)}`}>
                  {userInfo.role.toUpperCase()}
                  {isDummy && ' (DEMO)'}
                </span>
              )}
              
              {/* User Info */}
              <span className="text-sm font-medium" style={{ color: theme.navbarTextColor || theme.text }}>
                {userInfo.name || userInfo.fullName || userInfo.email}
                {isDummy && ' (Demo Mode)'}
              </span>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-2 rounded-full transition-colors hover:bg-opacity-10"
                style={{ 
                  color: theme.error,
                  backgroundColor: `${theme.error}10`
                }}
                aria-label="Logout"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                href="/login"
                className="px-4 py-2 rounded-full font-medium transition-colors border"
                style={{
                  borderColor: theme.navbarTextColor || theme.primary,
                  color: theme.navbarTextColor || theme.primary
                }}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-full font-medium transition-colors"
                style={{
                  backgroundColor: theme.buttonBgColor || "#ffffff",
                  color: theme.buttonTextColor || "#000000"
                }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md"
            style={{ color: theme.navbarTextColor || theme.text }}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div 
          className="lg:hidden mt-4 py-4 border-t"
          style={{
            borderTopColor: theme.border,
            backgroundColor: theme.surface
          }}
        >
          <div className="flex flex-col space-y-4 px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium py-2 transition-colors"
                style={{ 
                  color: isActiveLink(item.href) ? (theme.navbarTextColor || theme.primary) : (theme.navbarTextColor || theme.text)
                }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Search */}
            {showSearch && (
              <div className="relative mt-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border focus:outline-none"
                  style={{
                    borderColor: theme.border,
                    backgroundColor: theme.background,
                    color: theme.text
                  }}
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5"
                  style={{ color: theme.textSecondary }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            )}

            {/* Mobile User Actions */}
            {userInfo ? (
              <div className="flex flex-col space-y-3 pt-4 border-t" style={{ borderTopColor: theme.border }}>
                {userInfo.role && (
                  <div className="text-center">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(userInfo.role)}`}>
                      {userInfo.role.toUpperCase()}
                      {isDummy && ' (DEMO)'}
                    </span>
                  </div>
                )}
                <div className="text-center text-sm font-medium" style={{ color: theme.text }}>
                  {userInfo.name || userInfo.fullName || userInfo.email}
                  {isDummy && ' (Demo Mode)'}
                </div>
                <button
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="text-center py-2 font-medium"
                  style={{ color: theme.error }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 pt-4 border-t" style={{ borderTopColor: theme.border }}>
                <Link
                  href="/login"
                  className="text-center py-2 rounded-full font-medium border"
                  style={{
                    borderColor: theme.primary,
                    color: theme.primary
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-center py-2 rounded-full font-medium"
                  style={{
                    backgroundColor: theme.primary,
                    color: theme.background
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default DynamicNavbar;
