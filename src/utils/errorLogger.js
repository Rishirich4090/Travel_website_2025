// Global error handler and logger
export const setupErrorLogging = () => {
  if (typeof window === 'undefined') return;

  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('🚨 Unhandled Promise Rejection:', {
      reason: event.reason,
      promise: event.promise,
      stack: event.reason?.stack
    });
    
    // Prevent the default browser error logging
    event.preventDefault();
  });

  // Capture uncaught errors
  window.addEventListener('error', (event) => {
    console.error('🚨 Uncaught Error:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error,
      stack: event.error?.stack
    });
  });

  // Override console.error to add more context
  const originalError = console.error;
  console.error = (...args) => {
    // Add timestamp and stack trace
    const timestamp = new Date().toISOString();
    const stack = new Error().stack;
    
    originalError(
      `[${timestamp}] ERROR:`,
      ...args,
      '\nStack trace:',
      stack
    );
  };

  console.log('✅ Error logging setup complete');
};

export default setupErrorLogging;
