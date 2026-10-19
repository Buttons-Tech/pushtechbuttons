"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User, Store, MapPin, Phone, ShieldCheck, LogOut, ArrowRight, Package } from "lucide-react";

export default function UserProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 space-y-4">
        <p className="text-xs text-gray-400">You must be logged in to view your profile.</p>
        <Link
          href="/auth/signin"
          className="bg-amber-400 text-black px-4 py-2 rounded-xl text-xs font-black"
        >
          Sign In to Buttns
        </Link>
      </div>
    );
  }

  const isVendor = user.role === "vendor";

  return (
    <div className="min-h-screen bg-black text-white p-4 max-w-md mx-auto space-y-4">
      {/* Profile Header Card */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 space-y-4 relative overflow-hidden">
        <div className="flex items-center gap-3">
          <img
            src={
              user.image ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            }
            alt={user.name || "User Avatar"}
            className="w-14 h-14 rounded-2xl border-2 border-amber-400 object-cover"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-black text-white">{user.name}</h2>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xs text-gray-400">{user.email}</p>
            <span className="inline-block mt-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
              {isVendor ? "Verified Vendor & Resident" : "Estate Resident"}
            </span>
          </div>
        </div>

        {/* Dual Access Banner for Vendors */}
        {isVendor && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Store className="w-4 h-4" />
                <span className="text-xs font-black uppercase">Vendor Workspace</span>
              </div>
              <span className="text-[9px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-md">
                Active Store
              </span>
            </div>
            <p className="text-[10px] text-gray-300 font-medium">
              You have dual access! Switch to your vendor workspace to manage items, pricing, and orders.
            </p>
            <Link
              href="/business/dashboard"
              className="flex items-center justify-between w-full bg-amber-400 text-black px-3 py-2 rounded-xl text-xs font-black transition-all hover:bg-amber-300"
            >
              <span>Go to Business Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* Resident Details */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-4 space-y-3">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">
          Estate Residency Info
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2.5 bg-zinc-900 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Flat 4B, Zone 2, Main Estate</span>
            </div>
            <button className="text-[10px] font-bold text-amber-400">Edit</button>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-zinc-900 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-2 text-gray-300">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>+234 801 234 5678</span>
            </div>
            <button className="text-[10px] font-bold text-amber-400">Edit</button>
          </div>
        </div>
      </div>

      {/* Orders Link */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Package className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white">Active Orders & Dispatches</h4>
            <p className="text-[10px] text-gray-400">Track order progress visuals</p>
          </div>
        </div>
        <Link href="/user/orders" className="text-xs font-bold text-amber-400 hover:underline">
          View
        </Link>
      </div>

      {/* Sign Out */}
      <button
        onClick={() => signOut()}
        className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-red-400 rounded-2xl text-xs font-black flex items-center justify-center gap-2 border border-zinc-800 transition-all"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out from Device</span>
      </button>
    </div>
  );
}