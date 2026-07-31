import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ITC Group USA | Freight Forwarding & Logistics",
    template: "%s | ITC Group USA",
  },
  description:
    "ITC Group USA — a complete worldwide freight logistics company since 1984. Customs brokerage, U.S. Customs Bonded facility, and door-to-door multi-modal freight. IATA/TSA IAC · FMC# 3887.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="min-h-dvh bg-ink font-sans text-snow antialiased">
        {children}
      </body>
    </html>
  );
}
