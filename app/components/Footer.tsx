export default function Footer() {
  return (
    <footer className="bg-background py-20 border-t border-white/5 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-5 bg-primary rounded-full" />
            <span className="text-white font-bold tracking-tighter uppercase">Buttons Technology LTD</span>
          </div>
          <p className="text-gray-500 text-xs max-w-xs leading-loose">
            Registered with the Corporate Affairs Commission. 
            Built on a major road in Lagos. Operating at the speed of thought.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-white text-[10px] font-bold uppercase tracking-widest">Connect</span>
            <a href="#" className="text-gray-500 text-xs hover:text-primary transition-colors">WhatsApp</a>
            <a href="#" className="text-gray-500 text-xs hover:text-primary transition-colors">LinkedIn</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-white text-[10px] font-bold uppercase tracking-widest">Legal</span>
            <a href="#" className="text-gray-500 text-xs hover:text-primary transition-colors">LTD Status</a>
            <a href="#" className="text-gray-500 text-xs hover:text-primary transition-colors">Privacy</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex justify-between">
        <span className="text-gray-600 text-[10px] uppercase">© 2026 Buttons Tech</span>
        <span className="text-gray-600 text-[10px] uppercase tracking-widest">Lagos, Nigeria</span>
      </div>
    </footer>
  );
}