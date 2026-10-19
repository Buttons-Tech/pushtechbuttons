// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    // 1. Instant Email/Phone & Password Login (No external API needed)
    CredentialsProvider({
      name: "Buttns Account",
      credentials: {
        emailOrPhone: { label: "Email or Phone", type: "text", placeholder: "resident@estate.com" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }, // 'customer' or 'vendor'
      },
      async authorize(credentials) {
        if (!credentials?.emailOrPhone || !credentials?.password) {
          return null;
        }

        // Demo / Development Fallback Authorization
        // In production, you will fetch & verify against your NestJS / MongoDB backend
        const email = credentials.emailOrPhone.toLowerCase();
        const role = (credentials.role as "customer" | "vendor") || "customer";

        return {
          id: email.includes("vendor") ? "vendor_123" : "user_456",
          name: email.includes("vendor") ? "Aunty Cossy Kitchen" : "Estate Resident",
          email: email.includes("@") ? email : `${email}@buttns.app`,
          role: role,
        };
      },
    }),

    // 2. Google OAuth Provider (Active only if credentials are set in .env.local)
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "customer";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "customer" | "vendor" | "admin";
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET || "buttns-super-secret-development-key-12345",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };