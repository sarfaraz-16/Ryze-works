"use client";

import React from "react";
import { Project } from "@/types";
import { ProjectMockup } from "@/components/ui/ProjectMockup";
import { TiltCard3D } from "@/components/ui/TiltCard3D";
import { ArrowRight } from "lucide-react";

export interface ProjectCardProps {
  project: Project;
  className?: string;
}

// Brand-specific ambient radial glows
const BRAND_GLOWS: Record<string, string> = {
  nostic: "rgba(168, 85, 247, 0.12)",   // Deep silver / violet glow
  zepto: "rgba(147, 51, 234, 0.18)",    // Electric purple / berry glow
  yulu: "rgba(6, 182, 212, 0.14)",      // Deep cyan / emerald glow
  cred: "rgba(245, 158, 11, 0.10)",     // Subtle obsidian / gold glow
  simpl: "rgba(16, 185, 129, 0.14)",    // Mint / emerald green glow
  razorpay: "rgba(59, 130, 246, 0.14)", // Royal blue / indigo glow
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = "" }) => {
  const brandGlow = BRAND_GLOWS[project.slug.toLowerCase()] || "rgba(168, 85, 247, 0.12)";

  return (
    <TiltCard3D
      href={`/projects/${project.slug}`}
      ariaLabel={`View project: ${project.title}`}
      perspective={1000}
      scale={1.02}
      maxTilt={8}
      className={`group relative rounded-3xl bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 transition-all duration-300 overflow-hidden select-none h-full flex flex-col justify-between ${className}`}
    >
      {/* Soft, Brand-Specific Ambient Radial Glow in the Background */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(ellipse 85% 65% at 50% 20%, ${brandGlow} 0%, transparent 75%)`,
        }}
      />

      {/* 1. Upper Media Theater (approx 55-60% height: 250px–280px) with Dedicated Dark-Glass Frame */}
      <div className="relative w-full h-[250px] sm:h-[280px] bg-black/30 border-b border-white/5 overflow-hidden flex items-center justify-center z-10 [transform:translateZ(12px)] transition-transform duration-300">
        {/* Subtle Radial Spotlight Gradient Focused Directly Behind Device */}
        <div
          className="absolute inset-0 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${brandGlow.replace('0.12', '0.25').replace('0.14', '0.28').replace('0.18', '0.32').replace('0.10', '0.22')} 0%, transparent 70%)`,
          }}
        />

        {/* Scaled Device Mockup with Frame Bleed and Hover Elevation */}
        <ProjectMockup slug={project.slug} className="w-full h-full" />

        {/* Card Top Taxonomies Pinned Inside Media Theater */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none [transform:translateZ(20px)]">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#B896FF] bg-[#0B0813]/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 shadow-md">
            {project.industry}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/30 shadow-md">
            VERIFIED OUTCOME
          </span>
        </div>
      </div>

      {/* 2. Lower Narrative Details Section */}
      <div className="relative z-20 p-6 sm:p-7 flex-1 flex flex-col justify-between [transform:translateZ(24px)] transition-transform duration-300">
        <div>
          <div className="font-mono text-[11px] font-medium tracking-wider uppercase text-[#B896FF] mb-1.5 flex items-center gap-2">
            <span>{project.client}</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-400">{project.category}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-violet-200 transition-colors mb-2 leading-snug">
            {project.title}
          </h3>
          <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed font-sans mb-4">
            {project.description}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium tracking-wide bg-white/[0.05] border border-white/10 text-zinc-200 group-hover:border-violet-500/30 group-hover:bg-violet-950/20 transition-all font-mono"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#B896FF]/60 group-hover:bg-[#B896FF] transition-colors shrink-0" />
                <span>{tag}</span>
              </span>
            ))}
          </div>

          <div className="pt-2">
            <div className="inline-flex flex-col">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-zinc-300 group-hover:text-violet-300 transition-colors">
                <span>View Full Project Case</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300 ease-out" />
              </div>
              <div className="w-0 group-hover:w-full transition-all duration-300 h-px bg-gradient-to-r from-violet-500 to-transparent mt-1" />
            </div>
          </div>
        </div>
      </div>
    </TiltCard3D>
  );
};

export default ProjectCard;
