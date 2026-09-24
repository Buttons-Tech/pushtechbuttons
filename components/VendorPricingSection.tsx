"use client";

import React, { useState } from 'react';
import { 
  Store, 
  Check, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Globe, 
  Sliders, 
  Sparkles,
  CreditCard,
  Building2
} from 'lucide-react';

interface VendorPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  tagline: string;
  webPageType: string;
  popular?: boolean;
  color: string;
  border: string;
  btnStyle: string;
  paystackPlanCode: string;
  features: string[];
}

const VENDOR_PLANS: VendorPlan[] = [
  {
    id: "basic",
    name: "Basic Directory",
    monthlyPrice: 3000,
    tagline: "Essential listing to keep your business active on the estate roster.",
    webPageType: "Static Profile (WhatsApp & Social Links)",
    color: "bg-gray-50 text-gray-900",
    border: "border-gray-200",
    btnStyle: "bg-gray-900 text-white hover:bg-gray-800",
    paystackPlanCode: "PLN_basic_3k",
    features: [
      "Active listing on Buttns Vendor List",
      "Static business profile page",
      "Direct WhatsApp & TikTok chat links",
      "Standard Ziig delivery requests",
      "Cancel or pause anytime"
    ]
  },
  {
    id: "pro-store",
    name: "Interactive Store",
    monthlyPrice: 8000,
    tagline: "Your own full interactive web page with live menu and pricing control.",
    webPageType: "Interactive Web Page + Live Vendor Backend",
    popular: true,
    color: "bg-amber-50/60 text-gray-900",
    border: "border-amber-400 ring-2 ring-amber-400/20",
    btnStyle: "bg-amber-500 text-gray-950 font-black hover:bg-amber-400",
    paystackPlanCode: "PLN_pro_8k",
    features: [
      "Full Interactive Web Page (buttns.app/store/your-name)",
      "Vendor Backend: Edit prices & items anytime",
      "Direct in-app ordering with Paystack checkout",
      "Priority Ziig runner dispatch for orders",
      "Verified Estate Vendor Badge",
      "In-App Portals Ad Credit"
    ]
  },
  {
    id: "partner",
    name: "Category Partner",
    monthlyPrice: 25000,
    tagline: "Dominate your category with top app placement and physical event booths.",
    webPageType: "Interactive Store + Custom Domain Mapping",
    color: "bg-purple-50/50 text-gray-900",
    border: "border-purple-300",
    btnStyle: "bg-purple-700 text-white font-black hover:bg-purple-800",
    paystackPlanCode: "PLN_partner_25k",
    features: [
      "Everything in Interactive Store",
      "Exclusive 'The Button' spot in your category",
      "Custom domain support (e.g. yourstore.com)",
      "Dedicated physical booth at Buttns events",
      "Physical Portals billboard slot at estate entrance",
      "1-on-1 account coordinator"
    ]
  }
];

export default function VendorPricingSection() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = (plan: VendorPlan) => {
    setLoadingPlan(plan.id);
    // Redirect to Paystack pre-configured subscription payment URL
    const checkoutUrl = `https://paystack.com/pay/buttns-vendor-${plan.id}?plan=${plan.paystackPlanCode}`;
    window.location.href = checkoutUrl;
  };

  return (
    <section className="space-y-3.5">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <Store className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-black text-gray-900 tracking-tight uppercase">
            Vendor Subscriptions
          </h2>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
          <Zap className="w-3 h-3 text-emerald-600" />
          Instant Setup
        </span>
      </div>

      {/* Main Pricing Box */}
      <div className="bg-white rounded-3xl border border-gray-200 p-4 shadow-sm space-y-4">
        
        <div className="text-center space-y-1 max-w-xs mx-auto">
          <h3 className="text-sm font-black text-gray-900">
            Get Your Business Online in the Estate
          </h3>
          <p className="text-[11px] font-medium text-gray-600 leading-relaxed">
            Every plan includes an estate presence. Upgrade to get your own interactive store page with live price editing!
          </p>
        </div>

        {/* Pricing Cards Stack */}
        <div className="space-y-3">
          {VENDOR_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative p-4 rounded-2xl border ${plan.border} ${plan.color} space-y-3 transition-all`}
            >
              {plan.popular && (
                <div className="absolute -top-2.5 right-4 bg-amber-500 text-gray-950 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Includes Interactive Web Page
                </div>
              )}

              {/* Header */}
              <div className="flex items-start justify-between gap-2 border-b border-gray-200/60 pb-2.5">
                <div>
                  <h4 className="text-sm font-black text-gray-900">{plan.name}</h4>
                  <p className="text-[10px] text-gray-600 font-medium mt-0.5 leading-tight">
                    {plan.tagline}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-baseline justify-end gap-0.5">
                    <span className="text-xs font-bold text-gray-500">₦</span>
                    <span className="text-lg font-black text-gray-900">
                      {plan.monthlyPrice.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500">/mo</span>
                  </div>
                </div>
              </div>

              {/* Highlight Box for Web Page Capability */}
              <div className="p-2 rounded-xl bg-white/80 border border-gray-200/80 flex items-center gap-2 text-[10px] font-bold text-gray-800">
                <Globe className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Web Feature: <strong className="text-gray-900">{plan.webPageType}</strong></span>
              </div>

              {/* Feature List */}
              <ul className="space-y-1.5 pt-0.5">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-[11px] font-medium text-gray-700">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Self-Serve Pay Button */}
              <button
                onClick={() => handleCheckout(plan)}
                disabled={loadingPlan === plan.id}
                className={`w-full py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98] ${plan.btnStyle}`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Select {plan.name} (₦{plan.monthlyPrice.toLocaleString()}/mo)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 font-medium">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Automated Paystack Billing</span>
          </div>
          <span>Instant vendor portal access</span>
        </div>

      </div>
    </section>
  );
}