"use client";
import { Zap, ShieldCheck, Globe } from "lucide-react";

const plans = [
  { 
    tier: "SME PUSH", 
    price: "₦150k", 
    image: "https://images.unsplash.com/photo-1556740734-7f3a74304856?q=80&w=800",
    icon: <Zap color="#00FF00" />,
    features: ["24h Setup", "WhatsApp Orders"] 
  },
  { 
    tier: "LTD CORE", 
    price: "₦500k", 
    featured: true,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
    icon: <ShieldCheck color="#00FF00" />,
    features: ["Inventory Automation", "LTD Status"] 
  },
  { 
    tier: "INFRASTRUCTURE", 
    price: "CUSTOM", 
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800",
    icon: <Globe color="#ffffff" />,
    features: ["Multi-Store", "24/7 Fleet"] 
  }
];

export default function Pricing() {
  return (
    <section className="bg-black py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-5xl font-black uppercase tracking-tighter mb-20">Deployment Tiers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <div key={i} className={`relative overflow-hidden rounded-[40px] border ${plan.featured ? 'border-[#00FF00]' : 'border-white/10'} bg-[#0a0a0a]`}>
              {/* Image Anchor */}
              <div className="h-48 relative">
                <img src={plan.image} className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              </div>

              <div className="p-10 pt-4">
                <div className="mb-4">{plan.icon}</div>
                <h3 className="text-gray-500 text-[10px] font-black tracking-widest uppercase mb-2">{plan.tier}</h3>
                <p className="text-white text-5xl font-black mb-8 tracking-tighter">{plan.price}</p>
                
                <ul className="space-y-4 mb-12">
                  {plan.features.map((f, j) => (
                    <li key={j} className="text-gray-400 text-sm font-bold flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-[#00FF00] rounded-full" /> {f}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all ${plan.featured ? 'bg-[#00FF00] text-black' : 'bg-white text-black'}`}>
                  Push Setup
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}