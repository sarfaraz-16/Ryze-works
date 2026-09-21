import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CosmicBackground } from "@/components/background/CosmicBackground";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ryze Works",
    "url": "https://ryzeworks.tech",
    "logo": "https://ryzeworks.tech/logo.png",
    "description":
      "Strategy. Design. Technology. Content. Powered by AI. We help ambitious brands build, grow and scale with clarity, creativity and intelligent systems.",
    "sameAs": [
      "https://linkedin.com",
      "https://instagram.com",
      "https://dribbble.com",
      "https://youtube.com"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "teamryzeworks@gmail.com",
      "contactType": "customer support",
      "areaServed": "Worldwide"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressCountry": "India"
    }
  };

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased dark`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased bg-[#080417] text-zinc-100 selection:bg-[#7042FF] selection:text-white relative" suppressHydrationWarning>
        <CosmicBackground />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <div id="main-content" className="contents">
          {children}
        </div>
      </body>
    </html>
  );
}
