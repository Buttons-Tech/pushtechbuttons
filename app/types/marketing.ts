// src/types/marketing.ts

export interface BusinessSpotlight {
  id: string;
  businessId: string;
  campaignTier: 'starter' | 'premium' | 'elite';
  startDate: Date;
  endDate: Date;
  targetArea: string[]; // e.g., ["Lekki", "Ikoyi"]
  clicks: number;
  impressions: number;
  isActive: boolean;
}