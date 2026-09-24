"use client";

import React, { useState } from 'react';
import { 
  Layout, 
  Megaphone, 
  Eye, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  DollarSign,
  Building2,
  Smartphone
} from 'lucide-react';

// Replace with your exact Cloudinary Portals visual asset
const PORTALS_HERO_IMAGE = "https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=1000&q=80";

type AdType = 'physical' | 'digital';

interface AdPackage {
  id: string;
  type: AdType;
  title: string;
  locationOrPlacement: string;
  weeklyPrice: number;
  estImpressions: string;
  features: string[];
}

const AD_PACKAGES: AdPackage[] = [
  {
    id: "gate-portal",
    type: "physical",
    title: "Estate Main Gate Portal",
    locationOrPlacement: "Primary Entrance Signage Frame",
    weeklyPrice: 15000,
    estImpressions: "3,500+ daily views",
    features: ["High-contrast print framing", "Night illumination", "Direct eye-level placement"]
  },
  {
    id: "cave-hub-board",
    type: "physical",
    title: "The Cave Tech Hub Board",
    locationOrPlacement: "Co-working Space Entrance & Lobby",
    weeklyPrice: 10000,
    estImpressions: "800+ tech founders/daily",
    features: ["A2 acrylic frame", "QR code scan trackable", "Tech-focused audience"]
  },
  {
    id: "app-banner-feed",
    type: "digital",
    title: "Buttns In-App Hero Carousel",
    locationOrPlacement: "Top Carousel on Main App Feed",
    weeklyPrice: 12000,
    estImpressions: "10,000+ app opens/week",
    features: ["Click-through to WhatsApp/Website", "Auto-rotating primary slot", "In-app analytics dashboard"]
  },
  {
    id: "ziig-delivery-slip",
    type: "digital",
    title: "Ziig Delivery Sponsor Slot",
    locationOrPlacement: "Order Tracking Screen Banner",
    weeklyPrice: 8000,
    estImpressions: "2,000+ targeted deliveries/week",
    features: ["Targeted at active buyers", "100% attention placement", "Promo code link button"]
  }
];

export default function PortalsSection() {
  const [activeTab, setActiveTab] = useState<AdType>('physical');
  const [selectedPackage, setSelectedPackage] = useState<AdPackage>(AD_PACKAGES[0]);
  const [weeks, setWeeks] = useState<number>(2);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const filteredPackages = AD_PACKAGES.filter(pkg => pkg.type === activeTab);
  const totalPrice = selectedPackage.weeklyPrice * weeks;

  return (
    <section className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <Layout className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-black text-gray-900 tracking-tight uppercase">
            Portals & Ad Slots
          </h2>
        </div>
        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
          <Eye className="w-3 h-3 text-amber-600" />
          Estate Reach
        </span>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-gray-200 p-3.5 shadow-sm space-y-3.5">
        
        {/* 1. Unobstructed Visual Hero */}
        <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
          <img
            src={PORTALS_HERO_IMAGE}
            alt="Buttns Portals and Signage"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
            <Megaphone className="w-3 h-3 text-amber-400" />
            <span className="text-[9px] font-black uppercase text-white tracking-wider">
              Estate Ad Network
            </span>
          </div>

          <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-zinc-950/90 backdrop-blur-md p-2 rounded-xl border border-zinc-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-bold text-gray-200">Local Business Exposure</span>
            </div>
            <span className="text-[10px] font-black text-amber-400">High Visibility</span>
          </div>
        </div>

        {/* 2. Type Selector Tabs */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-gray-100 rounded-2xl border border-gray-200/80">
          <button
            onClick={() => {
              setActiveTab('physical');
              setSelectedPackage(AD_PACKAGES.find(p => p.type === 'physical')!);
            }}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'physical'
                ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-500" />
            <span>Physical Portals</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('digital');
              setSelectedPackage(AD_PACKAGES.find(p => p.type === 'digital')!);
            }}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'digital'
                ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-purple-600" />
            <span>Digital App Ads</span>
          </button>
        </div>

        {/* 3. Package Options Cards */}
        <div className="space-y-2">
          {filteredPackages.map((pkg) => {
            const isSelected = selectedPackage.id === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg)}
                className={`p-3 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                  isSelected
                    ? 'bg-amber-50/40 border-amber-400 shadow-sm'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                        isSelected ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {isSelected ? '✓' : ''}
                      </span>
                      <h4 className="text-xs font-black text-gray-900">{pkg.title}</h4>
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium pl-5 mt-0.5">
                      {pkg.locationOrPlacement}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-black text-gray-900">₦{pkg.weeklyPrice.toLocaleString()}</p>
                    <p className="text-[9px] text-amber-700 font-bold">/ week</p>
                  </div>
                </div>

                {isSelected && (
                  <div className="pl-5 pt-1 space-y-1.5 animate-in fade-in duration-200">
                    <div className="inline-flex items-center gap-1 bg-amber-100/80 text-amber-900 px-2 py-0.5 rounded-md text-[9px] font-bold">
                      <Eye className="w-2.5 h-2.5" />
                      <span>{pkg.estImpressions}</span>
                    </div>

                    <ul className="space-y-1">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="text-[10px] text-gray-600 font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-amber-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 4. Duration Selector & Calculator */}
        <div className="p-3 bg-zinc-950 rounded-2xl text-white space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-bold text-gray-200">Campaign Duration</span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 4, 8].map((w) => (
                <button
                  key={w}
                  onClick={() => setWeeks(w)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-all ${
                    weeks === w
                      ? 'bg-amber-400 text-zinc-950'
                      : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                  }`}
                >
                  {w}W
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-2 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400 font-medium">Estimated Investment ({weeks} {weeks === 1 ? 'Week' : 'Weeks'})</p>
              <p className="text-base font-black text-amber-400">₦{totalPrice.toLocaleString()}</p>
            </div>

            <button
              onClick={() => setShowBookingModal(true)}
              className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-zinc-950 px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-md shadow-amber-400/20"
            >
              <span>Reserve Slot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Reservation Drawer Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-black text-sm">
                  <Megaphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900">Reserve Ad Placement</h3>
                  <p className="text-[10px] text-gray-500 font-bold">Lock in your estate visibility slot</p>
                </div>
              </div>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            {/* Summary Box */}
            <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-1">
              <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Selected Package</p>
              <div className="flex justify-between items-center">
                <p className="text-xs font-black text-gray-900">{selectedPackage.title}</p>
                <p className="text-xs font-black text-amber-700">₦{totalPrice.toLocaleString()}</p>
              </div>
              <p className="text-[10px] text-gray-600 font-medium">
                Duration: {weeks} {weeks === 1 ? 'Week' : 'Weeks'} ({selectedPackage.estImpressions})
              </p>
            </div>

            <div className="space-y-2.5">
              {/* Option 1: Direct WhatsApp Desk */}
              <a
                href={`https://wa.me/2348012345678?text=Hello%20Buttns%20Portals,%20I%20want%20to%20reserve%20the%20"${encodeURIComponent(selectedPackage.title)}"%20slot%20for%20${weeks}%20week(s)%20(Total:%20₦${totalPrice.toLocaleString()}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 transition-colors group"
              >
                <div>
                  <p className="text-xs font-black text-emerald-950">Book via WhatsApp Desk</p>
                  <p className="text-[10px] text-emerald-700 font-medium">Send artwork & reserve spot with ad coordinator</p>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Option 2: Paystack Checkout */}
              <a
                href="https://paystack.com/pay/buttns-portals-ad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl border border-zinc-200 bg-zinc-950 text-white hover:bg-zinc-900 transition-colors group"
              >
                <div>
                  <p className="text-xs font-black text-white">Instant Payment Checkout</p>
                  <p className="text-[10px] text-gray-300 font-medium">Pay securely online & upload artwork immediately</p>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <button
              onClick={() => setShowBookingModal(false)}
              className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}