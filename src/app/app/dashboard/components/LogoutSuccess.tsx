'use client';

import { motion } from 'framer-motion';

interface LogoutSuccessProps {
  onClose: () => void;
}

export default function LogoutSuccess({ onClose }: LogoutSuccessProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl p-6 max-w-md w-full text-center"
      >
        <div className="bg-[#EDE9FF] rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
          <svg className="h-8 w-8 text-[#6A5ACD]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Logged Out Successfully</h3>
        <p className="text-gray-600 mb-6">
          You have been successfully logged out of your account. Thank you for using our services.
        </p>
        <button
          onClick={onClose}
          className="bg-[#6A5ACD] hover:bg-[#5D4EBE] text-white font-medium py-2 px-6 rounded-lg w-full"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
} 