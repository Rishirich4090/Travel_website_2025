# Theme System Documentation

## Overview

The travel portal now features a comprehensive theme system that allows administrators to permanently apply themes across the entire project. Themes are stored in the API and persist across all user sessions and page refreshes.

## How It Works

### 1. Theme Application Flow

When you apply a theme in the admin settings page:

1. **API Call**: The theme is saved as the active theme via API call to `/api/v1/themes/set-active`
2. **Redux State**: The theme is immediately applied to the Redux store
3. **CSS Variables**: All theme colors are applied as CSS custom properties to the document root
4. **CSS Classes**: Theme-specific classes are added to the document root for easier styling
5. **Persistence**: The theme remains active for all users until a new theme is applied

### 2. Theme Loading on App Start

When the application loads:

1. **API Fetch**: The app automatically fetches the active theme from `/api/v1/themes/active`
2. **Auto-Apply**: The active theme is automatically applied to the entire application
3. **Fallback**: If the API is unavailable, the app uses the default theme

## Features

### ✅ Permanent Theme Application
- Themes are saved permanently to the API
- No more localStorage dependency for theme persistence
- Themes persist across all user sessions and devices

### ✅ CSS Variable System
All theme colors are available as CSS variables:
```css
/* Examples */
color: var(--color-primary-color);
background-color: var(--color-background-color);
border-color: var(--color-border);
```

### ✅ Pre-built CSS Classes
Use theme-aware CSS classes for consistent styling:
```html
<!-- Buttons -->
<button class="theme-btn-primary">Primary Button</button>
<button class="theme-btn-secondary">Secondary Button</button>

<!-- Cards -->
<div class="theme-card">
  <h2>Card Title</h2>
  <p>Card content automatically styled with theme colors</p>
</div>

<!-- Forms -->
<input type="text" class="theme-input" placeholder="Themed input" />

<!-- Layout -->
<div class="theme-bg theme-text">Background and text</div>
<div class="theme-surface">Surface color</div>
```

### ✅ Automatic Theme Detection
- Light/dark theme detection based on background color
- Automatic CSS class application (`theme-light` or `theme-dark`)
- Smart transitions and hover effects

### ✅ Status Colors
```html
<div class="theme-success">Success message</div>
<div class="theme-warning">Warning message</div>
<div class="theme-error">Error message</div>
<div class="theme-info">Info message</div>
```

## Available CSS Classes

### Layout & Background
- `.theme-bg` - Main background color
- `.theme-surface` - Surface/card background color
- `.theme-card` - Pre-styled card with theme colors
- `.theme-navbar` - Navbar with theme colors
- `.theme-footer` - Footer with theme colors

### Text & Colors
- `.theme-text` - Primary text color
- `.theme-text-secondary` - Secondary text color
- `.theme-border` - Theme border color

### Buttons
- `.theme-btn-primary` - Primary button with theme colors
- `.theme-btn-secondary` - Secondary button with theme colors

### Forms
- `.theme-input` - Input fields with theme styling

### Status Colors
- `.theme-success` - Success color background
- `.theme-warning` - Warning color background
- `.theme-error` - Error color background
- `.theme-info` - Info color background

### Auto-Applied Classes
These are automatically applied to the document root:
- `.theme-applied` - Indicates theme system is active
- `.theme-light` - Applied for light themes
- `.theme-dark` - Applied for dark themes

## CSS Variables Available

All theme properties are available as CSS variables:

```css
--color-primary-color
--color-secondary-color
--color-background-color
--color-text-color
--color-heading-color
--color-link-color
--color-button-bg-color
--color-button-text-color
--color-navbar-bg-color
--color-navbar-text-color
--color-footer-bg-color
--color-footer-text-color
--color-border
--color-surface
--color-success
--color-warning
--color-error
--color-info
```

## Usage Examples

### Using CSS Variables in Components
```jsx
const MyComponent = () => {
  return (
    <div style={{
      backgroundColor: 'var(--color-surface)',
      color: 'var(--color-text-color)',
      border: '1px solid var(--color-border)'
    }}>
      Content
    </div>
  );
};
```

### Using Theme Classes
```jsx
const MyComponent = () => {
  return (
    <div className="theme-card">
      <h2>Automatically themed card</h2>
      <p className="theme-text-secondary">Secondary text</p>
      <button className="theme-btn-primary">Themed button</button>
      <input className="theme-input" placeholder="Themed input" />
    </div>
  );
};
```

### Using Redux Theme State
```jsx
import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/slice/themeSlice';

const MyComponent = () => {
  const theme = useSelector(selectTheme);
  
  return (
    <div style={{
      backgroundColor: theme.backgroundColor,
      color: theme.textColor
    }}>
      Content
    </div>
  );
};
```

## Demo Page

Visit `/test/theme` to see a comprehensive demo of all theme features and available CSS classes.

## Admin Settings

1. Navigate to **Admin Settings** → **Theme Management**
2. Create new themes or edit existing ones
3. Click **Apply** to permanently set a theme as active
4. The theme will be applied across the entire project immediately
5. The theme persists for all users until changed

## Technical Implementation

### API Endpoints
- `GET /api/v1/themes` - Get all themes
- `GET /api/v1/themes/active` - Get currently active theme
- `POST /api/v1/themes/set-active` - Set a theme as active
- `POST /api/v1/themes` - Create new theme
- `PUT /api/v1/themes/:id` - Update theme
- `DELETE /api/v1/themes/:id` - Delete theme

### Redux Actions
- `setActiveTheme(themeData)` - Permanently apply theme
- `setApiTheme(themeData)` - Apply theme to current session
- `getActiveTheme()` - Fetch active theme from API
- `getAllThemes()` - Fetch all available themes

## Migration Notes

If you're migrating from the old localStorage-based theme system:

1. The new system no longer uses localStorage for theme persistence
2. Themes are now stored and managed through the API
3. All existing theme CSS variables remain compatible
4. New CSS classes provide easier styling options
5. Themes now persist across all user sessions automatically

## Browser Support

- Modern browsers with CSS custom properties support
- Graceful fallback to default theme if CSS variables are not supported
- Works with both light and dark system preferences
