"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
      {/* Visual Anchor: Lagos Major Road at Night */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1599933310633-6f132f05929b?q=80&w=2000" 
          className="w-full h-full object-cover opacity-30 grayscale"
          alt="Lagos Infrastructure"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-[120px] font-black text-white tracking-tighter uppercase leading-[0.85] mb-6"
        >
          Push the <br /><span className="text-[#00FF00]">Button.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 text-lg md:text-xl font-light tracking-wide max-w-xl mx-auto mb-10"
        >
          Buttons Technology is accelerating African commerce. 
          Digital stores deployed in 24 hours.
        </motion.p>

        <div className="flex flex-col md:flex-row gap-5 justify-center">
          <button className="bg-[#00FF00] text-black px-14 py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] active:scale-90 transition-transform">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}