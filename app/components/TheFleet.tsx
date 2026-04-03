"use client";
import { Truck, Navigation, PackageCheck } from "lucide-react";

export default function TheFleet() {
  return (
    <section id="fleet" className="bg-black py-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <h2 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8]">
              The <br /><span className="text-[#00FF00]">Fleet</span>
            </h2>
            <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-md">
              We bridge the gap between the screen and the street. When the button is pushed, our dispatch network moves—bypassing traffic to deliver in under 45 minutes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-3xl">
                  <Navigation className="text-[#00FF00] mb-3" size={20} />
                  <p className="text-white text-2xl font-black">50+</p>
                  <p className="text-gray-600 text-[10px] uppercase font-black tracking-widest">Nodes</p>
                </div>
                <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-3xl">
                  <Truck className="text-[#00FF00] mb-3" size={20} />
                  <p className="text-white text-2xl font-black">45m</p>
                  <p className="text-gray-600 text-[10px] uppercase font-black tracking-widest">Delivery</p>
                </div>
            </div>
          </div>

          <div className="relative aspect-square md:h-[600px] rounded-[60px] overflow-hidden border border-white/10 bg-[#111]">
            <img 
              src="https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg?auto=compress&cs=tinysrgb&w=1200" 
              className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
              alt="Fast Dispatch Bike Lagos"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 flex items-center gap-3 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <div className="w-2 h-2 bg-[#00FF00] rounded-full animate-pulse" />
              <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Active Dispatch</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}