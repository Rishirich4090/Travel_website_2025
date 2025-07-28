"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, generateCSSVariables } from '../redux/slice/themeSlice';
import themeService from '../redux/services/themeService';

const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  useEffect(() => {
    // Fetch theme configuration from backend on app load
    themeService.fetchTheme(dispatch);
  }, [dispatch]);

  useEffect(() => {
    // Apply CSS variables to document root
    if (theme && typeof document !== 'undefined') {
      const cssVariables = generateCSSVariables(theme);
      const root = document.documentElement;
      
      Object.entries(cssVariables).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });

      // Apply theme classes for easier CSS targeting
      const existingThemeClasses = Array.from(root.classList).filter(cls => cls.startsWith('theme-'));
      existingThemeClasses.forEach(cls => root.classList.remove(cls));
      
      // Add new theme classes
      root.classList.add('theme-applied');
      
      // Add color scheme class based on background brightness
      const isLight = isLightColor(theme.background || theme.backgroundColor || '#FFFFFF');
      root.classList.add(isLight ? 'theme-light' : 'theme-dark');
      
      console.log('🎨 ThemeProvider: Applied theme classes and variables');
    }
  }, [theme]);

  // Helper function to determine if a color is light
  const isLightColor = (color) => {
    if (!color) return true;
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  };

  return (
    <div 
      className="theme-provider min-h-screen theme-bg theme-text"
      style={{
        backgroundColor: theme.background || theme.backgroundColor,
        color: theme.text || theme.textColor
      }}
    >
      {children}
    </div>
  );
};

export default ThemeProvider;
