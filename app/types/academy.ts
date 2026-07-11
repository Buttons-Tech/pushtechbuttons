// src/types/academy.ts

export interface TalentApplication {
  id: string;
  fullName: string;
  email: string;
  track: 'engineering' | 'design' | 'product';
  applicationType: 'paid_bootcamp' | 'scholarship_route';
  portfolioUrl?: string;
  status: 'applied' | 'under_review' | 'interview_scheduled' | 'accepted' | 'rejected';
  termsAccepted: boolean; // Must be true for "work-for-years" scholarship
  payment?: {
    amountPaid: number;
    reference: string; // Paystack ref
    status: 'pending' | 'success' | 'failed';
  };
}