import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Syne, Manrope, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Omkar Langhe Production — Cinematic Photography & Film",
    template: "%s — Omkar Langhe Production",
  },
  description:
    "Omkar Langhe Production crafts cinematic photography and videography — weddings, portraits, landscapes and brand films that feel like movies.",
  keywords: [
    "cinematic photography",
    "videography",
    "wedding films",
    "commercial video",
    "Omkar Langhe",
  ],
  openGraph: {
    title: "Omkar Langhe Production",
    description: "Moments, made cinematic. Photography & films by Omkar Langhe.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-black">
      <body
        className={`${syne.variable} ${manrope.variable} ${instrument.variable} ${jbmono.variable} bg-noir font-body text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
