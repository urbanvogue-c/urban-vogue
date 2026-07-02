import type { Config } from "tailwindcss";

// DESIGN SYSTEM — Urban Vogue
// Palette is deliberately achromatic per brand spec (no accent color):
//   ink       #0A0A0A  primary near-black (softer than pure #000 on large fields)
//   paper     #FAFAF8  warm off-white (softer than pure #FFF on large fields)
//   pure black/white kept for true blacks (logo, text-on-white) and true whites
//   graphite  #6B6B68  secondary text on paper
//   silver    #B8B8B4  hairline borders, dividers, disabled states
//   smoke     #1C1C1A  elevated surfaces on dark sections
// Type: display = Bodoni Moda (fashion-editorial, high-contrast serif, echoes
//   the logo's serif wordmark) · body = Inter (neutral, Apple-grade legibility)
//   · label = Inter with wide tracking + uppercase for eyebrows/nav/captions

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        paper: "#FAFAF8",
        graphite: "#6B6B68",
        silver: "#B8B8B4",
        smoke: "#1C1C1A",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        label: "0.22em",
        wide2: "0.12em",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      maxWidth: {
        content: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
