import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plant Care Guide",
  description:
    "A catalog and care guide for houseplants. Shopping lists, repotting instructions, watering schedules, and soil recipes.",
  metadataBase: new URL("https://plants.skg.gg"),
  openGraph: {
    title: "Plant Care Guide",
    description: "A catalog and care guide for 10 houseplants.",
    url: "https://plants.skg.gg",
    siteName: "Plant Care Guide",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
