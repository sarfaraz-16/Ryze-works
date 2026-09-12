import React from "react";
import Link from "next/link";
import { Sparkles, Rocket, Cpu, Mountain, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ARTICLES_DATA } from "@/data/siteData";

export const LatestInsights: React.FC = () => {
  const renderInsightVisual = (slug: string) => {
    switch (slug) {
      case "future-of-brand-building-in-ai-world":
        return (
          <div className="w-full h-44 bg-gradient-to-br from-[#1E085A] via-[#130635] to-[#080417] rounded-xl overflow-hidden relative flex items-center justify-center p-4 border border-[#7042FF]/30 shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,150,255,0.25),transparent_70%)]" />
            <div className="w-28 h-28 rounded-full border-4 border-[#B896FF]/40 transform rotate-45 animate-orb-spin blur-[0.5px] shadow-[0_0_25px_rgba(112,66,255,0.4)]" />
            <div className="absolute w-36 h-20 bg-gradient-to-r from-[#7042FF]/50 to-[#B896FF]/40 rounded-full blur-md transform -rotate-12" />
          </div>
        );
      case "growth-strategies-that-actually-work-in-2024":
        return (
          <div className="w-full h-44 bg-gradient-to-br from-[#2a1305] via-[#1a0c03] to-[#080417] rounded-xl overflow-hidden relative flex items-center justify-center p-4 border border-amber-500/30 shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.2),transparent_70%)]" />
            <div className="flex flex-col items-center justify-center relative">
              <Rocket className="w-12 h-12 text-amber-400 transform -rotate-45 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
              <div className="w-4 h-10 bg-gradient-to-b from-amber-400 via-orange-500 to-transparent rounded-full blur-[2px] mt-1 animate-pulse" />
            </div>
          </div>
        );
      case "how-ai-is-transforming-digital-products":
        return (
          <div className="w-full h-44 bg-gradient-to-br from-[#0c1b3a] via-[#071126] to-[#080417] rounded-xl overflow-hidden relative flex items-center justify-center p-4 border border-sky-500/30 shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),transparent_70%)]" />
            <div className="w-22 h-22 rounded-2xl bg-[#091b3e]/80 border-2 border-sky-400/50 shadow-[0_0_35px_rgba(56,189,248,0.35)] flex flex-col items-center justify-center">
              <span className="font-display text-2xl font-black text-white tracking-wider">AI</span>
              <div className="w-10 h-1 bg-cyan-400 rounded-full mt-1.5 shadow-[0_0_8px_#38bdf8]" />
            </div>
          </div>
        );
      case "from-idea-to-execution-for-startup-founders":
        return (
          <div className="w-full h-44 bg-gradient-to-br from-[#1a2333] via-[#0f1722] to-[#080417] rounded-xl overflow-hidden relative flex items-center justify-center p-4 border border-slate-600/30 shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(203,213,225,0.15),transparent_70%)]" />
            <div className="flex flex-col items-center justify-center">
              <Mountain className="w-14 h-14 text-slate-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
              <div className="w-20 h-1.5 bg-gradient-to-r from-amber-400/80 to-amber-200/80 rounded-full mt-2 blur-[1px]" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case "BRANDING":
        return "bg-[#1E085A]/70 text-[#B896FF] border-[#7042FF]/40";
      case "GROWTH":
        return "bg-amber-950/70 text-amber-300 border-amber-800/40";
      case "TECHNOLOGY":
        return "bg-sky-950/70 text-sky-300 border-sky-800/40";
      case "BUSINESS":
        return "bg-slate-800/70 text-slate-300 border-slate-700/40";
      default:
        return "bg-[#1E085A]/70 text-[#B896FF] border-[#7042FF]/40";
    }
  };

  return (
    <section id="insights" className="py-24 max-w-7xl mx-auto px-6 relative">
      {/* Ambient baseline glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#1E085A]/30 via-transparent to-transparent pointer-events-none" />

      <SectionHeader
        eyebrow="LATEST INSIGHTS"
        title="Ideas, research and perspectives that drive growth."
        linkText="VIEW ALL INSIGHTS"
        linkHref="/insights"
      />

      {/* 4-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ARTICLES_DATA.map((article) => (
          <Link
            key={article.id}
            href={`/insights/${article.slug}`}
            className="group rounded-2xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/35 p-4 transition-all duration-300 flex flex-col justify-between hover:bg-[#131422] hover:-translate-y-1 shadow-2xl shadow-black/50 hover:shadow-[#1E085A]/40 select-none"
          >
            <div>
              {/* Thumbnail */}
              <div className="mb-4 overflow-hidden rounded-xl">
                {renderInsightVisual(article.slug)}
              </div>

              {/* Tag & Category */}
              <div className="mb-3">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold tracking-wider uppercase border ${getBadgeStyle(
                    article.category
                  )}`}
                >
                  {article.category}
                </span>
              </div>

              {/* Title with bold underline hover effect */}
              <h3 className="text-base font-semibold text-white leading-snug mb-4 group-hover:text-[#B896FF] group-hover:underline decoration-[#7042FF] underline-offset-4 transition-all tracking-[-0.01em] [word-spacing:0.08em]">
                {article.title}
              </h3>
            </div>

            {/* Date & Read time */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
              <span>{article.publishedAt}</span>
              <span className="text-zinc-500">•</span>
              <span>{article.readTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
