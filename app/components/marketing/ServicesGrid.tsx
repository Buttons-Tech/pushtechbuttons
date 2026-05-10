"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  { title: "Salon", image: "/icons/salon.png", status: "Coming Soon" },
  { title: "Laundry", image: "/icons/laundry.png", status: "Coming Soon" },
  { title: "Gas", image: "/icons/gas.png", status: "Coming Soon" },
  { title: "Food", image: "/icons/food.png", status: "Active" },
];

export const ServicesGrid = () => {
  return (
    <section className="py-24 bg-buttons-primary relative overflow-hidden">
      {/* The Afro-Pattern Overlay */}
      <div className="absolute inset-0 bg-afro-pattern pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-white rounded-[60px] p-12 lg:p-20 shadow-2xl">
          <div className="grid grid-cols-2 gap-8 lg:gap-16">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center group"
              >
                <div className="relative w-32 h-32 lg:w-48 lg:h-48 mb-4">
                  {/* Subtle circle background like in the banner */}
                  <div className="absolute inset-0 bg-gray-50 rounded-full scale-90 group-hover:scale-100 transition-transform duration-500" />
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-contain relative z-10"
                  />
                </div>
                <span className="text-xl font-bold text-buttons-dark">{service.title}</span>
                {service.status === "Active" && (
                  <div className="mt-2 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};