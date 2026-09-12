import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { CASE_STUDIES } from "@/data/siteData";
import { createClient } from "@/lib/supabase/server";
import { ArrowRight, ShieldCheck, Sparkles, Award } from "lucide-react";

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
    <main className="min-h-[calc(100vh-80px)] bg-[#080417] text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
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
            <div
              key={cs.id}
              className="rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/30 shadow-2xl shadow-black/50 p-8 sm:p-12 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 font-mono text-[11px] font-medium tracking-wider text-[#B896FF] uppercase mb-4">
                  <span className="bg-[#1E085A]/60 border border-[#7042FF]/30 px-3 py-1 rounded-full">{cs.client}</span>
                  <span>•</span>
                  <span>{cs.tag}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 leading-snug tracking-[-0.01em] [word-spacing:0.1em]">
                  {cs.title}
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed mb-6">
                  {cs.strategy}
                </p>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1E085A]/60 to-[#0d0e17] border border-[#7042FF]/40 mb-6 flex items-start gap-3.5">
                  <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] font-medium tracking-wider uppercase text-[#B896FF] block mb-0.5">
                      Key Verified Impact
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {cs.results}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#7042FF] to-[#4318D1] hover:brightness-110 shadow-lg shadow-[#7042FF]/30 border border-[#B896FF]/30 transition-all"
                >
                  <span>Read Full Deep Dive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="lg:col-span-5 bg-[#080417]/80 rounded-2xl p-6 sm:p-8 border border-white/[0.06] space-y-5">
                <div>
                  <span className="font-mono text-[10px] font-medium tracking-wider uppercase text-zinc-400 block mb-1.5">
                    The Challenge
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
                    {cs.challenge}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/[0.08]">
                  <span className="font-mono text-[10px] font-medium tracking-wider uppercase text-zinc-400 block mb-1.5">
                    The Technical Execution
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
                    {cs.execution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
