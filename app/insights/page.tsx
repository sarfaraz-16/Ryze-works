"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ARTICLES_DATA } from "@/data/siteData";
import { ArrowRight, BookOpen } from "lucide-react";

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = ["ALL", "BRANDING", "GROWTH", "TECHNOLOGY", "BUSINESS"];

  const filteredArticles = ARTICLES_DATA.filter((art) => {
    return selectedCategory === "ALL" || art.category === selectedCategory;
  });

  return (
    <main className="min-h-screen bg-[#07070b] text-white">
      <Navbar />

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40 text-purple-300 text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            EDITORIAL & PERSPECTIVES
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Ideas, research and perspectives that drive growth.
          </h1>
          <p className="text-base text-white/60 leading-relaxed">
            Thought leadership, technical architectural teardowns, and actionable agency playbooks for founders building in the AI era.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08]"
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
              className="group rounded-3xl bg-[#0c0d16]/80 border border-white/[0.08] hover:border-purple-500/40 p-8 transition-all duration-300 flex flex-col justify-between hover:bg-[#111320]"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-purple-400 uppercase tracking-wider mb-4">
                  <span className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40">
                    {article.category}
                  </span>
                  <span className="text-white/40">{article.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-white/70 group-hover:text-purple-300 transition-colors">
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
