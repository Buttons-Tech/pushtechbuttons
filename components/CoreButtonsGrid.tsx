"use client";

import React from 'react';
import { ArrowRight, Sparkles, Utensils, Scissors, Shirt, Wrench } from 'lucide-react';

// Replace these Cloudinary image URLs with your exact uploaded asset links
const CORE_BUTTONS = [
  {
    id: "food",
    title: "Food & Drinks",
    description: "Chef meals, local kitchens & snacks delivered fast.",
    startingPrice: "₦1,200",
    imageUrl: "https://res.cloudinary.com/dps2cgpx8/image/upload/v1788551658/food_fqbow6.jpg", // Replace with your Cloudinary URL
    badge: "Popular",
    href: "/food",
    accentColor: "border-emerald-500/40 hover:border-emerald-500",
    tagBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  {
    id: "hair",
    title: "Hair & Style",
    description: "Verified estate barbers, braiders & makeup artists.",
    startingPrice: "₦2,500",
    imageUrl: "https://res.cloudinary.com/dps2cgpx8/image/upload/v1788551396/c7deb95e2b7073cf17ceaecb0962a2c0_wswd6r.jpg", // Replace with your Cloudinary URL
    badge: "Book Ahead",
    href: "/hair",
    accentColor: "border-amber-500/40 hover:border-amber-500",
    tagBg: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  {
    id: "laundry",
    title: "Wear & Wash",
    description: "Door-to-door wash, dry cleaning & crisp ironing.",
    startingPrice: "₦800 / item",
    imageUrl: "https://res.cloudinary.com/dps2cgpx8/image/upload/v1788551439/fc893686fc041d282103d516abea6846_mzap7p.jpg", // Replace with your Cloudinary URL
    badge: "Pickup Ready",
    href: "/laundry",
    accentColor: "border-orange-500/40 hover:border-orange-500",
    tagBg: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  },
  {
    id: "auto-repair",
    title: "Estate Utilities",
    description: "On-demand electrician, solar repair & auto service.",
    startingPrice: "₦3,000",
    imageUrl: "https://res.cloudinary.com/dps2cgpx8/image/upload/v1788551396/6154d875b7dc5ff6c70074396c07d77d_a6freq.jpg", // Replace with your Cloudinary URL
    badge: "Verified Techs",
    href: "/auto-repair",
    accentColor: "border-blue-500/40 hover:border-blue-500",
    tagBg: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
];

export default function CoreButtonsGrid() {
  return (
    <section className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-black text-gray-900 tracking-tight uppercase">
            Core Services
          </h2>
        </div>
        <span className="text-[10px] text-gray-500 font-bold">4 Main Buttns</span>
      </div>

      {/* 2x2 Clean Service Grid */}
      <div className="grid grid-cols-2 gap-3">
        {CORE_BUTTONS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-black border ${item.accentColor} p-3.5 shadow-md transition-all duration-300 active:scale-95 min-h-[175px]`}
          >
            {/* Cloudinary Background Image Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${item.imageUrl})` }}
            />
            {/* Gradient Overlay for Text Clarity */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span
                className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${item.tagBg}`}
              >
                {item.badge}
              </span>
            </div>

            {/* Content & Starting Price */}
            <div className="relative z-10 space-y-1 mt-6">
              <h3 className="text-sm font-black text-white leading-tight group-hover:text-amber-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-[10px] text-gray-300 leading-snug line-clamp-2">
                {item.description}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-zinc-800/80 mt-2">
                <div>
                  <p className="text-[8px] uppercase font-bold text-gray-400">From</p>
                  <p className="text-xs font-black text-amber-500">{item.startingPrice}</p>
                </div>

                <div className="w-6 h-6 rounded-full bg-amber-500 text-black flex items-center justify-center group-hover:bg-amber-400 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}