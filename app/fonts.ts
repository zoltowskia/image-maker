import localFont from "next/font/local";

// Publico Headline — the serif display font used for headings.
export const publicoHeadline = localFont({
  src: [
    { path: "./fonts/PublicoHeadline-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/PublicoHeadline-LightItalic.otf", weight: "300", style: "italic" },
    { path: "./fonts/PublicoHeadline-Roman.otf", weight: "400", style: "normal" },
  ],
  variable: "--font-publico",
  display: "swap",
});

// Neue Haas Grotesk Text — the sans-serif used for body/UI text.
export const neueHaas = localFont({
  src: [
    { path: "./fonts/NeueHaasGroteskText-55Roman-App.ttf", weight: "400", style: "normal" },
    { path: "./fonts/NeueHaasGroteskText-56Italic-App.ttf", weight: "400", style: "italic" },
    { path: "./fonts/NeueHaasGroteskText-75Bold-App.ttf", weight: "700", style: "normal" },
    { path: "./fonts/NeueHaasGroteskText-76BoldItalic-App.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-neue-haas",
  display: "swap",
});

// Termina — used specifically for interactive elements: chips, inputs, and
// buttons (per brand direction), not for general body copy.
export const termina = localFont({
  src: [
    { path: "./fonts/TerminaTest-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/TerminaTest-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/TerminaTest-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-termina",
  display: "swap",
});
