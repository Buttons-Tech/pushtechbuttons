"use client";

import React, { useState, useEffect } from 'react';
import { CloudSun, Megaphone, Flame, Clock } from 'lucide-react';

const TICKER_ITEMS = [
  {
    id: "news",
    icon: Megaphone,
    colorClass: "text-amber-400 font-bold",
    label: "NEWS",
    value: "CDA General Meeting this Saturday @ 10 AM (Gatehouse Hall)",
  },
  {
    id: "weather",
    icon: CloudSun,
    colorClass: "text-lime-400 font-bold",
    label: "WEATHER",
    value: "Ija: 28°C • Partly Cloudy",
  },
  {
    id: "gas",
    icon: Flame,
    colorClass: "text-orange-400 font-bold",
    label: "GAS PRICE",
    value: "Cooking Gas @ ₦1,250 / kg",
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
      label: "ESTATE TIME",
      value: time || "12:00 PM",
    },
  ];

  const marqueeItems = [...allItems, ...allItems, ...allItems];

  return (
    <div className="bg-black text-white border-b border-zinc-800 py-2 overflow-hidden text-xs">
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