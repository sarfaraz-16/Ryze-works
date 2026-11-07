import React from "react";
import { TRUSTED_CLIENTS } from "@/data/siteData";

export const TrustedBy: React.FC = () => {
  const renderClientLogo = (client: typeof TRUSTED_CLIENTS[0]) => {
    switch (client.name) {
      case "Velve":
        return (
          <div className="flex items-center gap-1.5">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase font-sans">
              VELVE
            </span>
            <span className="text-[10px] font-mono text-violet-400 border border-violet-500/30 px-1 py-0.5 rounded">
              SALON
            </span>
          </div>
        );
      case "Eththisai":
        return (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400 inline-block shadow-[0_0_8px_#a78bfa]" />
            <span className="text-xl sm:text-2xl font-extrabold tracking-normal text-white">
              Eththisai
            </span>
          </div>
        );
      case "Happy Break":
        return (
          <span className="text-xl sm:text-2xl font-black tracking-tight text-amber-200/90 lowercase font-sans">
            happy break.
          </span>
        );
      case "Hair Mechanix":
        return (
          <span className="text-lg sm:text-xl font-mono font-bold tracking-[0.18em] uppercase text-zinc-100">
            HAIR MECHANIX
          </span>
        );
      case "SAS Fitness":
        return (
          <div className="flex items-center gap-1.5">
            <span className="text-xl sm:text-2xl font-black tracking-wider uppercase text-white">
              SAS
            </span>
            <span className="text-xs font-mono font-semibold tracking-widest text-emerald-400 uppercase">
              FITNESS
            </span>
          </div>
        );
      case "Reybha Couture":
        return (
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-widest uppercase text-white/95">
            REYBHA COUTURE
          </span>
        );
      case "MRL solutions":
        return (
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white">
              MRL
            </span>
            <span className="text-xs text-zinc-400 font-light">solutions</span>
          </div>
        );
      default:
        return <span className="text-xl font-bold text-white">{client.label || client.name}</span>;
    }
  };

  return (
    <section className="relative z-20 bg-[#080417] border-y border-white/[0.08] py-5 mb-10 overflow-hidden select-none">
      {/* Edge gradient masks for seamless marquee fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080417] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080417] to-transparent z-10 pointer-events-none" />

      <div className="text-center mb-4">
        <p className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-zinc-400 uppercase">
          TRUSTED BY INNOVATIVE BRANDS WORLDWIDE
        </p>
      </div>

      {/* Infinite continuous marquee track */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex items-center gap-16 sm:gap-24 opacity-75 hover:opacity-100 transition-opacity duration-300">
          {[...TRUSTED_CLIENTS, ...TRUSTED_CLIENTS, ...TRUSTED_CLIENTS].map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex items-center justify-center shrink-0 px-2 transition-transform duration-200 hover:scale-105"
            >
              {renderClientLogo(client)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
