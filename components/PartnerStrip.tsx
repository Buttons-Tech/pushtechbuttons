"use client";

import React from 'react';

// Replace imageUrl with your exact Cloudinary logo asset links
const PARTNERS = [
  {
    name: "FirstBank",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg", 
  },
  {
    name: "NNPC",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
  },
  {
    name: "Nigerian Police",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
  },
  {
    name: "Alimosho Local Government",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
  },
];

export default function PartnerStrip() {
  // Doubling the array guarantees a seamless infinite scroll loop
  const duplicatedPartners = [...PARTNERS, ...PARTNERS];

  return (
    <section className="bg-black border-y border-zinc-800 py-3 overflow-hidden">
      <div className="max-w-md mx-auto relative">
        
        {/* Subtle Fade Gradients on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-2 px-4 mb-1.5">
          <span className="text-[9px] font-black uppercase text-amber-500 tracking-widest">
            Key Ecosystem Partners
          </span>
        </div>

        {/* Scrolling Track */}
        <div className="flex w-max animate-marquee space-x-6 items-center">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center gap-2.5 bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-full shrink-0"
            >
              <img
                src={partner.imageUrl}
                alt={partner.name}
                className="w-5 h-5 rounded-full object-cover border border-amber-500/40"
              />
              <span className="text-xs font-bold text-gray-200 whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}