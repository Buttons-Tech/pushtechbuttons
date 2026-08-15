// src/components/QuickButtons.tsx
import { Utensils, Shirt, Scissors, LayoutGrid } from "lucide-react";
import Link from "next/link";

export function QuickButtons() {
  const services = [
    {
      title: "Food & Drinks",
      desc: "Order local bites",
      icon: Utensils,
      link: "/food",
    },
    {
      title: "Wear & Wash",
      desc: "Laundry & Fits",
      icon: Shirt,
      link: "/wear",
    },
    {
      title: "Hair & Style",
      desc: "Salons & Barbers",
      icon: Scissors,
      link: "/hair",
    },
    { title: "More", desc: "Explore hubs", icon: LayoutGrid, link: "/more" },
  ];
  return (
    <div className="space-y-3">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
        Quick Services
      </p>
      <div className="grid grid-cols-2 gap-3">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <Link href="/food" key={index}>
              <button
                key={index}
                className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-amber-200 transition-all active:scale-95 text-left group"
              >
                <div className="w-10 h-10 bg-amber-50 group-hover:bg-amber-100 rounded-xl flex items-center justify-center text-amber-500 transition-colors shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-800 leading-tight">
                    {service.title}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {service.desc}
                  </p>
                </div>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
