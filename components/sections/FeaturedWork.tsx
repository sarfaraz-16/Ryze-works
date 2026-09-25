import React from "react";
import { ArrowUpRight, Activity, Zap, Lock, Scan, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard3D } from "@/components/ui/TiltCard3D";
import { FEATURED_PROJECTS } from "@/data/siteData";
import { CounterNumber } from "@/components/ui/CounterNumber";

export const FeaturedWork: React.FC = () => {
  const renderProjectVisual = (slug: string) => {
    switch (slug) {
      case "nostic":
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#0f172a] to-[#020617] relative flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-700 ease-out">
            {/* Medical Grade Hardware Chassis */}
            <div className="w-full max-w-[280px] bg-[#090b14] border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col">
              <div className="absolute inset-0 bg-white/[0.04] pointer-events-none" />
              <div className="flex items-center justify-between p-3 border-b border-white/5 bg-black/40">
                <span className="text-[10px] font-mono tracking-widest text-slate-400">TELEMETRY_CORE</span>
                <span className="flex items-center gap-1.5 text-[8px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  OPTIMAL VITALS
                </span>
              </div>
              <div className="p-4 flex flex-col gap-4">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 mb-0.5">CORE TEMP</div>
                    <div className="text-xl font-mono text-cyan-300 font-light"><CounterNumber value={98.6} decimals={1} suffix="°F" /></div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-slate-500 mb-0.5">SpO₂</div>
                    <div className="text-xl font-mono text-cyan-300 font-light"><CounterNumber value={99} suffix="%" /></div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-slate-500 mb-0.5">BPM</div>
                    <div className="text-xl font-mono text-cyan-300 font-light"><CounterNumber value={64} /></div>
                  </div>
                </div>
                <div className="w-full h-10 border border-cyan-500/20 rounded bg-cyan-950/20 relative overflow-hidden flex items-center">
                  <svg className="w-full h-full text-cyan-400 opacity-60" viewBox="0 0 200 40" preserveAspectRatio="none">
                    <path d="M0 20 L20 20 L25 5 L30 35 L35 20 L50 20 L55 10 L60 30 L65 20 L80 20 L85 5 L90 35 L95 20 L110 20 L115 10 L120 30 L125 20 L140 20 L145 5 L150 35 L155 20 L170 20 L175 10 L180 30 L185 20 L200 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        );

      case "zepto":
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#1e082b] to-[#0a0314] relative flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-700 ease-out">
            <div className="w-[180px] h-[260px] bg-black border border-white/10 rounded-[28px] p-2 flex flex-col shadow-2xl relative overflow-hidden">
              <div className="w-full h-24 bg-zinc-800 rounded-3xl mb-2 relative overflow-hidden border border-white/5 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/60 to-fuchsia-900/60 mix-blend-overlay" />
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=300')] bg-cover bg-center" />
                <div className="absolute top-2 right-2 bg-amber-400 text-purple-950 text-[8px] font-black px-2 py-1 rounded-full flex items-center gap-1 shadow-lg z-10">
                  <Zap className="w-2.5 h-2.5 fill-purple-950" /> 10 MINS
                </div>
              </div>
              <div className="px-2 flex-1 flex flex-col">
                <div className="text-white font-bold text-xs mb-1">Fresh Groceries</div>
                <div className="text-zinc-500 text-[9px] mb-3">Arriving at 12:42 PM</div>
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mb-3">
                  <div className="w-3/4 h-full bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-full relative">
                    <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/40 blur-sm" />
                  </div>
                </div>
                <div className="mt-auto bg-white/5 border border-white/10 rounded-xl p-2 flex justify-between items-center mb-1">
                  <span className="text-[9px] text-zinc-300">Total</span>
                  <span className="text-[10px] font-bold text-white">₹485</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "yulu":
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#06201a] to-[#020d0b] relative flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-700 ease-out overflow-hidden">
            {/* Live GPS Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            
            <div className="w-full max-w-[240px] bg-[#03120f]/80 backdrop-blur border border-emerald-500/20 rounded-2xl p-4 shadow-2xl relative z-10 flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-6">
                <div className="text-[10px] font-mono text-emerald-400">YULU_DEX_v2</div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-[8px] font-bold text-emerald-400">
                  <Lock className="w-2.5 h-2.5" /> SECURE
                </div>
              </div>
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(16,185,129,0.15)" strokeWidth="6" />
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray="289" strokeDashoffset="46" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-mono font-light text-white"><CounterNumber value={84} suffix="%" /></span>
                  <span className="text-[9px] tracking-widest text-emerald-400/80 uppercase">68 KM Range</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "cred":
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#18181b] via-[#09090b] to-[#000000] relative flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-700 ease-out">
            <div className="w-[260px] h-[160px] bg-gradient-to-br from-zinc-800 to-black rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-black/80 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <div className="flex justify-between items-start">
                <svg className="w-8 h-8 text-amber-200/80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 6h16v12H4zm2 2v8h12V8zM8 10h4v4H8z" />
                </svg>
                <div className="px-2 py-1 bg-white/5 border border-white/10 rounded-md flex items-center gap-1.5 backdrop-blur-sm z-10">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span className="text-[9px] font-mono font-bold text-white">EXPERIAN 842</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 z-10">
                <div className="text-xs font-mono tracking-[0.2em] text-zinc-400">•••• •••• •••• 8821</div>
                <div className="text-[10px] font-bold text-zinc-500 tracking-wider">PREMIUM MEMBER</div>
              </div>
            </div>
          </div>
        );

      case "simpl":
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#061b14] to-[#020a07] relative flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-700 ease-out">
            <div className="w-[200px] bg-emerald-950/40 backdrop-blur-md border border-emerald-500/20 rounded-[20px] shadow-2xl p-4 flex flex-col items-center relative overflow-hidden">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-3 border border-emerald-400/30">
                <Scan className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="w-full bg-black/40 rounded-xl p-3 mb-4 border border-white/5">
                <div className="flex justify-between items-center mb-2 text-[10px]">
                  <span className="text-zinc-400">Merchant</span>
                  <span className="text-white font-medium">Zepto</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-zinc-400">Amount</span>
                  <span className="text-emerald-400 font-mono">₹2,450.00</span>
                </div>
              </div>
              <div className="w-full bg-emerald-500 text-emerald-950 py-2 rounded-lg text-[10px] font-bold flex justify-center items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                <CheckCircle2 className="w-3.5 h-3.5" /> APPROVED
              </div>
            </div>
          </div>
        );

      case "razorpay":
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#0b132b] to-[#040817] relative flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-700 ease-out">
            <div className="w-full max-w-[260px] bg-[#060a17]/80 backdrop-blur-md border border-blue-500/20 rounded-xl p-4 shadow-2xl flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-blue-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Settlements</span>
                </div>
                <span className="text-[8px] bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30 font-mono">LIVE</span>
              </div>
              <div>
                <div className="text-2xl font-mono text-white mb-1 tracking-tight">
                  <CounterNumber value={40880} prefix="₹" suffix=".00" />
                </div>
                <div className="text-[9px] text-zinc-400">Processed today</div>
              </div>
              <div className="w-full h-12 flex items-end justify-between gap-1 opacity-70">
                {[40, 70, 45, 90, 65, 80, 50, 100, 75, 60].map((h, i) => (
                  <div key={i} className="w-full bg-blue-500/40 rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded text-[9px] font-bold text-white text-center transition-colors shadow-[0_0_12px_rgba(37,99,235,0.4)]">
                TRIGGER PAYOUT
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="work" className="py-24 max-w-7xl mx-auto px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#1E085A]/30 via-transparent to-transparent pointer-events-none" />

      <SectionHeader
        eyebrow="FEATURED WORK"
        title="Selected projects that created real impact."
        linkText="VIEW ALL PROJECTS"
        linkHref="/projects"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_PROJECTS.map((project) => (
          <TiltCard3D
            key={project.id}
            href={`/projects/${project.slug}`}
            ariaLabel={`View project: ${project.title}`}
            data-cursor="VIEW"
            className="group flex flex-col border-none shadow-none bg-transparent hover:bg-transparent"
          >
            {/* Fixed Aspect Ratio Visual Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0c081e]/80 shadow-2xl mb-4">
              {renderProjectVisual(project.slug)}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080417] via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            <div className="flex items-center justify-between px-1">
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[10px] font-mono tracking-wider text-slate-400 mt-1 uppercase">
                  {project.category}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-[#38bdf8]/10 group-hover:border-[#38bdf8]/30 transition-colors shrink-0">
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-[#38bdf8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </TiltCard3D>
        ))}
      </div>
    </section>
  );
};
