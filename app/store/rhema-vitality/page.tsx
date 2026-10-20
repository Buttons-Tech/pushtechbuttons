'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

// --- Type Definitions ---
export interface DrinkItem {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export interface TrayItem {
  item: DrinkItem;
  quantity: number;
}

// const API_URL = 'https://kitchen-server-d763.onrender.com/drinks'; // Replace or use local endpoint
const VENDOR_WHATSAPP_NUMBER = '2348012345678'; // Replace with Rhema Vitality WhatsApp number
const FIRSTBANK_ACCOUNT = '2043436716';
const FIRSTBANK_NAME = 'PAATEE by First Bank Ltd';
const DISPATCH_FEE = 500;

const CATEGORIES = [
  'All',
  'Tiger Nut Specials',
  'Nigerian Soft Drinks',
  'Malt & Energy',
  'Water & Hydration',
] as const;

// Fallback items tailored for Rhema Vitality Drinks
const INITIAL_DRINK_ITEMS: DrinkItem[] = [
  // Tiger Nut Specials
  {
    id: 'rv-1',
    name: 'Chilled Natural Tiger Nut Drink (35cl)',
    category: 'Tiger Nut Specials',
    price: 1000,
    description: 'Freshly blended organic tiger nut with dates and coconut. No artificial sugar.',
    image: '/drinks/rhemadrink.jpeg',
  },
  {
    id: 'rv-2',
    name: 'Chilled Natural Tiger Nut Drink (50cl)',
    category: 'Tiger Nut Specials',
    price: 1500,
    description: 'Rich, creamy organic tiger nut blended with dates, ginger, and coconut.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rv-3',
    name: 'Tiger Nut Pack (35cl x 6 Bottles)',
    category: 'Tiger Nut Specials',
    price: 6000,
    description: '6-pack bundle of fresh 35cl tiger nut drinks for office or home fridge storage.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
  },

  // Nigerian Soft Drinks
  {
    id: 'rv-4',
    name: 'Coca-Cola (50cl Pet Bottle)',
    category: 'Nigerian Soft Drinks',
    price: 500,
    description: 'Ice-cold classic Coca-Cola refreshing soft drink.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rv-5',
    name: 'Fanta Orange (50cl Pet Bottle)',
    category: 'Nigerian Soft Drinks',
    price: 500,
    description: 'Fruity orange flavored chilled carbonated drink.',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rv-6',
    name: 'Sprite (50cl Pet Bottle)',
    category: 'Nigerian Soft Drinks',
    price: 500,
    description: 'Crisp lemon-lime ice-cold refreshment.',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rv-7',
    name: 'Schweppes Chapman (50cl)',
    category: 'Nigerian Soft Drinks',
    price: 600,
    description: 'Classic Nigerian party Chapman flavor in a chilled bottle.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
  },

  // Malt & Energy
  {
    id: 'rv-8',
    name: 'Maltina / Amstel Malta (Can)',
    category: 'Malt & Energy',
    price: 700,
    description: 'Nourishing, rich, ice-cold non-alcoholic malt drink.',
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rv-9',
    name: 'Fearless Energy Drink (50cl)',
    category: 'Malt & Energy',
    price: 600,
    description: 'Chilled energy boost drink (Red Berry or Classic).',
    image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80',
  },

  // Water & Hydration
  {
    id: 'rv-10',
    name: 'Premium Bottled Water (75cl)',
    category: 'Water & Hydration',
    price: 300,
    description: 'Chilled pure spring drinking water bottle.',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rv-11',
    name: 'Pack of Bottled Water (75cl x 12)',
    category: 'Water & Hydration',
    price: 3000,
    description: 'Full 12-bottle pack delivered straight to your door.',
    image: 'https://images.unsplash.com/photo-1616118132534-381148898bb4?auto=format&fit=crop&w=600&q=80',
  },
];

function DrinkContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  // --- State ---
  const [menuItems, setMenuItems] = useState<DrinkItem[]>(INITIAL_DRINK_ITEMS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [tray, setTray] = useState<TrayItem[]>([]);
  const [isTrayOpen, setIsTrayOpen] = useState<boolean>(false);

  // --- Checkout Form State ---
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
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
        const data: DrinkItem[] = await res.json();
        if (data && data.length > 0) setMenuItems(data);
      }
    } catch (err: unknown) {
      console.warn('Using fallback Rhema Vitality Drinks data.');
    } finally {
      setIsLoading(false);
    }
  };

  const getItemId = (item: DrinkItem): string => item._id || item.id || item.name;

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
    return subtotalPrice + (orderType === 'delivery' ? DISPATCH_FEE : 0);
  }, [subtotalPrice, orderType]);

  const addToTray = (item: DrinkItem): void => {
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
    navigator.clipboard.writeText(FIRSTBANK_ACCOUNT);
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

    if (orderType === 'delivery' && !deliveryAddress) {
      alert('Please enter your delivery address in the estate.');
      return;
    }

    if (!receiptImage) {
      alert('Please upload your payment receipt screenshot before submitting.');
      return;
    }

    setIsProcessing(true);

    try {
      const orderItemsText = tray
        .map((t) => `• ${t.quantity}x ${t.item.name} - ₦${(t.item.price * t.quantity).toLocaleString()}`)
        .join('\n');

      const orderRef = `RVD-${Date.now().toString().slice(-6)}`;

      const message =
        `🥤 *NEW RHEMA VITALITY DRINKS ORDER (${orderType.toUpperCase()})* 🥤\n\n` +
        `🔖 *Order Ref:* ${orderRef}\n` +
        `👤 *Customer Name:* ${customerName}\n` +
        `📞 *Phone:* ${customerPhone}\n` +
        (orderType === 'delivery'
          ? `📍 *Delivery Address:* ${deliveryAddress}\n`
          : `🏪 *Order Type:* Pickup\n`) +
        `\n📋 *SELECTED DRINKS:*\n${orderItemsText}\n\n` +
        `💵 *Subtotal:* ₦${subtotalPrice.toLocaleString()}\n` +
        (orderType === 'delivery' ? `🚚 *Dispatch Fee:* ₦${DISPATCH_FEE.toLocaleString()}\n` : '') +
        `💰 *TOTAL PAID:* ₦${finalTotalPrice.toLocaleString()}\n` +
        `🏦 *Payment Method:* Bank Transfer (${FIRSTBANK_NAME})\n` +
        (notes ? `📝 *Special Instructions:* ${notes}\n` : '') +
        `\n📌 *Note:* Payment receipt attached/uploaded.`;

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
      <header className="sticky top-0 z-20 bg-lime-700 text-white shadow-md">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="text-xs bg-lime-800 hover:bg-lime-900 px-2.5 py-1 rounded-lg font-semibold"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight">Rhema Vitality Drinks</h1>
              <p className="text-[10px] text-lime-100">Chilled Tiger Nut, Soft Drinks & Water</p>
            </div>
          </div>
          <div>
            <Image
              src="/brand/buttons_logo.png"
              width={60}
              height={60}
              alt="Rhema Vitality Logo"
              className="w-auto h-10 object-contain"
            />
          </div>
          <button
            onClick={() => fetchMenuItems()}
            className="text-[10px] bg-lime-800 hover:bg-lime-900 text-lime-100 px-2.5 py-1 rounded-full font-medium"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex overflow-x-auto gap-2 px-4 py-2.5 bg-lime-800 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-lime-950 shadow-sm'
                  : 'bg-lime-700/60 text-white hover:bg-lime-700'
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
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-lime-600 border-t-transparent"></div>
            <p className="text-xs text-slate-500 mt-2">Loading drinks menu...</p>
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
            {filteredItems.map((drink) => {
              const itemId = getItemId(drink);
              const qty = getItemQuantity(itemId);
              const rawImg = drink.image || (drink as any).imageUrl || (drink as any).img;
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
                        alt={drink.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src =
                            'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80';
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
                      <h3 className="font-bold text-sm text-slate-900 truncate">{drink.name}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{drink.description}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-extrabold text-sm text-lime-700">
                        ₦{drink.price?.toLocaleString()}
                      </span>

                      {qty === 0 ? (
                        <button
                          onClick={() => addToTray(drink)}
                          className="bg-lime-600 hover:bg-lime-700 text-white px-3 py-1 rounded-xl text-xs font-semibold shadow-sm transition-transform active:scale-95"
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
                            onClick={() => addToTray(drink)}
                            className="w-6 h-6 bg-lime-600 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-xs"
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
              <p className="text-xs text-slate-500">Tray Total ({totalItemsCount} items)</p>
              <p className="text-lg font-black text-lime-700">₦{finalTotalPrice.toLocaleString()}</p>
            </div>

            <button
              onClick={() => setIsTrayOpen(true)}
              className="bg-lime-600 hover:bg-lime-700 text-white font-bold px-6 py-2.5 rounded-2xl shadow-lg text-sm transition-transform active:scale-95"
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
            <div className="p-4 bg-lime-700 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Complete Your Order</h3>
                <p className="text-xs text-lime-100">Pay via transfer & upload receipt</p>
              </div>
              <button
                onClick={() => setIsTrayOpen(false)}
                className="w-8 h-8 rounded-full bg-lime-800 text-white flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              
              {/* Order Summary */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Selected Drinks</p>
                {tray.map(({ item, quantity }) => (
                  <div key={getItemId(item)} className="flex justify-between text-xs">
                    <span className="text-slate-800">{quantity}x {item.name}</span>
                    <span className="font-semibold text-slate-900">₦{(item.price * quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Fulfillment Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Fulfillment Type</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      orderType === 'delivery'
                        ? 'bg-lime-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🛵 Delivery (+₦500)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      orderType === 'pickup'
                        ? 'bg-lime-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🏪 Pickup
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
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 outline-none"
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
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 outline-none"
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                {orderType === 'delivery' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Delivery Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Street name, house number or landmark"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Special Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Extra ice, ginger level, call on arrival..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 outline-none"
                  />
                </div>

                {/* Account Details Card */}
                <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl space-y-2 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                      Bank Transfer Details
                    </span>
                    <span className="text-[10px] bg-amber-200 text-amber-900 font-extrabold px-2 py-0.5 rounded-full">
                      {FIRSTBANK_NAME}
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-amber-200">
                    <div>
                      <p className="text-[10px] text-slate-500">Account Number</p>
                      <p className="text-base font-black text-slate-900 font-mono tracking-wider">
                        {FIRSTBANK_ACCOUNT}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-transform active:scale-95"
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
                          <span className="text-lime-700 font-bold">{receiptImage.name}</span>
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
                    <span>Drinks Subtotal</span>
                    <span>₦{subtotalPrice.toLocaleString()}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between text-slate-600">
                      <span>Dispatch Fee</span>
                      <span>₦{DISPATCH_FEE.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-200 pt-1.5 mt-1">
                    <span>Total Amount to Pay</span>
                    <span className="text-lime-700">₦{finalTotalPrice.toLocaleString()}</span>
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
                className="w-full bg-lime-600 hover:bg-lime-700 text-white font-bold py-3.5 rounded-2xl shadow-lg text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
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

export default function RhemaVitalityPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading page...</div>}>
      <DrinkContent />
    </Suspense>
  );
}