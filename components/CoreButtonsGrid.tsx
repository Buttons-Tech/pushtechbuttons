"use client";

import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

// Replace these Cloudinary URLs with your exact uploaded asset links
const CORE_BUTTONS = [
  {
    id: "food",
    title: "EAT",
    startingPrice: "< ₦1,200",
    imageUrl: "/food/eat.jpg", 
    href: "/food",
    theme: {
      border: "border-emerald-500/50 hover:border-emerald-500",
      bg: "bg-emerald-950/20",
      badge: "bg-orange-400 text-black",
      glow: "group-hover:shadow-emerald-500/20",
    }
  },
  {
    id: "hair",
    title: "HAIR",
    startingPrice: "< ₦1,500",
    imageUrl: "/hair/hair11.jpg",
    href: "/hair",
    theme: {
      border: "border-purple-500/50 hover:border-purple-500",
      bg: "bg-purple-950/20",
      badge: "bg-purple-500 text-white",
      glow: "group-hover:shadow-purple-500/20",
    }
  },
  {
    id: "laundry",
    title: "WASH",
    startingPrice: "< ₦1,200",
    imageUrl: "/wash/shirt.jpg",
    href: "/laundry",
    theme: {
      border: "border-blue-500/50 hover:border-blue-500",
      bg: "bg-blue-950/20",
      badge: "bg-blue-500 text-white",
      glow: "group-hover:shadow-blue-500/20",
    }
  },
  {
    id: "utilities",
    title: "MORE",
    startingPrice: "< ₦3,000",
    imageUrl: "https://res.cloudinary.com/dps2cgpx8/image/upload/v1788551396/6154d875b7dc5ff6c70074396c07d77d_a6freq.jpg",
    href: "/gas",
    theme: {
      border: "border-red-500/50 hover:border-red-500",
      bg: "bg-red-950/20",
      badge: "bg-red-500 text-white",
      glow: "group-hover:shadow-red-500/20",
    }
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
            Your Buttns
          </h2>
        </div>
        <span className="text-[10px] text-gray-500 font-bold">Tap to access</span>
      </div>

      {/* 2x2 Distinct, Image-First Cards */}
      <div className="grid grid-cols-2 gap-3.5">
        {CORE_BUTTONS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`group flex flex-col justify-between overflow-hidden rounded-3xl bg-zinc-950 border-2 ${item.theme.border} p-2.5 shadow-lg transition-all duration-300 active:scale-95 ${item.theme.glow}`}
          >
            {/* 1. Unobstructed Image Showcase */}
            <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Quick Action Icon Tagged on Image Corner */}
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/20">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* 2. Compact Info Strip Below Image */}
            <div className="pt-2.5 px-1 flex items-center justify-between gap-1">
              <div className="overflow-hidden">
                <h3 className="text-xs font-black text-white truncate group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Price Badge */}
              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full shrink-0 ${item.theme.badge}`}>
                {item.startingPrice}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}