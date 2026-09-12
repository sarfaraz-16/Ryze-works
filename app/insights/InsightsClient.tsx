"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Article } from "@/types";

interface InsightsClientProps {
  initialArticles: Article[];
}

export function InsightsClient({ initialArticles }: InsightsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = ["ALL", "BRANDING", "GROWTH", "TECHNOLOGY", "BUSINESS"];

  const filteredArticles = initialArticles.filter((art) => {
    return selectedCategory === "ALL" || art.category === selectedCategory;
  });

  return (
    <>
      {/* Category Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
              selectedCategory === cat
                ? "bg-white text-black font-semibold shadow-md shadow-white/10"
                : "border border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {filteredArticles.map((article) => (
          <Link
            key={article.id}
            href={`/insights/${article.slug}`}
            className="group rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/40 p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between shadow-2xl shadow-black/50 select-none"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-[11px] font-medium tracking-wider text-[#B896FF] uppercase mb-4">
                <span className="bg-[#1E085A]/60 border border-[#7042FF]/30 px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <Clock className="w-3 h-3 text-zinc-400" />
                  {article.readTime}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-[#B896FF] transition-colors mb-3 leading-snug tracking-[-0.01em] [word-spacing:0.08em]">
                {article.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed mb-6">
                {article.summary}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-[#B896FF] transition-colors pt-4 border-t border-white/[0.06]">
              <span>Read Full Article</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
