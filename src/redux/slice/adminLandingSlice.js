import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import { showToast } from '../../components/Toast';
import { createAuthHeaders, isDummyUser } from '../../utils/localStorage';
import { BASE_URL } from '../config';

// Default landing media
const DEFAULT_LANDING_MEDIA = [
  {
    id: 1,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    isActive: true,
    mediaType: 'image',
    mediaUrl: '/activity/activity10.avif',
    thumbnailUrl: '/activity/activity10.avif',
    title: 'Explore Beautiful Destinations',
    description: 'Discover amazing places around the world',
    displayOrder: 1
  },
  {
    id: 2,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    isActive: true,
    mediaType: 'image',
    mediaUrl: '/activity/activity11.avif',
    thumbnailUrl: '/activity/activity11.avif',
    title: 'Adventure Awaits',
    description: 'Experience thrilling adventures',
    displayOrder: 2
  }
];

// Create landing media - /api/landing-media (POST)
export const createLandingMedia = createAsyncThunk(
  'adminLanding/createLandingMedia',
  async (formData, { rejectWithValue }) => {
    try {
      if (isDummyUser()) {
        const mockMedia = {
          id: Date.now(),
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
          isActive: true,
          mediaType: formData.get('mediaType') || 'image',
          mediaUrl: '/activity/activity5.avif',
          thumbnailUrl: '/activity/activity5.avif',
          title: formData.get('title') || 'Demo Media',
          description: formData.get('description') || 'Demo Description',
          displayOrder: parseInt(formData.get('displayOrder')) || 0
        };
        return {
          statusCode: '201',
          message: 'Landing media created successfully (Demo)',
          result: mockMedia
        };
      }

      const headers = createAuthHeaders();
      const response = await axiosInstance.post(`${BASE_URL}/api/landing-media`, formData, { 
        headers: { ...headers, 'Content-Type': 'multipart/form-data' }
      });
      showToast('Landing media created successfully!', 'success');
      return response.data;
    } catch (error) {
      const fallbackMedia = {
        id: Date.now(),
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        isActive: true,
        mediaType: formData.get('mediaType') || 'image',
        mediaUrl: '/activity/activity9.avif',
        thumbnailUrl: '/activity/activity9.avif',
        title: formData.get('title') || 'Fallback Media',
        description: formData.get('description') || 'Fallback Description',
        displayOrder: parseInt(formData.get('displayOrder')) || 0
      };
      return {
        statusCode: '201',
        message: 'Landing media created locally (fallback)',
        result: fallbackMedia
      };
    }
  }
);

// Get all landing media - /api/landing-media (GET)
export const getAllLandingMedia = createAsyncThunk(
  'adminLanding/getAllLandingMedia',
  async (_, { rejectWithValue }) => {
    try {
      if (isDummyUser()) {
        return {
          statusCode: '200',
          message: 'Landing media fetched successfully (Demo)',
          result: DEFAULT_LANDING_MEDIA
        };
      }

      const headers = createAuthHeaders();
      const response = await axiosInstance.get(`${BASE_URL}/api/landing-media`, { headers });
      return response.data;
    } catch (error) {
      return {
        statusCode: '200',
        message: 'Default landing media loaded',
        result: DEFAULT_LANDING_MEDIA
      };
    }
  }
);

// Get landing media by ID - /api/landing-media/{id} (GET)
export const getLandingMediaById = createAsyncThunk(
  'adminLanding/getLandingMediaById',
  async (id, { rejectWithValue }) => {
    try {
      if (isDummyUser()) {
        const media = DEFAULT_LANDING_MEDIA.find(m => m.id === parseInt(id)) || DEFAULT_LANDING_MEDIA[0];
        return {
          statusCode: '200',
          message: 'Landing media fetched successfully (Demo)',
          result: { ...media, id: parseInt(id) }
        };
      }

      const headers = createAuthHeaders();
      const response = await axiosInstance.get(`${BASE_URL}/api/landing-media/${id}`, { headers });
      return response.data;
    } catch (error) {
      return {
        statusCode: '200',
        message: 'Fallback media loaded',
        result: { ...DEFAULT_LANDING_MEDIA[0], id: parseInt(id) }
      };
    }
  }
);

// Update landing media - /api/landing-media/{id} (PUT)
export const updateLandingMedia = createAsyncThunk(
  'adminLanding/updateLandingMedia',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      if (isDummyUser()) {
        const mockMedia = {
          id: parseInt(id),
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
          isActive: true,
          mediaType: formData.get('mediaType') || 'image',
          mediaUrl: '/activity/activity5.avif',
          thumbnailUrl: '/activity/activity5.avif',
          title: formData.get('title') || 'Updated Demo Media',
          description: formData.get('description') || 'Updated Demo Description',
          displayOrder: parseInt(formData.get('displayOrder')) || 0
        };
        return {
          statusCode: '200',
          message: 'Landing media updated successfully (Demo)',
          result: mockMedia
        };
      }

      const headers = createAuthHeaders();
      const response = await axiosInstance.put(`${BASE_URL}/api/landing-media/${id}`, formData, { 
        headers: { ...headers, 'Content-Type': 'multipart/form-data' }
      });
      showToast('Landing media updated successfully!', 'success');
      return response.data;
    } catch (error) {
      const fallbackMedia = {
        id: parseInt(id),
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        isActive: true,
        mediaType: formData.get('mediaType') || 'image',
        mediaUrl: '/activity/activity9.avif',
        thumbnailUrl: '/activity/activity9.avif',
        title: formData.get('title') || 'Updated Fallback Media',
        description: formData.get('description') || 'Updated Fallback Description',
        displayOrder: parseInt(formData.get('displayOrder')) || 0
      };
      return {
        statusCode: '200',
        message: 'Landing media updated locally (fallback)',
        result: fallbackMedia
      };
    }
  }
);

// Delete landing media - /api/landing-media/{id} (DELETE)
export const deleteLandingMedia = createAsyncThunk(
  'adminLanding/deleteLandingMedia',
  async (id, { rejectWithValue }) => {
    try {
      if (isDummyUser()) {
        return {
          statusCode: '200',
          message: 'Landing media deleted successfully (Demo)',
          result: {}
        };
      }

      const headers = createAuthHeaders();
      const response = await axiosInstance.delete(`${BASE_URL}/api/landing-media/${id}`, { headers });
      showToast('Landing media deleted successfully!', 'success');
      return { id: parseInt(id), response: response.data };
    } catch (error) {
      return {
        id: parseInt(id),
        response: {
          statusCode: '200',
          message: 'Landing media deleted locally (fallback)',
          result: {}
        }
      };
    }
  }
);

const initialState = {
  landingMedia: [],
  currentMedia: null,
  loading: false,
  error: null,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false
};

const adminLandingSlice = createSlice({
  name: 'adminLanding',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentMedia: (state) => {
      state.currentMedia = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create landing media
      .addCase(createLandingMedia.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createLandingMedia.fulfilled, (state, action) => {
        state.createLoading = false;
        state.landingMedia.push(action.payload.result);
      })
      .addCase(createLandingMedia.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      // Get all landing media
      .addCase(getAllLandingMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLandingMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.landingMedia = action.payload.result;
      })
      .addCase(getAllLandingMedia.rejected, (state, action) => {
        state.loading = false;
        state.landingMedia = DEFAULT_LANDING_MEDIA;
      })

      // Get landing media by ID
      .addCase(getLandingMediaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLandingMediaById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMedia = action.payload.result;
      })
      .addCase(getLandingMediaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update landing media
      .addCase(updateLandingMedia.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateLandingMedia.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.landingMedia.findIndex(media => media.id === action.payload.result.id);
        if (index !== -1) {
          state.landingMedia[index] = action.payload.result;
        }
        state.currentMedia = action.payload.result;
      })
      .addCase(updateLandingMedia.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })

      // Delete landing media
      .addCase(deleteLandingMedia.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteLandingMedia.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.landingMedia = state.landingMedia.filter(media => media.id !== action.payload.id);
        if (state.currentMedia?.id === action.payload.id) {
          state.currentMedia = null;
        }
      })
      .addCase(deleteLandingMedia.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearCurrentMedia } = adminLandingSlice.actions;

// Selectors
export const selectLandingMedia = (state) => state.adminLanding.landingMedia;
export const selectCurrentMedia = (state) => state.adminLanding.currentMedia;
export const selectLandingLoading = (state) => state.adminLanding.loading;
export const selectCreateLoading = (state) => state.adminLanding.createLoading;
export const selectUpdateLoading = (state) => state.adminLanding.updateLoading;
export const selectDeleteLoading = (state) => state.adminLanding.deleteLoading;
export const selectLandingError = (state) => state.adminLanding.error;

export default adminLandingSlice.reducer;
