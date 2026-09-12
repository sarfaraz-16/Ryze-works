import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TESTIMONIALS_DATA } from "@/data/siteData";
import { createClient } from "@/lib/supabase/server";

export const Testimonials = async () => {
  let testimonials = TESTIMONIALS_DATA;

  try {
    const supabase = await createClient();
    if (supabase) {
      const { data } = await supabase
        .from("testimonials")
        .select("id, author_name, role, company, avatar, quote, rating, is_verified, is_featured")
        .eq("status", "approved")
        .order("is_featured", { ascending: false })
        .order("submitted_at", { ascending: false })
        .limit(6);

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
    console.warn("Testimonials section fallback:", err);
  }

  return (
    <section id="testimonials" className="py-24 max-w-7xl mx-auto px-6 relative">
      {/* Ambient baseline glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#1E085A]/30 via-transparent to-transparent pointer-events-none" />

      <SectionHeader
        eyebrow="WHAT CLIENTS SAY"
        title="Trusted by founders and teams worldwide."
        linkText="VIEW ALL TESTIMONIALS"
        linkHref="/testimonials"
      />

      {/* 3-Card Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/35 p-7 transition-all duration-300 flex flex-col justify-between hover:bg-[#131422] hover:-translate-y-1 shadow-2xl shadow-black/50 hover:shadow-[#1E085A]/40 select-none"
          >
            <div>
              {/* 5 Gold Star Cluster */}
              <div className="flex items-center gap-1.5 mb-5">
                {[...Array(item.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm font-medium text-zinc-200 leading-relaxed mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-5 border-t border-white/[0.06] flex items-center gap-3.5">
              {/* Styled avatar circle with initials & gradient rim */}
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#7042FF] to-[#1E085A] border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-[0_0_15px_rgba(112,66,255,0.3)]">
                {item.authorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{item.authorName}</span>
                  {item.isVerified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B896FF] inline" />
                  )}
                </div>
                <div className="text-[11px] font-medium text-zinc-400 mt-0.5">
                  {item.role}, {item.company}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
