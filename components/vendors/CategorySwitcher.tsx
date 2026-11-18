'use client';

import React from 'react';
import Link from 'next/link';
import {
  Utensils,
  Shirt,
  Scissors,
  CupSoda,
  ShoppingBag,
  Wheat,
  Flame,
  Wrench,
} from 'lucide-react';

export interface ButtnsCategory {
  slug: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

export const BUTTNS_CATEGORIES: ButtnsCategory[] = [
  { slug: 'food', label: 'Food', href: '/food', icon: <Utensils className="w-3.5 h-3.5" /> },
  { slug: 'laundry', label: 'Laundry', href: '/laundry', icon: <Shirt className="w-3.5 h-3.5" /> },
  { slug: 'hair', label: 'Salon', href: '/hair', icon: <Scissors className="w-3.5 h-3.5" /> },
  { slug: 'drinks', label: 'Drinks', href: '/drinks', icon: <CupSoda className="w-3.5 h-3.5" /> },
  { slug: 'gas', label: 'Gas Refill', href: '/gas', icon: <Flame className="w-3.5 h-3.5" /> },
  { slug: 'foodstuff', label: 'Foodstuff', href: '/foodstuff', icon: <Wheat className="w-3.5 h-3.5" /> },
  { slug: 'wears', label: 'Wears', href: '/wears', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
  { slug: 'handyman', label: 'Handyman', href: '/handyman', icon: <Wrench className="w-3.5 h-3.5" /> },
];

interface CategorySwitcherProps {
  activeSlug: string;
}

export const CategorySwitcher: React.FC<CategorySwitcherProps> = ({ activeSlug }) => {
  return (
    <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-2.5">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {BUTTNS_CATEGORIES.map((cat) => {
          const isActive = cat.slug === activeSlug;
          return (
            <Link
              key={cat.slug}
              href={cat.href}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all shrink-0 ${
                isActive
                  ? 'bg-[#2962CC] text-white shadow-sm shadow-blue-500/25'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};