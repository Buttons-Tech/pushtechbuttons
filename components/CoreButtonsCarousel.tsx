"use client";

import React, { useState, useRef } from 'react';
import { Utensils, Scissors, Shirt, Sparkles, ArrowRight } from 'lucide-react';

const MAIN_BUTTONS = [
  {
    id: 0,
    key: "food-drinks",
    title: "Food & Drinks",
    description: "Order from estate kitchens, local chefs & nearby restaurants delivered to your gate.",
    linkText: "Explore Kitchens",
    circleBg: "bg-emerald-500 text-black shadow-emerald-500/50",
    icon: Utensils,
    href: "/food"
  },
  {
    id: 1,
    key: "hair-style",
    title: "Hair & Style",
    description: "Book verified resident barbers, hair stylists & beauty professionals on demand.",
    linkText: "Book Stylist",
    circleBg: "bg-amber-500 text-black shadow-amber-500/50",
    icon: Scissors,
    href: "/hair-style"
  },
  {
    id: 2,
    key: "wear-wash",
    title: "Wear & Wash",
    description: "Schedule door-to-door laundry pick-up, dry cleaning & ironing within the estate.",
    linkText: "Request Wash",
    circleBg: "bg-orange-500 text-black shadow-orange-500/50",
    icon: Shirt,
    href: "/wear-wash"
  },
  {
    id: 3,
    key: "more-services",
    title: "More Services",
    description: "Access estate electrician, solar panel technicians, auto repair & security alerts.",
    linkText: "Browse All Hubs",
    circleBg: "bg-zinc-900 text-amber-400 border-2 border-amber-500 shadow-zinc-900/50",
    icon: Sparkles,
    href: "/services"
  }
];

export default function CoreButtonsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.clientWidth * 0.45;
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (newIndex >= 0 && newIndex < MAIN_BUTTONS.length) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToButton = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const itemWidth = container.clientWidth * 0.45;
    container.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  const activeItem = MAIN_BUTTONS[activeIndex];

  return (
    <section className="bg-black text-white rounded-3xl p-5 shadow-2xl border border-zinc-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider">
            Our Core Offering
          </span>
          <h2 className="text-lg font-black text-white">The 4 Buttns</h2>
        </div>
        <span className="text-[10px] bg-zinc-800 text-gray-300 font-bold px-2.5 py-1 rounded-full">
          👈 Swipe Circles
        </span>
      </div>

      {/* Swipeable Circular Buttons */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex items-center gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-none py-4 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {MAIN_BUTTONS.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = activeIndex === index;

          return (
            <div 
              key={item.key}
              onClick={() => scrollToButton(index)}
              className="snap-center shrink-0 cursor-pointer flex flex-col items-center justify-center transition-all duration-300"
            >
              <div 
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 transform shadow-lg ${item.circleBg} ${
                  isActive 
                    ? 'scale-110 ring-4 ring-white ring-offset-4 ring-offset-black opacity-100 z-10' 
                    : 'scale-90 opacity-40 hover:opacity-75'
                }`}
              >
                <IconComponent className="w-9 h-9 stroke-[2.5]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Data Box: Title, Description, and Link appear ONLY when in view */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 transition-all duration-300 min-h-[120px] flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-white tracking-tight">
              {activeItem.title}
            </h3>
            <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
              Active Hub
            </span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            {activeItem.description}
          </p>
        </div>

        <a
          href={activeItem.href}
          className="mt-3 inline-flex items-center justify-between bg-amber-500 hover:bg-amber-400 text-black px-4 py-2.5 rounded-xl text-xs font-black transition-colors"
        >
          <span>{activeItem.linkText}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}