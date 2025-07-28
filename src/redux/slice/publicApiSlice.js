import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import { BASE_URL } from '../config';

// Default fallback data
const DEFAULT_TOP_DESTINATIONS = [
  {
    id: 0,
    cityId: 0,
    cityName: 'Dummy City',
    description: 'This is a dummy destination.',
    image: '/images/placeholder.svg',
    seqNo: 1,
    top: true,
    type: 'dummy'
  }
];

const DEFAULT_COLOR_THEME = {
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

// Get top destinations - /v1/api/free/top-destinations
export const getTopDestinations = createAsyncThunk(
  'publicApi/getTopDestinations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/v1/api/free/top-destinations`);
      return response.data;
    } catch (error) {
      console.warn('Top destinations API failed, using default destinations');
      return {
        statusCode: '200',
        message: 'Default top destinations loaded',
        result: DEFAULT_TOP_DESTINATIONS
      };
    }
  }
);

// Get top packages - /v1/api/free/top-packages
export const getTopPackages = createAsyncThunk(
  'publicApi/getTopPackages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/v1/api/free/top-packages`);
      return response.data;
    } catch (error) {
      console.warn('Top packages API failed');
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch top packages' });
    }
  }
);

// Get package details - /v1/api/free/package-details/{packageId}
export const getPackageDetails = createAsyncThunk(
  'publicApi/getPackageDetails',
  async (packageId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/v1/api/free/package-details/${packageId}`);
      return response.data;
    } catch (error) {
      console.warn('Package details API failed');
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch package details' });
    }
  }
);

// Get public color theme - /v1/api/free/colour-theme
export const getPublicColorTheme = createAsyncThunk(
  'publicApi/getPublicColorTheme',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/v1/api/free/colour-theme`);
      console.log('API Response for colorrrrr:', response.data); // Add this line
      return response.data;
    } catch (error) {
      console.warn('Public color theme API failed, using default theme');
      return {
        statusCode: '200',
        message: 'Default color theme loaded',
        result: DEFAULT_COLOR_THEME
      };
    }
  }
);

// Get public landing media - /v1/api/free/landing-media
export const getPublicLandingMedia = createAsyncThunk(
  'publicApi/getPublicLandingMedia',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/v1/api/free/landing-media`);
      console.log('API Response:', response.data); // Add this line
      return response.data;
    } catch (error) {
      console.error('Error fetching landing media:', error);
      console.warn('Public landing media API failed, using default media');
      return {
        statusCode: '200',
        message: 'Default landing media loaded',
        result: [
          {
            id: 1,
            mediaType: 'image',
            mediaUrl: '/activity/activity10.avif',
            // ... rest of the default object
          }
        ]
      };
    }
  }
);

// Get public website settings - /v1/api/free/website-settings
export const getPublicWebsiteSettings = createAsyncThunk(
  'publicApi/getPublicWebsiteSettings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/v1/api/free/website-settings`);
      return response.data;
    } catch (error) {
      console.warn('Public website settings API failed, using default settings');
      return {
        statusCode: '200',
        message: 'Default website settings loaded',
        result: {
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
        }
      };
    }
  }
);

const initialState = {
  colorTheme: DEFAULT_COLOR_THEME,
  landingMedia: [],
  websiteSettings: null,
  topDestinations: [],
  topDestinationsLoading: false,
  topDestinationsError: null,
  topPackages: [],
  topPackagesLoading: false,
  topPackagesError: null,
  packageDetails: null,
  packageDetailsLoading: false,
  packageDetailsError: null,
  colorThemeLoading: false,
  landingMediaLoading: false,
  websiteSettingsLoading: false,
  error: null
};

const publicApiSlice = createSlice({
  name: 'publicApi',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    applyPublicTheme: (state, action) => {
      state.colorTheme = action.payload;
      // Apply theme to CSS variables for entire app
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        const theme = action.payload;
        root.style.setProperty('--primary-color', theme.primaryColor);
        root.style.setProperty('--secondary-color', theme.secondaryColor);
        root.style.setProperty('--background-color', theme.backgroundColor);
        root.style.setProperty('--text-color', theme.textColor);
        root.style.setProperty('--heading-color', theme.headingColor);
        root.style.setProperty('--link-color', theme.linkColor);
        root.style.setProperty('--button-bg-color', theme.buttonBgColor);
        root.style.setProperty('--button-text-color', theme.buttonTextColor);
        root.style.setProperty('--navbar-bg-color', theme.navbarBgColor);
        root.style.setProperty('--navbar-text-color', theme.navbarTextColor);
        root.style.setProperty('--footer-bg-color', theme.footerBgColor);
        root.style.setProperty('--footer-text-color', theme.footerTextColor);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Get top destinations
      .addCase(getTopDestinations.pending, (state) => {
        state.topDestinationsLoading = true;
        state.topDestinationsError = null;
      })
      .addCase(getTopDestinations.fulfilled, (state, action) => {
        state.topDestinationsLoading = false;
        state.topDestinations = action.payload.result;
      })
      .addCase(getTopDestinations.rejected, (state, action) => {
        state.topDestinationsLoading = false;
        state.topDestinationsError = action.payload;
        state.topDestinations = DEFAULT_TOP_DESTINATIONS;
      })

      // Get top packages
      .addCase(getTopPackages.pending, (state) => {
        state.topPackagesLoading = true;
        state.topPackagesError = null;
      })
      .addCase(getTopPackages.fulfilled, (state, action) => {
        state.topPackagesLoading = false;
        state.topPackages = action.payload.result;
      })
      .addCase(getTopPackages.rejected, (state, action) => {
        state.topPackagesLoading = false;
        state.topPackagesError = action.payload;
        state.topPackages = [];
      })

      // Get package details
      .addCase(getPackageDetails.pending, (state) => {
        state.packageDetailsLoading = true;
        state.packageDetailsError = null;
        state.packageDetails = null;
      })
      .addCase(getPackageDetails.fulfilled, (state, action) => {
        state.packageDetailsLoading = false;
        state.packageDetails = action.payload.result;
      })
      .addCase(getPackageDetails.rejected, (state, action) => {
        state.packageDetailsLoading = false;
        state.packageDetailsError = action.payload;
        state.packageDetails = null;
      })

      // Get public color theme
      .addCase(getPublicColorTheme.pending, (state) => {
        state.colorThemeLoading = true;
        state.error = null;
      })
      .addCase(getPublicColorTheme.fulfilled, (state, action) => {
        state.colorThemeLoading = false;
        state.colorTheme = action.payload.result;
        // Auto-apply theme when loaded
        publicApiSlice.caseReducers.applyPublicTheme(state, { payload: action.payload.result });
      })
      .addCase(getPublicColorTheme.rejected, (state, action) => {
        state.colorThemeLoading = false;
        state.colorTheme = DEFAULT_COLOR_THEME;
        // Apply default theme
        publicApiSlice.caseReducers.applyPublicTheme(state, { payload: DEFAULT_COLOR_THEME });
      })

      // Get public landing media
      .addCase(getPublicLandingMedia.pending, (state) => {
        state.landingMediaLoading = true;
        state.error = null;
      })
      .addCase(getPublicLandingMedia.fulfilled, (state, action) => {
        state.landingMediaLoading = false;
        state.landingMedia = action.payload.result;
      })
      .addCase(getPublicLandingMedia.rejected, (state, action) => {
        state.landingMediaLoading = false;
        state.error = action.payload;
      })

      // Get public website settings
      .addCase(getPublicWebsiteSettings.pending, (state) => {
        state.websiteSettingsLoading = true;
        state.error = null;
      })
      .addCase(getPublicWebsiteSettings.fulfilled, (state, action) => {
        state.websiteSettingsLoading = false;
        state.websiteSettings = action.payload.result;
      })
      .addCase(getPublicWebsiteSettings.rejected, (state, action) => {
        state.websiteSettingsLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, applyPublicTheme } = publicApiSlice.actions;

// Selectors

export const selectPublicColorTheme = (state) => state.publicApi.colorTheme;
export const selectPublicLandingMedia = (state) => state.publicApi.landingMedia;
export const selectPublicWebsiteSettings = (state) => state.publicApi.websiteSettings;
export const selectTopDestinations = (state) => state.publicApi.topDestinations;
export const selectTopDestinationsLoading = (state) => state.publicApi.topDestinationsLoading;
export const selectTopDestinationsError = (state) => state.publicApi.topDestinationsError;
export const selectTopPackages = (state) => state.publicApi.topPackages;
export const selectTopPackagesLoading = (state) => state.publicApi.topPackagesLoading;
export const selectTopPackagesError = (state) => state.publicApi.topPackagesError;
export const selectPackageDetails = (state) => state.publicApi.packageDetails;
export const selectPackageDetailsLoading = (state) => state.publicApi.packageDetailsLoading;
export const selectPackageDetailsError = (state) => state.publicApi.packageDetailsError;
export const selectColorThemeLoading = (state) => state.publicApi.colorThemeLoading;
export const selectLandingMediaLoading = (state) => state.publicApi.landingMediaLoading;
export const selectWebsiteSettingsLoading = (state) => state.publicApi.websiteSettingsLoading;
export const selectPublicApiError = (state) => state.publicApi.error;

export default publicApiSlice.reducer;
