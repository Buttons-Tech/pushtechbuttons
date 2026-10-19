"use client";

import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, Sparkles } from "lucide-react";
import NavMenuDrawer from "./NavMenuDrawer";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoading = status === "loading";
  const user = session?.user;

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#023b26] text-white px-4 py-3 shadow-md border-b border-zinc-800">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex h-1 items-center gap-1 group">
            <Image
              src="/brand/buttons_logo.png"
              width={50}
              height={50}
              alt="push"
              className="w-auto h-auto mt-4 overflow-y-hidden"
            />
            <span className="text-[11px] bottom-0 text-white ">.com</span>
          </Link>

          {/* Controls */}
          <div className="flex items-center gap-2.5">
            {isLoading ? (
              <div className="w-20 h-8 bg-zinc-800 animate-pulse rounded-full" />
            ) : user ? (
              <button
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 hover:border-amber-500 p-1 pr-3 rounded-full transition"
              >
                <img
                  src={
                    user.image ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  }
                  alt={user.name || "User Avatar"}
                  className="w-7 h-7 rounded-full border border-amber-500 object-cover"
                />
                <span className="text-xs font-bold text-amber-500">
                  {user.role === "vendor" ? "Vendor Active" : "Tapped In"}
                </span>
              </button>
            ) : (
              /* Replaced direct Google sign-in with redirect to /auth/signin */
              <Link
                href="/auth/signin"
                className="flex items-center gap-1.5 bg-amber-500 hover:bg-lime-300 text-black px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-transform active:scale-95 shadow-md border border-lime-300 shadow-amber-500/20"
              >
                <span>PUSH</span>
              </Link>
            )}

            {/* Menu Trigger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-1.5 text-lime-300 hover:text-amber-500 hover:bg-zinc-800 rounded-xl transition"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-Over Drawer */}
      <NavMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        user={user}
      />
    </>
  );
}