import type { Metadata } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "It's Cafe — Built By Hand, Wrecked On Purpose",
  description:
    "It's Cafe. Late-night burgers and coffee, stacked stupid-high and taken apart layer by layer, right in front of you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} ${mono.variable}`}>
      <body className="grain font-body bg-ink text-paper antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
