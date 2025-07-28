// 'use client';

// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import ResponsiveSidebar from '../ResponsiveSidebar';
// import { getNavbarConfig } from './navbarConfigs';
// import { selectUser, selectIsAuthenticated, logout } from '../../redux/slice/authSlice';
// import { selectPublicWebsiteSettings, getPublicColorTheme } from '../../redux/slice/publicApiSlice';

// const DynamicNavbar = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const dispatch = useDispatch();
//   const router = useRouter();

//    const theme = useSelector((state) => state.publicApi.colorTheme);
  
//     useEffect(() => {
//       dispatch(getPublicColorTheme());
//     }, [dispatch]);

//   const user = useSelector(selectUser);
//   const isAuthenticated = useSelector(selectIsAuthenticated);
//   const websiteSettings = useSelector(selectPublicWebsiteSettings);

//   // Determine user type
//   const getUserType = () => {
//     if (!isAuthenticated || !user) return 'guest';
    
//     switch (user.role?.toLowerCase()) {
//       case 'superadmin':
//       case 'super_admin':
//         return 'superadmin';
//       case 'admin':
//         return 'admin';
//       case 'user':
//       case 'customer':
//         return 'user';
//       default:
//         return 'guest';
//     }
//   };

//   const userType = getUserType();

//   const handleLogout = async () => {
//     try {
//       await dispatch(logout()).unwrap();
//       router.push('/');
//     } catch (error) {
//       console.error('Logout failed:', error);
//       // Force logout even if API fails
//       router.push('/');
//     }
//   };

//   const menuItems = getNavbarConfig(userType, handleLogout);

//   // Get logo and company name from website settings or defaults
//   const logo = websiteSettings?.logoUrl || '/next.svg';
//   const companyName = websiteSettings?.companyName || 'Weekly Travel Portal';

//   return (
//     <>
//       {/* Top Navigation Bar */}
//       <nav className=" fixed top-0 left-0 right-0 z-30 lg:pl-64"
//       style={{
//         backgroundColor: theme.navbarBgColor || '#0000',
//         color: theme.navbarTextColor || '#000000',
//         borderBottomColor: theme.border
//       }}
//       >
//         <div className="px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             {/* Left side - Menu button and title */}
//             <div className="flex items-center">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
//               >
//                 <span className="sr-only">Open sidebar</span>
//                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               </button>
              
//               {/* Mobile logo and title */}
//               <div className="lg:hidden flex items-center ml-2">
//                 <Image src={logo} alt="Logo" className="h-8 w-8" width={32} height={32} />
//                 <span className="ml-2 font-semibold text-gray-800">{companyName}</span>
//               </div>
//             </div>

//             {/* Right side - User info and actions */}
//             <div className="flex items-center space-x-4">
//               {isAuthenticated && user ? (
//                 <div className="flex items-center space-x-3">
//                   <div className="text-right">
//                     <p className="text-sm font-medium text-gray-700">{user.name || user.username}</p>
//                     <p className="text-xs text-gray-500 capitalize">{user.role || 'User'}</p>
//                   </div>
//                   <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
//                     <span className="text-sm font-medium text-white">
//                       {(user.name || user.username || 'U').charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => router.push('/login')}
//                     className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
//                   >
//                     Login
//                   </button>
//                   <button
//                     onClick={() => router.push('/signup')}
//                     className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
//                   >
//                     Sign Up
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Sidebar */}
//       <ResponsiveSidebar
//         isOpen={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//         menuItems={menuItems}
//         logo={logo}
//         companyName={companyName}
//         userType={userType}
//       />

//       {/* Main content spacer */}
//       <div className="lg:pl-64 pt-16">
//         {/* This div creates the proper spacing for the main content */}
//       </div>
//     </>
//   );
// };

// export default DynamicNavbar;
