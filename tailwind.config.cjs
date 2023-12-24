const { default: daisyui } = require("daisyui");

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "media",
  theme: {
    extend: {
      gridTemplateColumns: {
        "4-fit": "repeat(4, auto-fill)",
      },
      height: {
        "screen-safe": "100dvh",
        "content-full": "calc(100dvh - 6rem)",
      },
      minHeight: {
        "screen-safe": "100dvh",
      },
      fontFamily: {
        xmas: ["Mountains of Christmas", "cursive"],
      },
      backgroundImage: {
        "morse-code": "url('/morse-code.webp')",
        "xmas-countdown": "url('/images/xmas-countdown.webp')",
      },
      colors: {
        "content-100": "var(--content-100)",
        "content-200": "var(--content-200)", 
        "content-300": "var(--content-300)",
      },
    },
  },
  daisyui: {
    darkTheme: "myChristmasThemeDark",
    themes: [
      {
        myChristmasTheme: {
          primary: "#ef4444", // Red for primary elements
          secondary: "#10b981", // Emerald for secondary elements
          accent: "#facc15", // Yellow for accent elements
          neutral: "#3b3b3b", // Dark gray for neutral elements
          "base-100": "#ffffff", // White for base background
          "base-200": "#f4f4f5", // Light gray for slightly darker base elements
          "base-300": "#e5e7eb", // Medium gray for tertiary base elements
          "base-content": "#1e293b", // Very light gray for primary content
          info: "#60a5fa", // Blue for informational elements
          success: "#22c55e", // Green for success elements
          warning: "#fbbf24", // Yellow for warning elements
          error: "#ef4444", // Red for error elements
        },
        myChristmasThemeDark: {
          primary: "#dc2626", // Red 600 for primary elements, a bold red
          secondary: "#16a34a", // Green 600 for secondary elements, a rich green
          accent: "#fde047", // Retaining the light yellow for accent elements
          neutral: "#64748b", // Slate 400 for neutral elements, a medium slate color
          "base-100": "#1e293b", // Slate 800 for base background, a dark slate
          "base-200": "#334155", // Slate 700 for base-200 elements
          "base-300": "#475569", // Slate 600 for base-300 elements
          "base-content": "#f8fafc", // Slate 50 for primary content, a very light slate
          info: "#93c5fd", // Retaining the light blue for informational elements
          success: "#4ade80", // Retaining the light green for success elements
          warning: "#fcd34d", // Retaining the light yellow for warning elements
          error: "#dc2626", // Red 600 for error elements, matching the primary color
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};

module.exports = config;
