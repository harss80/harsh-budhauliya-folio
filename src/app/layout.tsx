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
  title: "Harsh Budhauliya | Software Engineer",
  description:
    "Professional portfolio of Harsh Budhauliya - Software Engineer specializing in scalable web applications, MERN stack, and premium UI/UX design.",
  keywords: [
    "Harsh Budhauliya",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Web Designer",
    "Digital Marketing",
    "UI/UX Design",
    "India",
  ],
  authors: [{ name: "Harsh Budhauliya" }],
  openGraph: {
    title: "Harsh Budhauliya | Software Engineer",
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
        className={`${oswald.variable} ${outfit.variable} antialiased bg-bg-primary text-text-primary overflow-x-hidden`}
      >
        <Providers>
          <SmoothScroll>
            <CustomCursor />
            <Navbar />
            {children}
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
