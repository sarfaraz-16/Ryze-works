import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { RESOURCES_DATA } from "@/data/resourcesData";
import { ResourceDownloadForm } from "@/components/resources/ResourceDownloadForm";
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
    <main className="min-h-screen bg-transparent text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.25),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6 relative z-10">
        {/* Back Link */}
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-400 hover:text-white bg-white/[0.04] border border-white/10 hover:border-violet-500/40 transition-all mb-6 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
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
            <div className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 rounded-3xl p-7 sm:p-8 mb-6 transition-all duration-300 relative group shadow-xl">
              <h2 className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                What You Get With This Toolkit
              </h2>
              <div className="space-y-4">
                {resource.takeaways.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-zinc-200 leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-300 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    <p>{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 rounded-3xl p-7 sm:p-8 mb-6 transition-all duration-300 relative group shadow-xl">
              <h2 className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Asset Specifications &amp; Compatibility
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono text-zinc-300">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                  <span className="text-[11px] font-mono uppercase text-zinc-400 block mb-1">FORMAT</span>
                  <span className="text-sm font-semibold text-white tracking-wide">{resource.format}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                  <span className="text-[11px] font-mono uppercase text-zinc-400 block mb-1">FILE SIZE</span>
                  <span className="text-sm font-semibold text-white tracking-wide">{resource.fileSize}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                  <span className="text-[11px] font-mono uppercase text-zinc-400 block mb-1">TIER</span>
                  <span className="text-sm font-semibold text-white tracking-wide">{resource.difficulty}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Download Lead Gate */}
          <div className="lg:sticky lg:top-28">
            <ResourceDownloadForm
              resourceTitle={resource.title}
              resourceSlug={resource.slug}
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
