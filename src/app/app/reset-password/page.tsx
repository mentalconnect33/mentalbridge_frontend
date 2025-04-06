'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { resetPassword } from '../../firebase';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    if (email.trim() === '') {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (error: any) {
      console.error('Password reset error:', error);
      if (error.code === 'auth/user-not-found') {
        setError('No account exists with this email address');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many reset attempts. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6">Reset Password</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {success ? (
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h2 className="text-lg font-semibold text-green-700 mb-2">Password Reset Email Sent</h2>
              <p className="text-green-600 mb-4">
                We've sent password reset instructions to {email}. If {email} is signed up before, you will recevie the email.
              </p>
              <div className="mt-6 flex items-center justify-center">
                <Link 
                  href="/app/login" 
                  className="bg-[#9D7FBC] text-white px-5 py-2 rounded-full hover:bg-[#8A6BA7] transition-colors"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9D7FBC] focus:border-transparent"
                  required
                  disabled={loading}
                />
              </div>

              <p className="text-sm text-gray-600">
                We'll send you an email with instructions to reset your password.
              </p>

              <button
                type="submit"
                className="w-full bg-black text-white rounded-full py-3 px-4 font-medium flex items-center justify-center hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Instructions'}
              </button>

              <div className="text-center">
                <Link href="/app/login" className="text-[#9D7FBC] hover:underline text-sm">
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
      
      {/* Right side - Content */}
      <div className="hidden lg:flex w-1/2 bg-gray-50 p-12 items-center justify-center relative">
        <div className="max-w-md">
          <div className="mb-6">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 text-sm">
              <span className="mr-2">Need help?</span>
              <Link href="/support" className="text-[#9D7FBC] inline-flex items-center">
                Contact our support team
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-full">
              <div className="h-[1px] w-3/4 mx-auto bg-yellow-200"></div>
              <div className="h-[1px] w-1/2 mx-auto bg-yellow-200 mt-1"></div>
            </div>
            <h2 className="text-4xl font-bold mb-6">Reset Your<br />Password</h2>
          </div>
          
          <p className="text-gray-600 mb-8">
            Don't worry, it happens to the best of us. Follow the instructions to reset your password and get back to your account.
          </p>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-3">Password Tips:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Use at least 8 characters</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Include uppercase and lowercase letters</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Add numbers and special characters</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Don't reuse passwords across different sites</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 