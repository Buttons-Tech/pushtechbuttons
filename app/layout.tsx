// src/app/layout.tsx
import { SessionProvider } from "next-auth/react";
import { Providers } from './providers';
import type { Metadata } from "next";
import { Montserrat, Outfit } from "next/font/google"; // Modern, premium feel
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://pushtechbuttons.com", // Replace with your actual domain later
  ),

  title: "Buttns: Egan | Tap in!",
  description:
    "Connecting Communities to Local Businesses. Tap in to discover, support, and engage with your neighborhood's offerings.",
  openGraph: {
    images: ["/brand/signup.avif"], // The image people see when you share on Social Media
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${montserrat.variable} antialiased font-sans bg-white`}
      >
        <Providers>{children}</Providers>
        
      </body>
    </html>
  );
}
