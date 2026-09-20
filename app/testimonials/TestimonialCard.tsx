"use client";

import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { useTilt3D } from "@/hooks/useTilt3D";

export function TestimonialCard({ item }: { item: any }) {
  const tilt = useTilt3D();

  const metricMap: Record<string, string> = {
    CRED: "+310% App DAU",
    Zepto: "Seed to Series A",
    Yulu: "Zero Downtime Cutover"
  };

  const metric = metricMap[item.company] || "Verified Client";

  return (
    <div
      ref={tilt.cardRef}
      onPointerEnter={tilt.onPointerEnter}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      style={tilt.cardStyle}
      className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-8 sm:p-9 min-h-[260px] transition-all duration-300 relative group overflow-hidden shadow-2xl flex flex-col justify-between select-none"
    >
      <div className="absolute inset-0 z-0 rounded-3xl" style={tilt.glareStyle} />
      
      {/* Ambient violet/indigo radial glow in the corner */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.25)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-1 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="bg-white/[0.05] border border-white/10 text-violet-300 font-mono text-[11px] px-2.5 py-1 rounded-lg shrink-0 ml-4">
            {metric}
          </span>
        </div>
        <blockquote className="text-base sm:text-lg text-zinc-200 leading-relaxed italic mb-8">
          &ldquo;{item.quote}&rdquo;
        </blockquote>
      </div>

      <div className="pt-6 border-t border-white/[0.08] flex items-center gap-3.5 relative z-10 mt-auto">
        {/* Avatar with glowing border */}
        <div className="w-11 h-11 rounded-2xl bg-[#0d0e17] border border-violet-500/40 flex items-center justify-center font-mono text-xs font-bold text-white shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.3)] overflow-hidden">
          {item.avatar ? (
            <img src={item.avatar} alt={item.authorName} className="w-full h-full object-cover" />
          ) : (
            item.authorName.split(" ").map((n: string) => n[0]).join("")
          )}
        </div>
        <div>
          <div className="text-sm font-bold text-white flex items-center gap-1.5">
            <span>{item.authorName}</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="font-mono text-xs text-zinc-400 mt-0.5">
            {item.role}, {item.company}
          </div>
        </div>
      </div>
    </div>
  );
}
