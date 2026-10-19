"use client";

import React, { useState } from "react";
import Link from "next/link";
import OrderStatusTracker, { OrderStatus } from "@/components/OrderStatusTracker";
import { ArrowLeft, RefreshCw, ShoppingBag } from "lucide-react";

export default function UserOrdersPage() {
  // Demo active order state. In production, this pulls from your backend/state.
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>("preparing");

  // Demo status simulation controls
  const advanceStatus = () => {
    if (currentStatus === "received") setCurrentStatus("preparing");
    else if (currentStatus === "preparing") setCurrentStatus("ready");
    else if (currentStatus === "ready") setCurrentStatus("out_for_delivery");
    else if (currentStatus === "out_for_delivery") setCurrentStatus("delivered");
    else setCurrentStatus("received");
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/user/profile"
          className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Profile</span>
        </Link>
        <span className="text-xs font-black uppercase text-amber-400">Active Dispatches</span>
      </div>

      {/* Main Status Tracker */}
      <OrderStatusTracker
        orderId="BTN-9821"
        vendorName="Aunty Cossy Kitchen"
        itemsSummary="Jollof Rice & Fried Chicken (x2), Chilled Tiger Nut (x1)"
        totalAmount={8200}
        status={currentStatus}
        estimatedMinutes={12}
      />

      {/* Demo State Simulator (For Testing Status Changes) */}
      <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-center space-y-2">
        <p className="text-[10px] text-gray-400 font-bold uppercase">
          Testing Mode: Simulate Status Updates
        </p>
        <button
          onClick={advanceStatus}
          className="w-full py-2 bg-zinc-900 border border-zinc-700 hover:border-amber-400 rounded-xl text-xs font-bold text-amber-400 flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Advance Progress (Currently: {currentStatus})</span>
        </button>
      </div>

      {/* Back to Home CTA */}
      <Link
        href="/"
        className="flex items-center justify-center gap-2 w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-2xl text-xs font-black border border-zinc-800 transition-all"
      >
        <ShoppingBag className="w-4 h-4 text-amber-400" />
        <span>Continue Exploring Estates</span>
      </Link>
    </div>
  );
}