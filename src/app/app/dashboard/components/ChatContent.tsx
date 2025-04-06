'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  articles?: any[];
  clinics?: any[];
  formatted_data?: any; 
}

export default function ChatContent() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your mental health assistant. How can I help you today?",
      timestamp: formatTime(new Date()),
      articles: [],
      clinics: []
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [useMockData, setUseMockData] = useState(true);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Format time for messages
  function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        console.log("Testing backend connectivity...");
        const response = await fetch('http://localhost:8000/api/health', {
          method: 'GET'
        });
        
        if (response.ok) {
          console.log("✅ Backend is reachable!");
          // Optionally switch to real backend mode
          // setUseMockData(false);
        } else {
          console.error("❌ Backend returned error:", response.status);
        }
      } catch (error) {
        console.error("❌ Cannot connect to backend:", error);
      }
    };
    
    checkBackendConnection();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: formatTime(new Date())
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    console.log(`Attempting to connect to backend with useMockData = ${useMockData}`);
    
    if (useMockData) {
      setTimeout(() => {
        const mockResponse = generateMockResponse(userMessage.content);
        
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: mockResponse.response,
          timestamp: formatTime(new Date()),
          articles: mockResponse.articles,
          clinics: mockResponse.clinics
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
      
      return;
    }
    
    // Use real backend
    try {
      // Log request data for debugging
      const requestData = {
        query: userMessage.content,
        chat_history: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      };
      console.log("Sending request data:", requestData);
      
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      
      // Log response status
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with status ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      
      console.log("Response data:", data);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.response || "I received your message but couldn't generate a proper response.",
        timestamp: formatTime(new Date()),
        articles: data.articles || [],
        clinics: data.clinics || [],
        formatted_data: data.formatted_data 
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error connecting to backend:', error);
      console.error('Error details:', error.stack);
      
      const mockResponse = generateMockResponse(input);
      
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `I'm having trouble connecting to my knowledge base right now. Error: ${error.message}. I'll provide some general information instead.`,
          timestamp: formatTime(new Date()),
          articles: mockResponse.articles,
          clinics: mockResponse.clinics
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  function generateMockResponse(input: string) {
    let response = '';
    let articles = [];
    let clinics = [];
    
    if (input.toLowerCase().includes('depression')) {
      response = "It sounds like you're going through a difficult time with depression. Depression is a common and serious medical illness that negatively affects how you feel, the way you think and how you act. Fortunately, it is also treatable. Here are some resources that might help.";
      articles = [
        {
          id: 1,
          title: "Understanding Depression",
          category: "Mental Health",
          read_time: "5 min"
        },
        {
          id: 2,
          title: "Effective Treatments for Depression",
          category: "Therapy",
          read_time: "8 min"
        }
      ];
      clinics = [
        {
          id: 1,
          name: "Mental Health Center",
          location: "123 Wellness Ave",
          rating: 4.8,
          accepting_new: true,
          specialties: ["Depression", "Anxiety", "PTSD"],
          insurance_accepted: ["Aetna", "BlueCross", "United Healthcare"]
        }
      ];
    } else if (input.toLowerCase().includes('anxiety')) {
      response = "I understand that anxiety can be overwhelming. Anxiety disorders are characterized by feelings of worry, anxiety, or fear that are strong enough to interfere with one's daily activities. Here are some resources that might help.";
      articles = [
        {
          id: 3,
          title: "Managing Anxiety Day by Day",
          category: "Self-Help",
          read_time: "6 min"
        }
      ];
      clinics = [
        {
          id: 2,
          name: "Anxiety Support Clinic",
          location: "456 Calm Street",
          rating: 4.6,
          accepting_new: true,
          specialties: ["Anxiety", "Panic Disorder", "Social Anxiety"],
          insurance_accepted: ["Aetna", "Cigna", "Medicare"]
        }
      ];
    } else if (input.toLowerCase().includes('stress')) {
      response = "Stress is your body's way of responding to any kind of demand or threat. When you have healthy coping mechanisms, stress doesn't have to be negative. Here are some resources to help manage stress.";
      articles = [
        {
          id: 4,
          title: "Stress Management Techniques",
          category: "Wellness",
          read_time: "4 min"
        }
      ];
    } else {
      response = "Thank you for sharing. I'm here to support you with mental health information and resources. Would you like to explore specific topics like anxiety, depression, stress management, or finding professional help?";
    }
    
    return {
      response,
      articles,
      clinics
    };
  }

  // Toggle for mock data
  const toggleMockData = () => {
    setUseMockData(!useMockData);
    console.log(`Switched to ${!useMockData ? 'mock' : 'real'} data mode`);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#6A5ACD] mb-4">Chat Support</h2>
        <p className="text-gray-600">Connect with our mental health support team or use our AI assistant for immediate guidance.</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px]">
        {/* Chat Header */}
       <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#F5F8FA]">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-[#6A5ACD] flex items-center justify-center text-white font-medium">
              A
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900">AI Assistant</p>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
          <div>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start ${message.role === 'user' ? 'justify-end' : ''}`}>
                {message.role === 'assistant' && (
                  <div className="h-8 w-8 rounded-full bg-[#6A5ACD] flex-shrink-0 flex items-center justify-center text-white font-medium">
                    A
                  </div>
                )}
                
                <div className={`${message.role === 'assistant' ? 'ml-3 bg-white' : 'mr-3 bg-[#6A5ACD]'} rounded-lg p-3 shadow-sm max-w-[80%]`}>
                  <div className={`text-sm ${message.role === 'assistant' ? 'text-gray-700' : 'text-white'} markdown-content`}>
                    {message.role === 'assistant' ? (
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    ) : (
                      message.content
                    )}
                  </div>
                  
                  {/* Articles Recommendations UI */}
                  {message.role === 'assistant' && message.articles && message.articles.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 pt-3 border-t border-gray-200"
                    >
                      <p className="text-xs font-semibold text-[#6A5ACD] mb-2">RECOMMENDED ARTICLES</p>
                      <div className="space-y-2">
                        {message.articles.map((article, idx) => (
                          <div 
                            key={idx} 
                            className="bg-[#F0EEFF] rounded-md p-2 hover:bg-[#E4E0FF] transition-colors cursor-pointer"
                            onClick={() => window.open(`/articles/${article.id}`, '_blank')}
                          >
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-[#6A5ACD] rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                                {idx + 1}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">{article.title}</p>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-xs bg-[#6A5ACD] text-white px-2 py-0.5 rounded-full">{article.category}</span>
                                  {article.read_time && (
                                    <span className="text-xs text-gray-500">{article.read_time} read</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            {article.section_title && (
                              <div className="mt-2 text-xs text-gray-700">
                                <span className="font-semibold">From section:</span> {article.section_title}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Clinics Recommendations UI */}
                  {message.role === 'assistant' && message.clinics && message.clinics.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="mt-3 pt-3 border-t border-gray-200"
                    >
                      <p className="text-xs font-semibold text-[#4CAF50] mb-2">RECOMMENDED CLINICS</p>
                      <div className="space-y-2">
                        {message.clinics.map((clinic, idx) => (
                          <div 
                            key={idx} 
                            className="bg-[#F0F7F0] rounded-md p-2 hover:bg-[#E3F1E3] transition-colors cursor-pointer"
                          >
                            <div className="flex items-start">
                              <div className="w-8 h-8 bg-[#4CAF50] rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mr-2 mt-1">
                                {idx + 1}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">{clinic.name}</p>
                                
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                  <div className="text-xs text-gray-600">
                                    <span className="font-semibold">Location:</span> {clinic.location}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    <span className="font-semibold">Rating:</span> {clinic.rating}★
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    <span className="font-semibold">Accepting new patients:</span> {clinic.accepting_new ? 'Yes' : 'No'}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    <span className="font-semibold">Insurance:</span> {clinic.insurance_accepted.slice(0, 2).join(', ')}
                                    {clinic.insurance_accepted.length > 2 && ' + more'}
                                  </div>
                                </div>
                                
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {clinic.specialties.map((specialty, i) => (
                                    <span 
                                      key={i} 
                                      className="text-xs bg-[#4CAF50] text-white px-2 py-0.5 rounded-full"
                                    >
                                      {specialty}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  <p className={`text-xs ${message.role === 'assistant' ? 'text-gray-400' : 'text-purple-200'} mt-1`}>
                    {message.timestamp}
                  </p>
                </div>
                
                {message.role === 'user' && (
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-white font-medium">
                    U
                  </div>
                )}
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-[#6A5ACD] flex-shrink-0 flex items-center justify-center text-white font-medium">
                  A
                </div>
                <div className="ml-3 bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-[#6A5ACD] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-[#6A5ACD] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-[#6A5ACD] animate-bounce" style={{ animationDelay: '600ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* This ref is used to scroll to bottom */}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <button type="button" className="text-gray-400 hover:text-gray-600 mr-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] focus:border-transparent"
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`ml-2 ${!input.trim() || isLoading ? 'bg-gray-300' : 'bg-[#6A5ACD] hover:bg-[#5D4EBE]'} text-white p-2 rounded-full transition-colors`}
            >
              {isLoading ? (
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center">
            <p>This AI assistant provides general guidance but is not a substitute for professional mental health care.</p>
          </div>
          <div className="mt-2 flex justify-center">
            <button 
              type="button"
              onClick={() => toggleMockData()} 
              className="text-xs text-blue-600 hover:underline"
            >
              {useMockData ? "Connect to live backend" : "Use mock data"}
            </button>
            <span className="text-xs text-gray-500 mx-2">•</span>
            <span className="text-xs text-gray-500">
              {useMockData ? "Using offline mode" : "Connected to backend"}
            </span>
          </div>
        </form>
      </div>
    </main>
  );
} 