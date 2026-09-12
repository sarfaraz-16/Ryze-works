import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CASE_STUDIES } from "@/data/siteData";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Case Studies | RYZE WORKS",
  description: "Deep dives into strategy, execution, and verified results for Nostic, Razorpay, and Simpl."
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[#07070b] text-white">
      <Navbar />

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40 text-purple-300 text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            VERIFIED CLIENT OUTCOMES
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Deep dives into strategy, execution and results.
          </h1>
          <p className="text-base text-white/60 leading-relaxed">
            Every case study in this archive is tied to a real client engagement with verified consent and audited performance figures.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-8 mb-20">
          {CASE_STUDIES.map((cs, idx) => (
            <div
              key={cs.id}
              className="rounded-3xl bg-[#0c0d16]/90 border border-white/[0.08] hover:border-purple-500/40 p-8 sm:p-12 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 text-xs font-bold tracking-wider text-purple-400 uppercase mb-3">
                  <span>{cs.client}</span>
                  <span>•</span>
                  <span>{cs.tag}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                  {cs.title}
                </h2>
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  {cs.strategy}
                </p>

                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/30 mb-6">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-purple-300 block mb-1">
                    Key Result
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {cs.results}
                  </span>
                </div>

                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300 hover:text-white transition-colors"
                >
                  <span>Read Full Deep Dive</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="lg:col-span-5 bg-[#080810] rounded-2xl p-6 border border-white/[0.05] space-y-4">
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-white/40 block mb-1">
                    The Challenge
                  </span>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {cs.challenge}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/[0.05]">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-white/40 block mb-1">
                    The Execution
                  </span>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {cs.execution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
