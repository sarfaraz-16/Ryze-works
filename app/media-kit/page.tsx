import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import {
  Sparkles,
  Users,
  Target,
  BarChart2,
  ShieldCheck,
  Download,
  ArrowRight,
  Globe,
  Award,
  Layers,
} from "lucide-react";

export const metadata = {
  title: "Media Kit & Audience Reach | RYZE WORKS",
  description: "Verified demographic reach, seniority breakdown, editorial standards, and commercial placement specifications.",
};

export default function MediaKitPage() {
  const demographics = [
    { label: "Founders, Co-Founders & CEOs", percentage: "42%" },
    { label: "VP Engineering & Technical Architects", percentage: "28%" },
    { label: "Heads of Product & Design", percentage: "18%" },
    { label: "Venture Capital & Scaleup Operators", percentage: "12%" },
  ];

  const geographicDistribution = [
    { region: "India & South Asia (Bengaluru, Mumbai, Delhi)", share: "48%" },
    { region: "North America (San Francisco, NY, Seattle)", share: "32%" },
    { region: "Southeast Asia (Singapore, Jakarta)", share: "14%" },
    { region: "Europe & Remote Global", share: "6%" },
  ];

  const placementFormats = [
    {
      title: "Sponsored Insights Article",
      specs: "1,500 – 2,500 word co-authored deep-dive. Includes permanent indexation, editorial QA, social distribution, and newsletter feature.",
      intent: "Maximum Brand Authority & Thought Leadership",
    },
    {
      title: "In-Article Native Card",
      specs: "Prominent contextual component embedded inside high-traffic relevant articles. Includes product badge, screenshot, and 1-click CTA.",
      intent: "Targeted Mid-Funnel Lead Capture",
    },
    {
      title: "Research Report Benchmark Co-Sponsorship",
      specs: "Exclusive sponsor branding on 40+ page empirical PDF whitepaper. Includes gated lead distribution and executive webinar co-host.",
      intent: "High-Volume Enterprise Account Acquisition",
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
            RYZE AUDIENCE &amp; COMMERCIAL DATA // 2026 MEDIA KIT
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] text-white mb-6">
            Audience Reach &amp; Commercial Specifications
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-2xl">
            Detailed reader seniority breakdowns, geographic distributions, and editorial placement standards for modern enterprise partners.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/advertise"
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#7042FF] to-[#7C3AED] hover:brightness-110 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#7042FF]/30 transition-all cursor-pointer"
            >
              <span>Inquire for Inventory &amp; Rate Card</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* High-Level Numbers Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          <div className="p-6 rounded-3xl bg-[#0d0e17]/90 border border-white/[0.08]">
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">94%</div>
            <div className="text-xs text-zinc-400 font-mono uppercase">Decision-Maker Seniority</div>
          </div>
          <div className="p-6 rounded-3xl bg-[#0d0e17]/90 border border-white/[0.08]">
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">40M+</div>
            <div className="text-xs text-zinc-400 font-mono uppercase">Telemetry Datapoints</div>
          </div>
          <div className="p-6 rounded-3xl bg-[#0d0e17]/90 border border-white/[0.08]">
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">140+</div>
            <div className="text-xs text-zinc-400 font-mono uppercase">Scaleup Founders Network</div>
          </div>
          <div className="p-6 rounded-3xl bg-[#0d0e17]/90 border border-white/[0.08]">
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">100%</div>
            <div className="text-xs text-zinc-400 font-mono uppercase">FTC &amp; Disclosure Integrity</div>
          </div>
        </div>

        {/* 2-Column Seniority & Geography Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Seniority */}
          <div className="rounded-3xl bg-[#0d0e17]/85 border border-white/[0.08] p-8 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/[0.06]">
              <Users className="w-5 h-5 text-[#B896FF]" />
              <h2 className="text-lg font-bold text-white">Reader Seniority Breakdown</h2>
            </div>
            <div className="space-y-4">
              {demographics.map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-medium">{item.label}</span>
                    <span className="text-[#B896FF] font-mono font-bold">{item.percentage}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/[0.05] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#7042FF] to-[#B896FF]"
                      style={{ width: item.percentage }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Geography */}
          <div className="rounded-3xl bg-[#0d0e17]/85 border border-white/[0.08] p-8 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/[0.06]">
              <Globe className="w-5 h-5 text-[#B896FF]" />
              <h2 className="text-lg font-bold text-white">Geographic Distribution</h2>
            </div>
            <div className="space-y-4">
              {geographicDistribution.map((geo, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-medium">{geo.region}</span>
                    <span className="text-emerald-400 font-mono font-bold">{geo.share}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/[0.05] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                      style={{ width: geo.share }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Placement Formats */}
        <div className="rounded-3xl bg-[#0d0e17]/85 border border-white/[0.08] p-8 sm:p-12 mb-16 space-y-8">
          <div>
            <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-1">
              COMMERCIAL FORMATS
            </div>
            <h2 className="text-2xl font-bold text-white">Available Placement Inventory</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {placementFormats.map((p, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#080417] border border-white/[0.06] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                  <div className="text-[11px] font-mono text-[#B896FF] uppercase mb-4">
                    Target: {p.intent}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{p.specs}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial Standards & Integrity Note */}
        <div className="rounded-3xl bg-amber-950/20 border border-amber-500/25 p-8 flex flex-col sm:flex-row items-start gap-5">
          <ShieldCheck className="w-8 h-8 text-amber-400 shrink-0 mt-1" />
          <div className="space-y-2">
            <h3 className="text-base font-bold text-amber-200">
              Editorial Standards &amp; Ethical Disclosure Policy
            </h3>
            <p className="text-xs text-amber-300/80 leading-relaxed">
              Ryze Works preserves strict separation between commercial partnerships and editorial perspectives. All sponsored content, co-authored research, and native placements are visibly badged with required &ldquo;Sponsored&rdquo; or &ldquo;Partner Content&rdquo; attributions in compliance with global advertising and consumer protection guidelines.
            </p>
          </div>
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </main>
  );
}
