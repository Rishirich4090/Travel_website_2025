// /**
//  * Image Test Component for debugging image loading issues
//  * This component can be temporarily added to any page to test image loading
//  */

// "use client";
// import React, { useState } from 'react';
// import OptimizedImage from './OptimizedImage';
// import { cleanImageSrc, DEFAULT_FALLBACKS } from '../utils/imageUtils';
// import { useSelector } from 'react-redux';
// import { selectTheme } from '../redux/slice/themeSlice';

// const ImageTest = () => {
//   const theme = useSelector(selectTheme);
//   const [testUrls, setTestUrls] = useState([
//     'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     'https://invalid-url.com/image.jpg',
//     '/images/placeholder.svg',
//     'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     '', // Empty string test
//     'not-a-valid-url', // Invalid format test
//   ]);

//   const [customUrl, setCustomUrl] = useState('');

//   const addCustomUrl = () => {
//     if (customUrl && !testUrls.includes(customUrl)) {
//       setTestUrls([...testUrls, customUrl]);
//       setCustomUrl('');
//     }
//   };

//   const removeUrl = (index) => {
//     setTestUrls(testUrls.filter((_, i) => i !== index));
//   };

//   return (
//     <div style={{ backgroundColor: theme.backgroundColorSecondary, minHeight: '100vh' }} className="p-8">
//       <h2 style={{ color: theme.textColor }} className="text-2xl font-bold mb-6">Image Loading Test</h2>
      
//       {/* Add custom URL */}
//       <div className="mb-6 p-4 bg-white rounded-lg shadow">
//         <h3 className="text-lg font-semibold mb-3">Add Custom Image URL</h3>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={customUrl}
//             onChange={(e) => setCustomUrl(e.target.value)}
//             placeholder="Enter image URL to test"
//             className="flex-1 px-3 py-2 border rounded"
//           />
//           <button
//             onClick={addCustomUrl}
//             style={{
//               backgroundColor: theme.primaryColor,
//               color: theme.buttonTextColor || '#ffffff'
//             }}
//             className="px-4 py-2 rounded hover:opacity-90 transition-opacity"
//           >
//             Add Test
//           </button>
//         </div>
//       </div>

//       {/* Image Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {testUrls.map((url, index) => (
//           <div key={index} className="bg-white rounded-lg shadow p-4">
//             <div className="flex justify-between items-start mb-3">
//               <h4 className="text-sm font-medium text-gray-700">Test {index + 1}</h4>
//               <button
//                 onClick={() => removeUrl(index)}
//                 className="text-red-500 hover:text-red-700 text-sm"
//               >
//                 Remove
//               </button>
//             </div>
            
//             {/* Original URL */}
//             <div className="mb-2">
//               <span className="text-xs text-gray-500">Original URL:</span>
//               <p className="text-xs break-all bg-gray-50 p-2 rounded">
//                 {url || '(empty)'}
//               </p>
//             </div>
            
//             {/* Cleaned URL */}
//             <div className="mb-3">
//               <span className="text-xs text-gray-500">Cleaned URL:</span>
//               <p className="text-xs break-all bg-gray-50 p-2 rounded">
//                 {cleanImageSrc(url)}
//               </p>
//             </div>
            
//             {/* Image Display */}
//             <div className="relative h-40 w-full bg-gray-200 rounded overflow-hidden">
//               <OptimizedImage
//                 src={url}
//                 alt={`Test image ${index + 1}`}
//                 fill
//                 className="object-cover"
//                 fallbackSrc={DEFAULT_FALLBACKS.placeholder}
//                 sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//               />
//             </div>
            
//             {/* Status indicators */}
//             <div className="mt-2 flex gap-2">
//               <span className={`text-xs px-2 py-1 rounded ${
//                 url ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//               }`}>
//                 {url ? 'Has URL' : 'No URL'}
//               </span>
//               <span className={`text-xs px-2 py-1 rounded ${
//                 cleanImageSrc(url) !== DEFAULT_FALLBACKS.placeholder 
//                   ? 'bg-blue-100 text-blue-800' 
//                   : 'bg-yellow-100 text-yellow-800'
//               }`}>
//                 {cleanImageSrc(url) !== DEFAULT_FALLBACKS.placeholder ? 'Valid' : 'Fallback'}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {/* Instructions */}
//       <div className="mt-8 p-4 bg-blue-50 rounded-lg">
//         <h3 className="font-semibold text-blue-900 mb-2">How to use this test:</h3>
//         <ul className="text-sm text-blue-800 space-y-1">
//           <li>• Working images should load without showing fallback icons</li>
//           <li>• Broken URLs should gracefully show the fallback placeholder</li>
//           <li>• Images should fade in smoothly when loaded</li>
//           <li>• Check the network tab to see if images are being properly optimized</li>
//           <li>• You can add your own URLs to test different image sources</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ImageTest;
