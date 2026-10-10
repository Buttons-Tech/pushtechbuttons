"use client";

import Image from "next/image";
import React from "react";

// Replace imageUrl with your exact Cloudinary logo asset links
const PARTNERS = [
  {
    name: "Paatee",
    imageUrl:
      "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
  },
  {
    name: "Buttns_Egan",
    imageUrl:
      "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
  },
  {
    name: "Dreambox",
    imageUrl:
      "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
  },
  {
    name: "Alimosho Local Government",
    imageUrl:
      "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
  },
  {
    name: "MTN",
    imageUrl:
      "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
  },
];

export default function ButtnsTab() {
  // Doubling the array guarantees a seamless infinite scroll loop
  const duplicatedPartners = [...PARTNERS, ...PARTNERS];

  return (
    <section className="bg-[#0c0d1b] border-y border-zinc-800 py-3 overflow-hidden">
      <div className="max-w-md mx-auto relative">
        <div className="flex ">
          <Image height={100} width={200} alt="push_l" src="/brand/push.png" />

          <div className="flex items-center gap-2 px-4 mb-1.5 bg-black">
            <span className="text-[9px] font-black uppercase text-white  tracking-widest">
              Launched Products (in-house)
            </span>
          </div>
        </div>

        {/* Subtle Fade Gradients on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-400 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-amber-400 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex w-max animate-marquee space-x-6 items-center">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center gap-2.5 bg-lime-500/90 border border-lime-200 px-3.5 py-1.5 rounded-full shrink-0"
            >
              <img
                src={partner.imageUrl}
                alt={partner.name}
                className="w-5 h-5 rounded-full object-cover border border-black/40"
              />
              <span className="text-xs font-bold  whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
