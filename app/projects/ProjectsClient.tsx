"use client";

import React, { useState } from "react";
import { ProjectMockup } from "@/components/ui/ProjectMockup";
import { TiltCard3D } from "@/components/ui/TiltCard3D";
import { Search, ArrowRight } from "lucide-react";
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
      {/* Sticky Category Filter Bar Pinned Beneath Header */}
      <div className="sticky top-20 z-30 py-3.5 px-4 my-8 rounded-2xl bg-[#080417]/85 backdrop-blur-md border border-white/[0.08] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Industry Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                selectedIndustry === ind
                  ? "bg-white text-black font-semibold shadow-md shadow-white/10"
                  : "border border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {ind.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative flex items-center min-w-[240px]">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client or discipline..."
            className="w-full bg-white/[0.04] border border-white/15 focus:border-[#B896FF] focus:ring-1 focus:ring-[#B896FF] rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Edge-to-Edge Media-Dominant Grid with 3D Perspective Tilt & Parallax */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {filteredProjects.map((project) => (
          <TiltCard3D
            key={project.id}
            href={`/projects/${project.slug}`}
            ariaLabel={`View project: ${project.title}`}
            className="group relative rounded-3xl aspect-[4/3] md:aspect-[16/10] border border-white/[0.08] hover:border-[#B896FF]/40 shadow-2xl shadow-black/60 bg-[#0d0e17]/85 flex flex-col justify-end select-none h-full"
          >
            {/* Media Background Mockup */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl [transform:translateZ(10px)_scale(0.98)] transition-transform duration-300">
              <ProjectMockup slug={project.slug} className="w-full h-full" />
            </div>

            {/* Intrinsic Bottom-Scrim Gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#080417]/95 via-[#080417]/50 to-transparent pointer-events-none rounded-3xl" />

            {/* Card Top Taxonomies */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 [transform:translateZ(24px)] transition-transform duration-300">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#B896FF] bg-[#080417]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 shadow-md">
                {project.industry}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/30">
                VERIFIED OUTCOME
              </span>
            </div>

            {/* Card Bottom Scrim Details */}
            <div className="relative z-20 p-6 sm:p-8 flex flex-col justify-end [transform:translateZ(28px)] transition-transform duration-300">
              <div className="font-mono text-[11px] font-medium tracking-wider uppercase text-[#B896FF] mb-1">
                {project.client} // {project.category}
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-[-0.01em] [word-spacing:0.08em] group-hover:text-[#B896FF] transition-colors mb-2 leading-snug">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-normal line-clamp-2 mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-zinc-300 bg-white/[0.06] border border-white/10 px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-[#B896FF] transition-colors">
                <span>View Full Project Case</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </TiltCard3D>
        ))}
      </div>
    </>
  );
}
