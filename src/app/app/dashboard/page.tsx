'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CrisisButton from './components/CrisisButton';
import LogoutSuccess from './components/LogoutSuccess';
import DashboardContent from './components/DashboardContent';
import ServicesContent from './components/ServicesContent';
import ResourcesContent from './components/ResourcesContent';
import CommunityContent from './components/CommunityContent';
import ChatContent from './components/ChatContent';
import AppointmentsContent from './components/AppointmentsContent';
import LoadingScreen from './components/LoadingScreen';

export default function Dashboard() {
  const [userName, setUserName] = useState<string>('Alex'); 
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [loading, setLoading] = useState(true);
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUserName(user.displayName || user.email?.split('@')[0] || 'User');
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userName', user.displayName || user.email?.split('@')[0] || 'User');
      } else {
        // User is signed out
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userName');
        router.push('/app/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowLogoutSuccess(true);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutSuccess(false);
    router.push('/app/login');
  };

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatContent />;
      case 'appointments':
        return <AppointmentsContent />;
      case 'services':
        return <ServicesContent />;
      case 'community':
        return <CommunityContent />;
      case 'resources':
        return <ResourcesContent />;
      default:
        return <DashboardContent userName={userName} setActiveTab={setActiveTab} />;
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!userName) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {showLogoutSuccess && <LogoutSuccess onClose={handleCloseLogoutModal} />}
      
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
        onToggle={handleSidebarToggle}
      />
      
      <main className={`flex-1 overflow-x-hidden ${sidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300 ease-in-out`}>
        {renderContent()}
        <CrisisButton />
      </main>
    </div>
  );
} 