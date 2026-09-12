import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { CareerRoleCard, CareerRole } from "./CareerRoleCard";
import { Sparkles, Users, Zap, Shield } from "lucide-react";

export const metadata = {
  title: "Careers & Open Positions | RYZE WORKS",
  description: "Join the cross-functional studio shaping what's next. Explore open roles across Design, Engineering, Strategy, and Operations."
};

const FALLBACK_ROLES: CareerRole[] = [
  {
    id: "fd5ea147-56f5-45bc-b755-515b05576a53",
    slug: "senior-brand-designer",
    title: "Senior Brand Designer",
    department: "Design",
    employment_type: "Full-time",
    location: "Remote",
    badge: "hot",
    status: "published"
  },
  {
    id: "50d78440-4b46-445c-aee2-01685a443874",
    slug: "motion-designer",
    title: "Motion Designer",
    department: "Design",
    employment_type: "Full-time",
    location: "Hybrid · Chennai",
    badge: "new",
    status: "published"
  },
  {
    id: "628a9178-14a2-4bd9-81a8-a267f8b062d2",
    slug: "frontend-engineer",
    title: "Frontend Engineer",
    department: "Engineering",
    employment_type: "Full-time",
    location: "Remote",
    badge: "hot",
    status: "published"
  },
  {
    id: "e5876773-8de3-4917-a37f-ee7426fde40e",
    slug: "copywriter-strategist",
    title: "Copywriter & Strategist",
    department: "Strategy",
    employment_type: "Full-time",
    location: "Remote",
    badge: null,
    status: "published"
  },
  {
    id: "7765a0fe-d0bd-464a-9241-62ca8642203a",
    slug: "project-manager",
    title: "Project Manager",
    department: "Operations",
    employment_type: "Full-time",
    location: "Hybrid · Chennai",
    badge: null,
    status: "published"
  },
  {
    id: "bfb8a3ae-2256-4ef1-b159-374692426501",
    slug: "creative-intern",
    title: "Creative Intern",
    department: "Design",
    employment_type: "Internship",
    location: "Chennai",
    badge: "new",
    status: "published"
  }
];

export default async function CareersPage() {
  let roles: CareerRole[] = FALLBACK_ROLES;

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin
        .from("career_roles")
        .select("id, slug, title, department, employment_type, location, badge, status, created_at, updated_at")
        .eq("status", "published")
        .order("created_at", { ascending: true });

      if (!error && data && data.length > 0) {
        roles = data as CareerRole[];
      }
    } catch (err) {
      console.error("Error fetching career roles:", err);
    }
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#080417] text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-20 max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-3 font-medium flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
            CAREERS &amp; OPEN OPPORTUNITIES
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] [word-spacing:0.1em] text-white mb-6">
            Build the future of AI-driven creative engineering.
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-2xl">
            We are looking for exceptional thinkers, builders, and designers to help shape category-defining brands and intelligence systems.
          </p>
        </div>

        {/* Roles List */}
        <div className="space-y-4 mb-24">
          {roles.map((role) => (
            <CareerRoleCard key={role.id} role={role} />
          ))}
        </div>

        {/* Culture & Perks Grid */}
        <div className="pt-16 border-t border-white/[0.08]">
          <div className="mb-8">
            <span className="font-mono text-[11px] font-medium tracking-widest text-[#B896FF] uppercase">STUDIO CULTURE</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-2 tracking-[-0.01em] [word-spacing:0.08em]">Why build with Ryze Works?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/30 shadow-2xl shadow-black/50 space-y-3 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#1E085A]/60 border border-[#7042FF]/30 flex items-center justify-center text-[#B896FF] shadow-lg shadow-[#1E085A]/50">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white tracking-[-0.01em] [word-spacing:0.08em]">AI-Native Workflow</h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
                Work with bleeding-edge AI models, vector reasoning, and accelerated generative pipelines.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/30 shadow-2xl shadow-black/50 space-y-3 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#1E085A]/60 border border-[#7042FF]/30 flex items-center justify-center text-[#B896FF] shadow-lg shadow-[#1E085A]/50">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white tracking-[-0.01em] [word-spacing:0.08em]">High Autonomy</h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
                Flat hierarchy with direct ownership from inception to release with senior leadership.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/30 shadow-2xl shadow-black/50 space-y-3 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#1E085A]/60 border border-[#7042FF]/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-[#1E085A]/50">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white tracking-[-0.01em] [word-spacing:0.08em]">Competitive Equity</h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
                Comprehensive health insurance, flexible remote/hybrid setups, and performance bonuses.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/30 shadow-2xl shadow-black/50 space-y-3 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#1E085A]/60 border border-[#7042FF]/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-[#1E085A]/50">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white tracking-[-0.01em] [word-spacing:0.08em]">Craft Over Compromise</h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
                Obsessive attention to craft, typography, performance budgets, and pixel precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
