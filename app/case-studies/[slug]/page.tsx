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
    <main className="min-h-[calc(100vh-80px)] bg-[#080417] text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-5xl mx-auto px-6 relative z-10">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-400 hover:text-white transition-colors mb-8 group"
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
        <div className="rounded-3xl bg-gradient-to-r from-[#1E085A]/60 via-[#0d0e17] to-[#1E085A]/60 border border-[#7042FF]/40 p-8 sm:p-10 mb-14 flex items-start gap-5 shadow-2xl shadow-black/50">
          <Award className="w-10 h-10 text-amber-400 shrink-0 mt-1" />
          <div>
            <div className="font-mono text-[11px] font-medium tracking-wider uppercase text-[#B896FF] mb-1.5">
              Verified Production Impact &amp; Metric
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tracking-[-0.015em]">
              {cs.results}
            </div>
          </div>
        </div>

        {/* Deep Dive Narrative */}
        <div className="space-y-10 mb-14">
          <div className="rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] p-8 sm:p-10 shadow-2xl shadow-black/50">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 tracking-[-0.01em] [word-spacing:0.08em]">
              1. The Challenge
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
              {cs.challenge}
            </p>
          </div>

          <div className="rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] p-8 sm:p-10 shadow-2xl shadow-black/50">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 tracking-[-0.01em] [word-spacing:0.08em]">
              2. The Strategic Direction
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
              {cs.strategy}
            </p>
          </div>

          <div className="rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] p-8 sm:p-10 shadow-2xl shadow-black/50">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 tracking-[-0.01em] [word-spacing:0.08em]">
              3. Technical Execution
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed mb-6">
              {cs.execution}
            </p>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] font-mono text-xs text-zinc-400">
              Technology Stack: Next.js (App Router), TypeScript, Tailwind CSS, Supabase PostgreSQL, Edge AI Gateway.
            </div>
          </div>
        </div>

        {/* Closing Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1E085A]/50 via-[#0d0e17]/90 to-[#1E085A]/50 border border-[#7042FF]/30 backdrop-blur-md shadow-2xl shadow-black/50">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 tracking-[-0.01em] [word-spacing:0.08em] leading-snug">
              Want similar results for your product?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal">
              Schedule an executive discovery call or generate a structured brief.
            </p>
          </div>
          <Link
            href="/start-a-project"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#7042FF] to-[#4318D1] hover:brightness-110 shadow-lg shadow-[#7042FF]/30 border border-[#B896FF]/30 transition-all shrink-0"
          >
            <span>Start a Project Brief</span>
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
