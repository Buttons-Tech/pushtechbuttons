"use client";

import { motion } from "framer-motion";
import { MoveRight, Zap } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-buttons-surface px-6 py-20">
      {/* Background Decorative Pattern (African-Inspired) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-african-pattern bg-repeat z-0" />
      
      <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-buttons-primary/10 text-buttons-primary font-medium text-sm mb-6">
            <Zap size={16} />
            <span>The Campaign: Make Things Happen</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-buttons-dark leading-[1.1] mb-6">
            Lagos is Hard. <br />
            <span className="text-buttons-primary italic">Life shouldn't be.</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
            Buttons is the executive assistant for the busy Nigerian professional. 
            From jollof to laundry, one tap clears your mental desk.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/get-started" className="group relative px-8 py-4 bg-buttons-primary text-white rounded-xl font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-buttons-primary/20">
              <span className="relative z-10 flex items-center gap-2">
                Press the Button <MoveRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link href="/business" className="px-8 py-4 border-2 border-buttons-primary/20 text-buttons-primary rounded-xl font-bold hover:bg-buttons-primary/5 transition-colors text-center">
              Partner with Us
            </Link>
          </div>
        </motion.div>

        {/* Visual / The "Interactive Button" */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center"
        >
          {/* Main Hero Illustration Placeholder */}
          <div className="relative w-full aspect-square max-w-[500px]">
             {/* This is where your Afro-futurist illustration goes */}
             <div className="absolute inset-0 bg-gradient-to-tr from-buttons-primary to-buttons-accent rounded-3xl rotate-3 opacity-10 animate-pulse" />
             <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl rounded-3xl -rotate-3 border border-white/20" />
             
             {/* The "Floating Buttons" UI elements */}
             <FloatingButton icon="🍲" label="Food" delay={0} top="10%" left="10%" />
             <FloatingButton icon="🧺" label="Laundry" delay={0.2} top="50%" left="-5%" />
             <FloatingButton icon="✂️" label="Salon" delay={0.4} bottom="15%" right="10%" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FloatingButton = ({ icon, label, top, left, bottom, right, delay }: any) => (
  <motion.div 
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{ duration: 4, repeat: Infinity, delay }}
    className="absolute p-4 bg-white shadow-2xl rounded-2xl flex items-center gap-3 border border-gray-100 z-20"
    style={{ top, left, bottom, right }}
  >
    <span className="text-2xl">{icon}</span>
    <span className="font-bold text-buttons-dark">{label}</span>
  </motion.div>
);
