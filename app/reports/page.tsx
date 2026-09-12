import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { REPORTS_DATA } from "@/data/reportsData";
import { FileText, ArrowRight, Download, Sparkles, BookOpen, Layers } from "lucide-react";

export const revalidate = 3600;

export const metadata = {
  title: "Industry Research & Whitepapers | RYZE WORKS",
  description: "Empirical research benchmarks, architectural whitepapers, and velocity metrics for modern brands.",
};

export default function ReportsPage() {
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
            <div
              key={report.id}
              className="rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/35 p-8 flex flex-col justify-between shadow-2xl shadow-black/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#7042FF]/10 group"
            >
              <div>
                {/* Meta Top Header */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <span className="px-2.5 py-1 rounded-md bg-[#7042FF]/15 border border-[#7042FF]/30 text-[#B896FF] text-[10px] font-mono uppercase font-bold">
                    {report.category}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">
                    {report.pages} PAGES
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h2 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#B896FF] transition-colors leading-snug">
                  <Link href={`/reports/${report.slug}`}>{report.title}</Link>
                </h2>

                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {report.summary}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
                <div className="text-[11px] font-mono text-zinc-500">
                  {report.format} • {report.fileSize}
                </div>

                <Link
                  href={`/reports/${report.slug}`}
                  className="text-xs font-semibold text-white group-hover:text-[#B896FF] flex items-center gap-1.5 transition-colors"
                >
                  <span>View Findings</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </main>
  );
}
