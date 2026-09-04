"use client";

import React, { useState, useEffect } from 'react';
import { Flame, Clock } from 'lucide-react';

interface EmberLaunchBannerProps {
  backgroundImage: string;
}

export default function EmberLaunchBanner({ backgroundImage }: EmberLaunchBannerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const launchDate = new Date('2026-09-01T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-black text-white p-5 shadow-xl border border-amber-500/40 min-h-[190px] flex flex-col justify-between">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 bg-amber-500 text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
            <Flame className="w-3 h-3 fill-black" /> Ember Launch
          </span>
          <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full border border-amber-500/30">
            <Clock className="w-3 h-3" /> Sept 1
          </span>
        </div>

        <div>
          <h2 className="text-xl font-black text-white">
            Step Into Ember Season with <span className="text-amber-500">Buttns.</span>
          </h2>
          <p className="text-xs text-gray-300 mt-0.5 font-medium">
            Everything your estate needs, right at your fingertips.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-2 bg-black/80 backdrop-blur-md rounded-2xl p-2 border border-amber-500/30 flex items-center justify-around text-center shadow-lg">
        <div>
          <p className="text-sm font-black text-amber-500 leading-none">{timeLeft.days}</p>
          <p className="text-[8px] uppercase font-bold text-gray-400 mt-0.5">Days</p>
        </div>
        <span className="text-amber-500/40 font-bold">:</span>
        <div>
          <p className="text-sm font-black text-amber-500 leading-none">{timeLeft.hours}</p>
          <p className="text-[8px] uppercase font-bold text-gray-400 mt-0.5">Hours</p>
        </div>
        <span className="text-amber-500/40 font-bold">:</span>
        <div>
          <p className="text-sm font-black text-amber-500 leading-none">{timeLeft.mins}</p>
          <p className="text-[8px] uppercase font-bold text-gray-400 mt-0.5">Mins</p>
        </div>
        <span className="text-amber-500/40 font-bold">:</span>
        <div>
          <p className="text-sm font-black text-amber-500 leading-none">{timeLeft.secs}</p>
          <p className="text-[8px] uppercase font-bold text-gray-400 mt-0.5">Secs</p>
        </div>
      </div>
    </section>
  );
}