// src/app/(marketing)/layout.tsx

import { Navbar } from "@/app/components/shared/Navbar";
import { Footer } from "@/app/components/shared/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <div className="flex-grow">
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
}