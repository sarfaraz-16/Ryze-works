import React from "react";
import { ArrowRight, Activity, ShoppingBag, Bike, Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard3D } from "@/components/ui/TiltCard3D";
import { FEATURED_PROJECTS } from "@/data/siteData";

export const FeaturedWork: React.FC = () => {
  const renderProjectVisual = (slug: string) => {
    switch (slug) {
      case "nostic":
        return (
          <div className="w-full h-48 bg-gradient-to-br from-[#161224] via-[#0f0b1a] to-[#07050e] rounded-xl overflow-hidden relative flex items-center justify-center p-4 border border-white/10 shadow-inner">
            {/* Ambient subtle backlight */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-violet-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Hardware Diagnostic Device Mockup */}
            <div className="w-32 h-32 bg-[#141021] rounded-3xl shadow-2xl border border-white/15 flex flex-col items-center justify-between p-3.5 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="w-full flex items-center justify-between">
                <span className="font-mono text-[8px] font-extrabold tracking-wider text-zinc-200 uppercase">NOSTIC PRO</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
              </div>
              <div className="w-full h-11 bg-[#090612] rounded-xl flex flex-col items-center justify-center border border-violet-500/30 shadow-inner">
                <span className="text-[11px] font-mono font-bold text-violet-300">98.6°F • 99% SpO2</span>
                <span className="text-[8px] font-mono text-emerald-400 flex items-center gap-1">
                  <Activity className="w-2.5 h-2.5 inline" /> OPTIMAL VITALS
                </span>
              </div>
              <div className="w-full flex items-center justify-between pt-1 border-t border-white/10">
                <span className="w-5 h-1.5 bg-white/20 rounded-full" />
                <span className="text-[7px] font-mono text-zinc-400">BLE 5.3</span>
              </div>
            </div>
            <div className="absolute top-3 left-3 text-[10px] font-black tracking-wider text-white/80 uppercase">
              nostic
            </div>
          </div>
        );

      case "zepto":
        return (
          <div className="w-full h-48 bg-gradient-to-br from-[#7042FF]/90 via-[#5D30DF] to-[#1E085A] rounded-xl overflow-hidden relative flex items-center justify-center p-4 border border-[#B896FF]/30 shadow-inner">
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#B896FF]/30 rounded-full blur-2xl pointer-events-none" />

            {/* Mobile App UI Render */}
            <div className="w-28 h-38 bg-[#080417] rounded-2xl border-2 border-white/20 shadow-2xl p-2.5 flex flex-col justify-between transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <span className="text-[9px] font-black text-amber-300 tracking-wider">zepto</span>
                <span className="text-[7px] font-bold px-1.5 py-0.5 rounded bg-amber-400 text-purple-950">10 MIN</span>
              </div>
              <div className="my-auto py-1">
                <div className="w-full bg-white/[0.06] rounded-lg p-1.5 mb-1 flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded bg-amber-400/20 flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                  </div>
                  <div className="leading-none">
                    <div className="text-[7px] font-bold text-white">Fresh Berries</div>
                    <div className="text-[6px] text-zinc-400">Delivering in 7 mins</div>
                  </div>
                </div>
              </div>
              <div className="w-full py-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-md text-[8px] font-black text-purple-950 flex items-center justify-center shadow-md">
                TRACK DELIVERY
              </div>
            </div>
            <div className="absolute top-3 left-3 text-[10px] font-black tracking-wider text-white/90">
              zepto
            </div>
          </div>
        );

      case "yulu":
        return (
          <div className="w-full h-48 bg-gradient-to-br from-[#0c333a] via-[#09252c] to-[#041217] rounded-xl overflow-hidden relative flex items-center justify-center p-4 border border-cyan-500/30 shadow-inner">
            <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />

            {/* Electric Mobility UI */}
            <div className="w-32 h-32 rounded-2xl bg-[#06181d]/90 border border-cyan-400/30 p-3 flex flex-col justify-between shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[9px] font-bold text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                  <span>YULU DEX</span>
                </div>
                <span className="text-[8px] font-mono font-bold text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-400/30">94%</span>
              </div>
              <div className="flex items-center justify-center py-2">
                <div className="w-14 h-14 rounded-full bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                  <Bike className="w-7 h-7 text-cyan-300" />
                </div>
              </div>
              <div className="flex justify-between items-center text-[8px] text-zinc-300 border-t border-cyan-900/60 pt-1">
                <span>Range: 68 km</span>
                <span className="text-cyan-400 font-bold">UNLOCKED</span>
              </div>
            </div>
            <div className="absolute top-3 left-3 text-[10px] font-bold tracking-wider text-cyan-300">
              yulu
            </div>
          </div>
        );

      case "cred":
        return (
          <div className="w-full h-48 bg-gradient-to-br from-[#121218] via-[#09090c] to-black rounded-xl overflow-hidden relative flex items-center justify-center p-4 border border-white/15 shadow-inner">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-[#B896FF]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Luxury Dark-Mode Fintech Interface */}
            <div className="w-28 h-38 bg-black rounded-2xl border border-white/25 shadow-2xl p-2.5 flex flex-col justify-between transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="flex justify-between items-center border-b border-white/10 pb-1">
                <span className="text-[7px] font-mono text-zinc-400">CRED BLACK</span>
                <span className="text-[8px] font-mono font-bold text-emerald-400">842 SCORE</span>
              </div>
              <div className="my-auto py-1">
                <div className="w-full aspect-[1.6/1] bg-gradient-to-tr from-zinc-800 via-zinc-900 to-black rounded-lg border border-white/20 p-1.5 flex flex-col justify-between shadow-lg">
                  <div className="w-3 h-2 rounded-sm bg-amber-400/60" />
                  <div className="text-[6px] font-mono text-zinc-400 tracking-wider">•••• 8820</div>
                </div>
              </div>
              <div className="w-full py-1 bg-white/10 hover:bg-white/15 rounded text-[8px] font-mono text-white flex items-center justify-center border border-white/20 transition-colors">
                CLAIM REWARD
              </div>
            </div>
            <div className="absolute top-3 left-3 text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">
              CRED
            </div>
          </div>
        );

      case "simpl":
        return (
          <div className="w-full h-48 bg-gradient-to-br from-[#0c362d] via-[#07241e] to-[#031410] rounded-xl overflow-hidden relative flex items-center justify-center p-4 border border-emerald-500/30 shadow-inner">
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

            {/* Checkout Interface Mockup */}
            <div className="w-28 h-38 bg-[#041d18] rounded-2xl border-2 border-emerald-400/30 shadow-2xl p-2.5 flex flex-col justify-between transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center justify-between border-b border-emerald-800/40 pb-1">
                <span className="text-[9px] font-bold text-emerald-300">Simpl</span>
                <span className="text-[7px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400">1-TAP</span>
              </div>
              <div className="my-auto text-center py-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto mb-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <Check className="w-4 h-4 text-emerald-300" />
                </div>
                <div className="text-[8px] font-bold text-white">Payment Success</div>
                <div className="text-[7px] font-mono text-emerald-300/80">₹2,499.00</div>
              </div>
              <div className="w-full py-1 bg-emerald-400 rounded text-[7px] font-black text-emerald-950 flex items-center justify-center shadow-md">
                APPROVED
              </div>
            </div>
            <div className="absolute top-3 left-3 text-[10px] font-bold tracking-wider text-emerald-300">
              Simpl
            </div>
          </div>
        );

      case "razorpay":
        return (
          <div className="w-full h-48 bg-gradient-to-br from-[#0c1e3d] via-[#08152e] to-[#040a17] rounded-xl overflow-hidden relative flex items-center justify-center p-4 border border-blue-500/30 shadow-inner">
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-blue-500/25 rounded-full blur-2xl pointer-events-none" />

            {/* Payment Interface Mockup */}
            <div className="w-28 h-38 bg-[#050e24] rounded-2xl border-2 border-blue-400/30 shadow-2xl p-2.5 flex flex-col justify-between transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center justify-between border-b border-blue-800/40 pb-1">
                <span className="text-[9px] font-black italic tracking-wide text-blue-300">Razorpay</span>
                <span className="text-[7px] font-mono px-1.5 py-0.5 rounded bg-blue-950 border border-blue-500/40 text-blue-400">INSTANT</span>
              </div>
              <div className="my-auto text-center py-1">
                <div className="text-[8px] font-bold text-white">₹45,000.00 Settled</div>
                <div className="text-[6px] text-blue-300/80">Enterprise Payout</div>
              </div>
              <div className="w-full py-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded text-[7px] font-bold text-white flex items-center justify-center shadow-md">
                SUCCESSFUL
              </div>
            </div>
            <div className="absolute top-3 left-3 text-[10px] font-bold italic tracking-wider text-blue-300">
              Razorpay
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="work" className="py-24 max-w-7xl mx-auto px-6 relative">
      {/* Ambient baseline glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#1E085A]/30 via-transparent to-transparent pointer-events-none" />

      <SectionHeader
        eyebrow="FEATURED WORK"
        title="Selected projects that created real impact."
        linkText="VIEW ALL PROJECTS"
        linkHref="/projects"
      />

      {/* 6-Card Project Bento Grid with 3D Perspective Tilt & Parallax */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURED_PROJECTS.map((project) => (
          <TiltCard3D
            key={project.id}
            href={`/projects/${project.slug}`}
            ariaLabel={`View project: ${project.title}`}
            data-cursor="VIEW"
            className="group rounded-2xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/35 p-4 shadow-2xl shadow-black/50 hover:shadow-[#1E085A]/40 flex flex-col justify-between hover:bg-[#131422] h-full"
          >
            {/* Visual Thumbnail: Layered Depth Hierarchy (floats above card frame in 3D space) */}
            <div className="mb-4 rounded-xl [transform:translateZ(28px)_scale(0.96)] transition-transform duration-300">
              {renderProjectVisual(project.slug)}
            </div>

            {/* Project Details with layered depth */}
            <div className="flex-1 [transform:translateZ(18px)] transition-transform duration-300">
              <h3 className="text-base font-semibold text-white mb-1 group-hover:text-[#B896FF] transition-colors tracking-[-0.01em] [word-spacing:0.08em]">
                {project.title}
              </h3>
              <p className="text-xs text-zinc-400 mb-3 leading-snug">
                {project.category}
              </p>
            </div>

            {/* Bottom link with arrow with layered depth */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-zinc-300 group-hover:text-[#B896FF] transition-colors [transform:translateZ(20px)] transition-transform duration-300">
              <span>{project.linkText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 text-[#B896FF] transition-transform" />
            </div>
          </TiltCard3D>
        ))}
      </div>
    </section>
  );
};
