"use client";

export default function Footer() {
  return (
    <footer className="bg-black py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        
        <div>
          <h2 className="text-white text-4xl font-black tracking-tighter mb-4">PUSHTECHBUTTONS<span className="text-[#00FF00]">.</span></h2>
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em]">Managed by Ohakwechi</p>
          <div className="mt-8 flex gap-6">
            {["X", "LinkedIn", "GitHub"].map((link) => (
              <a key={link} href="#" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="text-left md:text-right">
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest mb-2">Lagos Infrastructure</p>
          <p className="text-white/40 text-[10px] font-medium leading-relaxed max-w-[200px]">
            Lekki | Igando | VI<br />
            24-Hour Digital Store Availability
          </p>
          <p className="text-gray-800 text-[9px] font-black uppercase tracking-widest mt-12">
            © 2026 Buttons Technology LTD
          </p>
        </div>
        
      </div>
    </footer>
  );
}