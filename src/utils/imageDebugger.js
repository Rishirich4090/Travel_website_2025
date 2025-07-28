/**
 * Image debugging utility for development
 */

export const ImageDebugger = {
  log: (message, data = null) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[ImageDebugger]: ${message}`, data);
    }
  },

  warn: (message, data = null) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[ImageDebugger]: ${message}`, data);
    }
  },

  error: (message, error = null) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[ImageDebugger]: ${message}`, error);
    }
  },

  testImageUrl: async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      ImageDebugger.log(`Image URL test for ${url}:`, {
        status: response.status,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });
      return response.ok;
    } catch (error) {
      ImageDebugger.error(`Failed to test image URL ${url}:`, error);
      return false;
    }
  },

  validateImageUrls: async (images) => {
    ImageDebugger.log('Starting image URL validation...');
    for (const [key, url] of Object.entries(images)) {
      const isValid = await ImageDebugger.testImageUrl(url);
      ImageDebugger.log(`${key}: ${isValid ? 'VALID' : 'INVALID'}`, url);
    }
  }
};

export default ImageDebugger;
