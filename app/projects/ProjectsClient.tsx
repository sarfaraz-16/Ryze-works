"use client";

import React, { useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Search, X, SearchX } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/types";

interface ProjectsClientProps {
  initialProjects: Project[];
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("ALL");

  const industries = ["ALL", "Healthcare", "E-commerce", "Mobility", "Fintech"];

  const filteredProjects = initialProjects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry =
      selectedIndustry === "ALL" || p.industry.toLowerCase() === selectedIndustry.toLowerCase();
    return matchesSearch && matchesIndustry;
  });

  return (
    <>
      {/* Unified Frosted Obsidian Dock Pinned Beneath Header */}
      <div className="bg-[#0B0813]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 sm:p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col md:flex-row md:items-center md:justify-between gap-3 sticky top-24 z-30 my-8">
        {/* Interactive Filter Tabs with Framer Motion Sliding Active Pill */}
        <div className="flex flex-wrap items-center gap-1.5 relative">
          {industries.map((ind) => {
            const isActive = selectedIndustry === ind;
            return (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`relative px-4 py-2 text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer select-none font-medium ${
                  isActive ? "text-white font-semibold" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-violet-600/30 border border-violet-500/50 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] -z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{ind}</span>
              </button>
            );
          })}
        </div>

        {/* Polished Search Dock with Focus Glow & Clear Trigger */}
        <div className="relative group w-full md:w-64">
          <div className="bg-white/[0.03] border border-white/10 hover:border-white/20 focus-within:border-violet-500/60 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.2)] rounded-xl px-3.5 py-2 flex items-center gap-2.5 transition-all w-full">
            <Search className="w-4 h-4 text-zinc-500 group-focus-within:text-violet-400 transition-colors shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client or discipline..."
              className="w-full bg-transparent text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="p-0.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid or High-End Obsidian Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="bg-[#0B0813]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center my-8 shadow-2xl shadow-black/60 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(139,92,246,0.15)]">
            <SearchX className="text-violet-400/80 w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No matching project case studies found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-6 leading-relaxed">
            We couldn&apos;t find any verified client outcomes matching &ldquo;{searchQuery || selectedIndustry}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSelectedIndustry("ALL");
              setSearchQuery("");
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 hover:border-violet-500/40 transition-all cursor-pointer shadow-lg"
          >
            Reset Filters &amp; Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </>
  );
}
