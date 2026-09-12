import React from "react";
import Link from "next/link";
import { Brain, PenTool, Code2, TrendingUp, Zap, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SERVICES_DATA } from "@/data/siteData";

export const WhatWeDo: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Brain":
        return <Brain className="w-6 h-6 text-[#B896FF]" />;
      case "PenTool":
        return <PenTool className="w-6 h-6 text-[#B896FF]" />;
      case "Code2":
        return <Code2 className="w-6 h-6 text-cyan-300" />;
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6 text-amber-300" />;
      case "Zap":
        return <Zap className="w-6 h-6 text-[#B896FF]" />;
      default:
        return <Brain className="w-6 h-6 text-[#B896FF]" />;
    }
  };

  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-6 relative">
      {/* Ambient baseline glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#1E085A]/30 via-transparent to-transparent pointer-events-none" />

      <SectionHeader
        eyebrow="WHAT WE DO"
        title="End-to-end capabilities to build what's next."
        linkText="VIEW ALL SERVICES"
        linkHref="/services"
      />

      {/* 5-Column Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {SERVICES_DATA.map((service, index) => (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="group p-6 rounded-2xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/35 shadow-2xl shadow-black/50 hover:shadow-[#1E085A]/40 transition-all duration-300 flex flex-col justify-between hover:bg-[#131422] hover:-translate-y-1 select-none"
          >
            <div>
              {/* Icon box */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-[#1E085A]/40 mb-6 transition-all duration-300 group-hover:scale-110 group-hover:border-[#7042FF]/50 shadow-[0_0_20px_rgba(112,66,255,0.15)]">
                {getIcon(service.icon)}
              </div>

              {/* Tagline */}
              <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase mb-1.5 block text-[#B896FF]">
                {service.tagline}
              </span>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-[#B896FF] transition-colors tracking-[-0.01em] [word-spacing:0.08em]">
                {service.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-zinc-300 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Bottom Subtle line */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-medium text-zinc-400 group-hover:text-white transition-colors">
              <span>Explore {service.name}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 text-[#B896FF] transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
