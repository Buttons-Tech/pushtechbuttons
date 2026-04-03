"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center bg-black overflow-hidden">
      {/* Visual Anchor: Lekki-Ikoyi Link Bridge at Night */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?q=80&w=2000" 
          className="w-full h-full object-cover opacity-40 grayscale"
          alt="Modern Lagos Infrastructure"
        />
        {/* The Fade Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-[110px] font-black text-white tracking-tighter uppercase leading-[0.85] mb-8"
        >
          Push the <br /><span className="text-[#00FF00]">Button.</span>
        </motion.h1>
        
        <p className="text-gray-400 text-sm md:text-xl font-medium tracking-wide max-w-2xl mx-auto mb-10 leading-relaxed">
          Buttons Technology LTD is accelerating African commerce. 
          Your 24-hour digital storefront is one click away.
        </p>

        <button className="bg-[#00FF00] text-black px-12 py-5 rounded-full font-black uppercase text-[11px] tracking-[0.2em] active:scale-90 transition-transform hover:bg-white transition-colors duration-300">
          Deploy Your Store
        </button>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-gray-600 uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#00FF00] to-transparent" />
      </div>
    </section>
  );
}