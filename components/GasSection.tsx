"use client";

import React, { useState } from 'react';
import { 
  Flame, 
  Truck, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Plus, 
  Minus,
  Sparkles,
  PhoneCall,
  RotateCcw
} from 'lucide-react';

// Replace with your exact Cloudinary Gas Station / Depot visual asset
const GAS_HERO_IMAGE = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80";

interface CylinderOption {
  id: string;
  size: string;
  refillPrice: number;
  estTime: string;
  popular?: boolean;
}

const CYLINDER_OPTIONS: CylinderOption[] = [
  { id: "3kg", size: "3 kg Cylinder", refillPrice: 3800, estTime: "15-20 Mins" },
  { id: "6kg", size: "6 kg Cylinder", refillPrice: 7500, estTime: "15-20 Mins" },
  { id: "12kg", size: "12.5 kg Cylinder", refillPrice: 15500, estTime: "20-25 Mins", popular: true },
  { id: "25kg", size: "25 kg Cylinder", refillPrice: 31000, estTime: "25-30 Mins" },
  { id: "50kg", size: "50 kg Cylinder", refillPrice: 62000, estTime: "30-40 Mins" },
];

interface AccessoryOption {
  id: string;
  name: string;
  price: number;
}

const ACCESSORIES: AccessoryOption[] = [
  { id: "hose", name: "High-Pressure Gas Hose (2m)", price: 2500 },
  { id: "regulator", name: "Safety Gas Regulator", price: 4500 },
  { id: "clamp", name: "Stainless Steel Hose Clamps (Pair)", price: 1000 },
];

export default function GasSection() {
  const [selectedCylinder, setSelectedCylinder] = useState<CylinderOption>(CYLINDER_OPTIONS[2]);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [needsCylinderSwap, setNeedsCylinderSwap] = useState<boolean>(true);
  const [showDispatchModal, setShowDispatchModal] = useState<boolean>(false);

  const deliveryFee = 800; // Ziig heavy package delivery fee
  const accessoriesTotal = selectedAccessories.reduce((acc, accId) => {
    const item = ACCESSORIES.find(a => a.id === accId);
    return acc + (item ? item.price : 0);
  }, 0);

  const grandTotal = (selectedCylinder.refillPrice * quantity) + accessoriesTotal + deliveryFee;

  const toggleAccessory = (id: string) => {
    setSelectedAccessories(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="space-y-3.5">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          <h2 className="text-sm font-black text-gray-900 tracking-tight uppercase">
            Ziig Gas Express
          </h2>
        </div>
        <span className="text-[10px] font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          Depot Active
        </span>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-gray-200 p-3.5 shadow-sm space-y-3.5">
        
        {/* 1. Unobstructed Hero Image */}
        <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
          <img
            src={GAS_HERO_IMAGE}
            alt="Estate Cooking Gas Refill & Pickup"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
            <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
            <span className="text-[9px] font-black uppercase text-white tracking-wider">
              Safety Certified Depot
            </span>
          </div>

          <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-zinc-950/90 backdrop-blur-md p-2 rounded-xl border border-zinc-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-[10px] font-bold text-gray-200">Doorstep Pickup & Return</span>
            </div>
            <span className="text-[10px] font-black text-orange-400">Under 30 Mins</span>
          </div>
        </div>

        {/* 2. Cylinder Size Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-gray-900">Select Cylinder Size</h3>
            <span className="text-[10px] font-bold text-gray-500">Precision Metered Filling</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CYLINDER_OPTIONS.map((cyl) => {
              const isSelected = selectedCylinder.id === cyl.id;
              return (
                <button
                  key={cyl.id}
                  onClick={() => setSelectedCylinder(cyl)}
                  className={`p-2.5 rounded-2xl border text-left transition-all relative ${
                    isSelected
                      ? 'bg-orange-50/60 border-orange-400 ring-2 ring-orange-400/20'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {cyl.popular && (
                    <span className="absolute -top-2 right-2 bg-orange-500 text-white text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full">
                      Most Common
                    </span>
                  )}
                  <p className="text-xs font-black text-gray-900">{cyl.size}</p>
                  <p className="text-xs font-black text-orange-600 mt-0.5">
                    ₦{cyl.refillPrice.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 text-[9px] text-gray-500 font-medium mt-1">
                    <Clock className="w-2.5 h-2.5 text-gray-400" />
                    <span>{cyl.estTime}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Quantity & Exchange Type Toggle */}
        <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-900">Refill Quantity</span>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-2 py-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-5 h-5 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 font-black hover:bg-gray-200"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-black text-gray-900 w-4 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-5 h-5 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 font-black hover:bg-gray-200"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200/80 pt-2 text-[11px]">
            <div className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-orange-500" />
              <span className="font-bold text-gray-800">Cylinder Pickup Required</span>
            </div>
            <button
              onClick={() => setNeedsCylinderSwap(!needsCylinderSwap)}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-black transition-all ${
                needsCylinderSwap
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {needsCylinderSwap ? "Ziig Runner Pick Up Empty" : "Drop Off at Gate Depot"}
            </button>
          </div>
        </div>

        {/* 4. Safety Add-ons / Accessories */}
        <div className="space-y-2">
          <h4 className="text-xs font-black text-gray-900">Safety & Accessories (Optional)</h4>
          <div className="space-y-1.5">
            {ACCESSORIES.map((acc) => {
              const isChecked = selectedAccessories.includes(acc.id);
              return (
                <div
                  key={acc.id}
                  onClick={() => toggleAccessory(acc.id)}
                  className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    isChecked
                      ? 'bg-orange-50/40 border-orange-300'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                      isChecked ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-300'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-xs font-bold text-gray-800">{acc.name}</span>
                  </div>
                  <span className="text-xs font-black text-gray-900">+₦{acc.price.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Summary & Action Bar */}
        <div className="p-3 bg-zinc-950 rounded-2xl text-white space-y-2.5">
          <div className="space-y-1 text-[11px] border-b border-zinc-800 pb-2">
            <div className="flex justify-between text-gray-300">
              <span>{selectedCylinder.size} × {quantity}</span>
              <span>₦{(selectedCylinder.refillPrice * quantity).toLocaleString()}</span>
            </div>
            {accessoriesTotal > 0 && (
              <div className="flex justify-between text-gray-300">
                <span>Accessories Total</span>
                <span>₦{accessoriesTotal.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-300">
              <span>Ziig Heavy Runner Dispatch</span>
              <span>₦{deliveryFee.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400 font-medium">Total Refill Fee</p>
              <p className="text-base font-black text-orange-400">₦{grandTotal.toLocaleString()}</p>
            </div>

            <button
              onClick={() => setShowDispatchModal(true)}
              className="bg-orange-500 hover:bg-orange-400 active:scale-95 text-zinc-950 px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-md shadow-orange-500/20"
            >
              <span>Order Gas Express</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Dispatch Modal */}
      {showDispatchModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-black text-sm">
                  <Flame className="w-4 h-4 fill-orange-500" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900">Confirm Gas Order</h3>
                  <p className="text-[10px] text-gray-500 font-bold">Ziig runner assigned upon dispatch</p>
                </div>
              </div>
              <button 
                onClick={() => setShowDispatchModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            {/* Order Summary Box */}
            <div className="p-3 bg-orange-50/60 border border-orange-200 rounded-2xl space-y-1 text-xs">
              <div className="flex justify-between font-black text-gray-900">
                <span>{selectedCylinder.size} ({quantity}x)</span>
                <span>₦{grandTotal.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-orange-800 font-medium">
                Includes Ziig door-to-door pickup & precision refill
              </p>
            </div>

            <div className="space-y-2.5">
              {/* Option 1: Instant WhatsApp Dispatch */}
              <a
                href={`https://wa.me/2348012345678?text=Hello%20Ziig%20Gas,%20I%20want%20to%20order%20a%20gas%20refill:%20${encodeURIComponent(selectedCylinder.size)}%20(Qty:%20${quantity}).%20Total:%20₦${grandTotal.toLocaleString()}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 transition-colors group"
              >
                <div>
                  <p className="text-xs font-black text-emerald-950">Dispatch via WhatsApp</p>
                  <p className="text-[10px] text-emerald-700 font-medium">Send house number & pickup time directly</p>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Option 2: Paystack Online Checkout */}
              <a
                href="https://paystack.com/pay/buttns-gas-express"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl border border-zinc-200 bg-zinc-950 text-white hover:bg-zinc-900 transition-colors group"
              >
                <div>
                  <p className="text-xs font-black text-white">Instant Card / USSD Payment</p>
                  <p className="text-[10px] text-gray-300 font-medium">Pay securely online and auto-generate Ziig ticket</p>
                </div>
                <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <button
              onClick={() => setShowDispatchModal(false)}
              className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}