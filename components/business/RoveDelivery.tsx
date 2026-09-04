"use client";

import React, { useState } from "react";
import { 
  Zap, 
  ShieldCheck, 
  Bike, 
  Clock, 
  MapPin, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2,
  Info
} from "lucide-react";

interface PolicyDetail {
  title: string;
  items: string[];
}

const ROVE_POLICIES: Record<string, PolicyDetail> = {
  guarantee: {
    title: "15-Min Delivery Guarantee",
    items: [
      "Applies to orders within a 3km radius from partner restaurants.",
      "Dedicated Rove riders stationed directly at major culinary hubs.",
      "Real-time GPS tracking from kitchen pick-up to your doorstep."
    ]
  },
  packaging: {
    title: "Tamper & Spill-Proof Policy",
    items: [
      "Thermal-insulated Rove delivery boxes maintain food temperature.",
      "Double-sealed restaurant packaging to eliminate spills during transit.",
      "100% replacement guarantee if your meal arrives damaged."
    ]
  },
  pricing: {
    title: "Transparent Rove Pricing",
    items: [
      "Base Fee: ₦500 for the first 2 km.",
      "Distance Rate: +₦100 per additional kilometer.",
      "Zero surge charges during regular peak lunch/dinner hours."
    ]
  }
};

export default function RoveDelivery() {
  const [activeModal, setActiveModal] = useState<PolicyDetail | null>(null);

  return (
    <section className="max-w-md mx-auto bg-gray-50 p-4 font-sans text-gray-800">
      {/* Hero Banner - OPay Style Gradient with Chowdeck Energy */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden mb-5">
        <div className="absolute -right-4 -bottom-4 opacity-15">
          <Bike className="w-40 h-40 text-white" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-400 text-amber-950 font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3 fill-amber-950" /> Rove Express
            </span>
            <span className="text-xs text-emerald-100 font-medium">by Buttns</span>
          </div>

          <h2 className="text-2xl font-black tracking-tight mb-1">
            Lightning Fast <br />
            <span className="text-amber-300">15-Min Delivery</span>
          </h2>
          
          <p className="text-xs text-emerald-100 mb-4 max-w-[240px]">
            Hot meals from top restaurants, sealed safe & delivered intact to your doorstep.
          </p>

          <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md p-2.5 rounded-xl border border-white/10 text-xs">
            <div className="flex items-center gap-1 text-emerald-200">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>Avg. 14 mins</span>
            </div>
            <div className="w-1 h-1 bg-emerald-300/50 rounded-full" />
            <div className="flex items-center gap-1 text-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>100% Sealed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Feature Grid (OPay Style 3-Column Service Card) */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Our Logistics Promise
          </h3>
          <span className="text-[11px] text-emerald-600 font-semibold">Chowdeck-Speed Standard</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Card 1 */}
          <button
            onClick={() => setActiveModal(ROVE_POLICIES.guarantee)}
            className="flex flex-col items-center text-center p-3 rounded-xl bg-emerald-50/60 hover:bg-emerald-50 transition border border-emerald-100/50"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-2 shadow-sm">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <span className="text-xs font-bold text-gray-800">15 Mins</span>
            <span className="text-[10px] text-gray-500 mt-0.5">Ultra Fast</span>
          </button>

          {/* Card 2 */}
          <button
            onClick={() => setActiveModal(ROVE_POLICIES.packaging)}
            className="flex flex-col items-center text-center p-3 rounded-xl bg-blue-50/60 hover:bg-blue-50 transition border border-blue-100/50"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center mb-2 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-gray-800">Spill Proof</span>
            <span className="text-[10px] text-gray-500 mt-0.5">Thermal Box</span>
          </button>

          {/* Card 3 */}
          <button
            onClick={() => setActiveModal(ROVE_POLICIES.pricing)}
            className="flex flex-col items-center text-center p-3 rounded-xl bg-amber-50/60 hover:bg-amber-50 transition border border-amber-100/50"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-2 shadow-sm">
              <Bike className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-gray-800">From ₦500</span>
            <span className="text-[10px] text-gray-500 mt-0.5">Distance Fee</span>
          </button>
        </div>
      </div>

      {/* Policy & Pricing Quick Summary Banner */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-5 space-y-3">
        <div className="flex items-center justify-between border-b pb-2.5">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold text-gray-700">Delivery Range</span>
          </div>
          <span className="text-xs font-bold text-gray-900">Up to 10 km</span>
        </div>

        <div className="flex items-center justify-between border-b pb-2.5">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold text-gray-700">Service Hours</span>
          </div>
          <span className="text-xs font-bold text-gray-900">8:00 AM – 10:00 PM</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold text-gray-700">Max Package Weight</span>
          </div>
          <span className="text-xs font-bold text-gray-900">12 kg per Rove Bike</span>
        </div>
      </div>

      {/* Primary Action Button */}
      <button 
        onClick={() => alert("Launching Rove Order Interface...")}
        className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 text-sm transition"
      >
        Order Meal with Rove <ChevronRight className="w-4 h-4" />
      </button>

      {/* Policy Modal Bottom Sheet */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 shadow-xl animate-in slide-in-from-bottom duration-200">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-gray-900">{activeModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-xs font-bold text-gray-400 hover:text-gray-600 bg-gray-100 p-1.5 rounded-full"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {activeModal.items.map((item, index) => (
                <div key={index} className="flex items-start gap-2.5 text-xs text-gray-600 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-xl text-xs transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
  );
}