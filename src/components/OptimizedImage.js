// "use client";
// import React from 'react';
// import Image from 'next/image';
// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { selectTheme } from '../redux/slice/themeSlice';

// const OptimizedImage = ({ 
//   src, 
//   alt, 
//   fallbackSrc = '/images/placeholder.svg',
//   className = '',
//   fill = false,
//   width,
//   height,
//   priority = false,
//   sizes,
//   ...props 
// }) => {
//   const [imgSrc, setImgSrc] = useState(src);
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasError, setHasError] = useState(false);
//   const theme = useSelector(selectTheme);

//   // Reset state when src changes
//   useEffect(() => {
//     setImgSrc(src);
//     setIsLoading(true);
//     setHasError(false);
//   }, [src]);

//   const handleError = () => {
//     console.warn(`Failed to load image: ${imgSrc}`);
//     if (!hasError && imgSrc !== fallbackSrc) {
//       setHasError(true);
//       setImgSrc(fallbackSrc);
//       setIsLoading(false);
//     }
//   };

//   const handleLoad = () => {
//     setIsLoading(false);
//   };

//   // Validate image source
//   const isValidImageSrc = (src) => {
//     if (!src) return false;
//     if (typeof src !== 'string') return false;
//     // Check if it's a valid URL or local path
//     return src.startsWith('http') || src.startsWith('/') || src.startsWith('./');
//   };

//   // Use fallback if source is invalid
//   const imageSrc = isValidImageSrc(imgSrc) ? imgSrc : fallbackSrc;

//   // Common image props
//   const imageProps = {
//     src: imageSrc,
//     alt: alt || 'Image',
//     onError: handleError,
//     onLoad: handleLoad,
//     className: `${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
//     priority,
//     ...props
//   };

//   // If fill is true, don't include width/height
//   if (fill) {
//     return (
//       <div className="relative">
//         <Image
//           {...imageProps}
//           fill
//           sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
//           alt={alt || 'Image'}
//         />
//         {isLoading && (
//           <div style={{ backgroundColor: theme.backgroundColorSecondary || '#F3F4F6' }} className="absolute inset-0 animate-pulse rounded" />
//         )}
//         {hasError && (
//           <div style={{ backgroundColor: theme.backgroundColorSecondary || '#F9FAFB' }} className="absolute inset-0 flex items-center justify-center">
//             <div style={{ color: theme.textColorSecondary }} className="text-center">
//               <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20" alt="Placeholder icon">
//                 <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
//               </svg>
//               <span className="text-xs">Image unavailable</span>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="relative" style={{ width, height }}>
//       <Image
//         {...imageProps}
//         width={width}
//         height={height}
//         sizes={sizes}
//         alt={alt || 'Image'}
//       />
//       {isLoading && (
//         <div 
//           style={{ 
//             backgroundColor: theme.backgroundColorSecondary || '#F3F4F6',
//             width, 
//             height 
//           }}
//           className="absolute inset-0 animate-pulse rounded" 
//         />
//       )}
//       {hasError && (
//         <div 
//           style={{ 
//             backgroundColor: theme.backgroundColorSecondary || '#F9FAFB',
//             width, 
//             height 
//           }}
//           className="absolute inset-0 flex items-center justify-center"
//         >
//           <div style={{ color: theme.textColorSecondary }} className="text-center">
//             <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20" alt="Placeholder icon">
//               <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
//             </svg>
//             <span className="text-xs">Image unavailable</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OptimizedImage;
