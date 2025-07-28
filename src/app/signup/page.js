"use client";


import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { register } from "../../redux/slice/authSlice";

export default function SignupPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, token, user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    ownerName: '',
    companyName: '',
    companyType: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Only redirect if both token and user exist (authenticated)
    const localToken = token || (typeof window !== 'undefined' && localStorage.getItem('token'));
    const localUser = user || (typeof window !== 'undefined' && localStorage.getItem('userData'));
    if (localToken && localUser) {
      router.replace("/");
    }
  }, [token, user, router]);

  const validate = (field, value, customForm) => {
    let err = '';
    const compareForm = customForm || form;
    if (!value) {
      err = 'This field is required';
    } else {
      if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) err = 'Invalid email format';
      }
      if (field === 'confirmPassword') {
        if (value !== compareForm.password) err = 'Passwords do not match';
      }
      if (field === 'password') {
        if (compareForm.confirmPassword && value !== compareForm.confirmPassword) err = 'Passwords do not match';
      }
    }
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value, updatedForm) }));
    setSubmitted(false);
    // For password/confirmPassword cross-validation with latest values
    if (name === 'password' && touched.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: validate('confirmPassword', updatedForm.confirmPassword, updatedForm) }));
    }
    if (name === 'confirmPassword' && touched.password) {
      setErrors((prev) => ({ ...prev, password: validate('password', updatedForm.password, updatedForm) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Validate all fields
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      newErrors[key] = validate(key, form[key]);
    });
    setErrors(newErrors);
    setTouched((prev) => {
      const all = { ...prev };
      Object.keys(form).forEach((k) => { all[k] = true; });
      return all;
    });
    if (Object.values(newErrors).some(Boolean)) return;
    dispatch(register(form));
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
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
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-8 bg-black/60">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 font-sans">
          Travelista Tours
        </h2>
      </div>
    </div>

    {/* Right side form */}
    <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-6 sm:p-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <svg 
              className="w-8 h-8 text-[#00aeef]" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 13V5a2 2 0 012-2h2a2 2 0 012 2v16"
              />
            </svg>
            <h1 className="text-3xl font-bold text-gray-800 font-sans">
              Company Registration
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Create your business account to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
              Owner Name
            </label>
            <input
              id="ownerName"
              name="ownerName"
              placeholder="John Doe"
              value={form.ownerName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full px-4 py-3 rounded-lg border ${errors.ownerName && touched.ownerName ? 'border-red-500' : 'border-gray-300'} focus:border-[#00aeef] focus:ring-2 focus:ring-[#00aeef]/30 outline-none transition text-sm`}
            />
            {errors.ownerName && (touched.ownerName || submitted) && (
              <div className="text-red-600 text-xs mt-1">{errors.ownerName}</div>
            )}
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              id="companyName"
              name="companyName"
              placeholder="Acme Inc."
              value={form.companyName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full px-4 py-3 rounded-lg border ${errors.companyName && touched.companyName ? 'border-red-500' : 'border-gray-300'} focus:border-[#00aeef] focus:ring-2 focus:ring-[#00aeef]/30 outline-none transition text-sm`}
            />
            {errors.companyName && (touched.companyName || submitted) && (
              <div className="text-red-600 text-xs mt-1">{errors.companyName}</div>
            )}
          </div>

          <div>
            <label htmlFor="companyType" className="block text-sm font-medium text-gray-700 mb-1">
              Company Type
            </label>
            <select
              id="companyType"
              name="companyType"
              value={form.companyType}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full px-4 py-3 rounded-lg border ${errors.companyType && touched.companyType ? 'border-red-500' : 'border-gray-300'} focus:border-[#00aeef] focus:ring-2 focus:ring-[#00aeef]/30 outline-none transition text-sm bg-white`}
            >
              <option value="">Select company type</option>
              <option value="Travel Agency">Travel Agency</option>
              <option value="Tour Operator">Tour Operator</option>
              <option value="Hotel">Hotel</option>
              <option value="Transportation">Transportation</option>
              <option value="Other">Other</option>
            </select>
            {errors.companyType && (touched.companyType || submitted) && (
              <div className="text-red-600 text-xs mt-1">{errors.companyType}</div>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="contact@company.com"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full px-4 py-3 rounded-lg border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'} focus:border-[#00aeef] focus:ring-2 focus:ring-[#00aeef]/30 outline-none transition text-sm`}
            />
            {errors.email && (touched.email || submitted) && (
              <div className="text-red-600 text-xs mt-1">{errors.email}</div>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Business Address
            </label>
            <input
              id="address"
              name="address"
              placeholder="123 Business St, City"
              value={form.address}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full px-4 py-3 rounded-lg border ${errors.address && touched.address ? 'border-red-500' : 'border-gray-300'} focus:border-[#00aeef] focus:ring-2 focus:ring-[#00aeef]/30 outline-none transition text-sm`}
            />
            {errors.address && (touched.address || submitted) && (
              <div className="text-red-600 text-xs mt-1">{errors.address}</div>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full px-4 py-3 rounded-lg border ${errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'} focus:border-[#00aeef] focus:ring-2 focus:ring-[#00aeef]/30 outline-none transition text-sm`}
            />
            {errors.phone && (touched.phone || submitted) && (
              <div className="text-red-600 text-xs mt-1">{errors.phone}</div>
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
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full px-4 py-3 rounded-lg border ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'} focus:border-[#00aeef] focus:ring-2 focus:ring-[#00aeef]/30 outline-none transition text-sm`}
            />
            {errors.password && (touched.password || submitted) && (
              <div className="text-red-600 text-xs mt-1">{errors.password}</div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:border-[#00aeef] focus:ring-2 focus:ring-[#00aeef]/30 outline-none transition text-sm`}
            />
            {errors.confirmPassword && (touched.confirmPassword || submitted) && (
              <div className="text-red-600 text-xs mt-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || Object.values(errors).some(Boolean) || Object.values(form).some(v => !v)}
            className={`w-full bg-[#00aeef] text-white py-3 rounded-lg font-medium text-sm mt-4 hover:bg-[#0095c7] transition-colors disabled:bg-[#7fd6f7] disabled:cursor-not-allowed`}
          >
            {loading ? 'Processing...' : 'Register Company'}
          </button>

          {error && (
            <div className="text-red-600 text-center text-sm mt-2 p-2 bg-red-50 rounded">
              {error}
            </div>
          )}
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          Already registered?{' '}
          <a 
            href="/login" 
            className="text-[#00aeef] font-medium hover:underline"
          >
            Sign in to your account
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}
