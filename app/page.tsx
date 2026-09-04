"use client";

import React from 'react';
import Header from '@/components/Header';
import HeroBannerCarousel from '@/components/HeroBannerCarousel';
import CoreButtonsGrid from '@/components/CoreButtonsGrid';
import EstateUtilitiesGrid from '@/components/EstateUtilitiesGrid';
import BottomNavbar from '@/components/BottomNavbar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <Header />

      <main className="max-w-md mx-auto px-4 pt-4 space-y-5">
        {/* 1. Sliding Hero Banners */}
        <HeroBannerCarousel />

        {/* 2. Core 4 Buttns Swipeable Wheel */}
        <CoreButtonsGrid />

        {/* 3. Vital Estate Services */}
        <EstateUtilitiesGrid />
      </main>

      <BottomNavbar />
    </div>
  );
}