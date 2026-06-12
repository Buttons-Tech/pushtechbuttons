'use client';
import React, { useState, useEffect } from 'react';
import { Wallet, Bike, Utensils, CheckCircle, ArrowRight, Zap } from 'lucide-react';

// Strict Type Definitions for the Buttons Architecture
interface UserProfile {
  id: string;
  name: string;
  walletBalance: number;
  deliveryAddress: string;
  phone: string;
}

interface VendorProduct {
  id: string;
  vendorName: string;
  mealName: string;
  price: number;
  deliveryFee: number;
  estimatedMinutes: number;
}

type OrderStatus = 'IDLE' | 'PROCESSING' | 'CONFIRMED' | 'DISPATCH_ASSIGNED' | 'OUT_FOR_DELIVERY' | 'COMPLETED' | 'ERROR';

export default function FoodButtonSuperApp() {
  // 1. App State Management
  const [status, setStatus] = useState<OrderStatus>('IDLE');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // Mocking the loaded state from our indigenous user profile & onboarded vendor
  const [user, setUser] = useState<UserProfile>({
    id: "usr_harrison40",
    name: "Harrison",
    walletBalance: 7500, // Pre-funded wallet capital
    deliveryAddress: "Lekki Phase 1, Orchid Road, Facility B",
    phone: "+2348123456789"
  });

  const [activeMeal, setActiveMeal] = useState<VendorProduct>({
    id: "prod_bigger_bite_01",
    vendorName: "Bigger Bite",
    mealName: "Signature Chicken & Fried Rice Combo",
    price: 3500,
    deliveryFee: 700,
    estimatedMinutes: 22
  });

  const totalCost = activeMeal.price + activeMeal.deliveryFee;

  // 2. The Instant-Execution Loop (The "One-Tap" Promise)
  const handleOneTapOrder = async () => {
    if (user.walletBalance < totalCost) {
      setErrorMessage("Insufficient wallet balance. Please top up your Buttons Wallet.");
      setStatus('ERROR');
      return;
    }

    setStatus('PROCESSING');

    try {
      // Simulate direct API network call to our future NestJS backend gateway
      const response = await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Optimistically deduct the wallet balance immediately in UI state
      setUser(prev => ({
        ...prev,
        walletBalance: prev.walletBalance - totalCost
      }));
      
      setStatus('CONFIRMED');
    } catch (err) {
      setErrorMessage("Network sync timed out. Retrying local system routing.");
      setStatus('ERROR');
    }
  };

  // 3. Automated Logistics Tracking Simulator (For Monday Demonstration)
  useEffect(() => {
    if (status === 'CONFIRMED') {
      const timer = setTimeout(() => setStatus('DISPATCH_ASSIGNED'), 3000);
      return () => clearTimeout(timer);
    }
    if (status === 'DISPATCH_ASSIGNED') {
      const timer = setTimeout(() => setStatus('OUT_FOR_DELIVERY'), 4000);
      return () => clearTimeout(timer);
    }
    if (status === 'OUT_FOR_DELIVERY') {
      const timer = setTimeout(() => setStatus('COMPLETED'), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-between p-4 font-sans">
      
      {/* Upper Status Bar Layer */}
      <header className="w-full max-w-md bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold">
            {user.name[0]}
          </div>
          <div>
            <h3 className="font-bold text-sm">Welcome, {user.name}</h3>
            <p className="text-xs text-slate-400 truncate max-w-[180px]">{user.deliveryAddress}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100">
          <Wallet size={16} />
          <span className="font-mono font-bold text-sm">₦{user.walletBalance.toLocaleString()}</span>
        </div>
      </header>

      {/* Main Micro-App Interface */}
      <main className="w-full max-w-md flex-1 flex flex-col items-center justify-center py-8">
        
        {status === 'IDLE' && (
          <div className="w-full text-center space-y-8 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>Pinned Favorite Meal</span>
                <span className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">Active</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                  <Utensils size={24} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-800">{activeMeal.mealName}</h4>
                  <p className="text-sm text-slate-500">{activeMeal.vendorName} • {activeMeal.estimatedMinutes} mins delivery</p>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between text-sm font-medium text-slate-600">
                <span>Meal: ₦{activeMeal.price.toLocaleString()} + Delivery: ₦{activeMeal.deliveryFee}</span>
                <span className="font-bold text-slate-900">Total: ₦{totalCost}</span>
              </div>
            </div>

            {/* The One-Tap Core Interactive Component */}
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={handleOneTapOrder}
                className="w-56 h-56 rounded-full bg-gradient-to-tr from-orange-600 to-red-500 text-white font-black text-2xl shadow-xl hover:shadow-orange-200 hover:scale-105 active:scale-95 transition-all duration-200 flex flex-col items-center justify-center border-8 border-white outline outline-2 outline-orange-600/20 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Zap size={40} className="mb-2 animate-pulse" />
                <span>TAP TO FEED</span>
              </button>
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-400">No Cart. No Confirmation. One Tap.</p>
            </div>
          </div>
        )}

        {/* Real-time Tracking & Process States */}
        {status !== 'IDLE' && status !== 'ERROR' && (
          <div className="w-full bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-black text-slate-900">
                {status === 'PROCESSING' && "Routing Transaction..."}
                {status === 'CONFIRMED' && "Order Accepted!"}
                {status === 'DISPATCH_ASSIGNED' && "Linx Rider Assigned"}
                {status === 'OUT_FOR_DELIVERY' && "Food is En Route"}
                {status === 'COMPLETED' && "Task Done!"}
              </h2>
              <p className="text-sm text-slate-500">
                {status === 'PROCESSING' && "Securing wallet ledger tokens..."}
                {status === 'CONFIRMED' && `${activeMeal.vendorName} is preparing your food right now.`}
                {status === 'DISPATCH_ASSIGNED' && "Linx dispatch agent is arriving at the kitchen point."}
                {status === 'OUT_FOR_DELIVERY' && "Your driver is sprinting to your location."}
                {status === 'COMPLETED' && "Enjoy your meal, Harrison. Transaction closed successfully."}
              </p>
            </div>

            {/* Visual Pipeline/Tracking Graph */}
            <div className="relative flex justify-between items-center w-full px-4 py-2">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0" />
              <div 
                className="absolute top-1/2 left-0 h-1 bg-orange-600 -translate-y-1/2 z-0 transition-all duration-500" 
                style={{
                  width: status === 'PROCESSING' ? '10%' : status === 'CONFIRMED' ? '30%' : status === 'DISPATCH_ASSIGNED' ? '60%' : status === 'OUT_FOR_DELIVERY' ? '85%' : '100%'
                }}
              />
              
              <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 text-xs font-bold ${status !== 'PROCESSING' ? 'bg-orange-600 text-white' : 'bg-slate-200 text-slate-500'}`}><Utensils size={14}/></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 text-xs font-bold ${status === 'DISPATCH_ASSIGNED' || status === 'OUT_FOR_DELIVERY' || status === 'COMPLETED' ? 'bg-orange-600 text-white' : 'bg-slate-200 text-slate-500'}`}><Bike size={14}/></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 text-xs font-bold ${status === 'COMPLETED' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'}`}><CheckCircle size={14}/></div>
            </div>
          </div>
        )}

        {/* Error Handling State View */}
        {status === 'ERROR' && (
          <div className="w-full bg-red-50 border border-red-100 rounded-2xl p-6 text-center space-y-4">
            <h3 className="font-bold text-red-800">Transaction Aborted</h3>
            <p className="text-sm text-red-600">{errorMessage}</p>
            <button 
              onClick={() => setStatus('IDLE')} 
              className="px-4 py-2 bg-white border border-red-200 rounded-xl text-xs font-bold text-red-700 hover:bg-slate-50 transition"
            >
              Return to Control Panel
            </button>
          </div>
        )}
      </main>

      {/* Footer Branding Component */}
      <footer className="w-full text-center pb-2 text-xs font-bold tracking-widest text-slate-300 uppercase flex items-center justify-center gap-1">
        <span>Buttons Technology</span>
        <ArrowRight size={12} className="text-slate-300" />
        <span className="text-slate-400">Press Progress</span>
      </footer>
    </div>
  );
}