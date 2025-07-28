import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import { showToast } from '../../components/Toast';
import { BASE_URL } from '../config';
import { 
  saveAuthData, 
  clearAuthData, 
  getInitialAuthState 
} from '../../utils/localStorage';

// Dummy data for testing different user types (for show only)
const DUMMY_USERS = {
  'superadmin@example.com': {
    fullName: 'Super Admin (Demo)',
    email: 'superadmin@example.com',
    phone: '9999999999',
    role: 'SUPERADMIN',
    password: 'superadmin123'
  },
  // Admin dummy login removed. Only real API allowed for admin.
  'user@example.com': {
    fullName: 'Regular User (Demo)',
    email: 'user@example.com',
    phone: '7777777777',
    role: 'USER',
    password: 'user123'
  }
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/api/v1/auth/register', userData);
      showToast('Registration successful!', 'success');
      return res.data;
    } catch (err) {
      console.error('Registration failed:', err);
      const msg = err.response?.data?.message || err.message || 'Registration failed';
      showToast(msg, 'error');
      return rejectWithValue(msg);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('Attempting login with:', credentials.email);
      
      // First try real API call
      try {
        console.log('🔄 Attempting real API login for:', credentials.email);
        const res = await axiosInstance.post('/api/v1/auth/login', credentials);
        
        if (res.data && res.data.accessToken) {
          console.log('✅ Real API login successful:', {
            hasToken: !!res.data.accessToken,
            hasData: !!res.data.data,
            userRole: res.data.data?.role
          });
          
          // Save real user data to localStorage
          saveAuthData({
            accessToken: res.data.accessToken,
            data: res.data.data,
            isDummyUser: false
          });
          
          showToast(`Welcome ${res.data.data.fullName}!`, 'success');
          
          return {
            accessToken: res.data.accessToken,
            token: res.data.accessToken,
            user: res.data.data,
            isDummyUser: false
          };
        }
        
        throw new Error('No access token received from API');
        
      } catch (apiError) {
        console.log('⚠️ Real API failed, checking dummy users. Error:', {
          message: apiError.message,
          status: apiError.response?.status,
          isNetworkError: !apiError.response
        });
        
        // If real API fails, check for dummy users (but NOT for admin)
        const dummyUser = DUMMY_USERS[credentials.email];
        // Only allow dummy login for superadmin and user
        if (
          dummyUser &&
          dummyUser.password === credentials.password &&
          (dummyUser.role === 'SUPERADMIN' || dummyUser.role === 'USER')
        ) {
          console.log('✅ Dummy user login successful:', {
            email: dummyUser.email,
            role: dummyUser.role
          });
          // Create fake token for dummy user
          const fakeToken = `dummy_token_${Date.now()}_${dummyUser.role}`;
          // Save dummy user data to localStorage
          saveAuthData({
            accessToken: fakeToken,
            data: {
              fullName: dummyUser.fullName,
              email: dummyUser.email,
              phone: dummyUser.phone,
              role: dummyUser.role
            },
            isDummyUser: true
          });
          showToast(`Welcome ${dummyUser.fullName} (Demo Mode)`, 'success');
          return {
            accessToken: fakeToken,
            token: fakeToken,
            user: {
              fullName: dummyUser.fullName,
              email: dummyUser.email,
              phone: dummyUser.phone,
              role: dummyUser.role
            },
            isDummyUser: true
          };
        }
        
        // If neither real API nor dummy user works, throw error
        console.error('❌ Login failed - no matching credentials found');
        const msg = apiError.response?.data?.message || apiError.message || 'Invalid email or password';
        showToast(msg, 'error');
        return rejectWithValue(msg);
      }
      
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.response?.data?.message || err.message || 'Login failed';
      showToast(msg, 'error');
      return rejectWithValue(msg);
    }
  }
);


// Send OTP (Forgot Password)
export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (email, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/api/v1/auth/forgotPassword', { email });
      showToast('OTP sent to your email!', 'success');
      return res.data;
    } catch (err) {
      console.error('Send OTP failed:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to send OTP';
      showToast(msg, 'error');
      return rejectWithValue(msg);
    }
  }
);

// Set Password (Reset Password)
export const setPassword = createAsyncThunk(
  'auth/setPassword',
  async ({ password, confirmPassword, code }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/api/v1/auth/set-password', {
        password,
        confirmPassword,
        code,
      });
      showToast('Password reset successful!', 'success');
      return res.data;
    } catch (err) {
      console.error('Set password failed:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to reset password';
      showToast(msg, 'error');
      return rejectWithValue(msg);
    }
  }
);

const initialState = getInitialAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialState.user,
    token: initialState.token,
    userRole: initialState.userRole,
    isDummyUser: initialState.isDummyUser,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userRole = null;
      state.isDummyUser = false;
      clearAuthData();
      showToast('Logged out successfully', 'success');
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
      localStorage.setItem('userRole', action.payload);
    },
    restoreAuthState: (state, action) => {
      const { token, user, userRole, isDummyUser } = action.payload;
      state.token = token;
      state.user = user;
      state.userRole = userRole;
      state.isDummyUser = isDummyUser;
      console.log('Auth state restored from localStorage:', { userRole, isDummyUser });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.userRole = action.payload.user?.role || 'user';
        state.isDummyUser = action.payload.isDummyUser || false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle sendOtp
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUserRole, restoreAuthState } = authSlice.actions;
export default authSlice.reducer;
