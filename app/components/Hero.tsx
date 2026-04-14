"use client";
import { motion } from "framer-motion";
import { ShieldAlert, Zap, Utensils, Droplets, Car } from "lucide-react";

const emergencies = [
  { name: "Security", icon: <ShieldAlert color="#FF0000" />, link: "/emergency/security" },
  { name: "Gas Refill", icon: <Droplets color="#00FF00" />, link: "/services/gas" },
  { name: "Fast Food", icon: <Utensils color="#FFA500" />, link: "/services/food" },
  { name: "Car Wash", icon: <Car color="#00BFFF" />, link: "/services/carwash" },
];

export default function Hero() {
  return (
    <section className="bg-black text-white min-h-screen">
      {/* Cinematic Hero */}
      <div className="relative h-[70vh] flex flex-col items-center justify-center text-center px-6 border-b border-white/5">
        <div className="absolute inset-0 opacity-30 grayscale">
            <img src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1200" className="w-full h-full object-cover" alt="Lagos Night" />
        </div>
        
        <div className="relative z-10">
          <h1 className="text-6xl md:text-[120px] font-black uppercase tracking-tighter leading-none mb-6">
            24-HOUR <br /><span className="text-[#00FF00]">DIGITAL STORE</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium mb-10">
            Push a button. Get a solution. Connecting local needs to verified Lagos vendors in real-time.
          </p>
        </div>
      </div>

      {/* Emergency & Quick Needs Row */}
      <div className="max-w-7xl mx-auto -mt-16 relative z-20 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {emergencies.map((item, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.95 }}
              className="bg-[#0a0a0a] border border-white/10 p-8 rounded-[32px] flex flex-col items-center gap-4 hover:border-[#00FF00] transition-all group"
            >
              <div className="p-4 bg-white/5 rounded-full group-hover:bg-[#00FF00]/10 transition-colors">
                {item.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white">
                {item.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

