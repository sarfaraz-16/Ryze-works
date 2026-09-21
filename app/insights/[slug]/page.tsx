import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { ARTICLES_DATA } from "@/data/siteData";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

export const revalidate = 3600;

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const supabase = await createClient();
    if (supabase) {
      const { data } = await supabase.from("articles").select("slug").eq("status", "published");
      if (data && data.length > 0) {
        return data.map((art) => ({ slug: art.slug }));
      }
    }
  } catch (err) {
    console.warn("generateStaticParams articles fallback:", err);
  }
  return ARTICLES_DATA.map((art) => ({
    slug: art.slug,
  }));
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  let article = ARTICLES_DATA.find((a) => a.slug === slug);
  let articleContent: string | null = null;

  try {
    const supabase = await createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (!error && data) {
        article = {
          id: data.id,
          slug: data.slug,
          title: data.title,
          category: data.category,
          readTime: data.read_time || "5 min read",
          summary: data.summary,
          coverImage: data.cover_image,
          publishedAt: data.published_at ? data.published_at.split("T")[0] : "2024-09-01"
        };
        articleContent = data.content || null;
      }
    }
  } catch (err) {
    console.warn("InsightDetailPage fetch fallback:", err);
  }

  if (!article) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.summary,
    "datePublished": article.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "Ryze Works Editorial"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ryze Works",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ryzeworks.tech/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ryzeworks.tech/insights/${slug}`
    }
  };

  const glowMap: Record<string, string> = {
    TECHNOLOGY: "from-cyan-500/20 to-transparent",
    BUSINESS: "from-violet-500/20 to-transparent",
    GROWTH: "from-emerald-500/20 to-transparent",
    BRANDING: "from-pink-500/20 to-transparent",
    ALL: "from-white/10 to-transparent",
  };
  
  const _bgGlow = glowMap[article.category] || "from-white/10 to-transparent";

  return (
    <main className="min-h-[calc(100vh-80px)] bg-transparent text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <article className="pt-36 pb-24 max-w-4xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-400 hover:text-white bg-white/[0.04] border border-white/10 hover:border-violet-500/40 transition-all mb-8 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO ARTICLES</span>
          </Link>
        </div>

        {/* Article Header & Metadata Bar */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-violet-300 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-md">
              {article.category}
            </span>
            <span className="font-mono text-xs text-zinc-400 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-md flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span className="font-mono text-xs text-zinc-400 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-md flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedAt}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6 mt-4">
            {article.title}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed mb-6">
            {article.summary}
          </p>

          {/* Author Telemetry Card */}
          <div className="inline-flex items-center gap-3 p-2 pr-4 rounded-full bg-white/[0.03] border border-white/10 mb-10">
            <div className="w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300 font-bold text-sm shadow-[0_0_10px_rgba(139,92,246,0.2)]">
              RW
            </div>
            <div className="text-left flex flex-col">
              <span className="text-sm font-semibold text-zinc-200 leading-none mb-1.5 mt-1">Ryze Works Editorial</span>
              <span className="text-xs font-mono text-zinc-500 leading-none">Research &amp; Strategy</span>
            </div>
          </div>
        </div>

        {/* Feature Graphic / Cover Art */}
        <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-b from-[#130E24]/80 to-[#0B0813]/90 border border-white/10 p-6 sm:p-8 mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 relative z-10">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden group hover:border-violet-500/40 transition-all">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-400 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                PHASE 01 (DAYS 1-7)
              </div>
              <h4 className="text-white font-bold text-sm">Core Metric Isolation</h4>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden group hover:border-violet-500/40 transition-all">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-[10px] font-mono text-violet-400 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                PHASE 02 (DAYS 8-21)
              </div>
              <h4 className="text-white font-bold text-sm">Full-Stack Scaffolding & Edge Auth</h4>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden group hover:border-violet-500/40 transition-all">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                PHASE 03 (DAYS 22-30)
              </div>
              <h4 className="text-white font-bold text-sm">Telemetry, Proof & Hardened Launch</h4>
            </div>
          </div>
        </div>

        {/* Prose Reading Container */}
        {articleContent ? (
          <div className="max-w-3xl mx-auto text-zinc-200 font-sans leading-relaxed text-base sm:text-lg whitespace-pre-line">
            {articleContent}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto text-zinc-200 font-sans leading-relaxed text-base sm:text-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-12 mb-4 flex items-center gap-2.5">
              The Core Trap: Premature Over-Engineering
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 leading-[1.8] mb-6 font-sans">
              In the current landscape of AI acceleration, traditional agency frameworks that rely on multi-month discovery phases and siloed design documentation are rapidly becoming obsolete. Today&apos;s market demands continuous integration between creative direction and computational execution.
            </p>

            <div className="my-8 border-l-2 border-violet-500 bg-violet-950/20 p-6 rounded-r-2xl text-lg text-violet-200 italic">
              &quot;Design for the API layer first. When your brand system is encoded into design tokens and component libraries, deploying AI agents and personalized user journeys becomes seamless rather than an architectural redesign.&quot;
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-12 mb-4 flex items-center gap-2.5">
              The 30-Day Execution Matrix
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 leading-[1.8] mb-6 font-sans">
              Brands are no longer static collections of logos, fonts, and fixed color swatches. Instead, an AI-native brand is a living system — capable of adapting across personal interfaces, contextual notifications, and real-time interaction flows while maintaining strict identity coherence.
            </p>

            <ol className="my-6 space-y-4 pl-6 list-decimal text-zinc-300 text-base sm:text-lg leading-[1.8] font-sans">
              <li><strong className="text-white">Core Metric Isolation:</strong> Establish the singular metric that matters for validation.</li>
              <li><strong className="text-white">Full-Stack Scaffolding:</strong> Build the end-to-end user journey using robust architecture.</li>
              <li><strong className="text-white">Hardened Launch:</strong> Implement telemetry and lock down security for scaled traffic.</li>
            </ol>

            <div className="my-8 p-6 rounded-2xl bg-[#0B0813]/80 backdrop-blur-xl border border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.15)] font-mono text-sm sm:text-base text-violet-200">
              <strong className="text-violet-400">Key Principle:</strong> If your day-one launch requires complex microservices, you haven&apos;t identified your single value transaction.
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-12 mb-4 flex items-center gap-2.5">
              Technical Foundation: Next.js + Edge Layer
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 leading-[1.8] mb-6 font-sans">
              Performance is no longer just about top-of-funnel click-through rates. With intelligent systems, we can instrument granular micro-interactions, predict user drop-offs, and dynamically adjust product flows to optimize for lifetime retention and enterprise trust.
            </p>
          </div>
        )}

        {/* Footer info & Share block */}
        <div className="max-w-3xl mx-auto mt-16 p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-white">Share this insight:</span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-md text-xs font-mono text-zinc-400 bg-white/[0.04] border border-white/10 hover:border-violet-500/40 hover:text-white transition-all cursor-pointer">Copy Link</button>
              <button className="px-3 py-1.5 rounded-md text-xs font-mono text-zinc-400 bg-white/[0.04] border border-white/10 hover:border-violet-500/40 hover:text-white transition-all cursor-pointer">Share on X</button>
            </div>
          </div>
          <div className="text-sm text-zinc-500">
            Published in Chennai, India
          </div>
        </div>
      </article>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
