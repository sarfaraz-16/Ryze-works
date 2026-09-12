import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Sparkles, ShieldCheck, Zap, Globe2, Compass } from "lucide-react";

export const metadata = {
  title: "About Us | RYZE WORKS",
  description: "An AI-native creative & technology partner helping ambitious brands build, grow, and scale."
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#07070b] text-white">
      <Navbar />

      <section className="pt-36 pb-24 max-w-5xl mx-auto px-6">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40 text-purple-300 text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
          THE RYZE WORKS PHILOSOPHY
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
          We are AI-native, not just AI-curious.
        </h1>

        <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl mb-16">
          Ryze Works was founded in Bangalore with a radical conviction: the next generation of category-defining brands will not be built by bloated 80-person agency decks. They will be engineered by compact, elite pods armed with intelligent computational workflows.
        </p>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-2xl bg-[#0c0d16]/80 border border-white/[0.08]">
            <Zap className="w-8 h-8 text-purple-400 mb-4" />
            <h2 className="text-lg font-bold text-white mb-2">10x Velocity</h2>
            <p className="text-xs text-white/60 leading-relaxed">
              By replacing manual discovery overhead with AI synthesis, our sprint cycles deliver working software and complete design systems in 4 to 12 weeks.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0c0d16]/80 border border-white/[0.08]">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mb-4" />
            <h2 className="text-lg font-bold text-white mb-2">Zero Placeholders</h2>
            <p className="text-xs text-white/60 leading-relaxed">
              Every client logo, case study metric, and testimonial we publish is backed by verified written consent and real production databases.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0c0d16]/80 border border-white/[0.08]">
            <Compass className="w-8 h-8 text-cyan-400 mb-4" />
            <h2 className="text-lg font-bold text-white mb-2">Fullstack Synergy</h2>
            <p className="text-xs text-white/60 leading-relaxed">
              Designers who understand APIs; engineers with editorial taste. We bridge the gap between creative vision and serverless cloud infrastructure.
            </p>
          </div>
        </div>

        {/* Studio Info */}
        <div className="rounded-3xl bg-[#0d0e1a] border border-white/[0.08] p-8 sm:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">
              <Globe2 className="w-4 h-4" />
              <span>Bangalore Studio & Global Operations</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Building from India for the world.
            </h2>
            <p className="text-xs text-white/60 max-w-md leading-relaxed">
              We collaborate with venture-backed tech startups, fintech unicorns, and ambitious founders globally from our headquarters in Bangalore.
            </p>
          </div>

          <Link href="/contact">
            <Button variant="primary" size="md">
              Connect With Us →
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
