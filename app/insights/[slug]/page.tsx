import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ARTICLES_DATA } from "@/data/siteData";
import { ArrowLeft, Clock, Calendar, Share2, Sparkles } from "lucide-react";

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES_DATA.map((art) => ({
    slug: art.slug,
  }));
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const article = ARTICLES_DATA.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#07070b] text-white">
      <Navbar />

      <article className="pt-36 pb-24 max-w-4xl mx-auto px-6">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO INSIGHTS</span>
        </Link>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-4">
          <span className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40">
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-white/40">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
          <span className="flex items-center gap-1 text-white/40">
            <Calendar className="w-3.5 h-3.5" />
            {article.publishedAt}
          </span>
        </div>

        {/* Title & Summary */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          {article.title}
        </h1>
        <p className="text-lg text-white/70 leading-relaxed mb-12 pb-8 border-b border-white/[0.08]">
          {article.summary}
        </p>

        {/* Article Body Content */}
        <div className="space-y-6 text-sm sm:text-base text-white/80 leading-relaxed">
          <p>
            In the current landscape of AI acceleration, traditional agency frameworks that rely on multi-month discovery phases and siloed design documentation are rapidly becoming obsolete. Today’s market demands continuous integration between creative direction and computational execution.
          </p>
          <h2 className="text-2xl font-bold text-white pt-4">
            The Shift from Static Assets to Generative Systems
          </h2>
          <p>
            Brands are no longer static collections of logos, fonts, and fixed color swatches. Instead, an AI-native brand is a living system — capable of adapting across personal interfaces, contextual notifications, and real-time interaction flows while maintaining strict identity coherence.
          </p>
          <div className="p-6 rounded-2xl bg-[#0e101f] border border-purple-800/30 my-8">
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Core Takeaway for Founders
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Design for the API layer first. When your brand system is encoded into design tokens and component libraries, deploying AI agents and personalized user journeys becomes seamless rather than an architectural redesign.
            </p>
          </div>
          <h2 className="text-2xl font-bold text-white pt-4">
            Measuring What Actually Converts
          </h2>
          <p>
            Performance is no longer just about top-of-funnel click-through rates. With intelligent systems, we can instrument granular micro-interactions, predict user drop-offs, and dynamically adjust product flows to optimize for lifetime retention and enterprise trust.
          </p>
        </div>

        {/* Footer info */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/50">
          <div>Published by Ryze Works Editorial Practice</div>
          <div className="flex items-center gap-3">
            <span className="text-white/30">Bangalore, India</span>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
