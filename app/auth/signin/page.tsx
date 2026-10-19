// app/auth/signin/page.tsx
"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Sparkles, Store, User, ArrowRight, Lock, Mail } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [role, setRole] = useState<"customer" | "vendor">("customer");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      emailOrPhone,
      password,
      role,
      redirect: false,
    });

    setLoading(false);

    if (res?.ok) {
      if (role === "vendor") {
        router.push("/vendor/dashboard");
      } else {
        router.push("/");
      }
    } else {
      alert("Invalid sign-in credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-5 shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-2">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-black tracking-tight">Sign In to Buttns</h2>
          <p className="text-xs text-gray-400 font-medium">Access your estate portal & services</p>
        </div>

        {/* Role Switcher */}
        <div className="grid grid-cols-2 gap-1 bg-zinc-900 p-1 rounded-2xl border border-zinc-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole("customer")}
            className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              role === "customer" ? "bg-amber-400 text-black font-black" : "text-gray-400 hover:text-white"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Resident</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("vendor")}
            className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              role === "vendor" ? "bg-amber-400 text-black font-black" : "text-gray-400 hover:text-white"
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Vendor</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400">
              {role === "vendor" ? "Vendor Email or Phone" : "Resident Email or Phone"}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder={role === "vendor" ? "vendor@estate.com" : "resident@estate.com"}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-amber-400/20 mt-2"
          >
            <span>{loading ? "Authenticating..." : "Sign In Now"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}