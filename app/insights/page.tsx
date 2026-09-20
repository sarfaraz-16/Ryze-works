import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { ARTICLES_DATA } from "@/data/siteData";
import { createClient } from "@/lib/supabase/server";
import { InsightsClient } from "./InsightsClient";
import { Sparkles } from "lucide-react";
import { Article } from "@/types";

export const revalidate = 3600;

export const metadata = {
  title: "Insights, Research & Perspectives | RYZE WORKS",
  description: "Ideas, research and perspectives driving growth for modern brands building in the AI era."
};

export default async function InsightsPage() {
  let articles: Article[] = ARTICLES_DATA;

  try {
    const supabase = await createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          id,
          slug,
          title,
          category,
          read_time,
          summary,
          cover_image,
          published_at
        `)
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (!error && data && data.length > 0) {
        articles = data.map((a: any) => ({
          id: a.id,
          slug: a.slug,
          title: a.title,
          category: a.category,
          readTime: a.read_time || "5 min read",
          summary: a.summary,
          coverImage: a.cover_image,
          publishedAt: a.published_at || new Date().toISOString()
        }));
      }
    }
  } catch (err) {
    console.warn("Supabase insights fetch fallback:", err);
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#030014]/40 text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-3 font-medium flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
            EDITORIAL &amp; PERSPECTIVES
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] [word-spacing:0.1em] text-white mb-6">
            Ideas, research and perspectives that drive growth.
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-2xl">
            Thought leadership, technical architectural teardowns, and actionable agency playbooks for founders building in the AI era.
          </p>
        </div>

        {/* Client Interactive Filter & Grid */}
        <InsightsClient initialArticles={articles} />
      </section>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
