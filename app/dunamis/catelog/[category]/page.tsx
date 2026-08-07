'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';

// Mock catalogs for prototype
const MENU_ITEMS: Record<string, Array<{ id: string; name: string; price: number }>> = {
  eat: [
    { id: '1', name: 'Shawarma (Double Sausage)', price: 2000 },
    { id: '2', name: 'Chicken & Chips', price: 2500 },
    { id: '3', name: 'Fried Rice & Turkey', price: 3000 },
    { id: '4', name: 'Swallow + Egusi & Beef', price: 1800 },
  ],
  hair: [
    { id: '5', name: 'Standard Haircut', price: 2000 },
    { id: '6', name: 'Hair Cut & Washing', price: 3000 },
    { id: '7', name: 'Braids / Styling', price: 4000 },
  ],
  wear: [
    { id: '8', name: 'Laundry (Per Bag)', price: 1500 },
    { id: '9', name: 'Ironing (3 Items)', price: 600 },
    { id: '10', name: 'Dunamis Camp Tee', price: 5000 },
  ],
  power: [
    { id: '11', name: '1 Hour Charging Slot', price: 200 },
    { id: '12', name: 'Power Bank Swap (24hrs)', price: 1000 },
  ],
};

export default function CategoryCatalogPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const categoryKey = resolvedParams.category.toLowerCase();
  const router = useRouter();

  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [deliveryType, setDeliveryType] = useState<'PICKUP' | 'DELIVERY'>('PICKUP');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const items = MENU_ITEMS[categoryKey] || [];
  const deliveryFee = deliveryType === 'DELIVERY' ? 200 : 0;

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const itemTotal = items.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);
  const grandTotal = itemTotal + (itemTotal > 0 ? deliveryFee : 0);

  const handleCheckout = async () => {
    if (grandTotal === 0) return;
    setIsSubmitting(true);

    // Simulated purchase: debits user, credits category vendor, notifies dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/dunamis/dashboard?success=true');
    }, 1000);
  };

  return (
    <main className="px-4 pt-6 pb-40">
      <div className="flex items-center space-x-2 mb-1">
        <button onClick={() => router.back()} className="text-zinc-400 text-sm font-bold">← Back</button>
      </div>
      <h1 className="text-2xl font-black capitalize text-white">{categoryKey} Menu</h1>
      <p className="text-xs text-zinc-400 mb-6">Select items to add to your cart</p>

      {/* Item List */}
      <div className="space-y-3">
        {items.map((item) => {
          const qty = cart[item.id] || 0;
          return (
            <div key={item.id} className="bg-[#121212] border border-zinc-800 rounded-2xl p-4 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-white text-base">{item.name}</h4>
                <p className="text-[#F59E0B] font-black text-sm mt-0.5">₦{item.price.toLocaleString()}</p>
              </div>

              {/* Add / Drop Selector */}
              <div className="flex items-center space-x-3 bg-zinc-900 border border-zinc-700 rounded-xl p-1">
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-8 h-8 rounded-lg bg-zinc-800 font-bold text-white flex items-center justify-center hover:bg-zinc-700"
                >
                  -
                </button>
                <span className="font-bold text-sm w-4 text-center">{qty}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-8 h-8 rounded-lg bg-[#84CC16] text-black font-bold flex items-center justify-center hover:bg-[#65A30D]"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Checkout Drawer */}
      {itemTotal > 0 && (
        <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto bg-[#121212] border-t border-zinc-800 p-4 shadow-2xl z-40 rounded-t-2xl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-zinc-400 font-semibold">Total (Inc. Delivery):</span>
            <span className="text-2xl font-black text-white">₦{grandTotal.toLocaleString()}</span>
          </div>

          {/* Delivery Toggle */}
          <div className="grid grid-cols-2 gap-2 mb-4 bg-zinc-900 p-1 rounded-xl">
            <button
              onClick={() => setDeliveryType('PICKUP')}
              className={`py-2 text-xs font-bold rounded-lg transition ${deliveryType === 'PICKUP' ? 'bg-[#F59E0B] text-black' : 'text-zinc-400'}`}
            >
              Pick Up
            </button>
            <button
              onClick={() => setDeliveryType('DELIVERY')}
              className={`py-2 text-xs font-bold rounded-lg transition ${deliveryType === 'DELIVERY' ? 'bg-[#F59E0B] text-black' : 'text-zinc-400'}`}
            >
              Delivery (+₦200)
            </button>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleCheckout}
            disabled={isSubmitting}
            className="w-full bg-[#84CC16] hover:bg-[#65A30D] text-black font-black text-sm uppercase tracking-wider py-3.5 rounded-xl transition"
          >
            {isSubmitting ? 'Processing...' : 'Tap in to Pay'}
          </button>
        </div>
      )}
    </main>
  );
}