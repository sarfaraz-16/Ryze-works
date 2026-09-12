import React from "react";
import { Brain, PenTool, Code2, TrendingUp, Zap } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SERVICES_DATA } from "@/data/siteData";

export const WhatWeDo: React.FC = () => {
  const getIcon = (iconName: string, colorClass: string) => {
    switch (iconName) {
      case "Brain":
        return <Brain className={`w-6 h-6 ${colorClass}`} />;
      case "PenTool":
        return <PenTool className={`w-6 h-6 ${colorClass}`} />;
      case "Code2":
        return <Code2 className={`w-6 h-6 ${colorClass}`} />;
      case "TrendingUp":
        return <TrendingUp className={`w-6 h-6 ${colorClass}`} />;
      case "Zap":
        return <Zap className={`w-6 h-6 ${colorClass}`} />;
      default:
        return <Brain className={`w-6 h-6 ${colorClass}`} />;
    }
  };

  const getStyleConfigs = (index: number) => {
    switch (index) {
      case 0:
        return {
          textColor: "text-purple-400",
          iconBg: "bg-purple-950/40 border-purple-800/30 shadow-[0_0_20px_rgba(168,85,247,0.15)]",
          iconColor: "text-purple-400"
        };
      case 1:
        return {
          textColor: "text-pink-400",
          iconBg: "bg-pink-950/40 border-pink-800/30 shadow-[0_0_20px_rgba(236,72,153,0.15)]",
          iconColor: "text-pink-400"
        };
      case 2:
        return {
          textColor: "text-cyan-400",
          iconBg: "bg-cyan-950/40 border-cyan-800/30 shadow-[0_0_20px_rgba(56,189,248,0.15)]",
          iconColor: "text-cyan-400"
        };
      case 3:
        return {
          textColor: "text-amber-400",
          iconBg: "bg-amber-950/40 border-amber-800/30 shadow-[0_0_20px_rgba(245,158,11,0.15)]",
          iconColor: "text-amber-400"
        };
      case 4:
        return {
          textColor: "text-violet-400",
          iconBg: "bg-indigo-950/40 border-indigo-800/30 shadow-[0_0_20px_rgba(99,102,241,0.15)]",
          iconColor: "text-violet-400"
        };
      default:
        return {
          textColor: "text-purple-400",
          iconBg: "bg-purple-950/40 border-purple-800/30",
          iconColor: "text-purple-400"
        };
    }
  };

  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-6">
      <SectionHeader
        eyebrow="WHAT WE DO"
        title="End-to-end capabilities to build what's next."
        linkText="VIEW ALL SERVICES"
        linkHref="#services"
      />

      {/* 5-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {SERVICES_DATA.map((service, index) => {
          const config = getStyleConfigs(index);
          return (
            <div
              key={service.id}
              className="group p-6 rounded-2xl bg-[#0c0d16]/80 border border-white/[0.07] hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between hover:bg-[#111320]"
            >
              <div>
                {/* Icon box */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-6 transition-transform duration-300 group-hover:scale-110 ${config.iconBg}`}
                >
                  {getIcon(service.icon, config.iconColor)}
                </div>

                {/* Tagline */}
                <span
                  className={`text-[11px] font-bold tracking-[0.2em] uppercase mb-1.5 block ${config.textColor}`}
                >
                  {service.tagline}
                </span>

                {/* Title */}
                <h3 className="text-base font-bold text-white mb-3">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                  {service.description}
                </p>
              </div>

              {/* Bottom Subtle line */}
              <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center text-[11px] text-white/30 group-hover:text-white/60 transition-colors">
                <span>Explore {service.name}</span>
                <span className="ml-auto group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
