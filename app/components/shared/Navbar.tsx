// src/components/shared/Navbar.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/20 shadow-xl shadow-buttons-primary/5"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-buttons-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Zap className="text-white fill-white" size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-buttons-dark">
            BUTTONS<span className="text-buttons-primary text-xs ml-0.5">TM</span>
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
          className="px-5 py-2.5 bg-buttons-dark text-white rounded-xl text-sm font-bold hover:bg-buttons-primary hover:shadow-lg hover:shadow-buttons-primary/30 transition-all active:scale-95"
        >
          Make it Happen
        </Link>
      </motion.div>
    </nav>
  );
};