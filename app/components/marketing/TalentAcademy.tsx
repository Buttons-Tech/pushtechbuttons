"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, GraduationCap, X, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const TalentAcademy = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="bg-black py-6 md:py-8 overflow-hidden relative">
        {/* Subtle Pattern overlay to match the branding */}
        <div className="absolute inset-0 opacity-10 bg-afro-pattern pointer-events-none" />
        
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-buttons-accent rounded-full flex items-center justify-center text-black flex-shrink-0">
              <GraduationCap size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-white font-black uppercase tracking-tighter text-xl md:text-2xl">
                Buttons Talent Academy <span className="text-buttons-accent">1.0</span>
              </h3>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                NYSC & Graduate Engineering Track • Lagos, Nigeria
              </p>
            </div>
          </div>

          <button 
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 bg-white text-black px-8 py-3 rounded-full font-bold uppercase text-sm transition-all hover:bg-buttons-accent hover:scale-105 active:scale-95"
          >
            Learn More & Apply <MoveRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* THE MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-20"
              >
                <X size={24} className="text-black" />
              </button>

              <div className="p-8 md:p-12">
                <span className="text-buttons-accent font-black uppercase text-xs tracking-[0.2em]">The Mission</span>
                <h2 className="text-4xl font-[900] text-black uppercase tracking-tighter mt-2 mb-6">
                  Don't Just Serve. <span className="text-buttons-primary">Build.</span>
                </h2>
                
                <p className="text-gray-600 font-medium mb-8 leading-relaxed">
                  Join the elite cohort of Nigerian developers and designers building the future of Buttons. This isn't just a course—it's your entry into the Buttons internal product teams.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  <ModalFeature text="MERN Stack & Python Dev" />
                  <ModalFeature text="Internal Internship Path" />
                  <ModalFeature text="Product Management Basics" />
                  <ModalFeature text="Industry-Standard Portfolio" />
                </div>

                <div className="bg-gray-50 p-6 rounded-3xl flex items-center justify-between border border-gray-100">
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Investment</p>
                    <p className="text-2xl font-black text-black">₦250,000</p>
                  </div>
                  <button className="bg-buttons-primary text-white px-8 py-4 rounded-2xl font-bold uppercase text-sm shadow-lg shadow-buttons-primary/20 hover:scale-105 transition-transform">
                    Start Application
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const ModalFeature = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
    <CheckCircle2 size={18} className="text-buttons-primary" />
    <span className="text-sm font-bold text-black uppercase tracking-tight">{text}</span>
  </div>
);