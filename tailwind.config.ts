import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        buttons: {
          primary: "#5D3FD3", // Royal Purple
          accent: "#FF8C00",  // Osun Orange
          dark: "#1A1A1A",    // For that "Future-Tech" look
          surface: "#F9F6FF", // Light purple tint for backgrounds
        },
      },
      backgroundImage: {
        'african-pattern': "url('https://res.cloudinary.com/dps2cgpx8/image/upload/v1788554421/ee204f8f05442ab7199f7b8b861957cf_kvlrzx.jpg')",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 18s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;