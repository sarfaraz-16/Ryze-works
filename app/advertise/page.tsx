import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { AdvertiserInquiryForm } from "@/components/commercial/AdvertiserInquiryForm";
import {
  Sparkles,
  BarChart3,
  Users,
  ShieldCheck,
  FileText,
  Layers,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Advertise & Partner | RYZE WORKS",
  description: "Reach elite founders, VP Engineers, and creative directors through verified sponsorships, research co-authoring, and native editorial placements.",
};

export default function AdvertisePage() {
  const highlights = [
    {
      icon: Users,
      title: "94% Decision-Maker Seniority",
      description: "Our audience consists predominantly of Series A–IPO founders, VP Engineers, Heads of Design, and technical executives.",
    },
    {
      icon: BarChart3,
      title: "40M+ Telemetry Data Scale",
      description: "Our research whitepapers and benchmarks draw from verified scaleup transactions across India, SEA, and Silicon Valley.",
    },
    {
      icon: ShieldCheck,
      title: "Zero Clickbait Editorial Integrity",
      description: "Strict FTC-compliant labeling ensures high reader trust, high brand halo effect, and sustained commercial conversion.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#080417] text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.25),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-3 font-medium flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
            COMMERCIAL PARTNERSHIPS // AUDIENCE NETWORK
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] text-white mb-6">
            Reach decision-makers building the future of tech.
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-2xl">
            Align your enterprise platform with high-conviction founders, engineering leaders, and product innovators via verified research benchmarks and native thought leadership.
          </p>

          <div className="mt-6 flex items-center gap-4 text-xs font-mono">
            <Link
              href="/media-kit"
              className="text-[#B896FF] hover:underline flex items-center gap-1"
            >
              <span>Explore Audience Demographics &amp; Media Kit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3-Column Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <div
                key={i}
                className="p-7 rounded-3xl bg-[#0d0e17]/80 border border-white/[0.08] flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#7042FF]/15 border border-[#7042FF]/30 flex items-center justify-center text-[#B896FF] mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{h.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{h.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Advertiser Intake Form */}
        <div className="max-w-4xl mx-auto">
          <AdvertiserInquiryForm />
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </main>
  );
}
