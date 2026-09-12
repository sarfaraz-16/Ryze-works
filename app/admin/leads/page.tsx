import React from "react";
import { createAdminClient } from "@/lib/supabase/server";
import { LeadsDeskClient, LeadRecord } from "./LeadsDeskClient";
import { Inbox, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const supabase = createAdminClient();

  let leads: LeadRecord[] = [];
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        leads = data as LeadRecord[];
      }
    } catch (err) {
      console.error("Error loading leads in admin desk:", err);
    }
  }

  const newCount = leads.filter((l) => l.status === "new").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#B896FF] tracking-widest uppercase mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
          COMMERCIAL &amp; INTAKE CRM // CENTRALIZED PIPELINE
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Inbox className="w-7 h-7 text-[#B896FF]" />
          <span>Leads &amp; Commercial Pipeline Desk</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
          Centralized CRM triage for project intakes, advertiser sponsorship requests, research whitepaper downloads, and newsletter leads.
          {newCount > 0 && (
            <span className="text-emerald-400 font-semibold ml-1">
              Currently {newCount} new intake record{newCount > 1 ? "s" : ""} awaiting staff review.
            </span>
          )}
        </p>
      </div>

      {/* Interactive Desk Client */}
      <LeadsDeskClient initialLeads={leads} />
    </div>
  );
}
