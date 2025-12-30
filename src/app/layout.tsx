import type { Metadata } from "next";
import { Oswald, Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { Providers } from "./providers";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["200", "400", "700"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harsh Budhauliya | Full Stack Developer & Founder",
  description:
    "Professional portfolio of Harsh Budhauliya - Full Stack Developer, Web Designer, and Founder of Taliyo Technologies. Specializing in MERN stack, UI/UX, and digital marketing.",
  keywords: [
    "Harsh Budhauliya",
    "Full Stack Developer",
    "Taliyo Technologies",
    "MERN Stack",
    "Web Designer",
    "Digital Marketing",
    "UI/UX Design",
    "India",
  ],
  authors: [{ name: "Harsh Budhauliya" }],
  openGraph: {
    title: "Harsh Budhauliya | Full Stack Developer & Founder",
    description:
      "Professional portfolio showcasing high-performance web development and design work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${outfit.variable} antialiased bg-cinema-bg text-white overflow-x-hidden cinema-mode`}
      >
        <Providers>
          <SmoothScroll>
            <CustomCursor />
            <Navbar />
            {children}

            {/* Film Grain Overlay - Placed after content to overlay it */}
            <div className="cinema-grain pointer-events-none" />

            {/* Letterbox Bars */}
            <div className="letterbox-bar letterbox-top pointer-events-none" />
            <div className="letterbox-bar letterbox-bottom pointer-events-none" />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
