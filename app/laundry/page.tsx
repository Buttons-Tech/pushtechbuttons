'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export interface WearItem {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export interface SelectedWearItem {
  item: WearItem;
  quantity: number;
}

const API_URL = 'https://kitchen-server-d763.onrender.com/laundry';
const LAUNDRY_WHATSAPP_NUMBER = '2348000000000';
const MONIEPOINT_ACCOUNT = '8271570508';
const MONIEPOINT_BANK = 'Moniepoint Microfinance Bank';
const PICKUP_DELIVERY_FEE = 1000;

const CATEGORIES = [
  'All',
  'Wash & Iron',
  'Dry Cleaning',
  'Ironing Only',
  'Quick Outfits',
] as const;

function WearWashContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  // --- State ---
  const [catalogItems, setCatalogItems] = useState<WearItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [cart, setCart] = useState<SelectedWearItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // --- Fulfillment State ---
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'dropoff'>('pickup');
  const [pickupDate, setPickupDate] = useState<string>('');
  const [pickupAddress, setPickupAddress] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [receiptImage, setReceiptImage] = useState<File | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Server returned status: ${res.status}`);
      const data: WearItem[] = await res.json();
      setCatalogItems(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch laundry items');
    } finally {
      setIsLoading(false);
    }
  };

  const getItemId = (item: WearItem): string => item._id || item.id || item.name;

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return catalogItems;
    return catalogItems.filter(
      (item) => item.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory, catalogItems]);

  const totalItemCount = useMemo(() => {
    return cart.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cart]);

  const subtotalPrice = useMemo(() => {
    return cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  }, [cart]);

  const finalTotalPrice = useMemo(() => {
    return subtotalPrice + (fulfillmentType === 'pickup' ? PICKUP_DELIVERY_FEE : 0);
  }, [subtotalPrice, fulfillmentType]);

  const addToCart = (item: WearItem): void => {
    const targetId = getItemId(item);
    setCart((prev) => {
      const existing = prev.find((c) => getItemId(c.item) === targetId);
      if (existing) {
        return prev.map((c) =>
          getItemId(c.item) === targetId ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string): void => {
    setCart((prev) =>
      prev
        .map((c) => (getItemId(c.item) === itemId ? { ...c, quantity: c.quantity - 1 } : c))
        .filter((c) => c.quantity > 0)
    );
  };

  const getItemQuantity = (itemId: string): number => {
    return cart.find((c) => getItemId(c.item) === itemId)?.quantity || 0;
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(MONIEPOINT_ACCOUNT);
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

    if (fulfillmentType === 'pickup' && (!pickupAddress || !pickupDate)) {
      alert('Please enter your pickup date and address.');
      return;
    }

    if (!receiptImage) {
      alert('Please upload your payment receipt screenshot before submitting.');
      return;
    }

    setIsProcessing(true);

    try {
      const itemsText = cart
        .map((c) => `• ${c.quantity}x ${c.item.name} - ₦${(c.item.price * c.quantity).toLocaleString()}`)
        .join('\n');

      const orderRef = `WASH-${Date.now().toString().slice(-6)}`;

      const message =
        `👔 *NEW WEAR & WASH REQUEST (${fulfillmentType === 'pickup' ? 'HOME PICKUP' : 'STORE DROP-OFF'})* 👔\n\n` +
        `🔖 *Ref Number:* ${orderRef}\n` +
        `👤 *Name:* ${customerName}\n` +
        `📞 *Phone:* ${customerPhone}\n` +
        (fulfillmentType === 'pickup'
          ? `📅 *Pickup Date:* ${pickupDate}\n🏠 *Address:* ${pickupAddress}\n`
          : `🏪 *Mode:* Customer Drop-Off at Laundry Hub\n`) +
        `\n🛒 *ITEMS & SERVICES:*\n${itemsText}\n\n` +
        `💵 *Subtotal:* ₦${subtotalPrice.toLocaleString()}\n` +
        (fulfillmentType === 'pickup' ? `🚚 *Pickup & Delivery Fee:* ₦${PICKUP_DELIVERY_FEE.toLocaleString()}\n` : '') +
        `💰 *TOTAL PAID:* ₦${finalTotalPrice.toLocaleString()}\n` +
        `🏦 *Payment Method:* Bank Transfer (Moniepoint)\n` +
        (notes ? `📝 *Special Instructions:* ${notes}\n` : '') +
        `\n📌 *Note:* Payment receipt attached/uploaded.`;

      window.open(`https://wa.me/${LAUNDRY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
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
      <header className="sticky top-0 z-20 bg-slate-900 text-white shadow-md">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="text-xs bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg font-semibold"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight">Wear & Wash</h1>
              <p className="text-[10px] text-slate-300">Laundry service & quick matching outfits</p>
            </div>
          </div>
          <button
            onClick={() => fetchItems()}
            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-full font-medium"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex overflow-x-auto gap-2 px-4 py-2.5 bg-slate-800 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Main Catalog */}
      <main className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-800">{selectedCategory}</h2>
          <span className="text-xs text-slate-500">{filteredItems.length} options</span>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-800 border-t-transparent"></div>
            <p className="text-xs text-slate-500 mt-2">Loading catalog...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-center my-6">
            <p className="text-xs text-rose-700 font-semibold">{error}</p>
            <button
              onClick={() => fetchItems()}
              className="mt-2 text-xs bg-rose-600 text-white px-3 py-1 rounded-lg font-bold"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const itemId = getItemId(item);
              const qty = getItemQuantity(itemId);
              const rawImg = item.image || (item as any).imageUrl;
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
                      <span className="font-extrabold text-sm text-slate-900">
                        ₦{item.price?.toLocaleString()}
                      </span>

                      {qty === 0 ? (
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1 rounded-xl text-xs font-semibold shadow-sm transition-transform active:scale-95"
                        >
                          + Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1 border border-slate-200">
                          <button
                            onClick={() => removeFromCart(itemId)}
                            className="w-6 h-6 bg-white rounded-lg flex items-center justify-center font-bold text-slate-700 text-xs shadow-xs"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-slate-800">{qty}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-6 h-6 bg-slate-900 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-xs"
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

      {/* Floating Checkout Bar */}
      {totalItemCount > 0 && (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 p-3 z-30 shadow-2xl">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Cart ({totalItemCount} items)</p>
              <p className="text-lg font-black text-slate-900">₦{finalTotalPrice.toLocaleString()}</p>
            </div>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-2xl shadow-lg text-sm transition-transform active:scale-95"
            >
              Checkout Request ➔
            </button>
          </div>
        </div>
      )}

      {/* CHECKOUT DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end flex-col sm:justify-center items-center p-0 sm:p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Checkout & Schedule</h3>
                <p className="text-xs text-slate-300">Pay via transfer & upload receipt</p>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              
              {/* Summary */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Requested Items</p>
                {cart.map(({ item, quantity }) => (
                  <div key={getItemId(item)} className="flex justify-between text-xs">
                    <span className="text-slate-800">{quantity}x {item.name}</span>
                    <span className="font-semibold text-slate-900">₦{(item.price * quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Fulfillment Switcher */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Delivery Option</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setFulfillmentType('pickup')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      fulfillmentType === 'pickup'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🚚 Home Pickup (+₦1,000)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFulfillmentType('dropoff')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      fulfillmentType === 'dropoff'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🏪 Store Drop-Off
                  </button>
                </div>
              </div>

              <form id="wear-wash-form" onSubmit={handleCompleteOrder} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
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
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
                    />
                  </div>
                </div>

                {fulfillmentType === 'pickup' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Pickup Date *</label>
                      <input
                        type="date"
                        required
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Pickup Address *</label>
                      <input
                        type="text"
                        required
                        placeholder="House No., Street Name"
                        value={pickupAddress}
                        onChange={(e) => setPickupAddress(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Special Instructions / Sizes</label>
                  <input
                    type="text"
                    placeholder="e.g. Starch collar, size L for outfit..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
                  />
                </div>

                {/* Account Details */}
                <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl space-y-2 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                      Bank Transfer Details
                    </span>
                    <span className="text-[10px] bg-amber-200 text-amber-900 font-extrabold px-2 py-0.5 rounded-full">
                      Moniepoint
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-amber-200">
                    <div>
                      <p className="text-[10px] text-slate-500">Account Number</p>
                      <p className="text-base font-black text-slate-900 font-mono tracking-wider">
                        {MONIEPOINT_ACCOUNT}
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

                  <p className="text-[10px] text-amber-800">
                    Bank Name: <strong>{MONIEPOINT_BANK}</strong>
                  </p>
                </div>

                {/* Receipt Upload */}
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
                          <span className="text-slate-900 font-bold">{receiptImage.name}</span>
                        ) : (
                          'Tap to upload transfer receipt'
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
                  {fulfillmentType === 'pickup' && (
                    <div className="flex justify-between text-slate-600">
                      <span>Pickup & Delivery Fee</span>
                      <span>₦{PICKUP_DELIVERY_FEE.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-200 pt-1.5 mt-1">
                    <span>Total Amount</span>
                    <span className="text-slate-900">₦{finalTotalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Action Button */}
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <button
                type="submit"
                form="wear-wash-form"
                disabled={isProcessing}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-2xl shadow-lg text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isProcessing
                  ? 'Submitting Order...'
                  : `Confirm Order & Send (₦${finalTotalPrice.toLocaleString()})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WearWashPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading page...</div>}>
      <WearWashContent />
    </Suspense>
  );
}