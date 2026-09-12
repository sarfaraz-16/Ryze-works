"use client";

import React, { useState, useTransition } from "react";
import { updateTestimonialStatus, toggleFeaturedTestimonial } from "./actions";
import {
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Loader2,
  Filter,
  Check,
  RotateCcw,
  StarOff,
} from "lucide-react";

export interface TestimonialRecord {
  id: string;
  author_name: string;
  role: string;
  company: string;
  avatar: string | null;
  quote: string;
  rating: number;
  status: "pending" | "approved" | "rejected";
  is_featured: boolean;
  is_verified: boolean;
  consent_given: boolean;
  submitted_at: string;
  reviewed_at: string | null;
}

interface Props {
  initialPending: TestimonialRecord[];
  initialProcessed: TestimonialRecord[];
}

export function TestimonialModerationClient({
  initialPending,
  initialProcessed,
}: Props) {
  const [pendingList, setPendingList] = useState<TestimonialRecord[]>(initialPending);
  const [processedList, setProcessedList] = useState<TestimonialRecord[]>(initialProcessed);
  const [activeTab, setActiveTab] = useState<"pending" | "processed">("pending");
  const [isPending, startTransition] = useTransition();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleStatusChange = async (
    item: TestimonialRecord,
    newStatus: "approved" | "rejected" | "pending"
  ) => {
    setProcessingId(item.id);
    startTransition(async () => {
      const res = await updateTestimonialStatus(item.id, newStatus);
      setProcessingId(null);

      if (!res.success) {
        showNotification("error", res.error || "Failed to update status.");
        return;
      }

      showNotification(
        "success",
        `Testimonial by "${item.author_name}" marked as ${newStatus.toUpperCase()}. Cache revalidated.`
      );

      const updatedRecord: TestimonialRecord = {
        ...item,
        status: newStatus,
        is_verified: newStatus === "approved",
        reviewed_at: new Date().toISOString(),
      };

      if (newStatus === "pending") {
        setProcessedList((prev) => prev.filter((t) => t.id !== item.id));
        setPendingList((prev) => [updatedRecord, ...prev]);
      } else {
        setPendingList((prev) => prev.filter((t) => t.id !== item.id));
        setProcessedList((prev) => [
          updatedRecord,
          ...prev.filter((t) => t.id !== item.id),
        ]);
      }
    });
  };

  const handleToggleFeatured = async (item: TestimonialRecord) => {
    const nextFeatured = !item.is_featured;
    setProcessingId(item.id);

    startTransition(async () => {
      const res = await toggleFeaturedTestimonial(item.id, nextFeatured);
      setProcessingId(null);

      if (!res.success) {
        showNotification("error", res.error || "Failed to toggle featured status.");
        return;
      }

      showNotification(
        "success",
        `Testimonial by "${item.author_name}" ${nextFeatured ? "marked as FEATURED" : "removed from featured"}.`
      );

      setProcessedList((prev) =>
        prev.map((t) =>
          t.id === item.id ? { ...t, is_featured: nextFeatured } : t
        )
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-3 transition-all ${
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
          <span className="font-medium leading-relaxed">{notification.message}</span>
        </div>
      )}

      {/* Desk Control Tabs */}
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "pending"
              ? "bg-[#7042FF] text-white shadow-lg shadow-[#7042FF]/30"
              : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08]"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Pending Verification</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === "pending"
                ? "bg-white text-[#7042FF]"
                : "bg-amber-500/20 text-amber-300"
            }`}
          >
            {pendingList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("processed")}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "processed"
              ? "bg-[#7042FF] text-white shadow-lg shadow-[#7042FF]/30"
              : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08]"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Processed Records Ledger</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === "processed"
                ? "bg-white text-[#7042FF]"
                : "bg-white/[0.1] text-zinc-300"
            }`}
          >
            {processedList.length}
          </span>
        </button>
      </div>

      {/* TAB 1: PENDING VERIFICATION QUEUE */}
      {activeTab === "pending" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>SHOWING {pendingList.length} QUEUED CLIENT SUBMISSION(S)</span>
            <span>RLS STATUS: QUARANTINED FROM PUBLIC</span>
          </div>

          {pendingList.length === 0 ? (
            <div className="rounded-3xl bg-[#0d0e17]/80 border border-white/[0.08] p-12 text-center text-zinc-400">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <div className="text-base font-semibold text-white">
                Queue Completely Verified
              </div>
              <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                All client submissions have been editorialized. New inquiries via the public
                form will automatically appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {pendingList.map((item) => {
                const isWorking = processingId === item.id;
                return (
                  <div
                    key={item.id}
                    className="rounded-3xl bg-[#0d0e17]/90 backdrop-blur-md border border-amber-500/20 hover:border-amber-500/40 p-6 sm:p-7 flex flex-col justify-between shadow-2xl shadow-black/50 transition-all"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-mono uppercase font-bold">
                          <Clock className="w-3 h-3" />
                          <span>Needs Approval</span>
                        </div>
                      </div>

                      {/* Quote Content */}
                      <blockquote className="text-sm font-medium text-zinc-200 leading-relaxed italic mb-6">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>
                    </div>

                    <div>
                      {/* Author Details & Consent Record */}
                      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between mb-5">
                        <div>
                          <div className="text-xs font-bold text-white">
                            {item.author_name}
                          </div>
                          <div className="text-[11px] text-zinc-400">
                            {item.role}, {item.company}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-mono text-zinc-500">
                            {new Date(item.submitted_at).toLocaleDateString()}
                          </div>
                          <div className="text-[10px] font-mono text-emerald-400 flex items-center justify-end gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Consent Verified</span>
                          </div>
                        </div>
                      </div>

                      {/* Decision Action Bar */}
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleStatusChange(item, "approved")}
                          disabled={isWorking}
                          className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
                        >
                          {isWorking ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Check className="w-3.5 h-3.5" />
                          )}
                          <span>Approve &amp; Publish</span>
                        </button>

                        <button
                          onClick={() => handleStatusChange(item, "rejected")}
                          disabled={isWorking}
                          className="py-2.5 px-4 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                        >
                          {isWorking ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5" />
                          )}
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PROCESSED RECORDS LEDGER */}
      {activeTab === "processed" && (
        <div className="rounded-3xl bg-[#0d0e17]/90 border border-white/[0.08] overflow-hidden shadow-2xl shadow-black/60">
          <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Editorial Audit Ledger</h2>
              <p className="text-xs text-zinc-400">
                Historic record of all approved and rejected client quotes.
              </p>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              {processedList.length} TOTAL RECORDS
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#080417] text-zinc-400 font-mono uppercase text-[10px] border-b border-white/[0.06]">
                <tr>
                  <th className="py-3.5 px-6">Client / Author</th>
                  <th className="py-3.5 px-6">Quote Snippet</th>
                  <th className="py-3.5 px-6">Rating</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Featured</th>
                  <th className="py-3.5 px-6 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {processedList.map((item) => {
                  const isWorking = processingId === item.id;
                  const isApproved = item.status === "approved";
                  return (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="font-semibold text-white flex items-center gap-1.5">
                          <span>{item.author_name}</span>
                          {item.is_verified && (
                            <CheckCircle2 className="w-3 h-3 text-[#B896FF]" />
                          )}
                        </div>
                        <div className="text-[11px] text-zinc-400">
                          {item.role}, {item.company}
                        </div>
                      </td>

                      <td className="py-4 px-6 max-w-xs truncate text-zinc-300 italic">
                        &ldquo;{item.quote}&rdquo;
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap font-mono text-amber-400">
                        ★ {item.rating}/5
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap">
                        {isApproved ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold uppercase">
                            Published
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-[10px] font-mono font-bold uppercase">
                            Rejected
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap">
                        {isApproved && (
                          <button
                            onClick={() => handleToggleFeatured(item)}
                            disabled={isWorking}
                            className={`text-[10px] font-mono px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                              item.is_featured
                                ? "bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold"
                                : "bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:text-white"
                            }`}
                          >
                            {item.is_featured ? "★ FEATURED" : "STANDARD"}
                          </button>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right whitespace-nowrap space-x-2">
                        {isApproved ? (
                          <button
                            onClick={() => handleStatusChange(item, "rejected")}
                            disabled={isWorking}
                            className="text-[11px] text-red-400 hover:text-red-300 hover:underline cursor-pointer"
                          >
                            Unpublish
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusChange(item, "approved")}
                            disabled={isWorking}
                            className="text-[11px] text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer"
                          >
                            Approve
                          </button>
                        )}

                        <button
                          onClick={() => handleStatusChange(item, "pending")}
                          disabled={isWorking}
                          className="text-[11px] text-zinc-400 hover:text-white hover:underline cursor-pointer ml-2"
                        >
                          Re-queue
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
