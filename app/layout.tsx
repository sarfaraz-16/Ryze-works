import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CosmicBackground } from "@/components/background/CosmicBackground";
import Preloader from "@/components/layout/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import Script from "next/script";

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
  title: "Ryzeworks — Vision Into Influence. Creativity Into Distinction.",
  description:
    "A creative and technology partner that helps businesses build stronger brands, create meaningful digital experiences and grow through content, marketing and digital solutions. A unit of AINTRIX Global Pvt. Ltd.",
  keywords: [
    "Ryzeworks",
    "Ryze Works",
    "AINTRIX Global",
    "Brand Development",
    "Visual Storytelling",
    "Creative Direction",
    "Next.js Development",
    "Creative Technology",
    "Brand Strategy Chennai"
  ],
  openGraph: {
    title: "Ryzeworks — Vision Into Influence. Creativity Into Distinction.",
    description:
      "A creative and technology partner that helps businesses build stronger brands, create meaningful digital experiences and grow through content, marketing and digital solutions.",
    type: "website"
  }
};

const preloaderGate = `(function(){try{var d=document.documentElement;var seen=sessionStorage.getItem("ryze:boot-completed")==="true";d.dataset.preloader=seen?"skip":"intro"}catch(e){d.dataset.preloader="skip"}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ryzeworks",
    "legalName": "AINTRIX Global Pvt. Ltd.",
    "url": "https://ryze-works.vercel.app",
    "logo": "https://ryze-works.vercel.app/logo.png",
    "slogan": "Vision Into Influence. Creativity Into Distinction.",
    "description":
      "A creative and technology partner that helps businesses build stronger brands, create meaningful digital experiences and grow through content, marketing and digital solutions.",
    "foundingDate": "2025",
    "founder": {
      "@type": "Person",
      "name": "Shanmuga Priya G",
      "jobTitle": "Director"
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "AINTRIX Global Pvt. Ltd."
    },
    "sameAs": [
      "https://linkedin.com",
      "https://instagram.com",
      "https://dribbble.com",
      "https://youtube.com"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8870605033",
      "email": "teamryzeworks@gmail.com",
      "contactType": "business enquiry",
      "areaServed": "Worldwide"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "93/50, Ramakrishna Mutt Rd, Mandaveli",
      "addressLocality": "Chennai",
      "postalCode": "600028",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
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
        <Script
          id="ryze-json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script 
          id="ryze-preloader-gate" 
          strategy="beforeInteractive" 
          dangerouslySetInnerHTML={{ __html: preloaderGate }} 
        />
        <noscript>
          <style>{`#ryze-preloader{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased bg-[#080417] text-zinc-100 selection:bg-[#7042FF] selection:text-white relative" suppressHydrationWarning>
        <CosmicBackground />
        <CustomCursor />
        <div className="grain-overlay" />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <div id="main-content" className="contents">
          <Preloader />
          {children}
        </div>
      </body>
    </html>
  );
}
