import React from "react";
import { createAdminClient } from "@/lib/supabase/server";
import { ApplicationsDeskClient, JobApplicationRecord } from "./ApplicationsDeskClient";
import { Briefcase, Sparkles, UserCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  const supabase = createAdminClient();

  let applications: JobApplicationRecord[] = [];
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("job_applications")
        .select("*, career_roles(id, title, department)")
        .order("created_at", { ascending: false });

      if (!error && data) {
        applications = data as JobApplicationRecord[];
      }
    } catch (err) {
      console.error("Error loading job applications in admin desk:", err);
    }
  }

  const pendingCount = applications.filter(
    (app) => app.status === "submitted" || app.status === "applied"
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#B896FF] tracking-widest uppercase mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
          TALENT ACQUISITION // CANDIDATE DOSSIERS
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Briefcase className="w-7 h-7 text-[#B896FF]" />
          <span>Talent &amp; Applicant Review Desk</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
          Screen candidate applications, evaluate role matches, inspect candidate details, and securely access private CV documents via authenticated 300-second tokenized URLs.
          {pendingCount > 0 && (
            <span className="text-amber-400 font-semibold ml-1">
              Currently {pendingCount} candidate dossier{pendingCount > 1 ? "s" : ""} awaiting review.
            </span>
          )}
        </p>
      </div>

      {/* Interactive Desk Client */}
      <ApplicationsDeskClient initialApplications={applications} />
    </div>
  );
}
