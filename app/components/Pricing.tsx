"use client";
import { Zap, ShieldCheck, Globe, ArrowRight } from "lucide-react";

const plans = [
  { 
    tier: "SME PUSH", 
    price: "₦150k", 
    image: "https://images.pexels.com/photos/1727684/pexels-photo-1727684.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: <Zap color="#00FF00" size={18} />,
    features: ["24h Setup", "WhatsApp Direct"] 
  },
  { 
    tier: "LTD CORE", 
    price: "₦500k", 
    featured: true,
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: <ShieldCheck color="#00FF00" size={18} />,
    features: ["Inventory Logic", "LTD Status"] 
  },
  { 
    tier: "ENTERPRISE", 
    price: "CUSTOM", 
    image: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: <Globe color="#ffffff" size={18} />,
    features: ["Multi-Store Fleet", "24/7 Priority"] 
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-4xl md:text-7xl font-black uppercase tracking-tighter mb-12">
          The <span className="text-[#00FF00]">Tiers</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <div key={i} className={`flex flex-col rounded-[32px] overflow-hidden border ${plan.featured ? 'border-[#00FF00]' : 'border-white/10'} bg-[#0a0a0a] max-w-sm mx-auto w-full`}>
              
              {/* Image Section: Reduced height, Fill-focus, Low Overlay */}
              <div className="h-48 w-full relative">
                <img 
                  src={plan.image} 
                  className="w-full h-full object-cover grayscale opacity-80" 
                  alt={plan.tier} 
                />
                {/* Minimal Overlay - just enough to transition to the black card */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
              </div>

              {/* Content Section: Tightened Padding */}
              <div className="p-7 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  {plan.icon}
                  <span className="text-gray-500 text-[9px] font-black tracking-[0.2em] uppercase">{plan.tier}</span>
                </div>
                
                <p className="text-white text-4xl font-black mb-6 tracking-tighter">{plan.price}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="text-gray-400 text-xs font-bold flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#00FF00] rounded-full" /> {f}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 active:scale-95 transition-all ${plan.featured ? 'bg-[#00FF00] text-black' : 'bg-white text-black'}`}>
                  Push Setup <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}