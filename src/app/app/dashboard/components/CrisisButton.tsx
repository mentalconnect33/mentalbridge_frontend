'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CrisisButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 z-40 bg-[#D32F2F] text-white rounded-full p-3 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
      </motion.button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-bold mb-4">Crisis Support</h2>
            <p className="mb-6">
              If you're experiencing a mental health crisis or emergency, please use one of the
              following resources for immediate support:
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                <div className="bg-[#EDE9FF] rounded-full p-2 mr-3">
                  <svg className="h-5 w-5 text-[#6A5ACD]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">National Crisis Hotline</p>
                  <p className="text-[#6A5ACD]">1-800-273-8255</p>
                </div>
              </div>

              <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                <div className="bg-[#EDE9FF] rounded-full p-2 mr-3">
                  <svg className="h-5 w-5 text-[#6A5ACD]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Text Support Line</p>
                  <p className="text-[#6A5ACD]">Text HOME to 741741</p>
                </div>
              </div>

              <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                <div className="bg-[#EDE9FF] rounded-full p-2 mr-3">
                  <svg className="h-5 w-5 text-[#6A5ACD]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Find Local Support</p>
                  <p className="text-[#6A5ACD]">Use the locator below</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              If this is a medical emergency, please call 911 or go to your nearest emergency room.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <a
                href="https://findtreatment.samhsa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#6A5ACD] text-white rounded-lg hover:bg-[#5D4EBE]"
              >
                Find Resources
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
} 