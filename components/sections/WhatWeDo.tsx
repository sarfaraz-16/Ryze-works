import React from "react";
import Link from "next/link";
import {
  Video,
  Share2,
  Sparkles,
  PenTool,
  Users,
  TrendingUp,
  Code2,
  Clapperboard,
  Target,
  Layers,
  ArrowRight
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IconShield3D } from "@/components/ui/IconShield3D";
import { RYZE_CATALOGUE_10_SERVICES, TARGET_INDUSTRIES } from "@/data/siteData";

export const WhatWeDo: React.FC = () => {
  const getIcon = (num: string) => {
    switch (num) {
      case "01":
        return <Video className="w-6 h-6 text-[#B896FF]" />;
      case "02":
        return <Share2 className="w-6 h-6 text-cyan-300" />;
      case "03":
        return <Sparkles className="w-6 h-6 text-amber-300" />;
      case "04":
        return <PenTool className="w-6 h-6 text-[#B896FF]" />;
      case "05":
        return <Users className="w-6 h-6 text-emerald-300" />;
      case "06":
        return <TrendingUp className="w-6 h-6 text-amber-300" />;
      case "07":
        return <Code2 className="w-6 h-6 text-cyan-300" />;
      case "08":
        return <Clapperboard className="w-6 h-6 text-rose-300" />;
      case "09":
        return <Target className="w-6 h-6 text-violet-300" />;
      case "10":
        return <Layers className="w-6 h-6 text-[#B896FF]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#B896FF]" />;
    }
  };

  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-6 relative">
      {/* Ambient baseline glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#1E085A]/30 via-transparent to-transparent pointer-events-none" />

      <SectionHeader
        eyebrow="OUR SERVICES"
        title="We combine strategy, creativity, content and execution to help brands build a stronger presence, connect with their audience and grow."
        linkText="VIEW ALL SERVICES"
        linkHref="/services"
      />

      {/* 10-Service Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-16">
        {RYZE_CATALOGUE_10_SERVICES.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group p-6 rounded-2xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/35 shadow-2xl shadow-black/50 hover:shadow-[#1E085A]/40 transition-all duration-300 flex flex-col justify-between hover:bg-[#131422] hover:-translate-y-1 select-none"
          >
            <div>
              {/* 3D Micro-Interaction Shield Token */}
              <IconShield3D icon={getIcon(service.num)} />

              {/* Number & Category */}
              <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase mb-1.5 text-zinc-400">
                <span className="text-[#B896FF]">{service.num}</span>
                <span>{service.category}</span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-[#B896FF] transition-colors tracking-[-0.01em]">
                {service.name}
              </h3>

              {/* Tagline */}
              <p className="text-xs text-violet-300/90 font-medium mb-2">
                {service.tagline}
              </p>

              {/* Description */}
              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                {service.description}
              </p>
            </div>

            {/* Bottom Subtle Link */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-medium text-zinc-400 group-hover:text-white transition-colors">
              <span>Explore Capability</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 text-[#B896FF] transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Target Industries Section */}
      <div className="rounded-3xl bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 p-8 sm:p-10">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-3">
            TARGET SECTORS
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Built for Ambitious Brands Across Industries
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            We partner with startups, entrepreneurs, and established brands looking to strengthen market positioning, improve brand perception, and generate consistent business opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TARGET_INDUSTRIES.map((ind) => (
            <div
              key={ind.name}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/30 transition-colors"
            >
              <h4 className="text-sm font-bold text-white mb-1">{ind.name}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
