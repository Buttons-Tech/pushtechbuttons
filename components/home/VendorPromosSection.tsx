'use client';

import React from 'react';
import { Sparkles, Tag } from 'lucide-react';

export interface PromoItem {
  id: string;
  vendor: string;
  offer: string;
  tag: string;
  subtitle: string;
  gradient: string;
}

const DEFAULT_PROMOS: PromoItem[] = [
  {
    id: 'global-taste',
    vendor: 'Global Taste',
    offer: '10% OFF',
    tag: 'Jollof & Grill',
    subtitle: 'On orders above ₦3,500',
    gradient: 'from-[#0E1E36] via-[#162E52] to-[#1E3F70]',
  },
  {
    id: 'no-delay',
    vendor: 'No-Delay Laundry',
    offer: 'FREE DELIVERY',
    tag: 'Express Wash',
    subtitle: 'Pickup & drop at your gate',
    gradient: 'from-[#1649A8] via-[#2262D6] to-[#3B82F6]',
  },
  {
    id: 'rhema-drinks',
    vendor: 'Rhema Vitality',
    offer: 'FREE DRINK',
    tag: 'Fresh Tigernut & Zobo',
    subtitle: 'With any 2-pack combo',
    gradient: 'from-[#0F3D3E] via-[#145354] to-[#1D7072]',
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

export const VendorPromosSection: React.FC<{
  promos?: PromoItem[];
  onPromoClick?: (promo: PromoItem) => void;
  onSeeAllClick?: () => void;
}> = ({ promos = DEFAULT_PROMOS, onPromoClick, onSeeAllClick }) => {
  return (
    <section className="mt-5 pb-28">
      <div className="px-5 flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
            Vendor Promos
          </h3>
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
        </div>
        <button
          onClick={onSeeAllClick}
          className="text-xs font-bold text-[#2962CC] hover:underline"
        >
          See All
        </button>
      </div>

      <div className="flex gap-3.5 overflow-x-auto px-5 pb-2 no-scrollbar snap-x snap-mandatory">
        {promos.map((promo) => (
          <button
            key={promo.id}
            onClick={() => onPromoClick?.(promo)}
            className={`text-left snap-start shrink-0 w-44 rounded-2xl p-4 text-white bg-gradient-to-br ${promo.gradient} shadow-md relative overflow-hidden flex flex-col justify-between min-h-[124px] transition-transform active:scale-95`}
          >
            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />

            <div className="w-full">
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

            <div className="w-full mt-3 pt-2 border-t border-white/15">
              <span className="block text-[10px] text-slate-200 truncate">
                {promo.subtitle}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};