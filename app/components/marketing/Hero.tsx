"use client";

import { motion } from "framer-motion";
import { MoveRight, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ButtonStrip from "./ButtonStrip";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-buttons-surface px-6 py-20">
      
      {/* 1. SEAMLESS PATTERN LAYER (Fixed for iPhone/Safari) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/illustrations/pattern.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "800px",
          backgroundPosition: "center",
          mixBlendMode: "overlay", 
          opacity: 0.3 
        }}
      />
      
      {/* 2. OPTIONAL: Secondary Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-african-pattern bg-repeat z-0" />
      
      <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE: BILLBOARD BRANDING */}
        <div className="flex flex-col items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* The Campaign Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-buttons-primary/10 text-gray-500 font-medium text-sm mb-8 mt-4 md:mt-0">
              <Zap size={16} />
              <span>The Campaign: Make Things Happen</span>
            </div>
            
            {/* Heavy Impact Headline */}
            <h1 className="text-[60px] md:text-[80px] font-black leading-[0.85] text-black tracking-tighter uppercase mb-2">
              What can we<br />
              <span className="text-buttons-primary">Get you?</span>
            </h1>

            {/* The Badge Section */}
           

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed font-medium">
             <strong>Food | Gas | Laundry | Groceries</strong> <br /> 
              Everything you need, just one press away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="https://forms.gle/MGMgkuyu6hJEJSjcA" className="group relative px-10 py-5 bg-black text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-buttons-glow">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started <MoveRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </motion.div>
         
        </div>

        {/* RIGHT SIDE: INTERACTIVE ILLUSTRATION */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center"
        >
          <div className="relative w-full aspect-square max-w-[500px]">
             <div className="absolute inset-0 bg-linear-to-tr from-buttons-primary to-buttons-accent rounded-3xl rotate-3 opacity-10 animate-pulse" />
             <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl rounded-3xl -rotate-3 border border-white/20" />
             
             <FloatingButton icon="🍲" label="Food" delay={0} top="10%" left="10%" />
             <FloatingButton icon="🧺" label="Laundry" delay={0.2} top="50%" left="-5%" />
             <FloatingButton icon="✂️" label="Salon" delay={0.4} bottom="15%" right="10%" />
          </div>
          <img src="/images/tab1.png" className="h-100 absolute" alt="" />
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