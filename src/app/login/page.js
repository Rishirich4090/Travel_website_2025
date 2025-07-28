"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { login, sendOtp } from "../../redux/slice/authSlice";
import { showToast } from "../../components/Toast";
import usePageDebugger from '../../hooks/usePageDebugger';
import { runApiTests } from '../../utils/apiTester';

export default function LoginPage() {
  // Add debugging
  usePageDebugger('Login');
  
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, token } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  // Removed OTP step
  // Removed reset password modal logic
  // Removed OTP error and code state
  // Removed emailForReset state

  useEffect(() => {
    // Prevent infinite redirects by checking current path
    if (window.location.pathname === '/login') {
      const localToken = token || (typeof window !== 'undefined' && localStorage.getItem('accessToken'));
      if (localToken) {
        console.log('Login page - Found token, redirecting to dashboard');
        router.replace("/dashboard");
      }
    }
  }, [token, router]);

  const validate = (field, value) => {
    let err = '';
    if (!value) {
      err = 'This field is required';
    } else {
      if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) err = 'Invalid email format';
      }
    }
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all fields
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      newErrors[key] = validate(key, form[key]);
    });
    setErrors(newErrors);
    setTouched(Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
    if (Object.values(newErrors).some(Boolean)) return;
    
    dispatch(login(form)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        // Redirect to dashboard after successful login
        router.replace('/dashboard');
      }
    });
  };

  // Forgot password handlers
  // After sending email, just close modal and show toast
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    const result = await dispatch(sendOtp(forgotEmail));
    if (result.meta.requestStatus === 'fulfilled') {
      setShowForgot(false);
      setForgotEmail("");
      showToast("Password reset link sent to your email! Please check your email.", "success");
      // No redirect here - user will click email link to open reset password page
    }
  };

  // Removed OTP submit handler

  // Removed handleResetSubmit

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left side image and branding - hidden on mobile */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-gray-900 relative">
          <Image
            src="/login.jpg"
            alt="Travel"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-8 bg-black/50">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 font-sans">
              Travelista Tours
            </h2>
          </div>
        </div>

        {/* Right side form */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-6 sm:p-8">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <svg
                  className="w-8 h-8 text-[#00aeef]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 13V5a2 2 0 012-2h2a2 2 0 012 2v16"
                  />
                </svg>
                <h1 className="text-3xl font-bold text-gray-800 font-sans">
                  Welcome Back
                </h1>
              </div>
              <p className="text-gray-600 text-sm">
                Sign in to your account to continue
              </p>
            </div>

            {/* API Test Button */}
            <div className="mb-4">
              <button
                type="button"
                onClick={async () => {
                  const results = await runApiTests();
                  showToast(
                    results.connection.success 
                      ? 'API connection successful!' 
                      : 'API connection failed: ' + results.connection.message,
                    results.connection.success ? 'success' : 'error'
                  );
                }}
                className="w-full py-2 px-4 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors text-sm"
              >
                🔗 Test API Connection
              </button>
            </div>

            {/* Demo Credentials Helper */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">Demo Credentials:</h3>
              <div className="text-xs text-blue-700 space-y-1">
                <div className="flex justify-between">
                  <span>Super Admin:</span>
                  <button 
                    type="button"
                    onClick={() => setForm({ email: 'superadmin@example.com', password: 'superadmin123' })}
                    className="text-blue-600 hover:underline"
                  >
                    superadmin@example.com / superadmin123
                  </button>
                </div>
                <div className="flex justify-between">
                  <span>Admin:</span>
                  <button 
                    type="button"
                    onClick={() => setForm({ email: 'admin@example.com', password: 'admin123' })}
                    className="text-blue-600 hover:underline"
                  >
                    admin@example.com / admin123
                  </button>
                </div>
                <div className="flex justify-between">
                  <span>User:</span>
                  <button 
                    type="button"
                    onClick={() => setForm({ email: 'user@example.com', password: 'user123' })}
                    className="text-blue-600 hover:underline"
                  >
                    user@example.com / user123
                  </button>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="email"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'} focus:border-[#00aeef] focus:ring-2 focus:ring-[#00aeef]/30 outline-none transition text-sm`}
                />
                {errors.email && touched.email && (
                  <div className="text-red-600 text-xs mt-1">{errors.email}</div>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="current-password"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'} focus:border-[#00aeef] focus:ring-2 focus:ring-[#00aeef]/30 outline-none transition text-sm`}
                />
                {errors.password && touched.password && (
                  <div className="text-red-600 text-xs mt-1">{errors.password}</div>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#00aeef] text-white rounded-lg font-semibold hover:bg-[#008fcc] transition-colors"
                disabled={loading || Object.values(errors).some(Boolean) || Object.values(form).some(v => !v)}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
              <div className="text-right mt-2">
                <button
                  type="button"
                  className="text-sm text-[#00aeef] hover:underline focus:outline-none"
                  onClick={() => setShowForgot(true)}
                >
                  Forgot Password?
                </button>
              </div>
              {/* Error messages are now only shown in toast, not in the form */}
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="mx-3 text-gray-500 text-sm font-medium">OR CONTINUE WITH</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                type="button"
                className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                aria-label="Sign in with Google"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </button>
              <button
                type="button"
                className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                aria-label="Sign in with Facebook"
              >
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                type="button"
                className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                aria-label="Sign in with Apple"
              >
                <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </button>
            </div>

            {/* Sign up link */}
            <div className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <a
                href="/signup"
                className="text-[#00aeef] font-medium hover:underline"
              >
                Sign up now
              </a>
            </div>
          </div>

          {/* Forgot Password Modal (email only, no OTP or reset-password popups) */}
          {showForgot && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50 transition-opacity duration-300"
              onClick={() => {
                setShowForgot(false);
                setForgotEmail("");
              }}
            >
              <div
                className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4 sm:mx-6 transform transition-all duration-300 scale-95 hover:scale-100"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800">Reset Your Password</h2>
                  <button
                    onClick={() => {
                      setShowForgot(false);
                      setForgotEmail("");
                    }}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-600 mb-6">Enter your email address and we will send you a password reset link.</p>
                <form onSubmit={handleSendOtp} className="space-y-6">
                  <div>
                    <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      id="forgot-email"
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="your@email.com"
                      value={forgotEmail}
                      onChange={e => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgot(false);
                        setForgotEmail("");
                      }}
                      className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      Send Reset Link
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
