// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role?: "customer" | "vendor" | "admin";
      phone?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    role?: "customer" | "vendor" | "admin";
    phone?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "customer" | "vendor" | "admin";
    phone?: string;
  }
}