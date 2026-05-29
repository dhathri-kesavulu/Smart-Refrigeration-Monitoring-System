/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        frost: {
          50:  "#eef6ff",
          100: "#dceeff",
          200: "#b3d9ff",
          300: "#75bbff",
          400: "#3399ff",
          500: "#0f7aff",
          600: "#005edb",
          700: "#0049b0",
          800: "#003d91",
          900: "#002a6b",
        },
        slate: {
          850: "#18222f",
          950: "#0a0f18",
        }
      },
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.35s ease-out",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: "translateY(12px)" }, to: { opacity: 1, transform: "translateY(0)" } },
      },
      boxShadow: {
        glow: "0 0 20px rgba(15,122,255,0.25)",
        "glow-green": "0 0 16px rgba(34,197,94,0.3)",
        "glow-red": "0 0 16px rgba(239,68,68,0.3)",
        "glow-yellow": "0 0 16px rgba(234,179,8,0.3)",
      }
    },
  },
  plugins: [],
}
