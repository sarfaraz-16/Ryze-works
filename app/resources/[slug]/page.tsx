import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { RESOURCES_DATA } from "@/data/resourcesData";
import { ReportDownloadForm } from "@/components/reports/ReportDownloadForm";
import {
  ArrowLeft,
  CheckCircle2,
  FileCode2,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";

export const revalidate = 3600;

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return RESOURCES_DATA.map((r) => ({ slug: r.slug }));
}

export default async function ResourceDetailPage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = RESOURCES_DATA.find((r) => r.slug === slug);

  if (!resource) {
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
          href="/resources"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>ALL FRAMEWORKS &amp; TOOLKITS</span>
        </Link>

        {/* Resource Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-[#7042FF]/15 border border-[#7042FF]/30 text-[#B896FF] text-xs font-mono uppercase font-bold">
                {resource.category}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {resource.format} • {resource.difficulty} Tier
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15]">
              {resource.title}
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
              {resource.description}
            </p>

            {/* Core Implementation Objectives */}
            <div className="rounded-3xl bg-[#0d0e17]/85 border border-white/[0.08] p-8 space-y-5">
              <h2 className="text-sm font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#B896FF]" />
                What You Get With This Toolkit
              </h2>
              <div className="space-y-4">
                {resource.takeaways.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-[#7042FF]/20 border border-[#7042FF]/40 flex items-center justify-center text-[#B896FF] shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-sm text-zinc-200 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="rounded-3xl bg-[#0d0e17]/85 border border-white/[0.08] p-8 space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                Asset Specifications &amp; Compatibility
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono text-zinc-300">
                <div className="p-3 rounded-xl bg-[#080417] border border-white/[0.06]">
                  <span className="text-zinc-500 block mb-1">FORMAT</span>
                  <span>{resource.format}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#080417] border border-white/[0.06]">
                  <span className="text-zinc-500 block mb-1">FILE SIZE</span>
                  <span>{resource.fileSize}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#080417] border border-white/[0.06]">
                  <span className="text-zinc-500 block mb-1">TIER</span>
                  <span>{resource.difficulty}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Download Lead Gate */}
          <div className="lg:sticky lg:top-28">
            <ReportDownloadForm
              reportTitle={resource.title}
              reportSlug={resource.slug}
              fileSize={resource.fileSize}
            />
          </div>
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </main>
  );
}
