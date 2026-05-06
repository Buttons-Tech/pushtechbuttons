// src/components/shared/Footer.tsx

export const Footer = () => {
  return (
    <footer className="bg-buttons-dark text-white pt-20 pb-10 overflow-hidden relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-african-pattern bg-[length:200px_200px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Mission */}
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-6">BUTTONS</h3>
            <p className="text-gray-400 max-w-sm text-lg leading-relaxed">
              We are building the tech powerhouse for Africa. 
              Eliminating the "hustle" so you can focus on your greatness.
            </p>
          </div>

          {/* Navigation Groups */}
          <div>
            <h4 className="font-bold mb-6 text-buttons-accent uppercase tracking-widest text-xs">Ecosystem</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Food Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Laundry Care</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Salon & Grooming</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Emergency Health</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-buttons-accent uppercase tracking-widest text-xs">Join Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Business Onboarding</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Talent Training</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Scholarship Route</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500">
            © 2026 Buttons Technology. Built for Lagos, by Lagos.
          </p>
          <div className="flex gap-6">
            {/* Social Icons Placeholder */}
            {['Twitter', 'Instagram', 'LinkedIn'].map((platform) => (
              <a key={platform} href="#" className="text-gray-500 hover:text-buttons-accent text-sm font-bold uppercase tracking-tighter transition-colors">
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};