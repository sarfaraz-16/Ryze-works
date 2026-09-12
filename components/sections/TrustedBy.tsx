import React from "react";
import { TRUSTED_CLIENTS } from "@/data/siteData";

export const TrustedBy: React.FC = () => {
  return (
    <section className="py-14 border-y border-white/[0.05] bg-[#07070b]/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-[11px] font-bold tracking-[0.25em] text-white/40 uppercase">
            TRUSTED BY INNOVATIVE BRANDS WORLDWIDE
          </p>
        </div>

        {/* Client Logos Grid */}
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-8 md:gap-12 opacity-70 hover:opacity-100 transition-opacity duration-300">
          {TRUSTED_CLIENTS.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center px-4 py-2 transition-transform duration-200 hover:scale-105"
            >
              {client.name === "nostic" && (
                <span className="text-2xl font-bold tracking-tight text-white/90">
                  nostic
                </span>
              )}
              {client.name === "zepto" && (
                <span className="text-2xl font-black tracking-normal text-white/90">
                  zepto
                </span>
              )}
              {client.name === "yulu" && (
                <div className="flex items-center gap-1.5 text-xl font-bold tracking-wider text-white/90">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block shadow-[0_0_8px_#38bdf8]" />
                  <span>yulu</span>
                </div>
              )}
              {client.name === "CRED" && (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border border-white/80 rounded-sm flex items-center justify-center text-[10px] font-mono">
                    C
                  </div>
                  <span className="text-xl font-bold tracking-[0.2em] text-white/90">
                    CRED
                  </span>
                </div>
              )}
              {client.name === "Simpl" && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-emerald-400 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-white/90">
                    Simpl
                  </span>
                </div>
              )}
              {client.name === "Razorpay" && (
                <div className="flex items-center gap-1 text-xl font-extrabold italic tracking-tight text-white/90">
                  <span className="text-sky-400 not-italic">▲</span>
                  <span>Razorpay</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
