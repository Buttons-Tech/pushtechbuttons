"use client";

import React, { useState } from "react";
import {
  Utensils,
  Scissors,
  Flame,
  Droplet,
  ShieldCheck,
  Lightbulb,
  Trash2,
  Megaphone,
  ArrowRight,
  Wallet,
  ArrowLeft,
  Plus,
  Minus,
  Search,
  ShoppingBag,
  Zap,
  Clock,
  BatteryCharging,
  X,
  Home,
} from "lucide-react";

type Category = "Eat" | "Hair" | "Gas" | "Wash";
type ViewState = "home" | "food" | "power" | "hair" | "gas" | "wash";

interface Vendor {
  id: string;
  name: string;
  category: Category;
  image: string;
  whatsappNumber: string;
  tagline: string;
}

interface ServiceProduct {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface CustomizableMeal {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  variants: string[];
  proteins: { name: string; price: number }[];
  extras: { name: string; price: number }[];
}

interface CartItem {
  mealId: string;
  variant: string;
  protein: { name: string; price: number };
  selectedExtras: { name: string; price: number }[];
  pricePerUnit: number;
  quantity: number;
}

export default function EstateApp() {
  const [currentView, setCurrentView] = useState<ViewState>("home");
  const [globalCart, setGlobalCart] = useState<{ [key: string]: number }>({});

  // Persistent Resident Address State
  const [houseNumber, setHouseNumber] = useState<string>("");

  // Custom Food Cart Matrix
  const [foodCart, setFoodCart] = useState<CartItem[]>([]);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Customizer Workflow Panel State
  const [activeCustomMeal, setActiveCustomMeal] =
    useState<CustomizableMeal | null>(null);
  const [chosenVariant, setChosenVariant] = useState<string>("");
  const [chosenProtein, setChosenProtein] = useState<{
    name: string;
    price: number;
  } | null>(null);
  const [chosenExtras, setChosenExtras] = useState<
    { name: string; price: number }[]
  >([]);

  const mockVendors: Vendor[] = [
    {
      id: "1",
      name: "Bigger Bites Kitchen",
      category: "Eat",
      image: "/images/elohor.jpg",
      whatsappNumber: "2348095769296",
      tagline: "Healthy & Delicious Meals",
    },
    {
      id: "2",
      name: "Son of Mercy Barbershop",
      category: "Hair",
      image: "/images/mercy.jpg",
      whatsappNumber: "2348180035258",
      tagline: "Clean fades & hair enhancements",
    },
    {
      id: "3",
      name: "MG Oil & Gas",
      category: "Gas",
      image: "/images/gas.jpg",
      whatsappNumber: "2349033811883",
      tagline: "Swift cooking gas delivery",
    },
    {
      id: "4",
      name: "Nejo Wash",
      category: "Wash",
      image: "/images/nejowash.jpg",
      whatsappNumber: "2348160350401",
      tagline: "Wash, dry & fold laundry service",
    },
  ];

  const customizablePartyRice: CustomizableMeal = {
    id: "c1",
    name: "Egan Party Rice Combo",
    basePrice: 3500,
    description:
      "Fresh custom rice base served with sweet plantain & local moin-moin pack.",
    variants: ["Smoky Jollof Rice", "Special Fried Rice", "White Rice & Stew"],
    proteins: [
      { name: "Grilled Chicken", price: 1000 },
      { name: "Crispy Peppered Turkey", price: 2500 },
      { name: "Fried Fish Halves", price: 800 },
    ],
    extras: [
      { name: "Extra Fried Plantain Side", price: 500 },
      { name: "Extra Steamed Moin-Moin", price: 600 },
      { name: "Boiled Egg Add-on", price: 400 },
    ],
  };

  const genericHairItems: ServiceProduct[] = [
    {
      id: "h1",
      name: "Standard Adult Cut & Wash",
      price: 3000,
      description:
        "Clean haircut, beard trim, razor lining, and hot towel wash",
    },
    {
      id: "h2",
      name: "Children Haircut",
      price: 1500,
      description: "Gentle and nice styles cut for kids",
    },
  ];

  const genericGasItems: ServiceProduct[] = [
    {
      id: "g1",
      name: "12.5kg Gas Refill Delivery",
      price: 14500,
      description:
        "Full cylinder swap or home refill with rapid doorstep delivery",
    },
    {
      id: "g2",
      name: "6kg Gas Refill Delivery",
      price: 7200,
      description: "Compact cylinder refill service including doorstep dropoff",
    },
  ];

  const genericWashItems: ServiceProduct[] = [
    {
      id: "w1",
      name: "Premium Laundry (Per KG)",
      price: 1200,
      description:
        "Thorough wash, premium detergent fabric conditioning, and crisp iron",
    },
    {
      id: "w2",
      name: "Duvet / Heavy Blanket Clean",
      price: 4500,
      description:
        "Deep fiber sanitization and drying for oversized bedding items",
    },
  ];

  const openFoodCustomizer = (meal: CustomizableMeal) => {
    setActiveCustomMeal(meal);
    setChosenVariant(meal.variants[0]);
    setChosenProtein(meal.proteins[0]);
    setChosenExtras([]);
    setIsCustomizerOpen(true);
  };

  const calculateCustomizerPrice = () => {
    if (!activeCustomMeal) return 0;
    const pPrice = chosenProtein ? chosenProtein.price : 0;
    const ePrice = chosenExtras.reduce((s, e) => s + e.price, 0);
    return activeCustomMeal.basePrice + pPrice + ePrice;
  };

  const addCustomItemToFoodCart = () => {
    if (!activeCustomMeal || !chosenProtein) return;

    const unitPrice = calculateCustomizerPrice();

    setFoodCart((prev) => {
      const matchIndex = prev.findIndex(
        (item) =>
          item.mealId === activeCustomMeal.id &&
          item.variant === chosenVariant &&
          item.protein.name === chosenProtein.name &&
          item.selectedExtras.length === chosenExtras.length &&
          item.selectedExtras.every((e) =>
            chosenExtras.some((ce) => ce.name === e.name),
          ),
      );

      if (matchIndex > -1) {
        const updated = [...prev];
        updated[matchIndex].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
          mealId: activeCustomMeal.id,
          variant: chosenVariant,
          protein: chosenProtein,
          selectedExtras: chosenExtras,
          pricePerUnit: unitPrice,
          quantity: 1,
        },
      ];
    });

    setIsCustomizerOpen(false);
  };

  const getFoodCartTotal = () =>
    foodCart.reduce((s, i) => s + i.pricePerUnit * i.quantity, 0);
  const getFoodCartCount = () => foodCart.reduce((s, i) => s + i.quantity, 0);

  const handleWhatsAppFoodCheckout = () => {
    const target = mockVendors.find((v) => v.category === "Eat");
    if (!target) return;

    let text = `Hello ${target.name},\nI want to place an order from the Buttns App:\n\n`;

    foodCart.forEach((item) => {
      text += `• ${item.quantity}x ${item.variant} Combo (₦${(item.pricePerUnit * item.quantity).toLocaleString()})\n`;
      text += `  - Protein: ${item.protein.name}\n`;
      if (item.selectedExtras.length > 0) {
        text += `  - Extras: ${item.selectedExtras.map((e) => e.name).join(", ")}\n`;
      }
      text += `\n`;
    });

    text += `*Total Amount: ₦${getFoodCartTotal().toLocaleString()}*\n\nHouse Number: ${houseNumber || "__________"}`;
    window.open(
      `https://wa.me/${target.whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  const updateGenericQty = (id: string, delta: number) => {
    setGlobalCart((prev) => {
      const val = Math.max(0, (prev[id] || 0) + delta);
      if (val === 0) {
        const { [id]: _, ...r } = prev;
        return r;
      }
      return { ...prev, [id]: val };
    });
  };

  const executeGenericCheckout = (cat: Category, list: ServiceProduct[]) => {
    const v = mockVendors.find((x) => x.category === cat);
    if (!v) return;
    let total = 0;
    let t = `Hello ${v.name},\nBooking placement request via Buttns:\n\n`;
    Object.entries(globalCart).forEach(([id, q]) => {
      const match = list.find((p) => p.id === id);
      if (match) {
        t += `• ${q}x ${match.name}\n`;
        total += match.price * q;
      }
    });
    t += `\n*Total Estimate Value: ₦${total.toLocaleString()}*\n\nHouse Number: ${houseNumber || "__________"}`;
    window.open(
      `https://wa.me/${v.whatsappNumber}?text=${encodeURIComponent(t)}`,
      "_blank",
    );
  };

  const handlePowerTokenOrder = (pkg: any) => {
    const adminNumber = "2348000000000";
    const message = `Hello Hub Admin, I want to purchase the *${pkg.name}* (₦${pkg.price.toLocaleString()}) for device charging.\n\nI understand the drop-off window is 7:00 AM and pickup is 7:00 PM.\n\nHouse Number: ${houseNumber || "__________"}`;
    window.open(
      `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-12 font-sans antialiased text-slate-800 relative">
      {/* ================= VIEW: FOOD VIEW MATRIX ================= */}
      {currentView === "food" && (
        <div className="pb-32">
          <div className="relative h-45 bg-slate-900 text-white">
            <img
              src="/images/elohor.jpg"
              alt="Kitchen"
              className="w-full h-full object-cover opacity-60"
            />
            <button
              onClick={() => setCurrentView("home")}
              className="absolute top-4 left-4 p-2 bg-black/50 backdrop-blur-md rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="px-4 -mt-10 relative z-10">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                Egan Food Hub
              </span>
              <h2 className="text-base font-black text-slate-900 mt-1">
                Bigger Bites Kitchen
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                ⏱ 15-25 mins • Free Delivery inside Egan
              </p>
            </div>

            {/* Global House Number Input Field Block */}
            <div className="mt-4 bg-lime-50/40 border border-lime-100 rounded-2xl p-4 flex items-center gap-3">
              <Home className="w-5 h-5 text-lime-600 shrink-0" />
              <div className="flex-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-lime-800 block">
                  Deliver To:
                </label>
                <input
                  type="text"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                  placeholder="e.g. Block B, Flat 4"
                  className="w-full bg-transparent border-none p-0 mt-0.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:ring-0 focus:outline-none"
                />
              </div>
            </div>

            {/* Menu Entry */}
            <div className="mt-6 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                Popular Dishes
              </h3>

              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs flex justify-between items-center gap-4">
                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-bold text-slate-900">
                    {customizablePartyRice.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {customizablePartyRice.description}
                  </p>
                  <p className="text-xs font-black text-slate-900 pt-1">
                    From ₦{customizablePartyRice.basePrice.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => openFoodCustomizer(customizablePartyRice)}
                  className="px-4 py-2 bg-lime-400 hover:bg-lime-500 text-black font-black text-xs rounded-xl shadow-2xs transition-all flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Interactive Food Basket Indicator Bar */}
          {getFoodCartCount() > 0 && (
            <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-40">
              <div className="bg-slate-900 text-white rounded-2xl p-3 shadow-xl flex items-center justify-between border border-slate-800">
                <div className="flex items-center gap-3 pl-2">
                  <div className="relative p-2.5 bg-lime-400 text-black rounded-xl">
                    <ShoppingBag className="w-5 h-5" />
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {getFoodCartCount()}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-black text-lime-400">
                      ₦{getFoodCartTotal().toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleWhatsAppFoodCheckout}
                  className="bg-lime-400 text-black font-black text-xs px-5 py-3 rounded-xl flex items-center gap-1.5"
                >
                  Checkout WhatsApp <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= VIEW: INTERACTIVE BOTTOM SHEET OPTIONS CUSTOMIZER ================= */}
      {isCustomizerOpen && activeCustomMeal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-t-[2rem] max-h-[85vh] overflow-y-auto p-6 space-y-6 shadow-2xl relative animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {activeCustomMeal.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Customize your combo settings
                </p>
              </div>
              <button
                onClick={() => setIsCustomizerOpen(false)}
                className="p-2 bg-slate-100 rounded-full hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* CHOICE 1: VARIANT TYPE SELECTION SECTION */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400 block">
                1. Select Rice Variant
              </label>
              <div className="flex flex-col gap-2">
                {activeCustomMeal.variants.map((v) => (
                  <label
                    key={v}
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${chosenVariant === v ? "border-lime-500 bg-lime-50/40 text-slate-900" : "border-slate-100 text-slate-700"}`}
                  >
                    <span>{v}</span>
                    <input
                      type="radio"
                      name="riceVariant"
                      checked={chosenVariant === v}
                      onChange={() => setChosenVariant(v)}
                      className="accent-lime-500 h-4 w-4"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* CHOICE 2: PROTEIN CHOICE SELECTION SECTION */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400 block">
                2. Choose Protein Option
              </label>
              <div className="flex flex-col gap-2">
                {activeCustomMeal.proteins.map((p) => (
                  <label
                    key={p.name}
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${chosenProtein?.name === p.name ? "border-lime-500 bg-lime-50/40 text-slate-900" : "border-slate-100 text-slate-700"}`}
                  >
                    <span>
                      {p.name} (+₦{p.price})
                    </span>
                    <input
                      type="radio"
                      name="riceProtein"
                      checked={chosenProtein?.name === p.name}
                      onChange={() => setChosenProtein(p)}
                      className="accent-lime-500 h-4 w-4"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* CHOICE 3: EXTRAS ADDON GRID CHECKBOX */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400 block">
                3. Add Extras (Optional)
              </label>
              <div className="flex flex-col gap-2">
                {activeCustomMeal.extras.map((e) => {
                  const isChecked = chosenExtras.some(
                    (ce) => ce.name === e.name,
                  );
                  return (
                    <label
                      key={e.name}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${isChecked ? "border-lime-500 bg-lime-50/40 text-slate-900" : "border-slate-100 text-slate-700"}`}
                    >
                      <span>
                        {e.name} (+₦{e.price})
                      </span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked)
                            setChosenExtras(
                              chosenExtras.filter((ce) => ce.name !== e.name),
                            );
                          else setChosenExtras([...chosenExtras, e]);
                        }}
                        className="accent-lime-500 h-4 w-4 rounded"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* SUBMIT WIDGET TOTAL BAR FOR CUSTOMIZER */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">
                  Calculated Price
                </p>
                <p className="text-base font-black text-slate-900">
                  ₦{calculateCustomizerPrice().toLocaleString()}
                </p>
              </div>
              <button
                onClick={addCustomItemToFoodCart}
                className="flex-1 bg-lime-400 hover:bg-lime-500 text-black font-black text-xs py-3.5 rounded-xl text-center transition-all shadow-md"
              >
                Add to Basket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= GENERIC SERVICE SUBVIEWS (HAIR/GAS/WASH VIEWS) ================= */}
      {["hair", "gas", "wash"].includes(currentView) && (
        <div>
          {(() => {
            const settings: Record<
              string,
              { t: string; img: string; c: Category; items: ServiceProduct[] }
            > = {
              hair: {
                t: "Son of Mercy Barbershop",
                img: "/images/mercy.jpg",
                c: "Hair",
                items: genericHairItems,
              },
              gas: {
                t: "MG Oil & Gas",
                img: "/images/gas.jpg",
                c: "Gas",
                items: genericGasItems,
              },
              wash: {
                t: "Nejo Wash",
                img: "/images/nejowash.jpg",
                c: "Wash",
                items: genericWashItems,
              },
            };
            const current = settings[currentView];
            if (!current) return null;

            let totalCount = Object.entries(globalCart).reduce(
              (s, [id, q]) =>
                current.items.some((i) => i.id === id) ? s + q : s,
              0,
            );
            let sumPrice = Object.entries(globalCart).reduce((s, [id, q]) => {
              const f = current.items.find((i) => i.id === id);
              return f ? s + f.price * q : s;
            }, 0);

            return (
              <div className="pb-32">
                <div className="relative h-40 bg-slate-900 text-white">
                  <img
                    src={current.img}
                    alt={current.t}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <button
                    onClick={() => {
                      setCurrentView("home");
                      setGlobalCart({});
                    }}
                    className="absolute top-4 left-4 p-2 bg-black/50 backdrop-blur-md rounded-full"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                </div>
                <div className="px-4 mt-4 space-y-4">
                  <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs">
                    <span className="bg-lime-100 text-lime-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                      {current.c} Hub
                    </span>
                    <h2 className="text-sm font-black text-slate-900 mt-1">
                      {current.t}
                    </h2>
                  </div>

                  {/* Shared Global Address Component for Service Views */}
                  <div className="bg-lime-50/40 border border-lime-100 rounded-2xl p-4 flex items-center gap-3">
                    <Home className="w-5 h-5 text-lime-600 shrink-0" />
                    <div className="flex-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-lime-800 block">
                        Deliver/Service To:
                      </label>
                      <input
                        type="text"
                        value={houseNumber}
                        onChange={(e) => setHouseNumber(e.target.value)}
                        placeholder="e.g. Block B, Flat 4"
                        className="w-full bg-transparent border-none p-0 mt-0.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    {current.items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl p-4 border border-slate-100 flex justify-between items-center"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">
                            {item.name}
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {item.description}
                          </p>
                          <p className="text-xs font-black text-slate-900 mt-1">
                            ₦{item.price.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          {globalCart[item.id] ? (
                            <div className="flex items-center bg-lime-50 rounded-xl p-1 border border-lime-200">
                              <button
                                onClick={() => updateGenericQty(item.id, -1)}
                                className="p-1 bg-white rounded-md"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-3 text-xs font-bold">
                                {globalCart[item.id]}
                              </span>
                              <button
                                onClick={() => updateGenericQty(item.id, 1)}
                                className="p-1 bg-lime-400 rounded-md"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => updateGenericQty(item.id, 1)}
                              className="px-3 py-1.5 bg-lime-400 text-black text-xs font-bold rounded-xl"
                            >
                              Select
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {totalCount > 0 && (
                  <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-40">
                    <div className="bg-slate-900 text-white rounded-2xl p-3 flex justify-between items-center shadow-lg">
                      <div className="pl-2">
                        <p className="text-xs text-lime-400 font-bold">
                          ₦{sumPrice.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          executeGenericCheckout(current.c, current.items)
                        }
                        className="bg-lime-400 text-black text-xs font-black px-4 py-2.5 rounded-xl"
                      >
                        Book via WhatsApp →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* ================= VIEW: POWER TOKENS SERVICE SCREEN ================= */}
      {currentView === "power" && (
        <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-12 font-sans antialiased text-slate-800">
          <header className="bg-black text-white px-5 pt-6 pb-12 rounded-b-[2.5rem] shadow-md relative overflow-hidden">
            <button
              onClick={() => setCurrentView("home")}
              className="p-2 bg-slate-800/80 rounded-full mb-4 inline-block"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-400 rounded-2xl text-black shadow-inner">
                <Zap className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">
                  Estate Utilities
                </p>
                <h1 className="text-xl font-black">Power Vending Tokens</h1>
              </div>
            </div>
          </header>

          <main className="px-4 mt-6 space-y-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
              <Home className="w-5 h-5 text-slate-400 shrink-0" />
              <div className="flex-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Resident House Number:
                </label>
                <input
                  type="text"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                  placeholder="e.g. Block B, Flat 4"
                  className="w-full bg-transparent border-none p-0 mt-0.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:ring-0 focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/60 flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900">
                  Device Logistics Windows
                </h4>
                <p className="text-[11px] text-amber-700 mt-0.5 leading-relaxed">
                  Drop off items morning schedule at **7:00 AM**. Completed
                  charges are ready for processing/pickup evening shift at
                  **7:00 PM** daily.
                </p>
              </div>
            </div>

            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 pt-2">
              Available Vending Packages
            </h3>

            <div className="space-y-3">
              {[
                {
                  id: "p1",
                  name: "Lite Charge Token",
                  price: 500,
                  allowance: "Up to 2 Smartphones / Powerbanks",
                },
                {
                  id: "p2",
                  name: "Standard Heavy Token",
                  price: 1200,
                  allowance: "1 Laptop + 1 Smartphone",
                },
                {
                  id: "p3",
                  name: "Max Power Bundle",
                  price: 2500,
                  allowance: "Multiple devices (Max 4 items total)",
                },
              ].map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <BatteryCharging className="w-4 h-4 text-emerald-600" />
                      <h4 className="text-xs font-bold text-slate-900">
                        {pkg.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {pkg.allowance}
                    </p>
                    <p className="text-xs font-black text-slate-900 pt-0.5">
                      ₦{pkg.price.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handlePowerTokenOrder(pkg)}
                    className="bg-lime-400 hover:bg-lime-500 text-black font-black text-[11px] px-4 py-2.5 rounded-xl transition-all shadow-2xs"
                  >
                    Get Token
                  </button>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}

      {/* ================= VIEW: MAIN INTERFACE HUB HOME PLATFORM ================= */}
      {currentView === "home" && (
        <div>
          <header className="bg-black text-white px-5 pt-6 pb-20 rounded-b-[2.5rem] shadow-md relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="relative z-10 flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center font-bold text-slate-900 shadow-inner">
                  BT
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold text-amber-400">
                    BUTTNS
                  </p>
                  <h2 className="text-sm font-bold text-white">
                    Egan Community
                  </h2>
                </div>
              </div>
              <button className="p-2 bg-emerald-600/50 hover:bg-emerald-600 rounded-full">
                <Wallet className="w-5 h-5 text-amber-300" />
              </button>
            </div>
            <div className="relative z-10 mt-4">
              <h1 className="text-2xl font-black leading-tight tracking-tight text-amber-300">
                Hello Egan, <br />
                <span className="text-white font-medium text-[17px]">
                  Your best vendors are now online!
                </span>
              </h1>
              <button
                onClick={() => setCurrentView("food")}
                className="bg-amber-400 text-black w-full h-[36px] rounded-[24px] mt-4 font-black text-xs shadow-sm"
              >
                Order Food Now!
              </button>
               <button
                onClick={() => setCurrentView("food")}
                className="bg-lime-400 text-black w-full h-[36px] rounded-[24px] mt-4 font-black text-xs shadow-sm"
              >
                Learn More About Buttns
              </button>
            </div>
          </header>

          <main className="px-4 -mt-14 relative z-20 space-y-6">
            <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <p className="text-[11px] text-slate-400 font-bold mb-3 uppercase tracking-wider">
                Your Buttons
              </p>
              <div className="grid grid-cols-4 gap-4">
                {(["Eat", "Hair", "Gas", "Wash"] as const).map((cat) => {
                  const icons = {
                    Eat: <Utensils />,
                    Hair: <Scissors />,
                    Gas: <Flame />,
                    Wash: <Droplet />,
                  };
                  const colors = {
                    Eat: "orange",
                    Hair: "purple",
                    Gas: "amber",
                    Wash: "blue",
                  };
                  const targetViewMapping: Record<Category, ViewState> = {
                    Eat: "food",
                    Hair: "hair",
                    Gas: "gas",
                    Wash: "wash",
                  };
                  return (
                    <button
                      key={cat}
                      onClick={() => setCurrentView(targetViewMapping[cat])}
                      className="flex flex-col items-center gap-2 group focus:outline-none"
                    >
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all bg-${colors[cat]}-50 text-${colors[cat]}-600 border border-${colors[cat]}-100/50`}
                      >
                        {React.cloneElement(icons[cat], {
                          className: "w-6 h-6",
                        })}
                      </div>
                      <span className="text-xs font-bold tracking-wide text-slate-700">
                        {cat}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                All Vendors
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {mockVendors.map((vendor) => {
                  const viewMap: Record<Category, ViewState> = {
                    Eat: "food",
                    Hair: "hair",
                    Gas: "gas",
                    Wash: "wash",
                  };
                  return (
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
                      </div>
                      <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                            {vendor.name}
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                            {vendor.tagline}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            setCurrentView(viewMap[vendor.category])
                          }
                          className="w-full py-2 bg-lime-400 text-black rounded-xl text-[11px] font-bold flex items-center justify-center tracking-wide"
                        >
                          Tap in!
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Estate Services
              </h3>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50">
                <div
                  onClick={() => setCurrentView("power")}
                  className="p-4 flex items-center justify-between hover:bg-slate-50/50 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-50 rounded-xl text-amber-500">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">
                        Power Tokens
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Charge devices (pickup/dropoff: 7am/7pm daily)
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div
                  onClick={() => alert("Security pass framework active")}
                  className="p-4 flex items-center justify-between hover:bg-slate-50/50 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-50 rounded-xl text-emerald-600">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">
                        Estate Security
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Generate visitor access codes instantly
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </section>
          </main>
        </div>
      )}
    </div>
  );
}
