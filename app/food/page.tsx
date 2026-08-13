"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

// --- Type Definitions ---
export interface FoodItem {
  _id?: string;
  id?: string;
  name: string;
  category:
    | "Swallow"
    | "Rice & Spaghetti"
    | "Proteins"
    | "Sides"
    | "Drinks"
    | "Snacks"
    | string;
  price: number;
  description: string;
  image: string;
}

export interface TrayItem {
  item: FoodItem;
  quantity: number;
}

const API_URL = "https://kitchen-server-d763.onrender.com/food";
const KITCHEN_WHATSAPP_NUMBER = "2348000000000";

const CATEGORIES = [
  "All",
  "Swallow",
  "Rice & Spaghetti",
  "Proteins",
  "Sides",
  "Drinks",
  "Snacks",
] as const;

// Inner component wrapped in Suspense for Next.js query parameter safety
function FoodMenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  // --- State ---
  const [menuItems, setMenuItems] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);
  const [tray, setTray] = useState<TrayItem[]>([]);
  const [isTrayOpen, setIsTrayOpen] = useState<boolean>(false);
  const [tableNumber, setTableNumber] = useState<string>(
    searchParams.get("table") || "",
  );
  const [customerName, setCustomerName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Fetch items on mount
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error(`Server returned status: ${res.status}`);
      }

      const data: FoodItem[] = await res.json();
      setMenuItems(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch food items");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Safe helper to grab unique item ID from MongoDB or standard ID
  const getItemId = (item: FoodItem): string => {
    return item._id || item.id || item.name;
  };

  // Helper function to guarantee a valid image URL string
  const getValidImageUrl = (url?: string | null): string => {
    if (!url || typeof url !== "string" || url.trim() === "") {
      // Fallback default food image
      return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";
    }
    return url;
  };
  // Filter Items
  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return menuItems;
    return menuItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, menuItems]);

  // Tray Totals
  const totalItemsCount = useMemo(() => {
    return tray.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [tray]);

  const totalPrice = useMemo(() => {
    return tray.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  }, [tray]);

  // Tray Controls
  const addToTray = (item: FoodItem): void => {
    const targetId = getItemId(item);
    setTray((prev) => {
      const existing = prev.find((t) => getItemId(t.item) === targetId);
      if (existing) {
        return prev.map((t) =>
          getItemId(t.item) === targetId
            ? { ...t, quantity: t.quantity + 1 }
            : t,
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromTray = (itemId: string): void => {
    setTray((prev) =>
      prev
        .map((t) =>
          getItemId(t.item) === itemId ? { ...t, quantity: t.quantity - 1 } : t,
        )
        .filter((t) => t.quantity > 0),
    );
  };

  const getItemQuantity = (itemId: string): number => {
    return tray.find((t) => getItemId(t.item) === itemId)?.quantity || 0;
  };

  // WhatsApp Order Dispatch
  const sendOrderToWhatsApp = (paymentRef: string): void => {
    const orderItemsText = tray
      .map(
        (t) =>
          `• ${t.quantity}x ${t.item.name} - ₦${(t.item.price * t.quantity).toLocaleString()}`,
      )
      .join("\n");

    const message =
      `🚨 *NEW TABLE ORDER* 🚨\n\n` +
      `📍 *Table Number:* ${tableNumber}\n` +
      `👤 *Customer Name:* ${customerName}\n` +
      `💳 *Payment Status:* PAID via OPay\n` +
      `🔖 *Ref:* ${paymentRef}\n\n` +
      `📋 *ORDER SUMMARY:*\n${orderItemsText}\n\n` +
      `💰 *Total Paid:* ₦${totalPrice.toLocaleString()}\n` +
      (notes ? `📝 *Notes:* ${notes}\n` : "") +
      `\n⏰ *Time:* ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

    window.open(
      `https://wa.me/${KITCHEN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  // OPay Checkout
  const handleCheckout = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!tableNumber || !customerName) {
      alert("Please fill in your Table Number and Name.");
      return;
    }

    setIsProcessing(true);
    const orderRef = `OPAY-${Date.now().toString().slice(-6)}`;

    try {
      const res = await fetch("/api/opay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          reference: orderRef,
          customerName,
          tableNumber,
        }),
      });

      const data = await res.json();

      if (data.code === "00000") {
        sendOrderToWhatsApp(orderRef);
        if (data.data?.cashierUrl) {
          window.location.href = data.data.cashierUrl;
        }
      } else {
        alert("Could not initialize payment. Please try again.");
      }
    } catch (err: unknown) {
      console.error(err);
      alert("Checkout failed. Please check your connection.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-emerald-700 text-white shadow-md">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="text-xs bg-emerald-800 hover:bg-emerald-900 px-2.5 py-1 rounded-lg font-semibold"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight">
                Food Menu
              </h1>
              <p className="text-[10px] text-emerald-100">
                Select items on your tray
              </p>
            </div>
          </div>
          <button
            onClick={() => fetchMenuItems()}
            className="text-[10px] bg-emerald-800 hover:bg-emerald-900 text-emerald-100 px-2.5 py-1 rounded-full font-medium"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex overflow-x-auto gap-2 px-4 py-2.5 bg-emerald-800 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-amber-400 text-emerald-950 shadow-sm"
                  : "bg-emerald-700/60 text-white hover:bg-emerald-700"
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
          <h2 className="text-base font-bold text-slate-800">
            {selectedCategory}
          </h2>
          <span className="text-xs text-slate-500">
            {filteredItems.length} items
          </span>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-600 border-t-transparent"></div>
            <p className="text-xs text-slate-500 mt-2">Loading menu items...</p>
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

        {/* Food Items */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((food) => {
              const itemId = getItemId(food);
              const qty = getItemQuantity(itemId);

              return (
                <div
                  key={itemId}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-row h-32 hover:shadow-md transition-shadow"
                >
                  {/* <div className="relative w-32 h-full flex-shrink-0 bg-slate-100">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover"
                    />
                    <Image
                      src={food.image}
                      alt={food.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  </div> */}
                  <div className="relative w-32 h-full flex-shrink-0 bg-slate-100 overflow-hidden">
                    {food.image ? (
                      <img
                        src={getValidImageUrl(food.image)}
                        alt={food.name || "Food item"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if the image URL fails or throws a 404
                          const target = e.target as HTMLImageElement;
                          target.onerror = null; // Prevent infinite fallback loops
                          target.src =
                            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="p-3 flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 truncate">
                        {food.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                        {food.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-extrabold text-sm text-emerald-700">
                        ₦{food.price.toLocaleString()}
                      </span>

                      {qty === 0 ? (
                        <button
                          onClick={() => addToTray(food)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-xl text-xs font-semibold shadow-sm transition-transform active:scale-95"
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
                          <span className="text-xs font-bold text-slate-800">
                            {qty}
                          </span>
                          <button
                            onClick={() => addToTray(food)}
                            className="w-6 h-6 bg-emerald-600 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-xs"
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

      {/* Floating Tray Footer */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 p-3 z-30 shadow-2xl">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">
                Tray Total ({totalItemsCount} items)
              </p>
              <p className="text-lg font-black text-emerald-700">
                ₦{totalPrice.toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => setIsTrayOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-2xl shadow-lg text-sm transition-transform active:scale-95"
            >
              Checkout Tray ➔
            </button>
          </div>
        </div>
      )}

      {/* Checkout Drawer */}
      {isTrayOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end flex-col sm:justify-center items-center p-0 sm:p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 bg-emerald-700 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Your Food Tray</h3>
                <p className="text-xs text-emerald-100">
                  Review before sending to kitchen
                </p>
              </div>
              <button
                onClick={() => setIsTrayOpen(false)}
                className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              <div className="space-y-2">
                {tray.map(({ item, quantity }) => {
                  const id = getItemId(item);
                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between py-1.5 border-b border-slate-100"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          ₦{item.price.toLocaleString()} x {quantity}
                        </p>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-700">
                        ₦{(item.price * quantity).toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>

              <form
                id="checkout-form"
                onSubmit={handleCheckout}
                className="space-y-3 pt-2"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Table No. *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. T-04"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Special Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Extra pepper..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                  />
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 mt-4">
                  <div className="flex justify-between text-sm font-extrabold text-slate-900">
                    <span>Total Amount</span>
                    <span className="text-emerald-700">
                      ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl shadow-lg text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isProcessing
                  ? "Processing Payment..."
                  : `Pay ₦${totalPrice.toLocaleString()} with OPay`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main Page Component wrapped in Next.js Suspense Boundary
export default function FoodPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-500">
          Loading page...
        </div>
      }
    >
      <FoodMenuContent />
    </Suspense>
  );
}
