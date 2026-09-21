import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Sparkles, Users, ShieldCheck, ArrowRight, Globe } from "lucide-react";
import { TiltCard3D } from "@/components/ui/TiltCard3D";

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
    <main className="min-h-screen bg-transparent text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.25),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            RYZE AUDIENCE &amp; COMMERCIAL DATA // 2026 MEDIA KIT
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
            Audience Reach &amp; Commercial Specifications
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed mb-6">
            Detailed reader seniority breakdowns, geographic distributions, and editorial placement standards for modern enterprise partners.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/advertise"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-violet-600/20 hover:bg-violet-600 border border-violet-500/30 hover:border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all mb-12"
            >
              <span>Inquire for Inventory &amp; Rate Card</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* High-Level Numbers Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          <TiltCard3D className="bg-[#0B0813]/75 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-6 transition-all duration-300 relative group overflow-hidden shadow-xl text-left">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/[0.07] via-transparent to-cyan-500/[0.04] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-violet-200 transition-colors relative z-10">94%</div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mt-2 relative z-10">Decision-Maker Seniority</div>
          </TiltCard3D>
          <TiltCard3D className="bg-[#0B0813]/75 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-6 transition-all duration-300 relative group overflow-hidden shadow-xl text-left">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/[0.07] via-transparent to-cyan-500/[0.04] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-violet-200 transition-colors relative z-10">40M+</div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mt-2 relative z-10">Telemetry Datapoints</div>
          </TiltCard3D>
          <TiltCard3D className="bg-[#0B0813]/75 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-6 transition-all duration-300 relative group overflow-hidden shadow-xl text-left">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/[0.07] via-transparent to-cyan-500/[0.04] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-violet-200 transition-colors relative z-10">140+</div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mt-2 relative z-10">Scaleup Founders Network</div>
          </TiltCard3D>
          <TiltCard3D className="bg-[#0B0813]/75 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-6 transition-all duration-300 relative group overflow-hidden shadow-xl text-left">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/[0.07] via-transparent to-cyan-500/[0.04] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-violet-200 transition-colors relative z-10">100%</div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mt-2 relative z-10">FTC &amp; Disclosure Integrity</div>
          </TiltCard3D>
        </div>

        {/* 2-Column Seniority & Geography Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Seniority */}
          <div className="bg-[#0B0813]/75 backdrop-blur-2xl border border-white/10 hover:border-violet-500/30 rounded-3xl p-7 sm:p-8 transition-all duration-300 relative shadow-xl space-y-6">
            <div className="text-sm font-mono uppercase tracking-wider text-violet-300 flex items-center gap-2.5 mb-6">
              <Users className="w-5 h-5" />
              <h2>Reader Seniority Breakdown</h2>
            </div>
            <div className="space-y-4">
              {demographics.map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-medium">{item.label}</span>
                    <span className="font-mono text-xs font-bold text-white">{item.percentage}</span>
                  </div>
                  <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                      style={{ width: item.percentage }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Geography */}
          <div className="bg-[#0B0813]/75 backdrop-blur-2xl border border-white/10 hover:border-violet-500/30 rounded-3xl p-7 sm:p-8 transition-all duration-300 relative shadow-xl space-y-6">
            <div className="text-sm font-mono uppercase tracking-wider text-violet-300 flex items-center gap-2.5 mb-6">
              <Globe className="w-5 h-5" />
              <h2>Geographic Distribution</h2>
            </div>
            <div className="space-y-4">
              {geographicDistribution.map((geo, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-medium">{geo.region}</span>
                    <span className="font-mono text-xs font-bold text-white">{geo.share}</span>
                  </div>
                  <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                      style={{ width: geo.share }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Placement Formats */}
        <div className="bg-[#0B0813]/75 backdrop-blur-2xl border border-white/10 rounded-3xl p-7 sm:p-9 shadow-2xl mt-10 space-y-8">
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
                className="bg-white/[0.02] border border-white/10 hover:border-violet-500/30 rounded-2xl p-6 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-violet-200 transition-colors mb-2">{p.title}</h3>
                  <div className="font-mono text-[11px] text-[#B896FF] uppercase mb-4">
                    Target: {p.intent}
                  </div>
                  <p className="font-mono text-xs text-zinc-400 leading-relaxed">{p.specs}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial Standards & Integrity Note */}
        <div className="bg-gradient-to-r from-amber-500/[0.05] via-[#0B0813]/80 to-transparent backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6 mt-8 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.3)] mt-0.5">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold text-amber-200">
              Editorial Standards &amp; Ethical Disclosure Policy
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
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
