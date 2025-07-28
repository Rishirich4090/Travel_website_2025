import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import { showToast } from '../../components/Toast';
import { BASE_URL } from '../config';
import { createAuthHeaders } from '../../utils/localStorage';

const base_url = `${BASE_URL}/v1/api`;

// Package Management Thunks
export const createPackage = createAsyncThunk('package/create', async (data, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    const headers = createAuthHeaders();
    const response = await axiosInstance.post(`${base_url}/packages`, formData, { headers });
    showToast.success(response.data.message);
    return response.data.result;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error creating package');
    return rejectWithValue(err.response?.data);
  }
});

export const getPackages = createAsyncThunk('package/getAll', async (_, { rejectWithValue }) => {
  try {
    const headers = createAuthHeaders();
    const response = await axiosInstance.get(`${base_url}/packages`, { headers });
    console.log('Packages fetched: Amitttttt', response.data.result);
    return response.data.result;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error fetching packages');
    return rejectWithValue(err.response?.data);
  }
});

export const getPackageById = createAsyncThunk('package/getById', async (id, { rejectWithValue }) => {
  try {
    const headers = createAuthHeaders();
    const response = await axiosInstance.get(`${base_url}/packages/${id}`, { headers });
    return response.data.result;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error fetching package');
    return rejectWithValue(err.response?.data);
  }
});

export const updatePackage = createAsyncThunk('package/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    const headers = createAuthHeaders();
    const response = await axiosInstance.put(`${base_url}/packages/${id}`, formData, { headers });
    showToast.success(response.data.message);
    return response.data.result;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error updating package');
    return rejectWithValue(err.response?.data);
  }
});

export const deletePackage = createAsyncThunk('package/delete', async (id, { rejectWithValue }) => {
  try {

    const headers = createAuthHeaders();
    const response = await axiosInstance.delete(`${base_url}/packages/${id}`, { headers });
    showToast.success(response.data.message);
    return id;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error deleting package');
    return rejectWithValue(err.response?.data);
  }
});

// Package Category Thunks
export const createPackageCategory = createAsyncThunk('packageCategory/create', async (data, { rejectWithValue }) => {
  try {

    const headers = createAuthHeaders();
    const response = await axiosInstance.post(`${base_url}/package-categories`, data, { headers });
    showToast.success(response.data.message);
    return response.data.result;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error creating category');
    return rejectWithValue(err.response?.data);
  }
});

export const getPackageCategories = createAsyncThunk('packageCategory/getAll', async (_, { rejectWithValue }) => {
  try {

    const headers = createAuthHeaders();
    const response = await axiosInstance.get(`${base_url}/package-categories`, { headers });
    return response.data.result;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error fetching categories');
    return rejectWithValue(err.response?.data);
  }
});

export const getPackageCategoryById = createAsyncThunk('packageCategory/getById', async (id, { rejectWithValue }) => {
  try {

    const headers = createAuthHeaders();
    const response = await axiosInstance.get(`${base_url}/package-categories/${id}`, { headers });
    return response.data.result;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error fetching category');
    return rejectWithValue(err.response?.data);
  }
});

export const updatePackageCategory = createAsyncThunk('packageCategory/update', async ({ id, data }, { rejectWithValue }) => {
  try {

    const headers = createAuthHeaders();
    const response = await axiosInstance.put(`${base_url}/package-categories/${id}`, data, { headers });
    showToast.success(response.data.message);
    return response.data.result;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error updating category');
    return rejectWithValue(err.response?.data);
  }
});

export const deletePackageCategory = createAsyncThunk('packageCategory/delete', async (id, { rejectWithValue }) => {
  try {

    const headers = createAuthHeaders();
    const response = await axiosInstance.delete(`${base_url}/package-categories/${id}`, { headers });
    showToast(response.data.message);
    return id;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error deleting category');
    return rejectWithValue(err.response?.data);
  }
});

// Inclusion Management Thunks
export const createInclusion = createAsyncThunk('inclusion/create', async (data, { rejectWithValue }) => {
  try {

    const headers = createAuthHeaders();
    const response = await axiosInstance.post(`${base_url}/inclusions`, data, { headers });
    showToast.success(response.data.message);
    return response.data.result;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error creating inclusion');
    return rejectWithValue(err.response?.data);
  }
});

export const getInclusions = createAsyncThunk('inclusion/getAll', async (_, { rejectWithValue }) => {
  try {

    const headers = createAuthHeaders();
    const response = await axiosInstance.get(`${base_url}/inclusions`, { headers });
    return response.data.result;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error fetching inclusions');
    return rejectWithValue(err.response?.data);
  }
});

export const getInclusionById = createAsyncThunk('inclusion/getById', async (id, { rejectWithValue }) => {
  try {

    const headers = createAuthHeaders();
    const response = await axiosInstance.get(`${base_url}/inclusions/${id}`, { headers });
    return response.data.result;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error fetching inclusion');
    return rejectWithValue(err.response?.data);
  }
});

export const deleteInclusion = createAsyncThunk('inclusion/delete', async (id, { rejectWithValue }) => {
  try {

    const headers = createAuthHeaders();
    const response = await axiosInstance.delete(`${base_url}/inclusions/${id}`, { headers });
    showToast.success(response.data.message);
    return id;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error deleting inclusion');
    return rejectWithValue(err.response?.data);
  }
});

export const updateInclusion = createAsyncThunk('inclusion/update', async ({ id, data }, { rejectWithValue }) => {
  try {

    const headers = createAuthHeaders();
    const response = await axiosInstance.put(`${base_url}/inclusions/${id}`, data, { headers });
    showToast.success(response.data.message);
    return response.data.result;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error updating inclusion');
    return rejectWithValue(err.response?.data);
  }
});

// Exclusion Management Thunks
export const createExclusion = createAsyncThunk('exclusion/create', async (data, { rejectWithValue }) => {
  try {

    const headers = createAuthHeaders();
    const response = await axiosInstance.post(`${base_url}/exclusions`, data, { headers });
    showToast.success(response.data.message);
    return response.data.result;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error creating exclusion');
    return rejectWithValue(err.response?.data);
  }
});

export const getExclusions = createAsyncThunk('exclusion/getAll', async (_, { rejectWithValue }) => {
  try {

    const headers = createAuthHeaders();
    const response = await axiosInstance.get(`${base_url}/exclusions`, { headers });
    return response.data.result;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error fetching exclusions');
    return rejectWithValue(err.response?.data);
  }
});

export const getExclusionById = createAsyncThunk('exclusion/getById', async (id, { rejectWithValue }) => {
  try {

    const headers = createAuthHeaders();
    const response = await axiosInstance.get(`${base_url}/exclusions/${id}`, { headers });
    return response.data.result;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error fetching exclusion');
    return rejectWithValue(err.response?.data);
  }
});

export const updateExclusion = createAsyncThunk('exclusion/update', async ({ id, data }, { rejectWithValue }) => {
  try {

    const headers = createAuthHeaders();
    const response = await axiosInstance.put(`${base_url}/exclusions/${id}`, data, { headers });
    showToast.success(response.data.message);
    return response.data.result;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error updating exclusion');
    return rejectWithValue(err.response?.data);
  }
});

export const deleteExclusion = createAsyncThunk('exclusion/delete', async (id, { rejectWithValue }) => {
  try {

    const headers = createAuthHeaders();
    const response = await axiosInstance.delete(`${base_url}/exclusions/${id}`, { headers });
    showToast.success(response.data.message);
    return id;
  } catch (err) {
    showToast.error(err.response?.data?.message || 'Error deleting exclusion');
    return rejectWithValue(err.response?.data);
  }
});

const packageSlice = createSlice({
  name: 'package',
  initialState: {
    packages: [],
    packageCategories: [],
    inclusions: [],
    exclusions: [],
    loading: false,
    error: null,
    selected: null,
  },
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    // Packages
    builder
      .addCase(getPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload || [];
      })
      .addCase(getPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch packages';
      })
      .addCase(createPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.packages.push(action.payload);
      })
      .addCase(createPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create package';
      })
      .addCase(updatePackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePackage.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.packages.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) state.packages[idx] = action.payload;
      })
      .addCase(updatePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update package';
      })
      .addCase(deletePackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = state.packages.filter(p => p.id !== action.payload);
      })
      .addCase(deletePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete package';
      })

    // Package Categories
    builder
      .addCase(getPackageCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPackageCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.packageCategories = action.payload || [];
      })
      .addCase(getPackageCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch categories';
      })
      .addCase(createPackageCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPackageCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.packageCategories.push(action.payload);
      })
      .addCase(createPackageCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create category';
      })
      .addCase(updatePackageCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePackageCategory.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.packageCategories.findIndex(c => c.id === action.payload.id);
        if (idx !== -1) state.packageCategories[idx] = action.payload;
      })
      .addCase(updatePackageCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update category';
      })
      .addCase(deletePackageCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePackageCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.packageCategories = state.packageCategories.filter(c => c.id !== action.payload);
      })
      .addCase(deletePackageCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete category';
      })

    // Inclusions
    builder
      .addCase(getInclusions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInclusions.fulfilled, (state, action) => {
        state.loading = false;
        state.inclusions = action.payload || [];
      })
      .addCase(getInclusions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch inclusions';
      })
      .addCase(createInclusion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInclusion.fulfilled, (state, action) => {
        state.loading = false;
        state.inclusions.push(action.payload);
      })
      .addCase(createInclusion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create inclusion';
      })
      .addCase(updateInclusion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInclusion.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.inclusions.findIndex(i => i.id === action.payload.id);
        if (idx !== -1) state.inclusions[idx] = action.payload;
      })
      .addCase(updateInclusion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update inclusion';
      })
      .addCase(deleteInclusion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInclusion.fulfilled, (state, action) => {
        state.loading = false;
        state.inclusions = state.inclusions.filter(i => i.id !== action.payload);
      })
      .addCase(deleteInclusion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete inclusion';
      })

    // Exclusions
    builder
      .addCase(getExclusions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExclusions.fulfilled, (state, action) => {
        state.loading = false;
        state.exclusions = action.payload || [];
      })
      .addCase(getExclusions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch exclusions';
      })
      .addCase(createExclusion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExclusion.fulfilled, (state, action) => {
        state.loading = false;
        state.exclusions.push(action.payload);
      })
      .addCase(createExclusion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create exclusion';
      })
      .addCase(updateExclusion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExclusion.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.exclusions.findIndex(e => e.id === action.payload.id);
        if (idx !== -1) state.exclusions[idx] = action.payload;
      })
      .addCase(updateExclusion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update exclusion';
      })
      .addCase(deleteExclusion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExclusion.fulfilled, (state, action) => {
        state.loading = false;
        state.exclusions = state.exclusions.filter(e => e.id !== action.payload);
      })
      .addCase(deleteExclusion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete exclusion';
      });
  },
});

export const { clearSelected } = packageSlice.actions;
export default packageSlice.reducer;
