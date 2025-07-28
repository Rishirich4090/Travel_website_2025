import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import { showToast } from '../../components/Toast';
import { BASE_URL } from '../config';
import { createAuthHeaders } from '../../utils/localStorage';

// Destination default object
const DEFAULT_DESTINATION = {
	id: 0,
	cityId: 0,
	cityName: '',
	description: '',
	image: '',
	seqNo: 0,
	top: false,
	type: ''
};

// Create destination
export const createDestination = createAsyncThunk(
	'denotion/createDestination',
	async (data, { rejectWithValue }) => {
		try {
			const headers = { ...createAuthHeaders(), 'Content-Type': 'application/json' };
			const response = await axiosInstance.post(`${BASE_URL}/v1/api/destinations`, data, { headers });
			showToast('Destination created successfully!', 'success');
			return response.data;
		} catch (error) {
			const msg = error.response?.data?.message || error.message || 'Create failed';
			showToast(msg, 'error');
			return rejectWithValue(msg);
		}
	}
);

// Get destination by ID
export const getDestinationById = createAsyncThunk(
	'denotion/getDestinationById',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`${BASE_URL}/v1/api/destinations/${id}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data?.message || error.message);
		}
	}
);

// Get all destinations
export const getAllDestinations = createAsyncThunk(
	'denotion/getAllDestinations',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`${BASE_URL}/v1/api/destinations`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data?.message || error.message);
		}
	}
);

// Update destination
export const updateDestination = createAsyncThunk(
	'denotion/updateDestination',
	async ({ id, data }, { rejectWithValue }) => {
		try {
			const headers = { ...createAuthHeaders(), 'Content-Type': 'application/json' };
			const response = await axiosInstance.put(`${BASE_URL}/v1/api/destinations/${id}`, data, { headers });
			showToast('Destination updated successfully!', 'success');
			return response.data;
		} catch (error) {
			const msg = error.response?.data?.message || error.message || 'Update failed';
			showToast(msg, 'error');
			return rejectWithValue(msg);
		}
	}
);

// Delete destination
export const deleteDestination = createAsyncThunk(
	'denotion/deleteDestination',
	async (id, { rejectWithValue }) => {
		try {
			const headers = { ...createAuthHeaders(), 'Content-Type': 'application/json' };
			const response = await axiosInstance.delete(`${BASE_URL}/v1/api/destinations/${id}`, { headers });
			showToast('Destination deleted successfully!', 'success');
			return { id, ...response.data };
		} catch (error) {
			const msg = error.response?.data?.message || error.message || 'Delete failed';
			showToast(msg, 'error');
			return rejectWithValue(msg);
		}
	}
);

const initialState = {
	destinations: [],
	currentDestination: null,
	loading: false,
	error: null,
	createLoading: false,
	updateLoading: false,
	deleteLoading: false
};

const denotionSlice = createSlice({
	name: 'denotion',
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
		clearCurrentDestination: (state) => {
			state.currentDestination = null;
		}
	},
	extraReducers: (builder) => {
		builder
			// Create
			.addCase(createDestination.pending, (state) => {
				state.createLoading = true;
				state.error = null;
			})
			.addCase(createDestination.fulfilled, (state, action) => {
				state.createLoading = false;
				state.destinations.push(action.payload.result);
			})
			.addCase(createDestination.rejected, (state, action) => {
				state.createLoading = false;
				state.error = action.payload;
			})

			// Get by ID
			.addCase(getDestinationById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getDestinationById.fulfilled, (state, action) => {
				state.loading = false;
				state.currentDestination = action.payload.result;
			})
			.addCase(getDestinationById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			// Get all
			.addCase(getAllDestinations.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllDestinations.fulfilled, (state, action) => {
				state.loading = false;
				state.destinations = action.payload.result;
			})
			.addCase(getAllDestinations.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			// Update
			.addCase(updateDestination.pending, (state) => {
				state.updateLoading = true;
				state.error = null;
			})
			.addCase(updateDestination.fulfilled, (state, action) => {
				state.updateLoading = false;
				const idx = state.destinations.findIndex(d => d.id === action.payload.result.id);
				if (idx !== -1) state.destinations[idx] = action.payload.result;
				state.currentDestination = action.payload.result;
			})
			.addCase(updateDestination.rejected, (state, action) => {
				state.updateLoading = false;
				state.error = action.payload;
			})

			// Delete
			.addCase(deleteDestination.pending, (state) => {
				state.deleteLoading = true;
				state.error = null;
			})
			.addCase(deleteDestination.fulfilled, (state, action) => {
				state.deleteLoading = false;
				state.destinations = state.destinations.filter(d => d.id !== action.payload.id);
				if (state.currentDestination?.id === action.payload.id) state.currentDestination = null;
			})
			.addCase(deleteDestination.rejected, (state, action) => {
				state.deleteLoading = false;
				state.error = action.payload;
			});
	}
});

export const { clearError, clearCurrentDestination } = denotionSlice.actions;

// Selectors
export const selectDestinations = (state) => state.denotion.destinations;
export const selectCurrentDestination = (state) => state.denotion.currentDestination;
export const selectDestinationLoading = (state) => state.denotion.loading;
export const selectCreateLoading = (state) => state.denotion.createLoading;
export const selectUpdateLoading = (state) => state.denotion.updateLoading;
export const selectDeleteLoading = (state) => state.denotion.deleteLoading;
export const selectDestinationError = (state) => state.denotion.error;

export default denotionSlice.reducer;
