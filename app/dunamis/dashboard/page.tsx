'use client';

import Link from 'next/link';

export default function DunamisDashboardPage() {
  return (
    <main className="px-4 pt-6 pb-24">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Live Dashboard</h1>
          <p className="text-xs text-zinc-400 mt-0.5">Track your orders and service requests</p>
        </div>
        <Link 
          href="/dunamis" 
          className="text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold px-3 py-2 rounded-xl hover:border-[#84CC16] transition"
        >
          + New Order
        </Link>
      </div>

      {/* Active Order Card */}
      <div className="bg-[#121212] border border-[#F59E0B]/40 rounded-2xl p-5 mb-6 shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="bg-[#F59E0B]/20 text-[#F59E0B] text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-md border border-[#F59E0B]/30">
              In Progress
            </span>
            <h3 className="font-bold text-lg text-white mt-2">Shawarma (Double) x1</h3>
            <p className="text-xs text-zinc-400">Order #DUN-8492 • Delivery</p>
          </div>
          <span className="text-xs font-black text-[#84CC16]">Est. 10 mins</span>
        </div>

        {/* Timeline Status */}
        <div className="space-y-3.5 my-5 pl-1">
          <div className="flex items-center space-x-3 text-xs">
            <div className="w-3 h-3 rounded-full bg-[#84CC16] shrink-0" />
            <span className="text-white font-medium">Order Confirmed & Vendor Credited</span>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <div className="w-3 h-3 rounded-full bg-[#F59E0B] animate-pulse shrink-0" />
            <span className="text-white font-medium">Kitchen Preparing Meal</span>
          </div>
          <div className="flex items-center space-x-3 text-xs opacity-40">
            <div className="w-3 h-3 rounded-full bg-zinc-700 shrink-0" />
            <span className="text-zinc-400">Out with Dispatch Runner</span>
          </div>
        </div>

        {/* Multi-Party Notification Alert */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-300 flex items-center space-x-2">
          <span>🔔</span>
          <span>WhatsApp notifications sent to <strong>Vendor</strong> and <strong>Dispatch</strong>.</span>
        </div>
      </div>

      {/* Completed Orders History */}
      <div>
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">Recent Activity</h3>
        <div className="bg-[#121212] border border-zinc-800 rounded-xl p-4 flex justify-between items-center">
          <div>
            <h4 className="font-bold text-white text-sm">1 Hour Charging Slot</h4>
            <p className="text-xs text-zinc-500">Power Stand • Today, 2:15 PM</p>
          </div>
          <span className="text-xs font-bold text-zinc-400">₦200</span>
        </div>
      </div>
    </main>
  );
}