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

  const glowMap: Record<string, string> = {
    TECHNOLOGY: "from-cyan-500/20 to-transparent",
    BUSINESS: "from-violet-500/20 to-transparent",
    GROWTH: "from-emerald-500/20 to-transparent",
    BRANDING: "from-pink-500/20 to-transparent",
    ALL: "from-white/10 to-transparent",
  };
  
  const bgGlow = glowMap[article.category] || "from-white/10 to-transparent";

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

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mt-4 mb-6">
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
        <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden bg-black/40 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] mb-12 p-8 sm:p-12 relative flex items-center justify-center min-h-[300px]">
          <div className={`absolute inset-0 bg-gradient-to-br ${bgGlow} opacity-50 mix-blend-screen`} />
          <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('/noise.png')", backgroundSize: "100px" }} />
          <div className="relative z-10 text-center">
            <Sparkles className="w-16 h-16 text-white/30 mx-auto" />
          </div>
        </div>

        {/* Prose Reading Container */}
        {articleContent ? (
          <div className="max-w-3xl mx-auto text-zinc-200 font-sans leading-relaxed text-base sm:text-lg whitespace-pre-line">
            {articleContent}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto text-zinc-200 font-sans leading-relaxed text-base sm:text-lg">
            <p className="mb-6 text-zinc-300 font-normal leading-[1.8]">
              In the current landscape of AI acceleration, traditional agency frameworks that rely on multi-month discovery phases and siloed design documentation are rapidly becoming obsolete. Today’s market demands continuous integration between creative direction and computational execution.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-12 mb-4 flex items-center gap-2">
              The Shift from Static Assets to Generative Systems
            </h2>
            <p className="mb-6 text-zinc-300 font-normal leading-[1.8]">
              Brands are no longer static collections of logos, fonts, and fixed color swatches. Instead, an AI-native brand is a living system — capable of adapting across personal interfaces, contextual notifications, and real-time interaction flows while maintaining strict identity coherence.
            </p>

            <div className="my-8 border-l-2 border-violet-500 bg-gradient-to-r from-violet-950/20 to-transparent p-6 rounded-r-2xl text-lg sm:text-xl font-medium text-violet-200 italic">
              "Design for the API layer first. When your brand system is encoded into design tokens and component libraries, deploying AI agents and personalized user journeys becomes seamless rather than an architectural redesign."
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-12 mb-4 flex items-center gap-2">
              Measuring What Actually Converts
            </h2>
            <p className="mb-6 text-zinc-300 font-normal leading-[1.8]">
              Performance is no longer just about top-of-funnel click-through rates. With intelligent systems, we can instrument granular micro-interactions, predict user drop-offs, and dynamically adjust product flows to optimize for lifetime retention and enterprise trust.
            </p>

            <ul className="my-6 space-y-2.5 pl-2">
              <li className="flex items-start gap-3 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2.5 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                <span>Define interaction metrics that signal high intent early in the session.</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2.5 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                <span>Implement component-level tracing to find UX bottlenecks.</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2.5 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                <span>Connect quantitative drop-offs to qualitative heatmaps.</span>
              </li>
            </ul>

            <div className="my-6 rounded-2xl bg-[#0B0813]/90 border border-white/10 p-5 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto shadow-inner">
              <pre>{`// Example: Tracking micro-interactions in a Next.js component
export function TrackedButton({ children, actionId }) {
  const handleClick = async () => {
    await telemetry.track('button_click', { action: actionId });
  };
  return <button onClick={handleClick}>{children}</button>;
}`}</pre>
            </div>
          </div>
        )}

        {/* Footer info & Share block */}
        <div className="max-w-3xl mx-auto mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-white">Share this insight:</span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-md text-xs font-mono text-zinc-400 bg-white/[0.04] border border-white/10 hover:border-violet-500/40 hover:text-white transition-all cursor-pointer">Copy Link</button>
              <button className="px-3 py-1.5 rounded-md text-xs font-mono text-zinc-400 bg-white/[0.04] border border-white/10 hover:border-violet-500/40 hover:text-white transition-all cursor-pointer">Twitter</button>
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
