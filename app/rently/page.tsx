"use client";

import React, { useState } from "react";
import { 
  Home, 
  Key, 
  Building2, 
  CreditCard, 
  PhoneCall, 
  MessageSquare, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Bed, 
  Sparkles 
} from "lucide-react";

interface ListingDetail {
  id: string;
  title: string;
  type: "Short Stay" | "Annual Rent";
  price: string;
  location: string;
  bedrooms: number;
  landlordName: string;
  landlordPhone: string;
  features: string[];
  description: string;
}

const PROPERTY_LISTINGS: ListingDetail[] = [
  {
    id: "prop-1",
    title: "Luxury 2-Bed Serviced Apartment",
    type: "Short Stay",
    price: "₦65,000 / night",
    location: "Block 4, Palm Estate",
    bedrooms: 2,
    landlordName: "Chief Adebayo (Property Owner)",
    landlordPhone: "+2348000000000",
    features: ["24/7 Solar Power", "High-Speed Wi-Fi", "Daily Housekeeping", "Estate Security Cleared"],
    description: "Fully furnished short-stay unit equipped with smart home features, fitted kitchen, and uninterrupted power."
  },
  {
    id: "prop-2",
    title: "Modern 3-Bedroom Terrace Duplex",
    type: "Annual Rent",
    price: "₦3,500,000 / year",
    location: "Street 2, Palm Estate",
    bedrooms: 3,
    landlordName: "Mrs. Victoria O.",
    landlordPhone: "+2348111111111",
    features: ["En-suite Bedrooms", "Dedicated Parking (2 Cars)", "Low Service Charge", "In-App Rent Eligible"],
    description: "Vacant family home ready for immediate move-in. Rent payable directly via the Buttns App with instant receipt generation."
  }
];

export default function EstateHousing() {
  const [selectedProperty, setSelectedProperty] = useState<ListingDetail | null>(null);
  const [payModal, setPayModal] = useState<boolean>(false);

  return (
    <section className="max-w-md mx-auto bg-black p-4 font-sans text-white rounded-3xl">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-lime-500 via-lime-600 to-lime-700 rounded-2xl p-5 text-black shadow-lg mb-5 relative overflow-hidden">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 fill-black text-black" />
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-black/80">
                Estate Living
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight leading-tight">
              Homes & Short Stay
            </h2>
          </div>

          <span className="bg-black text-amber-400 text-xs px-3 py-1 rounded-full font-bold border border-amber-400/40 shadow-sm">
            Verified
          </span>
        </div>

        <p className="text-xs font-medium text-black/90 mb-4 max-w-[260px]">
          Find vacant apartments, contact landlords directly, or pay your rent seamlessly in-app.
        </p>

        {/* Quick Badges */}
        <div className="flex items-center justify-between bg-black/10 backdrop-blur-sm p-2 rounded-xl text-[11px] font-semibold text-black">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Direct Landlords
          </div>
          <div className="w-1 h-1 bg-black/40 rounded-full" />
          <div className="flex items-center gap-1">
            <CreditCard className="w-3.5 h-3.5" /> Instant Receipts
          </div>
          <div className="w-1 h-1 bg-black/40 rounded-full" />
          <div className="flex items-center gap-1">
            <Key className="w-3.5 h-3.5" /> Gate Pass
          </div>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 mb-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Explore Housing Services
          </h3>
          <span className="text-[10px] text-lime-400 font-semibold bg-lime-950/60 px-2 py-0.5 rounded border border-lime-500/20">
            0% Agent Scam
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setSelectedProperty(PROPERTY_LISTINGS[0])}
            className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 transition border border-zinc-700/50"
          >
            <div className="w-11 h-11 rounded-xl bg-lime-400 text-black flex items-center justify-center mb-1.5">
              <Key className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-[11px] font-medium text-zinc-200 leading-tight">Short Stay</span>
          </button>

          <button
            onClick={() => setSelectedProperty(PROPERTY_LISTINGS[1])}
            className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 transition border border-zinc-700/50"
          >
            <div className="w-11 h-11 rounded-xl bg-lime-400 text-black flex items-center justify-center mb-1.5">
              <Home className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-[11px] font-medium text-zinc-200 leading-tight">Vacant Rent</span>
          </button>

          <button
            onClick={() => setPayModal(true)}
            className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 transition border border-zinc-700/50"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-400 text-black flex items-center justify-center mb-1.5">
              <CreditCard className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-[11px] font-medium text-zinc-200 leading-tight">Pay Rent</span>
          </button>

          <button
            onClick={() => alert("Opening Landlord Property Submission Form...")}
            className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 transition border border-zinc-700/50"
          >
            <div className="w-11 h-11 rounded-xl bg-zinc-700 text-lime-400 flex items-center justify-center mb-1.5">
              <Building2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-[11px] font-medium text-zinc-200 leading-tight">List House</span>
          </button>
        </div>
      </div>

      {/* Featured Vacant Listings Cards */}
      <div className="space-y-3 mb-5">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
          Available Listings Near You
        </h3>

        {PROPERTY_LISTINGS.map((prop) => (
          <div
            key={prop.id}
            onClick={() => setSelectedProperty(prop)}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex justify-between items-center cursor-pointer hover:border-lime-500/50 transition"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                  prop.type === "Short Stay" 
                    ? "bg-amber-400/20 text-amber-300 border border-amber-400/30" 
                    : "bg-lime-400/20 text-lime-300 border border-lime-400/30"
                }`}>
                  {prop.type}
                </span>
                <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-zinc-500" /> {prop.location}
                </span>
              </div>
              <h4 className="text-sm font-bold text-zinc-100">{prop.title}</h4>
              <p className="text-xs font-extrabold text-lime-400">{prop.price}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-500" />
          </div>
        ))}
      </div>

      {/* Property Details Drawer */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-200 text-white">
            <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-lime-400 uppercase tracking-widest">
                  {selectedProperty.type}
                </span>
                <h3 className="text-base font-bold text-zinc-100">{selectedProperty.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProperty(null)}
                className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-300 mb-4 leading-relaxed">
              {selectedProperty.description}
            </p>

            <div className="bg-zinc-800/80 p-3 rounded-xl mb-4 border border-zinc-700/50 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Rate / Price</span>
                <span className="text-sm font-bold text-amber-400">{selectedProperty.price}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Landlord</span>
                <span className="text-xs font-semibold text-zinc-200">{selectedProperty.landlordName}</span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Key Amenities</span>
              {selectedProperty.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons: Call / Chat Landlord or Book */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${selectedProperty.landlordPhone}`}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs transition border border-zinc-700"
              >
                <PhoneCall className="w-4 h-4 text-lime-400" /> Call Landlord
              </a>

              <button
                onClick={() => {
                  alert("Redirecting to secure chat / booking portal...");
                  setSelectedProperty(null);
                }}
                className="bg-lime-400 hover:bg-lime-500 text-black font-extrabold py-3 rounded-xl flex items-center justify-center gap-2 text-xs transition"
              >
                <MessageSquare className="w-4 h-4 fill-black" /> Chat / Reserve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pay Rent Modal */}
      {payModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl text-white">
            <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-zinc-100">Pay Estate Rent / Service Charge</h3>
              <button onClick={() => setPayModal(false)} className="p-1.5 rounded-full bg-zinc-800 text-zinc-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div>
                <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">Estate House Code / Unit Number</label>
                <input type="text" placeholder="e.g. Block 4, Flat 2B" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-lime-400" />
              </div>
              <div>
                <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">Amount (₦)</label>
                <input type="number" placeholder="e.g. 500000" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-lime-400" />
              </div>
            </div>

            <button
              onClick={() => {
                alert("Processing rent payment via secure checkout gateway...");
                setPayModal(false);
              }}
              className="w-full bg-amber-400 hover:bg-amber-500 text-black font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs transition"
            >
              Proceed to Secure Payment
            </button>
          </div>
        </div>
      )}
    </section>
  );
}