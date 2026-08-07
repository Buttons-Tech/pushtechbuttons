'use client';

import React, { useState } from 'react';
import { Utensils, Shirt, Scissors, LayoutGrid, Phone, ArrowRight } from 'lucide-react';

export default function ButtnsLanding() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleTapIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean up local format if user types leading zero
    let cleanedNumber = phoneNumber.trim();
    if (cleanedNumber.startsWith('0')) {
      cleanedNumber = cleanedNumber.substring(1);
    }
    
    const fullWhatsAppNumber = `+234${cleanedNumber}`;
    
    // Mocking success behavior
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setPhoneNumber('');
    }, 4000);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center font-sans antialiased">
      {/* PWA Frame/Container */}
      <div className="w-full max-w-md bg-white shadow-xl flex flex-col justify-between relative overflow-hidden min-h-screen md:min-h-[850px] md:my-6 md:rounded-3xl border border-gray-100">
        
        {/* Header / Brand Section */}
        <header className="pt-8 px-6 pb-4 bg-gradient-to-b from-amber-50 to-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {/* Custom Buttns Minimal Logo */}
              <div className="w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center shadow-sm">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="text-2xl font-black tracking-tight text-gray-800">Buttns</span>
            </div>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Coming Soon
            </span>
          </div>
          <p className="text-gray-500 font-medium text-sm tracking-wide">connecting villages</p>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 px-6 flex flex-col justify-center gap-8 py-4">
          
          {/* Hero Content */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight leading-tight">
              Something Big is <br />
              <span className="text-amber-500">Coming Offline & Online</span>
            </h1>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              Your essential village services, unified into simple, accessible buttons. Tap into the future.
            </p>
          </div>

          {/* Quick Services Matrix (OPay Grid Style) */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
              Quick Services
            </p>
            <div className="grid grid-cols-2 gap-3">
              
              {/* Button 1 */}
              <button className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-amber-200 transition-all active:scale-95 text-left group">
                <div className="w-10 h-10 bg-amber-50 group-hover:bg-amber-100 rounded-xl flex items-center justify-center text-amber-500 transition-colors shrink-0">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-800 leading-tight">Food & Drinks</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Order local bites</p>
                </div>
              </button>

              {/* Button 2 */}
              <button className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-amber-200 transition-all active:scale-95 text-left group">
                <div className="w-10 h-10 bg-amber-50 group-hover:bg-amber-100 rounded-xl flex items-center justify-center text-amber-500 transition-colors shrink-0">
                  <Shirt className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-800 leading-tight">Wear & Wash</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Laundry & Fits</p>
                </div>
              </button>

              {/* Button 3 */}
              <button className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-amber-200 transition-all active:scale-95 text-left group">
                <div className="w-10 h-10 bg-amber-50 group-hover:bg-amber-100 rounded-xl flex items-center justify-center text-amber-500 transition-colors shrink-0">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-800 leading-tight">Hair & Style</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Salons & Barbers</p>
                </div>
              </button>

              {/* Button 4 */}
              <button className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-amber-200 transition-all active:scale-95 text-left group">
                <div className="w-10 h-10 bg-amber-50 group-hover:bg-amber-100 rounded-xl flex items-center justify-center text-amber-500 transition-colors shrink-0">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-800 leading-tight">More</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Explore hubs</p>
                </div>
              </button>

            </div>
          </div>

          {/* Waitlist / Tap In Card */}
          <div className="bg-amber-50/60 rounded-3xl p-5 border border-amber-100/50 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
              <p className="text-xs font-semibold text-amber-900">
                {isSubmitted ? 'Checking details...' : 'Get early access updates via WhatsApp'}
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-white border border-amber-200 rounded-xl p-4 text-center animate-fade-in">
                <p className="text-sm font-bold text-gray-800">🎉 Tapped In Successfully!</p>
                <p className="text-xs text-gray-500 mt-1">We will message you on WhatsApp soon.</p>
              </div>
            ) : (
              <form onSubmit={handleTapIn} className="space-y-3">
                {/* Input Container */}
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-gray-400 font-semibold flex items-center gap-1 border-r border-gray-200 pr-2 pointer-events-none">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">+234</span>
                  </div>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="8012345678"
                    maxLength={11}
                    pattern="[0-9]{10,11}"
                    className="w-full pl-24 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all font-medium text-gray-800 shadow-sm"
                  />
                </div>

                {/* Lime Tap In CTA */}
                <button
                  type="submit"
                  className="w-full py-4 bg-lime-500 hover:bg-lime-600 text-gray-900 font-extrabold rounded-xl shadow-md shadow-lime-500/10 flex items-center justify-center gap-2 transition-all active:scale-[0.99] tracking-wide text-sm"
                >
                  <span>TAP IN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </main>

        {/* Footer */}
        <footer className="py-6 text-center text-[11px] text-gray-400 tracking-wider">
          &copy; 2026 Buttns Technology. All rights reserved.
        </footer>
      </div>
    </div>
  );
}