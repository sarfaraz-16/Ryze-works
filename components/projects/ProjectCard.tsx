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
      maxTilt={10}
      className={`group relative rounded-3xl aspect-[4/3] md:aspect-[16/10] bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 transition-all duration-300 overflow-hidden select-none h-full flex flex-col justify-end ${className}`}
    >
      {/* Soft, Brand-Specific Ambient Radial Glow in the Background */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(ellipse 85% 65% at 50% 25%, ${brandGlow} 0%, transparent 75%)`,
        }}
      />

      {/* Media Background Mockup */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl [transform:translateZ(10px)_scale(0.98)] transition-transform duration-300">
        <ProjectMockup slug={project.slug} className="w-full h-full" />
      </div>

      {/* Intrinsic Bottom-Scrim Gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0B0813]/95 via-[#0B0813]/55 to-transparent pointer-events-none rounded-3xl" />

      {/* Card Top Taxonomies */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 [transform:translateZ(24px)] transition-transform duration-300">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#B896FF] bg-[#0B0813]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 shadow-md">
          {project.industry}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 bg-emerald-950/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/30 shadow-md">
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
  );
};

export default ProjectCard;
