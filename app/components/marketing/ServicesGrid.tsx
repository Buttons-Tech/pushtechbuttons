"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { ServiceDrawer } from "./ServiceDrawer"; // Ensure the path is correct

const services = [
  { id: "food", title: "Food", image: "/icons/food.png", color: "#FF8C00", desc: "Canteen & Delivery" },
  { id: "gas", title: "Gas", image: "/icons/gas.png", color: "#4CAF50", desc: "Instant Refill" },
  { id: "laundry", title: "Laundry", image: "/icons/laundry.png", color: "#2196F3", desc: "Wash & Fold" },
  { id: "salon", title: "Salon", image: "/icons/salon.png", color: "#9C27B0", desc: "Barber & Beauty" },
];

export const ServicesGrid = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Preload the click sound
  useEffect(() => {
    audioRef.current = new Audio("/sounds/click.mp3");
  }, []);

  const handlePress = (id: string) => {
    // 1. Trigger Sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {}); // Catch prevents errors if browser blocks audio
    }

    // 2. Trigger Haptic (Vibration) - Works on Android/Chrome
    if (typeof window !== "undefined" && window.navigator.vibrate) {
      window.navigator.vibrate(50); 
    }

    // 3. Open the Drawer
    setActiveService(id);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-10 pl-2">
          <h2 className="text-4xl font-[900] text-black tracking-tighter uppercase leading-none">
            Your Community <br />
            <span className="text-buttons-primary">At your fingertips.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.96 }}
              onClick={() => handlePress(service.id)}
              className="relative w-full flex items-center justify-between p-6 bg-gray-50 rounded-[32px] border-b-4 border-gray-200 active:border-b-0 active:translate-y-1 transition-all overflow-hidden group"
            >
              <div className="flex items-center gap-5 z-10">
                <div className="relative w-20 h-20 flex-shrink-0">
                   <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                   >
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      width={80}
                      height={80}
                      style={{ height: 'auto' }}
                      className="object-contain drop-shadow-xl"
                    />
                   </motion.div>
                </div>

                <div className="text-left">
                  <h3 className="text-2xl font-black text-black uppercase tracking-tighter leading-none">
                    {service.title}
                  </h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                    {service.desc}
                  </p>
                </div>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm z-10">
                <MoveRight size={20} className="text-buttons-primary" />
              </div>

              <div 
                className="absolute right-0 top-0 w-24 h-full opacity-5 pointer-events-none" 
                style={{ backgroundColor: service.color, maskImage: 'linear-gradient(to left, black, transparent)' }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* The Universal Drawer */}
      <ServiceDrawer 
        isOpen={activeService !== null} 
        onClose={() => setActiveService(null)} 
        title={activeService || "Food"} 
      />
    </section>
  );
};