"use client";

import React, { useState, useTransition } from "react";
import {
  getSignedResumeUrl,
  updateApplicationStatus,
  ApplicationLifecycleStatus,
} from "./actions";
import {
  Briefcase,
  Download,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  Calendar,
  ExternalLink,
  Shield,
  FileText,
  Clock,
  Search,
} from "lucide-react";

export interface JobApplicationRecord {
  id: string;
  applicant_name: string;
  email: string;
  role_id: string | null;
  resume_path: string | null;
  status: ApplicationLifecycleStatus | string;
  created_at: string;
  career_roles?: {
    id: string;
    title: string;
    department: string | null;
  } | null;
}

interface Props {
  initialApplications: JobApplicationRecord[];
}

const STATUS_LABELS: Record<string, { label: string; style: string }> = {
  submitted: {
    label: "Applied",
    style: "bg-amber-500/15 border-amber-500/30 text-amber-300",
  },
  reviewing: {
    label: "Under Review",
    style: "bg-blue-500/15 border-blue-500/30 text-blue-300",
  },
  hired: {
    label: "Offered / Hired",
    style: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
  },
  rejected: {
    label: "Declined",
    style: "bg-red-500/15 border-red-500/30 text-red-300",
  },
};

export function ApplicationsDeskClient({ initialApplications }: Props) {
  const [applications, setApplications] =
    useState<JobApplicationRecord[]>(initialApplications);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [downloadingPath, setDownloadingPath] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleDownloadResume = async (resumePath: string | null, applicantName: string) => {
    if (!resumePath) {
      showNotification("error", `No resume on file for ${applicantName}.`);
      return;
    }

    setDownloadingPath(resumePath);
    try {
      const res = await getSignedResumeUrl(resumePath);
      if (!res.success || !res.signedUrl) {
        showNotification("error", res.error || "Failed to generate secure resume URL.");
        return;
      }

      showNotification(
        "success",
        `Authorized 5-minute signed link generated for ${applicantName}'s resume.`
      );

      // Open signed URL in new tab
      window.open(res.signedUrl, "_blank", "noopener,noreferrer");
    } catch (err: any) {
      showNotification("error", err.message || "Failed to retrieve resume.");
    } finally {
      setDownloadingPath(null);
    }
  };

  const handleStatusChange = async (
    id: string,
    newStatus: ApplicationLifecycleStatus
  ) => {
    setUpdatingId(id);
    startTransition(async () => {
      const res = await updateApplicationStatus(id, newStatus);
      setUpdatingId(null);

      if (!res.success) {
        showNotification("error", res.error || "Failed to update status.");
        return;
      }

      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
      showNotification("success", `Candidate status updated to ${newStatus.toUpperCase()}.`);
    });
  };

  const filtered = applications.filter((app) => {
    const matchesStatus =
      filterStatus === "ALL" ? true : app.status === filterStatus;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      app.applicant_name?.toLowerCase().includes(term) ||
      app.email?.toLowerCase().includes(term) ||
      app.career_roles?.title?.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center gap-2 transition-all ${
            notification.type === "success"
              ? "bg-emerald-950/40 border border-emerald-500/30 text-emerald-200"
              : "bg-red-950/40 border border-red-500/30 text-red-200"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div className="flex flex-wrap items-center gap-2">
          {["ALL", "submitted", "reviewing", "hired", "rejected"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                filterStatus === st
                  ? "bg-[#7042FF] text-white shadow-md shadow-[#7042FF]/20"
                  : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {st === "ALL"
                ? `ALL (${applications.length})`
                : `${STATUS_LABELS[st]?.label || st} (${
                    applications.filter((a) => a.status === st).length
                  })`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidate name, role..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#080417] border border-white/[0.1] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#7042FF] transition-colors"
          />
        </div>
      </div>

      {/* Applications Table */}
      <div className="rounded-3xl bg-[#0d0e17]/90 border border-white/[0.08] overflow-hidden shadow-2xl shadow-black/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#080417] text-zinc-400 font-mono uppercase text-[10px] border-b border-white/[0.06]">
              <tr>
                <th className="py-3.5 px-6">Candidate</th>
                <th className="py-3.5 px-6">Role Applied For</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Date Applied</th>
                <th className="py-3.5 px-6 text-right">Secure Resume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-500">
                    No candidate applications match the selected criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const isDownloading = downloadingPath === item.resume_path;
                  const isUpdating = updatingId === item.id;
                  const roleTitle = item.career_roles?.title || "General Application";
                  const department = item.career_roles?.department || "Engineering";

                  return (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Candidate */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="font-semibold text-white text-sm">
                          {item.applicant_name}
                        </div>
                        <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
                          <Mail className="w-3 h-3 text-zinc-500" />
                          <span>{item.email}</span>
                        </div>
                      </td>

                      {/* Role Applied For */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-zinc-200 font-medium">{roleTitle}</div>
                        <div className="text-[10px] font-mono text-zinc-500 mt-0.5">
                          {department}
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <select
                          value={item.status || "submitted"}
                          disabled={isUpdating}
                          onChange={(e) =>
                            handleStatusChange(
                              item.id,
                              e.target.value as ApplicationLifecycleStatus
                            )
                          }
                          className={`text-[10px] font-mono uppercase font-bold px-3 py-1 rounded-full border cursor-pointer focus:outline-none transition-colors ${
                            STATUS_LABELS[item.status]?.style ||
                            "bg-zinc-500/15 border-zinc-500/30 text-zinc-300"
                          }`}
                        >
                          <option value="submitted" className="bg-[#080417] text-white">
                            Applied (Submitted)
                          </option>
                          <option value="reviewing" className="bg-[#080417] text-white">
                            Under Review
                          </option>
                          <option value="hired" className="bg-[#080417] text-white">
                            Offered / Hired
                          </option>
                          <option value="rejected" className="bg-[#080417] text-white">
                            Declined
                          </option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 whitespace-nowrap font-mono text-[11px] text-zinc-400">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>

                      {/* Resume Action */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        {item.resume_path ? (
                          <button
                            onClick={() =>
                              handleDownloadResume(item.resume_path, item.applicant_name)
                            }
                            disabled={isDownloading}
                            className="px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-[#7042FF] border border-white/[0.1] hover:border-transparent text-zinc-200 hover:text-white text-xs font-semibold inline-flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                          >
                            {isDownloading ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Generating 300s Link...</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5" />
                                <span>Download Resume (Signed)</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <span className="text-[11px] font-mono text-zinc-600 italic">
                            No file attached
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
