"use client";
import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/slice/themeSlice';

const LoginNavbar = () => {
  const { token } = useSelector((state) => state.auth);
  const theme = useSelector(selectTheme);

  // Don't show login navbar if user is already authenticated
  if (token) return null;

  return (
    <div 
      className="w-full py-2 text-sm border-b"
      style={{
        backgroundColor: theme.surface,
        borderColor: theme.border,
        color: theme.textSecondary
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span>📞 (000) 999-656-888</span>
          <span>✉️ info@weeklytravel.com</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link 
            href="/login" 
            className="hover:underline transition-colors"
            style={{ color: theme.primary }}
          >
            Login
          </Link>
          <span>|</span>
          <Link 
            href="/signup" 
            className="hover:underline transition-colors"
            style={{ color: theme.primary }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginNavbar;
