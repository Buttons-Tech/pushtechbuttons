// src/types/business.ts

export type BusinessCategory = 'food' | 'laundry' | 'salon' | 'health' | 'essential';

export interface BusinessProfile {
  id: string;
  ownerId: string;
  name: string;
  slug: string; // e.g., "lekki-gourmet-kitchen"
  category: BusinessCategory;
  description: string;
  logoUrl: string;
  bannerUrl: string;
  rating: number;
  isVerified: boolean;
  location: {
    address: string;
    coordinates: { lat: number; lng: number }; // For the "nearest facility" feature
    area: string; // e.g., "Lekki Phase 1"
  };
  contact: {
    phone: string;
    email: string;
    whatsapp?: string;
  };
  onboardingStatus: 'pending' | 'active' | 'suspended';
}