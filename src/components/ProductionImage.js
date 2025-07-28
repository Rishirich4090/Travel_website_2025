// "use client";
// import Image from 'next/image';
// import { useState } from 'react';

// const ProductionImage = ({ 
//   src, 
//   alt, 
//   fallbackSrc = '/images/placeholder.svg',
//   ...props 
// }) => {
//   const [imgSrc, setImgSrc] = useState(src);
//   const [isError, setIsError] = useState(false);

//   const handleError = () => {
//     if (!isError && imgSrc !== fallbackSrc) {
//       console.warn(`Image failed to load: ${imgSrc}, switching to fallback`);
//       setIsError(true);
//       setImgSrc(fallbackSrc);
//     }
//   };

//   return (
//     <Image
//       {...props}
//       src={imgSrc}
//       alt={alt || 'Image'}
//       onError={handleError}
//       loading={props.priority ? 'eager' : 'lazy'}
//     />
//   );
// };

// export default ProductionImage;
