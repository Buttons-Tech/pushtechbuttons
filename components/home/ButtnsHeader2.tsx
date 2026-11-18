import { useEffect, useState } from "react";
import {
  Bell,
  Eye,
  EyeOff,
  MapPin,
  ArrowRight,
  Utensils,
  CupSoda,
  Scissors,
  Shirt,
  ShoppingBag,
  Wheat,
  Flame,
  Wrench,
  Home,
  Search,
  Heart,
  User,
  CloudSun,
  TrendingUp,
  Newspaper,
  Sparkles,
  Tag,
} from 'lucide-react';


export const ButtnsHeader: React.FC<{
  userName?: string;
  location?: string;
  balance?: string;
  unreadNotifications?: number;
}> = ({
  userName = 'Chigozie',
  location = 'Igando, Lagos',
  balance = '₦45,250.00',
  unreadNotifications = 3,
}) => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <header className="flex items-center justify-between pt-5 pb-4 px-5 text-white">
      {/* Left: User Logo, Name & Location */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-11 h-11 rounded-full bg-slate-900/80 border-2 border-white/25 flex items-center justify-center shrink-0 shadow-md overflow-hidden">
          <span className="font-extrabold text-base tracking-tighter text-sky-400">
            B<span className="text-white">.</span>
          </span>
        </div>
        <div className="min-w-0">
          <h1 className="text-lg font-bold leading-tight truncate">
            Hello {userName},
          </h1>
          <div className="flex items-center gap-1 text-xs text-blue-100/90 mt-0.5 truncate">
            <MapPin className="w-3 h-3 shrink-0 text-sky-300" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>

      {/* Right: Wallet Pill & Notifications */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Wallet Balance Toggle Pill (Replaces ON/OFF toggle) */}
        <button
          onClick={() => setShowBalance(!showBalance)}
          aria-label="Toggle wallet balance visibility"
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
          aria-label="Notifications"
          className="relative w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-sm"
        >
          <Bell className="w-5 h-5 text-white fill-white/80" />
          {unreadNotifications > 0 && (
            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#2962CC]" />
          )}
        </button>
      </div>
    </header>
  );
};