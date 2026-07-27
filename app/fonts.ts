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
