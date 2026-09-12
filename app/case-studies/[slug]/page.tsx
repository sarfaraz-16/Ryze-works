import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { CASE_STUDIES } from "@/data/siteData";
import { ArrowLeft, ShieldCheck, CheckCircle2, Award, Zap } from "lucide-react";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({
    slug: cs.slug,
  }));
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((item) => item.slug === slug);

  if (!cs) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#07070b] text-white">
      <Navbar />

      <section className="pt-36 pb-24 max-w-4xl mx-auto px-6">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO CASE STUDIES</span>
        </Link>

        {/* Client & Verification Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">
            <span>{cs.client}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Performance Record
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {cs.title}
          </h1>
          <p className="text-lg text-white/70 leading-relaxed">
            {cs.headline}
          </p>
        </div>

        {/* Key Result Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-purple-950/50 via-indigo-950/40 to-slate-900/80 border border-purple-800/40 p-6 sm:p-8 mb-12 flex items-start gap-4">
          <Award className="w-8 h-8 text-amber-400 shrink-0 mt-1" />
          <div>
            <div className="text-xs font-bold tracking-wider uppercase text-purple-300 mb-1">
              Verified Production Impact
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white">
              {cs.results}
            </div>
          </div>
        </div>

        {/* Deep Dive Narrative */}
        <div className="space-y-10 mb-12">
          <div className="rounded-2xl bg-[#0c0d16]/80 border border-white/[0.08] p-8">
            <h2 className="text-xl font-bold text-white mb-3">1. The Challenge</h2>
            <p className="text-sm text-white/60 leading-relaxed">
              {cs.challenge}
            </p>
          </div>

          <div className="rounded-2xl bg-[#0c0d16]/80 border border-white/[0.08] p-8">
            <h2 className="text-xl font-bold text-white mb-3">2. The Strategic Direction</h2>
            <p className="text-sm text-white/60 leading-relaxed">
              {cs.strategy}
            </p>
          </div>

          <div className="rounded-2xl bg-[#0c0d16]/80 border border-white/[0.08] p-8">
            <h2 className="text-xl font-bold text-white mb-3">3. Technical Execution</h2>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              {cs.execution}
            </p>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-white/50">
              Technology Stack: Next.js (App Router), TypeScript, Tailwind CSS, Supabase PostgreSQL, Edge AI Gateway.
            </div>
          </div>
        </div>

        {/* Closing Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-[#0d0e1a] border border-white/10">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              Want similar results for your product?
            </h3>
            <p className="text-xs text-white/50">
              Schedule an executive discovery call or generate a structured brief.
            </p>
          </div>
          <Link href="/start-a-project">
            <Button variant="primary" size="md">
              Start a Project →
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
