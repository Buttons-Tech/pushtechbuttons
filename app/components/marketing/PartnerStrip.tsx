"use client";

import { motion } from "framer-motion";
import { Handshake, ArrowUpRight } from "lucide-react";

export const PartnerStrip = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="bg-black rounded-[40px] p-8 md:p-16 relative overflow-hidden">
          
          {/* Subtle glow effect for depth */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-buttons-primary/20 blur-[100px] rounded-full" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 relative z-10">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white font-bold text-[10px] uppercase tracking-widest mb-6">
                <Handshake size={14} className="text-buttons-accent" />
                <span>Partner with Buttons</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-[900] text-white tracking-tighter uppercase leading-[0.95] mb-6">
                Put your business <br />
                <span className="text-buttons-accent">On the Button.</span>
              </h2>
              
              <p className="text-gray-400 font-medium text-lg leading-relaxed">
                Join the network of top-tier vendors powering Lagos. Increase your reach, automate your bookings, and get paid instantly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-5 bg-buttons-primary text-white rounded-2xl font-bold uppercase text-sm flex items-center justify-center gap-2 shadow-xl shadow-buttons-primary/20"
              >
                Become a Partner <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};