import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { RESOURCES_DATA } from "@/data/resourcesData";
import { ResourcesClient } from "@/components/resources/ResourcesClient";
import { Sparkles } from "lucide-react";

export const revalidate = 3600;

export const metadata = {
  title: "Agency Toolkits, Frameworks & Checklists | RYZE WORKS",
  description: "Downloadable design canvases, enterprise audit checklists, and production architecture blueprints.",
};

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-transparent text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.25),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-3 font-medium flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
            AGENCY FRAMEWORKS // PRODUCTION PLAYBOOKS
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] text-white mb-6">
            Frameworks, Toolkits &amp; Checklists
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-2xl">
            Practical operating frameworks, design token audits, and full-stack production architecture blueprints developed by Ryze Works engineers.
          </p>
        </div>

        {/* Resources Client Filtering */}
        <ResourcesClient resources={RESOURCES_DATA} />
      </section>

      <ClosingCTA />
      <Footer />
    </main>
  );
}
