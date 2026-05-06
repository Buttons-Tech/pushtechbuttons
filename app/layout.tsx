// src/app/layout.tsx

import type { Metadata } from "next";
import { Montserrat, Outfit } from "next/font/google"; // Modern, premium feel
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Buttons Technology | Make Things Happen",
  description: "The executive assistant for the busy Nigerian professional. One button for everything you need.",
  openGraph: {
    images: ['/brand/og-image.jpg'], // The image people see when you share on Social Media
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${montserrat.variable} antialiased font-sans bg-white`}>
        {children}
      </body>
    </html>
  );
}