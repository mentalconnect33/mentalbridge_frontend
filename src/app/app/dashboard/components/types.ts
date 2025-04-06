// Types for clinic data
export interface Clinic {
  id: number;
  name: string;
  description: string;
  image_url: string;
  location: string;
  distance: string;
  rating: number;
  review_count: number;
  accepting_new: boolean;
  phone: string;
  address: string;
  website: string;
  hours: string;
  specialties: string[];
  insuranceAccepted: string[];
  created_at?: string;
  updated_at?: string;
} 