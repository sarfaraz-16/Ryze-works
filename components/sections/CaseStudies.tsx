import React from "react";
import { ArrowRight, Activity, CreditCard } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard3D } from "@/components/ui/TiltCard3D";

export const CaseStudies: React.FC = () => {
  return (
    <section id="case-studies" className="py-24 max-w-7xl mx-auto px-6 relative">
      {/* Ambient baseline glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#1E085A]/30 via-transparent to-transparent pointer-events-none" />

      <SectionHeader
        eyebrow="CASE STUDIES"
        title="Deep dives into strategy, execution and results."
        linkText="VIEW ALL CASE STUDIES"
        linkHref="/case-studies"
      />

      {/* 3-Card Bento Strip with 3D Perspective Tilt & Parallax */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Nostic */}
        <TiltCard3D
          href="/case-studies/nostic-transformation"
          ariaLabel="View case study: Nostic Transformation"
          className="group rounded-2xl bg-[#0d0e17]/90 border border-white/[0.08] hover:border-[#B896FF]/40 p-7 flex flex-col justify-between relative shadow-2xl shadow-black/50 hover:shadow-[#1E085A]/40 min-h-[380px] h-full"
        >
          {/* Top content - floating in 3D */}
          <div className="z-10 [transform:translateZ(18px)] transition-transform duration-300">
            <div className="text-2xl font-bold tracking-tighter lowercase text-white mb-4">
              nostic
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white leading-snug max-w-xs mb-4 group-hover:text-[#B896FF] transition-colors tracking-[-0.01em] [word-spacing:0.08em]">
              How Nostic transformed diagnostics with a digital-first brand experience.
            </h3>
          </div>

          {/* Device graphic preview on right - physically floats above card frame in 3D space */}
          <div className="my-4 flex items-center justify-end [transform:translateZ(28px)_scale(0.96)] transition-transform duration-300">
            <div className="w-36 h-36 bg-gradient-to-br from-slate-100 to-slate-300 rounded-2xl border border-white/40 p-3 shadow-2xl flex flex-col items-center justify-between transform group-hover:scale-105 group-hover:-rotate-1 transition-transform duration-300">
              <div className="w-full flex items-center justify-between">
                <span className="text-[8px] font-mono font-bold text-slate-800">NOSTIC V4</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
              </div>
              <div className="w-full h-12 bg-slate-950 rounded-xl flex flex-col items-center justify-center shadow-inner">
                <span className="text-[11px] font-mono font-bold text-sky-400">98.6°F</span>
                <span className="text-[7px] font-mono text-emerald-400">STATUS: CALIBRATED</span>
              </div>
              <div className="w-full flex items-center justify-between text-[8px] font-bold text-slate-600 border-t border-slate-200 pt-1">
                <span>SENSOR ACTIVE</span>
                <Activity className="w-3 h-3 text-sky-600" />
              </div>
            </div>
          </div>

          {/* Bottom link pill - floating in 3D */}
          <div className="z-10 pt-4 border-t border-white/[0.06] flex items-center justify-between [transform:translateZ(22px)] transition-transform duration-300">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] group-hover:bg-white text-xs font-bold uppercase tracking-wider text-zinc-200 group-hover:text-black border border-white/15 transition-all">
              <span>VIEW CASE STUDY</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Background subtle radial glow */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        </TiltCard3D>

        {/* Card 2: Razorpay */}
        <TiltCard3D
          href="/case-studies/razorpay-scale"
          ariaLabel="View case study: Razorpay Scale"
          className="group rounded-2xl bg-[#0d0e17]/90 border border-white/[0.08] hover:border-[#B896FF]/40 p-7 flex flex-col justify-between relative shadow-2xl shadow-black/50 hover:shadow-[#1E085A]/40 min-h-[380px] h-full"
        >
          {/* Top content - floating in 3D */}
          <div className="z-10 [transform:translateZ(18px)] transition-transform duration-300">
            <div className="flex items-center gap-1.5 text-2xl font-extrabold italic tracking-tight text-white mb-4">
              <span className="text-sky-400 not-italic text-lg">▲</span>
              <span>Razorpay</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white leading-snug max-w-xs mb-4 group-hover:text-[#B896FF] transition-colors tracking-[-0.01em] [word-spacing:0.08em]">
              How Razorpay scaled brand trust and awareness across India.
            </h3>
          </div>

          {/* Sleek dynamic wave / speed visual graphic - physically floats above card frame in 3D space */}
          <div className="my-4 flex items-center justify-end [transform:translateZ(28px)_scale(0.96)] transition-transform duration-300">
            <div className="w-40 h-32 rounded-2xl bg-gradient-to-r from-blue-900/60 via-indigo-900/70 to-purple-900/60 border border-blue-400/30 p-3 shadow-2xl flex flex-col justify-between transform group-hover:scale-105 group-hover:rotate-1 transition-transform duration-300">
              <div className="flex justify-between items-center text-[8px] font-mono text-blue-200">
                <span>PAYMENT CLOUD</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
              </div>
              <div className="w-full h-10 flex items-end gap-1.5 px-2">
                <div className="h-4 w-1.5 bg-sky-400 rounded-full animate-pulse" />
                <div className="h-7 w-1.5 bg-indigo-400 rounded-full" />
                <div className="h-9 w-1.5 bg-[#B896FF] rounded-full shadow-[0_0_10px_#7042FF]" />
                <div className="h-6 w-1.5 bg-pink-400 rounded-full" />
                <div className="h-8 w-1.5 bg-sky-300 rounded-full" />
              </div>
              <div className="text-[9px] font-bold text-sky-200 flex justify-between items-center border-t border-white/10 pt-1">
                <span>40M+ DAILY TXN</span>
                <span className="font-mono text-emerald-300">99.99% UP</span>
              </div>
            </div>
          </div>

          {/* Bottom link pill - floating in 3D */}
          <div className="z-10 pt-4 border-t border-white/[0.06] flex items-center justify-between [transform:translateZ(22px)] transition-transform duration-300">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] group-hover:bg-white text-xs font-bold uppercase tracking-wider text-zinc-200 group-hover:text-black border border-white/15 transition-all">
              <span>VIEW CASE STUDY</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Background subtle radial glow */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#7042FF]/15 rounded-full blur-3xl pointer-events-none" />
        </TiltCard3D>

        {/* Card 3: Simpl */}
        <TiltCard3D
          href="/case-studies/simpl-engagement"
          ariaLabel="View case study: Simpl Engagement"
          className="group rounded-2xl bg-[#0d0e17]/90 border border-white/[0.08] hover:border-[#B896FF]/40 p-7 flex flex-col justify-between relative shadow-2xl shadow-black/50 hover:shadow-[#1E085A]/40 min-h-[380px] h-full"
        >
          {/* Top content - floating in 3D */}
          <div className="z-10 [transform:translateZ(18px)] transition-transform duration-300">
            <div className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white mb-4">
              <div className="w-4 h-4 rounded-full border border-emerald-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <span>Simpl</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white leading-snug max-w-xs mb-4 group-hover:text-[#B896FF] transition-colors tracking-[-0.01em] [word-spacing:0.08em]">
              How Simpl increased engagement through design and performance.
            </h3>
          </div>

          {/* Smartphone device preview with app screen - physically floats above card frame in 3D space */}
          <div className="my-4 flex items-center justify-end [transform:translateZ(28px)_scale(0.96)] transition-transform duration-300">
            <div className="w-32 h-38 bg-gradient-to-b from-[#06241e] to-[#02100d] rounded-2xl border-2 border-emerald-400/40 p-2.5 shadow-2xl flex flex-col justify-between transform group-hover:scale-105 group-hover:-rotate-1 transition-transform duration-300">
              <div className="flex justify-between items-center border-b border-emerald-800/40 pb-1">
                <span className="text-[8px] font-bold text-emerald-300">1-TAP CHECKOUT</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
              </div>
              <div className="w-full py-2 text-center">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto mb-1">
                  <CreditCard className="w-4 h-4 text-emerald-300" />
                </div>
                <div className="text-[8px] font-mono text-emerald-300 font-bold">₹1,850 APPROVED</div>
              </div>
              <div className="w-full py-1 bg-emerald-400 rounded-md text-[7px] font-black text-slate-950 text-center shadow-md">
                COMPLETE ORDER
              </div>
            </div>
          </div>

          {/* Bottom link pill - floating in 3D */}
          <div className="z-10 pt-4 border-t border-white/[0.06] flex items-center justify-between [transform:translateZ(22px)] transition-transform duration-300">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] group-hover:bg-white text-xs font-bold uppercase tracking-wider text-zinc-200 group-hover:text-black border border-white/15 transition-all">
              <span>VIEW CASE STUDY</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Background subtle radial glow */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        </TiltCard3D>
      </div>
    </section>
  );
};
