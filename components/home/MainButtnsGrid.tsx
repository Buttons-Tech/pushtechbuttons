'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Utensils,
  CupSoda,
  Scissors,
  Shirt,
  ShoppingBag,
  Wheat,
  Flame,
  Wrench,
} from 'lucide-react';

export interface ButtnsCategoryItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  defaultVendorRoute: string; // Direct path to your existing vendor page
  badge?: string;
  count?: number;
}

export const BUTTNS_CATEGORIES: ButtnsCategoryItem[] = [
  {
    id: 'food',
    label: 'Food',
    icon: <Utensils className="w-6 h-6" />,
    defaultVendorRoute: '/vendors/food/global-taste',
  },
  {
    id: 'drinks',
    label: 'Drinks',
    icon: <CupSoda className="w-6 h-6" />,
    defaultVendorRoute: '/vendors/drinks/rhema-vitality',
    badge: 'NEW',
  },
  {
    id: 'salon',
    label: 'Salon',
    icon: <Scissors className="w-6 h-6" />,
    defaultVendorRoute: '/vendors/salon/anchor-salon',
  },
  {
    id: 'laundry',
    label: 'Laundry',
    icon: <Shirt className="w-6 h-6" />,
    defaultVendorRoute: '/vendors/laundry/no-delay',
    count: 2,
  },
  {
    id: 'wears',
    label: 'Wears',
    icon: <ShoppingBag className="w-6 h-6" />,
    defaultVendorRoute: '/vendors/wears/anchor-wears',
  },
  {
    id: 'foodstuff',
    label: 'Foodstuff',
    icon: <Wheat className="w-6 h-6" />,
    defaultVendorRoute: '/vendors/foodstuff/anchor-mart',
  },
  {
    id: 'refill',
    label: 'Refill',
    icon: <Flame className="w-6 h-6" />,
    defaultVendorRoute: '/vendors/refill/total-gas',
    badge: 'GAS',
  },
  {
    id: 'handyman',
    label: 'Handyman',
    icon: <Wrench className="w-6 h-6" />,
    defaultVendorRoute: '/vendors/handyman/anchor-fix',
  },
];

export const MainButtnsGrid: React.FC<{
  activeCategoryId?: string;
  onBeforeNavigate?: (item: ButtnsCategoryItem) => boolean | void;
}> = ({ activeCategoryId, onBeforeNavigate }) => {
  const router = useRouter();

  const handlePress = (item: ButtnsCategoryItem) => {
    if (onBeforeNavigate) {
      const shouldContinue = onBeforeNavigate(item);
      if (shouldContinue === false) return;
    }
    router.push(item.defaultVendorRoute);
  };

  return (
    <section className="px-5 mt-5">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
          Main Buttns
        </h3>
        <span className="text-xs font-medium text-slate-400">
          Tap to open vendor
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {BUTTNS_CATEGORIES.map((item) => {
          const isSelected = activeCategoryId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handlePress(item)}
              className={`relative flex flex-col items-center justify-center py-3.5 px-1.5 rounded-2xl transition-all duration-200 active:scale-95 ${
                isSelected
                  ? 'bg-gradient-to-b from-[#1A355B] to-[#0F223D] text-white shadow-lg shadow-blue-950/20 -translate-y-0.5'
                  : 'bg-[#DCE8FC]/85 hover:bg-[#D0E0FB] text-[#1D4ED8]'
              }`}
            >
              {item.badge && (
                <span className="absolute -top-1.5 right-1.5 bg-emerald-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-sm">
                  {item.badge}
                </span>
              )}

              {item.count !== undefined && (
                <span className="absolute -top-1.5 right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {item.count}
                </span>
              )}

              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 ${
                  isSelected
                    ? 'bg-white/15 text-sky-300'
                    : 'bg-white/80 text-[#2563EB] shadow-xs'
                }`}
              >
                {item.icon}
              </div>

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

      <div className="flex items-center justify-center gap-1.5 mt-4">
        <span className="w-5 h-1.5 rounded-full bg-[#2962CC]" />
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
      </div>
    </section>
  );
};