// src/components/EarlyAccess.tsx
"use client";

import React, { useState } from "react";
import { Phone, ArrowRight, Loader2 } from "lucide-react";
import { db } from "../../lib/db";

export function EarlyAccess() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleTapIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    let cleanedNumber = phoneNumber.trim();
    if (cleanedNumber.startsWith("0")) {
      cleanedNumber = cleanedNumber.substring(1);
    }

    try {
      // Connects cleanly to our agnostic db layer
      await db.waitlist.create({
        phoneNumber: cleanedNumber,
        countryCode: "+234",
      });

      setStatus("success");
      setPhoneNumber("");
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="bg-amber-50/60 rounded-3xl p-5 border border-amber-100/50 space-y-4">
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${status === "loading" ? "bg-amber-500 animate-spin" : "bg-lime-500 animate-pulse"}`}
        />
        <p className="text-xs font-semibold text-amber-900">
          {status === "loading"
            ? "Securing your button..."
            : "Get early access updates via WhatsApp"}
        </p>
      </div>

      {status === "success" ? (
        <div className="bg-white border border-lime-200 rounded-xl p-4 text-center animate-fade-in">
          <p className="text-sm font-bold text-gray-800">
            🎉 Tapped In Successfully!
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Your spot is saved. We will ping you on WhatsApp soon.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="text-xs font-bold text-amber-600 underline mt-2 block mx-auto hover:text-amber-700"
          >
            Register another number
          </button>
        </div>
      ) : (
        <form onSubmit={handleTapIn} className="space-y-3">
          <div className="relative flex items-center">
            <div className="absolute left-4 text-gray-400 font-semibold flex items-center gap-1 border-r border-gray-200 pr-2 pointer-events-none">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-sm">+234</span>
            </div>
            <input
              type="tel"
              required
              disabled={status === "loading"}
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/\D/g, ""))
              }
              placeholder="8012345678"
              maxLength={11}
              pattern="[0-9]{10,11}"
              className="w-full pl-24 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all font-medium text-gray-800 shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {status === "error" && (
            <p className="text-xs font-semibold text-red-600 px-1">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-4 bg-lime-500 hover:bg-lime-600 text-gray-900 font-extrabold rounded-xl shadow-md shadow-lime-500/10 flex items-center justify-center gap-2 transition-all active:scale-[0.99] tracking-wide text-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>TAP IN</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
