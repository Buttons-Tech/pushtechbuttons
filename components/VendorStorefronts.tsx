"use client";

import React from 'react';
import { Store, CheckCircle2, MessageCircle, Video, ShieldCheck } from 'lucide-react';

// Replace imageUrls with your exact Cloudinary vendor storefront or product photos
const VERIFIED_VENDORS = [
   {
    id: "ire-pearl",
    businessName: "Hireh-pearl Catering Services",
    ownerName: "@hireh_pearl",
    category: "food",
    whatsapp: "+2349080440701",
    tiktok: "Hirehpearlcateringservices",
    imageUrl: "/brand/ire_pearl.jpg",
    badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  {
    id: "bigger-bites",
    businessName: "Bigger Bites Restaurant",
    ownerName: "Aunty Cossy",
    category: "EAT",
    whatsapp: "+2349033811883",
    tiktok: "@biggerbites_isuti",
    imageUrl: "brand/elohor.jpg",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  {
    id: "son-of-mercy",
    businessName: "Son of Mercy Barber Salon",
    ownerName: "Barber Mercy",
    category: "HAIR",
    whatsapp: "+2349033811883",
    tiktok: "@sonofmercy_cuts",
    imageUrl: "brand/mercy.jpg",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  {
    id: "md-gas",
    businessName: "MD Gas Refill",
    ownerName: "Friday Mgbogo",
    category: "Refill",
    whatsapp: "+2349033811883",
    tiktok: "@mdgas_refill",
    imageUrl: "/brand/gas_refill.jpg",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
  },
  {
    id: "no-delay",
    businessName: "No Delay Laundry",
    ownerName: "Mr olatunji Ayobami",
    category: "Clean",
    whatsapp: "+2349033811883",
    tiktok: "@no_delaylaundry1",
    imageUrl: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=600&q=80",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  {
    id: "rhema-tigernut",
    businessName: "Rhema Tigernut Juice",
    ownerName: "Sister Rhema",
    category: "Drink",
    whatsapp: "+2349033811883",
    tiktok: "@rhema_tigernut",
    imageUrl: "/brand/tigernut-drink.jpg",
    badgeColor: "bg-lime-500/20 text-lime-400 border-lime-500/30",
  },
   {
    id: "Xhi-prints",
    businessName: "XHI Branding",
    ownerName: "@Xhig0xie",
    category: "Branding",
    whatsapp: "+2349033811883",
    tiktok: "@xhi_brand",
    imageUrl: "/brand/xhi.jpg",
    badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
 
];

export default function VendorStorefronts() {
  return (
    <section className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <Store className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-black text-gray-900 tracking-tight uppercase">
            Verified Vendors
          </h2>
        </div>
        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> Gate Verified
        </span>
      </div>

      {/* Swipeable Vendor Cards Slider */}
      <div 
        className="flex overflow-x-auto snap-x snap-mandatory space-x-3.5 pb-2 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {VERIFIED_VENDORS.map((vendor) => {
          const cleanPhone = vendor.whatsapp.replace(/[^0-9]/g, '');
          const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(vendor.businessName)},%20I%20found%20your%20shop%20on%20Buttns.`;

          return (
            <div
              key={vendor.id}
              className="snap-center shrink-0 w-[240px] bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between"
            >
              {/* Storefront Image & Owner Overlay */}
              <div className="relative h-32 w-full bg-zinc-900">
                <img
                  src={vendor.imageUrl}
                  alt={vendor.businessName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                {/* Verified Tag */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-[9px] font-black text-emerald-400">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Verified</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-2.5 right-2.5">
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md border ${vendor.badgeColor}`}>
                    {vendor.category.split('&')[0]}
                  </span>
                </div>

                {/* Owner Name Label */}
                <div className="absolute bottom-2 left-3 right-3">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-amber-400">
                    Owner: {vendor.ownerName}
                  </p>
                </div>
              </div>

              {/* Business Info & Social Links */}
              <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-black text-white leading-snug line-clamp-1">
                    {vendor.businessName}
                  </h3>

                  {/* TikTok Handle */}
                  <div className="flex items-center gap-1.5 mt-1 text-gray-400">
                    <Video className="w-3 h-3 text-pink-500" />
                    <span className="text-[10px] font-bold text-gray-300">{vendor.tiktok}</span>
                  </div>
                </div>

                {/* Action CTA: WhatsApp Direct Chat */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-black py-2 rounded-xl text-xs font-black transition-all active:scale-95 shadow-md shadow-emerald-500/20"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-black" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}