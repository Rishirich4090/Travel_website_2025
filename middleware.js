import { NextResponse } from 'next/server';

export function middleware(request) {
  // Allow these paths without auth - Landing page and public routes
  const publicPaths = ['/login', '/signup', '/resetpassword', '/', '/domestic-holidays', '/international-holidays', '/activity', '/visa-query', '/_next', '/favicon.ico', '/api', '/public'];
  let { pathname } = request.nextUrl;
  
  console.log('Middleware - Processing:', pathname);
  
  // Normalize pathname (remove trailing slash except root)
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }
  
  // Allow /resetpassword with token directly (no redirect)
  if (pathname === '/resetpassword' && request.nextUrl.searchParams.get('token')) {
    return NextResponse.next();
  }
  
  // Check for exact match or startsWith for public paths
  if (publicPaths.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    console.log('Middleware - Public path allowed:', pathname);
    return NextResponse.next();
  }
  
  // Check for token in cookies (server-side)
  const token = request.cookies.get('token');
  const userRole = request.cookies.get('userRole');
  
  console.log('Middleware - Token:', !!token?.value, 'Role:', userRole?.value);
  
  if (!token?.value) {
    console.log('Middleware - No token, redirecting to login');
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }
  
  // Role-based access control
  const role = userRole?.value || 'user';
  
  // Super Admin can access everything
  if (role.toUpperCase() === 'SUPERADMIN') {
    console.log('Middleware - SuperAdmin access granted');
    return NextResponse.next();
  }
  
  // Admin restrictions
  if (role.toUpperCase() === 'ADMIN') {
    // Block access to super admin specific routes
    if (pathname.startsWith('/superadmin/')) {
      console.log('Middleware - Admin blocked from superadmin route');
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = '/dashboard';
      return NextResponse.redirect(dashboardUrl);
    }
  }
  
  // User restrictions  
  if (role.toUpperCase() === 'USER') {
    // Block access to admin routes
    if (pathname.startsWith('/admin/') || pathname.startsWith('/superadmin/')) {
      console.log('Middleware - User blocked from admin route');
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = '/dashboard';
      return NextResponse.redirect(dashboardUrl);
    }
  }
  
  // Don't redirect root path to dashboard - allow landing page access
  // Only redirect specific dashboard requests for authenticated users
  if (pathname === '/dashboard' && !token?.value) {
    console.log('Middleware - No token for dashboard, redirecting to login');
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }
  
  console.log('Middleware - Access granted to:', pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only match protected routes that require authentication
    '/dashboard/:path*',
    '/admin/:path*',
    '/superadmin/:path*',
    '/user/:path*',
    '/profile/:path*'
  ],
};
