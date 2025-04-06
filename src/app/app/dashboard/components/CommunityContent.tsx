'use client';

export default function CommunityContent() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Community Support</h2>
        <p className="text-gray-600">Connect with others, share experiences, and find support in our mental health communities.</p>
      </div>
      
      {/* Community Groups */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Popular Support Groups</h3>
          <button className="text-sm text-[#9D7FBC] hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Group 1 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-32 bg-[#DFD8ED] relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
              <svg className="w-16 h-16 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="p-5">
              <h4 className="text-base font-bold text-gray-900 mb-2">Anxiety Support Circle</h4>
              <p className="text-sm text-gray-600 mb-4">A safe space to discuss anxiety challenges and share coping strategies.</p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="h-6 w-6 rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center text-white text-xs">S</div>
                  <div className="h-6 w-6 rounded-full bg-pink-500 border-2 border-white flex items-center justify-center text-white text-xs">J</div>
                  <div className="h-6 w-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white text-xs">L</div>
                  <div className="h-6 w-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-white text-xs">+8</div>
                </div>
                <button className="bg-[#9D7FBC] text-white px-3 py-1 rounded-full text-xs hover:bg-[#8A6BA7] transition-colors">
                  Join Group
                </button>
              </div>
            </div>
          </div>
          
          {/* Group 2 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-32 bg-[#DFD8ED] relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
              <svg className="w-16 h-16 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="p-5">
              <h4 className="text-base font-bold text-gray-900 mb-2">Depression Support</h4>
              <p className="text-sm text-gray-600 mb-4">Connect with others experiencing depression in a supportive environment.</p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="h-6 w-6 rounded-full bg-yellow-500 border-2 border-white flex items-center justify-center text-white text-xs">C</div>
                  <div className="h-6 w-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs">T</div>
                  <div className="h-6 w-6 rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-white text-xs">M</div>
                  <div className="h-6 w-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-white text-xs">+12</div>
                </div>
                <button className="bg-[#9D7FBC] text-white px-3 py-1 rounded-full text-xs hover:bg-[#8A6BA7] transition-colors">
                  Join Group
                </button>
              </div>
            </div>
          </div>
          
          {/* Group 3 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-32 bg-[#DFD8ED] relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
              <svg className="w-16 h-16 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="p-5">
              <h4 className="text-base font-bold text-gray-900 mb-2">Mindfulness Practice</h4>
              <p className="text-sm text-gray-600 mb-4">Group practice and discussion around mindfulness and meditation.</p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="h-6 w-6 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs">A</div>
                  <div className="h-6 w-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white text-xs">R</div>
                  <div className="h-6 w-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs">E</div>
                  <div className="h-6 w-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-white text-xs">+5</div>
                </div>
                <button className="bg-[#9D7FBC] text-white px-3 py-1 rounded-full text-xs hover:bg-[#8A6BA7] transition-colors">
                  Join Group
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upcoming Events */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Upcoming Community Events</h3>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Format
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participants
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Anxiety Support Group Meeting</div>
                    <div className="text-xs text-gray-500">Hosted by Dr. Sarah Johnson</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Jun 15, 2023</div>
                    <div className="text-xs text-gray-500">7:00 PM - 8:30 PM</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Online
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    24 / 30
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#9D7FBC] hover:text-[#8A6BA7]">Register</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Mindfulness Workshop</div>
                    <div className="text-xs text-gray-500">Hosted by Michael Chang</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Jun 18, 2023</div>
                    <div className="text-xs text-gray-500">6:00 PM - 7:30 PM</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Hybrid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    18 / 25
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#9D7FBC] hover:text-[#8A6BA7]">Register</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
} 