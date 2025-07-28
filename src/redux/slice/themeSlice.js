import { createSlice } from '@reduxjs/toolkit';

// Default theme configuration
const defaultTheme = {
  primary: '#3B82F6', // blue-500
  primaryDark: '#1D4ED8', // blue-700
  secondary: '#10B981', // emerald-500
  accent: '#F59E0B', // amber-500
  background: '#FFFFFF', // white
  surface: '#F8FAFC', // slate-50
  text: '#1F2937', // gray-800
  textSecondary: '#6B7280', // gray-500
  border: '#E5E7EB', // gray-200
  success: '#10B981', // emerald-500
  warning: '#F59E0B', // amber-500
  error: '#EF4444', // red-500
  info: '#3B82F6', // blue-500
  // API theme properties
  primaryColor: '#3B82F6',
  secondaryColor: '#10B981',
  backgroundColor: '#FFFFFF',
  textColor: '#1F2937',
  headingColor: '#1F2937',
  linkColor: '#3B82F6',
  buttonBgColor: '#3B82F6',
  buttonTextColor: '#FFFFFF',
  navbarBgColor: '#FFFFFF',
  navbarTextColor: '#1F2937',
  footerBgColor: '#1F2937',
  footerTextColor: '#FFFFFF',
};

const initialState = {
  theme: defaultTheme,
  isLoading: false,
  error: null,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = { ...defaultTheme, ...action.payload };
    },
    setApiTheme: (state, action) => {
      // Handle API theme response structure
      const apiTheme = action.payload;
      state.theme = {
        ...defaultTheme,
        primary: apiTheme.primaryColor || defaultTheme.primary,
        secondary: apiTheme.secondaryColor || defaultTheme.secondary,
        background: apiTheme.backgroundColor || defaultTheme.background,
        text: apiTheme.textColor || defaultTheme.text,
        primaryColor: apiTheme.primaryColor || defaultTheme.primaryColor,
        secondaryColor: apiTheme.secondaryColor || defaultTheme.secondaryColor,
        backgroundColor: apiTheme.backgroundColor || defaultTheme.backgroundColor,
        textColor: apiTheme.textColor || defaultTheme.textColor,
        headingColor: apiTheme.headingColor || defaultTheme.headingColor,
        linkColor: apiTheme.linkColor || defaultTheme.linkColor,
        buttonBgColor: apiTheme.buttonBgColor || defaultTheme.buttonBgColor,
        buttonTextColor: apiTheme.buttonTextColor || defaultTheme.buttonTextColor,
        navbarBgColor: apiTheme.navbarBgColor || defaultTheme.navbarBgColor,
        navbarTextColor: apiTheme.navbarTextColor || defaultTheme.navbarTextColor,
        footerBgColor: apiTheme.footerBgColor || defaultTheme.footerBgColor,
        footerTextColor: apiTheme.footerTextColor || defaultTheme.footerTextColor,
      };
    },
    resetTheme: (state) => {
      state.theme = defaultTheme;
    },
    setThemeLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setThemeError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTheme, setApiTheme, resetTheme, setThemeLoading, setThemeError } = themeSlice.actions;

// Theme selectors
export const selectTheme = (state) => state.theme.theme;
export const selectThemeLoading = (state) => state.theme.isLoading;
export const selectThemeError = (state) => state.theme.error;

// CSS Variables generator
export const generateCSSVariables = (theme) => {
  return Object.entries(theme).reduce((acc, [key, value]) => {
    acc[`--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = value;
    return acc;
  }, {});
};

export default themeSlice.reducer;
