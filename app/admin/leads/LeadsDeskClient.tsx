"use client";

import React, { useState, useTransition } from "react";
import { updateLeadStatus, deleteLead, LeadLifecycleStatus } from "./actions";
import {
  Inbox,
  Search,
  Filter,
  Eye,
  Trash2,
  CheckCircle2,
  Clock,
  Briefcase,
  Megaphone,
  FileText,
  Mail,
  Building,
  Globe,
  Sparkles,
  Loader2,
  X,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export interface LeadRecord {
  id: string;
  type: string;
  name: string;
  email: string;
  company: string | null;
  service_interest: string | null;
  message: string;
  ai_brief: any | null;
  source: string | null;
  utm_params: any | null;
  page_url: string | null;
  status: LeadLifecycleStatus | string;
  created_at: string;
}

interface Props {
  initialLeads: LeadRecord[];
}

const LIFECYCLE_STATUSES: LeadLifecycleStatus[] = [
  "new",
  "reviewing",
  "contacted",
  "qualified",
  "closed",
];

export function LeadsDeskClient({ initialLeads }: Props) {
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeads);
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [inspectingLead, setInspectingLead] = useState<LeadRecord | null>(null);
  const [isPending, startTransition] = useTransition();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const tabs = ["ALL", "PROJECT", "ADVERTISER", "GENERAL", "NEWSLETTER"];

  const handleStatusChange = async (leadId: string, newStatus: LeadLifecycleStatus) => {
    setUpdatingId(leadId);
    startTransition(async () => {
      const res = await updateLeadStatus(leadId, newStatus);
      setUpdatingId(null);
      if (res.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
        if (inspectingLead && inspectingLead.id === leadId) {
          setInspectingLead({ ...inspectingLead, status: newStatus });
        }
        setNotification(`Lead status updated to ${newStatus.toUpperCase()}`);
        setTimeout(() => setNotification(null), 4000);
      }
    });
  };

  const filtered = leads.filter((lead) => {
    const matchesTab =
      activeTab === "ALL" ? true : lead.type?.toUpperCase() === activeTab;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      lead.name?.toLowerCase().includes(term) ||
      lead.email?.toLowerCase().includes(term) ||
      lead.company?.toLowerCase().includes(term) ||
      lead.service_interest?.toLowerCase().includes(term);
    return matchesTab && matchesSearch;
  });

  const getTypeBadge = (type: string) => {
    const t = type?.toLowerCase();
    if (t === "advertiser") {
      return (
        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold uppercase flex items-center gap-1">
          <Megaphone className="w-3 h-3" /> ADVERTISER
        </span>
      );
    }
    if (t === "project") {
      return (
        <span className="px-2.5 py-0.5 rounded-full bg-[#7042FF]/15 border border-[#7042FF]/30 text-[#B896FF] text-[10px] font-mono font-bold uppercase flex items-center gap-1">
          <Briefcase className="w-3 h-3" /> PROJECT INTAKE
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[10px] font-mono font-bold uppercase flex items-center gap-1">
        <FileText className="w-3 h-3" /> GENERAL / REPORT
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return "bg-emerald-500/15 border-emerald-500/30 text-emerald-300";
      case "reviewing":
        return "bg-blue-500/15 border-blue-500/30 text-blue-300";
      case "contacted":
        return "bg-purple-500/15 border-purple-500/30 text-purple-300";
      case "qualified":
        return "bg-amber-500/15 border-amber-500/30 text-amber-300";
      case "closed":
        return "bg-zinc-500/15 border-zinc-500/30 text-zinc-400";
      default:
        return "bg-zinc-500/15 border-zinc-500/30 text-zinc-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        {/* Type Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => {
            const count =
              tab === "ALL"
                ? leads.length
                : leads.filter((l) => l.type?.toUpperCase() === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === tab
                    ? "bg-[#7042FF] text-white shadow-md shadow-[#7042FF]/20"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeTab === tab
                      ? "bg-white text-[#7042FF]"
                      : "bg-white/[0.1] text-zinc-300"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads, email, company..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#080417] border border-white/[0.1] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#7042FF] transition-colors"
          />
        </div>
      </div>

      {/* Leads CRM Table */}
      <div className="rounded-3xl bg-[#0d0e17]/90 border border-white/[0.08] overflow-hidden shadow-2xl shadow-black/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#080417] text-zinc-400 font-mono uppercase text-[10px] border-b border-white/[0.06]">
              <tr>
                <th className="py-3.5 px-6">Lead Contact &amp; Company</th>
                <th className="py-3.5 px-6">Intake Channel</th>
                <th className="py-3.5 px-6">Interest / Scope</th>
                <th className="py-3.5 px-6">Lifecycle Status</th>
                <th className="py-3.5 px-6">Date Submitted</th>
                <th className="py-3.5 px-6 text-right">Inspect Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    No leads found matching current criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Contact & Company */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="font-semibold text-white">{item.name}</div>
                      <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3 h-3 text-zinc-500" />
                        <span>{item.email}</span>
                      </div>
                      {item.company && (
                        <div className="text-[10px] font-mono text-zinc-500 mt-0.5">
                          {item.company}
                        </div>
                      )}
                    </td>

                    {/* Intake Channel */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      {getTypeBadge(item.type)}
                    </td>

                    {/* Interest / Scope */}
                    <td className="py-4 px-6 max-w-xs truncate text-zinc-300">
                      {item.service_interest || "General inquiry"}
                    </td>

                    {/* Lifecycle Status Dropdown */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <select
                        value={item.status || "new"}
                        disabled={updatingId === item.id}
                        onChange={(e) =>
                          handleStatusChange(
                            item.id,
                            e.target.value as LeadLifecycleStatus
                          )
                        }
                        className={`text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none transition-colors ${getStatusBadge(
                          item.status
                        )}`}
                      >
                        {LIFECYCLE_STATUSES.map((st) => (
                          <option key={st} value={st} className="bg-[#080417] text-white">
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Date Submitted */}
                    <td className="py-4 px-6 whitespace-nowrap font-mono text-[11px] text-zinc-400">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        onClick={() => setInspectingLead(item)}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-zinc-300 hover:text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* INSPECTION MODAL DRAWER */}
      {inspectingLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d0e17] border border-white/[0.1] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl shadow-black/90 text-zinc-100">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {getTypeBadge(inspectingLead.type)}
                  <span className="text-xs font-mono text-zinc-500">
                    ID: {inspectingLead.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {inspectingLead.name}
                </h3>
                <p className="text-xs text-zinc-400">
                  {inspectingLead.company ? `${inspectingLead.company} • ` : ""}
                  {inspectingLead.email}
                </p>
              </div>
              <button
                onClick={() => setInspectingLead(null)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lifecycle Stage Switcher */}
            <div className="p-4 rounded-2xl bg-[#080417] border border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-zinc-400">
                Pipeline Lifecycle Stage:
              </span>
              <div className="flex items-center gap-1.5">
                {LIFECYCLE_STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(inspectingLead.id, s)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase font-bold transition-all cursor-pointer ${
                      inspectingLead.status === s
                        ? "bg-[#7042FF] text-white"
                        : "bg-white/[0.04] text-zinc-400 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Scope / Service Interest */}
            <div>
              <div className="text-[11px] font-mono uppercase text-zinc-400 mb-1">
                Requested Scope &amp; Service:
              </div>
              <div className="text-sm font-semibold text-white">
                {inspectingLead.service_interest || "General Commercial Outreach"}
              </div>
            </div>

            {/* Full Message Body */}
            <div>
              <div className="text-[11px] font-mono uppercase text-zinc-400 mb-1">
                Message Payload:
              </div>
              <div className="p-4 rounded-xl bg-[#080417] border border-white/[0.06] text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap">
                {inspectingLead.message || "No message body provided."}
              </div>
            </div>

            {/* AI Brief JSON & Structured Breakdown if attached */}
            {inspectingLead.ai_brief && (
              <div className="space-y-3">
                <div className="text-[11px] font-mono uppercase text-[#B896FF] mb-1 flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Grounded AI Scope Assessment:
                </div>

                {/* Structured Overview Card */}
                {typeof inspectingLead.ai_brief === "object" && (
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-violet-500/20 text-xs space-y-2.5">
                    {inspectingLead.ai_brief.company && (
                      <div>
                        <span className="text-zinc-500 font-mono text-[10px] uppercase block">Target Entity:</span>
                        <span className="font-semibold text-white">{inspectingLead.ai_brief.company} {inspectingLead.ai_brief.industry ? `(${inspectingLead.ai_brief.industry})` : ""}</span>
                      </div>
                    )}
                    {inspectingLead.ai_brief.objective && (
                      <div>
                        <span className="text-zinc-500 font-mono text-[10px] uppercase block">Core Objective:</span>
                        <span className="text-zinc-200">{inspectingLead.ai_brief.objective}</span>
                      </div>
                    )}
                    {inspectingLead.ai_brief.challenge && (
                      <div>
                        <span className="text-zinc-500 font-mono text-[10px] uppercase block">Key Architectural Challenge:</span>
                        <span className="text-zinc-300">{inspectingLead.ai_brief.challenge}</span>
                      </div>
                    )}
                    {inspectingLead.ai_brief.recommended_services && (
                      <div>
                        <span className="text-zinc-500 font-mono text-[10px] uppercase block mb-1">Recommended Services:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {(Array.isArray(inspectingLead.ai_brief.recommended_services)
                            ? inspectingLead.ai_brief.recommended_services
                            : [inspectingLead.ai_brief.recommended_services]
                          ).map((svc: string, i: number) => (
                            <span key={i} className="px-2 py-0.5 rounded-md bg-[#7042FF]/20 text-[#B896FF] text-[10px] font-mono border border-[#7042FF]/30">
                              {svc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Full JSON Payload */}
                <pre className="p-4 rounded-xl bg-[#080417] border border-white/[0.06] text-[11px] font-mono text-zinc-300 overflow-x-auto">
                  {JSON.stringify(inspectingLead.ai_brief, null, 2)}
                </pre>
              </div>
            )}

            {/* UTM Parameters & Source */}
            {(inspectingLead.utm_params || inspectingLead.source) && (
              <div>
                <div className="text-[11px] font-mono uppercase text-zinc-400 mb-1">
                  Campaign Telemetry &amp; Referrer:
                </div>
                <div className="p-3 rounded-xl bg-[#080417] border border-white/[0.06] text-[11px] font-mono text-zinc-400 space-y-1">
                  <div>Source Channel: {inspectingLead.source || "Direct Web"}</div>
                  {inspectingLead.utm_params && (
                    <div>UTM Metadata: {JSON.stringify(inspectingLead.utm_params)}</div>
                  )}
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <a
                href={`mailto:${inspectingLead.email}`}
                className="px-4 py-2 rounded-xl bg-[#7042FF] hover:bg-[#7E52FF] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact via Email</span>
              </a>

              <button
                onClick={() => setInspectingLead(null)}
                className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
