import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { CASE_STUDIES } from "@/data/siteData";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, ArrowRight, ShieldCheck, Award } from "lucide-react";

export const revalidate = 3600;

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const supabase = await createClient();
    if (supabase) {
      const { data } = await supabase.from("case_studies").select("slug").eq("status", "published");
      if (data && data.length > 0) {
        return data.map((item) => ({ slug: item.slug }));
      }
    }
  } catch (err) {
    console.warn("generateStaticParams case studies fallback:", err);
  }
  return CASE_STUDIES.map((cs) => ({
    slug: cs.slug,
  }));
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  let cs = CASE_STUDIES.find((item) => item.slug === slug);

  try {
    const supabase = await createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("case_studies")
        .select(`
          id,
          slug,
          client,
          title,
          headline,
          challenge,
          strategy,
          execution,
          results,
          accent_color,
          hero_image,
          tag,
          projects (
            id,
            title,
            slug,
            industry
          )
        `)
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (!error && data) {
        cs = {
          id: data.id,
          slug: data.slug,
          client: data.client,
          title: data.title,
          headline: data.headline,
          challenge: data.challenge,
          strategy: data.strategy,
          execution: data.execution,
          results: data.results,
          accentColor: data.accent_color,
          image: data.hero_image,
          tag: data.tag
        };
      }
    }
  } catch (err) {
    console.warn("CaseStudyDetailPage fetch fallback:", err);
  }

  if (!cs) {
    notFound();
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-transparent text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-5xl mx-auto px-6 relative z-10">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-400 hover:text-white bg-white/[0.04] border border-white/10 hover:border-violet-500/40 transition-all mb-6 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO CASE STUDIES</span>
        </Link>

        {/* Client & Verification Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#B896FF] mb-4">
            <span className="bg-[#1E085A]/50 border border-[#7042FF]/30 px-3 py-1 rounded-full">{cs.client}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Performance Record
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] [word-spacing:0.1em] text-white mb-6">
            {cs.title}
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-3xl">
            {cs.headline}
          </p>
        </div>

        {/* Key Result Banner */}
        <div className="bg-gradient-to-r from-violet-950/40 via-[#0B0813]/80 to-purple-950/30 backdrop-blur-2xl border border-violet-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(139,92,246,0.15)] mb-10 flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Award className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="font-mono text-[11px] font-medium tracking-wider uppercase text-[#B896FF] mb-1.5">
              Verified Production Impact &amp; Metric
            </div>
            <div className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {cs.results}
            </div>
          </div>
        </div>

        {/* Deep Dive Narrative */}
        <div className="space-y-6 mb-14">
          <div className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 rounded-3xl p-7 sm:p-9 transition-all duration-300 relative group shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3 tracking-tight">
              <span className="text-violet-400/50">1.</span> The Challenge
            </h2>
            <p className="text-base text-zinc-300 leading-relaxed font-sans">
              {cs.challenge}
            </p>
          </div>

          <div className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 rounded-3xl p-7 sm:p-9 transition-all duration-300 relative group shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3 tracking-tight">
              <span className="text-violet-400/50">2.</span> The Strategic Direction
            </h2>
            <p className="text-base text-zinc-300 leading-relaxed font-sans">
              {cs.strategy}
            </p>
          </div>

          <div className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 rounded-3xl p-7 sm:p-9 transition-all duration-300 relative group shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3 tracking-tight">
              <span className="text-violet-400/50">3.</span> Technical Execution
            </h2>
            <p className="text-base text-zinc-300 leading-relaxed font-sans mb-6">
              {cs.execution}
            </p>
            <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-white/10">
              {["Next.js", "TypeScript", "Tailwind CSS", "Supabase PostgreSQL", "Edge AI Gateway"].map(tech => (
                <span key={tech} className="px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Closing Action */}
        <div className="bg-[#0B0813]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
              Want similar results for your product?
            </h3>
            <p className="text-sm text-zinc-300 font-sans">
              Schedule an executive discovery call or generate a structured brief.
            </p>
          </div>
          <Link
            href="/start-a-project"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl px-6 py-3.5 shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all shrink-0 flex items-center gap-2"
          >
            <span>Start a Project Brief</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
