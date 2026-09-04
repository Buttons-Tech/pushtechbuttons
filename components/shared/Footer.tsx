// src/components/shared/Footer.tsx

export const Footer = () => {
  return (
    <footer className="bg-buttons-accent text-white pt-20 pb-10 overflow-hidden relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-african-pattern bg-[length:200px_200px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Mission */}
          <div className="col-span-2">
            <h3 className="text-8xl text-black  font-black mb-6 text-center opacity-14">
              BUTTONS
            </h3>
            

            <p className="text-black max-w-sm text-lg leading-relaxed mt-4">
              We are an indigenous <br />
              <span className="font-black text-2xl">African TECH Community</span>{" "}
              <br /> 
              Eliminating the "hustle" so you can focus on your greatness.
            </p>
          </div>

          {/* Navigation Groups */}
          <div>
            <h4 className="font-bold mb-6 text-black uppercase tracking-widest text-xs">
              Ecosystem
            </h4>
            <ul className="space-y-4 text-black">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Food Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Laundry Care
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Salon & Grooming
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Emergency Health
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-black uppercase tracking-widest text-xs">
              Join Us
            </h4>
            <ul className="space-y-4 text-black">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Business Onboarding
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Talent Training
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Scholarship Route
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-black">
            © 2026 Buttons Technology. Built for Africa, by Africa.
          </p>
          <div className="flex gap-6">
            {/* Social Icons Placeholder */}
            {["Twitter", "Instagram", "LinkedIn"].map((platform) => (
              <a
                key={platform}
                href="#"
                className="text-black hover:text-white text-sm font-bold uppercase tracking-tighter transition-colors"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
