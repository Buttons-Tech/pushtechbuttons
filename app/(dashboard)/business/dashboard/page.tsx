"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { 
  Store, 
  Edit3, 
  Plus, 
  User, 
  Eye, 
  Sparkles 
} from "lucide-react";

interface VendorItem {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

export default function BusinessDashboardPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [items, setItems] = useState<VendorItem[]>([
    { id: "1", name: "Jollof Rice & Fried Chicken", price: 3500, available: true },
    { id: "2", name: "Egusi Soup & Pounded Yam", price: 4000, available: true },
    { id: "3", name: "Chilled Tiger Nut Drink (50cl)", price: 1200, available: false },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);

  const toggleAvailability = (id: string) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, available: !item.available } : item))
    );
  };

  const handleSavePrice = (id: string) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, price: editPrice } : item))
    );
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 max-w-md mx-auto space-y-4">
      {/* Top Navigation Switcher */}
      <div className="flex items-center justify-between bg-zinc-950 p-2 rounded-2xl border border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-amber-400 text-black flex items-center justify-center font-black text-xs">
            <Store className="w-4 h-4" />
          </div>
          <span className="text-xs font-black text-white">Business Hub</span>
        </div>

        <Link
          href="/user/profile"
          className="flex items-center gap-1.5 text-[10px] font-bold text-gray-300 bg-zinc-900 px-2.5 py-1.5 rounded-xl border border-zinc-800 hover:border-amber-400 transition-all"
        >
          <User className="w-3 h-3 text-emerald-400" />
          <span>User Profile</span>
        </Link>
      </div>

      {/* Interactive Store Link */}
      <div className="bg-gradient-to-br from-amber-500/20 via-zinc-950 to-zinc-950 border border-amber-500/30 rounded-3xl p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Live Storefront
          </span>
          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
            Online
          </span>
        </div>
        <h2 className="text-sm font-black text-white">Aunty Cossy Kitchen</h2>
        <p className="text-[10px] text-gray-400">
          Your public store link: <strong className="text-amber-300">buttns.app/store/aunty-cossy</strong>
        </p>

        <Link
          href="/store/aunty-cossy"
          className="flex items-center justify-between w-full bg-amber-400 text-black px-3 py-2 rounded-xl text-xs font-black hover:bg-amber-300 transition-all"
        >
          <span>View Public Store Page</span>
          <Eye className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Item & Price Management */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
          <div>
            <h3 className="text-xs font-black text-white">Item & Price Management</h3>
            <p className="text-[10px] text-gray-400">Real-time updates on your public page</p>
          </div>
          <button className="bg-zinc-900 border border-zinc-800 text-amber-400 px-2.5 py-1 rounded-xl text-[10px] font-black flex items-center gap-1">
            <Plus className="w-3 h-3" /> Add Item
          </button>
        </div>

        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{item.name}</span>
                <button
                  onClick={() => toggleAvailability(item.id)}
                  className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full transition-all ${
                    item.available
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
                >
                  {item.available ? "In Stock" : "Sold Out"}
                </button>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-zinc-800/80">
                {editingId === item.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400">₦</span>
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(Number(e.target.value))}
                      className="w-20 bg-black border border-amber-400 rounded-lg px-2 py-0.5 text-xs text-white focus:outline-none"
                    />
                    <button
                      onClick={() => handleSavePrice(item.id)}
                      className="bg-amber-400 text-black px-2 py-0.5 rounded-lg text-[10px] font-black"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-amber-400">
                      ₦{item.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setEditPrice(item.price);
                      }}
                      className="text-gray-500 hover:text-amber-400"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <span className="text-[10px] text-gray-500">Live Sync</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}