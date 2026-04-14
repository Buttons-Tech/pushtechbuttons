"use client";
import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar({ onOpenStory }: { onOpenStory: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "The Store", href: "#hero" },
    { name: "Emergency", href: "#emergency" },
    { name: "Tiers", href: "#tiers" },
    { name: "Ventures", href: "#ventures" },
  ];

  return (
    <nav className="fixed top-0 w-full z-[80] px-6 py-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-[32px] px-8 py-4">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#00FF00] rounded-full animate-pulse" />
          <span className="text-white font-black tracking-tighter text-xl">BUTTONS</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="text-gray-400 hover:text-[#00FF00] text-[10px] font-black uppercase tracking-widest transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA */}
        <button 
          onClick={onOpenStory}
          className="hidden md:flex bg-white text-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all hover:bg-[#00FF00]"
        >
          Get Started
        </button>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden mt-4 bg-black border border-white/10 rounded-[32px] p-8 flex flex-col gap-6">
          {links.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-white text-2xl font-black uppercase tracking-tighter">
              {link.name}
            </a>
          ))}
          <button onClick={() => { onOpenStory(); setIsOpen(false); }} className="w-full py-5 bg-[#00FF00] text-black rounded-2xl font-black uppercase tracking-widest text-[10px]">
            Get Started
          </button>
        </motion.div>
      )}
    </nav>
  );
}