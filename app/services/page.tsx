import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { SERVICES_DATA } from "@/data/siteData";
import { Brain, PenTool, Code2, TrendingUp, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Services & Capabilities | RYZE WORKS",
  description: "End-to-end capabilities across Strategy, Brand + Creative, Technology, Marketing, and Experiences."
};

export default function ServicesPage() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Brain": return <Brain className="w-7 h-7 text-purple-400" />;
      case "PenTool": return <PenTool className="w-7 h-7 text-pink-400" />;
      case "Code2": return <Code2 className="w-7 h-7 text-cyan-400" />;
      case "TrendingUp": return <TrendingUp className="w-7 h-7 text-amber-400" />;
      case "Zap": return <Zap className="w-7 h-7 text-violet-400" />;
      default: return <Brain className="w-7 h-7 text-purple-400" />;
    }
  };

  return (
    <main className="min-h-screen bg-[#07070b] text-white">
      <Navbar />

      <section className="pt-36 pb-20 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40 text-purple-300 text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            CAPABILITIES TAXONOMY
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            End-to-end capabilities to build what&apos;s next.
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            We partner with ambitious founders and enterprise brands across 5 synchronized disciplines — fusing AI-native execution with craft and strategic rigor.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-8 mb-20">
          {SERVICES_DATA.map((service, idx) => (
            <div
              key={service.id}
              className="rounded-2xl bg-[#0c0d16]/80 border border-white/[0.08] hover:border-purple-500/40 p-8 sm:p-10 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:bg-[#111320]"
            >
              <div className="lg:col-span-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    {getIcon(service.icon)}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-purple-400">
                      0{idx + 1} // {service.tagline}
                    </span>
                    <h2 className="text-2xl font-bold text-white">
                      {service.name}
                    </h2>
                  </div>
                </div>
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link href={`/services/${service.slug}`}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <span>View {service.name} Framework</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>

              {/* Deliverables List */}
              <div className="lg:col-span-7 bg-[#08080f]/80 rounded-xl p-6 border border-white/[0.05]">
                <h3 className="text-xs font-bold tracking-wider text-white/50 uppercase mb-4">
                  Core Deliverables & Outcomes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Action */}
        <div className="rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-900/60 border border-purple-800/30 p-8 sm:p-12 text-center flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Unsure which service model fits your roadmap?
          </h2>
          <p className="text-sm text-white/60 max-w-xl mb-6">
            Consult Ryze AI for an instant scope advisory, or schedule a strategic briefing with our partners.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/ai">
              <Button variant="primary" size="md">
                Consult Ryze AI Advisor
              </Button>
            </Link>
            <Link href="/start-a-project">
              <Button variant="outline" size="md">
                Start a Project Brief →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
