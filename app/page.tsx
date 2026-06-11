import Image from "next/image";

export default function ButtnsLandingPage() {
  return (
    <div className="font-sans text-gray-800 bg-white antialiased">
      {/* ─── NAVBAR ─── */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-5 border-b border-gray-100">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/Group 46.png" 
            width={140}
            height={45}
            className="object-contain"
            alt="BTTNS logo"
            priority
          />
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-800">
          <li>
            <a href="#" className="border-b-4 border-[#F5A623] pb-1">Home</a>
          </li>
          <li><a href="#services" className="hover:text-[#F5A623] transition">Services</a></li>
          <li><a href="#how-it-works" className="hover:text-[#F5A623] transition">How it works</a></li>
          <li><a href="#vendors" className="hover:text-[#F5A623] transition">For vendors</a></li>
          <li><a href="#about" className="hover:text-[#F5A623] transition">About Us</a></li>
          <li><a href="#contact" className="hover:text-[#F5A623] transition">Contact Us</a></li>
        </ul>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-12 px-6 md:px-16 py-12 md:py-20 bg-white overflow-hidden">

        {/* Left Content Area */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Purple Pill Badge */}
          <div className="bg-[#EBE9F6] text-[#6368B2] px-4 py-2 rounded-lg text-sm font-black tracking-wider uppercase mb-6">
            One App. Every Essential.
          </div>
          
          <h1 className="text-5xl lg:text-[4rem] font-bold tracking-tight leading-[1.1] text-[#3B4B9B] mb-2">
            Life Has Many <br /> Errands
          </h1>
          <h1 className="text-5xl lg:text-[4rem] font-bold tracking-tight leading-[1.1] text-[#F5A623] mb-6">
            We&apos;ve got the <br /> Buttons.
          </h1>
          
          <p className="text-base md:text-lg text-gray-900 font-medium mb-8 leading-relaxed max-w-md">
            Order gas refill, schedule laundry pickups, buy food, and everyday essentials all from one app.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center lg:justify-start mb-12">
            <button className="bg-[#3B4B9B] text-white text-base font-semibold px-8 py-3.5 rounded-lg flex items-center gap-2 hover:bg-[#2e3d85] transition whitespace-nowrap">
              Get started <span>→</span>
            </button>
            <button className="border-2 border-gray-200 text-base font-semibold px-8 py-3.5 rounded-lg text-gray-800 hover:border-gray-300 transition whitespace-nowrap">
              Become a vendor
            </button>
          </div>

          {/* 3 Features Row */}
          <div className="flex items-start justify-center lg:justify-start gap-8 md:gap-12 w-full">
            {/* Feature 1 */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 relative">
                <Image src="/Vector.png" alt="Trusted vendors" fill className="object-contain" />
              </div>
              <span className="text-xs font-bold text-gray-800">Trusted vendors</span>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 relative">
                <Image src="/Vector (1).png" alt="Swift Delivery" fill className="object-contain" />
              </div>
              <span className="text-xs font-bold text-gray-800">Swift Delivery</span>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 relative">
                <Image src="/Vector (3).png" alt="Secure Payments" fill className="object-contain" />
              </div>
              <span className="text-xs font-bold text-gray-800">Secure Payments</span>
            </div>
          </div>
        </div>

        {/* Right Area – Adjusted Blob and Phone Graphics */}
        <div className="w-full lg:w-1/2 relative flex justify-center items-center min-h-[500px] lg:min-h-[650px] mt-10 lg:mt-0">
          
          {/* Floating Location Pin Placeholder */}
          <div className="absolute top-10 right-10 md:right-20 z-20 w-8 h-8">
            <Image src="/pin-icon.png" alt="Location Pin" fill className="object-contain" />
          </div>

          {/* Background Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] lg:w-[110%] h-[80%] z-0">
            <Image
              src="/Group 11.png"
              alt="Background Blob"
              fill
              className="object-contain pointer-events-none"
              priority
            />
          </div>

          {/* Phone Mockup */}
          <div className="relative z-10 w-[280px] lg:w-[340px] h-[550px] lg:h-[680px]">
            <Image
              src="/Rectangle.png"
              alt="BTTNS App"
              fill
              className="object-contain filter drop-shadow-2xl"
              priority
            />
          </div>

        </div>
      </section>

      {/* ─── OUR SERVICES ─── */}
      <section id="services" className="px-6 md:px-16 py-16 bg-white">
        <p className="text-xs font-bold tracking-widest text-[#F5A623] uppercase mb-3 text-center md:text-left">OUR SERVICES</p>
        <h2 className="text-3xl font-extrabold text-[#3B4B9B] mb-12 text-center md:text-left">
          Everything you need, One{" "}
          <span className="text-[#F5A623]">Button</span> away
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              iconSrc: "/mdi_food.png",
              iconAlt: "Order Food Icon",
              label: "Order meals from favorite restaurants",
              bg: "bg-[#EBE9F6]",
              btnLabel: "Order food",
              btnColor: "bg-[#3B4B9B]",
            },
            {
              iconSrc: "/mdi_gas-cylinder.png",
              iconAlt: "Gas Refill Icon",
              label: "Get your cooking gas delivered when you need it.",
              bg: "bg-[#F3EBFB]",
              btnLabel: "Gas Refill",
              btnColor: "bg-[#8E54E9]",
            },
            {
              iconSrc: "/Vector (4).png",
              iconAlt: "Groceries Icon",
              label: "Get household essentials delivered to you",
              bg: "bg-[#FDF3E1]",
              btnLabel: "Groceries",
              btnColor: "bg-[#A0522D]",
            },
            {
              iconSrc: "/streamline_hotel-laundry-solid.png",
              iconAlt: "Laundry Icon",
              label: "Schedule pickup and delivery from trusted laundries.",
              bg: "bg-[#EAEAF4]",
              btnLabel: "Laundry",
              btnColor: "bg-[#7A7EAE]",
            },
          ].map((svc, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 md:p-8 flex flex-col items-center text-center justify-between min-h-[280px] shadow-sm ${svc.bg}`}
            >
              <div className="relative w-16 h-16 mb-4">
                <Image src={svc.iconSrc} alt={svc.iconAlt} fill className="object-contain" />
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-6 leading-relaxed">
                {svc.label}
              </h3>
              <button className={`${svc.btnColor} text-white text-xs font-bold px-5 py-2 rounded-full`}>
                {svc.btnLabel}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="px-6 md:px-16 py-16 bg-white">
        <div className="flex justify-center mb-16">
          <div className="bg-[#3B4B9B] text-white text-xs font-bold px-6 py-2 uppercase tracking-widest" style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }}>
            How It Works
          </div>
        </div>

        <div className="grid grid-cols-1 md:flex md:flex-row items-center justify-center gap-12 md:gap-0 max-w-4xl mx-auto">
          {[
            { num: 1, icon: "📱", label: "Select a service" },
            { num: 2, icon: "🛒", label: "Place your order" },
            { num: 3, icon: "🛵", label: "Our Riders Deliver" },
          ].map((step, i) => (
            <div key={step.num} className="flex items-center justify-center w-full md:w-1/3">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 rounded-full bg-gray-50 flex items-center justify-center text-5xl mb-4 border-4 border-white shadow-md overflow-hidden">
                   {/* Replace these emojis with actual images if you have them in the public folder */}
                  {step.icon}
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-[#3B4B9B] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                    {step.num}
                  </div>
                  <p className="text-base font-bold text-gray-900 w-24 leading-tight">{step.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FOR VENDORS ─── */}
      <section
        id="vendors"
        className="mx-6 md:mx-16 mb-16 rounded-2xl overflow-hidden flex flex-col md:flex-row bg-[#F8F9FD]"
      >
        <div className="w-full md:w-2/5 min-h-[250px] md:min-h-auto relative">
          {/* Vendor Image Placeholder */}
          <div className="absolute inset-0 bg-gray-300">
             <Image src="/vendor-image-placeholder.jpg" alt="Vendor" fill className="object-cover" />
          </div>
        </div>

        <div className="w-full md:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <p className="text-xs font-bold tracking-widest text-[#F5A623] uppercase mb-3 text-center md:text-left">
            For Vendors
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3B4B9B] text-center md:text-left">
            Grow Your Business With Buttons
          </h2>
          <p className="text-base text-gray-700 mb-8 leading-relaxed font-medium text-center md:text-left">
            Join our network of trusted vendors to reach more customers across your city.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2 text-sm md:text-base font-bold text-gray-900 mb-10">
            {[
              "More visibility",
              "Logistics Support",
              "Increased Sales",
              "Business analytics dashboard",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5A623] flex items-center justify-center text-white text-xs">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex justify-center md:justify-end">
            <button className="w-full sm:w-auto bg-[#3B4B9B] text-white text-sm font-bold px-8 py-3.5 rounded hover:bg-[#2e3d85] transition">
              Become a partner
            </button>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="px-6 md:px-16 py-10 bg-white mb-10">
        <p className="text-xs font-bold tracking-widest text-[#F5A623] uppercase text-center mb-8">
          WHAT OUR USERS SAY
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              quote: "Getting gas used to take hours now it's delivered in minutes",
              name: "Hanson O.",
              title: "Fitness Enthusiast",
            },
            {
              quote: "Buttons helped us increase our visibility",
              name: "Bigger bites",
              title: "Vendor",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="bg-[#EBE9F6] rounded-2xl p-8 flex flex-col justify-between min-h-[160px]"
            >
              <p className="text-sm font-bold text-gray-900 mb-6 leading-relaxed">
                &quot;{t.quote}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-400 overflow-hidden relative">
                   {/* Avatar Placeholder */}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#3B4B9B]">{t.name}</p>
                  <p className="text-xs text-gray-600">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA / QR ─── */}
      <section className="mx-6 md:mx-16 mb-16 bg-[#3B4B9B] text-white py-12 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-wide">
            Your Everyday Essentials,<br /> Delivered
          </h3>
          <p className="text-base text-blue-100">Scan the QR Code to get started</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* QR Code Placeholder */}
          <div className="bg-white p-2 rounded-lg w-32 h-32 flex items-center justify-center text-black font-bold">
            <Image src="/qr-code-placeholder.png" alt="QR Code" width={120} height={120} />
          </div>
          
          <div className="text-center md:text-left">
            <p className="text-[#F5A623] text-sm font-bold mb-2">OR VISIT</p>
            <p className="font-bold text-lg">www.pushtechbuttons.com</p>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#3B4B9B] text-white px-6 md:px-16 pt-12 pb-8 border-t border-blue-800">
        <div className="flex flex-col lg:flex-row justify-between gap-12 pb-10">
          
          {/* Left - Logo & Socials */}
          <div className="max-w-sm flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="mb-4">
              <Image
                src="/Group 46.png" 
                width={160}
                height={50}
                className="object-contain brightness-0 invert" // Makes the logo white
                alt="BTTNS logo"
              />
            </div>
            <div className="bg-white text-[#3B4B9B] px-4 py-1.5 rounded-md text-sm font-black tracking-widest uppercase mb-6 inline-block">
              One App. Every Essential.
            </div>
            <div className="flex gap-4 justify-center lg:justify-start">
              {/* Social Icons Placeholders */}
              <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center cursor-pointer hover:bg-white hover:text-[#3B4B9B] transition">f</div>
              <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center cursor-pointer hover:bg-white hover:text-[#3B4B9B] transition">ig</div>
              <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center cursor-pointer hover:bg-white hover:text-[#3B4B9B] transition">tk</div>
            </div>
          </div>

          {/* Right - Links */}
          <div className="flex gap-12 flex-wrap justify-center lg:justify-end text-center lg:text-left w-full lg:w-auto">
            <div>
              <h4 className="text-base font-bold mb-4 text-white">Services</h4>
              <ul className="space-y-3 text-sm text-blue-100 font-medium">
                <li><a href="#" className="hover:text-[#F5A623]">Gas Refill</a></li>
                <li><a href="#" className="hover:text-[#F5A623]">Laundry</a></li>
                <li><a href="#" className="hover:text-[#F5A623]">Food delivery</a></li>
                <li><a href="#" className="hover:text-[#F5A623]">Groceries</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-bold mb-4 text-white">Company</h4>
              <ul className="space-y-3 text-sm text-blue-100 font-medium">
                <li><a href="#" className="hover:text-[#F5A623]">About Us</a></li>
                <li><a href="#" className="hover:text-[#F5A623]">Partners</a></li>
                <li><a href="#" className="hover:text-[#F5A623]">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-bold mb-4 text-white">Contact</h4>
              <ul className="space-y-3 text-sm text-blue-100 font-medium">
                <li className="flex items-center justify-center lg:justify-start gap-2">
                  <span>📞</span> 0906 659 6603
                </li>
                <li className="flex items-center justify-center lg:justify-start gap-2">
                  <span>📍</span> Egan, Igando
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}