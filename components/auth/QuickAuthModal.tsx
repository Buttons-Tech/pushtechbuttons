"use client";

import React, { useState } from "react";
import { X, ShieldCheck, Loader2, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from '@/lib/api';

interface QuickAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
).replace(/\/$/, "");

export const QuickAuthModal: React.FC<QuickAuthModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { login } = useAuth();
  const [mode, setMode] = useState<"onboard" | "signin">("onboard");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handlePinChange = (val: string) => {
    const digitsOnly = val.replace(/\D/g, "").slice(0, 4);
    setPin(digitsOnly);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (pin.length !== 4) {
      setError("Please enter a 4-digit numeric PIN.");
      return;
    }

    setLoading(true);
    try {
      const endpoint =
        mode === "onboard" ? "/users/onboard" : "/auth/quick-login";
      const payload =
        mode === "onboard"
          ? { name, phone, email, location: location || "Igando, Lagos", pin }
          : { identifier, pin };

      const data = await api.post<{ user: any; accessToken: string }>(
        endpoint,
        payload,
        {
          auth: false,
        },
      );

      login(data.user, data.accessToken);
      setPin("");
      onClose();
    } catch (err: any) {
      setError(err.message || "Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-[#2962CC]">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-extrabold uppercase tracking-wider">
              Buttns Estate Access
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => {
              setMode("onboard");
              setError("");
              setPin("");
            }}
            className={`py-2 text-xs font-extrabold rounded-xl transition-all ${
              mode === "onboard"
                ? "bg-white text-[#2962CC] shadow-sm"
                : "text-slate-500"
            }`}
          >
            New Resident
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setError("");
              setPin("");
            }}
            className={`py-2 text-xs font-extrabold rounded-xl transition-all ${
              mode === "signin"
                ? "bg-white text-[#2962CC] shadow-sm"
                : "text-slate-500"
            }`}
          >
            Sign In
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === "onboard" ? (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Chigozie Ohakwe"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2962CC] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08012345678"
                    className="w-full px-3.5 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2962CC] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full px-3.5 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2962CC] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Estate & Nearest Junction
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Peace Estate Gate 2, Isuti Rd"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2962CC] focus:bg-white"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                WhatsApp Number or Email
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="08012345678 or you@email.com"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2962CC] focus:bg-white"
              />
            </div>
          )}

          {/* 4-Digit Security PIN (Both Modes) */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1">
              <Lock className="w-3.5 h-3.5 text-[#2962CC]" />
              <span>
                {mode === "onboard"
                  ? "Create 4-Digit Paatee PIN"
                  : "Enter 4-Digit PIN"}
              </span>
            </label>
            <input
              type="password"
              inputMode="numeric"
              pattern="\d{4}"
              maxLength={4}
              required
              value={pin}
              onChange={(e) => handlePinChange(e.target.value)}
              placeholder="••••"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-center text-lg font-extrabold tracking-[0.6em] focus:outline-none focus:ring-2 focus:ring-[#2962CC] focus:bg-white"
            />
          </div>

          {error && (
            <p className="text-xs font-semibold text-red-600 bg-red-50 px-3.5 py-2.5 rounded-xl">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-[#2962CC] hover:bg-[#1E4FA8] text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>
                {mode === "onboard"
                  ? "Create Account & Enter"
                  : "Unlock Account"}
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
