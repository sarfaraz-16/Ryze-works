import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { ARTICLES_DATA } from "@/data/siteData";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, Clock, Calendar, Sparkles } from "lucide-react";

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

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#080417] text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <article className="pt-36 pb-24 max-w-4xl mx-auto px-6 relative z-10">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO INSIGHTS ARCHIVE</span>
        </Link>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-medium text-[#B896FF] uppercase tracking-wider mb-6">
          <span className="px-3.5 py-1.5 rounded-full bg-[#1E085A]/60 border border-[#7042FF]/30 shadow-md">
            {article.category}
          </span>
          <span className="flex items-center gap-1.5 text-zinc-400">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
          <span className="flex items-center gap-1.5 text-zinc-400">
            <Calendar className="w-3.5 h-3.5" />
            {article.publishedAt}
          </span>
        </div>

        {/* Title & Summary */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.01em] [word-spacing:0.1em] leading-[1.1] text-white mb-6">
          {article.title}
        </h1>
        <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed mb-12 pb-8 border-b border-white/[0.08]">
          {article.summary}
        </p>

        {/* Article Body Content */}
        {articleContent ? (
          <div className="space-y-6 text-sm sm:text-base text-zinc-200 font-normal leading-relaxed whitespace-pre-line">
            {articleContent}
          </div>
        ) : (
          <div className="space-y-8 text-sm sm:text-base text-zinc-200 font-normal leading-relaxed">
            <p>
              In the current landscape of AI acceleration, traditional agency frameworks that rely on multi-month discovery phases and siloed design documentation are rapidly becoming obsolete. Today’s market demands continuous integration between creative direction and computational execution.
            </p>

            <h2 className="text-xl sm:text-2xl font-semibold text-white pt-4 tracking-[-0.01em] [word-spacing:0.08em]">
              The Shift from Static Assets to Generative Systems
            </h2>
            <p>
              Brands are no longer static collections of logos, fonts, and fixed color swatches. Instead, an AI-native brand is a living system — capable of adapting across personal interfaces, contextual notifications, and real-time interaction flows while maintaining strict identity coherence.
            </p>

            <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1E085A]/50 via-[#0d0e17]/90 to-[#1E085A]/50 border border-[#7042FF]/40 my-8 backdrop-blur-md shadow-2xl shadow-black/50">
              <h3 className="font-mono text-xs sm:text-sm font-semibold text-[#B896FF] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B896FF]" />
                Core Takeaway for Founders
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
                Design for the API layer first. When your brand system is encoded into design tokens and component libraries, deploying AI agents and personalized user journeys becomes seamless rather than an architectural redesign.
              </p>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-white pt-4 tracking-[-0.01em] [word-spacing:0.08em]">
              Measuring What Actually Converts
            </h2>
            <p>
              Performance is no longer just about top-of-funnel click-through rates. With intelligent systems, we can instrument granular micro-interactions, predict user drop-offs, and dynamically adjust product flows to optimize for lifetime retention and enterprise trust.
            </p>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs text-zinc-400">
          <div>Published by Ryze Works Editorial Practice</div>
          <div className="text-zinc-500">Bangalore, India</div>
        </div>
      </article>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
