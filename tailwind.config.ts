import type { Config } from "tailwindcss";

// ---- DESIGN TOKENS ---------------------------------------------------
// Subject: a trendy, late-night, cult-status burger cafe.
// Not the cream+terracotta AI default — this leans dark diner / neon
// menu-board, printed on black chalk instead of warm paper.
//
// Color:
//   ink       #12100E  near-black charcoal, base background
//   paper     #F4EFE4  warm off-white, primary text
//   char      #221E1A  raised panel / card base
//   ember     #FF5A33  hot coral-orange, primary accent (CTAs, links)
//   pickle    #C6FF4D  acid lime, secondary accent (kinetic highlights)
//   smoke     #8A8177  muted text / captions
//
// Type:
//   display  -> "Anton"  (condensed, loud, poster-style headline face)
//   body     -> "General Sans"/"Inter" fallback (clean, humanist)
//   mono     -> "JetBrains Mono" (menu prices, labels, order numbers)
// -----------------------------------------------------------------------

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#12100E",
        paper: "#F4EFE4",
        char: "#221E1A",
        ember: "#FF5A33",
        pickle: "#C6FF4D",
        smoke: "#8A8177",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.06em",
        widest: "0.3em",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
