import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { AdvertiserInquiryForm } from "@/components/commercial/AdvertiserInquiryForm";
import { Sparkles, BarChart3, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { TiltCard3D } from "@/components/ui/TiltCard3D";

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
    <main className="min-h-screen bg-transparent text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.25),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            COMMERCIAL PARTNERSHIPS // AUDIENCE NETWORK
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
            Reach decision-makers building the future of tech.
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed mb-10">
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
              <TiltCard3D
                key={i}
                className="bg-[#0B0813]/75 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-6 sm:p-7 transition-all duration-300 relative group overflow-hidden shadow-xl flex flex-col justify-between"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/[0.07] via-transparent to-cyan-500/[0.04] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{h.title}</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">{h.description}</p>
                </div>
              </TiltCard3D>
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
