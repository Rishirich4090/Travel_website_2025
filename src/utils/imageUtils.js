/**
 * Image utility functions for handling various image sources and fallbacks
 */

// Default fallback images for different categories
export const DEFAULT_FALLBACKS = {
  destination: '/images/fallback-destination.svg',
  activity: '/images/fallback-activity.svg',
  placeholder: '/images/placeholder.svg',
  hero: '/images/placeholder.svg'
};

/**
 * Validates if an image source is valid
 * @param {string} src - Image source URL or path
 * @returns {boolean} - Whether the source is valid
 */
export const isValidImageSrc = (src) => {
  if (!src || typeof src !== 'string') return false;
  
  // Check for valid URL patterns
  const urlPattern = /^(https?:\/\/|\/|\.\/)/;
  return urlPattern.test(src.trim());
};

/**
 * Cleans and validates image URLs
 * @param {string} src - Raw image source
 * @returns {string} - Cleaned image source or fallback
 */
export const cleanImageSrc = (src, fallback = DEFAULT_FALLBACKS.placeholder) => {
  if (!src) return fallback;
  
  // Remove any duplicate URLs that might be concatenated
  const urls = src.split('http');
  const cleanUrl = urls.length > 2 ? 'http' + urls[1] : src;
  
  return isValidImageSrc(cleanUrl) ? cleanUrl : fallback;
};

/**
 * Gets optimized image URL with proper parameters
 * @param {string} src - Image source
 * @param {Object} options - Optimization options
 * @returns {string} - Optimized image URL
 */
export const getOptimizedImageUrl = (src, options = {}) => {
  const {
    width = 800,
    quality = 80,
    format = 'webp'
  } = options;
  
  const cleanSrc = cleanImageSrc(src);
  
  // For Unsplash images, add optimization parameters
  if (cleanSrc.includes('images.unsplash.com')) {
    try {
      const url = new URL(cleanSrc);
      url.searchParams.set('w', width.toString());
      url.searchParams.set('q', quality.toString());
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      return url.toString();
    } catch (error) {
      console.warn('Failed to optimize Unsplash URL:', error);
      return cleanSrc;
    }
  }
  
  return cleanSrc;
};

/**
 * Popular destination images with fallbacks
 */
export const DESTINATION_IMAGES = {
  'dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'thailand': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'singapore': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'maldives': 'https://images.unsplash.com/photo-1540202404-1b927e27fa8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'bali': 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'turkey': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'usa': 'https://images.unsplash.com/photo-1551515984-dc49f7426dd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'uk': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'canada': 'https://images.unsplash.com/photo-1519832064146-5de0ef6e8816?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'australia': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'schengen': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'uae': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
};

/**
 * Gets image for destination by name
 * @param {string} destinationName - Name of the destination
 * @returns {string} - Image URL
 */
export const getDestinationImage = (destinationName) => {
  if (!destinationName) return DEFAULT_FALLBACKS.destination;
  
  const key = destinationName.toLowerCase().replace(/[^a-z0-9]/g, '');
  return DESTINATION_IMAGES[key] || DEFAULT_FALLBACKS.destination;
};
