'use client';

export default function ProfileContent() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Profile</h2>
        <p className="text-gray-600">Manage your personal information and preferences.</p>
      </div>
      
      {/* Profile Overview */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:flex-shrink-0 bg-[#F3EEFB] md:w-64 flex flex-col items-center justify-center py-8">
            <div className="h-28 w-28 rounded-full bg-[#9D7FBC] flex items-center justify-center text-white text-4xl font-medium">
              J
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium text-gray-900">John Doe</h3>
              <p className="text-sm text-gray-500">Member since June 2023</p>
            </div>
            <button className="mt-4 text-sm text-[#9D7FBC] hover:underline">
              Change Photo
            </button>
          </div>
          <div className="p-8 flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input 
                  type="text" 
                  value="John Doe" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9D7FBC] focus:border-transparent"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input 
                  type="email" 
                  value="john.doe@example.com" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9D7FBC] focus:border-transparent"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  value="+1 (555) 123-4567" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9D7FBC] focus:border-transparent"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input 
                  type="text" 
                  value="January 15, 1990" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9D7FBC] focus:border-transparent"
                  readOnly
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="bg-[#9D7FBC] text-white px-4 py-2 rounded-md hover:bg-[#8A6BA7] transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Preferences */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                <p className="text-xs text-gray-500">Receive updates about your account, new resources, and community events</p>
              </div>
              <div className="relative inline-block w-12 h-6 align-middle select-none">
                <input type="checkbox" checked className="absolute opacity-0 w-0 h-0" readOnly />
                <div className="bg-[#9D7FBC] block w-12 h-6 rounded-full cursor-pointer"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transform translate-x-6"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">SMS Notifications</h4>
                <p className="text-xs text-gray-500">Receive text message reminders for upcoming appointments and events</p>
              </div>
              <div className="relative inline-block w-12 h-6 align-middle select-none">
                <input type="checkbox" className="absolute opacity-0 w-0 h-0" readOnly />
                <div className="bg-gray-300 block w-12 h-6 rounded-full cursor-pointer"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Dark Mode</h4>
                <p className="text-xs text-gray-500">Switch to dark mode for a more comfortable viewing experience at night</p>
              </div>
              <div className="relative inline-block w-12 h-6 align-middle select-none">
                <input type="checkbox" className="absolute opacity-0 w-0 h-0" readOnly />
                <div className="bg-gray-300 block w-12 h-6 rounded-full cursor-pointer"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Connected Accounts */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Connected Accounts</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">Google</h4>
                  <p className="text-xs text-gray-500">Connected as john.doe@gmail.com</p>
                </div>
              </div>
              <button className="text-sm text-red-600 hover:text-red-800">
                Disconnect
              </button>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.126-5.863 10.126-11.854z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">Facebook</h4>
                  <p className="text-xs text-gray-500">Not connected</p>
                </div>
              </div>
              <button className="text-sm text-[#9D7FBC] hover:text-[#8A6BA7]">
                Connect
              </button>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">Twitter</h4>
                  <p className="text-xs text-gray-500">Not connected</p>
                </div>
              </div>
              <button className="text-sm text-[#9D7FBC] hover:text-[#8A6BA7]">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 