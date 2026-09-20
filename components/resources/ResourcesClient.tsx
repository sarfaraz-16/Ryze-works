"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ResourceItem } from "@/data/resourcesData";
import { ArrowRight, Download, Layers, Sparkles, Filter, FileCode2 } from "lucide-react";
import { TiltCard3D } from "@/components/ui/TiltCard3D";

interface Props {
  resources: ResourceItem[];
}

export function ResourcesClient({ resources }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = ["ALL", "STRATEGY", "DESIGN", "TECHNOLOGY", "GROWTH"];

  const filtered =
    selectedCategory === "ALL"
      ? resources
      : resources.filter((r) => r.category === selectedCategory);

  return (
    <div className="space-y-12">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={
              selectedCategory === cat
                ? "px-4 py-2 rounded-xl text-xs font-mono text-white bg-violet-600/25 border border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
                : "px-4 py-2 rounded-xl text-xs font-mono text-zinc-400 bg-white/[0.03] border border-white/10 hover:border-white/20 hover:text-zinc-200 transition-all cursor-pointer"
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((item) => (
          <TiltCard3D
            key={item.id}
            className="bg-[#0B0813]/75 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-7 sm:p-8 transition-all duration-300 relative group overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/[0.07] via-transparent to-cyan-500/[0.04] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
            <div className="relative z-10">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="font-mono text-[11px] uppercase tracking-wider text-violet-300 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-md">
                  {item.category}
                </span>
                <span className="font-mono text-[11px] text-zinc-400 bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-md">
                  {item.format}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-violet-200 transition-colors tracking-tight mt-4 mb-3">
                <Link href={`/resources/${item.slug}`}>{item.title}</Link>
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed font-sans mb-5">
                {item.description}
              </p>

              {/* Key Highlights */}
              <ul className="mb-6">
                {item.takeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-mono text-zinc-200 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shadow-[0_0_8px_rgba(34,211,238,0.6)] shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto relative z-10">
              <span className="font-mono text-xs text-zinc-400">
                {item.difficulty} • {item.fileSize}
              </span>

              <Link
                href={`/resources/${item.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-violet-600/20 hover:bg-violet-600 border border-violet-500/30 hover:border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
              >
                <span>Access Toolkit →</span>
              </Link>
            </div>
          </TiltCard3D>
        ))}
      </div>
    </div>
  );
}
