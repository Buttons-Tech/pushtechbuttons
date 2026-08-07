'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DunamisOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<'REGISTER' | 'FUNDING'>('REGISTER');
  const [username, setUsername] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [amount, setAmount] = useState('1000');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && whatsapp.trim()) {
      setStep('FUNDING');
    }
  };

  const handlePayment = async () => {
    if (Number(amount) < 1000) return;
    setIsProcessing(true);

    // Simulated OPay payment verification & balance credit
    setTimeout(() => {
      setIsProcessing(false);
      router.push('/dunamis');
    }, 1200);
  };

  return (
    <main className="px-4 pt-10 pb-20">
      <div className="mb-8">
        <span className="text-[#84CC16] font-bold text-xs uppercase tracking-widest">Buttns Digital Services</span>
        <h1 className="text-3xl font-black mt-1 text-white">Join Dunamis Camp</h1>
        <p className="text-xs text-zinc-400 mt-1">Get your wallet ready in seconds.</p>
      </div>

      {step === 'REGISTER' ? (
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-400 block mb-1.5 font-semibold">Unique Username</label>
            <input
              type="text"
              required
              placeholder="e.g. David2026"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#84CC16] text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-1.5 font-semibold">WhatsApp Number</label>
            <input
              type="tel"
              required
              placeholder="08012345678"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#84CC16] text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#84CC16] hover:bg-[#65A30D] text-black font-extrabold py-3.5 rounded-xl uppercase text-sm tracking-wider mt-4 transition"
          >
            Next: Fund Wallet
          </button>
        </form>
      ) : (
        <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-5 space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-white">Initial Wallet Top-Up</h3>
            <span className="text-[10px] bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 font-bold px-2 py-0.5 rounded-md uppercase">
              Min ₦1,000
            </span>
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-1 font-semibold">Enter Amount (₦)</label>
            <input
              type="number"
              min="1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white font-black text-2xl focus:outline-none focus:border-[#F59E0B]"
            />
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-xl text-xs space-y-1">
            <p className="text-zinc-300 font-medium">Payment via <span className="text-[#84CC16] font-bold">OPay Transfer</span></p>
            <p className="text-zinc-500">Instant verification & automatic wallet activation.</p>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing || Number(amount) < 1000}
            className="w-full bg-[#84CC16] hover:bg-[#65A30D] text-black font-extrabold py-3.5 rounded-xl uppercase text-sm tracking-wider disabled:opacity-40 transition"
          >
            {isProcessing ? 'Verifying OPay Payment...' : `Tap In & Pay ₦${Number(amount).toLocaleString()}`}
          </button>

          <button
            onClick={() => setStep('REGISTER')}
            className="w-full text-zinc-400 text-xs font-bold py-1 hover:text-white transition"
          >
            ← Back to details
          </button>
        </div>
      )}
    </main>
  );
}