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
      className="relative group rounded-3xl bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 overflow-hidden transition-all duration-300 flex flex-col shadow-2xl shadow-black/50 select-none h-full"
    >
      <div className="absolute inset-0 z-0 rounded-3xl" style={tilt.glareStyle} />
      
      <Link href={`/insights/${article.slug}`} className="flex flex-col h-full relative z-10 outline-none">
        {/* Upper Media Theater */}
        <div className="h-[180px] sm:h-[200px] w-full relative overflow-hidden border-b border-white/10 bg-[#080417]">
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
            <span className="px-3 py-1 rounded-lg text-[10px] font-mono tracking-wider font-semibold uppercase bg-black/60 backdrop-blur-md border border-white/20 text-zinc-100 shadow-md">
              {article.category}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono text-zinc-300 bg-black/50 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 sm:p-10 flex flex-col flex-grow justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-violet-200 transition-colors mb-3 leading-snug">
              {article.title}
            </h2>
            <p className="text-sm text-zinc-300 line-clamp-2 leading-relaxed mb-6">
              {article.summary}
            </p>
          </div>

          <div className="mt-auto pt-6 border-t border-white/[0.06] relative">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-violet-200 transition-colors">
              <span>Read Full Article</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            {/* Expanding violet glow underline on hover */}
            <div className="absolute bottom-0 left-0 h-[2px] bg-violet-500/50 w-0 group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
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
      {/* Unified Frosted Obsidian Dock */}
      <div className="bg-[#0B0813]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] inline-flex flex-wrap items-center gap-1.5 sticky top-24 z-30 mb-12">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-4 py-2 text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer select-none font-medium ${
                isActive ? "text-white font-semibold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeInsightPill"
                  className="absolute inset-0 bg-violet-600/30 border border-violet-500/50 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] -z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
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
