// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter, usePathname } from "next/navigation";
// import { useRouter } from 'next/navigation';
// import { getPublicColorTheme } from '../redux/slice/publicApiSlice';
// import { logout } from "../redux/slice/authSlice";
// import { selectTheme } from "../redux/slice/themeSlice";
// import { showToast } from "./Toast";

// const MainNavbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user, userRole, token } = useSelector((state) => state.auth);
//   const theme = useSelector((state) => state.publicApi.colorTheme);

//   useEffect(() => {
//     dispatch(getPublicColorTheme());
//   }, [dispatch]);

//   const role = userRole || (typeof window !== 'undefined' ? localStorage.getItem('userRole') : null);
//   const isAuthenticated = token || (typeof window !== 'undefined' && localStorage.getItem('token'));

//   const handleLogout = () => {
//     dispatch(logout());
//     showToast("Logged out successfully!", "success");
//     router.replace("/");  // Redirect to landing page instead of login
//   };

//   // Main navigation items
//   const navigationItems = [
//     { label: "Home", href: "/" },
//     { label: "Domestic Holidays", href: "/domestic-holidays" },
//     // { label: "Domestic Holidays", href: "/" },
//     { label: "International Holidays", href: "/international-holidays" },
//     { label: "Activity", href: "/activity" },
//     { label: "Visa Query", href: "/visa-query" },
//   ];

//   const isActiveLink = (href) => {
//     return pathname === href || (href !== '/' && pathname.startsWith(href));
//   };

//   return (
//     <nav
//       className="w-full px-4 py-4 shadow-md sticky top-0 z-40"
//       style={{
//         backgroundColor: '#004466',
//         color: theme.navbarTextColor || '#000000',
//         borderBottomColor: theme.border
//       }}
//     >
//       <div className="container mx-auto flex items-center justify-between">
//         {/* Logo */}
//         <div className="flex items-center">
//           <Link href="/" className="text-2xl font-bold" style={{ color: theme.primary }}>
//             WeeklyTravel
//           </Link>
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden lg:flex items-center space-x-4">
//           {navigationItems.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`font-medium transition-colors hover:opacity-80 ${isActiveLink(item.href) ? 'border-b-2' : ''
//                 }`}
//               style={{
//                 color: isActiveLink(item.href) ? theme.primary : theme.text,
//                 borderColor: theme.primary
//               }}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>

//         {/* User Actions & Search */}
//         <div className="hidden lg:flex items-center space-x-4">
//           {/* Search Bar */}


//           {isAuthenticated ? (
//             <>
//               {/* User Dashboard Link */}
//               <Link
//                 href="/dashboard"
//                 className="px-4 py-2 rounded-full font-medium transition-colors"
//                 style={{
//                   backgroundColor: theme.primary,
//                   color: theme.background
//                 }}
//               >
//                 Dashboard
//               </Link>

//               {/* User Info */}
//               <div className="flex items-center space-x-2">
//                 <span className="text-sm font-medium" style={{ color: theme.text }}>
//                   {user?.name || user?.email}
//                 </span>
//                 <button
//                   onClick={handleLogout}
//                   className="p-2 rounded-full transition-colors hover:bg-opacity-10"
//                   style={{
//                     color: theme.error,
//                     backgroundColor: `${theme.error}10`
//                   }}
//                   aria-label="Logout"
//                 >
//                   <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="flex items-center space-x-3">
//               <Link
//                 href="/login"
//                 className="px-4 py-2 rounded-full font-medium transition-colors border"
//                 style={{
//                   borderColor: theme.primary,
//                   color: theme.primary
//                 }}
//               >
//                 Login
//               </Link>
//               <Link
//                 href="/signup"
//                 className="px-4 py-2 rounded-full font-medium transition-colors"
//                 style={{
//                   backgroundColor: theme.primary,
//                   color: theme.background
//                 }}
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Mobile menu button */}
//         <div className="lg:hidden">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="p-2 rounded-md"
//             style={{ color: theme.text }}
//             aria-label="Toggle menu"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               {isOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               )}
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isOpen && (
//         <div
//           className="lg:hidden mt-4 py-4 border-t"
//           style={{
//             borderTopColor: theme.border,
//             backgroundColor: theme.surface
//           }}
//         >
//           <div className="flex flex-col space-y-4 px-4">
//             {navigationItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className="font-medium py-2 transition-colors"
//                 style={{
//                   color: isActiveLink(item.href) ? theme.primary : theme.text
//                 }}
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item.label}
//               </Link>
//             ))}
//             {/* Mobile User Actions */}
//             {isAuthenticated ? (
//               <div className="flex flex-col space-y-3 pt-4 border-t" style={{ borderTopColor: theme.border }}>
//                 <Link
//                   href="/dashboard"
//                   className="text-center py-2 rounded-full font-medium"
//                   style={{
//                     backgroundColor: theme.primary,
//                     color: theme.background
//                   }}
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   onClick={() => { setIsOpen(false); handleLogout(); }}
//                   className="text-center py-2 font-medium"
//                   style={{ color: theme.error }}
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="flex flex-col space-y-3 pt-4 border-t" style={{ borderTopColor: theme.border }}>
//                 <Link
//                   href="/login"
//                   className="text-center py-2 rounded-full font-medium border"
//                   style={{
//                     borderColor: theme.primary,
//                     color: theme.primary
//                   }}
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/signup"
//                   className="text-center py-2 rounded-full font-medium"
//                   style={{
//                     backgroundColor: theme.primary,
//                     color: theme.background
//                   }}
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default MainNavbar;
