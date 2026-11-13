"use client"
import React, { useState, useEffect } from 'react';
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

// --- TYPES ---
interface ButtnsItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  count?: number;
  active?: boolean;
}

interface PromoItem {
  id: string;
  vendor: string;
  offer: string;
  tag: string;
  subtitle: string;
  gradient: string;
  badgeText?: string;
}

interface CommunityUpdate {
  id: string;
  category: string;
  text: string;
  icon: React.ReactNode;
}

// --- 1. HEADER COMPONENT ---
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

// --- 2. MAIN DASHBOARD HERO CARD (WITH BOTTOM-RIGHT CUTOUT) ---
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

// --- 3. MAIN "BUTTNS" 8-ITEM GRID ---
export const MainButtnsGrid: React.FC<{
  selectedId?: string;
  onSelect?: (id: string) => void;
}> = ({ selectedId = 'food', onSelect }) => {
  const buttnsList: ButtnsItem[] = [
    {
      id: 'food',
      label: 'Food',
      icon: <Utensils className="w-6 h-6" />,
      active: true,
    },
    {
      id: 'drinks',
      label: 'Drinks',
      icon: <CupSoda className="w-6 h-6" />,
      badge: 'NEW',
    },
    {
      id: 'salon',
      label: 'Salon',
      icon: <Scissors className="w-6 h-6" />,
    },
    {
      id: 'laundry',
      label: 'Laundry',
      icon: <Shirt className="w-6 h-6" />,
      count: 2,
    },
    {
      id: 'wears',
      label: 'Wears',
      icon: <ShoppingBag className="w-6 h-6" />,
    },
    {
      id: 'foodstuff',
      label: 'Foodstuff',
      icon: <Wheat className="w-6 h-6" />,
    },
    {
      id: 'refill',
      label: 'Refill',
      icon: <Flame className="w-6 h-6" />,
      badge: 'GAS',
    },
    {
      id: 'handyman',
      label: 'Handyman',
      icon: <Wrench className="w-6 h-6" />,
    },
  ];

  return (
    <section className="px-5 mt-5">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
          Main Buttns
        </h3>
        <span className="text-xs font-medium text-slate-400">
          Tap a service
        </span>
      </div>

      {/* 4x2 Grid */}
      <div className="grid grid-cols-4 gap-3">
        {buttnsList.map((item) => {
          const isSelected = selectedId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect?.(item.id)}
              className={`relative flex flex-col items-center justify-center py-3.5 px-1.5 rounded-2xl transition-all duration-200 ${
                isSelected
                  ? 'bg-gradient-to-b from-[#1A355B] to-[#0F223D] text-white shadow-lg shadow-blue-950/20 -translate-y-0.5'
                  : 'bg-[#DCE8FC]/85 hover:bg-[#D0E0FB] text-[#1D4ED8]'
              }`}
            >
              {/* Top-Right Pill Badge (e.g. NEW) */}
              {item.badge && (
                <span className="absolute -top-1.5 right-1.5 bg-emerald-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-sm">
                  {item.badge}
                </span>
              )}

              {/* Top-Right Notification Count Badge */}
              {item.count !== undefined && (
                <span className="absolute -top-1.5 right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {item.count}
                </span>
              )}

              {/* Icon Container */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 ${
                  isSelected
                    ? 'bg-white/15 text-sky-300'
                    : 'bg-white/80 text-[#2563EB] shadow-xs'
                }`}
              >
                {item.icon}
              </div>

              {/* Label */}
              <span
                className={`text-xs font-bold tracking-tight truncate max-w-full ${
                  isSelected ? 'text-white' : 'text-slate-800'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Carousel Page Indicator Dots (Matching Reference) */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        <span className="w-5 h-1.5 rounded-full bg-[#2962CC]" />
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
      </div>
    </section>
  );
};

// --- 4. VENDOR PROMOS HORIZONTAL CAROUSEL ---
export const VendorPromosSection: React.FC = () => {
  const promos: PromoItem[] = [
    {
      id: 'global-taste',
      vendor: 'Global Taste',
      offer: '10% OFF',
      tag: 'Jollof & Grill',
      subtitle: 'On orders above ₦3,500',
      gradient: 'from-[#0E1E36] via-[#162E52] to-[#1E3F70]',
      badgeText: 'HOT DEAL',
    },
    {
      id: 'no-delay',
      vendor: 'No-Delay Laundry',
      offer: 'FREE DELIVERY',
      tag: 'Express Wash',
      subtitle: 'Pickup & drop at your gate',
      gradient: 'from-[#1649A8] via-[#2262D6] to-[#3B82F6]',
      badgeText: 'ESTATE PERK',
    },
    {
      id: 'rhema-drinks',
      vendor: 'Rhema Vitality',
      offer: 'FREE DRINK',
      tag: 'Fresh Tigernut & Zobo',
      subtitle: 'With any 2-pack combo',
      gradient: 'from-[#0F3D3E] via-[#145354] to-[#1D7072]',
      badgeText: 'LIMITED',
    },
    {
      id: 'mas-indomie',
      vendor: 'MAS-Indomie',
      offer: '15% OFF',
      tag: 'Night Cravings',
      subtitle: 'Fast 15-min estate drop',
      gradient: 'from-[#3B1D5E] via-[#532982] to-[#6D37A8]',
    },
  ];

  return (
    <section className="mt-5 pb-28">
      <div className="px-5 flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
            Vendor Promos
          </h3>
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
        </div>
        <button className="text-xs font-bold text-[#2962CC] hover:underline">
          See All
        </button>
      </div>

      {/* Horizontal Snap Scroll Row */}
      <div className="flex gap-3.5 overflow-x-auto px-5 pb-2 no-scrollbar snap-x snap-mandatory">
        {promos.map((promo) => (
          <div
            key={promo.id}
            className={`snap-start shrink-0 w-44 rounded-2xl p-4 text-white bg-gradient-to-br ${promo.gradient} shadow-md relative overflow-hidden flex flex-col justify-between min-h-[124px]`}
          >
            {/* Subtle Decorative Circle */}
            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-200 truncate">
                  {promo.vendor}
                </span>
                <Tag className="w-3 h-3 text-amber-300 shrink-0" />
              </div>

              <div className="text-lg font-black tracking-tight text-amber-300 leading-none">
                {promo.offer}
              </div>
              <p className="text-xs font-semibold text-white/95 mt-1">
                {promo.tag}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-white/15 flex items-center justify-between">
              <span className="text-[10px] text-slate-200 truncate">
                {promo.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- 5. FLOATING BOTTOM NAVIGATION BAR ---
export const BottomNavBar: React.FC<{
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onCenterButtnClick?: () => void;
}> = ({ activeTab = 'home', onTabChange, onCenterButtnClick }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex justify-center pointer-events-none">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-lg border-t border-slate-200/80 rounded-t-3xl shadow-[0_-8px_30px_rgba(15,23,42,0.08)] px-6 py-2.5 flex items-center justify-between relative pointer-events-auto">
        {/* Left Nav Items */}
        <button
          onClick={() => onTabChange?.('home')}
          className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
            activeTab === 'home' ? 'text-slate-900' : 'text-slate-400'
          }`}
        >
          <Home className="w-6 h-6 fill-current" />
          {activeTab === 'home' && (
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          )}
        </button>

        <button
          onClick={() => onTabChange?.('search')}
          className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
            activeTab === 'search' ? 'text-slate-900' : 'text-slate-400'
          }`}
        >
          <Search className="w-6 h-6" />
          {activeTab === 'search' && (
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          )}
        </button>

        {/* Spacer for Floating Center Action Button */}
        <div className="w-14" />

        {/* Center Floating "Buttns" Action Button */}
        <button
          onClick={onCenterButtnClick}
          aria-label="Quick Buttns Action"
          className="absolute left-1/2 -translate-x-1/2 -top-6 w-16 h-16 rounded-full bg-gradient-to-tr from-[#1D4ED8] to-[#3B82F6] text-white flex items-center justify-center shadow-xl shadow-blue-600/35 ring-4 ring-[#F4F7FC] hover:scale-105 active:scale-95 transition-transform"
        >
          <span className="text-2xl font-black tracking-tighter">B</span>
        </button>

        {/* Right Nav Items */}
        <button
          onClick={() => onTabChange?.('favorites')}
          className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
            activeTab === 'favorites' ? 'text-slate-900' : 'text-slate-400'
          }`}
        >
          <Heart className="w-6 h-6" />
          {activeTab === 'favorites' && (
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          )}
        </button>

        <button
          onClick={() => onTabChange?.('profile')}
          className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
            activeTab === 'profile' ? 'text-slate-900' : 'text-slate-400'
          }`}
        >
          <User className="w-6 h-6" />
          {activeTab === 'profile' && (
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          )}
        </button>
      </div>
    </nav>
  );
};

// --- MAIN ASSEMBLED PAGE PREVIEW ---
export default function ButtnsAppHome() {
  const [selectedService, setSelectedService] = useState('food');
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-slate-200 flex justify-center">
      {/* Mobile App Viewport Container */}
      <div className="w-full max-w-md bg-[#F4F7FC] min-h-screen relative shadow-2xl overflow-x-hidden">
        {/* Curved Blue Top Backdrop matching reference */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#2356B8] via-[#2F6CE0] to-[#4A89F3] rounded-b-[2.5rem] pointer-events-none" />

        {/* Foreground Content */}
        <div className="relative z-10">
          <ButtnsHeader
            userName="Chigozie"
            location="Igando, Lagos"
            balance="₦45,250.00"
            unreadNotifications={3}
          />

          <DashboardHeroCard
            onCtaClick={() => alert('Opening quick order flow!')}
          />

          <MainButtnsGrid
            selectedId={selectedService}
            onSelect={(id) => setSelectedService(id)}
          />

          <VendorPromosSection />
        </div>

        <BottomNavBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCenterButtnClick={() => alert('Quick Buttns Menu triggered!')}
        />
      </div>
    </div>
  );
}