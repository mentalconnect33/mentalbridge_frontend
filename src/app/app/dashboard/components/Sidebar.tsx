'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

// Icons for sidebar
const HomeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const ToolsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const AppointmentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
  onToggle: (collapsed: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, handleLogout, onToggle }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onToggle(newCollapsedState);
  };

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    // Navigate to the appropriate route
    switch(tab) {
      case 'dashboard':
        router.push('/app/dashboard');
        break;
      case 'chat':
        router.push('/app/dashboard');  // Temporary route - will be updated when component is created
        break;
      case 'appointments':
        router.push('/app/dashboard');  // Temporary route - will be updated when component is created
        break;
      case 'services':
        router.push('/app/dashboard');  // Show services content on main dashboard for now
        break;
      case 'resources':
        router.push('/app/dashboard');  // Show resources content on main dashboard for now
        break;
      case 'community':
        router.push('/app/dashboard');  // Show community content on main dashboard for now
        break;
      default:
        router.push('/app/dashboard');
    }
  };

  return (
    <>
      {/* Desktop Sidebar - New vertical, wider design */}
      <div className={`hidden md:flex flex-col fixed inset-y-0 left-0 bg-[#6A5ACD] ${isCollapsed ? 'w-16' : 'w-64'} items-center py-6 z-30 transition-all duration-300`}>
        {/* Toggle button */}
        <button 
          onClick={toggleSidebar}
          className="absolute right-[-12px] top-8 bg-[#6A5ACD] rounded-full w-6 h-6 flex items-center justify-center shadow-md"
        >
          <svg 
            className={`w-4 h-4 text-white transition-transform ${isCollapsed ? 'rotate-0' : 'rotate-180'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="mb-8 w-full flex justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              duration: 0.5 
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.5 }
            }}
            className="relative h-12 w-12 rounded-full bg-white p-1"
          >
            <Image 
              src="/logo.jpg" 
              alt="MindBridge Logo" 
              width={48} 
              height={48} 
              className="rounded-full object-cover"
              priority
            />
          </motion.div>
        </div>
        
        <div className="flex-1 flex flex-col space-y-8 w-full px-4">
          <SidebarButton 
            active={activeTab === 'dashboard'} 
            onClick={() => navigateTo('dashboard')}
            icon={<HomeIcon />}
            label="Dashboard"
            collapsed={isCollapsed}
          />
          <SidebarButton 
            active={activeTab === 'chat'} 
            onClick={() => navigateTo('chat')}
            icon={<ChatIcon />}
            label="Chat"
            collapsed={isCollapsed}
          />
          <SidebarButton 
            active={activeTab === 'appointments'} 
            onClick={() => navigateTo('appointments')}
            icon={<AppointmentIcon />}
            label="Appointments"
            collapsed={isCollapsed}
          />
          <SidebarButton 
            active={activeTab === 'services'} 
            onClick={() => navigateTo('services')}
            icon={<ToolsIcon />}
            label="Services"
            collapsed={isCollapsed}
          />
          <SidebarButton 
            active={activeTab === 'resources'} 
            onClick={() => navigateTo('resources')}
            icon={<SearchIcon />}
            label="Resources"
            collapsed={isCollapsed}
          />
        </div>
        
        <button 
          onClick={handleLogout}
          className={`mt-auto text-white p-3 rounded-full hover:bg-[#5D4EBE] transition-colors ${isCollapsed ? 'w-12 h-12' : 'w-full'} flex items-center justify-center mx-4`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </button>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="fixed inset-x-0 bottom-0 bg-[#6A5ACD] flex md:hidden z-30 justify-around">
        <MobileNavButton
          active={activeTab === 'dashboard'}
          onClick={() => navigateTo('dashboard')}
          icon={<HomeIcon />}
        />
        <MobileNavButton
          active={activeTab === 'chat'}
          onClick={() => navigateTo('chat')}
          icon={<ChatIcon />}
        />
        <MobileNavButton
          active={activeTab === 'appointments'}
          onClick={() => navigateTo('appointments')}
          icon={<AppointmentIcon />}
        />
        <MobileNavButton
          active={activeTab === 'services'}
          onClick={() => navigateTo('services')}
          icon={<ToolsIcon />}
        />
      </div>
    </>
  );
}

// Helper components
const SidebarButton = ({ active, onClick, icon, label, collapsed }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, collapsed: boolean }) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-xl transition-colors ${collapsed ? 'justify-center' : 'w-full'} flex items-center ${
      active ? 'bg-[#5D4EBE] text-white' : 'text-gray-200 hover:bg-[#5D4EBE] hover:text-white'
    }`}
  >
    <span className={collapsed ? '' : 'mr-3'}>{icon}</span>
    {!collapsed && <span className="text-left">{label}</span>}
  </button>
);

const MobileNavButton = ({ active, onClick, icon }: { active: boolean, onClick: () => void, icon: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`py-4 px-5 transition-colors ${
      active ? 'text-white' : 'text-gray-200 hover:text-white'
    }`}
  >
    {icon}
  </button>
); 