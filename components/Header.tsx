"use client";

import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { Menu, Sparkles } from 'lucide-react';
import NavMenuDrawer from './NavMenuDrawer';

export default function Header() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isLoading = status === "loading";
  const user = session?.user;

  return (
    <>
      <header className="sticky top-0 z-40 bg-black text-white px-4 py-3 shadow-md border-b border-zinc-800">
        <div className="max-w-md mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="flex items-center gap-1 group">
            <span className="text-xl font-black text-white tracking-tight group-hover:text-amber-500 transition-colors">
              Buttns<span className="text-amber-500">.</span>
            </span>
          </a>

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
                  src={user.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                  alt={user.name || "User Avatar"}
                  className="w-7 h-7 rounded-full border border-amber-500 object-cover"
                />
                <span className="text-xs font-bold text-amber-500">Tapped In</span>
              </button>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-black px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-transform active:scale-95 shadow-md shadow-amber-500/20"
              >
                <Sparkles className="w-3.5 h-3.5 fill-black" />
                <span>TAP IN!</span>
              </button>
            )}

            {/* Menu Trigger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-1.5 text-gray-300 hover:text-amber-500 hover:bg-zinc-900 rounded-xl transition"
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