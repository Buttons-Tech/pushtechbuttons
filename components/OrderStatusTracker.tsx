"use client";

import React from "react";
import { 
  CheckCircle2, 
  ChefHat, 
  PackageCheck, 
  Bike, 
  Clock, 
  MapPin, 
  PhoneCall 
} from "lucide-react";

export type OrderStatus = "received" | "preparing" | "ready" | "out_for_delivery" | "delivered";

interface OrderTrackerProps {
  orderId: string;
  vendorName: string;
  itemsSummary: string;
  totalAmount: number;
  status: OrderStatus;
  estimatedMinutes?: number;
}

const STAGES: { key: OrderStatus; label: string; icon: React.ElementType; desc: string }[] = [
  { key: "received", label: "Received", icon: CheckCircle2, desc: "Vendor confirmed order" },
  { key: "preparing", label: "Preparing", icon: ChefHat, desc: "Kitchen is cooking" },
  { key: "ready", label: "Ready", icon: PackageCheck, desc: "Packed for Ziig runner" },
  { key: "out_for_delivery", label: "On the Way", icon: Bike, desc: "Ziig runner en route" },
];

export default function OrderStatusTracker({
  orderId,
  vendorName,
  itemsSummary,
  totalAmount,
  status,
  estimatedMinutes = 15,
}: OrderTrackerProps) {
  const getStageIndex = (currentStatus: OrderStatus) => {
    switch (currentStatus) {
      case "received": return 0;
      case "preparing": return 1;
      case "ready": return 2;
      case "out_for_delivery": return 3;
      case "delivered": return 4;
      default: return 0;
    }
  };

  const currentIndex = getStageIndex(status);

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-4 text-white space-y-4 shadow-xl">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
              Live Order #{orderId}
            </span>
          </div>
          <h3 className="text-sm font-black text-white mt-0.5">{vendorName}</h3>
          <p className="text-[10px] text-gray-400 font-medium">{itemsSummary}</p>
        </div>

        <div className="text-right">
          <p className="text-sm font-black text-amber-400">₦{totalAmount.toLocaleString()}</p>
          <div className="flex items-center justify-end gap-1 text-[10px] text-gray-400 font-bold mt-0.5">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>~{estimatedMinutes} mins</span>
          </div>
        </div>
      </div>

      {/* Visual Step-by-Step Bar */}
      <div className="space-y-3 py-1">
        <div className="grid grid-cols-4 gap-1 relative">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isCompleted = idx <= currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <div key={stage.key} className="flex flex-col items-center text-center space-y-1.5">
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                    isCurrent
                      ? "bg-amber-400 text-black ring-4 ring-amber-400/20 scale-105"
                      : isCompleted
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-zinc-900 text-gray-600 border border-zinc-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <span
                  className={`text-[9px] font-black uppercase ${
                    isCurrent
                      ? "text-amber-400"
                      : isCompleted
                      ? "text-emerald-400"
                      : "text-gray-600"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Current Stage Description Banner */}
        <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-xs font-black text-white uppercase tracking-wider">
              Status: {STAGES[currentIndex]?.label || "Order Completed"}
            </p>
            <p className="text-[10px] text-gray-400 font-medium">
              {STAGES[currentIndex]?.desc || "Delivered to your doorstep"}
            </p>
          </div>

          <a
            href="tel:+2348012345678"
            className="flex items-center gap-1 bg-amber-400/10 border border-amber-400/30 text-amber-400 px-2.5 py-1.5 rounded-xl text-[10px] font-black hover:bg-amber-400/20 transition-all"
          >
            <PhoneCall className="w-3 h-3" />
            <span>Call Ziig Runner</span>
          </a>
        </div>
      </div>
    </div>
  );
}