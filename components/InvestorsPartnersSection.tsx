"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Briefcase, 
  Smartphone, 
  Building2, 
  Truck, 
  Layout, 
  Code2, 
  Megaphone, 
  ArrowRight, 
  Download, 
  DollarSign 
} from 'lucide-react';

// Replace with your exact Cloudinary ecosystem asset link
const ECOSYSTEM_HERO_IMAGE = "/images/invest.jpeg";

const BUTTNS_PILLARS = [
  {
    id: "app",
    name: "1. Buttns App",
    desc: "Super App core platform & infrastructure",
    icon: Smartphone,
    color: "text-purple-600 bg-purple-50 border-purple-100",
  },
  {
    id: "cave",
    name: "2. The Cave",
    desc: "Tech co-working hub & HQ in Ija",
    icon: Building2,
    color: "text-amber-600 bg-amber-50 border-amber-100",
  },
  {
    id: "ziig",
    name: "3. Ziig",
    desc: "Last-mile estate delivery network",
    icon: Truck,
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
  {
    id: "portals",
    name: "4. Portals",
    desc: "High-contrast billboards & signage",
    icon: Layout,
    color: "text-blue-600 bg-blue-50 border-blue-100",
  },
  {
    id: "click",
    name: "5. The Click Team",
    desc: "NYSC & local tech talent taskforce",
    icon: Code2,
    color: "text-pink-600 bg-pink-50 border-pink-100",
  },
  {
    id: "ads",
    name: "6. Buttns Ads",
    desc: "Closed-loop estate ad network",
    icon: Megaphone,
    color: "text-orange-600 bg-orange-50 border-orange-100",
  },
];

export default function InvestorsPartnersSection() {
  const [showFundModal, setShowFundModal] = useState(false);

  return (
    <section className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm font-black text-gray-900 tracking-tight uppercase">
            Investors & Partners
          </h2>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
          Buttns Ecosystem
        </span>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-gray-200 p-3.5 shadow-sm space-y-3.5">
        
        {/* 1. Unobstructed Hero Visual */}
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
          <img
            src={ECOSYSTEM_HERO_IMAGE}
            alt="Buttns Enterprise Ecosystem"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
            <Briefcase className="w-3 h-3 text-amber-400" />
            <span className="text-[9px] font-black uppercase text-white tracking-wider">
              Fueling Buttns Growth
            </span>
          </div>
        </div>

        {/* 2. Value Proposition & 6 Pillars Overview */}
        <div className="space-y-2.5">
          <div>
            <h3 className="text-xs font-black text-gray-900 leading-tight">
              Back the 6 Pillars Powering Buttns
            </h3>
            <p className="text-[11px] font-medium text-gray-600 leading-relaxed mt-0.5">
              Your investments and contributions directly fund the expansion of the Buttns brand, technology, physical hubs, and logistics network.
            </p>
          </div>

          {/* 6 Pillars Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {BUTTNS_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={pillar.id}
                  className={`p-2 rounded-xl border ${pillar.color} space-y-0.5`}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[10px] font-black uppercase tracking-tight truncate">
                      {pillar.name}
                    </span>
                  </div>
                  <p className="text-[9px] text-gray-600 font-semibold line-clamp-1">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {/* Deck Download */}
          <a
            href="/docs/buttns-ecosystem-deck.pdf"
            download
            className="flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2.5 rounded-xl text-xs font-black transition-all border border-gray-300 active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-gray-700" />
            <span>Brand Deck</span>
          </a>

          {/* Direct Support / Invest CTA */}
          <button
            onClick={() => setShowFundModal(true)}
            className="flex items-center justify-center gap-1.5 bg-purple-700 hover:bg-purple-800 text-white py-2.5 rounded-xl text-xs font-black transition-all shadow-md shadow-purple-600/20 active:scale-95"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Back Buttns</span>
          </button>
        </div>

      </div>

      {/* Fund / Partner Modal */}
      {showFundModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-black text-sm">
                  ₦
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900">Fund Buttns Growth</h3>
                  <p className="text-[10px] text-gray-500 font-bold">Select an investment or sponsorship route</p>
                </div>
              </div>
              <button 
                onClick={() => setShowFundModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5">
              {/* Option 1: Back the 6 Pillars (Grants / Contributions) */}
              <a
                href="https://paystack.com/pay/buttns-ecosystem-fund"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl border border-purple-200 bg-purple-50/50 hover:bg-purple-50 transition-colors group"
              >
                <div>
                  <p className="text-xs font-black text-purple-950">Ecosystem Development Support</p>
                  <p className="text-[10px] text-purple-700 font-medium">Fund The Cave hub, Ziig logistics & Portals signage</p>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Option 2: Portals & Ads Sponsorship */}
              <a
                href="https://wa.me/2348012345678?text=Hello,%20I%20want%20to%20sponsor%20Portals%20signage%20and%20Ads%20on%20Buttns."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl border border-amber-200 bg-amber-50/50 hover:bg-amber-50 transition-colors group"
              >
                <div>
                  <p className="text-xs font-black text-amber-950">Portals & Ads Sponsorship</p>
                  <p className="text-[10px] text-amber-700 font-medium">Sponsor physical billboards & digital ad networks</p>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Option 3: Pre-Seed Equity & Strategic Partnerships */}
              <a
                href="mailto:founder@buttns.app?subject=Equity%20%26%20Partnership%20Inquiry%20-%20Buttns"
                className="flex items-center justify-between p-3 rounded-2xl border border-zinc-200 bg-zinc-950 text-white hover:bg-zinc-900 transition-colors group"
              >
                <div>
                  <p className="text-xs font-black text-white">Equity & Angel Investor Desk</p>
                  <p className="text-[10px] text-gray-300 font-medium">Pre-seed equity, convertible notes & founder call</p>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <button
              onClick={() => setShowFundModal(false)}
              className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}