// Example: src/types/talent.ts
export interface Applicant {
  id: string;
  type: 'paid' | 'scholarship';
  status: 'pending' | 'interviewed' | 'accepted';
  paymentConfirmed: boolean;
  yearsOfCommitment?: number; // For the scholarship route
}