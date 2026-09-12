import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { TESTIMONIALS_DATA } from "@/data/siteData";
import { createClient } from "@/lib/supabase/server";
import { Star, CheckCircle2, Sparkles } from "lucide-react";
import { TestimonialsSubmissionForm } from "./TestimonialsSubmissionForm";

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
        testimonials = data.map((item) => ({
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
    <main className="min-h-[calc(100vh-80px)] bg-[#080417] text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/30 p-8 sm:p-10 flex flex-col justify-between shadow-2xl shadow-black/50 transition-all duration-300 hover:shadow-[#7042FF]/10 select-none"
            >
              <div>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm sm:text-base font-medium text-zinc-200 leading-relaxed mb-8 italic">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-6 border-t border-white/[0.08] flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#7042FF] to-[#4318D1] border border-[#B896FF]/30 flex items-center justify-center font-mono text-xs font-bold text-white shrink-0 shadow-lg shadow-[#7042FF]/30">
                  {item.authorName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{item.authorName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 mt-0.5">
                    {item.role}, {item.company}
                  </div>
                </div>
              </div>
            </div>
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
