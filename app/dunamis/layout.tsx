import Link from 'next/link';

export default function DunamisLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white antialiased font-sans">
      {/* Mobile-first viewport container */}
      <div className="max-w-md mx-auto min-h-screen relative pb-20 bg-black border-x border-zinc-900">
        {children}

        {/* OPay Style Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#121212] border-t border-zinc-800 flex justify-around items-center py-3 z-50">
          <Link href="/dunamis" className="flex flex-col items-center text-xs font-bold text-white hover:text-[#84CC16] transition">
            <span className="text-lg">🏠</span>
            <span className="mt-0.5">Home</span>
          </Link>
          <Link href="/dunamis/dashboard" className="flex flex-col items-center text-xs font-bold text-zinc-400 hover:text-[#84CC16] transition">
            <span className="text-lg">📊</span>
            <span className="mt-0.5">Dashboard</span>
          </Link>
          <Link href="/dunamis/wallet" className="flex flex-col items-center text-xs font-bold text-zinc-400 hover:text-[#84CC16] transition">
            <span className="text-lg">💳</span>
            <span className="mt-0.5">Wallet</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}