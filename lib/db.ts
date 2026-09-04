// src/lib/db.ts

export interface WaitlistUser {
  id: string;
  phoneNumber: string; // Saved in clean format (e.g., "8012345678")
  countryCode: string; // Stored separately for flexible querying (e.g., "+234")
  createdAt: string;
}

// Simulated In-Memory MongoDB Collection
let waitlistCollection: WaitlistUser[] = [];

export const db = {
  waitlist: {
    /**
     * Inserts a new user into the waitlist.
     * Mimics: await db.collection('waitlist').insertOne({...})
     */
    async create(data: { phoneNumber: string; countryCode: string }): Promise<WaitlistUser> {
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Quick validation check to prevent duplicates (classic MongoDB unique constraint)
      const existing = waitlistCollection.find((u) => u.phoneNumber === data.phoneNumber);
      if (existing) {
        throw new Error('This number is already tapped into the waitlist.');
      }

      const newUser: WaitlistUser = {
        id: Math.random().toString(36).substring(2, 9), // Simulates ObjectId
        phoneNumber: data.phoneNumber,
        countryCode: data.countryCode,
        createdAt: new Date().toISOString(),
      };

      waitlistCollection.push(newUser);
      
      // Log for developer tracking
      console.log('--- MongoDB Mock Layer Log ---');
      console.log('Inserted Document:', newUser);
      console.log('Total Documents:', waitlistCollection.length);

      return newUser;
    },

    /**
     * Retrieves all waitlist users.
     * Mimics: await db.collection('waitlist').find({}).toArray()
     */
    async findMany(): Promise<WaitlistUser[]> {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return [...waitlistCollection];
    },
  },
};