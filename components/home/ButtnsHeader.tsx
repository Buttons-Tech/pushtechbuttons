'use client';

import React, { useState } from 'react';
import { Bell, Eye, EyeOff, MapPin, ChevronDown, LogIn } from 'lucide-react';

export interface ButtnsHeaderProps {
  isAuthenticated: boolean;
  userName?: string;
  location?: string;
  balance?: string;
  unreadNotifications?: number;
  onOpenAuth?: () => void;
  onOpenLocationPicker?: () => void;
  onOpenNotifications?: () => void;
}

export const ButtnsHeader: React.FC<ButtnsHeaderProps> = ({
  isAuthenticated,
  userName = 'Chigozie',
  location = 'Igando, Lagos',
  balance = '₦45,250.00',
  unreadNotifications = 3,
  onOpenAuth,
  onOpenLocationPicker,
  onOpenNotifications,
}) => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <header className="flex items-center justify-between pt-5 pb-4 px-5 text-white ">
      {/* Left: Brand/User Avatar + Greeting/Location */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-11 h-11 rounded-full bg-slate-900/85 border-2 border-white/25 flex items-center justify-center shrink-0 shadow-md overflow-hidden">
          <span className="font-extrabold text-base tracking-tighter text-sky-400">
            B<span className="text-white">.</span>
          </span>
        </div>

        <div className="min-w-0">
          {isAuthenticated ? (
            <>
              <h1 className="text-lg font-bold leading-tight truncate">
                Hello {userName},
              </h1>
              <button
                onClick={onOpenLocationPicker}
                className="flex items-center gap-1 text-xs text-blue-100/90 hover:text-white mt-0.5 truncate transition-colors"
              >
                <MapPin className="w-3 h-3 shrink-0 text-sky-300" />
                <span className="truncate">{location}</span>
                <ChevronDown className="w-3 h-3 shrink-0 opacity-75" />
              </button>
            </>
          ) : (
            <>
              <span className="block text-[11px] font-medium text-blue-100/85 leading-none">
                Welcome to Buttns
              </span>
              <button
                onClick={onOpenLocationPicker}
                className="flex items-center gap-1 text-sm font-bold text-white mt-1 truncate hover:text-sky-200 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 shrink-0 text-sky-300" />
                <span className="truncate">{location}</span>
                <ChevronDown className="w-3.5 h-3.5 shrink-0 opacity-80" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Right: Auth State Action */}
      {isAuthenticated ? (
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Paatee Wallet Balance Toggle Pill */}
          <button
            onClick={() => setShowBalance(!showBalance)}
            aria-label="Toggle Paatee wallet balance"
            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 rounded-full pl-3 pr-1.5 py-1 transition-all shadow-sm"
          >
            <div className="text-left">
              <span className="block text-[9px] uppercase tracking-wider text-blue-100 leading-none">
                Paatee
              </span>
              <span className="text-xs font-bold tracking-tight">
                {showBalance ? balance : '₦ ••••••'}
              </span>
            </div>
            <div className="w-6 h-6 rounded-full bg-white text-[#2962CC] flex items-center justify-center shadow-sm">
              {showBalance ? (
                <EyeOff className="w-3.5 h-3.5" />
              ) : (
                <Eye className="w-3.5 h-3.5" />
              )}
            </div>
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-sm"
          >
            <Bell className="w-5 h-5 text-white fill-white/80" />
            {unreadNotifications > 0 && (
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#2962CC]" />
            )}
          </button>
        </div>
      ) : (
        /* Guest Mode: Sign In / Join Pill */
        <button
          onClick={onOpenAuth}
          className="shrink-0 flex items-center gap-1.5 bg-white text-[#1E4EB8] hover:bg-blue-50 font-extrabold text-xs px-4 py-2.5 rounded-full shadow-md transition-all active:scale-95"
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Sign In / Join</span>
        </button>
      )}
    </header>
  );
};