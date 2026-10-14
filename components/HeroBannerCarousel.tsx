"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Flame,
  Gamepad2,
  ArrowRight,
  Calendar,
  MapPin,
} from "lucide-react";
import Image from "next/image";

const BANNERS = [
  {
    id: "intro-buttns",
    badge: "Hello Egan",
    badgeIcon: Sparkles,
    badgeBg: "bg-green-300 text-black",
    title: "Introducing BUTTNS.",
    subtitle:
      "Chop Food, Wash anything, Style Yourself & More | Exact Prices | 10 Mins Delivery |",
    ctaText: "PUSH",
    ctaHref: "/get-started",
    bgImage: "/banner/screensht.png",
    overlayGradient: "from-[#030630] via-[#030630] to-green-500",
  },
  {
    id: "ija-ember",
    badge: "Ija Activation!",
    badgeIcon: Flame,
    badgeBg: "bg-amber-500 text-black",
    title: "WIN Free food, data & recharge!",
    subtitle: "Push the button and win yourself a spin on the wheel of furtune",
    ctaText: "PUSH",
    ctaHref: "/dispatch",
    bgImage: "/food/food.jpeg",
    overlayGradient: "from-[#5f4704] via-amber-950/90 to-amber-300",
  },
  {
    id: "game-of-codes",
    badge: "SATURDAYS",
    badgeIcon: Gamepad2,
    badgeBg: "bg-purple-300 text-black",
    title: "DreamBox School Club",
    subtitle:
      "Join the ultimate tech & talent club in Egan . Create Rockets & Robots!",
    ctaText: "Register",
    ctaHref: "/tournaments/Egan-Got-Talents",
    bgImage: "/banner/dreambx.jpg",
    overlayGradient: "from-[#030630] via-purple-950/90 to-purple-500",
  },
];

export default function HeroBannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-advance banner every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % BANNERS.length;
      scrollToIndex(nextIndex);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const width = container.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (
      newIndex >= 0 &&
      newIndex < BANNERS.length &&
      newIndex !== currentIndex
    ) {
      setCurrentIndex(newIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const width = container.clientWidth;
    container.scrollTo({
      left: index * width,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  return (
    <section className="relative group">
      {/* Swipeable Banner Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none rounded-3xl"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {BANNERS.map((banner) => {
          const BadgeIcon = banner.badgeIcon;

          return (
            <div
              key={banner.id}
              className="snap-center shrink-0 w-full relative min-h-[220px] max-h-[260px] rounded-3xl overflow-hidden bg-black text-white p-5 flex flex-col justify-between border border-zinc-800 shadow-xl"
            >
              {/* Background Image with Dark Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${banner.bgImage})` }}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${banner.overlayGradient}`}
              />

              {/* Banner Top Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${banner.badgeBg}`}
                >
                  <BadgeIcon className="w-3 h-3 fill-current" />
                  {banner.badge}
                </span>

                {banner.id === "ija-ember" && (
                  <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full border border-amber-500/30">
                    <MapPin className="w-3 h-3" /> Food, Data
                  </span>
                )}

                {banner.id === "game-of-codes" && (
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <Calendar className="w-3 h-3" /> Age 3+
                  </span>
                )}
              </div>

              {/* Banner Body Content */}
              <div className="flex justify-between" >
                
                <div className="relative z-10 space-y-1 w-50 my-2">
<h2 className="text-xl font-black text-white leading-tight tracking-tight">
                  {banner.title}
                </h2>
                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                  {banner.subtitle}
                </p>
                </div>
                <div className="absolute right-0">
                  <Image 
                  src={banner.bgImage}
                  alt="brand"
                  width={150}
                  height={150}
                  />
                </div>
              </div>

              {/* Banner Bottom CTA */}
              <div className="relative z-10 flex items-center justify-between pt-1">
                <a
                  href={banner.ctaHref}
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-xl text-xs font-black transition-colors"
                >
                  <span>{banner.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Indicator Dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? "w-6 bg-amber-500"
                : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
