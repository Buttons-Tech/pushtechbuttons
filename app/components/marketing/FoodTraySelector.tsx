"use client";

import React, { useState, useMemo } from "react";
import { 
  Utensils, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Sparkles, 
  Flame, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Trash2 
} from "lucide-react";

// Mock Data for Bigger Bites Kitchen
interface FoodItem {
  id: string;
  name: string;
  category: "mains" | "proteins" | "sides" | "drinks";
  price: number;
  icon: string; // Emoji fallback for highly reliable, zero-asset instant loading
  popular?: boolean;
}

const FOOD_MENU: FoodItem[] = [
  { id: "m1", name: "Jollof Rice", category: "mains", price: 1500, icon: "🍛", popular: true },
  { id: "m2", name: "Fried Rice", category: "mains", price: 1600, icon: "🍲" },
  { id: "m3", name: "White Rice & Stew", category: "mains", price: 1400, icon: "🍚" },
  { id: "p1", name: "Grilled Chicken", category: "proteins", price: 1800, icon: "🍗", popular: true },
  { id: "p2", name: "Fried Fish", category: "proteins", price: 1500, icon: "🐟" },
  { id: "p3", name: "Peppered Beef", category: "proteins", price: 1200, icon: "🥩" },
  { id: "s1", name: "Plantain (Dodo)", category: "sides", price: 600, icon: "🍌", popular: true },
  { id: "s2", name: "Moin Moin", category: "sides", price: 800, icon: "🫔" },
  { id: "s3", name: "Coleslaw", category: "sides", price: 500, icon: "🥗" },
  { id: "d1", name: "Chilled Chapman", category: "drinks", price: 1000, icon: "🍹" },
  { id: "d2", name: "Bottled Water", category: "drinks", price: 400, icon: "💧" },
];

// OPay styled direct, one-tap meal packages
const QUICK_COMBOS = [
  {
    id: "c1",
    name: "Classic Jollof Combo",
    description: "Jollof Rice + Grilled Chicken + Plantain",
    items: ["m1", "p1", "s1"],
    badge: "Most Popular",
    price: 3900,
  },
  {
    id: "c2",
    name: "Light Lunch Tray",
    description: "White Rice + Peppered Beef + Coleslaw",
    items: ["m3", "p3", "s3"],
    badge: "Quick Bite",
    price: 3100,
  }
];

export default function FoodTraySelector() {
  const [tray, setTray] = useState<{ [itemId: string]: number }>({});
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Update item quantity directly
  const updateQuantity = (id: string, delta: number) => {
    setTray((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  // Instantly load a pre-built combo onto the tray
  const applyQuickCombo = (itemIds: string[]) => {
    const newTray: { [itemId: string]: number } = {};
    itemIds.forEach((id) => {
      newTray[id] = 1;
    });
    setTray(newTray);
  };

  const clearTray = () => setTray({});

  // Calculations
  const trayDetails = useMemo(() => {
    let totalItemsCount = 0;
    let totalPrice = 0;
    const itemsList = Object.entries(tray).map(([id, quantity]) => {
      const foodItem = FOOD_MENU.find((item) => item.id === id);
      if (foodItem) {
        totalItemsCount += quantity;
        totalPrice += foodItem.price * quantity;
      }
      return { item: foodItem, quantity };
    }).filter(entry => entry.item !== undefined);

    return { totalItemsCount, totalPrice, itemsList };
  }, [tray]);

  const filteredMenu = useMemo(() => {
    if (activeCategory === "all") return FOOD_MENU;
    return FOOD_MENU.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setTray({});
    }, 3000);
  };

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen pb-40 font-sans text-slate-800 antialiased selection:bg-emerald-100">
      
      {/* Header Widget - Simple, branding focused, clear OPay-style green accents */}
      <header className="bg-emerald-600 text-white p-5 rounded-b-3xl shadow-md sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs opacity-90 tracking-wider font-semibold uppercase">Ordering From</p>
            <h1 className="text-xl font-bold flex items-center gap-1.5">
              Bigger Bites Kitchen <span className="text-base">🍳</span>
            </h1>
          </div>
          <div className="bg-emerald-500/50 px-3 py-1.5 rounded-full flex items-center gap-1 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>15-25 mins</span>
          </div>
        </div>

        {/* Dynamic Tray Quick Status */}
        <div className="mt-4 bg-white/10 rounded-2xl p-3 flex justify-between items-center text-sm backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-200" />
            <span>{trayDetails.totalItemsCount} items on your tray</span>
          </div>
          <span className="font-bold text-base">
            ₦{trayDetails.totalPrice.toLocaleString()}
          </span>
        </div>
      </header>

      <main className="p-4 space-y-6">
        
        {/* 1. Quick Combos Row: Zero-thinking entry point */}
        <section>
          <div className="flex items-center gap-1 mb-3">
            <Sparkles className="w-4.5 h-4.5 text-amber-500" />
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Instant 1-Tap Trays</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
            {QUICK_COMBOS.map((combo) => (
              <button
                key={combo.id}
                onClick={() => applyQuickCombo(combo.items)}
                className="flex-shrink-0 w-72 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm text-left hover:border-emerald-500 transition active:scale-[0.98] focus:outline-none"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <Flame className="w-3 h-3" /> {combo.badge}
                  </span>
                  <span className="text-emerald-600 font-bold text-sm">₦{combo.price.toLocaleString()}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{combo.name}</h3>
                <p className="text-xs text-slate-500 mt-1 truncate">{combo.description}</p>
                <div className="mt-3 text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <span>Tap to load this tray</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 2. Super App Styled Filter Badges */}
        <section>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {["all", "mains", "proteins", "sides", "drinks"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition capitalize shrink-0 ${
                  activeCategory === cat
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-100 hover:bg-slate-50"
                }`}
              >
                {cat === "all" ? "🔥 Full Menu" : cat}
              </button>
            ))}
          </div>
        </section>

        {/* 3. Grid of Menu Items with bold, instant interaction controls */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-1">Choose Individual Additions</h2>
          <div className="grid grid-cols-1 gap-2.5">
            {filteredMenu.map((item) => {
              const qty = tray[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className={`bg-white p-3 rounded-2xl border transition-all flex items-center justify-between ${
                    qty > 0 ? "border-emerald-500 bg-emerald-50/20 shadow-sm" : "border-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Big Visual Item Indicator */}
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                        {item.popular && (
                          <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-slate-600 mt-0.5">
                        ₦{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* OPay-styled high contrast +/- selector */}
                  <div>
                    {qty === 0 ? (
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs px-4 py-2 rounded-xl transition active:scale-95 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-3.5 bg-emerald-600 text-white rounded-xl p-1 px-2.5 shadow-sm">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="hover:opacity-80 active:scale-90"
                        >
                          <Minus className="w-4 h-4 stroke-[3]" />
                        </button>
                        <span className="font-bold text-sm min-w-[12px] text-center">{qty}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="hover:opacity-80 active:scale-90"
                        >
                          <Plus className="w-4 h-4 stroke-[3]" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* 4. The Sticky Persistent Food Tray: Single clear focal point at the bottom */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] p-4 rounded-t-3xl z-20">
        {trayDetails.totalItemsCount > 0 ? (
          <div className="space-y-4">
            {/* Expanded items preview inline to eliminate secondary screen verification */}
            <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
              <span>Tray Overview</span>
              <button 
                onClick={clearTray} 
                className="text-red-500 flex items-center gap-1 hover:text-red-600"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear Tray
              </button>
            </div>
            
            <div className="max-h-24 overflow-y-auto space-y-1.5 pr-1">
              {trayDetails.itemsList.map(({ item, quantity }) => (
                <div key={item?.id} className="flex justify-between items-center text-xs bg-slate-50 p-2 rounded-lg">
                  <span className="font-semibold text-slate-800">
                    {item?.icon} {item?.name} <span className="text-slate-400">x{quantity}</span>
                  </span>
                  <span className="font-bold text-slate-700">
                    ₦{((item?.price || 0) * quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Ultimate Action Button: Visual, large, completely unambiguous */}
            <button
              onClick={handleCheckout}
              disabled={orderPlaced}
              className={`w-full py-4 rounded-2xl font-bold text-white shadow-md flex justify-between items-center px-6 transition active:scale-[0.99] ${
                orderPlaced ? "bg-emerald-500" : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {orderPlaced ? (
                <span className="flex items-center gap-2 mx-auto justify-center">
                  <CheckCircle2 className="w-5 h-5 animate-bounce" /> Order Sent to Kitchen!
                </span>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Utensils className="w-5 h-5" />
                    <span>Confirm & Send Tray</span>
                  </div>
                  <span className="bg-emerald-800 px-3 py-1 rounded-lg text-sm font-black">
                    ₦{trayDetails.totalPrice.toLocaleString()}
                  </span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="text-center py-4 text-slate-400 text-xs font-semibold flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg mb-1">🧺</div>
            <span>Your tray is empty. Tap items above to start packing.</span>
          </div>
        )}
      </footer>
    </div>
  );
}