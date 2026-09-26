import React from "react";
import { TRUSTED_CLIENTS } from "@/data/siteData";

export const TrustedBy: React.FC = () => {
  const renderClientLogo = (client: typeof TRUSTED_CLIENTS[0]) => {
    switch (client.name) {
      case "nostic":
        return (
          <span className="text-2xl font-bold tracking-tighter lowercase text-white">
            nostic
          </span>
        );
      case "zepto":
        return (
          <span className="text-2xl font-black tracking-normal lowercase text-white">
            zepto
          </span>
        );
      case "yulu":
        return (
          <div className="flex items-center gap-2 text-xl font-bold tracking-wider lowercase text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block shadow-[0_0_8px_#38bdf8]" />
            <span>yulu</span>
          </div>
        );
      case "CRED":
        return (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border border-white rounded-sm flex items-center justify-center text-[10px] font-mono font-bold">
              C
            </div>
            <span className="text-xl font-black tracking-[0.2em] uppercase text-white font-serif">
              CRED
            </span>
          </div>
        );
      case "Simpl":
        return (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Simpl
            </span>
          </div>
        );
      case "Razorpay":
        return (
          <div className="flex items-center gap-1.5 text-xl font-extrabold italic tracking-tight text-white">
            <span className="text-sky-400 not-italic text-sm">▲</span>
            <span>Razorpay</span>
          </div>
        );
      default:
        return <span className="text-xl font-bold text-white">{client.name}</span>;
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
