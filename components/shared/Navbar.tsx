// src/components/shared/Navbar.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full  z-50 px-6 py-4 bg-amber-400">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/20 shadow-xl shadow-buttons-primary/5"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
            {/* <Zap className="text-amber-400 fill-amber-400" size={20} /> */}
            <div className="bg-amber-400 w-3 h-3 relative -top-3"></div>
            <div className="bg-amber-400 w-2 h-2 relative right-2"></div>
            <div className="bg-lime-400 w-2 h-2 relative -top-3 right-1"></div>
            <div className="bg-amber-400 w-3 h-3 relative right-3"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-buttons-dark ">
            BUTTNS<span className="text-lime-700 text-xs ml-0.5">.com</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
          <Link href="/services" className="hover:text-buttons-primary transition-colors">Our Buttons</Link>
          <Link href="/business" className="hover:text-buttons-primary transition-colors">For Partners</Link>
          <Link href="/academy" className="hover:text-buttons-primary transition-colors">Academy</Link>
        </div>

        {/* Call to Action */}
        <Link 
          href="/get-started" 
          className="px-5 py-1.5 w-50 bg-lime-500 text-black rounded-xl border text-xl font-bold hover:bg-buttons-primary hover:shadow-lg hover:text-black hover:shadow-buttons-primary/30 transition-all active:scale-95 text-center"
        >
          Tap in!
        </Link>
      </motion.div>
    </nav>
  );
};