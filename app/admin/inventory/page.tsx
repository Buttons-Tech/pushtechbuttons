'use client';

import React, { useState, useEffect, useMemo } from 'react';

export interface Ingredient {
  _id: string;
  name: string;
  unit: string;
  currentStock: number;
  reorderLevel: number;
  unitCost: number;
}

const INVENTORY_API = 'https://kitchen-server-d763.onrender.com/inventory';

export default function InventoryDashboard() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // New Ingredient Modal State
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [newName, setNewName] = useState('');
  const [newUnit, setNewUnit] = useState('kg');
  const [newStock, setNewStock] = useState(0);
  const [newReorder, setNewReorder] = useState(5);
  const [newCost, setNewCost] = useState(0);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const res = await fetch(INVENTORY_API);
      if (res.ok) {
        const data = await res.json();
        setIngredients(data);
      }
    } catch (err) {
      console.error('Failed to load inventory', err);
    } finally {
      setLoading(false);
    }
  };

  // High level metrics for the owner
  const totalValue = useMemo(() => {
    return ingredients.reduce((acc, curr) => acc + curr.currentStock * curr.unitCost, 0);
  }, [ingredients]);

  const lowStockItems = useMemo(() => {
    return ingredients.filter((item) => item.currentStock <= item.reorderLevel);
  }, [ingredients]);

  const filteredIngredients = useMemo(() => {
    return ingredients.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [ingredients, searchTerm]);

  const handleCreateIngredient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(INVENTORY_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          unit: newUnit,
          currentStock: Number(newStock),
          reorderLevel: Number(newReorder),
          unitCost: Number(newCost),
        }),
      });

      if (res.ok) {
        setIsAddOpen(false);
        setNewName('');
        setNewStock(0);
        fetchInventory();
      }
    } catch (err) {
      alert('Failed to save ingredient');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h1 className="text-2xl font-black text-white">Kitchen Inventory & Stock Control</h1>
            <p className="text-xs text-slate-400">Track stock depletion, waste, and real-time valuation</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => fetchInventory()}
              className="bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold px-4 py-2 rounded-xl transition"
            >
              🔄 Refresh Data
            </button>
            <button
              onClick={() => setIsAddOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-xs text-white font-bold px-4 py-2 rounded-xl shadow-lg transition"
            >
              + Add New Ingredient
            </button>
          </div>
        </div>

        {/* Executive Numbers Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-800/80 border border-slate-700/50 p-5 rounded-2xl">
            <p className="text-xs text-slate-400 font-medium">Total Inventory Value</p>
            <p className="text-2xl font-black text-emerald-400 mt-1">
              ₦{totalValue.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-500 mt-1">Capital tied up in raw stock</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/50 p-5 rounded-2xl">
            <p className="text-xs text-slate-400 font-medium">Tracked Items</p>
            <p className="text-2xl font-black text-white mt-1">{ingredients.length}</p>
            <p className="text-[10px] text-slate-500 mt-1">Active raw ingredients</p>
          </div>

          <div className="bg-slate-800/80 border border-rose-900/30 p-5 rounded-2xl">
            <p className="text-xs text-rose-400 font-medium">Critical / Reorder Alerts</p>
            <p className="text-2xl font-black text-rose-500 mt-1">{lowStockItems.length}</p>
            <p className="text-[10px] text-rose-400/70 mt-1">Items below threshold</p>
          </div>
        </div>

        {/* Low Stock Warning Banner */}
        {lowStockItems.length > 0 && (
          <div className="bg-rose-950/40 border border-rose-800/50 p-4 rounded-2xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-2">
              <span>🚨 Low Stock Alert! Reorder needed immediately:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {lowStockItems.map((item) => (
                <span
                  key={item._id}
                  className="bg-rose-900/50 text-rose-200 border border-rose-700/50 text-xs px-3 py-1 rounded-lg font-mono"
                >
                  {item.name}: {item.currentStock} {item.unit} (Min: {item.reorderLevel})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Filter and Table */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <input
              type="text"
              placeholder="Search ingredient (e.g. Rice, Pepper, Chicken)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 text-xs text-slate-200 px-4 py-2 rounded-xl border border-slate-700 w-full max-w-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Ingredient Name</th>
                  <th className="p-4">Current Stock</th>
                  <th className="p-4">Reorder Level</th>
                  <th className="p-4">Unit Cost</th>
                  <th className="p-4">Total Value</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      Loading inventory records...
                    </td>
                  </tr>
                ) : filteredIngredients.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No ingredients found.
                    </td>
                  </tr>
                ) : (
                  filteredIngredients.map((item) => {
                    const isLow = item.currentStock <= item.reorderLevel;
                    return (
                      <tr key={item._id} className="hover:bg-slate-800/50 transition">
                        <td className="p-4 font-bold text-white">{item.name}</td>
                        <td className="p-4 font-mono font-semibold">
                          {item.currentStock} {item.unit}
                        </td>
                        <td className="p-4 font-mono text-slate-400">
                          {item.reorderLevel} {item.unit}
                        </td>
                        <td className="p-4 font-mono">₦{item.unitCost.toLocaleString()}</td>
                        <td className="p-4 font-mono font-bold text-emerald-400">
                          ₦{(item.currentStock * item.unitCost).toLocaleString()}
                        </td>
                        <td className="p-4">
                          {isLow ? (
                            <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
                              LOW STOCK
                            </span>
                          ) : (
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
                              OK
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl p-6 text-slate-100 space-y-4">
            <h3 className="font-bold text-base">Add New Raw Ingredient</h3>
            <form onSubmit={handleCreateIngredient} className="space-y-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Ingredient Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Vegetable Oil"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs outline-none focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Unit</label>
                  <select
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs outline-none"
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="liters">Liters (L)</option>
                    <option value="pieces">Pieces</option>
                    <option value="packs">Packs</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Current Stock</label>
                  <input
                    required
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Reorder Level Alert</label>
                  <input
                    required
                    type="number"
                    value={newReorder}
                    onChange={(e) => setNewReorder(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Cost Per Unit (₦)</label>
                  <input
                    required
                    type="number"
                    value={newCost}
                    onChange={(e) => setNewCost(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 text-xs bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold"
                >
                  Save Ingredient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}