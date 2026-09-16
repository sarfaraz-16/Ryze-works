"use client";

import React, { useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Search } from "lucide-react";
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
      <div className="sticky top-20 z-30 py-3.5 px-4 my-8 rounded-2xl bg-[#0B0813]/80 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
