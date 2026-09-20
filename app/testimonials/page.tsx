import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { TESTIMONIALS_DATA } from "@/data/siteData";
import { createClient } from "@/lib/supabase/server";
import { Sparkles } from "lucide-react";
import { TestimonialsSubmissionForm } from "./TestimonialsSubmissionForm";
import { TestimonialCard } from "./TestimonialCard";

export const revalidate = 3600;

export default async function TestimonialsPage() {
  let testimonials = TESTIMONIALS_DATA;

  try {
    const supabase = await createClient();
    if (supabase) {
      const { data } = await supabase
        .from("testimonials")
        .select("id, author_name, role, company, avatar, quote, rating, is_verified, is_featured")
        .eq("status", "approved")
        .order("is_featured", { ascending: false })
        .order("submitted_at", { ascending: false });

      if (data && data.length > 0) {
        testimonials = data
          .filter(item => 
            !item.author_name.toLowerCase().includes("test") && 
            !item.author_name.toLowerCase().includes("agent") &&
            !item.quote.toLowerCase().includes("test")
          )
          .map((item) => ({
          id: item.id,
          authorName: item.author_name,
          role: item.role,
          company: item.company,
          avatar: item.avatar || "",
          quote: item.quote,
          rating: item.rating || 5,
          isVerified: item.is_verified ?? true,
          status: "approved",
        }));
      }
    }
  } catch (err) {
    console.warn("TestimonialsPage fallback:", err);
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#030014]/40 text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-3 font-medium flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
            CLIENT INTEGRITY &amp; VERIFICATION
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] [word-spacing:0.1em] text-white mb-6">
            Trusted by founders and teams worldwide.
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-2xl">
            Every quote displayed here is backed by written client consent and an approved editorial verification record.
          </p>
        </div>

        {/* Live Approved Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-24">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>

        {/* Public Submission Form Boundary */}
        <TestimonialsSubmissionForm />
      </section>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
