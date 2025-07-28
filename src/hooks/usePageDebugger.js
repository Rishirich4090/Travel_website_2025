"use client";
import { useEffect } from 'react';

export const usePageDebugger = (pageName) => {
  useEffect(() => {
    console.log(`🔄 [${pageName}] Component mounted`);
    
    // Check for common causes of infinite loops
    const checkInterval = setInterval(() => {
      console.log(`🔍 [${pageName}] Current state:`, {
        pathname: window.location.pathname,
        localStorage: {
          token: !!localStorage.getItem('accessToken'),
          role: localStorage.getItem('userRole'),
          isDummy: localStorage.getItem('isDummyUser')
        },
        cookies: {
          token: document.cookie.includes('token='),
          role: document.cookie.includes('userRole=')
        }
      });
    }, 5000); // Check every 5 seconds

    return () => {
      console.log(`🔄 [${pageName}] Component unmounted`);
      clearInterval(checkInterval);
    };
  }, [pageName]);
};

export default usePageDebugger;
