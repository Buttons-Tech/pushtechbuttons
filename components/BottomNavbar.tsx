"use client";

import React from 'react';
import { Home, Receipt, MessageSquare, Bell, User } from 'lucide-react';

export default function BottomNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-zinc-800 px-6 py-2">
      <div className="max-w-md mx-auto flex justify-between items-center text-gray-400">
        <button className="flex flex-col items-center gap-0.5 text-amber-500">
          <Home className="w-5 h-5" />
          <span className="text-[9px] font-bold">Home</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 hover:text-white transition">
          <Receipt className="w-5 h-5" />
          <span className="text-[9px] font-bold">Orders</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 hover:text-white transition">
          <MessageSquare className="w-5 h-5" />
          <span className="text-[9px] font-bold">Chat</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 hover:text-white transition">
          <Bell className="w-5 h-5" />
          <span className="text-[9px] font-bold">Alerts</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 hover:text-white transition">
          <User className="w-5 h-5" />
          <span className="text-[9px] font-bold">Account</span>
        </button>
      </div>
    </nav>
  );
}