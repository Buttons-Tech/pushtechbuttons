"use client";
import { motion } from "framer-motion";
import { Smartphone, Zap, ShieldCheck } from "lucide-react";

interface Feature {
  title: string;
  desc: string;
  icon: React.ReactNode;
  image: string;
}

const features: Feature[] = [
  {
    title: "WhatsApp Automation",
    desc: "From 'Interested' to 'Paid' in 2 taps. Every order arrives as a formatted invoice in your WhatsApp Business account.",
    icon: <Smartphone className="text-[#00FF00]" size={32} />,
    // Cloudinary Hosted - Stable Business Asset
    image: "https://res.cloudinary.com/dytp7asv4/image/upload/v1711200000/buttons-tech/whatsapp-biz.jpg" 
  },
  {
    title: "Inventory Intelligence",
    desc: "Manage 1,000+ items from a mobile dashboard. Real-time stock tracking that never sleeps.",
    icon: <Zap className="text-[#00FF00]" size={32} />,
    image: "https://res.cloudinary.com/dytp7asv4/image/upload/v1711200000/buttons-tech/inventory.jpg" 
  },
  {
    title: "LTD Trust Shield",
    desc: "Every storefront is backed by our corporate legal status. We verify your business identity for customer safety.",
    icon: <ShieldCheck className="text-[#00FF00]" size={32} />,
    image: "https://res.cloudinary.com/dytp7asv4/image/upload/v1711200000/buttons-tech/legal.jpg"
  }
];

export default function Infrastructure() {
  return (
    <section id="infrastructure" className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8]">
            The <br /><span className="text-[#00FF00]">Infrastructure</span>
          </h2>
        </div>

        <div className="space-y-40">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-center`}
            >
              {/* Image Side with Fallback */}
              <div className="w-full md:w-1/2 aspect-video rounded-[40px] overflow-hidden border border-white/10 bg-[#111] relative">
                <img 
                  src={f.image} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 opacity-60" 
                  alt={f.title}
                  onError={(e) => {
                    // Fallback to a solid brand color if the CDN fails
                    e.currentTarget.src = "https://placehold.co/800x450/0a0a0a/00FF00?text=Buttons+Tech+LTD";
                  }}
                />
              </div>

              <div className="w-full md:w-1/2 space-y-8">
                <div className="p-4 bg-white/5 w-fit rounded-2xl border border-white/10">{f.icon}</div>
                <h3 className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase leading-tight">
                  {f.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md font-medium">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}