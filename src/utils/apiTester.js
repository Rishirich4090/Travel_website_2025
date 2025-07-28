import axiosInstance from '../redux/axiosInstance';

// Test API connectivity
export const testApiConnection = async () => {
  try {
    console.log('🔗 Testing API connection...');
    
    // Test basic connection
    const response = await axiosInstance.get('/health', { timeout: 5000 });
    console.log('✅ API is reachable:', response.status);
    return { success: true, message: 'API is reachable' };
  } catch (error) {
    console.error('❌ API connection failed:', {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      fullURL: error.config ? `${error.config.baseURL}${error.config.url}` : 'unknown'
    });
    
    if (error.response?.status === 404) {
      return { success: false, message: 'Health endpoint not found, but server is responding' };
    } else if (!error.response) {
      return { success: false, message: 'Cannot reach API server' };
    } else {
      return { success: false, message: `Server error: ${error.response.status}` };
    }
  }
};

// Test login endpoint specifically
export const testLoginEndpoint = async () => {
  try {
    console.log('🔗 Testing login endpoint...');
    
    // This should return 400 or 422 (validation error) but not 404
    const response = await axiosInstance.post('/api/v1/auth/login', {});
    console.log('✅ Login endpoint exists (unexpected success):', response.status);
    return { success: true, message: 'Login endpoint exists' };
  } catch (error) {
    if (error.response?.status === 400 || error.response?.status === 422) {
      console.log('✅ Login endpoint exists (validation error as expected)');
      return { success: true, message: 'Login endpoint exists (validation error as expected)' };
    } else if (error.response?.status === 404) {
      console.error('❌ Login endpoint not found');
      return { success: false, message: 'Login endpoint not found' };
    } else {
      console.error('❌ Login endpoint test failed:', error.message);
      return { success: false, message: `Login endpoint error: ${error.response?.status || 'unknown'}` };
    }
  }
};

// Run comprehensive API tests
export const runApiTests = async () => {
  console.log('🚀 Running comprehensive API tests...');
  
  const results = {
    connection: await testApiConnection(),
    login: await testLoginEndpoint()
  };
  
  console.log('📊 API Test Results:', results);
  return results;
};

const apiTesterExports = { testApiConnection, testLoginEndpoint, runApiTests };

export default apiTesterExports;
