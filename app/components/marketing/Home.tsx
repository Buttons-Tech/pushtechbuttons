import React, { useState } from "react";
import {
  Utensils,
  Scissors,
  Flame,
  Droplet,
  ShieldCheck,
  Lightbulb,
  Trash2,
  Megaphone,
  ArrowRight,
  Wallet,
  ArrowLeft,
  Plus,
  Minus,
  Search,
  ShoppingBag,
  Zap,
  Clock,
  BatteryCharging,
  X,
  
} from "lucide-react";
import Link from "next/link";

interface Vendor {
  id: string;
  name: string;
  category: Category;
  image: string;
  whatsappNumber: string;
  tagline: string;
}
type Category = "Eat" | "Hair" | "Gas" | "Wash";
type ViewState = "home" | "food" | "power" | "hair" | "gas" | "wash";

const Home = () => {

     // states
      const [currentView, setCurrentView] = useState<ViewState>("home");
      const [globalCart, setGlobalCart] = useState<{ [key: string]: number }>({});

      // vendors
  const mockVendors: Vendor[] = [
    {
      id: "1",
      name: "Bigger Bites Kitchen",
      category: "Eat",
      image: "/images/elohor.jpg",
      whatsappNumber: "2348095769296",
      tagline: "Healthy & Delicious Meals",
    },
    {
      id: "2",
      name: "Son of Mercy Barbershop",
      category: "Hair",
      image: "/images/mercy.jpg",
      whatsappNumber: "2348180035258",
      tagline: "Clean fades & hair enhancements",
    },
    {
      id: "3",
      name: "MG Oil & Gas",
      category: "Gas",
      image: "/images/gas.jpg",
      whatsappNumber: "2349033811883",
      tagline: "Swift cooking gas delivery",
    },
    {
      id: "4",
      name: "Nejo Wash",
      category: "Wash",
      image: "/images/nejowash.jpg",
      whatsappNumber: "2348160350401",
      tagline: "Wash, dry & fold laundry service",
    },
  ];

  return (
    <>
       <div>
          <header className="bg-black text-white px-5 pt-6 pb-20 rounded-b-[2.5rem] shadow-md relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="relative z-10 flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center font-bold text-slate-900 shadow-inner">
                  BT
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold text-amber-400">
                    BUTTNS
                  </p>
                  <h2 className="text-sm font-bold text-white">
                    Egan, Lags
                  </h2>
                </div>
              </div>
              <button className="p-2 bg-emerald-600/50 hover:bg-emerald-600 rounded-full">
                <Wallet className="w-5 h-5 text-amber-300" />
              </button>
            </div>
            <div className="relative z-10 mt-4">
              <h1 className="text-2xl font-black leading-tight tracking-tight text-amber-300">
                Hello Egan, <br />
                <span className="text-white font-medium text-[17px]">
                  Your best vendors are now online!
                </span>
              </h1>
              <Link href="/test" className="w-full">
                <button
                  // onClick={() => setCurrentView("food")}
                  // onClick={() => window.open("/test", "_self")}
                  // onClick={() => { window.location.href = "/test"; }}

                  className="bg-amber-400 text-black w-full h-[36px] rounded-[24px] mt-4 font-black text-xs shadow-sm"
                >
                  Order Food Now!
                </button>
              </Link>
              <Link href="/portal">
                <button
                  // onClick={() => setCurrentView("food")}
                  //  onClick={() => window.open("/test", "_blank")}
                  className="bg-lime-400 text-black w-full h-[36px] rounded-[24px] mt-4 font-black text-xs shadow-sm"
                >
                  Learn More About Buttns
                </button>
              </Link>
            </div>
          </header>

          {/* Your Buttons   */}

          <main className="px-4 -mt-14 relative z-20 space-y-6">
            <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <p className="text-[11px] text-slate-400 font-bold mb-3 uppercase tracking-wider">
                Your Buttons
              </p>
              <div className="grid grid-cols-4 gap-4">
                {(["Eat", "Hair", "Gas", "Wash"] as const).map((cat) => {
                  const icons = {
                    Eat: <Utensils />,
                    Hair: <Scissors />,
                    Gas: <Flame />,
                    Wash: <Droplet />,
                  };
                  const colors = {
                    Eat: "orange",
                    Hair: "purple",
                    Gas: "amber",
                    Wash: "blue",
                  };
                  const targetViewMapping: Record<Category, ViewState> = {
                    Eat: "food",
                    Hair: "hair",
                    Gas: "gas",
                    Wash: "wash",
                  };
                  return (
                    <button
                      key={cat}
                      onClick={() => setCurrentView(targetViewMapping[cat])}
                      className="flex flex-col items-center gap-2 group focus:outline-none"
                    >
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all bg-${colors[cat]}-50 text-${colors[cat]}-600 border border-${colors[cat]}-100/50`}
                      >
                        {React.cloneElement(icons[cat], {
                          className: "w-6 h-6",
                        })}
                      </div>
                      <span className="text-xs font-bold tracking-wide text-slate-700">
                        {cat}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* All Vendors  */}
            <section className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                All Vendors
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {mockVendors.map((vendor) => {
                  const viewMap: Record<Category, ViewState> = {
                    Eat: "food",
                    Hair: "hair",
                    Gas: "gas",
                    Wash: "wash",
                  };
                  return (
                    <div
                      key={vendor.id}
                      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs flex flex-col justify-between"
                    >
                      <div className="relative h-24 bg-slate-100">
                        <img
                          src={vendor.image}
                          alt={vendor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                            {vendor.name}
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                            {vendor.tagline}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            setCurrentView(viewMap[vendor.category])
                          }
                          className="w-full py-2 bg-lime-400 text-black rounded-xl text-[11px] font-bold flex items-center justify-center tracking-wide"
                        >
                          Tap in!
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Estate Services */}
            <section className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Estate Services
              </h3>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50">
                <div
                  onClick={() => setCurrentView("power")}
                  className="p-4 flex items-center justify-between hover:bg-slate-50/50 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-50 rounded-xl text-amber-500">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">
                        Power Tokens
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Charge devices (pickup/dropoff: 7am/7pm daily)
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div
                  onClick={() => alert("Security pass framework active")}
                  className="p-4 flex items-center justify-between hover:bg-slate-50/50 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-50 rounded-xl text-emerald-600">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">
                        Estate Security
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Generate visitor access codes instantly
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <Link href="/rently">
                  <div
                    // onClick={() => alert("Security pass framework active")}
                    className="p-4 flex items-center justify-between hover:bg-slate-50/50 cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-50 rounded-xl text-emerald-600">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">
                        Estate Houses
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Generate visitor access codes instantly
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
              <Link href="/auto-repair">
                  <div
                    // onClick={() => alert("Security pass framework active")}
                    className="p-4 flex items-center justify-between hover:bg-slate-50/50 cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-50 rounded-xl text-emerald-600">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">
                        Auto Repair
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Generate visitor access codes instantly
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
              </div>
            </section>
          </main>

          {/* <RoveDelivery/> */}
          
        </div>
    </>
  )
}

export default Home
