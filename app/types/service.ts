// src/types/service.ts

export interface ServiceItem {
  id: string;
  businessId: string;
  name: string;
  price: number;
  currency: 'NGN';
  estimatedTime: string; // e.g., "30 mins" or "24 hours" for laundry
  imageUrl: string;
  isAvailable: boolean;
  tags: string[]; // e.g., ["Proteins", "Quick-Fix", "Emergency"]
  metadata?: {
    calories?: number;      // For food
    fabricType?: string[];  // For laundry
    stylistName?: string;   // For salon
  };
}