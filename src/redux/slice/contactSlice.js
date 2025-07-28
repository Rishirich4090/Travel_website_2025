import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import { showToast } from '../../components/Toast';
import { createAuthHeaders, isDummyUser } from '../../utils/localStorage';
import { BASE_URL } from '../config';

// Fetch contact-us info
export const fetchContactUs = createAsyncThunk(
  'contact/fetchContactUs',
  async (_, { rejectWithValue }) => {
    try {
      const headers = createAuthHeaders();
      const response = await axiosInstance.get(`${BASE_URL}/v1/api/free/contact-us`, { headers });
      return response.data;
    } catch (error) {
      showToast(error?.response?.data?.message || 'Failed to fetch contact info', 'error');
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Search contact branches
export const searchContactBranch = createAsyncThunk(
  'contact/searchContactBranch',
  async (searchString, { rejectWithValue }) => {
    try {
      const headers = createAuthHeaders();
      const response = await axiosInstance.get(`${BASE_URL}/v1/api/free/contact-us/search`, {
        headers,
        params: { searchString }
      });
      return response.data;
    } catch (error) {
      showToast(error?.response?.data?.message || 'Failed to search contact branches', 'error');
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const initialState = {
  contact: null,
  branches: [],
  loading: false,
  error: null
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearContactError: (state) => {
      state.error = null;
    },
    clearContactData: (state) => {
      state.contact = null;
      state.branches = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactUs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactUs.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload.result;
      })
      .addCase(fetchContactUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch contact info';
      })
      .addCase(searchContactBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchContactBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload.result;
      })
      .addCase(searchContactBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to search contact branches';
      });
  }
});

export const { clearContactError, clearContactData } = contactSlice.actions;

export const selectContact = (state) => state.contact.contact;
export const selectContactBranches = (state) => state.contact.branches;
export const selectContactLoading = (state) => state.contact.loading;
export const selectContactError = (state) => state.contact.error;

export default contactSlice.reducer;
