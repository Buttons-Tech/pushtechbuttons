"use client";
import { useState } from "react";
import { Plus, Zap, Rocket, ArrowRight } from "lucide-react";
import TierModal from "./TierModal"; // Ensure your Modal is imported
import { tierDetails } from "../../constants"; // The data above

const tiers = [
  { 
    id: "SETUP", 
    tag: "Launch", 
    price: "₦150k",
    desc: "For new vendors needing a professional entry into the Lagos market.",
    icon: <Plus className="text-[#00FF00]" />,
    image: "https://images.pexels.com/photos/3182762/pexels-photo-3182762.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    id: "UPGRADE", 
    tag: "Power Up", 
    price: "₦500k",
    desc: "Transform your existing legacy site into a high-performance management engine.",
    icon: <Zap className="text-[#00FF00]" />,
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    id: "STARTUP", 
    tag: "Legacy", 
    price: "CUSTOM",
    desc: "For governments and founders building a full-scale institution from scratch.",
    icon: <Rocket className="text-[#00FF00]" />,
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

export default function BusinessTiers() {
  const [activeTier, setActiveTier] = useState<string | null>(null);

  return (
    <section className="bg-black py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
            <h2 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
              Turn Ideas <br /><span className="text-[#00FF00]">Into Money.</span>
            </h2>
            <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">Select a Category to Initialize</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div 
              key={tier.id} 
              className="group relative bg-[#0a0a0a] border border-white/5 rounded-[48px] overflow-hidden hover:border-[#00FF00]/30 transition-all duration-500"
            >
              <div className="h-56 relative overflow-hidden">
                <img 
                   src={tier.image} 
                   className="w-full h-full object-cover grayscale opacity-30 group-hover:scale-110 transition-transform duration-1000" 
                   alt={tier.id} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              </div>

              <div className="p-10">
                <div className="flex items-center gap-3 mb-4">
                  {tier.icon}
                  <span className="text-[10px] font-black tracking-[0.4em] text-gray-500 uppercase">{tier.tag}</span>
                </div>
                <h3 className="text-white text-4xl font-black mb-4 tracking-tighter">{tier.id}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-10 h-12 overflow-hidden">{tier.desc}</p>
                
                {/* Mobile-First Interactive Button */}
                <button 
  onClick={() => setActiveTier(tier.id)}
  className="w-full py-6 bg-white text-black rounded-[24px] font-black uppercase tracking-widest text-[9px] 
             flex items-center justify-center gap-3 
             active:scale-95 active:bg-[#00FF00] active:shadow-[0_0_20px_#00FF00]
             transition-all duration-150 touch-manipulation"
>
  Initialize {tier.id} <ArrowRight size={14} />
</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Integration */}
      {activeTier && (
        <TierModal 
          isOpen={!!activeTier} 
          onClose={() => setActiveTier(null)} 
          tierName={activeTier}
          price={tiers.find(t => t.id === activeTier)?.price || ""}
          details={tierDetails[activeTier as keyof typeof tierDetails]}
        />
      )}
    </section>
  );
}