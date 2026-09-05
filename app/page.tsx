"use client";

import React from 'react';
import Header from '@/components/Header';
import HeroBannerCarousel from '@/components/HeroBannerCarousel';
import CoreButtonsGrid from '@/components/CoreButtonsGrid';
import PartnerStrip from '@/components/PartnerStrip';
import EstateUtilitiesGrid from '@/components/EstateUtilitiesGrid';
import BottomNavbar from '@/components/BottomNavbar';
import CommunityTickerBar from '@/components/CommunityTickerBar';

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

        <main className="max-w-md mx-auto px-4 pt-4 space-y-5">
          {/* 1. Sliding Hero Banners */}
          <HeroBannerCarousel />

          {/* Community Ticker Bar */}
          <CommunityTickerBar />

          {/* 2. Core 4 Buttns Grid */}
          <CoreButtonsGrid />

          {/* 3. Partners Marquee */}
          <PartnerStrip />

          {/* 4. Vital Estate Services */}
          <EstateUtilitiesGrid />
        </main>

        <BottomNavbar />
      </div>
    </div>
  );
}