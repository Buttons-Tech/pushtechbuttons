'use client';

import React, { useState } from 'react';
import { 
  Utensils, 
  Scissors, 
  Flame, 
  Droplet, 
  ShieldCheck, 
  Lightbulb, 
  Trash2, 
  Megaphone, 
  MessageSquare,
  ArrowRight,
  Wallet,
  X
} from 'lucide-react';

type Category = 'Eat' | 'Hair' | 'Gas' | 'Wash';

interface Vendor {
  id: string;
  name: string;
  category: Category;
  image: string;
  whatsappNumber: string;
  tagline: string;
}

interface EstateService {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function EstateApp() {
  // 1. State for filtering vendors by category
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // 2. Mock Data Matrix
  const mockVendors: Vendor[] = [
    { 
      id: '1', 
      name: 'Egan Buka Express', 
      category: 'Eat', 
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop&q=60', 
      whatsappNumber: '2348000000000',
      tagline: 'Hot Amala & Pounded Yam'
    },
    { 
      id: '2', 
      name: 'Top-Notch Barbers & Salon', 
      category: 'Hair', 
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&auto=format&fit=crop&q=60', 
      whatsappNumber: '2348000000000',
      tagline: 'Clean fades & hair dressing'
    },
    { 
      id: '3', 
      name: 'Alimosho Safe Gas', 
      category: 'Gas', 
      image: 'https://images.unsplash.com/photo-1626264290769-61ddb6acd34b?w=400&auto=format&fit=crop&q=60', 
      whatsappNumber: '2348000000000',
      tagline: 'Swift cooking gas delivery'
    },
    { 
      id: '4', 
      name: 'Sparkle Estate Car Wash', 
      category: 'Wash', 
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&auto=format&fit=crop&q=60', 
      whatsappNumber: '2348000000000',
      tagline: 'Detailed detailing at your gate'
    },
  ];

  const estateServices: EstateService[] = [
    { id: 'sec', title: 'Estate Security', description: 'Generate visitor access codes instantly', icon: <ShieldCheck className="w-6 h-6 text-emerald-600" /> },
    { id: 'pow', title: 'Power Tokens', description: 'Buy estate vending & check grid status', icon: <Lightbulb className="w-6 h-6 text-amber-500" /> },
    { id: 'wst', title: 'Waste Management', description: 'Request emergency trash pickup', icon: <Trash2 className="w-6 h-6 text-red-500" /> },
    { id: 'ann', title: 'Exco Announcements', description: 'Stay updated with estate townhall briefs', icon: <Megaphone className="w-6 h-6 text-blue-500" /> },
  ];

  // 3. Handle Category Toggles
  const handleCategoryClick = (category: Category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Deselect if clicked again
    } else {
      setSelectedCategory(category);
    }
  };

  const handleWhatsAppClick = (number: string, vendorName: string) => {
    const message = encodeURIComponent(`Hello ${vendorName}, I found you on the Estate App. I'd like to make an inquiry!`);
    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
  };

  // Filter vendors dynamically based on state
  const displayedVendors = selectedCategory 
    ? mockVendors.filter(v => v.category === selectedCategory)
    : mockVendors;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-12 font-sans antialiased text-slate-800">
      
      {/* --- OPay Header Banner --- */}
      <header className="bg-emerald-700 text-white px-5 pt-6 pb-20 rounded-b-[2.5rem] shadow-md relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center font-bold text-slate-900 shadow-inner">
              EG
            </div>
            <div>
              <p className="text-xs text-emerald-200 uppercase tracking-widest font-semibold">Your Estate Hub</p>
              <h2 className="text-sm font-bold text-white">Egan Residence</h2>
            </div>
          </div>
          <button className="p-2 bg-emerald-600/50 hover:bg-emerald-600 rounded-full">
            <Wallet className="w-5 h-5 text-amber-300" />
          </button>
        </div>

        <div className="relative z-10 mt-4">
          <h1 className="text-2xl font-black leading-tight tracking-tight text-amber-300">
            Hello Egan, <br />
            <span className="text-white font-medium">Your best vendors are now online!</span>
          </h1>
        </div>
      </header>

      {/* --- Main Overlay Wrapper --- */}
      <main className="px-4 -mt-14 relative z-20 space-y-6">

        {/* --- Main 4 Interaction Buttons --- */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <p className="text-[11px] text-slate-400 font-bold mb-3 uppercase tracking-wider">Quick Actions / Filters</p>
          <div className="grid grid-cols-4 gap-4">
            
            {/* EAT BUTTON */}
            <button 
              onClick={() => handleCategoryClick('Eat')}
              className="flex flex-col items-center gap-2 group focus:outline-none"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                selectedCategory === 'Eat' 
                  ? 'bg-orange-600 text-white scale-105 shadow-md shadow-orange-200' 
                  : 'bg-orange-50 text-orange-600 border border-orange-100/50'
              }`}>
                <Utensils className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold tracking-wide ${selectedCategory === 'Eat' ? 'text-orange-600' : 'text-slate-700'}`}>Eat</span>
            </button>

            {/* HAIR BUTTON */}
            <button 
              onClick={() => handleCategoryClick('Hair')}
              className="flex flex-col items-center gap-2 group focus:outline-none"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                selectedCategory === 'Hair' 
                  ? 'bg-purple-600 text-white scale-105 shadow-md shadow-purple-200' 
                  : 'bg-purple-50 text-purple-600 border border-purple-100/50'
              }`}>
                <Scissors className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold tracking-wide ${selectedCategory === 'Hair' ? 'text-purple-600' : 'text-slate-700'}`}>Hair</span>
            </button>

            {/* GAS BUTTON */}
            <button 
              onClick={() => handleCategoryClick('Gas')}
              className="flex flex-col items-center gap-2 group focus:outline-none"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                selectedCategory === 'Gas' 
                  ? 'bg-amber-500 text-white scale-105 shadow-md shadow-amber-200' 
                  : 'bg-amber-50 text-amber-600 border border-amber-100/50'
              }`}>
                <Flame className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold tracking-wide ${selectedCategory === 'Gas' ? 'text-amber-600' : 'text-slate-700'}`}>Gas</span>
            </button>

            {/* WASH BUTTON */}
            <button 
              onClick={() => handleCategoryClick('Wash')}
              className="flex flex-col items-center gap-2 group focus:outline-none"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                selectedCategory === 'Wash' 
                  ? 'bg-blue-600 text-white scale-105 shadow-md shadow-blue-200' 
                  : 'bg-blue-50 text-blue-600 border border-blue-100/50'
              }`}>
                <Droplet className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold tracking-wide ${selectedCategory === 'Wash' ? 'text-blue-600' : 'text-slate-700'}`}>Wash</span>
            </button>

          </div>
        </section>

        {/* --- Dynamic Vendors List Section --- */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                {selectedCategory ? `${selectedCategory} Vendors` : 'All Vendors'}
              </h3>
              {selectedCategory && (
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="p-1 bg-slate-200 hover:bg-slate-300 rounded-full transition-colors"
                  title="Clear filter"
                >
                  <X className="w-3 h-3 text-slate-600" />
                </button>
              )}
            </div>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 cursor-pointer hover:underline">
              View All ({mockVendors.length}) <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          {/* Vendors Grid */}
          <div className="grid grid-cols-2 gap-3 transition-all duration-300">
            {displayedVendors.map((vendor) => (
              <div 
                key={vendor.id} 
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs flex flex-col justify-between"
              >
                <div className="relative h-24 bg-slate-100">
                  <img 
                    src={vendor.image} 
                    alt={vendor.name} 
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {vendor.category}
                  </span>
                </div>
                <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{vendor.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{vendor.tagline}</p>
                  </div>
                  <button
                    onClick={() => handleWhatsAppClick(vendor.whatsappNumber, vendor.name)}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    Chat Vendor
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Fallback state if filtered empty */}
          {displayedVendors.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-slate-200">
              <p className="text-xs text-slate-400 font-medium">No active vendors in this category right now.</p>
            </div>
          )}
        </section>

        {/* --- Estate Services Section --- */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Estate Services</h3>
          
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50">
            {estateServices.map((service) => (
              <div 
                key={service.id} 
                className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors cursor-pointer group"
                onClick={() => alert(`Mock action triggered for: ${service.title}`)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl group-hover:scale-105 transition-transform">
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{service.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{service.description}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}