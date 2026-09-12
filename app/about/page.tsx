import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Sparkles, ShieldCheck, Zap, Globe2, Compass, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us | RYZE WORKS",
  description: "An AI-native creative & technology partner helping ambitious brands build, grow, and scale."
};

export default function AboutPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#080417] text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-6xl mx-auto px-6 relative z-10">
        {/* Eyebrow */}
        <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-4 font-medium flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
          THE RYZE WORKS PHILOSOPHY
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] [word-spacing:0.1em] text-white mb-8">
          We are AI-native, not just AI-curious.
        </h1>

        <p className="text-base sm:text-xl text-zinc-300 font-normal leading-relaxed max-w-3xl mb-16">
          Ryze Works was founded in Chennai with a radical conviction: the next generation of category-defining brands will not be built by bloated 80-person agency decks. They will be engineered by compact, elite pods armed with intelligent computational workflows.
        </p>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/30 shadow-2xl shadow-black/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#1E085A]/60 border border-[#7042FF]/30 flex items-center justify-center mb-6 shadow-lg shadow-[#1E085A]/50">
              <Zap className="w-6 h-6 text-[#B896FF]" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-[-0.01em] [word-spacing:0.08em]">10x Velocity</h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
              By replacing manual discovery overhead with AI synthesis, our sprint cycles deliver working software and complete design systems in 4 to 12 weeks.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/30 shadow-2xl shadow-black/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#1E085A]/60 border border-[#7042FF]/30 flex items-center justify-center mb-6 shadow-lg shadow-[#1E085A]/50">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-[-0.01em] [word-spacing:0.08em]">Zero Placeholders</h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
              Every client logo, case study metric, and testimonial we publish is backed by verified written consent and real production databases.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/30 shadow-2xl shadow-black/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#1E085A]/60 border border-[#7042FF]/30 flex items-center justify-center mb-6 shadow-lg shadow-[#1E085A]/50">
              <Compass className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-[-0.01em] [word-spacing:0.08em]">Fullstack Synergy</h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
              Designers who understand APIs; engineers with editorial taste. We bridge the gap between creative vision and serverless cloud infrastructure.
            </p>
          </div>
        </div>

        {/* Studio Info */}
        <div className="rounded-3xl bg-gradient-to-r from-[#1E085A]/50 via-[#0d0e17]/90 to-[#1E085A]/50 border border-[#7042FF]/30 p-8 sm:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md shadow-2xl shadow-black/50">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-medium text-[#B896FF] uppercase tracking-wider mb-2">
              <Globe2 className="w-4 h-4" />
              <span>Chennai Studio &amp; Global Operations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2 tracking-[-0.01em] [word-spacing:0.08em]">
              Building from India for the world.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal max-w-md leading-relaxed">
              We collaborate with venture-backed tech startups, fintech unicorns, and ambitious founders globally from our headquarters in Chennai.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#7042FF] to-[#4318D1] hover:brightness-110 shadow-lg shadow-[#7042FF]/30 border border-[#B896FF]/30 transition-all shrink-0"
          >
            <span>Connect With Us</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
