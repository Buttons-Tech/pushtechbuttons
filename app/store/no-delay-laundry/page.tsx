'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

// --- Type Definitions ---
export interface LaundryItem {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export interface TrayItem {
  item: LaundryItem;
  quantity: number;
}

// const API_URL = 'https://kitchen-server-d763.onrender.com/laundry'; 
const VENDOR_WHATSAPP_NUMBER = '2348142139881'; // Olatunji Ayobami Felix Direct Line
const OPAY_ACCOUNT = '8142139881';
const OPAY_ACCOUNT_NAME = 'Olatunji Ayobami Felix (OPay)';
const PICKUP_DELIVERY_FEE = 500; // Standard local estate pickup/delivery

const CATEGORIES = [
  'All',
  'Weekend Express',
  'Garments & Wear',
  'House & Upholstery Cleaning',
  'Bedding & Linens',
] as const;

// Real-world menu items configured directly from Olatunji Ayobami Felix's price list
const INITIAL_LAUNDRY_ITEMS: LaundryItem[] = [
  // Garments & Wear
  {
    id: 'nd-1',
    name: 'Agbada (Complete Set)',
    category: 'Garments & Wear',
    price: 2500,
    description: 'Dry cleaning, stain treatment, and crisp starching for full Agbada set.',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'nd-2',
    name: 'Native Wear (Up & Down)',
    category: 'Garments & Wear',
    price: 1000,
    description: 'Washed, neatly starched, and ironed.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'nd-3',
    name: 'Suits (2-Piece)',
    category: 'Garments & Wear',
    price: 2500,
    description: 'Jacket & trouser dry cleaning with professional steam pressing.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'nd-4',
    name: 'White Garment / Sutana',
    category: 'Garments & Wear',
    price: 1500,
    description: 'Specialized deep whitening, stain removal, and starching.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'nd-5',
    name: 'Jalabia',
    category: 'Garments & Wear',
    price: 800,
    description: 'Delicate fabric wash and steam press.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'nd-6',
    name: 'Shirt (Formal / Casual)',
    category: 'Garments & Wear',
    price: 500,
    description: 'Washed, starched, and ironed on hangers or folded.',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'nd-7',
    name: 'Jean Trousers',
    category: 'Garments & Wear',
    price: 600,
    description: 'Deep denim wash and crisp crease pressing.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'nd-8',
    name: 'Trousers (Chinos / Formal)',
    category: 'Garments & Wear',
    price: 500,
    description: 'Washed and steam ironed.',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80',
  },

  // Bedding & Linens
  {
    id: 'nd-9',
    name: 'Duvet / Heavy Comforter',
    category: 'Bedding & Linens',
    price: 2500,
    description: 'Deep wash, fabric softening, and freshness packaging.',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'nd-10',
    name: 'Bedspread / Sheet Set',
    category: 'Bedding & Linens',
    price: 1000,
    description: 'Thorough cleaning and crisp ironing.',
    image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=600&q=80',
  },

  // House & Upholstery Cleaning
  {
    id: 'nd-11',
    name: 'Chairs & Sofa Set Upholstery Cleaning',
    category: 'House & Upholstery Cleaning',
    price: 10000,
    description: 'Deep vacuuming, foam extraction, and stain treatment for living room chairs.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'nd-12',
    name: 'Rug & Carpet Cleaning',
    category: 'House & Upholstery Cleaning',
    price: 5000,
    description: 'Deep rug wash, dirt extraction, and odor removal.',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'nd-13',
    name: 'Full House Deep Cleaning Consultation',
    category: 'House & Upholstery Cleaning',
    price: 15000,
    description: 'Comprehensive residential deep cleaning service booking.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
  },

  // Weekend Express
  {
    id: 'nd-14',
    name: 'Working Pro Weekend Express Bundle',
    category: 'Weekend Express',
    price: 12000,
    description: 'Sat Morning Pickup (Isuti/Egan) ➔ Sun Evening Delivery. Mix of shirts, trousers & natives.',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=600&q=80',
  },
];

function LaundryContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  // --- State ---
  const [menuItems, setMenuItems] = useState<LaundryItem[]>(INITIAL_LAUNDRY_ITEMS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [tray, setTray] = useState<TrayItem[]>([]);
  const [isTrayOpen, setIsTrayOpen] = useState<boolean>(false);

  // --- Checkout Form State ---
  const [serviceType, setServiceType] = useState<'weekend_express' | 'standard'>('weekend_express');
  const [pickupAddress, setPickupAddress] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [receiptImage, setReceiptImage] = useState<File | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(API_URL);
      if (res.ok) {
        const data: LaundryItem[] = await res.json();
        if (data && data.length > 0) setMenuItems(data);
      }
    } catch (err: unknown) {
      console.warn('Using fallback No-Delay Laundry menu data.');
    } finally {
      setIsLoading(false);
    }
  };

  const getItemId = (item: LaundryItem): string => item._id || item.id || item.name;

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return menuItems;
    return menuItems.filter((item) => item.category?.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory, menuItems]);

  const totalItemsCount = useMemo(() => {
    return tray.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [tray]);

  const subtotalPrice = useMemo(() => {
    return tray.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  }, [tray]);

  const finalTotalPrice = useMemo(() => {
    return subtotalPrice + PICKUP_DELIVERY_FEE;
  }, [subtotalPrice]);

  const addToTray = (item: LaundryItem): void => {
    const targetId = getItemId(item);
    setTray((prev) => {
      const existing = prev.find((t) => getItemId(t.item) === targetId);
      if (existing) {
        return prev.map((t) => (getItemId(t.item) === targetId ? { ...t, quantity: t.quantity + 1 } : t));
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromTray = (itemId: string): void => {
    setTray((prev) =>
      prev
        .map((t) => (getItemId(t.item) === itemId ? { ...t, quantity: t.quantity - 1 } : t))
        .filter((t) => t.quantity > 0)
    );
  };

  const getItemQuantity = (itemId: string): number => {
    return tray.find((t) => getItemId(t.item) === itemId)?.quantity || 0;
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(OPAY_ACCOUNT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptImage(e.target.files[0]);
    }
  };

  const handleCompleteOrder = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!customerName || !customerPhone) {
      alert('Please fill in your Name and Phone Number.');
      return;
    }

    if (!pickupAddress) {
      alert('Please enter your pickup address in Isuti / Egan area.');
      return;
    }

    if (!receiptImage) {
      alert('Please upload your OPay payment receipt screenshot before submitting.');
      return;
    }

    setIsProcessing(true);

    try {
      const orderItemsText = tray
        .map((t) => `• ${t.quantity}x ${t.item.name} - ₦${(t.item.price * t.quantity).toLocaleString()}`)
        .join('\n');

      const orderRef = `NDL-${Date.now().toString().slice(-6)}`;

      const message =
        `🧺 *NEW NO-DELAY LAUNDRY & CLEANING ORDER (${serviceType.toUpperCase().replace('_', ' ')})* 🧺\n\n` +
        `🔖 *Order Ref:* ${orderRef}\n` +
        `👤 *Customer Name:* ${customerName}\n` +
        `📞 *Phone:* ${customerPhone}\n` +
        `📍 *Pickup/Cleaning Address:* ${pickupAddress}\n` +
        `⏰ *Schedule:* ${
          serviceType === 'weekend_express'
            ? 'Saturday Morning Pickup ➔ Sunday Evening Delivery'
            : 'Standard Turnover'
        }\n` +
        `\n📋 *REQUESTED ITEMS & SERVICES:*\n${orderItemsText}\n\n` +
        `💵 *Subtotal:* ₦${subtotalPrice.toLocaleString()}\n` +
        `🚚 *Pickup / Logistics Fee:* ₦${PICKUP_DELIVERY_FEE.toLocaleString()}\n` +
        `💰 *TOTAL PAID:* ₦${finalTotalPrice.toLocaleString()}\n` +
        `🏦 *Payment Account:* OPay (${OPAY_ACCOUNT_NAME})\n` +
        (notes ? `📝 *Special Notes:* ${notes}\n` : '') +
        `\n📌 *Note:* Payment receipt screenshot uploaded.`;

      window.open(`https://wa.me/${VENDOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-sky-800 text-white shadow-md">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="text-xs bg-sky-900 hover:bg-sky-950 px-2.5 py-1 rounded-lg font-semibold"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight">No-Delay Laundry & House Cleaning</h1>
              <p className="text-[10px] text-sky-200">2, Olonade Odofin St, Oladapo B/Stop, Isuti Rd, Egan</p>
            </div>
          </div>
          <div>
            <Image
              src="/brand/buttons_logo.png"
              width={60}
              height={60}
              alt="No-Delay Logo"
              className="w-auto h-10 object-contain"
            />
          </div>
          <button
            onClick={() => fetchMenuItems()}
            className="text-[10px] bg-sky-900 hover:bg-sky-950 text-sky-100 px-2.5 py-1 rounded-full font-medium"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex overflow-x-auto gap-2 px-4 py-2.5 bg-sky-900 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-sky-950 shadow-sm'
                  : 'bg-sky-800/80 text-white hover:bg-sky-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-800">{selectedCategory}</h2>
          <span className="text-xs text-slate-500">{filteredItems.length} items</span>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-sky-600 border-t-transparent"></div>
            <p className="text-xs text-slate-500 mt-2">Loading services...</p>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-center my-6">
            <p className="text-xs text-rose-700 font-semibold">{error}</p>
            <button
              onClick={() => fetchMenuItems()}
              className="mt-2 text-xs bg-rose-600 text-white px-3 py-1 rounded-lg font-bold"
            >
              Retry
            </button>
          </div>
        )}

        {/* Menu Items */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const itemId = getItemId(item);
              const qty = getItemQuantity(itemId);
              const rawImg = item.image || (item as any).imageUrl || (item as any).img;
              const resolvedImg = typeof rawImg === 'string' ? rawImg : '';

              return (
                <div
                  key={itemId}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-row h-32 hover:shadow-md transition-shadow"
                >
                  <div className="relative w-32 h-32 flex-shrink-0 bg-slate-100">
                    {resolvedImg ? (
                      <img
                        src={resolvedImg.replace('http://', 'https://')}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src =
                            'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="p-3 flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 truncate">{item.name}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{item.description}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-extrabold text-sm text-sky-800">
                        ₦{item.price?.toLocaleString()}
                      </span>

                      {qty === 0 ? (
                        <button
                          onClick={() => addToTray(item)}
                          className="bg-sky-700 hover:bg-sky-800 text-white px-3 py-1 rounded-xl text-xs font-semibold shadow-sm transition-transform active:scale-95"
                        >
                          + Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1 border border-slate-200">
                          <button
                            onClick={() => removeFromTray(itemId)}
                            className="w-6 h-6 bg-white rounded-lg flex items-center justify-center font-bold text-slate-700 text-xs shadow-xs"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-slate-800">{qty}</span>
                          <button
                            onClick={() => addToTray(item)}
                            className="w-6 h-6 bg-sky-700 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-xs"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Floating Tray Bar */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 p-3 z-30 shadow-2xl">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Selection ({totalItemsCount} items)</p>
              <p className="text-lg font-black text-sky-800">₦{finalTotalPrice.toLocaleString()}</p>
            </div>

            <button
              onClick={() => setIsTrayOpen(true)}
              className="bg-sky-700 hover:bg-sky-800 text-white font-bold px-6 py-2.5 rounded-2xl shadow-lg text-sm transition-transform active:scale-95"
            >
              Checkout & Pay ➔
            </button>
          </div>
        </div>
      )}

      {/* CHECKOUT DRAWER */}
      {isTrayOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end flex-col sm:justify-center items-center p-0 sm:p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="p-4 bg-sky-800 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Complete Booking</h3>
                <p className="text-xs text-sky-200">Olatunji Ayobami Felix (OPay Account)</p>
              </div>
              <button
                onClick={() => setIsTrayOpen(false)}
                className="w-8 h-8 rounded-full bg-sky-900 text-white flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              
              {/* Order Summary */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Selected Services</p>
                {tray.map(({ item, quantity }) => (
                  <div key={getItemId(item)} className="flex justify-between text-xs">
                    <span className="text-slate-800">{quantity}x {item.name}</span>
                    <span className="font-semibold text-slate-900">₦{(item.price * quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Schedule Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Fulfillment Schedule</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setServiceType('weekend_express')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      serviceType === 'weekend_express'
                        ? 'bg-sky-700 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    ⚡ Weekend Express (Sat ➔ Sun)
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType('standard')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      serviceType === 'standard'
                        ? 'bg-sky-700 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📅 Standard Pickup
                  </button>
                </div>
              </div>

              {/* Customer Info Form */}
              <form id="checkout-form" onSubmit={handleCompleteOrder} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chisom"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="08012345678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Pickup / Service Address (Isuti / Egan / Estate) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Street name, house number or landmark"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Special Instructions</label>
                  <input
                    type="text"
                    placeholder="e.g. Heavy starch, delicate silk, call on arrival..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>

                {/* Account Details Card */}
                <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl space-y-2 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
                      OPay Transfer Details
                    </span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 font-extrabold px-2 py-0.5 rounded-full">
                      OPay
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-emerald-200">
                    <div>
                      <p className="text-[10px] text-slate-500">OPay Account / Phone Number</p>
                      <p className="text-base font-black text-slate-900 font-mono tracking-wider">
                        {OPAY_ACCOUNT}
                      </p>
                      <p className="text-[10px] text-slate-600 font-bold">{OPAY_ACCOUNT_NAME}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-transform active:scale-95"
                    >
                      {copied ? 'Copied! ✓' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Receipt Upload Section */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Upload Payment Receipt (Screenshot) *
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-3 text-center bg-slate-50 hover:bg-slate-100 transition-colors relative">
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={handleReceiptUpload}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="text-lg">🧾</span>
                      <p className="text-xs text-slate-600 font-medium">
                        {receiptImage ? (
                          <span className="text-emerald-700 font-bold">{receiptImage.name}</span>
                        ) : (
                          'Tap to select or upload payment screenshot'
                        )}
                      </p>
                      <p className="text-[10px] text-slate-400">PNG, JPG, or JPEG up to 5MB</p>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-slate-100 p-3 rounded-2xl space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>₦{subtotalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Logistics / Pickup Fee</span>
                    <span>₦{PICKUP_DELIVERY_FEE.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-200 pt-1.5 mt-1">
                    <span>Total Amount to Pay</span>
                    <span className="text-sky-800">₦{finalTotalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Submit Button */}
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full bg-sky-700 hover:bg-sky-800 text-white font-bold py-3.5 rounded-2xl shadow-lg text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isProcessing
                  ? 'Submitting Order...'
                  : `Send Order & Receipt (₦${finalTotalPrice.toLocaleString()})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NoDelayLaundryPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading page...</div>}>
      <LaundryContent />
    </Suspense>
  );
}