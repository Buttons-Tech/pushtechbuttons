"use client";

import React from 'react';
import { Sparkles, ArrowRight, Code2, Users, Briefcase } from 'lucide-react';

// Replace with your exact Cloudinary team photo link
const CLICK_TEAM_IMAGE = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80";

export default function ClickTeamSection() {
  return (
    <section className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <Code2 className="w-4 h-4 text-purple-600" />
          <h2 className="text-sm font-black text-gray-900 tracking-tight uppercase">
            The Click Team
          </h2>
        </div>
        <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
          Estate Tech Force
        </span>
      </div>

      {/* Main Feature Container */}
      <div className="bg-white rounded-3xl border border-gray-200 p-3.5 shadow-sm space-y-3.5">
        
        {/* 1. Unobstructed Hero Image */}
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
          <img
            src={CLICK_TEAM_IMAGE}
            alt="The Click Team - NYSC Corpers & Indigenous Tech Talents"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="text-[9px] font-black uppercase text-white tracking-wider">
              Building Buttns
            </span>
          </div>
        </div>

        {/* 2. Clear Description & Talent Breakdown */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-700 leading-relaxed">
            Powered by a hybrid taskforce of active <strong className="text-purple-700 font-extrabold">NYSC Corpers</strong> and skilled <strong className="text-amber-600 font-extrabold">indigenous tech talents</strong> maintaining estate operations, digital services, and resident support.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-purple-50 border border-purple-100">
              <Briefcase className="w-4 h-4 text-purple-600 shrink-0" />
              <div>
                <p className="text-[10px] font-black uppercase text-purple-950">NYSC Corps</p>
                <p className="text-[9px] text-purple-700 font-medium">Primary Assignment</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-50 border border-amber-100">
              <Users className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <p className="text-[10px] font-black uppercase text-amber-950">Local Techs</p>
                <p className="text-[9px] text-amber-700 font-medium">Devs & Technicians</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. High-Contrast Call to Action */}
        <a
          href="/click-team/join"
          className="flex items-center justify-between w-full bg-purple-700 hover:bg-purple-800 active:scale-[0.98] text-white p-3 rounded-2xl transition-all shadow-md shadow-purple-600/20"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider">
              Join The Click Team
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-xs font-bold bg-white/20 px-2.5 py-1 rounded-xl">
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </a>

      </div>
    </section>
  );
}