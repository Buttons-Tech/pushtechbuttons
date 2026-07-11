"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Clock, Star } from "lucide-react";
// DATA WITH REAL IMAGE CONTEXT
const DATA: any = {
  Food: {
    vendors: [
      {
        id: "f1",
        name: "Bigger Bites",
        img: "https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?auto=format&fit=crop&w=300&q=80",
        tag: "Healthy",
      },
      {
        id: "f2",
        name: "Global Taste",
        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80",
        tag: "Hot Hot",
      },
      {
        id: "f3",
        name: "Egan Grills",
        img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=300&q=80",
        tag: "Street Food",
      },
    ],
    phases: ["Menu1", "Menu2", "Menu3"],
    packs: {
      Menu3: [
        {
          id: "p1",
          name: "Snacking",
          price: "₦2,500",
          options: ["Sharwarma", "Suya", "Meat pie"],
          extras: ["Egusi", "Oha"],
        },
        
      ],
       Menu2: [
        {
          id: "p1",
          name: "The Swallow Pack",
          price: "₦4,500",
          options: ["Eba", "Amala", "Pounded Yam"],
          extras: ["Egusi", "Oha"],
        },
        
      ],
       Menu1: [
        {
          id: "p1",
          name: "Party Rice",
          price: "₦7,500",
          options: ["Fried", "White", "Jollof"],
          extras: ["Egusi", "Oha"],
        },
        
      ],
    },
  },
  Gas: {
    vendors: [
      {
        id: "g1",
        name: "TotalEnergies",
        img: "https://images.unsplash.com/photo-1563200022-df76757434f0?auto=format&fit=crop&w=300&q=80",
        tag: "Premium",
      },
      {
        id: "g2",
        name: "Oando",
        img: "https://images.unsplash.com/photo-1581092921461-7d655083f234?auto=format&fit=crop&w=300&q=80",
        tag: "Reliable",
      },
      {
        id: "g3",
        name: "NNPC",
        img: "https://images.unsplash.com/photo-1542362567-b052d3a39e8a?auto=format&fit=crop&w=300&q=80",
        tag: "Federal",
      },
    ],
    phases: ["Refill", "New Cylinder"],
    packs: {
      Refill: [
        {
          id: "gp1",
          name: "Quick Refill",
          price: "₦1,200/kg",
          options: ["6kg", "12.5kg", "25kg"],
          extras: ["Hose Fix"],
        },
      ],
    },
  },
};

export const ServiceDrawer = ({ isOpen, onClose, title }: any) => {
  const serviceData = DATA?.[title] || DATA.Food;
  const [activeVendor, setActiveVendor] = useState(serviceData.vendors[0].id);
  const [activePhase, setActivePhase] = useState("Lunch");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100]"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] rounded-t-[50px] z-[101] max-h-[96vh] overflow-hidden flex flex-col border-t border-white/10"
          >
            {/* 1. KITCHEN/VENDOR BANNER SLIDE (REAL IMAGES) */}
            <div className="pt-10 pb-6 overflow-x-auto no-scrollbar flex gap-6 px-8">
              {serviceData.vendors.map((v: any) => (
                <motion.button
                  key={v.id}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveVendor(v.id)}
                  className={`relative flex-shrink-0 w-44 h-36 rounded-[32px] overflow-hidden transition-all border-2 ${activeVendor === v.id ? "border-buttons-primary ring-4 ring-buttons-primary/20 scale-105" : "border-white/5 opacity-40"}`}
                >
                  <img
                    src={v.img}
                    alt={v.name}
                    className="absolute inset-0 w-full h-20 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-left">
                    <p className="text-[10px] font-black uppercase text-buttons-accent mb-1">
                      {v.tag}
                    </p>
                    <p className="text-sm font-black uppercase text-white leading-none">
                      {v.name}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto px-8 pb-20">
              {/* 2. PHASE TABS (WAKANDA VIBE) */}
              <div className="flex bg-white/5 p-1.5 rounded-2xl mb-8 border border-white/10">
                {serviceData.phases.map((phase: string) => (
                  <button
                    key={phase}
                    onClick={() => setActivePhase(phase)}
                    className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activePhase === phase ? "bg-buttons-primary text-white shadow-lg shadow-buttons-primary/30" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    {phase}
                  </button>
                ))}
              </div>

              {/* 3. THE PACKS (THE CORE ACTION) */}
              <div className="space-y-6">
                {serviceData.packs[activePhase]?.map((pack: any) => (
                  <div
                    key={pack.id}
                    className="p-8 rounded-[40px] bg-white/5 border border-white/10 relative overflow-hidden group"
                  >
                    {/* Accent Glow */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-buttons-primary/10 blur-[50px] group-hover:bg-buttons-primary/20 transition-all" />

                    <div className="flex justify-between items-start mb-10">
                      <h4 className="text-3xl font-[900] uppercase text-white tracking-tighter leading-none">
                        {pack.name}
                      </h4>
                      <span className="font-black text-buttons-accent text-xl">
                        {pack.price}
                      </span>
                    </div>

                    {/* Options with "Toggle" style */}
                    {pack.options && (
                      <div className="space-y-8">
                        <div>
                          <p className="text-[10px] font-black uppercase text-gray-500 mb-4 tracking-widest">
                            Swap Choice
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {pack.options.map((opt: string) => (
                              <button
                                key={opt}
                                className="px-6 py-3 rounded-2xl text-[11px] font-black uppercase bg-white/5 text-gray-300 border border-white/10 hover:border-buttons-primary active:bg-buttons-primary transition-all"
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <button className="w-full mt-10 py-6 bg-white text-black rounded-3xl font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 active:scale-95 transition-all shadow-2xl">
                      <ShoppingBag size={18} /> Confirm Order
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
