"use client";
import React from 'react';
import ThemeDemo from '../../../components/ThemeDemo';

const ThemeDemoPage = () => {
  return (
    <div className="min-h-screen theme-bg">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold theme-text mb-4">
            Theme System Demo
          </h1>
          <p className="text-lg theme-text-secondary">
            This page demonstrates the new theme system. 
            Try changing themes in the admin settings to see the changes!
          </p>
        </div>
        <ThemeDemo />
      </div>
    </div>
  );
};

export default ThemeDemoPage;
