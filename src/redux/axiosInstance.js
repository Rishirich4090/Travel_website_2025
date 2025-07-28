import axios from 'axios';
import { BASE_URL } from './config';
import { getAuthToken, clearAuthData } from '../utils/localStorage';

console.log('🔧 Creating axios instance with BASE_URL:', BASE_URL);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage using utility function
    const token = getAuthToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request details for debugging
    console.log('📤 Axios Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      hasAuth: !!token,
      headers: {
        Authorization: config.headers.Authorization ? 'Bearer ***' : 'None',
        'Content-Type': config.headers['Content-Type']
      }
    });
    
    return config;
  },
  (error) => {
    console.error('❌ Axios Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ Axios Response Success:', {
      status: response.status,
      statusText: response.statusText,
      url: response.config?.url,
      method: response.config?.method?.toUpperCase(),
      hasData: !!response.data,
      dataKeys: response.data ? Object.keys(response.data) : []
    });
    return response;
  },
  (error) => {
    // Safely extract error information
    const errorDetails = {
      message: error.message || 'Unknown error',
      status: error.response?.status || 'No status',
      statusText: error.response?.statusText || 'No status text',
      url: error.config?.url || 'No URL',
      method: error.config?.method?.toUpperCase() || 'No method',
      baseURL: error.config?.baseURL || 'No base URL',
      fullURL: error.config ? `${error.config.baseURL}${error.config.url}` : 'No full URL',
      responseData: error.response?.data || 'No response data',
      isNetworkError: !error.response,
      isTimeoutError: error.code === 'ECONNABORTED' || error.message.includes('timeout'),
      code: error.code || 'No error code'
    };

  // Suppress all error logs (do not print any error)

    // Handle specific error types
    if (error.response?.status === 401) {
      console.log('🔒 401 Unauthorized - Token invalid/expired');
      if (typeof window !== 'undefined') {
        clearAuthData();
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    } else if (error.response?.status === 403) {
      console.log('🚫 403 Forbidden - Insufficient permissions');
    } else if (error.response?.status === 404) {
      console.log('� 404 Not Found - Endpoint does not exist');
    } else if (error.response?.status >= 500) {
      console.log('🔥 Server Error - Backend issue');
    } else if (errorDetails.isNetworkError) {
      console.log('🌐 Network Error - Cannot reach server');
    } else if (errorDetails.isTimeoutError) {
      console.log('⏰ Timeout Error - Request took too long');
    }

    // Add more context to the error (safely)
    try {
      error.isAxiosError = true;
      error.errorDetails = errorDetails;
    } catch (assignError) {
      // Can't modify error object, create new enhanced error
      console.warn('Cannot modify error object, creating enhanced error');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
