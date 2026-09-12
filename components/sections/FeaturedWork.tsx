import React from "react";
import Link from "next/link";
import { ArrowRight, Activity, ShoppingBag, Bike, ShieldCheck, CreditCard } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FEATURED_PROJECTS } from "@/data/siteData";

export const FeaturedWork: React.FC = () => {
  // Custom mock visual for each project to accurately reflect the screenshot graphics
  const renderProjectVisual = (id: string) => {
    switch (id) {
      case "project-nostic":
        return (
          <div className="w-full h-44 bg-gradient-to-br from-slate-200 to-slate-400 rounded-xl overflow-hidden relative flex items-center justify-center p-4">
            {/* Medical diagnostic device illustration */}
            <div className="w-28 h-28 bg-white rounded-2xl shadow-xl border border-slate-300 flex flex-col items-center justify-between p-3">
              <div className="w-full h-8 bg-sky-950 rounded-lg flex items-center justify-center">
                <span className="text-[10px] font-mono font-bold text-sky-400">98.6°F</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center">
                <Activity className="w-5 h-5 text-sky-600" />
              </div>
              <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
            </div>
            <div className="absolute top-2 left-3 text-[10px] font-bold tracking-wider text-slate-700">
              nostic
            </div>
          </div>
        );
      case "project-zepto":
        return (
          <div className="w-full h-44 bg-gradient-to-br from-purple-800 via-indigo-900 to-purple-950 rounded-xl overflow-hidden relative flex items-center justify-center p-4">
            <div className="w-24 h-36 bg-gradient-to-b from-purple-500 to-indigo-700 rounded-xl border border-purple-400/30 shadow-2xl p-2.5 flex flex-col justify-between">
              <div className="text-[9px] font-black text-amber-300 tracking-wider">
                10 MIN GROCERY
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center self-center">
                <ShoppingBag className="w-5 h-5 text-amber-300" />
              </div>
              <div className="w-full h-4 bg-amber-400 rounded text-[8px] font-black text-purple-950 flex items-center justify-center">
                ORDER NOW
              </div>
            </div>
            <div className="absolute top-2 left-3 text-[10px] font-black tracking-wider text-purple-200">
              zepto
            </div>
          </div>
        );
      case "project-yulu":
        return (
          <div className="w-full h-44 bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950 rounded-xl overflow-hidden relative flex items-center justify-center p-4">
            <div className="w-28 h-28 rounded-full border-2 border-cyan-400/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(56,189,248,0.2)]">
              <div className="w-20 h-20 rounded-full bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center">
                <Bike className="w-10 h-10 text-cyan-400" />
              </div>
              <div className="absolute -top-1 right-2 px-2 py-0.5 rounded-full bg-cyan-400 text-[8px] font-bold text-slate-950">
                EV 100%
              </div>
            </div>
            <div className="absolute top-2 left-3 text-[10px] font-bold tracking-wider text-cyan-300">
              yulu
            </div>
          </div>
        );
      case "project-cred":
        return (
          <div className="w-full h-44 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black rounded-xl overflow-hidden relative flex items-center justify-center p-4">
            <div className="w-24 h-36 bg-black rounded-xl border border-white/20 shadow-2xl p-2.5 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="text-[8px] font-mono text-white/60">CRED SCORE</span>
                <span className="text-[9px] font-bold text-emerald-400">820</span>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center self-center">
                <ShieldCheck className="w-5 h-5 text-white/80" />
              </div>
              <div className="w-full h-4 bg-white/10 rounded text-[7px] font-mono text-white/80 flex items-center justify-center">
                CLAIM REWARD
              </div>
            </div>
            <div className="absolute top-2 left-3 text-[10px] font-bold tracking-[0.2em] text-white/70">
              CRED
            </div>
          </div>
        );
      case "project-simpl":
        return (
          <div className="w-full h-44 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 rounded-xl overflow-hidden relative flex items-center justify-center p-4">
            <div className="w-24 h-36 bg-gradient-to-b from-emerald-800 to-teal-950 rounded-xl border border-emerald-500/30 shadow-2xl p-2.5 flex flex-col justify-between">
              <div className="text-[8px] font-bold text-emerald-200">
                1-TAP PAY
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-900/40 border border-emerald-400/30 flex items-center justify-center self-center">
                <CreditCard className="w-5 h-5 text-emerald-300" />
              </div>
              <div className="w-full h-4 bg-emerald-400 rounded text-[7px] font-bold text-emerald-950 flex items-center justify-center">
                APPROVED
              </div>
            </div>
            <div className="absolute top-2 left-3 text-[10px] font-bold tracking-wider text-emerald-300">
              Simpl
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="work" className="py-24 max-w-7xl mx-auto px-6">
      <SectionHeader
        eyebrow="FEATURED WORK"
        title="Selected projects that created real impact."
        linkText="VIEW ALL PROJECTS"
        linkHref="#work"
      />

      {/* 5-Card Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {FEATURED_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="group rounded-2xl bg-[#0c0d16]/80 border border-white/[0.07] hover:border-purple-500/40 p-4 transition-all duration-300 flex flex-col justify-between hover:bg-[#111320]"
          >
            {/* Visual Thumbnail */}
            <div className="mb-4 overflow-hidden rounded-xl">
              {renderProjectVisual(project.id)}
            </div>

            {/* Project Details */}
            <div>
              <h3 className="text-sm font-extrabold tracking-wider text-white uppercase mb-1">
                {project.title}
              </h3>
              <p className="text-[11px] text-white/50 mb-3 leading-snug">
                {project.category}
              </p>
            </div>

            {/* Bottom link with arrow */}
            <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-semibold text-white/60 group-hover:text-purple-300 transition-colors">
              <span>{project.linkText}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
