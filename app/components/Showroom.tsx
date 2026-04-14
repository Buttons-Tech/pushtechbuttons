"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap, Users } from "lucide-react";

const products = [
  {
    name: "DREAMBOX",
    tag: "EdTech",
    desc: "A virtual school ecosystem providing additive tech education for children across 4 countries. Coding, robotics, and creative design in one box.",
    icon: <GraduationCap className="text-[#00FF00]" size={24} />,
    image: "https://images.pexels.com/photos/5428830/pexels-photo-5428830.jpeg?auto=compress&cs=tinysrgb&w=1200",
    link: "#"
  },
  {
    name: "BLOOM",
    tag: "HR / Recruitment",
    desc: "The teacher replacement gap solved. A high-speed repository of verified digital CVs connecting schools to the best educators in Lagos.",
    icon: <Users className="text-[#00FF00]" size={24} />,
    image: "https://images.pexels.com/photos/5212338/pexels-photo-5212338.jpeg?auto=compress&cs=tinysrgb&w=1200",
    link: "#"
  }
];

export default function Showroom() {
  return (
    <section id="ventures" className="bg-black py-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-white text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-none">
            In-House <br /><span className="text-[#00FF00]">Ventures</span>
          </h2>
          <p className="text-gray-500 uppercase font-black tracking-[0.4em] text-[10px]">Proof of Capability</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {products.map((p, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group relative rounded-[48px] overflow-hidden bg-[#0a0a0a] border border-white/10 aspect-[4/5] md:aspect-video"
            >
              <img src={p.image} className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10">{p.icon}</div>
                  <span className="text-[10px] font-black text-[#00FF00] tracking-widest uppercase">{p.tag}</span>
                </div>
                <h3 className="text-white text-5xl font-black mb-4 tracking-tighter uppercase">{p.name}</h3>
                <p className="text-gray-400 text-sm max-w-sm font-medium mb-8 leading-relaxed">{p.desc}</p>
                <button className="flex items-center gap-2 text-white font-black uppercase text-[10px] tracking-widest hover:text-[#00FF00] transition-colors">
                  Open Application <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}