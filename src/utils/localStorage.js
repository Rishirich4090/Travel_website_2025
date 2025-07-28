// localStorage utility functions for authentication

export const AUTH_KEYS = {
  TOKEN: 'accessToken',
  USER_DATA: 'userData',
  USER_ROLE: 'userRole',
  USER_NAME: 'userName',
  USER_EMAIL: 'userEmail',
  IS_DUMMY_USER: 'isDummyUser'
};

// Save authentication data to localStorage
export const saveAuthData = (authData) => {
  try {
    const { accessToken, data, isDummyUser = false } = authData;
    
    // Save token
    localStorage.setItem(AUTH_KEYS.TOKEN, accessToken);
    
    // Save user data
    localStorage.setItem(AUTH_KEYS.USER_DATA, JSON.stringify(data));
    
    // Save individual user fields for easy access
    localStorage.setItem(AUTH_KEYS.USER_ROLE, data.role);
    localStorage.setItem(AUTH_KEYS.USER_NAME, data.fullName || data.name);
    localStorage.setItem(AUTH_KEYS.USER_EMAIL, data.email);
    localStorage.setItem(AUTH_KEYS.IS_DUMMY_USER, isDummyUser.toString());
    
    // Set cookies for SSR/middleware with proper expiry
    const cookieOptions = 'path=/; max-age=86400; SameSite=Lax'; // 24 hours
    document.cookie = `token=${accessToken}; ${cookieOptions}`;
    document.cookie = `userRole=${data.role}; ${cookieOptions}`;
    
    console.log('Auth data saved to localStorage:', {
      token: accessToken ? 'present' : 'missing',
      role: data.role,
      name: data.fullName || data.name,
      isDummy: isDummyUser
    });
  } catch (error) {
    console.error('Error saving auth data:', error);
  }
};

// Get authentication token
export const getAuthToken = () => {
  try {
    return localStorage.getItem(AUTH_KEYS.TOKEN);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Get user data
export const getUserData = () => {
  try {
    const userData = localStorage.getItem(AUTH_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Get user role
export const getUserRole = () => {
  try {
    return localStorage.getItem(AUTH_KEYS.USER_ROLE);
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
};

// Get user name
export const getUserName = () => {
  try {
    return localStorage.getItem(AUTH_KEYS.USER_NAME);
  } catch (error) {
    console.error('Error getting user name:', error);
    return null;
  }
};

// Get user email
export const getUserEmail = () => {
  try {
    return localStorage.getItem(AUTH_KEYS.USER_EMAIL);
  } catch (error) {
    console.error('Error getting user email:', error);
    return null;
  }
};

// Check if user is dummy user
export const isDummyUser = () => {
  try {
    return localStorage.getItem(AUTH_KEYS.IS_DUMMY_USER) === 'true';
  } catch (error) {
    console.error('Error checking dummy user:', error);
    return false;
  }
};

// Clear all authentication data
export const clearAuthData = () => {
  try {
    Object.values(AUTH_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Clear cookies with proper expiry
    document.cookie = 'token=; path=/; max-age=0';
    document.cookie = 'userRole=; path=/; max-age=0';
    
    console.log('Auth data cleared from localStorage');
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};

// Get initial auth state for Redux store
export const getInitialAuthState = () => {
  if (typeof window === 'undefined') {
    return {
      token: null,
      user: null,
      userRole: null,
      isDummyUser: false
    };
  }
  
  try {
    const token = getAuthToken();
    const userData = getUserData();
    const userRole = getUserRole();
    const isDummy = isDummyUser();
    
    return {
      token,
      user: userData,
      userRole,
      isDummyUser: isDummy
    };
  } catch (error) {
    console.error('Error getting initial auth state:', error);
    return {
      token: null,
      user: null,
      userRole: null,
      isDummyUser: false
    };
  }
};

// Create authorization headers for API calls
export const createAuthHeaders = () => {
  const token = getAuthToken();
  if (!token) {
    return {};
  }
  
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};
