"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://kitchen-server-d763.onrender.com/food";
const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";
const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "unsigned_preset";

const CATEGORIES = [
  "Swallow",
  "Rice & Spaghetti",
  "Proteins",
  "Sides",
  "Drinks",
  "Snacks",
];

interface FoodItem {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export default function KitchenAdminPage() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<FoodItem>({
    name: "",
    category: "Swallow",
    price: 0,
    description: "",
    image: "",
  });

  // Helper function to guarantee a valid image URL string
  const getValidImageUrl = (url?: string | null): string => {
    if (!url || typeof url !== "string" || url.trim() === "") {
      // Fallback default food image
      return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";
    }
    return url;
  };
  // Fetch items on mount
  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(API_BASE_URL);
      if (res.ok) {
        const data = await res.json();
        setFoods(data);
      }
    } catch (error) {
      console.error("Failed to fetch food items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Upload image to Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: uploadData,
        },
      );

      const data = await res.json();
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, image: data.secure_url }));
      } else {
        alert("Image upload failed. Check Cloudinary settings.");
      }
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      alert("Error uploading image to Cloudinary.");
    } finally {
      setIsUploading(false);
    }
  };

  // Create or Update Food
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload an image before submitting.");
      return;
    }

    try {
      const url = editingId ? `${API_BASE_URL}/${editingId}` : API_BASE_URL;
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        resetForm();
        fetchFoodItems();
      } else {
        alert("Failed to save food item.");
      }
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  // Delete Food
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchFoodItems();
      } else {
        alert("Failed to delete food item.");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Populate Edit Form
  const handleEdit = (item: FoodItem) => {
    const itemId = item._id || item.id || null;
    setEditingId(itemId);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      image: item.image,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      category: "Swallow",
      price: 0,
      description: "",
      image: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              Kitchen Staff Dashboard
            </h1>
            <p className="text-xs text-slate-500">
              Manage real-time food availability, prices, and photos
            </p>
          </div>
          <span className="self-start md:self-auto bg-emerald-100 text-emerald-800 text-xs px-3 py-1.5 rounded-full font-bold">
            NestJS API Connected
          </span>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
            <h2 className="text-lg font-bold mb-4 text-slate-900">
              {editingId ? "✏️ Edit Menu Item" : "➕ Add New Item"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Egusi & Pounded Yam"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Price (₦)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="e.g. 2500"
                  value={formData.price || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Brief description of ingredients..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>

              {/* Cloudinary Image Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Food Photo (Cloudinary)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                />
                {isUploading && (
                  <p className="text-xs text-amber-600 mt-1">
                    Uploading to Cloudinary...
                  </p>
                )}

                {/* Form Preview */}
                {formData.image && formData.image.trim() !== "" ? (
                  <div className="mt-2 relative w-full h-32 rounded-xl overflow-hidden border border-slate-200">
                    <img
                      src={getValidImageUrl(formData.image)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all disabled:opacity-50"
                >
                  {editingId ? "Update Item" : "Create Item"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Items Inventory Grid */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-4 text-slate-900">
              Current Food Items
            </h2>

            {isLoading ? (
              <p className="text-xs text-slate-500">
                Loading menu from NestJS server...
              </p>
            ) : foods.length === 0 ? (
              <p className="text-xs text-slate-500">
                No items found in database.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[700px] overflow-y-auto pr-1">
                {foods.map((food) => {
                  const itemId = food._id || food.id || "";
                  return (
                    <div
                      key={itemId}
                      className="border border-slate-200 rounded-2xl p-3 flex flex-col justify-between space-y-3 bg-slate-50/50 hover:bg-white transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {/* <Image

                          src={food.image}
                          alt={food.name}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-xl object-cover bg-slate-200"
                        /> */}
                        {/* Inventory List Item */}
                        <img
                          src={getValidImageUrl(food.image)}
                          alt={food.name}
                          className="w-16 h-16 rounded-xl object-cover bg-slate-200"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src =
                              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";
                          }}
                        />
                        {/* <img
                          src={food.image}
                          alt={food.name}
                          className="w-16 h-16 rounded-xl object-cover bg-slate-200"
                        /> */}
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                            {food.category}
                          </span>
                          <h3 className="font-bold text-xs text-slate-900 truncate mt-1">
                            {food.name}
                          </h3>
                          <p className="text-xs font-extrabold text-emerald-700">
                            ₦{food.price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 line-clamp-2">
                        {food.description}
                      </p>

                      <div className="flex gap-2 border-t border-slate-100 pt-2">
                        <button
                          onClick={() => handleEdit(food)}
                          className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold py-1.5 rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(itemId)}
                          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold py-1.5 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
