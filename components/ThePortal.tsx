"use client";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ThePortal() {
  return (
    <section id="portal" className="bg-black py-32 px-6">
      <div className="max-w-4xl mx-auto bg-[#0a0a0a] border border-[#00FF00]/20 rounded-[40px] p-10 md:p-20 text-center relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#00FF00]/10 blur-[100px] rounded-full" />
        
        <div className="relative z-10">
          <h2 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
            Enter the <br /><span className="text-[#00FF00]">Portal</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12 font-medium">
            Ready to deploy your infrastructure? Drop your contact below. 
            Our lead engineers will reach out within 2 hours.
          </p>

          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Business Email or Phone" 
              className="flex-grow bg-black border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00FF00] transition-colors"
              required
            />
            <button className="bg-[#00FF00] text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 active:scale-95 transition-all">
              Initialize <Send size={14} />
            </button>
          </form>
          
          <p className="mt-8 text-gray-600 text-[10px] uppercase font-black tracking-[0.2em]">
            24-Hour Deployment Guarantee
          </p>
        </div>
      </div>
    </section>
  );
}