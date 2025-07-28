"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPassword } from "../../redux/slice/authSlice";
import { showToast } from "../../components/Toast";

export default function ResetPasswordPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get code/token from query params (e.g. /reset-password?code=xxxx)
  const code = searchParams.get("code") || searchParams.get("token") || "";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!code) {
      setError("Invalid or missing reset code.");
      return;
    }
    setLoading(true);
    const result = await dispatch(setPassword({
      password: form.password,
      confirmPassword: form.confirmPassword,
      code,
    }));
    setLoading(false);
    if (result.meta.requestStatus === "fulfilled") {
      showToast("Password reset successful! Please login.", "success");
      router.replace("/login");
    } else {
      setError(result.error?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Password</h2>
        <p className="text-gray-600 mb-6">Your new password must be different from previously used passwords.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              id="new-password"
              name="password"
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter new password"
              value={form.password}
              onChange={handleChange}
              required
              minLength="8"
            />
            {form.password && (
              <div className="mt-1 text-xs text-gray-500">
                Password strength:
                <span className={`ml-1 font-medium ${form.password.length < 8 ? 'text-red-500' :
                    form.password.length < 12 ? 'text-yellow-500' : 'text-green-500'
                  }`}>
                  {form.password.length < 8 ? 'Weak' : form.password.length < 12 ? 'Moderate' : 'Strong'}
                </span>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Confirm new password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            {form.password && form.confirmPassword && form.password !== form.confirmPassword && (
              <div className="mt-1 text-sm text-red-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Passwords do not match
              </div>
            )}
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={form.password !== form.confirmPassword || !form.password || loading}
            className={`w-full py-2.5 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${form.password !== form.confirmPassword || !form.password || loading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
