"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Globe, Store, ChevronRight } from "lucide-react";

export default function OriginStory({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col overflow-y-auto custom-scrollbar"
        >
          {/* Close Button */}
          <button onClick={onClose} className="fixed top-10 right-10 z-[110] p-4 bg-white/5 rounded-full text-white">
            <X size={24} />
          </button>

          <div className="max-w-4xl mx-auto px-6 py-24 text-center">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <span className="text-[#00FF00] text-[10px] font-black tracking-[0.5em] uppercase mb-8 block">Our Genesis</span>
              <h2 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-12">
                Connecting <br />The <span className="text-[#00FF00]">Heartbeat.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 text-left">
              <div className="space-y-6 text-gray-400 text-lg font-medium leading-relaxed">
                <p>
                  Imagine a community where your neighbor’s business isn't just a shop on the corner—it's a node in a digital network. In Lagos, we saw the gap. Vendors had the products; you had the needs. But the bridge was broken.
                </p>
                <p className="text-white font-bold">
                  We are building the platform to make that connection instant. From the gas refill at 9 PM to the security alert at 3 AM.
                </p>
              </div>
              <div className="rounded-[40px] overflow-hidden border border-white/10 aspect-square relative">
                <img src="https://images.pexels.com/photos/2952871/pexels-photo-2952871.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover grayscale opacity-60" alt="Local Vendor" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-[#00FF00]/20 rounded-[48px] p-12 mb-20">
              <h3 className="text-white text-3xl font-black uppercase tracking-tighter mb-8">
                Building Buttons to the City.
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="flex flex-col items-center gap-4">
                  <Store className="text-[#00FF00]" size={32} />
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 text-center">Support Local SMEs</p>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Heart className="text-[#00FF00]" size={32} />
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 text-center">Community Growth</p>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Globe className="text-[#00FF00]" size={32} />
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 text-center">Global Tech Standards</p>
                </div>
              </div>
            </div>

            {/* The Dual CTAs */}
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button className="bg-[#00FF00] text-black px-12 py-6 rounded-[24px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 active:scale-95 transition-all">
                Join as Vendor <ChevronRight size={18} />
              </button>
              <button onClick={onClose} className="border border-white/20 text-white px-12 py-6 rounded-[24px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 active:scale-95 transition-all hover:bg-white/5">
                Explore Buttons
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}