'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

// --- Type Definitions ---
export interface MrsItem {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export interface TrayItem {
  item: MrsItem;
  quantity: number;
}

const API_URL = 'https://kitchen-server-d763.onrender.com/mrs-station';
const VENDOR_WHATSAPP_NUMBER = '2348012345678'; 
const FIRSTBANK_ACCOUNT = '2043436716';
const FIRSTBANK_NAME = 'PAATEE by First Bank Ltd';
const DOORSTEP_DELIVERY_FEE = 1000;

const CATEGORIES = [
  'All',
  'Generator Fuel (PMS/Diesel)',
  'Gas Refill',
  'Complete Cylinder Sets',
  'Regulators & Accessories',
] as const;

// Combined MRS Station Offerings (Fueling + Cooking Gas)
const INITIAL_STATION_ITEMS: MrsItem[] = [
  // Generator Fuel & Diesel
  {
    id: 'mrs-fuel-1',
    name: '10 Liters Petrol (PMS) + Sealed Canister',
    category: 'Generator Fuel (PMS/Diesel)',
    price: 11500,
    description: '10L pure station-pump Petrol in a safety-sealed, leak-proof fuel canister.',
    image: 'https://images.unsplash.com/photo-1527018601619-a508a2be00df?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'mrs-fuel-2',
    name: '25 Liters Petrol (PMS) Generator Pack',
    category: 'Generator Fuel (PMS/Diesel)',
    price: 27500,
    description: '25L station-dispensed Petrol for heavy weekend home/office generator runs.',
    image: 'https://images.unsplash.com/photo-1527018601619-a508a2be00df?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'mrs-fuel-3',
    name: '25 Liters Diesel (AGO) Industrial Pack',
    category: 'Generator Fuel (PMS/Diesel)',
    price: 32000,
    description: 'High-grade unadulterated Diesel for plant generators and heavy equipment.',
    image: 'https://images.unsplash.com/photo-1527018601619-a508a2be00df?auto=format&fit=crop&w=600&q=80',
  },

  // Gas Refills
  {
    id: 'mrs-gas-1',
    name: '3kg Cooking Gas Refill',
    category: 'Gas Refill',
    price: 3600,
    description: 'Precision electronic scale fill with high-grade MRS cooking gas.',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'mrs-gas-2',
    name: '6kg Cooking Gas Refill',
    category: 'Gas Refill',
    price: 7200,
    description: 'Precision electronic scale fill with high-grade MRS cooking gas.',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'mrs-gas-3',
    name: '12.5kg Cooking Gas Refill',
    category: 'Gas Refill',
    price: 15000,
    description: 'Most popular estate size. Sealed with official MRS safety seal.',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'mrs-gas-4',
    name: '25kg Commercial Gas Refill',
    category: 'Gas Refill',
    price: 30000,
    description: 'Heavy usage fill for restaurants, eateries, and large households.',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80',
  },

  // Complete Sets
  {
    id: 'mrs-gas-5',
    name: '12.5kg Complete Cylinder + Full Gas',
    category: 'Complete Cylinder Sets',
    price: 48000,
    description: 'Brand new certified 12.5kg steel cylinder filled with MRS gas, includes burner cap.',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80',
  },

  // Accessories
  {
    id: 'mrs-gas-6',
    name: 'Automatic High-Pressure Regulator',
    category: 'Regulators & Accessories',
    price: 4500,
    description: 'Safety leak-lock gas regulator for 12.5kg / 25kg cylinders.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
  },
];

function MrsStationContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  // --- State ---
  const [menuItems, setMenuItems] = useState<MrsItem[]>(INITIAL_STATION_ITEMS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [tray, setTray] = useState<TrayItem[]>([]);
  const [isTrayOpen, setIsTrayOpen] = useState<boolean>(false);

  // --- Checkout Form State ---
  const [fulfillmentType, setFulfillmentType] = useState<'doorstep_delivery' | 'station_pickup'>('doorstep_delivery');
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
        const data: MrsItem[] = await res.json();
        if (data && data.length > 0) setMenuItems(data);
      }
    } catch (err: unknown) {
      console.warn('Using fallback MRS Station menu data.');
    } finally {
      setIsLoading(false);
    }
  };

  const getItemId = (item: MrsItem): string => item._id || item.id || item.name;

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
    return subtotalPrice + (fulfillmentType === 'doorstep_delivery' ? DOORSTEP_DELIVERY_FEE : 0);
  }, [subtotalPrice, fulfillmentType]);

  const addToTray = (item: MrsItem): void => {
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

    if (fulfillmentType === 'doorstep_delivery' && !deliveryAddress) {
      alert('Please enter your estate delivery address.');
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

      const orderRef = `MRS-${Date.now().toString().slice(-6)}`;

      const message =
        `⛽ *NEW MRS STATION FUEL & GAS ORDER (${fulfillmentType.toUpperCase().replace('_', ' ')})* ⛽\n\n` +
        `🔖 *Order Ref:* ${orderRef}\n` +
        `👤 *Customer Name:* ${customerName}\n` +
        `📞 *Phone:* ${customerPhone}\n` +
        (fulfillmentType === 'doorstep_delivery'
          ? `📍 *Doorstep Delivery Address:* ${deliveryAddress}\n`
          : `🏪 *Fulfillment:* Direct Station Pick-up / Walk-in\n`) +
        `\n📋 *SELECTED ITEMS (FUEL / GAS):*\n${orderItemsText}\n\n` +
        `💵 *Subtotal:* ₦${subtotalPrice.toLocaleString()}\n` +
        (fulfillmentType === 'doorstep_delivery'
          ? `🚚 *Doorstep Safety Logistics Fee:* ₦${DOORSTEP_DELIVERY_FEE.toLocaleString()}\n`
          : '') +
        `💰 *TOTAL PAID:* ₦${finalTotalPrice.toLocaleString()}\n` +
        `🏦 *Payment Method:* Bank Transfer (${FIRSTBANK_NAME})\n` +
        (notes ? `📝 *Special Notes:* ${notes}\n` : '') +
        `\n📌 *Note:* Payment receipt attached. Station Manager notified.`;

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
      {/* BRAND HERO BANNER WITH CONTACT PERSON OVERLAY */}
      <div className="relative w-full h-52 bg-slate-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
          alt="MRS Station Banner"
          className="w-full h-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Top Header Controls */}
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10">
          <button
            onClick={() => window.history.back()}
            className="text-xs bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md px-3 py-1.5 rounded-xl font-bold border border-slate-700"
          >
            ← Back
          </button>
          <button
            onClick={() => fetchMenuItems()}
            className="text-[10px] bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full font-bold shadow-md"
          >
            🔄 Refresh Rates
          </button>
        </div>

        {/* Brand Information & Overlay */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase text-red-400 tracking-wider">
                Official MRS Station Outpost
              </span>
            </div>
            <h1 className="text-xl font-black text-white tracking-tight">MRS Station (Fuel & Gas)</h1>
            <p className="text-[11px] text-slate-300">Generator Fueling (PMS/AGO) & Cooking Gas Refill</p>
          </div>

          {/* Contact Person Card Overlay */}
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-2xl p-2 flex items-center gap-2 shadow-xl shrink-0">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-red-500">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Station Lead"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pr-1">
              <p className="text-[9px] text-slate-400 font-bold uppercase">Station Manager</p>
              <p className="text-xs font-black text-white">Engr. Babatunde</p>
              <p className="text-[9px] text-emerald-400 font-bold">● Active on Duty</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header Sticky Navigation for Categories */}
      <header className="sticky top-0 z-20 bg-red-700 text-white shadow-md">
        <div className="flex overflow-x-auto gap-2 px-4 py-2.5 bg-red-800 no-scrollbar max-w-3xl mx-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-red-950 shadow-sm'
                  : 'bg-red-700/60 text-white hover:bg-red-700'
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
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-600 border-t-transparent"></div>
            <p className="text-xs text-slate-500 mt-2">Fetching current station rates...</p>
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

        {/* Station Items */}
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
                            'https://images.unsplash.com/photo-1527018601619-a508a2be00df?auto=format&fit=crop&w=600&q=80';
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
                      <span className="font-extrabold text-sm text-red-700">
                        ₦{item.price?.toLocaleString()}
                      </span>

                      {qty === 0 ? (
                        <button
                          onClick={() => addToTray(item)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-xl text-xs font-semibold shadow-sm transition-transform active:scale-95"
                        >
                          + Select
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
                            className="w-6 h-6 bg-red-600 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-xs"
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
              <p className="text-xs text-slate-500">Order Tray ({totalItemsCount} items)</p>
              <p className="text-lg font-black text-red-700">₦{finalTotalPrice.toLocaleString()}</p>
            </div>

            <button
              onClick={() => setIsTrayOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-2xl shadow-lg text-sm transition-transform active:scale-95"
            >
              Checkout & Refill ➔
            </button>
          </div>
        </div>
      )}

      {/* CHECKOUT DRAWER */}
      {isTrayOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end flex-col sm:justify-center items-center p-0 sm:p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="p-4 bg-red-700 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Complete MRS Station Order</h3>
                <p className="text-xs text-red-100">Supervised by Engr. Babatunde (MRS Manager)</p>
              </div>
              <button
                onClick={() => setIsTrayOpen(false)}
                className="w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              
              {/* Order Summary */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Selected Items</p>
                {tray.map(({ item, quantity }) => (
                  <div key={getItemId(item)} className="flex justify-between text-xs">
                    <span className="text-slate-800">{quantity}x {item.name}</span>
                    <span className="font-semibold text-slate-900">₦{(item.price * quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Fulfillment Type Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Fulfillment Logistics</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setFulfillmentType('doorstep_delivery')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      fulfillmentType === 'doorstep_delivery'
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🛵 Doorstep Delivery (+₦1,000)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFulfillmentType('station_pickup')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      fulfillmentType === 'station_pickup'
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🏪 Station Pick-up
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
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
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
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                {fulfillmentType === 'doorstep_delivery' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Estate Delivery Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Flat/House number, street name or landmark"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Delivery / Fueling Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Bring extra 10L canister, call on arrival at gate..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
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
                          <span className="text-red-700 font-bold">{receiptImage.name}</span>
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
                  {fulfillmentType === 'doorstep_delivery' && (
                    <div className="flex justify-between text-slate-600">
                      <span>Ziig Doorstep Safety Logistics</span>
                      <span>₦{DOORSTEP_DELIVERY_FEE.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-200 pt-1.5 mt-1">
                    <span>Total Amount to Pay</span>
                    <span className="text-red-700">₦{finalTotalPrice.toLocaleString()}</span>
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
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-2xl shadow-lg text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
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

export default function MrsGasPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading page...</div>}>
      <MrsStationContent />
    </Suspense>
  );
}