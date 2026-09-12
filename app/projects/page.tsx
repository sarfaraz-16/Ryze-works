"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FEATURED_PROJECTS } from "@/data/siteData";
import { Search, ArrowRight, Filter } from "lucide-react";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("ALL");

  const industries = ["ALL", "Healthcare", "E-commerce", "Mobility", "Fintech"];

  const filteredProjects = FEATURED_PROJECTS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry =
      selectedIndustry === "ALL" || p.industry.toLowerCase() === selectedIndustry.toLowerCase();
    return matchesSearch && matchesIndustry;
  });

  return (
    <main className="min-h-screen bg-[#07070b] text-white">
      <Navbar />

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40 text-purple-300 text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            FEATURED WORK & CASE ARCHIVE
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Selected projects that created real impact.
          </h1>
          <p className="text-base text-white/60 leading-relaxed">
            Explore our verified client outcomes across hardware diagnostics, high-growth consumer e-commerce, urban EV fleets, and fintech platforms.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-12 p-2 rounded-2xl bg-[#0d0e1a] border border-white/[0.08]">
          {/* Industry Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  selectedIndustry === ind
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex items-center min-w-[240px] px-3">
            <Search className="w-4 h-4 text-white/40 absolute left-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-[#141524] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/60"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group rounded-2xl bg-[#0c0d16]/80 border border-white/[0.08] hover:border-purple-500/40 p-6 transition-all duration-300 flex flex-col justify-between hover:bg-[#111320]"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold tracking-wider uppercase text-purple-400 mb-2">
                  <span>{project.industry}</span>
                  <span className="text-white/30">VERIFIED CLIENT</span>
                </div>
                <h3 className="text-xl font-extrabold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-white/50 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-white/[0.04] text-[10px] text-white/70 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-white/70 group-hover:text-purple-300 transition-colors">
                <span>View Full Project Scope</span>
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
