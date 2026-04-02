"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Solutions", href: "#solutions" },
  { name: "Infrastructure", href: "#infrastructure" },
  { name: "LTD Status", href: "#ltd" },
  { name: "Fleet", href: "#fleet" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-[#00FF00] rounded-full shadow-[0_0_15px_#00FF00]" />
            <span className="text-white font-black tracking-tighter text-xl uppercase">
              Buttons <span className="text-gray-500 font-light hidden sm:inline">Technology</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-[#00FF00] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-6">
            <button className="hidden sm:block text-[#00FF00] text-[10px] font-black uppercase tracking-widest hover:opacity-80">
              Support
            </button>
            <button className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#00FF00] transition-colors active:scale-95">
              Push
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(true)}
              className="md:hidden text-white p-2"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-black flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#00FF00] rounded-full" />
                <span className="text-white font-bold uppercase tracking-tighter">Buttons Tech</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white p-2 bg-white/10 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-4xl font-black text-white uppercase tracking-tighter flex justify-between items-center group"
                >
                  {link.name}
                  <ArrowRight className="text-[#00FF00] opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>

            <div className="mt-auto pb-10">
              <button className="w-full py-6 bg-[#00FF00] text-black font-black uppercase tracking-[0.2em] rounded-2xl text-sm mb-4">
                Get Started Now
              </button>
              <p className="text-gray-600 text-[10px] uppercase tracking-widest text-center">
                Buttons Technology LTD • Lagos, Nigeria
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}