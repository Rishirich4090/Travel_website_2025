"use client";
import React, { useState, useEffect } from 'react';
import ImageWithFallback from '../../../components/ImageWithFallback';
import ImageDebugger from '../../../utils/imageDebugger';

const ImageTestPage = () => {
  const [testResults, setTestResults] = useState({});

  const testImages = React.useMemo(() => ({
    validUnsplash: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    invalidUrl: 'https://invalid-url-that-should-fail.com/image.jpg',
    localFallback: '/images/placeholder.svg'
  }), []);

  useEffect(() => {
    ImageDebugger.validateImageUrls(testImages);
  }, [testImages]);

  const handleImageLoad = (key) => {
    setTestResults(prev => ({ ...prev, [key]: 'loaded' }));
    ImageDebugger.log(`Image ${key} loaded successfully`);
  };

  const handleImageError = (key) => {
    setTestResults(prev => ({ ...prev, [key]: 'error' }));
    ImageDebugger.error(`Image ${key} failed to load`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Image Loading Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(testImages).map(([key, url]) => (
            <div key={key} className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold mb-2">{key}</h3>
              <p className="text-sm text-gray-600 mb-4 break-all">{url}</p>
              
              <div className="relative h-48 mb-4 border rounded">
                <ImageWithFallback
                  src={url}
                  alt={`Test image ${key}`}
                  fill
                  className="object-cover rounded"
                  fallbackSrc="/images/placeholder.svg"
                  onLoadingComplete={() => handleImageLoad(key)}
                />
              </div>
              
              <div className={`text-sm font-medium ${
                testResults[key] === 'loaded' ? 'text-green-600' :
                testResults[key] === 'error' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                Status: {testResults[key] || 'loading...'}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Debugging Information</h2>
          <p className="text-sm text-gray-600">
            Check your browser&#39;s console for detailed image loading logs.
            Open Developer Tools (F12) and look for [ImageDebugger] messages.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageTestPage;
