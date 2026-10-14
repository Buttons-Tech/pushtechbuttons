"use client"
import React, { useState } from 'react'
import { 
  Rocket, Sparkles, BookOpen, Cpu, Code, Palette, Award, 
  User, CheckCircle, CreditCard, Calendar, ArrowRight, 
  ShieldCheck, Smile, Star, ChevronRight, Menu, X, Heart, Play
} from 'lucide-react';

const page = () => {


  // Onboarding & User State
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
    const [customerData, setCustomerData] = useState({
      username: 'Toluwalase Adebayo',
      phone: '09033811883',
      email: 'parent@dreambox.ng',
      location: 'Tiny Treasures School',
      usedButtn: ['eat', 'style']
    });

    const location = [
    "Ija",
    "Fatoki",
    "odo",
    "Last busstop",
    "Shoga",
    "Akesan",
    "Moshalashi"
  ];
  
  return (
    <>
      Welcvme Hvw are yu
      <button  onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-black shadow-md transform hover:-translate-y-0.5 transition">Sign in</button>

      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border-4 border-orange-100 relative">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-6 right-6 p-2 rounded-xl bg-orange-100 text-orange-600">
              <X className="w-6 h-6" />
            </button>
            <div className="text-center mb-6">
              <h3 className="text-3xl font-black text-slate-900">{authMode === 'login' ? 'Welcome Back!' : 'Onboard Child'}</h3>
              <p className="text-slate-500 font-medium text-sm mt-1">Buttns App Egan</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setIsLoggedIn(true);
              setShowAuthModal(false);
              // setActiveTab('profile');
            }} className="space-y-4">
              {authMode === 'signup' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Your Full Name</label>
                    <input type="text" required placeholder="Toluwalase Adebayo" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-orange-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Select location</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-orange-500">
                      {location.map((p, i) => <option key={i} value={p}>{p}</option>)}
                    </select>
                  </div>
                </>
              )}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Your email</label>
                <input type="email" required placeholder="tolu@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Password phrase</label>
                <input type="password" required placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-orange-500" />
              </div>

              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl shadow-lg transition">
                {authMode === 'login' ? 'Login to Dashboard' : 'Complete Onboarding'}
              </button>

              <div className="text-center pt-2">
                <button 
                  type="button" 
                  onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                  className="text-xs font-bold text-orange-600 hover:underline"
                >
                  {authMode === 'login' ? "Don't have an account? Onboard your child" : "Already registered? Login here"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default page
