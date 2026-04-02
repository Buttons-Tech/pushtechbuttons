export default function Trust() {
  const stats = [
    { label: "Delivery Time", value: "24H" },
    { label: "Security", value: "AES-256" },
    { label: "Status", value: "LTD" },
    { label: "Uptime", value: "99.9%" },
  ];

  return (
    <div className="bg-black py-20 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mb-2">{stat.label}</p>
            <p className="text-white text-4xl font-light tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}