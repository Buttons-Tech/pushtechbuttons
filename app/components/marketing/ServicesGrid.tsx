"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { ServiceDrawer } from "./ServiceDrawer"; // Ensure the path is correct
import ButtonStrip from "./ButtonStrip";
import { div } from "framer-motion/client";

const services = [
  {
    id: "food",
    title: "Food",
    image: "/icons/food.png",
    color: "#FF8C00",
    desc: "Canteen & Delivery",
  },
  {
    id: "gas",
    title: "Gas",
    image: "/icons/gas.png",
    color: "#4CAF50",
    desc: "Instant Refill",
  },
  {
    id: "laundry",
    title: "Wash",
    image: "/icons/laundry.png",
    color: "#2196F3",
    desc: "Wash & Fold",
  },
  {
    id: "salon",
    title: "Salon",
    image: "/icons/salon.png",
    color: "#9C27B0",
    desc: "Barber & Beauty",
  },
];

const vendors = [
  {
    id: "lite_gas",
    handle: "@lite_gas",
    image: "/images/lite_gas.jpg",
    shop: "lite_gas",
    location: "234 Isuti RD"
  },
  {
    id: "global_taste",
    handle: "@global_taste",
    image: "/images/taste.jpg",
    shop: "global_taste",
    location: "004 Isuti RD"
  },
  {
    id: "SonofMercy_barbershop",
    handle: "@SonofMercy_barbershop",
    image: "/images/mercy.jpeg",
    shop: "SonofMercy_barbershop",
    location: "115 Isuti RD"
  },
  {
    id: "oluwaWash",
    handle: "@oluwaWash",
    image: "/images/wash.jpeg",
    shop: "oluwaWash",
    location: "001 Isuti RD"
  },
];

export const ServicesGrid = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeColor, setActiveColor] = useState(false);
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
    <section className=" bg-white">
      <div className="container mx-auto px-4 mt-2  ">
        <div className="mb-10  text-center my-15 ">
          <div className="flex flex-wrap gap-8 items-center justify-center">
         
         {/* i do not know how to map */}

         {vendors.map((v, index)=>(
           <div className="w-50 h-70 bg-amber-200 rounded-xl " key={v.id}>
              <div>
                <span className="bg-amber-300 block relative bottom-0 font-bold text-amber-900">
                 {v.handle}
                </span>
                <div className="relative shrink-0">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    <Image
                      src={v.image}
                      alt={v.id}
                      width={100}
                      height={100}
                      style={{ height: "auto" }}
                      className="object-contain drop-shadow-xl rounded-full"
                    />
                  </motion.div>
                </div>
                  <div className="bg-white  w-40">
                    <span className="font-bold"> Shop: <span className="font-light">{v.shop}</span></span><br />
                    <span className="font-bold">Location</span><br />
                    <span>{v.location}</span>
                  </div>

              </div>
            </div>
         ))}

           


          </div>
          {/* <div h-50 w-50 bg-white ></div> */}
          <h2 className="text-4xl font-black text-black  tracking-tighter uppercase leading-none mt-6">
            Your Community.
            <br />
            <span className="text-amber-600">Real People.</span>
            <br />
            <button className="bg-lime-500 text-black mt-15 w-full h-15  rounded-2xl border">
              TAP IN!
            </button>
          </h2>
        </div>
        <ButtonStrip />

        <div className="grid grid-cols-2 mt-10 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.96 }}
              onClick={() => handlePress(service.id)}
              className="relative    p-6 bg-amber-300  rounded-4xl border-b-4 border-gray-200 active:border-b-0 active:translate-y-1 transition-all overflow-hidden group"
            >
              <div className=" items-center gap-5 z-10">
                <div className="relative shrink-0">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={100}
                      height={100}
                      style={{ height: "auto" }}
                      className="object-contain drop-shadow-xl rounded-full"
                    />
                  </motion.div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-black text-black uppercase tracking-tighter leading-none">
                    {service.title}
                  </h3>
                  <p className="text-[10px] font-bold text-gray-800 uppercase tracking-widest mt-1">
                    {service.desc}
                  </p>
                </div>
              </div>

              <div
                className="absolute right-0 top-0 w-24 h-full opacity-5 pointer-events-none"
                style={{
                  backgroundColor: service.color,
                  maskImage: "linear-gradient(to left, black, transparent)",
                }}
              />
            </motion.button>
          ))}
        </div>
      </div>
      <div className="relative w-2xl mt-5    p-6 bg-amber-300 md:w-full rounded-4xl border-b-4 border-gray-200 active:border-b-0 active:translate-y-1 transition-all overflow-hidden group mx-3">
        <div className="text-center">
          <h3 className="text-2xl font-black text-black uppercase tracking-tighter leading-none">
            More
          </h3>
          <p className="text-[10px] font-bold text-gray-800 uppercase tracking-widest mt-1">
            Schools | Hospitals | Security
          </p>
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
