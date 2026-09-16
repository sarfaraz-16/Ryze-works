"use client";

import React from "react";
import Link from "next/link";
import { IconShield3D } from "@/components/ui/IconShield3D";
import { useTilt3D } from "@/hooks/useTilt3D";
import {
  Brain,
  PenTool,
  Code2,
  TrendingUp,
  Zap,
  ArrowRight,
  Layers,
  LucideIcon,
} from "lucide-react";

export interface ServiceCapabilityItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  group?: string;
  icon?: string;
  description: string;
  deliverables: string[];
}

interface ServiceCapabilityCardProps {
  service: ServiceCapabilityItem;
  index: number;
}

// Discipline-specific ambient radial glows for upper-right card positioning
const DISCIPLINE_GLOWS: Record<string, string> = {
  strategy: "rgba(168, 85, 247, 0.22)",        // Violet
  "brand-creative": "rgba(236, 72, 153, 0.20)", // Magenta / Rose
  technology: "rgba(6, 182, 212, 0.20)",       // Electric Cyan / Blue
  marketing: "rgba(16, 185, 129, 0.20)",        // Emerald / Growth Green
  experiences: "rgba(245, 158, 11, 0.20)",      // Radiant Amber / Gold
};

// Sub-descriptions for high-contrast deliverable taxonomy
const DELIVERABLE_SUBTEXT: Record<string, string> = {
  // Strategy
  "Brand Positioning & Architecture": "Market clarity & defensible wedge",
  "Market & User Research": "Qualitative insights & telemetry",
  "GTM Strategy": "Multi-channel traction blueprint",
  "AI Opportunity Mapping": "High-impact workflow synthesis",

  // Brand + Creative
  "Visual Identity Systems": "Obsidian typography & brand world",
  "Design Systems & Guidelines": "Scalable tokenized UI libraries",
  "High-Impact Creative Content": "Direction, 3D assets & narrative",
  "Brand Collateral & Motion": "Dynamic interactions & brand films",

  // Technology
  "Next.js & React Web Apps": "High-performance edge architectures",
  "Fullstack Supabase & Postgres": "Row-level security & real-time sync",
  "Custom AI Assistants & RAG": "Domain-tuned vector pipelines",
  "Mobile Applications": "Cross-platform mobile runtimes",

  // Marketing
  "Paid Performance Campaigns": "Full-funnel acquisition loops",
  "Conversion Rate Optimization": "Scientific testing & lift models",
  "Funnel & Data Analytics": "Attribution & conversion telemetry",
  "Content & SEO Distribution": "Organic engine & authority scaling",

  // Experiences
  "Interactive Web Experiences": "WebGL, Three.js & micro-interactions",
  "Product Launch Activations": "Keynote sites & announcement hype",
  "Immersive 3D & WebGL": "Custom shaders & spatial elements",
  "Community Engagement Programs": "Advocate networks & retention loops",
};

const ICON_MAP: Record<string, LucideIcon> = {
  Brain,
  PenTool,
  Code2,
  TrendingUp,
  Zap,
};

export function ServiceCapabilityCard({ service, index }: ServiceCapabilityCardProps) {
  const glowColor =
    DISCIPLINE_GLOWS[service.slug.toLowerCase()] || "rgba(168, 85, 247, 0.20)";

  const IconComponent = ICON_MAP[service.icon || ""] || Brain;

  const {
    cardRef,
    cardStyle,
    glareStyle,
    onPointerEnter,
    onPointerMove,
    onPointerLeave,
  } = useTilt3D({
    maxTilt: 6,
    scale: 1.01,
    perspective: 1200,
    speed: 400,
  });

  return (
    <div
      ref={cardRef}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={cardStyle}
      className="group relative rounded-3xl bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 p-8 sm:p-10 transition-all duration-300 overflow-hidden shadow-2xl shadow-black/60 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
    >
      {/* Dynamic 3D Glare / Sheen Overlay */}
      <div
        className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none z-30"
        style={glareStyle}
      />

      {/* Discipline-Specific Ambient Radial Glow in Upper-Right Corner */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 88% 12%, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Left Column (cols 1-5): Numerical indicator, title, scope summary, obsidian action CTA */}
      <div className="lg:col-span-5 flex flex-col justify-between relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <IconShield3D
              icon={<IconComponent className="w-6 h-6 text-[#B896FF]" />}
              className="mb-0 shrink-0"
            />
            <span className="font-mono text-[11px] sm:text-[12px] font-medium tracking-wider uppercase text-[#B896FF]">
              0{index + 1} // {service.tagline}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-violet-200 transition-colors mb-3 leading-snug">
            {service.name}
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed mb-8">
            {service.description}
          </p>
        </div>

        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider bg-violet-600/20 border border-violet-500/40 text-violet-200 hover:bg-violet-600 hover:text-white transition-all shadow-[0_0_15px_rgba(139,92,246,0.2)] group/btn w-fit"
        >
          <span>View {service.name} Framework</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Right Column (cols 7-12): 2x2 grid of frosted glass telemetry chips */}
      <div className="lg:col-span-7 bg-black/30 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/5 relative z-10">
        <div className="text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-violet-400" />
          <span>CORE DELIVERABLES &amp; CAPABILITIES</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {service.deliverables.map((item) => {
            const subtext = DELIVERABLE_SUBTEXT[item] || "Engineered for scale & velocity";
            return (
              <div
                key={item}
                className="bg-white/[0.04] border border-white/10 hover:border-violet-500/30 hover:bg-violet-950/20 rounded-xl p-4 transition-all group/chip flex items-start gap-3 shadow-sm"
              >
                {/* Luminous Glowing Micro-Bullet */}
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 group-hover/chip:bg-violet-300 group-hover/chip:shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all shrink-0 mt-1.5" />

                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-white group-hover/chip:text-violet-200 transition-colors leading-snug block">
                    {item}
                  </span>
                  <span className="text-[11px] text-zinc-400 leading-normal block mt-0.5 font-normal">
                    {subtext}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
