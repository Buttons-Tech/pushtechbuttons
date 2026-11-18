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

export const DashboardHeroCard: React.FC<DashboardHeroCardProps> = ({
  isAuthenticated,
  locationName = 'Igando',
  savedAmount = '₦12,400',
  activeVouchers = 4,
  totalVouchers = 5,
  onCtaClick,
}) => {
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
      text: `${locationName}: 29°C Partly Cloudy • Light Breeze`,
      icon: <CloudSun className="w-3.5 h-3.5 text-amber-500 shrink-0" />,
    },
    {
      id: 'news',
      category: 'Estate',
      text: 'Weekend Food Fest holds Sat @ Gate 2',
      icon: <Newspaper className="w-3.5 h-3.5 text-blue-600 shrink-0" />,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setUpdateIdx((prev) => (prev + 1) % updates.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [updates.length]);

  const currentUpdate = updates[updateIdx];
  const progressPercent = Math.min(
    100,
    Math.round((activeVouchers / totalVouchers) * 100)
  );

  return (
    <section className="px-5">
      <div className="relative">
        {/* Main Dark Navy Card */}
        <div className="bg-gradient-to-br from-[#0F233C] via-[#132C4B] to-[#1A3B63] rounded-3xl p-5 text-white shadow-xl border border-white/10">
          {isAuthenticated ? (
            /* --- AUTHENTICATED USER VIEW --- */
            <>
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
                      strokeDashoffset={201 - (201 * progressPercent) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-base font-extrabold">
                      {progressPercent}%
                    </span>
                    <span className="text-[9px] text-slate-300 uppercase">
                      Perks
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-sky-200/90">
                    Monthly Estate Perk
                  </p>
                  <h2 className="text-lg font-extrabold leading-snug mt-0.5">
                    <span className="text-emerald-400">{savedAmount}</span> Saved
                    Locally
                  </h2>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                    {activeVouchers} of {totalVouchers} free gate deliveries active
                  </p>
                </div>
              </div>

              {/* Bottom Progress + CTA */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3 pb-6">
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] text-slate-300 mb-1">
                    <span>VIP Neighbor Tier</span>
                    <span>
                      {activeVouchers}/{totalVouchers} Orders
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${progressPercent}%` }}
                      className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                    />
                  </div>
                </div>

                <button
                  onClick={onCtaClick}
                  className="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                >
                  <span>Share a Bill</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            /* --- GUEST / FIRST-TIME VISITOR VIEW --- */
            <>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex flex-col items-center justify-center shrink-0 text-sky-300">
                  <ShieldCheck className="w-8 h-8 text-emerald-400" />
                  <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5 text-white">
                    Verified
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    <span>{locationName} Estate Network</span>
                  </div>
                  <h2 className="text-lg font-extrabold leading-snug mt-1">
                    Your Estate’s Everyday{' '}
                    <span className="text-sky-400">Super App</span>
                  </h2>
                  <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                    Order or split gas, food & laundry bills with zero gate hassle
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3 pb-6">
                <div className="text-xs text-slate-300">
                  <span className="text-white font-bold">Free 1st Drop</span>{' '}
                  for new estate residents
                </div>

                <button
                  onClick={onCtaClick}
                  className="shrink-0 bg-sky-400 hover:bg-sky-300 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Bottom-Right Cutout Pill: Community Update Ticker (Shared across both modes) */}
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
              <span className="block text-[9px] font-extrabold uppercase tracking-wider bg-white/20 px-1.5 py-0.2 rounded w-fit">
                Community • {currentUpdate.category}
              </span>
              <p className="text-xs font-semibold truncate mt-0.5">
                {currentUpdate.text}
              </p>
            </div>
          </div>

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