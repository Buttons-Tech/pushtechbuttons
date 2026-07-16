"use client";
import React, { useState } from 'react';
import { 
  Bell, 
  MapPin, 
  ChevronRight, 
  Flame, 
  Check, 
  Sparkles, 
  ShoppingBag, 
  Calendar, 
  Sliders 
} from 'lucide-react';

// Raw Menu Data Structured for Kitchen Flow Optimization
const MENU_DATA = {
  mains: [
    { id: 'jollof', name: 'Jollof Rice', basePrice: 1000, takeawayPrice: 1200, category: 'carb' },
    { id: 'fried-rice', name: 'Fried Rice', basePrice: 1000, takeawayPrice: 1200, category: 'carb' },
    { id: 'spaghetti', name: 'Spaghetti', basePrice: 1000, takeawayPrice: 1200, category: 'carb' },
    { id: 'chips', name: 'Chips (French Fries)', basePrice: 1500, takeawayPrice: 1700, category: 'carb' },
  ],
  swallows: [
    { id: 'eba', name: 'Eba', price: 1800, soups: ['Egusi', 'Vegetable', 'Ogbono', 'Okro'] },
    { id: 'semo', name: 'Semo', price: 1800, soups: ['Egusi', 'Vegetable', 'Ogbono', 'Okro'] },
    { id: 'fufu', name: 'Fufu', price: 1800, soups: ['Egusi', 'Vegetable', 'Ogbono', 'Okro'] },
  ],
  proteins: [
    { id: 'beef', name: 'Beef (Single)', price: 200 },
    { id: 'pomo', name: 'Pomo (Single)', price: 200 },
    { id: 'egg', name: 'Boiled Egg', price: 350 },
    { id: 'kote-fish', name: 'Fish (Kote)', price: 1500 },
    { id: 'chicken-small', name: 'Fried Chicken (Small)', price: 2500 },
    { id: 'turkey-small', name: 'Fried Turkey (Small)', price: 2500 },
  ],
  sides: [
    { id: 'plantain', name: 'Fried Plantain (Dodo)', price: 300 },
    { id: 'moi-moi', name: 'Moi Moi', price: 300 },
    { id: 'salad', name: 'Salad', price: 600 },
  ]
};

export default function ButtonsLandingPage() {
  const [activeTab, setActiveTab] = useState<'custom' | 'combos' | 'subscriptions'>('custom');
  
  // Custom Plate Builder State
  const [selectedMain, setSelectedMain] = useState<string | null>(null);
  const [takeawayOpt, setTakeawayOpt] = useState<boolean>(false);
  const [selectedProteins, setSelectedProteins] = useState<{[key: string]: number}>({});
  const [selectedSides, setSelectedSides] = useState<{[key: string]: number}>({});

  // Helper calculation for the customized plate
  const calculatePlateTotal = () => {
    let total = 0;
    if (selectedMain) {
      const mainItem = MENU_DATA.mains.find(m => m.id === selectedMain);
      if (mainItem) {
        total += takeawayOpt ? mainItem.takeawayPrice : mainItem.basePrice;
      }
    }
    
    Object.entries(selectedProteins).forEach(([id, qty]) => {
      const item = MENU_DATA.proteins.find(p => p.id === id);
      if (item) total += item.price * qty;
    });

    Object.entries(selectedSides).forEach(([id, qty]) => {
      const item = MENU_DATA.sides.find(s => s.id === id);
      if (item) total += item.price * qty;
    });

    return total;
  };

  const handleQtyChange = (type: 'protein' | 'side', id: string, increment: boolean) => {
    const state = type === 'protein' ? selectedProteins : selectedSides;
    const setState = type === 'protein' ? setSelectedProteins : setSelectedSides;
    
    const currentQty = state[id] || 0;
    const newQty = increment ? currentQty + 1 : Math.max(0, currentQty - 1);
    
    if (newQty === 0) {
      const { [id]: _, ...rest } = state;
      setState(rest);
    } else {
      setState({ ...state, [id]: newQty });
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F12] text-white font-sans antialiased selection:bg-[#39FF14] selection:text-black">
      
      {/* 📣 BRING BACK: ESTATE / COMMUNITY ANNOUNCEMENT BOX */}
      <div className="bg-gradient-to-r from-emerald-950 via-zinc-900 to-emerald-950 border-b border-emerald-500/20 py-3.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 text-xs md:text-sm">
          <div className="flex items-center gap-2.5 mx-auto md:mx-0">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#39FF14]"></span>
            </span>
            <p className="text-zinc-300 font-medium tracking-wide">
              <strong className="text-white font-semibold">Community Update:</strong> 
              {" "}Buttons Portal is now live inside your Estate! 🚀 Onboarding vendor: <strong className="text-emerald-400">Bigger Bites</strong>.
            </p>
          </div>
          <a href="#portal" className="mx-auto md:mx-0 text-[#39FF14] hover:underline font-bold flex items-center gap-1">
            Tap to explore <ChevronRight size={14} />
          </a>
        </div>
      </div>

      {/* 🚀 Header */}
      <header className="border-b border-zinc-800 bg-[#0F0F12]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#39FF14] text-black h-9 w-9 rounded-xl flex items-center justify-center font-black tracking-tighter text-lg shadow-[0_0_15px_rgba(57,255,20,0.3)]">
              B.
            </div>
            <span className="font-bold tracking-tight text-xl text-white">BUTTNS</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400">
            <div className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
              <MapPin size={12} className="text-[#39FF14]" />
              <span>Egan, Alimosho</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Intro */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#39FF14] font-black bg-[#39FF14]/10 px-3 py-1 rounded-full">
            Ecosystem Live
          </span>
          <h1 className="text-3xl md:text-4xl font-black mt-4 mb-3 tracking-tight">
            Simplify Your Daily Fuel.
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Order fresh meals from <strong className="text-white">Bigger Bites</strong>. 
            We organize options strictly to reduce kitchen wait-times, giving you custom plates first, then rapid combos.
          </p>
        </div>

        {/* 🎛️ Three-Tier Navigation */}
        <div className="flex justify-center p-1 bg-zinc-900 rounded-2xl max-w-lg mx-auto mb-10 border border-zinc-800/80">
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-black rounded-xl transition-all duration-200 ${
              activeTab === 'custom' 
                ? 'bg-[#39FF14] text-black shadow-[0_0_15px_rgba(57,255,20,0.15)]' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sliders size={14} />
            Custom Plate
          </button>
          
          <button
            onClick={() => setActiveTab('combos')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-black rounded-xl transition-all duration-200 ${
              activeTab === 'combos' 
                ? 'bg-[#39FF14] text-black shadow-[0_0_15px_rgba(57,255,20,0.15)]' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles size={14} />
            Combos
          </button>

          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-black rounded-xl transition-all duration-200 ${
              activeTab === 'subscriptions' 
                ? 'bg-[#39FF14] text-black' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Calendar size={14} />
            Subscriptions
          </button>
        </div>

        {/* 🍽️ TIER 1: CUSTOMIZABLE PLATE UI */}
        {activeTab === 'custom' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Step 1: Base Mains */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
                  <h3 className="font-bold text-sm tracking-wide text-zinc-300">STEP 1: SELECT CARB BASE</h3>
                  <span className="text-[10px] text-[#39FF14] font-bold bg-[#39FF14]/10 px-2 py-0.5 rounded">Required</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MENU_DATA.mains.map((main) => (
                    <button
                      key={main.id}
                      onClick={() => setSelectedMain(main.id)}
                      className={`p-4 rounded-xl border text-left transition-all relative ${
                        selectedMain === main.id 
                          ? 'border-[#39FF14] bg-[#39FF14]/5' 
                          : 'border-zinc-800 bg-zinc-950/40 hover:border-zinc-700'
                      }`}
                    >
                      {selectedMain === main.id && (
                        <div className="absolute top-3 right-3 bg-[#39FF14] text-black rounded-full p-0.5">
                          <Check size={10} strokeWidth={3} />
                        </div>
                      )}
                      <h4 className="font-bold text-sm text-white">{main.name}</h4>
                      <p className="text-zinc-500 text-xs mt-1">
                        Base: ₦{main.basePrice.toLocaleString()} | Takeaway: ₦{main.takeawayPrice.toLocaleString()}
                      </p>
                    </button>
                  ))}
                </div>

                {selectedMain && (
                  <div className="mt-4 pt-4 border-t border-zinc-850 flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Pack in Takeaway Box (+₦200)?</span>
                    <button
                      onClick={() => setTakeawayOpt(!takeawayOpt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                        takeawayOpt 
                          ? 'bg-[#39FF14] text-black' 
                          : 'bg-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {takeawayOpt ? 'Takeaway Packed' : 'No Takeaway'}
                    </button>
                  </div>
                )}
              </div>

              {/* Step 2: Add-On Proteins */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <div className="mb-4 border-b border-zinc-800 pb-3">
                  <h3 className="font-bold text-sm tracking-wide text-zinc-300">STEP 2: ADD YOUR PROTEINS</h3>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Mix and match to customize your nutrition.</p>
                </div>
                
                <div className="divide-y divide-zinc-800/60">
                  {MENU_DATA.proteins.map((protein) => {
                    const qty = selectedProteins[protein.id] || 0;
                    return (
                      <div key={protein.id} className="py-3 flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-zinc-200">{protein.name}</h4>
                          <p className="text-zinc-500 text-xs">₦{protein.price.toLocaleString()}</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {qty > 0 && (
                            <>
                              <button 
                                onClick={() => handleQtyChange('protein', protein.id, false)}
                                className="h-7 w-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center font-bold text-xs"
                              >
                                -
                              </button>
                              <span className="text-xs font-bold w-4 text-center">{qty}</span>
                            </>
                          )}
                          <button 
                            onClick={() => handleQtyChange('protein', protein.id, true)}
                            className={`h-7 w-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                              qty > 0 ? 'bg-[#39FF14] text-black' : 'bg-zinc-800 hover:bg-zinc-750 text-zinc-300'
                            }`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Add-On Sides */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <div className="mb-4 border-b border-zinc-800 pb-3">
                  <h3 className="font-bold text-sm tracking-wide text-zinc-300">STEP 3: SIDES & EXTRAS</h3>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Perfect pairings to round off the plate.</p>
                </div>

                <div className="divide-y divide-zinc-800/60">
                  {MENU_DATA.sides.map((side) => {
                    const qty = selectedSides[side.id] || 0;
                    return (
                      <div key={side.id} className="py-3 flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-zinc-200">{side.name}</h4>
                          <p className="text-zinc-500 text-xs">₦{side.price.toLocaleString()}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          {qty > 0 && (
                            <>
                              <button 
                                onClick={() => handleQtyChange('side', side.id, false)}
                                className="h-7 w-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center font-bold text-xs"
                              >
                                -
                              </button>
                              <span className="text-xs font-bold w-4 text-center">{qty}</span>
                            </>
                          )}
                          <button 
                            onClick={() => handleQtyChange('side', side.id, true)}
                            className={`h-7 w-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                              qty > 0 ? 'bg-[#39FF14] text-black' : 'bg-zinc-800 hover:bg-zinc-750 text-zinc-300'
                            }`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sticky Bill Assembly Pane */}
            <div className="sticky top-20 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="font-black text-xs uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                <ShoppingBag size={14} className="text-[#39FF14]" />
                Plate Assembly
              </h3>

              {!selectedMain ? (
                <div className="text-center py-8 text-zinc-500">
                  <p className="text-xs">Choose a Carb Base in Step 1 to begin assembling your plate.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-850 text-xs space-y-2">
                    <div className="flex justify-between text-white font-bold">
                      <span>{MENU_DATA.mains.find(m => m.id === selectedMain)?.name}</span>
                      <span>₦{(takeawayOpt ? MENU_DATA.mains.find(m => m.id === selectedMain)?.takeawayPrice : MENU_DATA.mains.find(m => m.id === selectedMain)?.basePrice)?.toLocaleString()}</span>
                    </div>
                    {takeawayOpt && <p className="text-[10px] text-emerald-400 font-medium">*Takeaway packaging included</p>}
                    
                    {Object.entries(selectedProteins).map(([id, qty]) => {
                      const item = MENU_DATA.proteins.find(p => p.id === id);
                      return (
                        <div key={id} className="flex justify-between text-zinc-400">
                          <span>{item?.name} x{qty}</span>
                          <span>₦{((item?.price || 0) * qty).toLocaleString()}</span>
                        </div>
                      );
                    })}

                    {Object.entries(selectedSides).map(([id, qty]) => {
                      const item = MENU_DATA.sides.find(s => s.id === id);
                      return (
                        <div key={id} className="flex justify-between text-zinc-400">
                          <span>{item?.name} x{qty}</span>
                          <span>₦{((item?.price || 0) * qty).toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-zinc-850 pt-4 flex items-center justify-between">
                    <span className="font-bold text-sm text-zinc-400">Total Plate Cost</span>
                    <span className="font-black text-xl text-[#39FF14] tracking-tight">₦{calculatePlateTotal().toLocaleString()}</span>
                  </div>

                  <button className="w-full py-4 rounded-xl bg-[#39FF14] text-black font-black text-sm tracking-wide shadow-[0_4px_20px_rgba(57,255,20,0.15)] hover:shadow-[0_4px_25px_rgba(57,255,20,0.3)] transition-all">
                    One-Tap Order
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 🍔 TIER 2: HIGH-VELOCITY COMBOS */}
        {activeTab === 'combos' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-zinc-900/40 border border-zinc-850 p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                <Sparkles size={18} className="text-[#39FF14]" /> Quick Combos (Ready To Ship)
              </h3>
              <p className="text-zinc-500 text-xs mb-6">These pre-bundled packs bypass custom plating queues, ensuring fastest dispatch from the kitchen.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Combo A */}
                <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#39FF14] font-black uppercase tracking-wider bg-[#39FF14]/10 px-2 py-0.5 rounded">Combo A</span>
                    <h4 className="font-black text-base text-white mt-2">The Classic Beef Duo</h4>
                    <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                      1 Portion of Rice (Jollof or Fried) + 1 Dodo portion + 2 pieces of seasoned Beef.
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-zinc-900 flex items-center justify-between">
                    <span className="font-black text-lg text-white">₦1,700</span>
                    <button className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-[#39FF14] hover:text-black font-black text-xs transition-all">
                      Select Base & Add
                    </button>
                  </div>
                </div>

                {/* Combo B */}
                <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#39FF14] font-black uppercase tracking-wider bg-[#39FF14]/10 px-2 py-0.5 rounded">Combo B</span>
                    <h4 className="font-black text-base text-white mt-2">The Fish Feast</h4>
                    <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                      1 Portion of Rice (Jollof or Fried) + 1 Dodo portion + 1 Premium Kote Fish.
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-zinc-900 flex items-center justify-between">
                    <span className="font-black text-lg text-white">₦2,800</span>
                    <button className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-[#39FF14] hover:text-black font-black text-xs transition-all">
                      Select Base & Add
                    </button>
                  </div>
                </div>

                {/* Combo C */}
                <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#39FF14] font-black uppercase tracking-wider bg-[#39FF14]/10 px-2 py-0.5 rounded">Combo C</span>
                    <h4 className="font-black text-base text-white mt-2">The Junior Chicken Box</h4>
                    <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                      1 Portion of Rice (Jollof or Fried) + 1 Dodo portion + 1 Small Fried Chicken. Excellent size for children.
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-zinc-900 flex items-center justify-between">
                    <span className="font-black text-lg text-white">₦3,800</span>
                    <button className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-[#39FF14] hover:text-black font-black text-xs transition-all">
                      Select Base & Add
                    </button>
                  </div>
                </div>

                {/* Combo D */}
                <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#39FF14] font-black uppercase tracking-wider bg-[#39FF14]/10 px-2 py-0.5 rounded">Combo D</span>
                    <h4 className="font-black text-base text-white mt-2">The Junior Turkey Box</h4>
                    <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                      1 Portion of Rice (Jollof or Fried) + 1 Dodo portion + 1 Small Fried Turkey.
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-zinc-900 flex items-center justify-between">
                    <span className="font-black text-lg text-white">₦3,800</span>
                    <button className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-[#39FF14] hover:text-black font-black text-xs transition-all">
                      Select Base & Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 📅 TIER 3: SUBSCRIPTIONS */}
        {activeTab === 'subscriptions' && (
          <div className="max-w-2xl mx-auto text-center py-10 px-4 bg-zinc-900/30 border border-zinc-850 rounded-2xl">
            <Calendar size={36} className="text-[#39FF14] mx-auto mb-4" />
            <h3 className="font-black text-lg text-white">Scheduled Subscriptions</h3>
            <p className="text-zinc-400 text-xs max-w-md mx-auto mt-2 leading-relaxed">
              Plan your week. Lock in structured morning, school lunch, or evening family plans and get priority scheduling on deliveries with zero delivery fee markups.
            </p>
            <div className="mt-6">
              <span className="text-[10px] uppercase tracking-widest text-[#39FF14] font-bold bg-[#39FF14]/10 px-3 py-1 rounded-full">
                Launching Next Phase
              </span>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-[#0A0A0C] mt-20 py-8 text-center text-xs text-zinc-600">
        <p>© 2026 Buttons Technology. Built hyper-locally for community convenience.</p>
      </footer>
    </div>
  );
}