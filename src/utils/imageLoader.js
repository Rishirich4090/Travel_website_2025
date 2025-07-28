/**
 * Custom image loader for production environments
 * Handles image optimization and fallbacks
 */

const imageLoader = ({ src, width, quality }) => {
  // For external URLs, return as-is with optimization parameters
  if (src.startsWith('http')) {
    const url = new URL(src);
    
    // For Unsplash images, add optimization parameters
    if (url.hostname === 'images.unsplash.com') {
      url.searchParams.set('w', width.toString());
      url.searchParams.set('q', (quality || 75).toString());
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      return url.toString();
    }
    
    return src;
  }
  
  // For local images, return as-is
  return src;
};

export default imageLoader;
