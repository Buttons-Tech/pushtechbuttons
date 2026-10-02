"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        
        <div>
          <Image 
          height={200}
          width={700}
          alt="push_l"
          src="/brand/push.png"
          />
          
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em]">Managed by The CLICK Team @buttns_Egan</p>
          <div className="mt-8 flex gap-6">
            {["X", "LinkedIn", "GitHub"].map((link) => (
              <a key={link} href="#" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="text-left md:text-right">
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest mb-2">BUTTNS URBAN TECH</p>
          <p className="text-white/40 text-[10px] font-medium leading-relaxed max-w-[200px]">
          (aka Buttons Technology Limited, Nigeria) <br />
          1, Buttns street, off Ija Road, Isuti-Egan, Igando Lagos <br />
          3, Lofty Brum, 124 orchid road, Eleganza busstop, Lekki II, Lagos <br />
           REG No: 9362896
            <br />
            Chat : 09033811883 <br />
            Mail: buttonsafrotech@gmail.com <br />
            Social Media: @buttns_egan
            
          </p>
          <p className="text-gray-800 text-[9px] font-black uppercase tracking-widest mt-12">
            © 2026 Buttons Technology LTD
          </p>
        </div>
        
      </div>
    </footer>
  );
}