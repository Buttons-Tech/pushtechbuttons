"use client";

import React, { useState, useEffect } from 'react';
import { CloudSun, Megaphone, Flame, Clock,  } from 'lucide-react';

const TICKER_ITEMS = [
  {
    id: "news",
    icon: Megaphone,
    colorClass: "text-amber-400 font-bold",
    label: "TRENDS",
    value: "Another Gospel Singer Dies",
  },
  {
    id: "weather",
    icon: CloudSun,
    colorClass: "text-lime-400 font-bold",
    label: "WEATHER",
    value: "Igando: 28°C • Rain Expected",
  },
  {
    id: "gas",
    icon: Flame,
    colorClass: "text-orange-400 font-bold",
    label: "Total GAS PRICE",
    value: "Cooking Gas @ ₦1,340 / kg",
  },
  {
    id: "rice",
    icon: Flame,
    colorClass: "text-orange-400 font-bold",
    label: "RICE PRICE",
    value: "Rice @ ₦4,500 / paint",
  },
  {
    id: "beans",
    icon: Flame,
    colorClass: "text-orange-400 font-bold",
    label: "BEANS PRICE",
    value: "Rice @ ₦5,500 / paint",
  },
  {
    id: "garri",
    icon: Flame,
    colorClass: "text-orange-400 font-bold",
    label: "GARRI PRICE",
    value: "Rice @ ₦1,400 / paint",
  },
];


export default function CommunityTickerBar() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const allItems = [
    ...TICKER_ITEMS,
    {
      id: "time",
      icon: Clock,
      colorClass: "text-cyan-400 font-bold",
      label: "Egan TIME",
      value: time || "12:00 PM",
    },
  ];

  const marqueeItems = [...allItems, ...allItems, ...allItems];

  return (
    <div className="bg-[#030630] text-white border-b border-zinc-800 py-2 overflow-hidden text-xs">
      <div className="continuous-slider flex items-center gap-8 px-4">
        {marqueeItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={`${item.id}-${idx}`} className="flex items-center gap-2 shrink-0">
              <Icon className={`w-3.5 h-3.5 ${item.colorClass.split(' ')[0]}`} />
              <span className={`text-[11px] tracking-wider uppercase ${item.colorClass}`}>
                {item.label}:
              </span>
              <span className="text-gray-200 font-medium">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}