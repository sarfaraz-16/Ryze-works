import React from "react";
import Link from "next/link";
import { ArrowRight, Activity, Zap, CreditCard } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CASE_STUDIES } from "@/data/siteData";

export const CaseStudies: React.FC = () => {
  return (
    <section id="case-studies" className="py-24 max-w-7xl mx-auto px-6">
      <SectionHeader
        eyebrow="CASE STUDIES"
        title="Deep dives into strategy, execution and results."
        linkText="VIEW ALL CASE STUDIES"
        linkHref="#case-studies"
      />

      {/* 3-Column Horizontal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Nostic */}
        <div className="group rounded-2xl bg-gradient-to-br from-slate-900 via-[#0d111a] to-[#07070b] border border-white/[0.08] hover:border-purple-500/40 p-7 transition-all duration-300 flex flex-col justify-between overflow-hidden relative min-h-[360px]">
          {/* Top content */}
          <div className="z-10">
            <div className="text-xl font-bold tracking-tight text-white mb-4">
              nostic
            </div>
            <h3 className="text-base font-semibold text-white/90 leading-snug max-w-xs mb-6 group-hover:text-white transition-colors">
              How Nostic transformed diagnostics with a digital-first brand experience.
            </h3>
          </div>

          {/* Device graphic preview on right */}
          <div className="my-4 flex items-center justify-end">
            <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-3 shadow-2xl flex flex-col items-center justify-between transform group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-7 bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-[10px] font-mono text-cyan-300">98.6°F</span>
              </div>
              <Activity className="w-8 h-8 text-cyan-400" />
              <div className="text-[9px] font-bold text-slate-300">DIAGNOSTICS</div>
            </div>
          </div>

          {/* Bottom link */}
          <div className="z-10 pt-4 border-t border-white/[0.06] flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/70 group-hover:text-purple-300 transition-colors">
            <span>VIEW CASE STUDY</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Background subtle radial glow */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-600/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Card 2: Razorpay */}
        <div className="group rounded-2xl bg-gradient-to-br from-indigo-950/60 via-[#0a0d1d] to-[#07070b] border border-white/[0.08] hover:border-purple-500/40 p-7 transition-all duration-300 flex flex-col justify-between overflow-hidden relative min-h-[360px]">
          {/* Top content */}
          <div className="z-10">
            <div className="flex items-center gap-1 text-xl font-extrabold italic tracking-tight text-white mb-4">
              <span className="text-sky-400 not-italic">▲</span>
              <span>Razorpay</span>
            </div>
            <h3 className="text-base font-semibold text-white/90 leading-snug max-w-xs mb-6 group-hover:text-white transition-colors">
              How Razorpay scaled brand trust and awareness across India.
            </h3>
          </div>

          {/* Sleek dynamic wave graphic preview */}
          <div className="my-4 flex items-center justify-end">
            <div className="w-36 h-28 rounded-2xl bg-gradient-to-r from-blue-600/30 via-indigo-600/40 to-purple-600/30 border border-blue-400/30 p-3 shadow-2xl flex flex-col justify-between transform group-hover:scale-105 transition-transform duration-300">
              <div className="flex justify-between items-center text-[9px] font-mono text-blue-200">
                <span>PAYMENT ENGINE</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="w-full h-8 flex items-center gap-1">
                <div className="h-4 w-1 bg-sky-400 rounded-full" />
                <div className="h-6 w-1 bg-indigo-400 rounded-full" />
                <div className="h-8 w-1 bg-purple-400 rounded-full" />
                <div className="h-5 w-1 bg-pink-400 rounded-full" />
                <div className="h-7 w-1 bg-sky-300 rounded-full" />
              </div>
              <div className="text-[9px] font-bold text-sky-200">40M+ DAILY TXN</div>
            </div>
          </div>

          {/* Bottom link */}
          <div className="z-10 pt-4 border-t border-white/[0.06] flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/70 group-hover:text-purple-300 transition-colors">
            <span>VIEW CASE STUDY</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Background subtle radial glow */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Card 3: Simpl */}
        <div className="group rounded-2xl bg-gradient-to-br from-emerald-950/50 via-[#0a1815] to-[#07070b] border border-white/[0.08] hover:border-purple-500/40 p-7 transition-all duration-300 flex flex-col justify-between overflow-hidden relative min-h-[360px]">
          {/* Top content */}
          <div className="z-10">
            <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-white mb-4">
              <div className="w-4 h-4 rounded-full border border-emerald-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <span>Simpl</span>
            </div>
            <h3 className="text-base font-semibold text-white/90 leading-snug max-w-xs mb-6 group-hover:text-white transition-colors">
              How Simpl increased engagement through design and performance.
            </h3>
          </div>

          {/* Smartphone app screen mockup */}
          <div className="my-4 flex items-center justify-end">
            <div className="w-28 h-36 bg-gradient-to-b from-emerald-900 to-slate-950 rounded-xl border border-emerald-400/40 p-2.5 shadow-2xl flex flex-col justify-between transform group-hover:scale-105 transition-transform duration-300">
              <div className="text-[8px] font-bold text-emerald-300">CHECKOUT FLOW</div>
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center self-center">
                <CreditCard className="w-4 h-4 text-emerald-300" />
              </div>
              <div className="w-full py-1 bg-emerald-400 rounded text-[7px] font-bold text-slate-950 text-center">
                1-TAP PAY
              </div>
            </div>
          </div>

          {/* Bottom link */}
          <div className="z-10 pt-4 border-t border-white/[0.06] flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/70 group-hover:text-purple-300 transition-colors">
            <span>VIEW CASE STUDY</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Background subtle radial glow */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
