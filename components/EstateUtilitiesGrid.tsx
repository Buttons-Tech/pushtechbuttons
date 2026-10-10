"use client";

import React from "react";
import { Car, Zap, BatteryCharging, Grid } from "lucide-react";

export default function EstateUtilitiesGrid() {
  return (
    <section className="bg-[#d1faba] p-4 rounded-3xl shadow-sm border border-gray-200/80">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xs font-black uppercase tracking-wider text-green-800">
          Estate Services
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-1 text-center">
        <button className="flex flex-col items-center gap-1.5 group">
          <div className="border border-dashed border-green-800  w-26 h-12 rounded-2xl border  text-green-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all">
            <Car className="w-5 h-5" />
            <span className="text-[10px] pl-2 font-bold text-green-800 leading-tight">
              Auto Care
            </span>
          </div>
        </button>

        <button className="flex flex-col items-center gap-1.5 group">
          <div className="border border-dashed border-green-800   w-26 h-12 rounded-2xl text-green-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all">
            <Zap className="w-5 h-5" />
            <span className="text-[10px] pl-2  font-bold text-green-800 leading-tight">
              Solar & CCTV
            </span>
          </div>
        </button>

        <button className="flex flex-col items-center gap-1.5 group">
          <div className="border border-dashed border-green-800 w-26 h-12 rounded-2xl  text-green-800 flex items-center justify-around group-hover:bg-amber-500 group-hover:text-black transition-all">
            <BatteryCharging className="w-5 h-5" />
            <span className="text-[10px]  font-bold text-green-800 leading-tight">
              Device Charge
            </span>
          </div>
        </button>
      </div>
    </section>
  );
}
