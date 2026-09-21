import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { TiltCard3D } from "@/components/ui/TiltCard3D";
import { CASE_STUDIES } from "@/data/siteData";
import { createClient } from "@/lib/supabase/server";
import { Sparkles, Award } from "lucide-react";

export const revalidate = 3600;

export const metadata = {
  title: "Case Studies & Client Outcomes | RYZE WORKS",
  description: "Deep dives into strategy, execution, and verified results for Nostic, Razorpay, and Simpl."
};

export default async function CaseStudiesPage() {
  let caseStudies = CASE_STUDIES;

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
        .eq("status", "published")
        .order("created_at", { ascending: true });

      if (!error && data && data.length > 0) {
        caseStudies = data.map((cs: any) => ({
          id: cs.id,
          slug: cs.slug,
          client: cs.client,
          title: cs.title,
          headline: cs.headline,
          challenge: cs.challenge,
          strategy: cs.strategy,
          execution: cs.execution,
          results: cs.results,
          accentColor: cs.accent_color,
          image: cs.hero_image,
          tag: cs.tag
        }));
      }
    }
  } catch (err) {
    console.warn("Supabase case studies fallback:", err);
  }
  return (
    <main className="min-h-[calc(100vh-80px)] bg-transparent text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-3 font-medium flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
            VERIFIED CLIENT OUTCOMES
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] [word-spacing:0.1em] text-white mb-6">
            Deep dives into strategy, execution and results.
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-2xl">
            Every case study in this archive is tied to a real client engagement with verified consent and audited performance figures.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-10 mb-20">
          {caseStudies.map((cs) => (
            <TiltCard3D
              key={cs.id}
              className="bg-[#0B0813]/75 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-8 sm:p-10 transition-all duration-300 relative group overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] mb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/[0.06] via-transparent to-cyan-500/[0.06] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 -z-0" />
              <div className="lg:col-span-7 relative z-10">
                <div className="font-mono text-xs uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-md inline-flex items-center gap-2 mb-3">
                  <span>{cs.client}</span>
                  <span className="text-violet-500/50">•</span>
                  <span>{cs.tag}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-violet-200 transition-colors tracking-tight mb-4">
                  {cs.title}
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed mb-6">
                  {cs.strategy}
                </p>

                <div className="bg-violet-600/10 border border-violet-500/30 rounded-xl p-4 my-4 flex items-center gap-3 text-xs sm:text-sm font-mono text-violet-200 shadow-[0_0_15px_rgba(139,92,246,0.15)] mb-6">
                  <Award className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-violet-400 mb-0.5 tracking-widest uppercase font-semibold">Key Verified Impact</span>
                    <span>{cs.results}</span>
                  </div>
                </div>

                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all relative z-10"
                >
                  <span>Read Full Deep Dive →</span>
                </Link>
              </div>

              <div className="lg:col-span-5 space-y-4 relative z-10">
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-violet-300 font-semibold mb-2 flex items-center gap-2">
                    The Challenge
                  </span>
                  <p className="text-sm text-zinc-200 leading-relaxed font-sans">
                    {cs.challenge}
                  </p>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-violet-300 font-semibold mb-2 flex items-center gap-2">
                    The Technical Execution
                  </span>
                  <p className="text-sm text-zinc-200 leading-relaxed font-sans">
                    {cs.execution}
                  </p>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
