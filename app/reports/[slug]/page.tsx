import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { REPORTS_DATA } from "@/data/reportsData";
import { ReportDownloadForm } from "@/components/reports/ReportDownloadForm";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Sparkles,
  Layers,
} from "lucide-react";

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
    <main className="min-h-screen bg-[#080417] text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.25),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6 relative z-10">
        {/* Back Link */}
        <Link
          href="/reports"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>ALL WHITEPAPERS &amp; RESEARCH</span>
        </Link>

        {/* Hero Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-[#7042FF]/15 border border-[#7042FF]/30 text-[#B896FF] text-xs font-mono uppercase font-bold">
                {report.category}
              </span>
              <span className="text-xs font-mono text-zinc-500">
                {report.pages} PAGES • {report.format}
              </span>
              {report.sponsor && (
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
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
            <div className="rounded-3xl bg-[#0d0e17]/85 border border-white/[0.08] p-8 space-y-4">
              <h2 className="text-sm font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#B896FF]" />
                Executive Summary
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                {report.summary}
              </p>
            </div>

            {/* Key Findings */}
            <div className="rounded-3xl bg-[#0d0e17]/85 border border-white/[0.08] p-8 space-y-5">
              <h2 className="text-sm font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B896FF]" />
                Primary Empirical Findings
              </h2>
              <div className="space-y-4">
                {report.keyInsights.map((insight, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-[#7042FF]/20 border border-[#7042FF]/40 flex items-center justify-center text-[#B896FF] shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-sm text-zinc-200 leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Methodology */}
            <div className="rounded-3xl bg-[#0d0e17]/85 border border-white/[0.08] p-8 space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                Research Methodology &amp; Sample Parameters
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
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
