"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Briefcase, Clock, Send, CheckCircle2, AlertCircle, FileText } from "lucide-react";

export interface CareerRole {
  id: string;
  slug: string;
  title: string;
  department: string | null;
  employment_type: string | null;
  location: string | null;
  badge: string | null;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export function CareerRoleCard({ role }: { role: CareerRole }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    applicant_name: "",
    email: ""
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const renderBadge = (badge: string | null) => {
    if (!badge) return null;
    const lower = badge.toLowerCase();
    if (lower === "hot") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wider uppercase bg-rose-950/60 text-rose-400 border border-rose-800/40 shadow-sm">
          HOT
        </span>
      );
    }
    if (lower === "new") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wider uppercase bg-[#1E085A]/70 text-[#B896FF] border border-[#7042FF]/40 shadow-sm">
          NEW
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wider uppercase bg-white/[0.06] text-zinc-300 border border-white/10 shadow-sm">
        {badge}
      </span>
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      const data = new FormData();
      data.append("applicant_name", formData.applicant_name);
      data.append("email", formData.email);
      data.append("role_id", role.id);
      if (resumeFile) {
        data.append("resume", resumeFile);
      }

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: data
      });

      const json = await res.json();

      if (!res.ok) {
        setSubmitStatus("error");
        setStatusMessage(json.error || "Failed to submit application.");
      } else {
        setSubmitStatus("success");
        setStatusMessage(json.message || "Thank you! Your application has been submitted successfully.");
        setFormData({ applicant_name: "", email: "" });
        setResumeFile(null);
      }
    } catch (err: any) {
      setSubmitStatus("error");
      setStatusMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0B0813]/75 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-7 sm:p-9 transition-all duration-300 relative group overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] mb-6">
      {/* Main Row */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
      >
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-2xl font-bold text-white group-hover:text-violet-200 transition-colors tracking-tight">
              {role.title}
            </h3>
            {renderBadge(role.badge)}
            <div className="flex items-center gap-1.5 ml-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Hiring Now</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/10 text-cyan-300 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              {role.department || "General"}
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/10 text-cyan-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {role.employment_type || "Full-time"}
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/10 text-cyan-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {role.location || "Remote"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-[#B896FF]">
            {isExpanded ? "Collapse" : "View & Apply"}
          </span>
          <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Expand Affordance Details */}
      {isExpanded && (
        <div className="pt-6 mt-6 border-t border-white/10 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Role Metadata & Description */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-sm text-zinc-300 leading-relaxed font-sans mt-3 mb-6 space-y-4">
                <p>
                  Join our cross-functional studio partnering with category-defining brands to shape AI-native digital systems, brand identities, and high-velocity engineering solutions.
                </p>
                <p>
                  In this role, you will collaborate directly with our design and engineering leadership, driving end-to-end execution with high autonomy and craft precision.
                </p>
              </div>

              <div className="pt-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#B896FF] font-medium">
                  Role ID: <code className="text-zinc-500">{role.id}</code>
                </span>
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-6 bg-white/[0.02] border border-white/10 rounded-2xl p-5">
              <h4 className="text-base font-semibold text-white mb-4">
                Apply for {role.title}
              </h4>

              {submitStatus === "success" ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-emerald-200">Application Submitted</p>
                    <p className="mt-1 text-emerald-300/80 text-xs">{statusMessage}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitStatus === "error" && (
                    <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{statusMessage}</span>
                    </div>
                  )}

                  <div>
                    <label className="block font-mono text-[11px] font-medium text-zinc-300 mb-1.5 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.applicant_name}
                      onChange={(e) => setFormData({ ...formData, applicant_name: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/70 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 transition-all outline-none mb-3"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] font-medium text-zinc-300 mb-1.5 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/70 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 transition-all outline-none mb-3"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] font-medium text-zinc-300 mb-1.5 uppercase tracking-wider">
                      Resume (PDF, DOC, DOCX up to 5MB)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileChange}
                        className="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-3.5 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-[#1E085A]/70 file:text-[#B896FF] hover:file:bg-[#7042FF]/30 cursor-pointer"
                      />
                    </div>
                    {resumeFile && (
                      <p className="mt-1.5 text-xs text-emerald-400 flex items-center gap-1 font-mono">
                        <FileText className="w-3.5 h-3.5" /> {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl py-3 shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all flex items-center justify-center gap-2 group text-xs sm:text-sm disabled:opacity-50 mt-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      "Submitting Application..."
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
