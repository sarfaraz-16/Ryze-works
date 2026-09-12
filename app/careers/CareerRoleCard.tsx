"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Briefcase, Clock, Send, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-rose-950/60 text-rose-400 border border-rose-800/40 shadow-sm">
          HOT
        </span>
      );
    }
    if (lower === "new") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-purple-950/60 text-purple-300 border border-purple-800/40 shadow-sm">
          NEW
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/[0.06] text-white/70 border border-white/10 shadow-sm">
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
    <div className="rounded-2xl bg-[#0c0d16]/80 border border-white/[0.08] hover:border-purple-500/40 transition-all duration-300 overflow-hidden hover:bg-[#111320]">
      {/* Main Row */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
      >
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight hover:text-purple-300 transition-colors">
              {role.title}
            </h3>
            {renderBadge(role.badge)}
          </div>
          <p className="text-sm sm:text-base text-white/50 font-medium">
            {role.department || "General"} · {role.employment_type || "Full-time"} · {role.location || "Remote"}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400/80">
            {isExpanded ? "Collapse" : "View & Apply"}
          </span>
          <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Expand Affordance Details */}
      {isExpanded && (
        <div className="px-6 pb-8 sm:px-8 pt-2 border-t border-white/[0.06] bg-black/20 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            {/* Role Metadata & Description */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap gap-4 text-xs text-white/60">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10">
                  <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                  {role.department || "General"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-pink-400" />
                  {role.employment_type || "Full-time"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {role.location || "Remote"}
                </span>
              </div>

              <div className="space-y-3 text-sm text-white/70 leading-relaxed">
                <p>
                  Join our cross-functional studio partnering with category-defining brands to shape AI-native digital systems, brand identities, and high-velocity engineering solutions.
                </p>
                <p>
                  In this role, you will collaborate directly with our design and engineering leadership, driving end-to-end execution with high autonomy and craft precision.
                </p>
              </div>

              <div className="pt-2">
                <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">
                  Role ID: <code className="text-white/40 font-mono">{role.id}</code>
                </span>
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-6 rounded-xl bg-white/[0.02] border border-white/10 p-6">
              <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span>Apply for {role.title}</span>
              </h4>

              {submitStatus === "success" ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-emerald-200">Application Submitted</p>
                    <p className="mt-1 text-emerald-300/80">{statusMessage}</p>
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
                    <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.applicant_name}
                      onChange={(e) => setFormData({ ...formData, applicant_name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">
                      Resume (PDF, DOC, DOCX up to 5MB)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileChange}
                        className="w-full text-xs text-white/60 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-950/50 file:text-purple-300 hover:file:bg-purple-900/50 cursor-pointer"
                      />
                    </div>
                    {resumeFile && (
                      <p className="mt-1 text-xs text-emerald-400/80 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" /> {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full justify-center mt-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Submitting Application..."
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send className="w-4 h-4 ml-1.5" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
