'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AppRedirect() {
  const router = useRouter();

  useEffect(() => {
    const isAuth = sessionStorage.getItem('isLoggedIn') === 'true';
    
    if (isAuth) {
      router.push('/app/dashboard');
    } else {
      router.push('/app/login');
    }
  }, [router]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F5FF] to-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#9D7FBC] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
} 