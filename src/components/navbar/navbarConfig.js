// // Navigation configurations for different user types
// import {
//   Home,
//   LayoutDashboard,
//   ClipboardList,
//   Mountain,
//   Globe,
//   Target,
//   FileText,
//   UserCog,
//   Settings,
//   BarChart2,
//   SlidersHorizontal,
//   BookOpen,
//   Briefcase,
//   Users,
// } from 'lucide-react';
// const getNavbarConfig = (userRole, isAuthenticated, isDummyUser = false) => {
//   const demoPrefix = isDummyUser ? " (Demo2)" : "";

//   const configs = {
//     // Guest/Public navbar
//     guest: {
//       title: "Weeky Travel",
     
//       navItems: [
//         { label: "Home", href: "/", icon: <Home /> },
//         { label: "Domestic Holidays", href: "/domestic-holidays", icon: <Mountain /> },
//         { label: "International Holidays", href: "/international-holidays", icon: <Globe /> },
//         { label: "Activity", href: "/activity", icon: <Target /> },
//         { label: "Visa Query", href: "/visa-query", icon: <FileText /> },
//       ],
//       userInfo: null
//     },

//     // Admin navbar
//     ADMIN: {
//       title: `Weeky Travel - Admin`,
//       showSearch: false,
//       navItems: [
//         { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
//         { label: "Bookings", href: "/admin/bookings", icon: <BookOpen /> },
//         {
//           label: "Travel Packages",
//           href: "/admin/package",
//           icon: <Briefcase />,
//           submenu: [
//             { label: "Package Management", href: "/admin/package?entity=package" },
//             { label: "Package Category", href: "/admin/package?entity=packageCategory" },
//             { label: "Inclusion", href: "/admin/package?entity=inclusion" },
//             { label: "Exclusion", href: "/admin/package?entity=exclusion" },
//           ]
//         },
//         { label: "Users", href: "/admin/users", icon: <Users /> },
//         { label: "Tour", href: "/admin/tour-transport", icon: <Users /> },
//         { label: "Settings", href: "/admin/settings", icon: <Settings /> },
//       ],
//       userInfo: null // Will be populated from auth state
//     },

//     // Super Admin navbar
//     SUPERADMIN: {
//       title: `Weeky Travel - Super Admin${demoPrefix}`,
//       showSearch: false,
//       navItems: [
//         { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
//         { label: "Admin Management", href: "/superadmin/admins", icon: <UserCog /> },
//         { label: "System Settings", href: "/superadmin/system", icon: <SlidersHorizontal /> },
//         { label: "Analytics", href: "/superadmin/analytics", icon: <BarChart2 /> },
//         { label: "Logs", href: "/superadmin/logs", icon: <FileText /> },
//       ],
//       userInfo: null // Will be populated from auth state
//     },

//     // User navbar
//     USER: {
//       title: `Weeky Travel${demoPrefix}`,
//       showSearch: true,
//       navItems: [
//         { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
//         { label: "Bookings", href: "/admin/bookings", icon: <BookOpen /> },
//         { label: "Travel Packages", href: "/admin/packages", icon: <Briefcase /> },
//         { label: "Users", href: "/admin/users", icon: <Users /> },
//       ],
//       userInfo: null // Will be populated from auth state
//     },
//   };

//   if (!isAuthenticated) {
//     return configs.guest;
//   }

//   // Convert role to uppercase for consistency
//   const normalizedRole = userRole?.toUpperCase();
//   return configs[normalizedRole] || configs.USER;
// };

// const navbarConfig = { getNavbarConfig };

// export default navbarConfig;
