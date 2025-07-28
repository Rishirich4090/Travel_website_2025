"use client";
import React, { useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import NewNavbar from "../components/navbar/NewNavbar";
import ResponsiveSidebar from "../components/ResponsiveSidebar";
import ThemeProvider from "../components/ThemeProvider";
import ErrorBoundary from "../components/ErrorBoundary";
import { Toast } from "../components/Toast";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSlice";
import { getActiveTheme } from "../redux/slice/adminColorSlice";
import { setApiTheme } from "../redux/slice/themeSlice";
import { getPublicColorTheme, applyPublicTheme } from "../redux/slice/publicApiSlice";
import "./globals.css";
import ReduxProvider from "./Provider";
import setupErrorLogging from "../utils/errorLogger";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>WeeklyTravel - Your Gateway to Amazing Adventures</title>
        <meta name="description" content="Discover your next adventure with WeeklyTravel. Explore domestic and international holidays, activities, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ErrorBoundary>
          <ReduxProvider>
            <ThemeProvider>
              <LayoutWithRedux>{children}</LayoutWithRedux>
            </ThemeProvider>
          </ReduxProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

function LayoutWithRedux({ children }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    // Optionally redirect to home or login page
    window.location.replace("/");
  };
  const pathname = usePathname()?.toLowerCase() || '';
  const token = useSelector((state) => state.auth.token);
  const theme = useSelector((state) => state.theme.theme);
  const [canRender, setCanRender] = React.useState(false);

  // Setup error logging on client side
  useEffect(() => {
    setupErrorLogging();
  }, []);

  // Load active theme on app initialization
  useEffect(() => {
    // For authenticated admin users, try to load from admin API
    if (token && pathname.startsWith('/admin')) {
      dispatch(getActiveTheme()).then((result) => {
        if (result.payload && result.payload.result) {
          // Apply the active theme from admin API to the global theme state
          dispatch(setApiTheme(result.payload.result));
          console.log('✅ Admin theme loaded and applied:', result.payload.result);
        }
      }).catch(() => {
        // If admin API fails, try public API
        dispatch(getPublicColorTheme()).then((publicResult) => {
          if (publicResult.payload) {
            dispatch(applyPublicTheme(publicResult.payload));
            console.log('✅ Public theme loaded as fallback for admin');
          }
        }).catch(() => {
          console.log('⚠️ Using default theme - Both APIs not available');
        });
      });
    } else {
      // For public/guest users, use public API
      dispatch(getPublicColorTheme()).then((result) => {
        if (result.payload) {
          dispatch(applyPublicTheme(result.payload));
          console.log('✅ Public theme loaded and applied:', result.payload);
        }
      }).catch(() => {
        console.log('⚠️ Using default theme - Public API not available');
      });
    }
  }, [dispatch, token, pathname]);

  // Apply theme as CSS variables and CSS classes
  useEffect(() => {
    if (theme && typeof document !== 'undefined') {
      const root = document.documentElement;

      // Apply theme colors as CSS custom properties
      Object.entries(theme).forEach(([key, value]) => {
        const cssVar = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        root.style.setProperty(cssVar, value);
      });

      // Apply theme as CSS classes for easier styling
      // Remove all existing theme classes
      const existingThemeClasses = Array.from(root.classList).filter(cls => cls.startsWith('theme-'));
      existingThemeClasses.forEach(cls => root.classList.remove(cls));

      // Add new theme classes based on theme properties
      if (theme.themeName) {
        // Add theme-specific class if theme has a name
        root.classList.add(`theme-${theme.themeName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`);
      }

      // Add color scheme classes for easier CSS targeting
      root.classList.add('theme-applied');

      // Add dark/light mode class based on background color brightness
      const bgColor = theme.backgroundColor || '#FFFFFF';
      const isLight = isLightColor(bgColor);
      root.classList.remove('theme-light', 'theme-dark');
      root.classList.add(isLight ? 'theme-light' : 'theme-dark');

      console.log('🎨 Theme applied with CSS variables and classes:', {
        themeName: theme.themeName,
        colorScheme: isLight ? 'light' : 'dark',
        cssVars: Object.keys(theme).length,
        classes: Array.from(root.classList).filter(cls => cls.startsWith('theme-'))
      });
    }
  }, [theme]);

  // Helper function to determine if a color is light or dark
  const isLightColor = (color) => {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calculate brightness using YIQ formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  };

  React.useEffect(() => {
    const publicPaths = ['/login', '/signup', '/resetpassword', '/', '/domestic-holidays', '/international-holidays', '/activity', '/visa-query', '/backup/international-holidays', '/contact', 'top-packages', '/top-packages'];

    // Redirect unauthenticated users from protected routes to landing page
    if (!token && !publicPaths.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
      const isDetailPage = /^\/(tour|destination|activity|domestic-holidays|international-holidays)\/\d+$/.test(pathname);
      if (!isDetailPage) {
        console.log('Layout: Redirecting to landing page from protected route:', pathname);
        window.location.replace('/');
        return;
      }
    }

    // Redirect authenticated users from landing page to dashboard
    if (token && pathname === '/') {
      window.location.replace('/dashboard');
      return;
    }

    setCanRender(true);
  }, [token, pathname]);

  // Show navbar for all pages except login/signup
  const showNavbar = pathname !== '/login' && pathname !== '/signup' && pathname !== '/resetpassword';

  // Check if user is authenticated and should see sidebar
  const user = useSelector((state) => state.auth.user);
  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'Bookings', href: '/admin/bookings', icon: '🗂️' },
    {
      label: 'Travel Packages',
      href: '/admin/package',
      icon: '🏖️',
      submenu: [
        { label: "Package Management", href: "/admin/package?entity=package" },
        { label: "Package Category", href: "/admin/package?entity=packageCategory" },
        { label: "Inclusion", href: "/admin/package?entity=inclusion" },
        { label: "Exclusion", href: "/admin/package?entity=exclusion" },
      ]
    },
    { label: 'Users', href: '/admin/users', icon: '👥' },
    { label: "Tour", href: "/admin/tour-transport", icon: '🚇' },
    { label: "Package-Detail", href: "/admin/package-deatil", icon: '🚇' },
    { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ];
  const showSidebar = !!user;

  return canRender ? (
    <div
      style={{
        backgroundColor: theme.backgroundColor || '#FFFFFF',
        color: theme.textColor || '#1F2937',
        minHeight: '100vh'
      }}
      className={token ? "flex flex-col lg:flex-row" : undefined}
    >
      {showNavbar && !showSidebar && <NewNavbar />}
      {showSidebar ? (
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar - Fixed width container */}
          <div className="lg:w-64 lg:flex-shrink-0">
            <ResponsiveSidebar
              menuItems={navItems}
              userInfo={user}
              title="Weeky Travel"
              onLogout={handleLogout}
            />
          </div>
          {/* Main content area - Takes remaining space */}
          <main className="flex-1 min-w-0 lg:overflow-x-hidden">
            {/* Mobile header spacing - 64px for mobile header */}
            <div className="lg:hidden h-16"></div>
            {/* Toast notifications */}
            <Toast />
            {/* Page content with proper padding */}
            <div className="w-full min-h-screen lg:min-h-0 pt-16">
              <div className="px-2 py- lg:px-6 lg:py-6 max-w-full">
                {children}
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div className={`flex-1 ${showNavbar ? 'pt-16 lg:pt-0' : ''}`}>
          <Toast />
          <div className="min-h-screen">
            {children}
          </div>
        </div>
      )}
    </div>
  ) : null;
}