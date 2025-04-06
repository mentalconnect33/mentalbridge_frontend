'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { auth, loginWithGoogle } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function Signup() {
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userName', user.displayName || user.email?.split('@')[0] || 'User');
        router.push('/app/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (name.trim() === '' || identifier.trim() === '' || password.trim() === '') {
      setError('Please fill out all fields');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, identifier, password);
      await updateProfile(userCredential.user, {
        displayName: name
      });
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userName', name);
      router.push('/app/dashboard');
    } catch (error: any) {
      console.error('Signup error:', error);
      

      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please try a different one or login.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else {
        setError('An error occurred during sign up. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleSignup = async () => {
    setError('');
    setLoading(true);
    
    try {
      const result = await loginWithGoogle();
      sessionStorage.setItem('isLoggedIn', 'true');
      const username = result.user.displayName || 
                      result.user.email?.split('@')[0] || 
                      'Google User';
      sessionStorage.setItem('userName', username);
      
      router.push('/app/dashboard');
    } catch (error: any) {
      console.error('Google signup error:', error);
      
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Signup canceled. Please try again.');
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        setError('An account already exists with the same email address but different sign-in credentials.');
      } else {
        setError('An error occurred during Google signup. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9D7FBC] focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9D7FBC] focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Create Passcode"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9D7FBC] focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Passcode"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9D7FBC] focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 h-4 w-4 text-[#9D7FBC] rounded border-gray-300 focus:ring-[#9D7FBC]"
                required
                disabled={loading}
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the <Link href="/terms" className="text-[#9D7FBC] hover:underline">Terms & Conditions</Link> and <Link href="/privacy" className="text-[#9D7FBC] hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white rounded-full py-3 px-4 font-medium flex items-center justify-between hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <span>{loading ? 'Creating Account...' : 'Create Your Account'}</span>
              {!loading && (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button 
                onClick={handleGoogleSignup}
                className="w-full border border-gray-300 rounded-full py-3 px-4 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Sign up with Gmail Account</span>
              </button>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-4">
            <p className="text-gray-600">Already have an account?</p>
            <Link href="/app/login" className="bg-[#9D7FBC] text-white px-5 py-2 rounded-full hover:bg-[#8A6BA7] transition-colors">
              Log In
            </Link>
          </div>
        </div>
      </div>
      
      {/* Right side - Content */}
      <div className="hidden lg:flex w-1/2 bg-gray-50 p-12 items-center justify-center relative">
        <div className="max-w-md">
          <div className="mb-6">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 text-sm">
              <span className="mr-2">Are you a Brand?</span>
              <Link href="/professionals" className="text-[#9D7FBC] inline-flex items-center">
                Explore how to use Tract for growth
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
            <h2 className="text-4xl font-bold mb-6">Create Your<br />Account</h2>
          </div>
          
          <p className="text-gray-600 mb-8">
            Join our community and discover new opportunities to connect and grow your audience
          </p>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-3">Benefits of joining Tract:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Connect with potential clients and brands</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Showcase your portfolio to a wider audience</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Track growth and engagement metrics</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Receive personalized growth opportunities</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 