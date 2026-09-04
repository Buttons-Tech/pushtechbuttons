"use client";

import React from 'react';
import Header from '../components/Header';
import CoreButtonsCarousel from '../components/CoreButtonsCarousel';
import EmberLaunchBanner from '../components/EmberLaunchBanner';
import EstateUtilitiesGrid from '../components/EstateUtilitiesGrid';
import BottomNavbar from '../components/BottomNavbar';
import { Truck, MapPin } from 'lucide-react';

const ASSETS = {
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  heroBanner: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  dispatchBike: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80"
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans pb-24">
      {/* 1. Profile & Search Header */}
      <Header userAvatar={ASSETS.avatar} residentPhase="Phase 1" />

      <main className="max-w-md mx-auto px-4 pt-4 space-y-6">
        {/* 2. Core 4 Buttns Swipeable Wheel */}
        <CoreButtonsCarousel />

        {/* 3. Ember Countdown Banner */}
        <EmberLaunchBanner backgroundImage={ASSETS.heroBanner} />

        {/* 4. Vital Estate Utilities Grid */}
        <EstateUtilitiesGrid />

        {/* 5. Dispatch Delivery Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-amber-500 text-black p-4 shadow-sm flex items-center justify-between min-h-[110px]">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-multiply"
            style={{ backgroundImage: `url(${ASSETS.dispatchBike})` }}
          />
          <div className="relative z-10 space-y-1">
            <div className="flex items-center gap-1 font-black text-[10px] uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5 fill-black" />
              <span>Gate-to-Gate Express Dispatch</span>
            </div>
            <h3 className="text-xs font-black leading-tight">
              Fast intra-estate delivery across all gates.
            </h3>
          </div>
          <button className="relative z-10 bg-black text-white px-3 py-2 rounded-xl text-xs font-black shrink-0 hover:bg-gray-900 transition">
            Book Dispatch
          </button>
        </section>

        {/* 6. Gatehouse HQ Bulletin */}
        <section className="bg-black text-white p-4 rounded-3xl shadow-md space-y-2 border border-zinc-800">
          <div className="flex items-center justify-between text-[10px] text-amber-500 font-bold">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Gatehouse HQ Update
            </span>
            <span>Sept 1st Launch</span>
          </div>
          <p className="text-xs text-gray-300 font-medium leading-relaxed">
            Onboarding verified estate artisans, solar installers, and local kitchens daily ahead of our Ember launch.
          </p>
        </section>
      </main>

      {/* 7. Bottom Navigation Bar */}
      <BottomNavbar />
    </div>
  );
}