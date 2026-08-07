export function Navbar() {
  return (
    <header className="pt-8 px-6 pb-4 bg-gradient-to-b from-amber-50 to-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
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
  );
}