"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search,
  SlidersHorizontal,
  Home,
  Receipt,
  MessageSquare,
  Bell,
  User,
  Star,
  Bookmark,
  Flame,
  Clock,
  ChevronRight,
  Truck,
  MapPin,
  CheckCircle2
} from 'lucide-react';

const IMAGE_ASSETS = {
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  heroBanner: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  foodAndDrinks: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80",
  hairAndStyle: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=300&q=80",
  wearAndWash: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=300&q=80",
  carAutoCare: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=300&q=80",
  solarAndSecurity: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=300&q=80",
  deviceCharging: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=300&q=80",
  vendorGourmet: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80",
  vendorSolar: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=400&q=80",
  dispatchBike: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80",
  estateHQ: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
};

export default function ButtnsLandingPage() {
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
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans pb-24">
      {/* 1. Navigation & Search Bar */}
      <header className="sticky top-0 z-50 bg-black text-white px-4 pt-3 pb-3 shadow-md space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] text-gray-400 font-medium">Welcome back 👋</p>
            <h1 className="text-xl font-black text-white tracking-tight">
              Buttns<span className="text-amber-500">.</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold border border-amber-500/40 px-2.5 py-1 rounded-full">
              Phase 1 Resident
            </span>
            <img 
              src={IMAGE_ASSETS.avatar} 
              alt="User Avatar" 
              className="w-9 h-9 rounded-full border-2 border-amber-500 object-cover" 
            />
          </div>
        </div>

        {/* Global Search input like reference design */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search food, solar repair, laundry..." 
              className="w-full bg-zinc-900 text-xs text-white placeholder-gray-400 pl-9 pr-3 py-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-amber-500"
            />
          </div>
          <button className="bg-amber-500 text-black p-2.5 rounded-xl font-bold hover:bg-amber-400 transition">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-4 space-y-5">
        {/* 2. Hero Banner: Ember Month Launch */}
        <section className="relative overflow-hidden rounded-3xl bg-black text-white p-5 shadow-xl border border-amber-500/40 min-h-[200px] flex flex-col justify-between">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105"
            style={{ backgroundImage: `url(${IMAGE_ASSETS.heroBanner})` }}
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

          <div className="relative z-10 mt-3 bg-black/80 backdrop-blur-md rounded-2xl p-2 border border-amber-500/30 flex items-center justify-around text-center shadow-lg">
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

        {/* 3. Quick Buttons (Primary Category Grid) */}
        <section className="bg-white p-4 rounded-3xl shadow-sm border border-gray-200/80">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-gray-500">Quick Services</h2>
          </div>
          <div className="grid grid-cols-4 gap-3 text-center">
            <button className="flex flex-col items-center gap-1.5 group">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-xs group-hover:scale-105 group-hover:border-amber-500 transition-all">
                <img src={IMAGE_ASSETS.foodAndDrinks} alt="Food & Drinks" className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] font-bold text-gray-800">Food & Drinks</span>
            </button>

            <button className="flex flex-col items-center gap-1.5 group">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-xs group-hover:scale-105 group-hover:border-amber-500 transition-all">
                <img src={IMAGE_ASSETS.hairAndStyle} alt="Hair & Style" className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] font-bold text-gray-800">Hair & Style</span>
            </button>

            <button className="flex flex-col items-center gap-1.5 group">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-xs group-hover:scale-105 group-hover:border-amber-500 transition-all">
                <img src={IMAGE_ASSETS.wearAndWash} alt="Wear & Wash" className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] font-bold text-gray-800">Wear & Wash</span>
            </button>

            <button className="flex flex-col items-center gap-1.5 group">
              <div className="w-14 h-14 rounded-2xl bg-black text-amber-500 flex items-center justify-center font-black text-xs border border-black shadow-xs">
                More
              </div>
              <span className="text-[11px] font-bold text-gray-800">More</span>
            </button>
          </div>
        </section>

        {/* Vital Estate Utilities Grid */}
        <section className="bg-white p-4 rounded-3xl shadow-sm border border-gray-200/80">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-gray-500">Estate Utilities</h2>
          </div>
          <div className="grid grid-cols-4 gap-3 text-center">
            <button className="flex flex-col items-center gap-1.5 group">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-xs group-hover:scale-105 transition-all">
                <img src={IMAGE_ASSETS.carAutoCare} alt="Auto Care" className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-bold text-gray-800 leading-tight">Car Auto Care</span>
            </button>

            <button className="flex flex-col items-center gap-1.5 group">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-xs group-hover:scale-105 transition-all">
                <img src={IMAGE_ASSETS.solarAndSecurity} alt="Solar & Security" className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-bold text-gray-800 leading-tight">Solar & CCTV</span>
            </button>

            <button className="flex flex-col items-center gap-1.5 group">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-xs group-hover:scale-105 transition-all">
                <img src={IMAGE_ASSETS.deviceCharging} alt="Device Charge" className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-bold text-gray-800 leading-tight">Device Charge</span>
            </button>

            <button className="flex flex-col items-center gap-1.5 group">
              <div className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-700 flex items-center justify-center font-black text-xs border border-gray-200 shadow-xs">
                More
              </div>
              <span className="text-[10px] font-bold text-gray-800 leading-tight">More</span>
            </button>
          </div>
        </section>

        {/* 4. Top Services Card List (Inspired by reference UI) */}
        <section className="bg-white p-4 rounded-3xl shadow-sm border border-gray-200/80 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-black text-gray-900">Featured Estate Services</h2>
            <button className="text-xs font-bold text-amber-600 flex items-center">
              See All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Service Item 1 */}
            <div className="flex items-center gap-3 p-2.5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition">
              <img 
                src={IMAGE_ASSETS.vendorSolar} 
                alt="Solar Repair" 
                className="w-16 h-16 rounded-xl object-cover shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600">
                  <CheckCircle2 className="w-3 h-3 text-amber-500" /> Verified Resident Tech
                </div>
                <h3 className="text-xs font-black text-gray-900 truncate">Solar Inverter Maintenance</h3>
                <p className="text-[11px] font-extrabold text-gray-900 mt-0.5">₦15,000 / inspection</p>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500 font-medium">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-gray-800">4.9</span> (38 reviews)
                </div>
              </div>
              <button className="text-gray-400 hover:text-amber-500 p-1">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>

            {/* Service Item 2 */}
            <div className="flex items-center gap-3 p-2.5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition">
              <img 
                src={IMAGE_ASSETS.wearAndWash} 
                alt="Laundry Express" 
                className="w-16 h-16 rounded-xl object-cover shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600">
                  <CheckCircle2 className="w-3 h-3 text-amber-500" /> Gatehouse Hub
                </div>
                <h3 className="text-xs font-black text-gray-900 truncate">Same-Day Express Laundry</h3>
                <p className="text-[11px] font-extrabold text-gray-900 mt-0.5">₦3,500 / bag</p>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500 font-medium">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-gray-800">4.8</span> (52 reviews)
                </div>
              </div>
              <button className="text-gray-400 hover:text-amber-500 p-1">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 5. Dispatch Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-amber-500 text-black p-4 shadow-sm flex items-center justify-between min-h-[110px]">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-multiply"
            style={{ backgroundImage: `url(${IMAGE_ASSETS.dispatchBike})` }}
          />
          <div className="relative z-10 space-y-1">
            <div className="flex items-center gap-1 font-black text-[10px] uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5 fill-black" />
              <span>Gate-to-Gate Dispatch</span>
            </div>
            <h3 className="text-xs font-black leading-tight">
              Fast intra-estate delivery within 15 mins.
            </h3>
          </div>
          <button className="relative z-10 bg-black text-white px-3 py-2 rounded-xl text-xs font-black shrink-0 hover:bg-gray-900 transition">
            Dispatch
          </button>
        </section>

        {/* 6. HQ Bulletin */}
        <section className="bg-black text-white p-4 rounded-3xl shadow-md space-y-2 border border-zinc-800">
          <div className="flex items-center justify-between text-[10px] text-amber-500 font-bold">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Gatehouse HQ Update
            </span>
            <span>Sept 1st Launch</span>
          </div>
          <p className="text-xs text-gray-300 font-medium">
            Onboarding verified estate vendors for the Ember season.
          </p>
        </section>
      </main>

      {/* Persistent Bottom Mobile Navigation Bar (Best practice inspired by reference UI) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-zinc-800 px-6 py-2">
        <div className="max-w-md mx-auto flex justify-between items-center text-gray-400">
          <button className="flex flex-col items-center gap-0.5 text-amber-500">
            <Home className="w-5 h-5" />
            <span className="text-[9px] font-bold">Home</span>
          </button>

          <button className="flex flex-col items-center gap-0.5 hover:text-white transition">
            <Receipt className="w-5 h-5" />
            <span className="text-[9px] font-bold">Orders</span>
          </button>

          <button className="flex flex-col items-center gap-0.5 hover:text-white transition">
            <MessageSquare className="w-5 h-5" />
            <span className="text-[9px] font-bold">Chat</span>
          </button>

          <button className="flex flex-col items-center gap-0.5 hover:text-white transition">
            <Bell className="w-5 h-5" />
            <span className="text-[9px] font-bold">Alerts</span>
          </button>

          <button className="flex flex-col items-center gap-0.5 hover:text-white transition">
            <User className="w-5 h-5" />
            <span className="text-[9px] font-bold">Account</span>
          </button>
        </div>
      </nav>
    </div>
  );
}