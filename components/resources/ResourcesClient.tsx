"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ResourceItem } from "@/data/resourcesData";
import { ArrowRight, Download, Layers, Sparkles, Filter, FileCode2 } from "lucide-react";

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
      <div className="flex flex-wrap items-center gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#7042FF] text-white shadow-lg shadow-[#7042FF]/30 font-bold"
                : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/35 p-8 flex flex-col justify-between shadow-2xl shadow-black/50 transition-all duration-300 hover:-translate-y-1 group"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="px-2.5 py-1 rounded-md bg-[#7042FF]/15 border border-[#7042FF]/30 text-[#B896FF] text-[10px] font-mono uppercase font-bold">
                  {item.category}
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  {item.format}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#B896FF] transition-colors leading-snug">
                <Link href={`/resources/${item.slug}`}>{item.title}</Link>
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-normal">
                {item.description}
              </p>

              {/* Key Highlights */}
              <div className="space-y-2 mb-6">
                {item.takeaways.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7042FF]" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-500">
                {item.difficulty} • {item.fileSize}
              </span>

              <Link
                href={`/resources/${item.slug}`}
                className="text-xs font-semibold text-white group-hover:text-[#B896FF] flex items-center gap-1.5 transition-colors"
              >
                <span>Access Toolkit</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
