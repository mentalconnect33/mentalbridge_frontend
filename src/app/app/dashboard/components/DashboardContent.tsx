'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface DashboardContentProps {
  userName: string;
  setActiveTab: (tab: string) => void;
}

const TimeframeButton = ({ label, active }: { label: string, active: boolean }) => (
  <button 
    className={`px-4 py-2 text-sm rounded-full transition-colors ${
      active 
        ? 'bg-[#6A5ACD] text-white' 
        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
    }`}
  >
    {label}
  </button>
);

export default function DashboardContent({ userName, setActiveTab }: DashboardContentProps) {
  const [activeTimeframe, setActiveTimeframe] = useState('1 Week');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showMoodPrompt, setShowMoodPrompt] = useState(false);
  const [moodResponse, setMoodResponse] = useState('');
  const [showResponseInput, setShowResponseInput] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState(false);
  
  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setShowMoodPrompt(true);
  };
  
  const handleMoodPromptClick = () => {
    setShowResponseInput(true);
  };
  
  const handleResponseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (moodResponse.trim()) {
      setSubmittedResponse(true);
      setShowResponseInput(false);
    }
  };
  
  // Mock data for appointments
  const nextAppointment = {
    doctor: "Dr. Sarah Johnson",
    type: "Therapy Session",
    date: "May 15, 2023",
    time: "10:30 AM",
    location: "Online",
  };
  
  // Mock data for recommended articles
  const recommendedArticles = [
    {
      id: 1,
      title: "Understanding Anxiety: Symptoms and Management",
      category: "Mental Health"
    },
    {
      id: 2,
      title: "The Science of Sleep: How Rest Affects Mental Health",
      category: "Health"
    },
    {
      id: 3,
      title: "Mindfulness Meditation: A Beginner's Guide",
      category: "Wellness"
    }
  ];
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-6">
      <div className="mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-2 flex items-center text-[#6A5ACD]"
        >
          Hello, {userName}! <span className="ml-2">👋</span>
        </motion.h2>
      </div>
      
      {/* Main Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Mood Score - Coming Soon */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gray-100/70 backdrop-blur-sm flex flex-col items-center justify-center z-10">
            <div className="bg-[#6A5ACD] text-white px-6 py-3 rounded-lg shadow-lg">
              <span className="text-lg font-bold">Coming Soon</span>
            </div>
            <p className="mt-4 text-center text-gray-600 max-w-xs px-4">
              Our advanced AI mood tracking system is currently in development.
              Soon you'll be able to track your mood patterns over time!
            </p>
          </div>
          
          <div className="flex justify-between items-center mb-4 opacity-50">
            <div>
              <span className="text-3xl font-bold text-[#6A5ACD]">97.245%</span>
            </div>
            <div className="flex items-center bg-[#6A5ACD] text-white px-3 py-1 rounded-full">
              <span className="text-sm">Mood AI Score</span>
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          
          <div className="relative h-52 opacity-30">
            {/* SVG Line Chart */}
            <svg className="w-full h-full" viewBox="0 0 400 170" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Grid Lines */}
              <line x1="0" y1="0" x2="400" y2="0" stroke="#f0f0f0" strokeDasharray="5,5" />
              <line x1="0" y1="34" x2="400" y2="34" stroke="#f0f0f0" strokeDasharray="5,5" />
              <line x1="0" y1="68" x2="400" y2="68" stroke="#f0f0f0" strokeDasharray="5,5" />
              <line x1="0" y1="102" x2="400" y2="102" stroke="#f0f0f0" strokeDasharray="5,5" />
              <line x1="0" y1="136" x2="400" y2="136" stroke="#f0f0f0" strokeDasharray="5,5" />
              <line x1="0" y1="170" x2="400" y2="170" stroke="#f0f0f0" strokeDasharray="5,5" />
              
              {/* Mood Line */}
              <path 
                d="M0,85 C20,40 40,100 60,65 C80,30 100,50 120,80 C140,110 160,130 180,60 C200,20 220,70 240,90 C260,110 280,40 300,20 C320,0 340,30 360,70 C380,110 400,85 400,85" 
                stroke="#8A7BDA" 
                strokeWidth="3" 
                fill="none" 
              />

              {/* Highlight Points */}
              <circle cx="60" cy="65" r="6" fill="#6A5ACD" />
              <circle cx="180" cy="60" r="6" fill="#6A5ACD" />
              <circle cx="300" cy="20" r="6" fill="#6A5ACD" />
              
              {/* Data Point Labels */}
              <rect x="35" y="30" width="50" height="25" rx="12.5" fill="#6A5ACD" />
              <text x="60" y="45" textAnchor="middle" fill="white" fontSize="12">83%</text>
              
              <rect x="155" y="25" width="50" height="25" rx="12.5" fill="#6A5ACD" />
              <text x="180" y="40" textAnchor="middle" fill="white" fontSize="12">91%</text>
              
              <rect x="275" y="0" width="50" height="25" rx="12.5" fill="#6A5ACD" />
              <text x="300" y="15" textAnchor="middle" fill="white" fontSize="12">99%</text>
            </svg>
          </div>
          
          <div className="flex justify-between mt-4 space-x-2 opacity-50">
            <TimeframeButton label="1 Day" active={activeTimeframe === '1 Day'} />
            <TimeframeButton label="1 Week" active={activeTimeframe === '1 Week'} />
            <TimeframeButton label="1 Month" active={activeTimeframe === '1 Month'} />
            <TimeframeButton label="1 Year" active={activeTimeframe === '1 Year'} />
            <TimeframeButton label="All Time" active={activeTimeframe === 'All Time'} />
          </div>
        </motion.div>
        
        {/* How are you feeling? */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-xl font-bold text-[#6A5ACD] mb-6">How are you feeling today?</h3>
          
          {!selectedMood ? (
            <div className="flex justify-center gap-4 my-8">
              <button 
                onClick={() => handleMoodSelect('happy')}
                className="flex flex-col items-center"
              >
                <div className="text-4xl mb-2 transform hover:scale-125 transition-transform">😊</div>
                <span className="text-sm">Happy</span>
              </button>
              
              <button 
                onClick={() => handleMoodSelect('neutral')}
                className="flex flex-col items-center"
              >
                <div className="text-4xl mb-2 transform hover:scale-125 transition-transform">😐</div>
                <span className="text-sm">Neutral</span>
              </button>
              
              <button 
                onClick={() => handleMoodSelect('sad')}
                className="flex flex-col items-center"
              >
                <div className="text-4xl mb-2 transform hover:scale-125 transition-transform">😔</div>
                <span className="text-sm">Sad</span>
              </button>
              
              <button 
                onClick={() => handleMoodSelect('stressed')}
                className="flex flex-col items-center"
              >
                <div className="text-4xl mb-2 transform hover:scale-125 transition-transform">😫</div>
                <span className="text-sm">Stressed</span>
              </button>
              
              <button 
                onClick={() => handleMoodSelect('anxious')}
                className="flex flex-col items-center"
              >
                <div className="text-4xl mb-2 transform hover:scale-125 transition-transform">😰</div>
                <span className="text-sm">Anxious</span>
              </button>
            </div>
          ) : showMoodPrompt && !showResponseInput && !submittedResponse ? (
            <div className="flex flex-col items-center my-8">
              <p className="mb-4 text-center font-medium">
                {selectedMood === 'happy' && "That's great! What's making you happy today?"}
                {selectedMood === 'neutral' && "What's on your mind today?"}
                {selectedMood === 'sad' && "I'm sorry to hear that. Would you like to talk about what's bothering you?"}
                {selectedMood === 'stressed' && "Stress can be challenging. What's causing you stress today?"}
                {selectedMood === 'anxious' && "I understand anxiety can be difficult. Would you like to share what's making you anxious?"}
              </p>
              
              <button 
                onClick={handleMoodPromptClick}
                className="bg-[#6A5ACD] text-white px-5 py-2 rounded-full hover:bg-[#5D4EBE] transition-colors"
              >
                Share your thoughts
              </button>
            </div>
          ) : showResponseInput ? (
            <form onSubmit={handleResponseSubmit} className="my-4">
              <textarea
                value={moodResponse}
                onChange={(e) => setMoodResponse(e.target.value)}
                placeholder="Write your thoughts here..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] min-h-[100px]"
              ></textarea>
              
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  className="bg-[#6A5ACD] text-white px-5 py-2 rounded-full hover:bg-[#5D4EBE] transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          ) : submittedResponse ? (
            <div className="flex flex-col items-center my-8">
              <div className="text-4xl mb-4">🙏</div>
              <p className="text-center font-medium text-[#6A5ACD]">
                Thank you for sharing your thoughts. Your mental well-being is important to us.
              </p>
              <button
                onClick={() => {
                  setSelectedMood(null);
                  setShowMoodPrompt(false);
                  setMoodResponse('');
                  setSubmittedResponse(false);
                }}
                className="mt-4 bg-[#6A5ACD] text-white px-5 py-2 rounded-full hover:bg-[#5D4EBE] transition-colors"
              >
                Check in again
              </button>
            </div>
          ) : null}
          
          <p className="text-center text-sm text-gray-500 mt-6">
            Tracking your mood helps us provide better support for your journey.
          </p>
        </motion.div>
      </div>
      
      {/* Second Row Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Need to Chat Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-[#EDE9FF] p-6 rounded-xl shadow-sm"
        >
          <div className="flex flex-col items-center text-center">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-[#6A5ACD] mb-4">Do you need to chat?</h3>
            <p className="text-gray-600 mb-6">
              Our AI assistant is here to listen and provide support whenever you need it.
            </p>
            <button
              onClick={() => setActiveTab('chat')}
              className="bg-[#6A5ACD] text-white px-6 py-3 rounded-full hover:bg-[#5D4EBE] transition-colors"
            >
              Chat with AI Assistant
            </button>
          </div>
        </motion.div>
        
        {/* Next Appointment */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-xl font-bold text-[#6A5ACD] mb-4">Your Next Appointment</h3>
          
          <div className="flex items-start">
            <div className="bg-[#6A5ACD] text-white p-3 rounded-lg mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            <div>
              <div className="font-semibold text-lg">{nextAppointment.type}</div>
              <div className="text-gray-600">With {nextAppointment.doctor}</div>
              <div className="flex items-center mt-3 text-gray-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {nextAppointment.date} at {nextAppointment.time}
              </div>
              <div className="flex items-center mt-1 text-gray-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {nextAppointment.location}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setActiveTab('appointments')}
              className="text-[#6A5ACD] bg-[#EDE9FF] px-4 py-2 rounded-full hover:bg-[#DFD9FF] transition-colors font-medium text-sm"
            >
              View All Appointments
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Recommended Articles */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white p-6 rounded-xl shadow-sm mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#6A5ACD]">Recommended Articles</h3>
          <button
            onClick={() => setActiveTab('resources')}
            className="text-[#6A5ACD] hover:text-[#5D4EBE] transition-colors text-sm font-medium flex items-center"
          >
            View All 
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          {recommendedArticles.map((article, index) => (
            <div 
              key={index}
              className="bg-[#F5F8FA] p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                // First set active tab to resources
                setActiveTab('resources');
                // Add a small delay to allow the resources tab to render before sending article ID
                setTimeout(() => {
                  // Create and dispatch a custom event to pass the article ID to the ResourcesContent component
                  const event = new CustomEvent('openArticle', { detail: { articleId: article.id } });
                  document.dispatchEvent(event);
                }, 100);
              }}
            >
              <div className="bg-[#6A5ACD] text-white text-xs px-2 py-1 rounded inline-block mb-2">
                {article.category}
              </div>
              <h4 className="font-medium text-[#6A5ACD]">{article.title}</h4>
              <div className="flex justify-end mt-3">
                <svg className="w-5 h-5 text-[#6A5ACD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  );
} 