"use client";
import React, { useState } from "react";
import MegaMenu from "./MegaMenu";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "../redux/slice/authSlice";
import { selectTheme } from "../redux/slice/themeSlice";
import { showToast } from "./Toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, userRole, token } = useSelector((state) => state.auth);
  const theme = useSelector(selectTheme);
  
  // Get role from localStorage as fallback
  const role = userRole || (typeof window !== 'undefined' ? localStorage.getItem('userRole') : null);
  const isAuthenticated = token || (typeof window !== 'undefined' && localStorage.getItem('token'));

  const handleLogout = () => {
    dispatch(logout());
    showToast("Logged out successfully!", "success");
    router.replace("/");  // Redirect to landing page instead of login
  };

  const getRoleBasedMenuItems = () => {
    const baseItems = [
      { label: "Dashboard", href: "/dashboard" },
    ];

    if (role === 'superadmin') {
      return [
        ...baseItems,
        { label: "User Management", href: "/admin/users" },
        { label: "System Settings", href: "/admin/settings" },
      ];
    } else if (role === 'admin') {
      return [
        ...baseItems,
        { label: "Bookings", href: "/admin/bookings" },
        { label: "Packages", href: "/admin/packages" },
      ];
    } else {
      return [
        ...baseItems,
        { label: "My Trips", href: "/user/trips" },
        { label: "Book Trip", href: "/user/book" },
      ];
    }
  };

  const menuItems = isAuthenticated ? getRoleBasedMenuItems() : [
    { label: "Home", href: "/" },
    { label: "Login", href: "/login" },
  ];

  const getRoleBadgeColor = () => {
    // Use theme colors instead of hardcoded colors
    const baseStyle = {
      padding: '0.25rem 0.5rem',
      borderRadius: '0.375rem',
      fontSize: '0.75rem',
      fontWeight: '600'
    };
    
    switch (role) {
      case 'superadmin': 
        return {
          ...baseStyle,
          backgroundColor: theme.error || '#EF4444',
          color: '#FFFFFF'
        };
      case 'admin': 
        return {
          ...baseStyle,
          backgroundColor: theme.primaryColor || '#3B82F6',
          color: '#FFFFFF'
        };
      case 'user': 
        return {
          ...baseStyle,
          backgroundColor: theme.success || '#10B981',
          color: '#FFFFFF'
        };
      default: 
        return {
          ...baseStyle,
          backgroundColor: theme.surface || '#F8FAFC',
          color: theme.textColor || '#1F2937'
        };
    }
  };

  return (
    <nav 
      style={{
        backgroundColor: theme.backgroundColor,
        borderColor: theme.borderColor
      }}
      className="border-b px-4 py-3 flex items-center justify-between shadow-md fixed top-0 left-0 w-full z-50"
    >
      <div className="flex items-center">
        <Link 
          href={isAuthenticated ? "/dashboard" : "/"} 
          className="text-xl font-bold"
          style={{ color: theme.primaryColor || '#3B82F6' }}
        >
          Weeky Travel
        </Link>
      </div>
      
      <div className="hidden md:flex items-center space-x-6">
        {/* Home and Login links */}
        {menuItems.filter(item => item.label === "Home" || item.label === "Login").map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-medium transition-colors"
            style={{ color: theme.textColor || '#1F2937' }}
          >
            {item.label}
          </Link>
        ))}

        {/* MegaMenu for main navigation */}
        <MegaMenu />

        {isAuthenticated && (
          <>
            {/* User Role Badge */}
            <span 
              className="px-2 py-1 text-xs font-semibold rounded-full"
              style={getRoleBadgeColor()}
            >
              {role?.toUpperCase()}
            </span>
            {/* User Name */}
            {user && (
              <span 
                className="font-medium"
                style={{ color: theme.textColor || '#1F2937' }}
              >
                {user.name || user.email}
              </span>
            )}
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="font-medium border rounded-full p-2 transition-colors"
              style={{
                color: theme.error || '#EF4444',
                borderColor: theme.error || '#EF4444',
                backgroundColor: 'transparent'
              }}
              aria-label="Logout"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </>
        )}
      </div>
      
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ color: theme.textColor }}
          className="focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
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
      
      {/* Mobile menu */}
      {isOpen && (
        <div 
          className="absolute top-16 left-0 w-full border-b flex flex-col items-center md:hidden z-50 shadow-md"
          style={{
            backgroundColor: theme.surface || '#FFFFFF',
            borderColor: theme.border || '#E5E7EB'
          }}
        >
          {menuItems.map((item, idx) => (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full text-center py-3 font-medium${idx !== menuItems.length - 1 ? " border-b" : ""}`}
              style={{
                color: theme.textColor || '#1F2937',
                borderColor: theme.border || '#E5E7EB'
              }}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          
          {isAuthenticated && (
            <>
              {/* Mobile User Info */}
              <div 
                className="w-full text-center py-3 border-t"
                style={{ borderColor: theme.border || '#E5E7EB' }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span 
                    className="px-2 py-1 text-xs font-semibold rounded-full"
                    style={getRoleBadgeColor()}
                  >
                    {role?.toUpperCase()}
                  </span>
                  {user && (
                    <span 
                      className="font-medium text-sm"
                      style={{ color: theme.textColor || '#1F2937' }}
                    >
                      {user.name || user.email}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Mobile Logout */}
              <button
                onClick={() => { setIsOpen(false); handleLogout(); }}
                style={{
                  color: theme.dangerColor || '#DC2626',
                  borderColor: theme.borderColor,
                  backgroundColor: 'transparent'
                }}
                className="w-full text-center py-3 font-medium border-t hover:opacity-80 transition-opacity"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
