"use client"
import React, { useState } from 'react'
import { 
  Rocket, Sparkles, BookOpen, Cpu, Code, Palette, Award, 
  User, CheckCircle, CreditCard, Calendar, ArrowRight, 
  ShieldCheck, Smile, Star, ChevronRight, Menu, X, Heart, Play
} from 'lucide-react';
import Image from 'next/image';
import ButtnsStrip from '@/components/ButtnsStrip';

const page = () => {
     const [customerData, setCustomerData] = useState({
          username: 'Toluwalase Adebayo',
          phone: '09033811883',
          email: 'toluwalase@gmail.com',
          location: 'Ija',
          usedButtn: ['eat', 'style']
        });
          const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    
        <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-lg">
                {/* {customerData.username.charAt(0)} */}
                <Image 
                src="/banner/hair2.jpg"
                width={50}
                height={50}
                alt='prfle'
            className='rounded-full'
                />
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-900">{customerData.username}</h1>
                <p className="text-orange-600 font-bold">Phone: {customerData.phone} • {customerData.location}</p>
                <p className="text-xs text-slate-400 mt-1">Email: {customerData.email}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 rounded-2xl font-bold transition"
            >
              Log Out
            </button>
          </div>

          <ButtnsStrip/>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100">
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-orange-500" />
                  <span>Recent orders</span>
                </h2>
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-slate-800">Global Taste Restaurant</h4>
                      <p className="text-xs text-slate-500 font-bold">Jollof rice + beef • Saturday 10:00 AM</p>
                    </div>
                    <span className="bg-orange-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs">Upcoming</span>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-slate-800">No Delay Laundry</h4>
                      <p className="text-xs text-slate-500 font-bold">2pcs Suit  • Tuesday 3:30 PM</p>
                    </div>
                    <span className="bg-amber-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs">Delivered</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100">
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center space-x-3">
                  <BookOpen className="w-6 h-6 text-orange-500" />
                  <span>Used Buttns</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {customerData.usedButtn.map((c, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border-2 border-orange-100 bg-orange-50/50 flex items-center justify-between">
                      <span className="font-black text-slate-800">{c}</span>
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100">
                <h3 className="text-xl font-black text-slate-900 mb-4">Edit User Details</h3>
                <form onSubmit={(e) => { e.preventDefault(); alert("Profile updated successfully!"); }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={customerData.username} 
                      onChange={(e) => setCustomerData({...customerData, username: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-800 focus:outline-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Location</label>
                    <input 
                      type="text" 
                      value={customerData.location} 
                      onChange={(e) => setCustomerData({...customerData, location: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-800 focus:outline-orange-500"
                    />
                  </div>
                  <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-3 rounded-xl shadow-md transition">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      )}

export default page
