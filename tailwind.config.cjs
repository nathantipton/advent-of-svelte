const { default: daisyui } = require("daisyui");

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        xmas: ["Mountains of Christmas", "cursive"],
      },
      backgroundImage: {
        "morse-code": "url('/morse-code.webp')",
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
          "content-100": "#f8f8f8", // Very light gray for primary content
          "content-200": "#e0e0e0", // Light gray for secondary content
          "content-300": "#c6c6c6", // Medium gray for tertiary content
          info: "#60a5fa", // Blue for informational elements
          success: "#22c55e", // Green for success elements
          warning: "#fbbf24", // Yellow for warning elements
          error: "#ef4444", // Red for error elements
        },
        myChristmasThemeDark: {
          primary: "#f87171", // Light red for primary elements
          secondary: "#34d399", // Light emerald for secondary elements
          accent: "#fde047", // Light yellow for accent elements
          neutral: "#a1a1a1", // Light gray for neutral elements
          "base-100": "#1f2937", // Dark gray for base background
          "base-200": "#374151", // Slightly lighter dark gray for base-200 elements
          "base-300": "#4b5563", // Even lighter dark gray for base-300 elements
          "content-100": "#d1d5db", // Light gray for primary content
          "content-200": "#525252", // Dark gray for secondary content
          "content-300": "#6b6b6b", // Darker gray for tertiary content
          info: "#93c5fd", // Light blue for informational elements
          success: "#4ade80", // Light green for success elements
          warning: "#fcd34d", // Light yellow for warning elements
          error: "#f87171", // Light red for error elements
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};

module.exports = config;
