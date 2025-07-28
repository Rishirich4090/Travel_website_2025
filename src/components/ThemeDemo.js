// "use client";
// import React from 'react';

// const ThemeDemo = () => {
//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       <div className="theme-card">
//         <h1 className="text-3xl font-bold mb-4">Theme Demo Component</h1>
//         <p className="mb-4">
//           This component demonstrates how to use the new theme classes. 
//           All styling is applied via CSS classes that automatically adapt to the active theme.
//         </p>
//       </div>

//       {/* Button Examples */}
//       <div className="theme-card">
//         <h2 className="text-2xl font-bold mb-4">Button Examples</h2>
//         <div className="flex flex-wrap gap-4">
//           <button className="theme-btn-primary">
//             Primary Button
//           </button>
//           <button className="theme-btn-secondary">
//             Secondary Button
//           </button>
//           <button className="theme-success px-4 py-2 rounded">
//             Success Button
//           </button>
//           <button className="theme-warning px-4 py-2 rounded">
//             Warning Button
//           </button>
//           <button className="theme-error px-4 py-2 rounded">
//             Error Button
//           </button>
//         </div>
//       </div>

//       {/* Form Examples */}
//       <div className="theme-card">
//         <h2 className="text-2xl font-bold mb-4">Form Examples</h2>
//         <div className="space-y-4">
//           <div>
//             <label className="block mb-2 font-medium">Name</label>
//             <input 
//               type="text" 
//               placeholder="Enter your name" 
//               className="theme-input w-full"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 font-medium">Email</label>
//             <input 
//               type="email" 
//               placeholder="Enter your email" 
//               className="theme-input w-full"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 font-medium">Message</label>
//             <textarea 
//               placeholder="Enter your message" 
//               rows="4"
//               className="theme-input w-full"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Card Grid Examples */}
//       <div className="theme-card">
//         <h2 className="text-2xl font-bold mb-4">Card Grid Examples</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <div className="theme-card">
//             <h3 className="text-lg font-semibold mb-2">Feature 1</h3>
//             <p className="theme-text-secondary mb-3">
//               This card automatically adapts to the active theme colors.
//             </p>
//             <a href="#" className="text-blue-500 hover:underline">
//               Learn More →
//             </a>
//           </div>
//           <div className="theme-card">
//             <h3 className="text-lg font-semibold mb-2">Feature 2</h3>
//             <p className="theme-text-secondary mb-3">
//               All text, backgrounds, and borders use theme variables.
//             </p>
//             <a href="#" className="text-blue-500 hover:underline">
//               Learn More →
//             </a>
//           </div>
//           <div className="theme-card">
//             <h3 className="text-lg font-semibold mb-2">Feature 3</h3>
//             <p className="theme-text-secondary mb-3">
//               Hover effects and transitions are theme-aware too.
//             </p>
//             <a href="#" className="text-blue-500 hover:underline">
//               Learn More →
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Alert Examples */}
//       <div className="theme-card">
//         <h2 className="text-2xl font-bold mb-4">Alert Examples</h2>
//         <div className="space-y-3">
//           <div className="theme-success p-4 rounded">
//             <strong>Success!</strong> This is a success message using theme colors.
//           </div>
//           <div className="theme-warning p-4 rounded">
//             <strong>Warning!</strong> This is a warning message using theme colors.
//           </div>
//           <div className="theme-error p-4 rounded">
//             <strong>Error!</strong> This is an error message using theme colors.
//           </div>
//           <div className="theme-info p-4 rounded">
//             <strong>Info!</strong> This is an info message using theme colors.
//           </div>
//         </div>
//       </div>

//       {/* CSS Classes Reference */}
//       <div className="theme-card">
//         <h2 className="text-2xl font-bold mb-4">Available CSS Classes</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Background & Layout</h3>
//             <ul className="list-disc list-inside space-y-1 theme-text-secondary text-sm">
//               <li><code>.theme-bg</code> - Main background color</li>
//               <li><code>.theme-surface</code> - Surface/card background</li>
//               <li><code>.theme-card</code> - Pre-styled card component</li>
//               <li><code>.theme-navbar</code> - Navbar styling</li>
//               <li><code>.theme-footer</code> - Footer styling</li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Text & Colors</h3>
//             <ul className="list-disc list-inside space-y-1 theme-text-secondary text-sm">
//               <li><code>.theme-text</code> - Primary text color</li>
//               <li><code>.theme-text-secondary</code> - Secondary text color</li>
//               <li><code>.theme-border</code> - Border color</li>
//               <li><code>.theme-success/warning/error/info</code> - Status colors</li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Buttons</h3>
//             <ul className="list-disc list-inside space-y-1 theme-text-secondary text-sm">
//               <li><code>.theme-btn-primary</code> - Primary button style</li>
//               <li><code>.theme-btn-secondary</code> - Secondary button style</li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Forms</h3>
//             <ul className="list-disc list-inside space-y-1 theme-text-secondary text-sm">
//               <li><code>.theme-input</code> - Input field styling</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="theme-card theme-border border-2 p-6">
//         <h2 className="text-2xl font-bold mb-4">How It Works</h2>
//         <div className="prose max-w-none">
//           <p className="mb-4">
//             The theme system works in three layers:
//           </p>
//           <ol className="list-decimal list-inside space-y-2 theme-text-secondary">
//             <li><strong>CSS Variables:</strong> All theme colors are available as CSS custom properties (e.g., <code>var(--color-primary-color)</code>)</li>
//             <li><strong>Theme Classes:</strong> Pre-built CSS classes that automatically use theme variables</li>
//             <li><strong>Dynamic Classes:</strong> JavaScript applies theme-specific classes to the document root</li>
//           </ol>
//           <p className="mt-4">
//             When you apply a theme in the admin settings, it:
//           </p>
//           <ul className="list-disc list-inside space-y-1 theme-text-secondary mt-2">
//             <li>Saves the theme permanently to the API</li>
//             <li>Updates all CSS variables globally</li>
//             <li>Applies theme classes to the document root</li>
//             <li>Persists across page refreshes and user sessions</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ThemeDemo;
