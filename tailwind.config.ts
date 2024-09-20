import type {Config} from "tailwindcss";
import {fontFamily as defaultFontFamily} from "tailwindcss/defaultTheme";
import {
  neutral as baseColors,
  purple as primaryColors,
  white
} from "tailwindcss/colors";

/* ===== Colors ===== */

const extendedColors = {
  "surface": {
    DEFAULT: baseColors[950],
  },
  "outline": baseColors[600],
  "outline-var": baseColors[700],
  "primary": {
    DEFAULT: primaryColors[600],
    ...primaryColors,
  },
  "on-primary": white,
  "on-surface": white,
}

/* ===== Fonts ===== */

const fontSize: Record<string, [string, string]> = {
  xs: ['0.75rem', '1rem'], // 12px, 16px
  sm: ['0.875rem', '1.25rem'], // 14px, 20px
  md: ['1rem', '1.25rem'], // 16px, 24px
  lg: ['1.125rem', '1.75rem'], // 18px, 28px
  xl: ['1.25rem', '1.75rem'], // 20px, 18px
  '2xl': ['1.5rem', '2rem'], // 24px, 32px
}

const fontFamily = {
  sans: ['var(--font-sans)', ...defaultFontFamily.sans],
}

/* ===== Config ===== */

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: fontFamily,
    fontSize: fontSize,
    extend: {
      colors: extendedColors,
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
