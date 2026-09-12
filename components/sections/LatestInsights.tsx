import React from "react";
import Link from "next/link";
import { Sparkles, Rocket, Cpu, Mountain } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ARTICLES_DATA } from "@/data/siteData";

export const LatestInsights: React.FC = () => {
  const renderInsightVisual = (id: string) => {
    switch (id) {
      case "art-branding-ai":
        return (
          <div className="w-full h-40 bg-gradient-to-br from-purple-950 via-[#150e28] to-[#0a0715] rounded-xl overflow-hidden relative flex items-center justify-center p-4">
            {/* Luminous purple fluid ribbon effect */}
            <div className="w-24 h-24 rounded-full border-4 border-purple-500/40 transform rotate-45 animate-orb-spin blur-[0.5px]" />
            <div className="absolute w-32 h-16 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-full blur-md transform -rotate-12" />
            <div className="absolute inset-0 bg-radial from-transparent to-black/60" />
          </div>
        );
      case "art-growth-2024":
        return (
          <div className="w-full h-40 bg-gradient-to-br from-amber-950/70 via-[#221008] to-[#0d0703] rounded-xl overflow-hidden relative flex items-center justify-center p-4">
            {/* Rocket launch graphic */}
            <div className="w-12 h-24 flex flex-col items-center justify-center relative">
              <Rocket className="w-10 h-10 text-amber-400 transform -rotate-45" />
              <div className="w-3 h-8 bg-gradient-to-b from-amber-400 via-orange-500 to-transparent rounded-full blur-[2px] mt-1 animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-radial from-transparent to-black/60" />
          </div>
        );
      case "art-ai-products":
        return (
          <div className="w-full h-40 bg-gradient-to-br from-blue-950 via-[#071328] to-[#040813] rounded-xl overflow-hidden relative flex items-center justify-center p-4">
            {/* AI neural chip cube */}
            <div className="w-20 h-20 rounded-2xl bg-blue-900/40 border-2 border-blue-400/50 shadow-[0_0_25px_rgba(56,189,248,0.3)] flex flex-col items-center justify-center">
              <span className="text-xl font-black text-white tracking-wider">AI</span>
              <div className="w-8 h-1 bg-cyan-400/80 rounded-full mt-1" />
            </div>
            <div className="absolute inset-0 bg-radial from-transparent to-black/60" />
          </div>
        );
      case "art-idea-to-execution":
        return (
          <div className="w-full h-40 bg-gradient-to-br from-slate-900 via-[#18202b] to-[#080c10] rounded-xl overflow-hidden relative flex items-center justify-center p-4">
            {/* Mountain summit illustration */}
            <div className="flex flex-col items-center justify-center">
              <Mountain className="w-12 h-12 text-slate-300" />
              <div className="w-16 h-1 bg-amber-400/60 rounded-full mt-1 blur-[1px]" />
            </div>
            <div className="absolute inset-0 bg-radial from-transparent to-black/60" />
          </div>
        );
      default:
        return null;
    }
  };

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case "BRANDING":
        return "bg-purple-950/60 text-purple-300 border-purple-800/40";
      case "GROWTH":
        return "bg-amber-950/60 text-amber-300 border-amber-800/40";
      case "TECHNOLOGY":
        return "bg-sky-950/60 text-sky-300 border-sky-800/40";
      case "BUSINESS":
        return "bg-slate-800/60 text-slate-300 border-slate-700/40";
      default:
        return "bg-purple-950/60 text-purple-300 border-purple-800/40";
    }
  };

  return (
    <section id="insights" className="py-24 max-w-7xl mx-auto px-6">
      <SectionHeader
        eyebrow="LATEST INSIGHTS"
        title="Ideas, research and perspectives that drive growth."
        linkText="VIEW ALL INSIGHTS"
        linkHref="#insights"
      />

      {/* 4-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ARTICLES_DATA.map((article) => (
          <div
            key={article.id}
            className="group rounded-2xl bg-[#0c0d16]/80 border border-white/[0.08] hover:border-purple-500/40 p-4 transition-all duration-300 flex flex-col justify-between hover:bg-[#111320]"
          >
            <div>
              {/* Thumbnail */}
              <div className="mb-4 overflow-hidden rounded-xl">
                {renderInsightVisual(article.id)}
              </div>

              {/* Tag & Category */}
              <div className="mb-3">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${getBadgeStyle(
                    article.category
                  )}`}
                >
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-white leading-snug mb-4 group-hover:text-purple-300 transition-colors">
                {article.title}
              </h3>
            </div>

            {/* Read time */}
            <div className="pt-3 border-t border-white/[0.05] text-[11px] text-white/40">
              {article.readTime}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
