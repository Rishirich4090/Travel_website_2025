// "use client";
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { useSelector } from 'react-redux';
// import { selectTheme } from '../redux/slice/themeSlice';

// const ImageWithFallback = ({ 
//   src, 
//   alt, 
//   fallbackSrc = '/images/placeholder.svg',
//   className = '',
//   fill = false,
//   width,
//   height,
//   priority = false,
//   sizes,
//   onLoadingComplete,
//   unoptimized,
//   ...props 
// }) => {
//   const [imgSrc, setImgSrc] = useState(src);
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasError, setHasError] = useState(false);
//   const theme = useSelector(selectTheme);

//   // Reset state when src prop changes
//   useEffect(() => {
//     setImgSrc(src);
//     setIsLoading(true);
//     setHasError(false);
//   }, [src]);

//   const handleLoad = (result) => {
//     setIsLoading(false);
//     if (onLoadingComplete) {
//       onLoadingComplete(result);
//     }
//   };

//   const handleError = () => {
//     console.warn(`Image failed to load: ${imgSrc}, using fallback`);
//     setHasError(true);
//     setIsLoading(false);
//     if (imgSrc !== fallbackSrc) {
//       setImgSrc(fallbackSrc);
//     }
//   };

//   // Loading placeholder
//   const LoadingPlaceholder = () => (
//     <div 
//       style={{
//         backgroundColor: theme.backgroundColorSecondary || '#F3F4F6',
//         width: fill ? '100%' : width,
//         height: fill ? '100%' : height
//       }}
//       className={`animate-pulse flex items-center justify-center ${className}`}
//     >
//       <svg 
//         style={{ color: theme.textColorSecondary }} 
//         className="w-8 h-8" 
//         fill="currentColor" 
//         viewBox="0 0 20 20"
//       >
//         <path 
//           fillRule="evenodd" 
//           d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
//           clipRule="evenodd" 
//         />
//       </svg>
//     </div>
//   );

//   // Error placeholder
//   const ErrorPlaceholder = () => (
//     <div 
//       style={{
//         backgroundColor: theme.backgroundColorSecondary || '#F9FAFB',
//         width: fill ? '100%' : width,
//         height: fill ? '100%' : height
//       }}
//       className={`flex items-center justify-center ${className}`}
//     >
//       <div style={{ color: theme.textColorSecondary }} className="text-center">
//         <svg 
//           className="w-8 h-8 mx-auto mb-2" 
//           fill="currentColor" 
//           viewBox="0 0 20 20"
//         >
//           <path 
//             fillRule="evenodd" 
//             d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
//             clipRule="evenodd" 
//           />
//         </svg>
//         <span className="text-xs">Image not available</span>
//       </div>
//     </div>
//   );

//   // If there's an error and we're already showing fallback, show error placeholder
//   if (hasError && imgSrc === fallbackSrc) {
//     return <ErrorPlaceholder />;
//   }

//   // Common props for the Image component
//   const imageProps = {
//   src: imgSrc,
//   alt: alt || '',
//     onLoad: handleLoad,
//     onError: handleError,
//     className: `${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
//     priority,
//     ...props
//   };

//   if (fill) {
//     return (
//       <div className="relative w-full h-full">
//         {isLoading && <LoadingPlaceholder />}
//         <Image
//           {...imageProps}
//           fill
//           sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
//           alt={alt || ''}
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="relative" style={{ width, height }}>
//       {isLoading && <LoadingPlaceholder />}
//       <Image
//         {...imageProps}
//         width={width}
//         height={height}
//         sizes={sizes}
//         alt={alt || ''}
//       />
//     </div>
//   );
// };

// export default ImageWithFallback;
