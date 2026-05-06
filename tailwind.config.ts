// tailwind.config.ts
const config = {
  theme: {
  extend: {
    colors: {
      buttons: {
        primary: "#5D3FD3", // Royal Purple
        accent: "#FF8C00",  // Osun Orange
        dark: "#1A1A1A",    // For that "Future-Tech" look
        surface: "#F9F6FF", // Light purple tint for backgrounds
      }
    },
    backgroundImage: {
      'african-pattern': "url('/public/brand/pattern-subtle.png')",
    }
  }
}
};