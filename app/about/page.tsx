import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Sparkles, ShieldCheck, Zap, Globe2, Compass, ArrowRight } from "lucide-react";
import { TiltCard3D } from "@/components/ui/TiltCard3D";

export const metadata = {
  title: "About Us | RYZE WORKS",
  description: "An AI-native creative & technology partner helping ambitious brands build, grow, and scale."
};

export default function AboutPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-transparent text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-6xl mx-auto px-6 relative z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          THE RYZE WORKS PHILOSOPHY
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-8">
          We are AI-native, not just AI-curious.
        </h1>

        <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl leading-relaxed font-sans mb-16">
          Ryze Works was founded in Chennai with a radical conviction: the next generation of category-defining brands will not be built by bloated 80-person agency decks. They will be engineered by compact, elite pods armed with intelligent computational workflows.
        </p>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <TiltCard3D className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-8 transition-all duration-300 relative group overflow-hidden shadow-2xl h-full flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-300 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-violet-500/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">10x Velocity</h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              By replacing manual discovery overhead with AI synthesis, our sprint cycles deliver working software and complete design systems in 4 to 12 weeks.
            </p>
          </TiltCard3D>

          <TiltCard3D className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-8 transition-all duration-300 relative group overflow-hidden shadow-2xl h-full flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-300 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-violet-500/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Zero Placeholders</h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Every client logo, case study metric, and testimonial we publish is backed by verified written consent and real production databases.
            </p>
          </TiltCard3D>

          <TiltCard3D className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-8 transition-all duration-300 relative group overflow-hidden shadow-2xl h-full flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-300 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-violet-500/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Fullstack Synergy</h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Designers who understand APIs; engineers with editorial taste. We bridge the gap between creative vision and serverless cloud infrastructure.
            </p>
          </TiltCard3D>
        </div>

        {/* Telemetry / Impact Strip */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-20">
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white mb-1">4–12 WKS</div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Average Sprint to Production</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white mb-1">100%</div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Verified Client Work</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white mb-1">0%</div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Agency Bloat &amp; Junior Handoffs</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white mb-1">SUB-180MS</div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Target Edge Response</div>
          </div>
        </div>

        {/* Studio Info */}
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.2),transparent_70%)] blur-[90px] -z-10 pointer-events-none" />
          <div className="bg-[#0B0813]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
            <div className="relative z-10">
              <div className="flex items-center gap-2 font-mono text-xs font-medium text-violet-400 uppercase tracking-wider mb-3">
                <Globe2 className="w-4 h-4" />
                <span>Chennai Studio &amp; Global Operations</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-[-0.01em]">
                Building from India for the world.
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 font-normal max-w-md leading-relaxed">
                We collaborate with venture-backed tech startups, fintech unicorns, and ambitious founders globally from our headquarters in Chennai.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(139,92,246,0.35)] border border-white/10 transition-all shrink-0 relative z-10"
            >
              <span>Connect With Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
