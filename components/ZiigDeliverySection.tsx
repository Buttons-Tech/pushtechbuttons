"use client";

import React, { useState } from 'react';
import { 
  Truck, 
  Package, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

// Replace with your exact Cloudinary Ziig rider photo
const ZIIG_HERO_IMAGE = "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?auto=format&fit=crop&w=1000&q=80";

export default function ZiigDeliverySection() {
  const [showDispatchModal, setShowDispatchModal] = useState(false);

  return (
    <section className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <Truck className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm font-black text-gray-900 tracking-tight uppercase">
            Ziig Logistics
          </h2>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Active in Estate
        </span>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-gray-200 p-3.5 shadow-sm space-y-3.5">
        
        {/* 1. Unobstructed Hero Image */}
        <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
          <img
            src={ZIIG_HERO_IMAGE}
            alt="Ziig Estate Delivery Network"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
            <Package className="w-3 h-3 text-amber-400" />
            <span className="text-[9px] font-black uppercase text-white tracking-wider">
              Ziig Runner Network
            </span>
          </div>

          <div className="absolute bottom-2.5 right-2.5 bg-emerald-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-500/40 text-emerald-400 text-[10px] font-black">
            From ₦500 / Pickup
          </div>
        </div>

        {/* 2. Ziig Value Pillars */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-gray-900 leading-tight">
              Instant Estate & Gate-to-Door Delivery
            </h3>
          </div>
          <p className="text-[11px] font-medium text-gray-600 leading-relaxed">
            Need packages picked up at the gate, groceries brought from local vendors, or inter-estate dispatches? Ziig runners are verified and stationed inside the estate.
          </p>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100 text-center space-y-0.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600 mx-auto" />
              <p className="text-[9px] font-black text-emerald-950 uppercase">Under 15 Mins</p>
              <p className="text-[8px] text-emerald-700 font-medium">Estate Pickup</p>
            </div>

            <div className="p-2 rounded-xl bg-purple-50 border border-purple-100 text-center space-y-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600 mx-auto" />
              <p className="text-[9px] font-black text-purple-950 uppercase">Gate Pass</p>
              <p className="text-[8px] text-purple-700 font-medium">Pre-Cleared</p>
            </div>

            <div className="p-2 rounded-xl bg-amber-50 border border-amber-100 text-center space-y-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600 mx-auto" />
              <p className="text-[9px] font-black text-amber-950 uppercase">Doorstep</p>
              <p className="text-[8px] text-amber-700 font-medium">Live Tracking</p>
            </div>
          </div>
        </div>

        {/* 3. Call to Action */}
        <button
          onClick={() => setShowDispatchModal(true)}
          className="flex items-center justify-between w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white p-3 rounded-2xl transition-all shadow-md shadow-emerald-600/20"
        >
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-100" />
            <span className="text-xs font-black uppercase tracking-wider">
              Request Ziig Delivery
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-xs font-bold bg-white/20 px-2.5 py-1 rounded-xl">
            <span>Dispatch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>

      </div>

      {/* Quick Dispatch Modal */}
      {showDispatchModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-sm">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900">Ziig Dispatch Desk</h3>
                  <p className="text-[10px] text-gray-500 font-bold">Get a runner assigned immediately</p>
                </div>
              </div>
              <button 
                onClick={() => setShowDispatchModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5">
              {/* Option 1: WhatsApp Instant Booking */}
              <a
                href="https://wa.me/2348012345678?text=Hello%20Ziig%20Logistics,%20I%20need%20a%20runner%20for%20a%20pickup%20in%20the%20estate."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 transition-colors group"
              >
                <div>
                  <p className="text-xs font-black text-emerald-950">Book via WhatsApp</p>
                  <p className="text-[10px] text-emerald-700 font-medium">Send location & item details directly to Ziig Dispatch</p>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Option 2: Direct Call */}
              <a
                href="tel:+2348012345678"
                className="flex items-center justify-between p-3.5 rounded-2xl border border-zinc-200 bg-zinc-950 text-white hover:bg-zinc-900 transition-colors group"
              >
                <div>
                  <p className="text-xs font-black text-white">Call Ziig Dispatch Hotline</p>
                  <p className="text-[10px] text-gray-300 font-medium">Speak directly to an active estate coordinator</p>
                </div>
                <PhoneCall className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <button
              onClick={() => setShowDispatchModal(false)}
              className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}