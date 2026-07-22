"use client";

import React, { useState } from "react";
import { 
  Wrench, 
  Car, 
  Home, 
  ShieldCheck, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Zap,
  Sparkles
} from "lucide-react";

interface ServiceDetail {
  title: string;
  category: string;
  price: string;
  features: string[];
  description: string;
}

const ESTATE_SERVICES: Record<string, ServiceDetail> = {
  mobile_mechanic: {
    title: "On-Site Auto Diagnostics & Repair",
    category: "Car Servicing",
    price: "From ₦15,000 / inspection",
    features: [
      "Certified mechanics dispatched directly to your estate unit",
      "Engine diagnostics, battery jumping, and oil changes",
      "Genuine spare parts replacement guarantee"
    ],
    description: "Got engine trouble in your driveway? Book a vetted auto technician to diagnose and fix your car right at home."
  },
  home_technician: {
    title: "Estate Home Tech Call-Out",
    category: "Residential Maintenance",
    price: "From ₦10,000 / call-out",
    features: [
      "In-home electrical, plumbing, and generator repairs",
      "Thorough background check & estate gate security clearance",
      "Same-day dispatch for emergency household fixes"
    ],
    description: "Get verified estate technicians sent directly to your residence for quick home appliance, electrical, or plumbing servicing."
  },
  fleet_corporate: {
    title: "Corporate & Company Fleet Servicing",
    category: "Enterprise Maintenance",
    price: "Custom Monthly Contracts",
    features: [
      "Scheduled preventive maintenance for company vehicles",
      "Dedicated account supervisor and rapid priority response",
      "Transparent invoice logs and multi-vehicle reporting"
    ],
    description: "Tailored servicing packages for offices and business fleets operating within or around the estate."
  }
};

export default function EstateServices() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const quickServices = [
    { id: "mobile_mechanic", label: "Car Repair", icon: Car },
    { id: "home_technician", label: "Home Servicing", icon: Home },
    { id: "fleet_corporate", label: "Company Fleet", icon: Wrench },
    { id: "emergency", label: "Rapid Help", icon: Zap }
  ];

  return (
    <section className="max-w-md mx-auto bg-black p-4 font-sans text-white rounded-3xl">
      {/* OPay Style Hero Card — Black & Lime Branding */}
      <div className="bg-gradient-to-br from-lime-500 via-lime-600 to-lime-700 rounded-2xl p-5 text-black shadow-lg mb-5 relative overflow-hidden">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 fill-black text-black" />
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-black/80">
                Estate Services
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight leading-tight">
              Auto & Home <br />Technicians
            </h2>
          </div>

          <span className="bg-black text-amber-400 text-xs px-3 py-1 rounded-full font-bold border border-amber-400/40 shadow-sm">
            On-Demand
          </span>
        </div>

        <p className="text-xs font-medium text-black/90 mb-4 max-w-[260px]">
          Car repairs and home technician call-outs delivered straight to your residence or office.
        </p>

        {/* Quick Trust Badges */}
        <div className="flex items-center justify-between bg-black/10 backdrop-blur-sm p-2 rounded-xl text-[11px] font-semibold text-black">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Techs
          </div>
          <div className="w-1 h-1 bg-black/40 rounded-full" />
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Under 45 Mins
          </div>
          <div className="w-1 h-1 bg-black/40 rounded-full" />
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> Gate Cleared
          </div>
        </div>
      </div>

      {/* OPay 4-Column Grid Interface */}
      <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 mb-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Select Service Type
          </h3>
          <span className="text-[10px] text-lime-400 font-semibold bg-lime-950/60 px-2 py-0.5 rounded border border-lime-500/20">
            Estate Approved
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {quickServices.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() =>
                  setSelectedService(
                    ESTATE_SERVICES[service.id] || ESTATE_SERVICES["mobile_mechanic"]
                  )
                }
                className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 active:scale-95 transition border border-zinc-700/50"
              >
                <div className="w-11 h-11 rounded-xl bg-lime-400 text-black flex items-center justify-center mb-1.5 shadow-sm">
                  <Icon className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-[11px] font-medium text-zinc-200 leading-tight">
                  {service.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Amber Notice Box */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 flex items-start gap-3 mb-5">
        <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-amber-300">Need Immediate Vehicle Servicing?</h4>
          <p className="text-[11px] text-amber-200/80 mt-0.5 leading-relaxed">
            Technicians are stationed nearby for emergency jumpstarts, tire changes, or fluid top-ups.
          </p>
        </div>
      </div>

      {/* Primary CTA */}
      <button 
        onClick={() => setSelectedService(ESTATE_SERVICES["mobile_mechanic"])}
        className="w-full bg-lime-400 hover:bg-lime-500 active:scale-[0.99] text-black font-extrabold py-3.5 rounded-2xl shadow-lg shadow-lime-500/10 flex items-center justify-center gap-2 text-sm transition"
      >
        Request Technician Now <ChevronRight className="w-4 h-4" />
      </button>

      {/* OPay Style Slide-Up Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-200 text-white">
            <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-lime-400 uppercase tracking-widest">
                  {selectedService.category}
                </span>
                <h3 className="text-lg font-bold text-zinc-100">{selectedService.title}</h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-300 mb-4 leading-relaxed">
              {selectedService.description}
            </p>

            <div className="bg-zinc-800/80 p-3 rounded-xl mb-4 border border-zinc-700/50 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                  Service Rate
                </span>
                <span className="text-sm font-bold text-amber-400">{selectedService.price}</span>
              </div>
              <span className="bg-lime-400/20 text-lime-300 text-[10px] font-semibold px-2 py-1 rounded border border-lime-400/30">
                Gate Clearance Included
              </span>
            </div>

            <div className="space-y-2 mb-6">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                What's Included
              </span>
              {selectedService.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                alert("Booking technician...");
                setSelectedService(null);
              }}
              className="w-full bg-lime-400 hover:bg-lime-500 text-black font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs transition"
            >
              Confirm & Dispatch Technician <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}