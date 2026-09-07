"use client";

import React from 'react';
import { Shield, PhoneCall, AlertTriangle, UserCheck, ShieldAlert, ArrowUpRight } from 'lucide-react';

const SECURITY_SERVICES = [
  {
    id: "estate-guard",
    title: "Estate Access Guard",
    role: "Patrol & Gate Control",
    startingPrice: "₦5,000 / shift",
    badge: "24/7 Gate Duty",
    imageUrl: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80",
    theme: "border-emerald-500/40 hover:border-emerald-500",
  },
  {
    id: "executive-escort",
    title: "Executive Escort",
    role: "Armed Convoy & Escort",
    startingPrice: "₦45,000 / day",
    badge: "VIP Clearance",
    imageUrl: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80",
    theme: "border-amber-500/40 hover:border-amber-500",
  },
  {
    id: "personal-bodyguard",
    title: "Personal Bodyguard",
    role: "Close Protection Detail",
    startingPrice: "₦30,000 / day",
    badge: "Tactical Response",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    theme: "border-purple-500/40 hover:border-purple-500",
  },
];

export default function SecuritySection() {
  // Igando Police Emergency Contact
  const IGANDO_POLICE_PHONE = "tel:08033011162"; // Replace with exact Igando Divisional HQ line if needed

  return (
    <section className="space-y-3.5">
      {/* 1. Igando Police One-Tap Emergency Panic Button */}
      <a
        href={IGANDO_POLICE_PHONE}
        className="group relative flex items-center justify-between bg-red-600 hover:bg-red-500 text-white p-3.5 rounded-2xl shadow-lg shadow-red-600/30 transition-all active:scale-95 border border-red-400/30 overflow-hidden"
      >
        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-black/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center shrink-0 border border-white/20">
            <AlertTriangle className="w-5 h-5 text-yellow-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-black uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded-full text-red-200">
                Emergency Alert
              </span>
            </div>
            <h3 className="text-xs font-black text-white leading-tight mt-0.5">
              Igando Police Emergency Line
            </h3>
            <p className="text-[10px] text-red-100 font-medium">
              Direct dispatch call for immediate response
            </p>
          </div>
        </div>

        <div className="w-9 h-9 rounded-full bg-white text-red-600 flex items-center justify-center font-black shrink-0 shadow-md group-hover:scale-105 transition-transform relative z-10">
          <PhoneCall className="w-4 h-4 fill-red-600" />
        </div>
      </a>

      {/* 2. Security Firm Header */}
      <div className="flex items-center justify-between px-1 pt-1">
        <div className="flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-black text-gray-900 tracking-tight uppercase">
            Security Detail
          </h2>
        </div>
        <span className="text-[10px] font-extrabold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-md">
          Partner: <span className="text-black">Back-Up Security</span>
        </span>
      </div>

      {/* 3. Swipeable Security Roster */}
      <div 
        className="flex overflow-x-auto snap-x snap-mandatory space-x-3 pb-1 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {SECURITY_SERVICES.map((item) => (
          <div
            key={item.id}
            className={`snap-center shrink-0 w-[210px] bg-zinc-950 border ${item.theme} rounded-2xl overflow-hidden shadow-md p-2.5 flex flex-col justify-between`}
          >
            {/* Guard Image */}
            <div className="relative h-28 w-full rounded-xl overflow-hidden bg-zinc-900">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              
              <span className="absolute top-2 left-2 bg-black/80 backdrop-blur-md text-amber-400 text-[8px] font-black uppercase px-2 py-0.5 rounded border border-amber-500/30">
                {item.badge}
              </span>
            </div>

            {/* Guard Info */}
            <div className="pt-2.5 space-y-2">
              <div>
                <h3 className="text-xs font-black text-white leading-tight">
                  {item.title}
                </h3>
                <p className="text-[10px] text-gray-400 font-medium">
                  {item.role}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
                <span className="text-xs font-black text-amber-500">
                  {item.startingPrice}
                </span>

                <a
                  href={`/security/book?type=${item.id}`}
                  className="flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-black px-2.5 py-1 rounded-lg text-[10px] font-black transition-all active:scale-95"
                >
                  <span>Request</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}