import type { Metadata } from "next";
import { publicoHeadline, neueHaas } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hillsdale Image Generator",
  description: "Make an asset for a website, campaign, newsletter, or other channel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${publicoHeadline.variable} ${neueHaas.variable}`}>
      <body className="font-sans bg-main text-textPrimary min-h-screen">
        {children}
      </body>
    </html>
  );
}
