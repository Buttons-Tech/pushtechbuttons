"use client";

import React from 'react';
import { Car, Zap, BatteryCharging, Grid } from 'lucide-react';

export default function EstateUtilitiesGrid() {
  return (
    <section className="bg-white p-4 rounded-3xl shadow-sm border border-gray-200/80">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xs font-black uppercase tracking-wider text-gray-500">
          Vital Estate Services
        </h2>
      </div>
      <div className="grid grid-cols-4 gap-3 text-center">
        <button className="flex flex-col items-center gap-1.5 group">
          <div className="w-12 h-12 rounded-2xl bg-black text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all">
            <Car className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-gray-800 leading-tight">Auto Care</span>
        </button>

        <button className="flex flex-col items-center gap-1.5 group">
          <div className="w-12 h-12 rounded-2xl bg-black text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-gray-800 leading-tight">Solar & CCTV</span>
        </button>

        <button className="flex flex-col items-center gap-1.5 group">
          <div className="w-12 h-12 rounded-2xl bg-black text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all">
            <BatteryCharging className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-gray-800 leading-tight">Device Charge</span>
        </button>

        <button className="flex flex-col items-center gap-1.5 group">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-700 flex items-center justify-center border border-gray-200 group-hover:bg-black group-hover:text-white transition-all">
            <Grid className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-gray-800 leading-tight">More</span>
        </button>
      </div>
    </section>
  );
}