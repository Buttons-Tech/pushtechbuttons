'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  CloudSun,
  TrendingUp,
  Newspaper,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface CommunityUpdate {
  id: string;
  category: string;
  text: string;
  icon: React.ReactNode;
}

export interface DashboardHeroCardProps {
  isAuthenticated: boolean;
  locationName?: string;
  savedAmount?: string;
  activeVouchers?: number;
  totalVouchers?: number;
  onCtaClick?: () => void;
}

export const DashboardHeroCard: React.FC<{
  onCtaClick?: () => void;
}> = ({ onCtaClick }) => {
  const [updateIdx, setUpdateIdx] = useState(0);

  const updates: CommunityUpdate[] = [
    {
      id: 'market',
      category: 'Market',
      text: '50kg Rice: ₦78k • Paint Garri: ₦3,200',
      icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />,
    },
    {
      id: 'weather',
      category: 'Weather',
      text: 'Igando: 29°C Partly Cloudy • Light Breeze',
      icon: <CloudSun className="w-3.5 h-3.5 text-amber-500 shrink-0" />,
    },
    {
      id: 'news',
      category: 'Estate',
      text: 'Weekend Food Fest holds Sat @ Gate 2',
      icon: <Newspaper className="w-3.5 h-3.5 text-blue-600 shrink-0" />,
    },
  ];

  // Auto-cycle community updates every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setUpdateIdx((prev) => (prev + 1) % updates.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [updates.length]);

  const currentUpdate = updates[updateIdx];

  return (
    <section className="px-5">
      <div className="relative">
        {/* Main Dark Navy Card with bottom-right cutout feel */}
        <div className="bg-gradient-to-br from-[#0F233C] via-[#132C4B] to-[#1A3B63] rounded-3xl p-5 text-white shadow-xl border border-white/10">
          <div className="flex items-center gap-4">
            {/* Circular Metric Ring */}
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  fill="none"
                  stroke="#1E3A5F"
                  strokeWidth="8"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="8"
                  strokeDasharray="201"
                  strokeDashoffset="44"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-base font-extrabold">78%</span>
                <span className="text-[9px] text-slate-300 uppercase">Saved</span>
              </div>
            </div>

            {/* Title, Description & Metric */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-sky-200/90">
                Monthly Estate Perk
              </p>
              <h2 className="text-lg font-extrabold leading-snug mt-0.5">
                <span className="text-emerald-400">₦12,400</span> Saved Locally
              </h2>
              <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                4 of 5 free delivery vouchers active
              </p>
            </div>
          </div>

          {/* Bottom Row inside Dark Card: Progress Bar + Primary CTA */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3 pb-6">
            <div className="flex-1">
              <div className="flex justify-between text-[10px] text-slate-300 mb-1">
                <span>VIP Neighbor Tier</span>
                <span>4/5 Orders</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-emerald-400 rounded-full" />
              </div>
            </div>

            <button
              onClick={onCtaClick}
              className="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>Order Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom-Right Cutout Pill: Community Update Ticker */}
        <div
          onClick={() => setUpdateIdx((prev) => (prev + 1) % updates.length)}
          title="Tap to cycle community updates"
          className="cursor-pointer ml-auto -mt-6 relative z-10 w-[86%] sm:w-[82%] bg-gradient-to-r from-[#2D6CDF] to-[#3B82F6] p-1.5 pl-3.5 rounded-2xl rounded-tr-none ring-4 ring-[#F4F7FC] shadow-lg flex items-center justify-between gap-2 text-white"
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
              {currentUpdate.icon}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-extrabold uppercase tracking-wider bg-white/20 px-1.5 py-0.2 rounded">
                  Community • {currentUpdate.category}
                </span>
              </div>
              <p className="text-xs font-semibold truncate mt-0.5">
                {currentUpdate.text}
              </p>
            </div>
          </div>

          {/* Indicator Dots */}
          <div className="flex flex-col gap-1 pr-1.5 shrink-0">
            {updates.map((u, idx) => (
              <span
                key={u.id}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === updateIdx ? 'bg-white scale-110' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
