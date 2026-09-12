import React from "react";
import { createAdminClient } from "@/lib/supabase/server";
import {
  TestimonialModerationClient,
  TestimonialRecord,
} from "./TestimonialModerationClient";
import { MessageSquareQuote, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const supabase = createAdminClient();

  let pendingList: TestimonialRecord[] = [];
  let processedList: TestimonialRecord[] = [];

  if (supabase) {
    try {
      const [pendingRes, processedRes] = await Promise.all([
        supabase
          .from("testimonials")
          .select("*")
          .eq("status", "pending")
          .order("submitted_at", { ascending: false }),
        supabase
          .from("testimonials")
          .select("*")
          .in("status", ["approved", "rejected"])
          .order("submitted_at", { ascending: false }),
      ]);

      pendingList = (pendingRes.data || []) as TestimonialRecord[];
      processedList = (processedRes.data || []) as TestimonialRecord[];
    } catch (err) {
      console.error("Error loading testimonials in admin desk:", err);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#B896FF] tracking-widest uppercase mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
          EDITORIAL MODERATION // VERIFICATION PIPELINE
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <MessageSquareQuote className="w-7 h-7 text-[#B896FF]" />
          <span>Testimonial Moderation Desk</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
          Verify and approve client testimonial submissions. Approved records trigger on-demand
          cache revalidation (<code className="text-[#B896FF] font-mono">revalidatePath(&apos;/&apos;)</code>, <code className="text-[#B896FF] font-mono">revalidatePath(&apos;/testimonials&apos;)</code>) and render immediately across public surfaces.
        </p>
      </div>

      {/* Moderation Desk Interactive Component */}
      <TestimonialModerationClient
        initialPending={pendingList}
        initialProcessed={processedList}
      />
    </div>
  );
}
