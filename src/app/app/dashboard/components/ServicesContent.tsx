'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Clinic } from './types';

// Location icon component
const LocationIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
    />
  </svg>
);

export default function ServicesContent() {
  const [activeSpecialty, setActiveSpecialty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [allSpecialties, setAllSpecialties] = useState<string[]>(['all']);
  
  // Handle responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Set initial value
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Fetch data from Supabase
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch all clinics
        const { data: clinicsData, error: clinicsError } = await supabase
          .from('clinics')
          .select('*');
        
        if (clinicsError) throw clinicsError;
        
        // Fetch all specialties for dropdown filter
        const { data: specialtiesData, error: specialtiesError } = await supabase
          .from('specialties')
          .select('name');
        
        if (specialtiesError) throw specialtiesError;
        
        // For each clinic, get its specialties and insurance
        const enrichedClinics = await Promise.all(
          clinicsData.map(async (clinic) => {
            // Get specialties for this clinic
            const { data: clinicSpecialties, error: specialtiesError } = await supabase
              .from('clinic_specialties')
              .select(`
                specialty_id,
                specialties(name)
              `)
              .eq('clinic_id', clinic.id);
            
            if (specialtiesError) console.error("Error fetching specialties:", specialtiesError);
            
            // Get insurance for this clinic
            const { data: clinicInsurance, error: insuranceError } = await supabase
              .from('clinic_insurance')
              .select(`
                insurance_id,
                insurance_providers(name)
              `)
              .eq('clinic_id', clinic.id);
            
            if (insuranceError) console.error("Error fetching insurance:", insuranceError);
            
            // Format the specialties and insurance arrays
            const specialties = clinicSpecialties?.map(item => (item.specialties as any)?.name || '') || [];
            const insuranceAccepted = clinicInsurance?.map(item => (item.insurance_providers as any)?.name || '') || [];
            
            // Return the enriched clinic object
            return {
              ...clinic,
              specialties,
              insuranceAccepted
            };
          })
        );
        
        // Set all unique specialties for the filter
        const uniqueSpecialties = ['all', ...specialtiesData.map(s => s.name)];
        
        setClinics(enrichedClinics);
        setAllSpecialties(uniqueSpecialties);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Filter clinics based on specialty and search query
  const filteredClinics = clinics.filter(clinic => {
    const matchesSpecialty = activeSpecialty === 'all' || clinic.specialties.includes(activeSpecialty);
    const matchesSearch = clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         clinic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         clinic.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSpecialty && matchesSearch;
  });

  // Function to render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`star-${i}`} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg key="half-star" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
          <path fill="#e5e7eb" d="M12 17.27V2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
        </svg>
      );
    }

    // Add empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }

    return stars;
  };

  // View clinic details
  const viewClinicDetails = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    window.scrollTo(0, 0);
  };

  // Close clinic details
  const closeClinicDetails = () => {
    setSelectedClinic(null);
  };

  // If a clinic is selected, show detailed view
  if (selectedClinic) {
    return (
      <div className="w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-x-hidden">
          <button 
            onClick={closeClinicDetails}
            className="flex items-center text-[#6A5ACD] mb-6 hover:underline"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to clinics
          </button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="h-64 bg-gray-200 relative">
                {/* Placeholder for clinic image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  [Clinic Image]
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedClinic.name}</h2>
                    <div className="flex items-center mt-2">
                      {renderStars(selectedClinic.rating)}
                      <span className="ml-2 text-gray-600 text-sm">{selectedClinic.rating} ({selectedClinic.review_count} reviews)</span>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedClinic.accepting_new ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedClinic.accepting_new ? 'Accepting New Patients' : 'Not Accepting New Patients'}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{selectedClinic.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Location & Contact</h3>
                    <div className="space-y-2">
                      <div className="flex">
                        <LocationIcon className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-gray-800">{selectedClinic.address}</p>
                          {typeof selectedClinic.distance === 'number' ? (
                            <p className="text-gray-600 text-sm">{(selectedClinic.distance as number).toFixed(1)} mi</p>
                          ) : (
                            <p className="text-gray-600 text-sm">{selectedClinic.distance}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex">
                        <svg className="w-5 h-5 text-gray-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <p className="text-gray-800">{selectedClinic.phone}</p>
                      </div>
                      <div className="flex">
                        <svg className="w-5 h-5 text-gray-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <p className="text-gray-800">{selectedClinic.website}</p>
                      </div>
                      <div className="flex">
                        <svg className="w-5 h-5 text-gray-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-gray-800">{selectedClinic.hours}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedClinic.specialties.map((specialty, index) => (
                        <span key={index} className="px-3 py-1 bg-[#EDE9FF] text-[#6A5ACD] rounded-full text-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Insurance Accepted</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedClinic.insuranceAccepted.map((insurance, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {insurance}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href={`tel:${selectedClinic.phone.replace(/[^0-9]/g, '')}`}
                    className="flex items-center justify-center bg-[#6A5ACD] text-white py-3 px-6 rounded-lg hover:bg-[#5D4EBE] transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call to Schedule
                  </a>
                  <button 
                    onClick={() => setShowBookingModal(true)}
                    className="flex items-center justify-center bg-[#EDE9FF] text-[#6A5ACD] py-3 px-6 rounded-lg hover:bg-[#D4C8FF] transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book Appointment Online
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Similar Clinics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {clinics
                  .filter(clinic => clinic.id !== selectedClinic.id)
                  .filter(clinic => clinic.specialties.some(s => selectedClinic.specialties.includes(s)))
                  .slice(0, 3)
                  .map(clinic => (
                    <div 
                      key={clinic.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => viewClinicDetails(clinic)}
                    >
                      <h4 className="font-medium text-[#6A5ACD]">{clinic.name}</h4>
                      <div className="flex items-center mt-1 mb-2">
                        {renderStars(clinic.rating)}
                        <span className="ml-1 text-xs text-gray-600">({clinic.rating})</span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-2">{clinic.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {clinic.specialties.slice(0, 2).map((specialty, index) => (
                          <span key={index} className="px-2 py-0.5 bg-[#EDE9FF] text-[#6A5ACD] rounded-full text-xs">
                            {specialty}
                          </span>
                        ))}
                        {clinic.specialties.length > 2 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
                            +{clinic.specialties.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>

          {showBookingModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Online Booking</h3>
                  <button 
                    onClick={() => setShowBookingModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="text-center py-6">
                  <div className="bg-[#EDE9FF] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#6A5ACD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Coming Soon!</h4>
                  <p className="text-gray-600 mb-4">
                    Online booking is currently under development. Please call the clinic directly to schedule your appointment.
                  </p>
                  <a
                    href={`tel:${selectedClinic.phone.replace(/[^0-9]/g, '')}`}
                    className="inline-block bg-[#6A5ACD] text-white py-2 px-6 rounded-lg hover:bg-[#5D4EBE] transition-colors"
                  >
                    Call {selectedClinic.phone}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-x-hidden">
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6A5ACD]"></div>
            <span className="ml-3 text-gray-600">Loading clinics...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-x-hidden">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-[#6A5ACD] mb-2">Mental Health Clinics</h2>
          <p className="text-gray-600">
            Find trusted mental health clinics and practices in your area.
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search clinics by name, specialty, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] focus:border-transparent"
            />
          </div>
        </div>

        {/* Specialty Filter - improved scrolling behavior */}
        <div className="mb-6 w-full overflow-hidden">
          <div className="flex space-x-2 overflow-x-auto pb-3 hide-scrollbar">
            <button
              className={`px-4 py-2 rounded-full whitespace-nowrap flex-shrink-0 ${
                activeSpecialty === 'All'
                  ? 'bg-[#B0E0E6] text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setActiveSpecialty('All')}
            >
              All Clinics
            </button>
            {allSpecialties.map(specialty => (
              <button
                key={specialty}
                className={`px-4 py-2 rounded-full whitespace-nowrap flex-shrink-0 ${
                  activeSpecialty === specialty
                    ? 'bg-[#B0E0E6] text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setActiveSpecialty(specialty)}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>

        {/* Clinics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClinics.length > 0 ? (
            filteredClinics.map(clinic => (
              <div
                key={clinic.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => viewClinicDetails(clinic)}
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={clinic.image_url || "/clinic-placeholder.jpg"}
                    alt={clinic.name}
                    className="w-full h-full object-cover"
                  />
                  {clinic.accepting_new && (
                    <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Accepting New Patients
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-[#6A5ACD]">{clinic.name}</h3>
                  <div className="flex items-center mt-1 mb-2">
                    {renderStars(clinic.rating)}
                    <span className="ml-1 text-sm text-gray-600">({clinic.review_count} reviews)</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{clinic.description}</p>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <LocationIcon className="w-4 h-4 mr-1" />
                    <span>{clinic.address.substring(0, clinic.address.indexOf(','))}</span>
                    {typeof clinic.distance === 'number' ? (
                      <span className="ml-1">• {(clinic.distance as number).toFixed(1)} mi</span>
                    ) : (
                      <span className="ml-1">• {clinic.distance}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {clinic.specialties.slice(0, 3).map((specialty, index) => (
                      <span key={index} className="px-2 py-0.5 bg-[#EDE9FF] text-[#6A5ACD] rounded-full text-xs">
                        {specialty}
                      </span>
                    ))}
                    {clinic.specialties.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
                        +{clinic.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <div className="text-gray-500">No clinics found matching your criteria</div>
              <button
                className="mt-4 px-4 py-2 bg-[#B0E0E6] text-white rounded-lg hover:bg-[#87CEEB]"
                onClick={() => {
                  setActiveSpecialty('All');
                  setSearchQuery('');
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 