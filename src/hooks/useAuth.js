import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getInitialAuthState } from '../utils/localStorage';

export const useAuth = (requireAuth = true) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const authState = useSelector((state) => state.auth);
  
  useEffect(() => {
    // Check if auth state is not initialized and we have data in localStorage
    if (!authState.token && typeof window !== 'undefined') {
      const localAuthState = getInitialAuthState();
      
      if (localAuthState.token) {
        // Dispatch action to restore auth state from localStorage
        dispatch({
          type: 'auth/restoreAuthState',
          payload: localAuthState
        });
      } else if (requireAuth) {
        // No token found and auth is required
        router.push('/login');
      }
    }
  }, [authState.token, dispatch, router, requireAuth]);

  return {
    isAuthenticated: !!authState.token,
    user: authState.user,
    userRole: authState.userRole,
    isDummyUser: authState.isDummyUser,
    loading: authState.loading,
    error: authState.error
  };
};

export default useAuth;
