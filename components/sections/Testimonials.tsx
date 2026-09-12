import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TESTIMONIALS_DATA } from "@/data/siteData";

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 max-w-7xl mx-auto px-6">
      <SectionHeader
        eyebrow="WHAT CLIENTS SAY"
        title="Trusted by founders and teams worldwide."
        linkText="VIEW ALL TESTIMONIALS"
        linkHref="#testimonials"
      />

      {/* 3-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS_DATA.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-[#0c0d16]/80 border border-white/[0.08] hover:border-purple-500/40 p-7 transition-all duration-300 flex flex-col justify-between hover:bg-[#111320]"
          >
            <div>
              {/* 5 Gold Stars */}
              <div className="flex items-center gap-1 mb-5">
                {[...Array(item.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm font-medium text-white/90 leading-relaxed mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-5 border-t border-white/[0.06] flex items-center gap-3.5">
              {/* Styled avatar circle with initials */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-800 to-indigo-600 border border-white/20 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-md">
                {item.authorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{item.authorName}</span>
                  {item.isVerified && (
                    <CheckCircle2 className="w-3 h-3 text-purple-400 inline" />
                  )}
                </div>
                <div className="text-[11px] text-white/50">
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
