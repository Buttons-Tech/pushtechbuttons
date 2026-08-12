"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Image as ImageIcon,
  DollarSign,
  Utensils,
} from "lucide-react";

const API_BASE = "https://kitchen-server-d763.onrender.com/food";

interface FoodItem {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  available: boolean;
}

const DEFAULT_FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", // Burger
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80", // Pizza
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", // Salad
  "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80", // Fried Rice
];

export default function KitchenStaffPage() {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
  const [formData, setFormData] = useState<FoodItem>({
    name: "",
    price: 0,
    category: "Main Course",
    description: "",
    imageUrl: DEFAULT_FOOD_IMAGES[0],
    available: true,
  });

  // Fetch Food Items
  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to load menu items");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : data.data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Could not connect to kitchen server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Open Form Modal (Create or Edit)
  const handleOpenModal = (item?: FoodItem) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        price: 0,
        category: "Main Course",
        description: "",
        imageUrl:
          DEFAULT_FOOD_IMAGES[
            Math.floor(Math.random() * DEFAULT_FOOD_IMAGES.length)
          ],
        available: true,
      });
    }
    setIsModalOpen(true);
  };

  // Submit Handler (Create / Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const itemId = editingItem?.id || editingItem?._id;
    const url = itemId ? `${API_BASE}/${itemId}` : API_BASE;
    const method = itemId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save item");
      const savedData = await res.json();

      // Live UI Update without manual reload
      if (itemId) {
        setItems((prev) =>
          prev.map((i) => ((i.id || i._id) === itemId ? savedData : i)),
        );
      } else {
        setItems((prev) => [savedData, ...prev]);
      }

      setIsModalOpen(false);
      fetchItems(); // Soft sync
    } catch (err: any) {
      alert(err.message || "Error saving item");
    } finally {
      setSaving(false);
    }
  };

  // Toggle Availability Live
  const handleToggleAvailability = async (item: FoodItem) => {
    const itemId = item.id || item._id;
    const updatedStatus = !item.available;

    // Optimistic UI Update
    setItems((prev) =>
      prev.map((i) =>
        (i.id || i._id) === itemId ? { ...i, available: updatedStatus } : i,
      ),
    );

    try {
      await fetch(`${API_BASE}/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ available: updatedStatus }),
      });
    } catch (err) {
      fetchItems(); // Revert on failure
    }
  };

  // Delete Item
  const handleDelete = async (item: FoodItem) => {
    const itemId = item.id || item._id;
    if (!confirm(`Delete "${item.name}" from the live menu?`)) return;

    // Optimistic UI Removal
    setItems((prev) => prev.filter((i) => (i.id || i._id) !== itemId));

    try {
      const res = await fetch(`${API_BASE}/${itemId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete item");
    } catch (err) {
      alert("Could not delete item from server");
      fetchItems();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      {/* OPay Style Green Banner Header */}
      <header className="bg-emerald-600 text-white px-6 py-8 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-100 text-sm font-medium">
              <Utensils className="w-4 h-4" /> Kitchen Staff Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mt-1">
              Live Menu Management
            </h1>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-white text-emerald-700 font-bold px-5 py-3 rounded-xl shadow-lg hover:bg-emerald-50 transition transform active:scale-95"
          >
            <Plus className="w-5 h-5 stroke-[3]" /> Add New Dish
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 mt-8">
        {/* Status Bar */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-semibold text-slate-700">
              Live Sync:{" "}
              <strong className="text-emerald-600">
                {items.length} Dishes Active
              </strong>
            </span>
          </div>

          <button
            onClick={fetchItems}
            className="p-2 text-slate-500 hover:text-emerald-600 rounded-lg hover:bg-slate-100 transition"
            title="Refresh menu"
          >
            <RefreshCw
              className={`w-5 h-5 ${loading ? "animate-spin text-emerald-600" : ""}`}
            />
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Food Items Grid */}
        {loading && items.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            Loading menu items...
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500 font-medium">
              No food items created yet.
            </p>
            <button
              onClick={() => handleOpenModal()}
              className="mt-4 text-emerald-600 font-bold hover:underline"
            >
              Add your first dish
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => {
              const id = item.id || item._id;
              return (
                <div
                  key={id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col transition hover:shadow-md"
                >
                  {/* Real Food Picture with Overlay Status */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={item.imageUrl || DEFAULT_FOOD_IMAGES[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          DEFAULT_FOOD_IMAGES[0];
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => handleToggleAvailability(item)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-md transition flex items-center gap-1 ${
                          item.available
                            ? "bg-emerald-500 text-white hover:bg-emerald-600"
                            : "bg-slate-800 text-white hover:bg-slate-900"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {item.available ? "Available" : "Out of Stock"}
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                          {item.name}
                        </h3>
                        <span className="text-emerald-600 font-extrabold text-lg">
                          ₦{Number(item.price).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        {item.category || "General"}
                      </p>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {item.description || "No description provided."}
                      </p>
                    </div>

                    {/* Action Bar */}
                    <div className="flex gap-2 mt-5 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-sm rounded-xl transition"
                      >
                        <Edit2 className="w-4 h-4" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="flex items-center justify-center p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition"
                        title="Delete Dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modal for Create/Edit Item */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {editingItem ? "Edit Food Item" : "Add New Food Item"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Dish Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Jollof Rice & Grilled Chicken"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Price (₦)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium bg-white"
                  >
                    <option value="Main Course">Main Course</option>
                    <option value="Fast Food">Fast Food</option>
                    <option value="Sides & Drinks">Sides & Drinks</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Image URL (Real Food Picture)
                </label>
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Short description of ingredients or preparation..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                />
              </div>

              {/* Quick Image Selector */}
              <div>
                <span className="block text-xs font-bold text-slate-500 mb-2">
                  Or choose a sample photo:
                </span>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {DEFAULT_FOOD_IMAGES.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, imageUrl: img })
                      }
                      className={`w-12 h-12 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                        formData.imageUrl === img
                          ? "border-emerald-500 ring-2 ring-emerald-200"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={img}
                        className="w-full h-full object-cover"
                        alt="sample"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition active:scale-95 disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingItem
                      ? "Update Item"
                      : "Create Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
