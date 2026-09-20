"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Article } from "@/types";
import { useTilt3D } from "@/hooks/useTilt3D";

interface InsightsClientProps {
  initialArticles: Article[];
}

function CategoryVisual({ category }: { category: string }) {
  switch (category) {
    case "TECHNOLOGY":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,60 Q25,35 50,60 T100,60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-500" />
          <path d="M0,80 Q25,55 50,80 T100,80" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-violet-500" />
          <circle cx="25" cy="47.5" r="1.5" fill="currentColor" className="text-cyan-400" />
          <circle cx="75" cy="72.5" r="1.5" fill="currentColor" className="text-violet-400" />
          <circle cx="50" cy="60" r="2" fill="currentColor" className="text-cyan-300" />
        </svg>
      );
    case "BUSINESS":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="currentColor" strokeWidth="1" className="text-violet-500" />
          <polygon points="50,20 80,35 50,50 20,35" fill="currentColor" className="text-violet-500/10" />
          <polyline points="20,65 50,50 80,65" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-violet-400" />
          <line x1="50" y1="50" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" className="text-violet-400" />
        </svg>
      );
    case "GROWTH":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M10,80 Q30,80 40,50 T70,30 T90,20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500" />
          <circle cx="90" cy="20" r="2.5" fill="currentColor" className="text-emerald-400" />
          <rect x="20" y="60" width="8" height="20" fill="currentColor" className="text-emerald-500/20" />
          <rect x="40" y="40" width="8" height="40" fill="currentColor" className="text-emerald-500/30" />
          <rect x="60" y="25" width="8" height="55" fill="currentColor" className="text-emerald-500/40" />
        </svg>
      );
    case "BRANDING":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-pink-500" strokeDasharray="4 2" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" className="text-pink-400" />
          <circle cx="50" cy="50" r="5" fill="currentColor" className="text-pink-300" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-pink-500" />
        </svg>
      );
    default:
      return (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
      );
  }
}

function ArticleCard({ article }: { article: Article }) {
  const tilt = useTilt3D();

  const gradientMap: Record<string, string> = {
    TECHNOLOGY: "from-cyan-500/20 to-transparent",
    BUSINESS: "from-violet-500/20 to-transparent",
    GROWTH: "from-emerald-500/20 to-transparent",
    BRANDING: "from-pink-500/20 to-transparent",
    ALL: "from-white/10 to-transparent",
  };
  
  const bgGradient = gradientMap[article.category] || "from-white/10 to-transparent";

  return (
    <div
      ref={tilt.cardRef}
      onPointerEnter={tilt.onPointerEnter}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      style={tilt.cardStyle}
      className="bg-[#0B0813]/75 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-6 sm:p-7 transition-all duration-300 relative group overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between h-full select-none"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/[0.07] via-transparent to-cyan-500/[0.04] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
      <div className="absolute inset-0 z-0 rounded-3xl pointer-events-none" style={tilt.glareStyle} />
      
      <Link href={`/insights/${article.slug}`} className="flex flex-col h-full relative z-10 outline-none">
        {/* Upper Media Theater */}
        <div className="w-full h-44 rounded-2xl overflow-hidden bg-black/40 border border-white/10 mb-6 relative flex items-center justify-center group-hover:border-violet-500/30 transition-all">
          {/* Base glow */}
          <div className={`absolute inset-0 bg-gradient-to-b ${bgGradient} opacity-50 mix-blend-screen group-hover:opacity-100 transition-opacity duration-500`} />
          
          {/* Subtle dotted grid overlay */}
          <div 
            className="absolute inset-0 opacity-25" 
            style={{ 
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)', 
              backgroundSize: '16px 16px' 
            }} 
          />
          
          {/* Visual Centerpiece */}
          <CategoryVisual category={article.category} />
          
          <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('/noise.png')", backgroundSize: "100px" }} />
          
          {/* Category chip and Read-Time badge pinned neatly to top corners over frosted glass */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <span className="font-mono text-[11px] uppercase tracking-wider text-violet-300 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-md">
              {article.category}
            </span>
            <span className="font-mono text-[11px] text-zinc-400 bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-md flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col flex-grow justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-violet-200 transition-colors tracking-tight mb-3">
              {article.title}
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans mb-6 line-clamp-3">
              {article.summary}
            </p>
          </div>

          <div className="mt-auto">
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-violet-600/20 hover:bg-violet-600 border border-violet-500/30 hover:border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]">
              <span>Read Full Article →</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function InsightsClient({ initialArticles }: InsightsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = ["ALL", "BRANDING", "GROWTH", "TECHNOLOGY", "BUSINESS"];

  const filteredArticles = initialArticles.filter((art) => {
    return selectedCategory === "ALL" || art.category === selectedCategory;
  });

  return (
    <>
      {/* Interactive Filter Dock */}
      <div className="flex flex-wrap items-center gap-2 mb-10 sticky top-24 z-30">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={
                isActive
                  ? "px-4 py-2 rounded-xl text-xs font-mono text-white bg-violet-600/25 border border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
                  : "px-4 py-2 rounded-xl text-xs font-mono text-zinc-400 bg-white/[0.03] border border-white/10 hover:border-white/20 hover:text-zinc-200 transition-all cursor-pointer"
              }
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </>
  );
}
