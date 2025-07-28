import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import { showToast } from '../../components/Toast';
import { BASE_URL } from '../config';
import { createAuthHeaders } from '../../utils/localStorage';

const base_url = `${BASE_URL}/v1/api/transports`;

// Utility to convert time fields to 'HH:mm:ss' string format
function convertTimeFields(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const timeFieldNames = ['time', 'startTime', 'endTime', 'departureTime', 'arrivalTime'];
  const newObj = Array.isArray(obj) ? obj.map(convertTimeFields) : { ...obj };
  if (Array.isArray(obj)) return newObj;
  for (const key of Object.keys(newObj)) {
    if (timeFieldNames.includes(key) && newObj[key] && typeof newObj[key] === 'object') {
      // If the value is an object with hour, minute, second (ignore nano)
      let { hour, minute, second } = newObj[key];
      let invalid = false;
      if (typeof hour === 'number' && (hour < 0 || hour > 23)) { invalid = true; hour = Math.max(0, Math.min(23, hour)); }
      if (typeof minute === 'number' && (minute < 0 || minute > 59)) { invalid = true; minute = Math.max(0, Math.min(59, minute)); }
      if (typeof second === 'number' && (second < 0 || second > 59)) { invalid = true; second = Math.max(0, Math.min(59, second)); }
      if (invalid) {
        if (typeof window !== 'undefined') {
          console.warn(`Invalid time value detected in field '${key}':`, newObj[key], 'Clamped to valid range.');
        }
      }
      if (
        typeof hour === 'number' &&
        typeof minute === 'number' &&
        (typeof second === 'number' || typeof second === 'undefined')
      ) {
        const h = String(hour).padStart(2, '0');
        const m = String(minute).padStart(2, '0');
        const s = String(second ?? 0).padStart(2, '0');
        newObj[key] = `${h}:${m}:${s}`;
      }
    } else if (typeof newObj[key] === 'object' && newObj[key] !== null && !Array.isArray(newObj[key])) {
      // Recursively convert nested objects
      newObj[key] = convertTimeFields(newObj[key]);
    } else if (Array.isArray(newObj[key])) {
      newObj[key] = newObj[key].map(convertTimeFields);
    }
  }
  return newObj;
}

// Thunks
export const createItinerary = createAsyncThunk('tourTransport/create', async (data, { rejectWithValue }) => {
  try {
    const headers = createAuthHeaders();
    const convertedData = convertTimeFields(data);
    const response = await axiosInstance.post(base_url, convertedData, { headers });
    showToast(response.data.message, 'success');
    console.log('Itinerary created:', response.data.result);
    return response.data.result;
  } catch (err) {
    showToast(err.response?.data?.message || 'Error creating itinerary', 'error');
    return rejectWithValue(err.response?.data);
  }
});

export const getItineraries = createAsyncThunk('tourTransport/getAll', async (_, { rejectWithValue }) => {
  try {
    const headers = createAuthHeaders();
    const response = await axiosInstance.get(base_url, { headers });
    return response.data.result;
  } catch (err) {
    showToast(err.response?.data?.message || 'Error fetching itineraries', 'error');
    return rejectWithValue(err.response?.data);
  }
});

export const getItineraryById = createAsyncThunk('tourTransport/getById', async (id, { rejectWithValue }) => {
  try {
    const headers = createAuthHeaders();
    const response = await axiosInstance.get(`${base_url}/${id}`, { headers });
    return response.data.result;
  } catch (err) {
    showToast(err.response?.data?.message || 'Error fetching itinerary', 'error');
    return rejectWithValue(err.response?.data);
  }
});

export const updateItinerary = createAsyncThunk('tourTransport/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const headers = createAuthHeaders();
    const convertedData = convertTimeFields(data);
    const response = await axiosInstance.put(`${base_url}/${id}`, convertedData, { headers });
    showToast(response.data.message, 'success');
    return response.data.result;
  } catch (err) {
    showToast(err.response?.data?.message || 'Error updating itinerary', 'error');
    return rejectWithValue(err.response?.data);
  }
});

export const deleteItinerary = createAsyncThunk('tourTransport/delete', async (id, { rejectWithValue }) => {
  try {
    const headers = createAuthHeaders();
    const response = await axiosInstance.delete(`${base_url}/${id}`, { headers });
    showToast(response.data.message, 'success');
    return id;
  } catch (err) {
    showToast(err.response?.data?.message || 'Error deleting itinerary', 'error');
    return rejectWithValue(err.response?.data);
  }
});

const tourTransportSlice = createSlice({
  name: 'tourTransport',
  initialState: {
    itineraries: [],
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
    builder
      .addCase(getItineraries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getItineraries.fulfilled, (state, action) => {
        state.loading = false;
        state.itineraries = action.payload || [];
      })
      .addCase(getItineraries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch itineraries';
      })
      .addCase(createItinerary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createItinerary.fulfilled, (state, action) => {
        state.loading = false;
        state.itineraries.push(action.payload);
      })
      .addCase(createItinerary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create itinerary';
      })
      .addCase(updateItinerary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItinerary.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.itineraries.findIndex(i => i.id === action.payload.id);
        if (idx !== -1) state.itineraries[idx] = action.payload;
      })
      .addCase(updateItinerary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update itinerary';
      })
      .addCase(deleteItinerary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteItinerary.fulfilled, (state, action) => {
        state.loading = false;
        state.itineraries = state.itineraries.filter(i => i.id !== action.payload);
      })
      .addCase(deleteItinerary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete itinerary';
      });
  },
});

export const { clearSelected } = tourTransportSlice.actions;
export default tourTransportSlice.reducer;
