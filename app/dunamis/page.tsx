import Link from 'next/link';

const SERVICES = [
  { id: 'eat', label: 'Eat', emoji: '🍔', category: 'EAT', desc: 'Meals, Shawarma, Drinks' },
  { id: 'hair', label: 'Hair', emoji: '✂️', category: 'HAIR', desc: 'Cuts, Braids, Styling' },
  { id: 'wear', label: 'Wear', emoji: '👕', category: 'WEAR', desc: 'Laundry, Ironing, Merch' },
  { id: 'power', label: 'Power', emoji: '⚡', category: 'POWER', desc: 'Charging Slots, Power Banks' },
];

export default function DunamisHomePage() {
  return (
    <main className="px-4 pt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-zinc-400 text-xs uppercase tracking-wider font-semibold">Dunamis Camp Services</p>
          <h1 className="text-2xl font-black text-white mt-0.5">Everything, one tap away</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B] flex items-center justify-center font-bold text-[#F59E0B] text-sm">
          BT
        </div>
      </div>

      {/* Quick Wallet Banner */}
      <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-5 mb-8 flex justify-between items-center shadow-lg">
        <div>
          <span className="text-xs text-zinc-400 font-medium">Wallet Balance</span>
          <h2 className="text-3xl font-extrabold text-white mt-1">₦3,500</h2>
        </div>
        <Link 
          href="/dunamis/wallet" 
          className="bg-[#84CC16] hover:bg-[#65A30D] text-black font-bold text-sm px-4 py-2.5 rounded-xl transition"
        >
          + Top Up
        </Link>
      </div>

      {/* 4 Service Buttons */}
      <div className="grid grid-cols-2 gap-4">
        {SERVICES.map((service) => (
          <Link 
            key={service.id} 
            href={`/dunamis/catalog/${service.id}`}
            className="group bg-[#121212] border border-zinc-800 rounded-2xl p-4 hover:border-[#84CC16] transition flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition duration-200">
                {service.emoji}
              </div>
              <h3 className="font-bold text-lg text-white">{service.label}</h3>
              <p className="text-xs text-zinc-400 mt-0.5">{service.desc}</p>
            </div>

            <div className="mt-4 w-full bg-[#84CC16] hover:bg-[#65A30D] text-black font-extrabold text-center py-2.5 rounded-xl text-xs uppercase tracking-wider transition">
              Tap in
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}