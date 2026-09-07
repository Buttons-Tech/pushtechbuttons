"use client";

import React from 'react';
import Header from '@/components/Header';
import HeroBannerCarousel from '@/components/HeroBannerCarousel';
import CoreButtonsGrid from '@/components/CoreButtonsGrid';
import PartnerStrip from '@/components/PartnerStrip';
import EstateUtilitiesGrid from '@/components/EstateUtilitiesGrid';
import BottomNavbar from '@/components/BottomNavbar';
import CommunityTickerBar from '@/components/CommunityTickerBar';
import VendorStorefronts from '@/components/VendorStorefronts';
import SecuritySection from '@/components/SecuritySection';
import ClickTeamSection from '@/components/ClickTeamSection';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white text-gray-900 pb-24 overflow-hidden">
      {/* Subtle Pattern Layer on White */}
      <div 
        className="absolute inset-0 bg-african-pattern bg-repeat bg-center opacity-10 mix-blend-multiply pointer-events-none z-0" 
      />

      {/* Foreground Content */}
      <div className="relative z-10">
        <Header />


          {/* Community Ticker Bar */}
          <CommunityTickerBar />


        <main className="max-w-md mx-auto px-4 pt-4 space-y-5">
          {/* 1. Sliding Hero Banners */}
          <HeroBannerCarousel />

          {/* 2. Core 4 Buttns Grid */}
          <CoreButtonsGrid />

          {/* 3. Partners Marquee */}
          <PartnerStrip />

          {/* 4. Vital Estate Services */}
          <EstateUtilitiesGrid />

          <VendorStorefronts />

          {/* Estate Security Section */}
<section className="bg-white p-4 rounded-3xl border border-gray-200/80 shadow-sm">
  <SecuritySection />
</section>

{/* The Click Team Section */}
<ClickTeamSection />
        </main>

        <BottomNavbar />
      </div>
    </div>
  );
}