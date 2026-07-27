import localFont from "next/font/local";

// Publico Headline — the serif display font used for headings.
export const publicoHeadline = localFont({
  src: [
    { path: "./fonts/PublicoHeadline-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/PublicoHeadline-LightItalic.otf", weight: "300", style: "italic" },
  ],
  variable: "--font-publico",
  display: "swap",
});

// Termina — the sans-serif used for body/UI text.
// Note: these are "*Test" files from the foundry, typically a trial/demo cut —
// confirm a properly licensed version is in place before shipping publicly.
export const termina = localFont({
  src: [
    { path: "./fonts/TerminaTest-Thin.otf", weight: "100", style: "normal" },
    { path: "./fonts/TerminaTest-ExtraLight.otf", weight: "200", style: "normal" },
    { path: "./fonts/TerminaTest-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/TerminaTest-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/TerminaTest-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/TerminaTest-Demi.otf", weight: "600", style: "normal" },
    { path: "./fonts/TerminaTest-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/TerminaTest-Heavy.otf", weight: "800", style: "normal" },
    { path: "./fonts/TerminaTest-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-termina",
  display: "swap",
});
