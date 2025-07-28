import axiosInstance from '../axiosInstance';
import { setTheme, setThemeLoading, setThemeError } from '../slice/themeSlice';

// Theme API service
export const themeService = {
  // Fetch theme configuration from backend
  async fetchTheme(dispatch) {
    try {
      dispatch(setThemeLoading(true));
      
      // API call to fetch theme configuration
      const response = await axiosInstance.get('/api/theme/config');
      
      if (response.data && response.data.theme) {
        dispatch(setTheme(response.data.theme));
      }
      
      dispatch(setThemeLoading(false));
      return response.data;
    } catch (error) {
      // If API fails, use default theme
      console.warn('Failed to fetch theme from backend, using default theme:', error);
      dispatch(setThemeError(error.message));
      dispatch(setThemeLoading(false));
      
      // Use a mock theme for now if backend is not available
      const mockTheme = {
        primary: '#059669', // emerald-600
        primaryDark: '#047857', // emerald-700
        secondary: '#DC2626', // red-600
        accent: '#D97706', // amber-600
        background: '#FFFFFF',
        surface: '#F1F5F9', // slate-100
        text: '#0F172A', // slate-900
        textSecondary: '#64748B', // slate-500
        border: '#CBD5E1', // slate-300
        success: '#059669',
        warning: '#D97706',
        error: '#DC2626',
        info: '#0EA5E9', // sky-500
      };
      
      dispatch(setTheme(mockTheme));
      return { theme: mockTheme };
    }
  },

  // Update theme configuration (for admin users)
  async updateTheme(themeConfig, dispatch) {
    try {
      dispatch(setThemeLoading(true));
      
      const response = await axiosInstance.put('/api/theme/config', {
        theme: themeConfig
      });
      
      if (response.data && response.data.theme) {
        dispatch(setTheme(response.data.theme));
      }
      
      dispatch(setThemeLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setThemeError(error.message));
      dispatch(setThemeLoading(false));
      throw error;
    }
  }
};

export default themeService;
