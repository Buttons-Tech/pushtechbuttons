"use client";
import { Plus, Zap, Rocket } from "lucide-react";

const tiers = [
  { 
    name: "SETUP", 
    tag: "Launch", 
    desc: "Landing Page + Digital Store + Branding + LTD Documentation.",
    icon: <Plus className="text-[#00FF00]" />,
    image: "https://images.pexels.com/photos/3182762/pexels-photo-3182762.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    name: "UPGRADE", 
    tag: "Power Up", 
    desc: "Mobile App + Inventory Automation + On-ground Data Centers.",
    icon: <Zap className="text-[#00FF00]" />,
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    name: "STARTUP", 
    tag: "Legacy", 
    desc: "Dedicated Dev Team + Market Validation + Full Office Setup.",
    icon: <Rocket className="text-[#00FF00]" />,
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

export default function BusinessTiers() {
  return (
    <section className="bg-black py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter mb-20 leading-none">
          Turn Ideas <br /><span className="text-[#00FF00]">Into Money.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <div key={i} className="group relative bg-[#0a0a0a] border border-white/5 rounded-[40px] overflow-hidden hover:border-[#00FF00]/50 transition-all duration-500">
              <div className="h-64 relative">
                <img src={tier.image} className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity" alt={tier.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              </div>
              <div className="p-10">
                <div className="flex items-center gap-3 mb-4">
                  {tier.icon}
                  <span className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">{tier.tag}</span>
                </div>
                <h3 className="text-white text-4xl font-black mb-6 tracking-tighter">{tier.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">{tier.desc}</p>
                <button className="w-full py-5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
                  Initialize Tier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}