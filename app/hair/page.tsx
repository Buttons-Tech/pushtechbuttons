'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// --- Type Definitions ---
export interface HairService {
  _id?: string;
  id?: string;
  name: string;
  category: 'Haircuts' | 'Styling & Braids' | 'Dreads & Locs' | 'Treatments' | 'Barber Special' | string;
  price: number;
  description: string;
  image: string;
  duration?: string; // e.g., "45 mins"
}

export interface SelectedService {
  item: HairService;
  quantity: number;
}

const API_URL = 'https://kitchen-server-d763.onrender.com/hair'; // or your hair backend endpoint
const SALON_WHATSAPP_NUMBER = '2348000000000';
const MONIEPOINT_ACCOUNT = '8271570508';
const MONIEPOINT_BANK = 'Moniepoint Microfinance Bank';
const HOME_SERVICE_FEE = 1500; // Transportation/travel fee for Isuti area

const CATEGORIES = [
  'All',
  'Haircuts',
  'Styling & Braids',
  'Dreads & Locs',
  'Treatments',
  'Barber Special',
] as const;

function HairMenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  // --- State ---
  const [services, setServices] = useState<HairService[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [cart, setCart] = useState<SelectedService[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // --- Booking Form State ---
  const [bookingType, setBookingType] = useState<'home' | 'walkin'>('walkin');
  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [appointmentTime, setAppointmentTime] = useState<string>('');
  const [homeAddress, setHomeAddress] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [preferredStylist, setPreferredStylist] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [receiptImage, setReceiptImage] = useState<File | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Server returned status: ${res.status}`);
      const data: HairService[] = await res.json();
      setServices(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch services');
    } finally {
      setIsLoading(false);
    }
  };

  const getItemId = (item: HairService): string => item._id || item.id || item.name;

  const filteredServices = useMemo(() => {
    if (selectedCategory === 'All') return services;
    return services.filter((item) => item.category?.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory, services]);

  const totalServicesCount = useMemo(() => {
    return cart.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cart]);

  const subtotalPrice = useMemo(() => {
    return cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  }, [cart]);

  const finalTotalPrice = useMemo(() => {
    return subtotalPrice + (bookingType === 'home' ? HOME_SERVICE_FEE : 0);
  }, [subtotalPrice, bookingType]);

  const addToCart = (item: HairService): void => {
    const targetId = getItemId(item);
    setCart((prev) => {
      const existing = prev.find((c) => getItemId(c.item) === targetId);
      if (existing) {
        return prev.map((c) => (getItemId(c.item) === targetId ? { ...c, quantity: c.quantity + 1 } : c));
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

  const getServiceQuantity = (itemId: string): number => {
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

  const handleCompleteBooking = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!customerName || !customerPhone || !appointmentDate || !appointmentTime) {
      alert('Please fill in your Name, Phone Number, Date, and Time.');
      return;
    }

    if (bookingType === 'home' && !homeAddress) {
      alert('Please enter your home address in Isuti area.');
      return;
    }

    if (!receiptImage) {
      alert('Please upload your payment receipt screenshot before submitting.');
      return;
    }

    setIsProcessing(true);

    try {
      const serviceItemsText = cart
        .map((c) => `• ${c.quantity}x ${c.item.name} - ₦${(c.item.price * c.quantity).toLocaleString()}`)
        .join('\n');

      const bookingRef = `HAIR-${Date.now().toString().slice(-6)}`;

      const message =
        `✂️ *NEW BARBER / STYLIST BOOKING (${bookingType === 'home' ? 'HOME SERVICE' : 'SALON WALK-IN'})* ✂️\n\n` +
        `🔖 *Booking Ref:* ${bookingRef}\n` +
        `👤 *Name:* ${customerName}\n` +
        `📞 *Phone:* ${customerPhone}\n` +
        `📅 *Date:* ${appointmentDate}\n` +
        `⏰ *Time:* ${appointmentTime}\n` +
        (preferredStylist ? `💈 *Preferred Stylist:* ${preferredStylist}\n` : '') +
        (bookingType === 'home'
          ? `🏠 *Address (Isuti):* ${homeAddress}\n`
          : `🏪 *Type:* Walk-in at Salon\n`) +
        `\n💇‍♂️ *SERVICES REQUESTED:*\n${serviceItemsText}\n\n` +
        `💵 *Service Subtotal:* ₦${subtotalPrice.toLocaleString()}\n` +
        (bookingType === 'home' ? `🏠 *Home Service Travel Fee (Isuti):* ₦${HOME_SERVICE_FEE.toLocaleString()}\n` : '') +
        `💰 *TOTAL PAID:* ₦${finalTotalPrice.toLocaleString()}\n` +
        `🏦 *Payment Method:* Bank Transfer (Moniepoint)\n` +
        (notes ? `📝 *Notes:* ${notes}\n` : '') +
        `\n📌 *Note:* Payment receipt attached/uploaded.`;

      window.open(`https://wa.me/${SALON_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
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
              <h1 className="text-lg font-extrabold tracking-tight">Hair & Style</h1>
              <p className="text-[10px] text-slate-300">Book barbers & stylists</p>
            </div>
          </div>
          <button
            onClick={() => fetchServices()}
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

      {/* Main Services List */}
      <main className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-800">{selectedCategory}</h2>
          <span className="text-xs text-slate-500">{filteredServices.length} services</span>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-800 border-t-transparent"></div>
            <p className="text-xs text-slate-500 mt-2">Loading services...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-center my-6">
            <p className="text-xs text-rose-700 font-semibold">{error}</p>
            <button
              onClick={() => fetchServices()}
              className="mt-2 text-xs bg-rose-600 text-white px-3 py-1 rounded-lg font-bold"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServices.map((service) => {
              const itemId = getItemId(service);
              const qty = getServiceQuantity(itemId);
              const rawImg = service.image || (service as any).imageUrl || (service as any).img;
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
                        alt={service.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src =
                            'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80';
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
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-sm text-slate-900 truncate">{service.name}</h3>
                        {service.duration && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md font-mono">
                            {service.duration}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{service.description}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-extrabold text-sm text-slate-900">
                        ₦{service.price?.toLocaleString()}
                      </span>

                      {qty === 0 ? (
                        <button
                          onClick={() => addToCart(service)}
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
                            onClick={() => addToCart(service)}
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

      {/* Floating Booking Bar */}
      {totalServicesCount > 0 && (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 p-3 z-30 shadow-2xl">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Selected ({totalServicesCount} services)</p>
              <p className="text-lg font-black text-slate-900">₦{finalTotalPrice.toLocaleString()}</p>
            </div>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-2xl shadow-lg text-sm transition-transform active:scale-95"
            >
              Book Appointment ➔
            </button>
          </div>
        </div>
      )}

      {/* BOOKING DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end flex-col sm:justify-center items-center p-0 sm:p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden">
            
            {/* Drawer Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Schedule Appointment</h3>
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
              
              {/* Service Summary */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Services</p>
                {cart.map(({ item, quantity }) => (
                  <div key={getItemId(item)} className="flex justify-between text-xs">
                    <span className="text-slate-800">{quantity}x {item.name}</span>
                    <span className="font-semibold text-slate-900">₦{(item.price * quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* 1. Walk-In vs Home Service Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Service Location</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setBookingType('walkin')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      bookingType === 'walkin'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🏪 Salon Walk-In
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingType('home')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      bookingType === 'home'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🏠 Home Service (+₦1,500)
                  </button>
                </div>
              </div>

              {/* Booking Details Form */}
              <form id="booking-form" onSubmit={handleCompleteBooking} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David"
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

                {/* Date and Time Selection */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Date *</label>
                    <input
                      type="date"
                      required
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Preferred Time *</label>
                    <input
                      type="time"
                      required
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
                    />
                  </div>
                </div>

                {/* Preferred Barber/Stylist */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Preferred Stylist / Barber (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Any available, Senior Barber, Chidi..."
                    value={preferredStylist}
                    onChange={(e) => setPreferredStylist(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
                  />
                </div>

                {/* Home Address (If Home Service) */}
                {bookingType === 'home' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Home Address (Isuti Area) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Street name, house number or landmark in Isuti"
                      value={homeAddress}
                      onChange={(e) => setHomeAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Special Instructions</label>
                  <input
                    type="text"
                    placeholder="e.g. Sensitive skin, low fade..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
                  />
                </div>

                {/* Account Details Card */}
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

                {/* Price Summary */}
                <div className="bg-slate-100 p-3 rounded-2xl space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Services Subtotal</span>
                    <span>₦{subtotalPrice.toLocaleString()}</span>
                  </div>
                  {bookingType === 'home' && (
                    <div className="flex justify-between text-slate-600">
                      <span>Home Service Fee (Isuti Area)</span>
                      <span>₦{HOME_SERVICE_FEE.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-200 pt-1.5 mt-1">
                    <span>Total Amount to Pay</span>
                    <span className="text-slate-900">₦{finalTotalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Submit Button */}
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <button
                type="submit"
                form="booking-form"
                disabled={isProcessing}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-2xl shadow-lg text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isProcessing
                  ? 'Submitting Appointment...'
                  : `Confirm Appointment & Pay (₦${finalTotalPrice.toLocaleString()})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HairPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading page...</div>}>
      <HairMenuContent />
    </Suspense>
  );
}