
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import { showToast } from '../../components/Toast';
import { createAuthHeaders, isDummyUser } from '../../utils/localStorage';
import { BASE_URL } from '../config';

// Default theme fallback
const DEFAULT_THEME = {
  id: 0,
  created: new Date().toISOString(),
  updated: new Date().toISOString(),
  isActive: true,
  themeName: 'Default Theme',
  primaryColor: '#007bff',
  secondaryColor: '#6c757d',
  backgroundColor: '#ffffff',
  textColor: '#000000',
  headingColor: '#212529',
  linkColor: '#007bff',
  buttonBgColor: '#007bff',
  buttonTextColor: '#ffffff',
  navbarBgColor: '#f8f9fa',
  navbarTextColor: '#000000',
  footerBgColor: '#343a40',
  footerTextColor: '#ffffff'
};

// Get theme by ID - /v1/api/themes/{id} (GET)
export const getThemeById = createAsyncThunk(
  'adminColor/getThemeById',
  async (id, { rejectWithValue }) => {
    try {
      if (isDummyUser()) {
        return {
          statusCode: '200',
          message: 'Theme fetched successfully (Demo)',
          result: { ...DEFAULT_THEME, id, themeName: `Demo Theme ${id}` }
        };
      }
      const headers = createAuthHeaders();
      const response = await axiosInstance.get(`${BASE_URL}/v1/api/themes/${id}`, { headers });
      return response.data;
    } catch (error) {
      return {
        statusCode: '200',
        message: 'Fallback theme loaded',
        result: { ...DEFAULT_THEME, id }
      };
    }
  }
);
// Activate color theme - /v1/api/themes/activate-color-theme/{colourThemeId} (PUT)
export const activateColorTheme = createAsyncThunk(
  'adminColor/activateColorTheme',
  async (colourThemeId, { rejectWithValue }) => {
    try {
      if (isDummyUser()) {
        // Simulate activation: set isActive true for selected, false for others
        return {
          statusCode: '200',
          message: 'Theme activated successfully (Demo)',
          result: {
            ...DEFAULT_THEME,
            id: colourThemeId,
            isActive: true
          }
        };
      }
      const headers = createAuthHeaders();
      const response = await axiosInstance.put(
        `${BASE_URL}/v1/api/themes/activate-color-theme/${colourThemeId}`,
        {},
        { headers }
      );
      showToast('Theme activated successfully!', 'success');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Create theme - /v1/api/themes (POST)
export const createTheme = createAsyncThunk(
  'adminColor/createTheme',
  async (themeData, { rejectWithValue }) => {
    try {
      if (isDummyUser()) {
        const mockTheme = {
          ...themeData,
          id: Date.now(),
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
          isActive: false
        };
        return {
          statusCode: '201',
          message: 'Theme created successfully (Demo)',
          result: mockTheme
        };
      }

      const headers = { ...createAuthHeaders(), 'Content-Type': 'application/json' };
      const response = await axiosInstance.post(`${BASE_URL}/v1/api/themes`, themeData, { headers });
      showToast('Theme created successfully!', 'success');
      return response.data;
    } catch (error) {
      const fallbackTheme = {
        ...themeData,
        id: Date.now(),
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        isActive: false
      };
      return {
        statusCode: '201',
        message: 'Theme created locally (fallback)',
        result: fallbackTheme
      };
    }
  }
);

// Get active theme - /v1/api/themes/active
export const getActiveTheme = createAsyncThunk(
  'adminColor/getActiveTheme',
  async (_, { rejectWithValue }) => {
    try {
      if (isDummyUser()) {
        return {
          statusCode: '200',
          message: 'Active theme fetched successfully (Demo)',
          result: { ...DEFAULT_THEME, themeName: 'Demo Active Theme' }
        };
      }

      const headers = createAuthHeaders();
      const response = await axiosInstance.get(`${BASE_URL}/v1/api/themes/active`, { headers });
      return response.data;
    } catch (error) {
      return {
        statusCode: '200',
        message: 'Default theme loaded',
        result: DEFAULT_THEME
      };
    }
  }
);

// Get all themes - /v1/api/themes (GET)
export const getAllThemes = createAsyncThunk(
  'adminColor/getAllThemes',
  async (_, { rejectWithValue }) => {
    try {
      

      const headers = createAuthHeaders();
      const response = await axiosInstance.get(`${BASE_URL}/v1/api/themes`, { headers });
      return response.data;
    } catch (error) {
      return {
        statusCode: '200',
        message: 'Default themes loaded',
        result: [DEFAULT_THEME]
      };
    }
  }
);

// Update theme - /v1/api/themes/{id} (PUT)
export const updateTheme = createAsyncThunk(
  'adminColor/updateTheme',
  async ({ id, themeData }, { rejectWithValue }) => {
    try {
      if (isDummyUser()) {
        const mockTheme = {
          id,
          ...themeData,
          updated: new Date().toISOString()
        };
        return {
          statusCode: '200',
          message: 'Theme updated successfully (Demo)',
          result: mockTheme
        };
      }

      const headers = { ...createAuthHeaders(), 'Content-Type': 'application/json' };
      const response = await axiosInstance.put(`${BASE_URL}/v1/api/themes/${id}`, themeData, { headers });
      showToast('Theme updated successfully!', 'success');
      return response.data;
    } catch (error) {
      const fallbackTheme = {
        id,
        ...themeData,
        updated: new Date().toISOString()
      };
      return {
        statusCode: '200',
        message: 'Theme updated locally (fallback)',
        result: fallbackTheme
      };
    }
  }
);

// Delete theme - /v1/api/themes/{id} (DELETE)
export const deleteTheme = createAsyncThunk(
  'adminColor/deleteTheme',
  async (id, { rejectWithValue }) => {
    try {
      if (isDummyUser()) {
        return {
          statusCode: '200',
          message: 'Theme deleted successfully (Demo)',
          result: {}
        };
      }

      const headers = createAuthHeaders();
      const response = await axiosInstance.delete(`${BASE_URL}/v1/api/themes/${id}`, { headers });
      showToast('Theme deleted successfully!', 'success');
      return { id, response: response.data };
    } catch (error) {
      return {
        id,
        response: {
          statusCode: '200',
          message: 'Theme deleted locally (fallback)',
          result: {}
        }
      };
    }
  }
);

const initialState = {
  themes: [],
  currentTheme: null,
  activeTheme: DEFAULT_THEME,
  loading: false,
  error: null,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false
};

const adminColorSlice = createSlice({
  name: 'adminColor',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentTheme: (state) => {
      state.currentTheme = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Activate color theme
      .addCase(activateColorTheme.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(activateColorTheme.fulfilled, (state, action) => {
        state.updateLoading = false;
        // Set isActive true for activated, false for others
        const activatedId = action.payload.result.id;
        state.themes = state.themes.map(theme => ({
          ...theme,
          isActive: theme.id === activatedId
        }));
        state.activeTheme = action.payload.result;
      })
      .addCase(activateColorTheme.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload?.message || 'Failed to activate theme';
      })
      
      // Get theme by ID
      .addCase(getThemeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getThemeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTheme = action.payload.result;
      })
      .addCase(getThemeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create theme
      .addCase(createTheme.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createTheme.fulfilled, (state, action) => {
        state.createLoading = false;
        state.themes.push(action.payload.result);
      })
      .addCase(createTheme.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      .addCase(getActiveTheme.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getActiveTheme.fulfilled, (state, action) => {
        state.loading = false;
        state.activeTheme = action.payload.result;
      })
      .addCase(getActiveTheme.rejected, (state, action) => {
        state.loading = false;
        state.activeTheme = DEFAULT_THEME;
      })

      // Get all themes
      .addCase(getAllThemes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllThemes.fulfilled, (state, action) => {
        state.loading = false;
        state.themes = action.payload.result;
      })
      .addCase(getAllThemes.rejected, (state, action) => {
        state.loading = false;
        state.themes = [DEFAULT_THEME];
      })

      // Update theme
      .addCase(updateTheme.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateTheme.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.themes.findIndex(theme => theme.id === action.payload.result.id);
        if (index !== -1) {
          state.themes[index] = action.payload.result;
        }
        state.currentTheme = action.payload.result;
      })
      .addCase(updateTheme.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })

      // Delete theme
      .addCase(deleteTheme.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteTheme.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.themes = state.themes.filter(theme => theme.id !== action.payload.id);
        if (state.currentTheme?.id === action.payload.id) {
          state.currentTheme = null;
        }
      })
      .addCase(deleteTheme.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearCurrentTheme } = adminColorSlice.actions;

// Selectors
export const selectThemes = (state) => state.adminColor.themes;
export const selectCurrentTheme = (state) => state.adminColor.currentTheme;
export const selectActiveTheme = (state) => state.adminColor.activeTheme;
export const selectThemeLoading = (state) => state.adminColor.loading;
export const selectCreateLoading = (state) => state.adminColor.createLoading;
export const selectUpdateLoading = (state) => state.adminColor.updateLoading;
export const selectDeleteLoading = (state) => state.adminColor.deleteLoading;
export const selectThemeError = (state) => state.adminColor.error;

export default adminColorSlice.reducer;
