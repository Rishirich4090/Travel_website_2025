# Multi-User Authentication System

This application implements a role-based authentication system with three user types: Super Admin, Admin, and User.

## Test Credentials

Use the following credentials to test different user roles:

### Super Admin
- **Email:** `superadmin@example.com`
- **Password:** `superadmin123`
- **Access:** Full system access, user management, system settings

### Admin
- **Email:** `admin@example.com`  
- **Password:** `admin123`
- **Access:** Booking management, travel packages, customer support

### Regular User
- **Email:** `user@example.com`
- **Password:** `user123`
- **Access:** Personal dashboard, trip booking, view bookings

## Features

### Authentication
- Role-based login system with dummy data
- Automatic redirection to appropriate dashboard based on user role
- Secure token and role storage in localStorage and cookies
- Middleware-based route protection

### Dashboards

#### Super Admin Dashboard
- System overview with comprehensive statistics
- User and admin management panels
- System settings and security logs
- Database backup controls
- Recent system activities feed

#### Admin Dashboard  
- Travel management tools
- Booking oversight and processing
- Customer support interface
- Revenue and booking analytics
- Refund request handling

#### User Dashboard
- Personal trip management
- Upcoming and past bookings
- Destination recommendations
- Quick booking actions
- Wishlist functionality

### Security Features
- Role-based access control via middleware
- Automatic logout functionality
- Protected routes based on user permissions
- Secure cookie and localStorage management

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   - Navigate to `http://localhost:3000`
   - You'll be redirected to login if not authenticated
   - Use any of the test credentials above to login

4. **Run tests:**
   ```bash
   npm run test
   ```

## Testing

The application includes comprehensive unit tests for:
- Authentication flow and role management
- Dashboard routing based on user roles
- Form validation and error handling
- Redux state management
- Component rendering and user interactions

### Test Commands
- `npm run test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Architecture

### Redux State Management
- `authSlice.js` - Handles authentication state, login/logout actions
- Supports both API-based and dummy user authentication
- Automatic role detection and storage

### Route Protection
- `middleware.js` - Server-side route protection
- Role-based access control
- Automatic redirects for unauthorized access

### Component Structure
- Modular dashboard components for each user type
- Reusable authentication components
- Role-aware navigation system

## Deployment

The application is ready for deployment with:
- Production build optimization
- Environment variable support
- Static asset optimization
- Server-side rendering support

## Future Enhancements

- Integration with real authentication API
- Enhanced role permissions system
- Audit logging for admin actions
- Two-factor authentication
- Password strength requirements
- Session management improvements
