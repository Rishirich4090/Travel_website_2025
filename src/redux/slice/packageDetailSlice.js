import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import { showToast } from '../../components/Toast';
import { BASE_URL } from '../config';
import { createAuthHeaders } from '../../utils/localStorage';

const base_url = `${BASE_URL}/v1/api/package-details`;

// POST: Create package detail (form-data)
export const createPackageDetail = createAsyncThunk(
	'packageDetail/create',
	async (formData, { rejectWithValue }) => {
		try {
			const headers = { ...createAuthHeaders(), 'Content-Type': 'multipart/form-data' };
			const response = await axiosInstance.post(base_url, formData, { headers });
			showToast(response.data.message, 'success');
			return response.data.result;
		} catch (err) {
			showToast(err.response?.data?.message || 'Error creating package detail', 'error');
			return rejectWithValue(err.response?.data);
		}
	}
);

// GET: All package details
export const getPackageDetails = createAsyncThunk(
	'packageDetail/getAll',
	async (_, { rejectWithValue }) => {
		try {
			const headers = createAuthHeaders();
			const response = await axiosInstance.get(base_url, { headers });
			return response.data.result;
		} catch (err) {
			showToast(err.response?.data?.message || 'Error fetching package details', 'error');
			return rejectWithValue(err.response?.data);
		}
	}
);

// GET: Package detail by packageId
export const getPackageDetailById = createAsyncThunk(
	'packageDetail/getById',
	async (packageId, { rejectWithValue }) => {
		try {
			const headers = createAuthHeaders();
			const response = await axiosInstance.get(`${base_url}/${packageId}`, { headers });
			return response.data.result;
		} catch (err) {
			showToast(err.response?.data?.message || 'Error fetching package detail', 'error');
			return rejectWithValue(err.response?.data);
		}
	}
);

const initialState = {
	packageDetails: [],
	loading: false,
	error: null,
	selected: null,
	createLoading: false,
};

const packageDetailSlice = createSlice({
	name: 'packageDetail',
	initialState,
	reducers: {
		clearSelected: (state) => {
			state.selected = null;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getPackageDetails.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getPackageDetails.fulfilled, (state, action) => {
				state.loading = false;
				state.packageDetails = action.payload || [];
			})
			.addCase(getPackageDetails.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Failed to fetch package details';
			})
			.addCase(createPackageDetail.pending, (state) => {
				state.createLoading = true;
				state.error = null;
			})
			.addCase(createPackageDetail.fulfilled, (state, action) => {
				state.createLoading = false;
				state.packageDetails.push(action.payload);
			})
			.addCase(createPackageDetail.rejected, (state, action) => {
				state.createLoading = false;
				state.error = action.payload || 'Failed to create package detail';
			})
			.addCase(getPackageDetailById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getPackageDetailById.fulfilled, (state, action) => {
				state.loading = false;
				state.selected = action.payload;
			})
			.addCase(getPackageDetailById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Failed to fetch package detail';
			});
	},
});

export const { clearSelected, clearError } = packageDetailSlice.actions;

// Selectors
export const selectPackageDetails = (state) => state.packageDetail.packageDetails;
export const selectPackageDetailLoading = (state) => state.packageDetail.loading;
export const selectPackageDetailError = (state) => state.packageDetail.error;
export const selectPackageDetailCreateLoading = (state) => state.packageDetail.createLoading;
export const selectSelectedPackageDetail = (state) => state.packageDetail.selected;

export default packageDetailSlice.reducer;
