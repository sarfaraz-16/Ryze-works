import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RYZE WORKS — AI-Native Creative & Technology Partner",
  description:
    "Strategy. Design. Technology. Content. Powered by AI. We help ambitious brands build, grow and scale with clarity, creativity and intelligent systems.",
  keywords: [
    "AI Agency",
    "Digital Products",
    "Next.js Development",
    "Creative Technology",
    "Brand Strategy",
    "Ryze Works"
  ],
  openGraph: {
    title: "RYZE WORKS — AI-Native Creative & Technology Partner",
    description:
      "Strategy. Design. Technology. Content. Powered by AI. We help ambitious brands build, grow and scale with clarity, creativity and intelligent systems.",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#07070b] text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
