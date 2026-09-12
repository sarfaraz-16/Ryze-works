"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  MessageSquareQuote,
  Inbox,
  FileText,
  Briefcase,
  ExternalLink,
  LogOut,
  Shield,
  Menu,
  X,
  Sparkles,
  Layers,
} from "lucide-react";

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  // If on login page, render clean page without admin shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      setSigningOut(false);
    }
  };

  const navItems = [
    {
      label: "Command Overview",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      label: "Testimonials Desk",
      href: "/admin/testimonials",
      icon: MessageSquareQuote,
      active: pathname.startsWith("/admin/testimonials"),
    },
    {
      label: "Leads & Briefs",
      href: "/admin/leads",
      icon: Inbox,
      active: pathname.startsWith("/admin/leads"),
    },
    {
      label: "Job Applications",
      href: "/admin/careers",
      icon: Briefcase,
      active: pathname.startsWith("/admin/careers"),
    },
    {
      label: "Articles / Insights",
      href: "/admin/articles",
      icon: FileText,
      active: pathname.startsWith("/admin/articles"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#030014] text-zinc-100 flex flex-col md:flex-row selection:bg-[#7042FF]/30 selection:text-[#B896FF] relative overflow-hidden">
      {/* Ambient Cosmic Radial Glows */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(112,66,255,0.14),transparent_70%)] z-0" />
      <div className="pointer-events-none fixed -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#7042FF]/08 blur-3xl z-0" />

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0B071E]/90 backdrop-blur-xl border-b border-white/[0.06] relative z-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="font-bold text-sm text-white tracking-wider font-mono">
            RYZE // COMMAND
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-zinc-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-full md:w-64 bg-[#0B071E]/80 backdrop-blur-xl border-r border-white/5 md:border-violet-500/15 flex flex-col justify-between p-5 md:min-h-screen shrink-0 relative z-10 ${
          mobileMenuOpen ? "block" : "hidden md:flex"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="pb-6 mb-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7042FF] via-[#5D30DF] to-[#1E085A] flex items-center justify-center text-white shadow-lg shadow-[#7042FF]/30 border border-violet-400/20">
                <Shield className="w-4 h-4 text-violet-200" />
              </div>
              <div>
                <div className="font-bold text-sm tracking-tight text-white font-display">RYZE WORKS</div>
                <div className="text-[10px] font-mono text-[#B896FF] tracking-widest uppercase">
                  Command Center
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 px-2.5 py-1 rounded-md bg-white/[0.02] border border-violet-500/20 text-[11px] text-zinc-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
              <span className="text-zinc-300">LIVE CONTROL // PROD</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-violet-300/60 px-3 mb-2 font-semibold">
              Editorial Operations
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    item.active
                      ? "bg-gradient-to-r from-violet-600/20 to-purple-600/10 text-white border border-violet-500/30 shadow-[0_0_20px_rgba(124,58,237,0.15)] font-semibold"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {item.active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
                  )}
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      item.active ? "text-[#B896FF]" : "text-neutral-500 group-hover:text-neutral-300"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Staff & Controls */}
        <div className="pt-6 border-t border-white/[0.06] space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors border border-transparent hover:border-white/5"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
              <span>Public Website</span>
            </span>
            <span className="text-[10px] font-mono text-violet-400">VIEW →</span>
          </Link>

          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs text-red-400/90 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{signingOut ? "Ending Session..." : "Staff Sign Out"}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent overflow-y-auto relative z-10">
        <main className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  );
}
