"use client";

import React from 'react';
import { signOut } from 'next-auth/react';
import { 
  X, 
  User, 
  Truck, 
  Store, 
  ShieldCheck, 
  LineChart, 
  LogOut, 
  Sparkles, 
  Settings, 
  HelpCircle,
  Briefcase
} from 'lucide-react';

interface NavMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  } | null;
}

export default function NavMenuDrawer({ isOpen, onClose, user }: NavMenuDrawerProps) {
  if (!isOpen) return null;

  const role = user?.role || 'customer';

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark Overlay Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <div className="relative w-full max-w-xs bg-zinc-950 text-white h-full shadow-2xl z-10 flex flex-col justify-between border-l border-zinc-800 p-5 overflow-y-auto">
        
        <div className="space-y-6">
          {/* Top Bar with Close Button */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black text-white">
                Buttns<span className="text-amber-500">.</span> Navigation
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-xl bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Summary */}
          {user ? (
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-3.5 flex items-center gap-3">
              <img 
                src={user.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
                alt={user.name || "User Profile"} 
                className="w-11 h-11 rounded-full border-2 border-amber-500 object-cover"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-black text-white truncate">{user.name || "Resident"}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[9px] bg-amber-500 text-black font-black uppercase px-2 py-0.5 rounded-md">
                    {role.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3.5 text-center space-y-2">
              <p className="text-xs text-amber-400 font-bold">You are currently in Guest Mode</p>
              <p className="text-[11px] text-gray-400">Tap in with Google to access order history & resident tools.</p>
            </div>
          )}

          {/* Dynamic Role-Based Quick Portals */}
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
              Navigation & Portals
            </p>

            <div className="space-y-1">
              <a 
                href="/" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-200 hover:bg-zinc-900 hover:text-amber-500 transition"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Resident Home</span>
              </a>

              {/* Show Linx Rider Portal for Riders, Click Team, or Admin */}
              {['linx', 'click_team', 'admin'].includes(role) && (
                <a 
                  href="/linx" 
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-200 hover:bg-zinc-900 hover:text-amber-500 transition"
                >
                  <Truck className="w-4 h-4 text-amber-500" />
                  <span>Linx Dispatch Portal</span>
                </a>
              )}

              {/* Show Merchant Hub for Vendors or Admin */}
              {['vendor', 'admin'].includes(role) && (
                <a 
                  href="/kitchen" 
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-200 hover:bg-zinc-900 hover:text-amber-500 transition"
                >
                  <Store className="w-4 h-4 text-amber-500" />
                  <span>Vendor Storefront</span>
                </a>
              )}

              {/* Show Operations for Click Team & Admin */}
              {['click_team', 'admin'].includes(role) && (
                <a 
                  href="/admin" 
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-200 hover:bg-zinc-900 hover:text-amber-500 transition"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>Click Team Ops</span>
                </a>
              )}

              {/* Show Investor / Partner Analytics */}
              {['investor', 'partner', 'admin'].includes(role) && (
                <a 
                  href="/admin/analytics" 
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-200 hover:bg-zinc-900 hover:text-amber-500 transition"
                >
                  <LineChart className="w-4 h-4 text-amber-500" />
                  <span>Partner Metrics</span>
                </a>
              )}

              <a 
                href="/settings" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-200 hover:bg-zinc-900 hover:text-amber-500 transition"
              >
                <Settings className="w-4 h-4 text-gray-400" />
                <span>Account Settings</span>
              </a>

              <a 
                href="/help" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-200 hover:bg-zinc-900 hover:text-amber-500 transition"
              >
                <HelpCircle className="w-4 h-4 text-gray-400" />
                <span>Help & Gatehouse Support</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-zinc-800 space-y-3">
          {/* Become a Partner / Rider application link */}
          {role === 'customer' && (
            <a
              href="/apply"
              className="flex items-center justify-between bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 p-3 rounded-xl text-xs font-bold text-gray-300 transition"
            >
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-500" />
                <span>Join as Vendor or Rider</span>
              </span>
            </a>
          )}

          {/* Sign Out Button */}
          {user && (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 py-2.5 rounded-xl text-xs font-bold transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}