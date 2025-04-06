'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Appointment {
  id: number;
  type: string;
  doctor: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export default function AppointmentsContent() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [modalOpen, setModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      type: "Therapy Session",
      doctor: "Dr. Sarah Johnson",
      date: "May 15, 2023",
      time: "10:30 AM",
      location: "Online",
      status: "upcoming"
    },
    {
      id: 2,
      type: "Initial Consultation",
      doctor: "Dr. Michael Chen",
      date: "May 20, 2023",
      time: "2:00 PM",
      location: "Main Clinic, Room 304",
      status: "upcoming"
    },
    {
      id: 3,
      type: "Follow-up Session",
      doctor: "Dr. Sarah Johnson",
      date: "June 5, 2023",
      time: "11:00 AM",
      location: "Online",
      status: "upcoming"
    },
    {
      id: 4,
      type: "Group Therapy",
      doctor: "Dr. Emily Watson",
      date: "June 12, 2023",
      time: "6:00 PM",
      location: "Community Center",
      status: "upcoming"
    },
    {
      id: 5,
      type: "Therapy Session",
      doctor: "Dr. Sarah Johnson",
      date: "April 15, 2023",
      time: "10:30 AM",
      location: "Online",
      status: "completed"
    },
    {
      id: 6,
      type: "Medication Review",
      doctor: "Dr. Robert Martinez",
      date: "April 3, 2023",
      time: "9:15 AM",
      location: "Main Clinic, Room 210",
      status: "completed"
    },
    {
      id: 7,
      type: "Assessment",
      doctor: "Dr. Lisa Patel",
      date: "March 28, 2023",
      time: "3:30 PM",
      location: "North Branch Office",
      status: "cancelled"
    }
  ]);
  
  // Function to cancel an appointment
  const cancelAppointment = (id: number) => {
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === id 
        ? { ...appointment, status: 'cancelled' as const } 
        : appointment
    );
    setAppointments(updatedAppointments);
    
    // If we're currently in the upcoming tab, switch to past tab to see the cancelled appointment
    if (activeTab === 'upcoming') {
      setTimeout(() => setActiveTab('past'), 300);
    }
  };

  const filteredAppointments = appointments.filter(appointment => 
    activeTab === 'upcoming' 
      ? appointment.status === 'upcoming' 
      : appointment.status === 'completed' || appointment.status === 'cancelled'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-2"
        >
          Your Appointments
        </motion.h2>
        <p className="text-gray-600">
          View and manage all your scheduled appointments.
        </p>
      </div>

      {/* Tabs and New Appointment Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex space-x-4 mb-4 sm:mb-0">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTab === 'upcoming'
                ? 'bg-[#6A5ACD] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTab === 'past'
                ? 'bg-[#6A5ACD] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Past
          </button>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#6A5ACD] hover:bg-[#5D4EBE] text-white px-4 py-2 rounded-full flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Appointment
        </button>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length > 0 ? (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-start md:items-center mb-4 md:mb-0">
                    <div className={`flex-shrink-0 rounded-lg p-3 mr-4 ${
                      appointment.status === 'upcoming' ? 'bg-[#EDE9FF] text-[#6A5ACD]' :
                      appointment.status === 'completed' ? 'bg-[#F5F8FA] text-[#6A5ACD]' :
                      'bg-[#FFEBEE] text-[#D32F2F]'
                    }`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{appointment.type}</div>
                      <div className="text-gray-600">with {appointment.doctor}</div>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end">
                    <div className="flex items-center text-gray-600 mb-1">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {appointment.date} at {appointment.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {appointment.location}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {appointment.status === 'upcoming' && (
                    <button 
                      onClick={() => cancelAppointment(appointment.id)}
                      className="text-sm px-3 py-1 rounded-full bg-[#FFEBEE] text-[#D32F2F] hover:bg-[#FFCDD2] transition-colors flex items-center"
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel
                    </button>
                  )}
                  {appointment.status === 'upcoming' && (
                    <button className="text-sm px-3 py-1 rounded-full bg-[#F5F8FA] text-[#6A5ACD] hover:bg-[#EDE9FF] transition-colors">
                      Add to Calendar
                    </button>
                  )}
                  {appointment.status === 'completed' && (
                    <span className="text-sm px-3 py-1 rounded-full bg-[#F5F8FA] text-[#6A5ACD]">
                      Completed
                    </span>
                  )}
                  {appointment.status === 'cancelled' && (
                    <span className="text-sm px-3 py-1 rounded-full bg-[#FFEBEE] text-[#D32F2F]">
                      Cancelled
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No appointments found</h3>
          <p className="mt-1 text-gray-500">
            {activeTab === 'upcoming' 
              ? 'You have no upcoming appointments scheduled.' 
              : 'You have no past appointments on record.'}
          </p>
          <div className="mt-6">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#6A5ACD] hover:bg-[#5D4EBE] text-white px-4 py-2 rounded-full"
            >
              Schedule an Appointment
            </button>
          </div>
        </div>
      )}

      {/* Coming Soon Modal for New Appointment */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <div className="bg-[#EDE9FF] text-[#6A5ACD] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Coming Soon</h3>
              <p className="text-gray-600 mt-2">
                Our appointment scheduling system is currently being developed. You'll be able to book appointments directly from this page soon!
              </p>
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="w-full bg-[#6A5ACD] hover:bg-[#5D4EBE] text-white py-2 rounded-lg"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
} 