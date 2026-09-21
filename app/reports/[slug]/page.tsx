import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { REPORTS_DATA } from "@/data/reportsData";
import { ReportDownloadForm } from "@/components/reports/ReportDownloadForm";
import { ArrowLeft, BookOpen, CheckCircle2, ShieldCheck, Sparkles, Layers } from "lucide-react";

export const revalidate = 3600;

interface ReportPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return REPORTS_DATA.map((r) => ({ slug: r.slug }));
}

export default async function ReportDetailPage({ params }: ReportPageProps) {
  const { slug } = await params;
  const report = REPORTS_DATA.find((r) => r.slug === slug);

  if (!report) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-transparent text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.25),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6 relative z-10">
        {/* Back Link */}
        <Link
          href="/reports"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-400 hover:text-white bg-white/[0.04] border border-white/10 hover:border-violet-500/40 transition-all mb-6 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>ALL WHITEPAPERS &amp; RESEARCH</span>
        </Link>

        {/* Hero Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-md text-xs font-mono bg-violet-500/10 border border-violet-500/25 text-violet-300">
                {report.category}
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-mono bg-violet-500/10 border border-violet-500/25 text-violet-300">
                {report.pages} PAGES • {report.format}
              </span>
              {report.sponsor && (
                <span className="px-3 py-1 rounded-md text-xs font-mono bg-violet-500/10 border border-violet-500/25 text-violet-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{report.sponsor.name}</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15]">
              {report.title}
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
              {report.subtitle}
            </p>

            {/* Executive Summary */}
            <div className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 rounded-3xl p-7 sm:p-8 mb-6 transition-all duration-300 relative group shadow-xl">
              <h2 className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Executive Summary
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                {report.summary}
              </p>
            </div>

            {/* Key Findings */}
            <div className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 rounded-3xl p-7 sm:p-8 mb-6 transition-all duration-300 relative group shadow-xl">
              <h2 className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Primary Empirical Findings
              </h2>
              <div className="space-y-4">
                {report.keyInsights.map((insight, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-zinc-200 leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-300 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    <p>{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Methodology */}
            <div className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 rounded-3xl p-7 sm:p-8 mb-6 transition-all duration-300 relative group shadow-xl">
              <h2 className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Research Methodology &amp; Sample Parameters
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                {report.methodology}
              </p>
            </div>
          </div>

          {/* Right Column: Download Lead Gate */}
          <div className="lg:sticky lg:top-28">
            <ReportDownloadForm
              reportTitle={report.title}
              reportSlug={report.slug}
              fileSize={report.fileSize}
            />
          </div>
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </main>
  );
}
