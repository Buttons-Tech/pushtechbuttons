'use client';

import Link from 'next/link';

export default function DunamisWalletPage() {
  return (
    <main className="px-4 pt-6 pb-24">
      <h1 className="text-2xl font-black text-white mb-1">Camp Wallet</h1>
      <p className="text-xs text-zinc-400 mb-6">Manage your digital balance and pass</p>

      {/* Wallet Card */}
      <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Available Balance</span>
            <h2 className="text-4xl font-black text-white mt-1">₦3,500</h2>
          </div>
          <span className="bg-[#84CC16]/20 text-[#84CC16] text-[10px] font-bold px-2.5 py-1 rounded-md border border-[#84CC16]/30 uppercase">
            Active
          </span>
        </div>

        <Link
          href="/dunamis/onboarding"
          className="w-full block text-center bg-[#84CC16] hover:bg-[#65A30D] text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition"
        >
          + Fund Wallet via OPay
        </Link>
      </div>

      {/* QR Identification Pass */}
      <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-5 text-center mb-6">
        <span className="text-xs text-zinc-400 font-semibold block mb-3">Your Camper QR Pass</span>
        <div className="w-36 h-36 bg-white rounded-xl mx-auto p-2 flex items-center justify-center">
          {/* Simple QR placeholder box */}
          <div className="w-full h-full bg-black rounded-lg flex items-center justify-center text-[10px] font-mono text-white text-center p-2">
            [CAMPER-PASS-DUNAMIS]
          </div>
        </div>
        <p className="text-xs text-zinc-500 mt-3">Show this QR to vendors for instant offline scan</p>
      </div>
    </main>
  );
}