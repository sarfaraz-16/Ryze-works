import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { TiltCard3D } from "@/components/ui/TiltCard3D";
import { REPORTS_DATA } from "@/data/reportsData";
import { FileText, ArrowRight, Download, Sparkles, BookOpen, Layers } from "lucide-react";

export const revalidate = 3600;

export const metadata = {
  title: "Industry Research & Whitepapers | RYZE WORKS",
  description: "Empirical research benchmarks, architectural whitepapers, and velocity metrics for modern brands.",
};

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-transparent text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.25),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-3 font-medium flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
            PROPRIETARY BENCHMARKS // EMPIRICAL INTELLIGENCE
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] text-white mb-6">
            Industry Research &amp; Whitepapers
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-2xl">
            In-depth empirical research across AI brand velocity, fintech conversion mechanics, and enterprise design system infrastructure.
          </p>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {REPORTS_DATA.map((report) => (
            <TiltCard3D
              key={report.id}
              className="bg-[#0B0813]/75 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-7 sm:p-8 transition-all duration-300 relative group overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/[0.07] via-transparent to-cyan-500/[0.04] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
              <div className="relative z-10">
                {/* Meta Top Header */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-violet-300 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-md">
                    {report.category}
                  </span>
                  <span className="font-mono text-[11px] text-zinc-400 bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-md">
                    {report.pages} PAGES
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-violet-200 transition-colors tracking-tight mt-4 mb-3">
                  <Link href={`/reports/${report.slug}`}>{report.title}</Link>
                </h2>

                <p className="text-sm text-zinc-300 leading-relaxed font-sans mb-6">
                  {report.summary}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto relative z-10">
                <div className="font-mono text-xs text-zinc-400 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-zinc-500" />
                  {report.format} • {report.fileSize}
                </div>

                <Link
                  href={`/reports/${report.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-violet-600/20 hover:bg-violet-600 border border-violet-500/30 hover:border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all"
                >
                  <span>View Findings →</span>
                </Link>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </main>
  );
}
