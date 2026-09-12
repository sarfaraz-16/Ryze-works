import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SERVICES_DATA, CASE_STUDIES } from "@/data/siteData";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Layers } from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#07070b] text-white">
      <Navbar />

      <section className="pt-36 pb-24 max-w-5xl mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO SERVICES</span>
        </Link>

        {/* Eyebrow & Title */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40 text-purple-300 text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            {service.tagline} // {service.group}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            {service.name}
          </h1>
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl">
            {service.description}
          </p>
        </div>

        {/* Methodology & Approach */}
        <div className="rounded-2xl bg-[#0c0d16]/80 border border-white/[0.08] p-8 sm:p-10 mb-12">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span>AI-Native Methodology</span>
          </h2>
          <p className="text-sm text-white/60 leading-relaxed mb-6">
            We bypass traditional multi-month agency bloat by deploying AI-accelerated research frameworks, procedural design tokens, and rapid fullstack prototyping to test and validate outcomes in weeks.
          </p>

          <h3 className="text-xs font-bold tracking-wider text-white/50 uppercase mb-4">
            Deliverables & Capabilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.deliverables.map((d) => (
              <div key={d} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs font-medium text-white/90">{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-gradient-to-r from-purple-950/30 to-indigo-950/30 border border-purple-800/30">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              Ready to execute with {service.name}?
            </h3>
            <p className="text-xs text-white/50">
              Speak with a practice lead or generate an instant project brief.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/start-a-project">
              <Button variant="primary" size="md">
                Start Project Brief →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
