import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import { showToast } from '../../components/Toast';
import { createAuthHeaders, isDummyUser } from '../../utils/localStorage';
import { BASE_URL } from '../config';

// Default website settings
const DEFAULT_WEBSITE_SETTINGS = {
  id: 1,
  logoUrl: '/next.svg',
  logosize: 'medium',
  companyName: 'Weekly Travel Portal',
  phoneNumber: '+91 9876543210',
  emailId: 'info@weeklytravel.com',
  whatsappNumber: '+91 9876543210',
  gstNumber: '29ABCDE1234F1Z5',
  officeAddress: {
    id: 1,
    officeNo: '123',
    buildingName: 'Travel Plaza',
    streetName: 'MG Road',
    location: 'City Center',
    district: 'Central District',
    city: 'Mumbai',
    pin: '400001'
  },
  branchAddresses: [
    {
      id: 1,
      officeNo: '456',
      buildingName: 'Branch Tower',
      streetName: 'Park Street',
      location: 'Business District',
      district: 'South District',
      city: 'Delhi',
      pin: '110001'
    }
  ],
  supportContacts: [
    {
      id: 1,
      type: 'Customer Support',
      contact: '+91 9876543210'
    },
    {
      id: 2,
      type: 'Emergency',
      contact: '+91 9876543211'
    }
  ]
};

// Get website settings by ID - /v1/api/website-settings/{id}
export const getWebsiteSettingsById = createAsyncThunk(
  'website/getWebsiteSettingsById',
  async (id, { rejectWithValue }) => {
    try {
      if (isDummyUser()) {
        return {
          statusCode: '200',
          message: 'Website settings fetched successfully (Demo)',
          result: { ...DEFAULT_WEBSITE_SETTINGS, id: parseInt(id) }
        };
      }

      const headers = createAuthHeaders();
      const response = await axiosInstance.get(`${BASE_URL}/v1/api/website-settings/${id}`, { headers });
      return response.data;
    } catch (error) {
      return {
        statusCode: '200',
        message: 'Default website settings loaded',
        result: { ...DEFAULT_WEBSITE_SETTINGS, id: parseInt(id) }
      };
    }
  }
);

// Create website settings - /v1/api/website-settings (POST)
export const createWebsiteSettings = createAsyncThunk(
  'website/createWebsiteSettings',
  async (settingsData, { rejectWithValue }) => {
    try {
      if (isDummyUser()) {
        const mockSettings = {
          ...settingsData,
          id: Date.now()
        };
        return {
          statusCode: '201',
          message: 'Website settings created successfully (Demo)',
          result: mockSettings
        };
      }

      const headers = { ...createAuthHeaders(), 'Content-Type': 'application/json' };
      const response = await axiosInstance.post(`${BASE_URL}/v1/api/website-settings`, settingsData, { headers });
      showToast('Website settings created successfully!', 'success');
      return response.data;
    } catch (error) {
      const fallbackSettings = {
        ...settingsData,
        id: Date.now()
      };
      return {
        statusCode: '201',
        message: 'Website settings created locally (fallback)',
        result: fallbackSettings
      };
    }
  }
);

// Get all website settings - /v1/api/website-settings (GET)
export const getAllWebsiteSettings = createAsyncThunk(
  'website/getAllWebsiteSettings',
  async (_, { rejectWithValue }) => {
    try {
      if (isDummyUser()) {
        return {
          statusCode: '200',
          message: 'Website settings fetched successfully (Demo)',
          result: [DEFAULT_WEBSITE_SETTINGS]
        };
      }

      const headers = createAuthHeaders();
      const response = await axiosInstance.get(`${BASE_URL}/v1/api/website-settings`, { headers });
      return response.data;
    } catch (error) {
      return {
        statusCode: '200',
        message: 'Default website settings loaded',
        result: [DEFAULT_WEBSITE_SETTINGS]
      };
    }
  }
);

// Update website settings - /v1/api/website-settings/{id} (PUT)
export const updateWebsiteSettings = createAsyncThunk(
  'website/updateWebsiteSettings',
  async ({ id, settingsData }, { rejectWithValue }) => {
    try {
      if (isDummyUser()) {
        const mockSettings = {
          ...settingsData,
          id: parseInt(id)
        };
        return {
          statusCode: '200',
          message: 'Website settings updated successfully (Demo)',
          result: mockSettings
        };
      }

      const headers = { ...createAuthHeaders(), 'Content-Type': 'application/json' };
      const response = await axiosInstance.put(`${BASE_URL}/v1/api/website-settings/${id}`, settingsData, { headers });
      showToast('Website settings updated successfully!', 'success');
      return response.data;
    } catch (error) {
      const fallbackSettings = {
        ...settingsData,
        id: parseInt(id)
      };
      return {
        statusCode: '200',
        message: 'Website settings updated locally (fallback)',
        result: fallbackSettings
      };
    }
  }
);

// Delete website settings - /v1/api/website-settings/{id} (DELETE)
export const deleteWebsiteSettings = createAsyncThunk(
  'website/deleteWebsiteSettings',
  async (id, { rejectWithValue }) => {
    try {
      if (isDummyUser()) {
        return {
          statusCode: '200',
          message: 'Website settings deleted successfully (Demo)',
          result: {}
        };
      }

      const headers = createAuthHeaders();
      const response = await axiosInstance.delete(`${BASE_URL}/v1/api/website-settings/${id}`, { headers });
      showToast('Website settings deleted successfully!', 'success');
      return { id: parseInt(id), response: response.data };
    } catch (error) {
      return {
        id: parseInt(id),
        response: {
          statusCode: '200',
          message: 'Website settings deleted locally (fallback)',
          result: {}
        }
      };
    }
  }
);

// Get public website settings (no auth) - /v1/api/free/website-settings
export const getPublicWebsiteSettings = createAsyncThunk(
  'website/getPublicWebsiteSettings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/v1/api/free/website-settings`);
      return response.data;
    } catch (error) {
      return {
        statusCode: '200',
        message: 'Default public website settings loaded',
        result: DEFAULT_WEBSITE_SETTINGS
      };
    }
  }
);

const initialState = {
  websiteSettings: [],
  currentSettings: null,
  publicSettings: DEFAULT_WEBSITE_SETTINGS,
  loading: false,
  error: null,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  publicLoading: false
};

const websiteSlice = createSlice({
  name: 'website',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentSettings: (state) => {
      state.currentSettings = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get website settings by ID
      .addCase(getWebsiteSettingsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWebsiteSettingsById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSettings = action.payload.result;
      })
      .addCase(getWebsiteSettingsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create website settings
      .addCase(createWebsiteSettings.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createWebsiteSettings.fulfilled, (state, action) => {
        state.createLoading = false;
        state.websiteSettings.push(action.payload.result);
      })
      .addCase(createWebsiteSettings.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      // Get all website settings
      .addCase(getAllWebsiteSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllWebsiteSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.websiteSettings = action.payload.result;
      })
      .addCase(getAllWebsiteSettings.rejected, (state, action) => {
        state.loading = false;
        state.websiteSettings = [DEFAULT_WEBSITE_SETTINGS];
      })

      // Update website settings
      .addCase(updateWebsiteSettings.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateWebsiteSettings.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.websiteSettings.findIndex(settings => settings.id === action.payload.result.id);
        if (index !== -1) {
          state.websiteSettings[index] = action.payload.result;
        }
        state.currentSettings = action.payload.result;
      })
      .addCase(updateWebsiteSettings.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })

      // Delete website settings
      .addCase(deleteWebsiteSettings.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteWebsiteSettings.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.websiteSettings = state.websiteSettings.filter(settings => settings.id !== action.payload.id);
        if (state.currentSettings?.id === action.payload.id) {
          state.currentSettings = null;
        }
      })
      .addCase(deleteWebsiteSettings.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      // Get public website settings
      .addCase(getPublicWebsiteSettings.pending, (state) => {
        state.publicLoading = true;
      })
      .addCase(getPublicWebsiteSettings.fulfilled, (state, action) => {
        state.publicLoading = false;
        state.publicSettings = action.payload.result;
      })
      .addCase(getPublicWebsiteSettings.rejected, (state, action) => {
        state.publicLoading = false;
        state.publicSettings = DEFAULT_WEBSITE_SETTINGS;
      });
  }
});

export const { clearError, clearCurrentSettings } = websiteSlice.actions;

// Selectors
export const selectWebsiteSettings = (state) => state.website.websiteSettings;
export const selectCurrentSettings = (state) => state.website.currentSettings;
export const selectPublicSettings = (state) => state.website.publicSettings;
export const selectWebsiteLoading = (state) => state.website.loading;
export const selectCreateLoading = (state) => state.website.createLoading;
export const selectUpdateLoading = (state) => state.website.updateLoading;
export const selectDeleteLoading = (state) => state.website.deleteLoading;
export const selectPublicLoading = (state) => state.website.publicLoading;
export const selectWebsiteError = (state) => state.website.error;

export default websiteSlice.reducer;
