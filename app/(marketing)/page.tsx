// src/app/(marketing)/page.tsx

import { Hero } from "../components/marketing/Hero";
import { PartnerStrip } from "../components/marketing/PartnerStrip";
import { ServicesGrid } from "../components/marketing/ServicesGrid";
// import { BusinessSpotlight } from "@/components/marketing/BusinessSpotlight";
// import { ServicesGrid } from "@/components/marketing/ServicesGrid";
import { TalentAcademy } from "@/app/components/marketing/TalentAcademy";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* 1. The "Command Center" Hero Section */}
      <Hero />
      


      {/* 2. The "Buttons" Ecosystem (Services) */}
      <ServicesGrid />

      {/* 3. The Business Partners (Visibility Section) */}
      {/* <BusinessSpotlight /> */}
      <PartnerStrip />

      {/* 4. The Talent & Academy (Builders & Students) */}
      <TalentAcademy />
    </main>
  );
}