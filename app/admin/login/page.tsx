"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Lock, Mail, ArrowRight, AlertCircle, Loader2, ShieldCheck, ArrowLeft } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        throw new Error(error.message || "Invalid email or password.");
      }

      if (!data?.user) {
        throw new Error("Authentication failed. Please verify your credentials.");
      }

      // Check role authorization via profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profile && !["editor", "admin"].includes(profile.role)) {
        await supabase.auth.signOut();
        throw new Error("Access restricted: This account does not hold administrative privileges.");
      }

      // Login successful, redirect to destination
      router.push(redirectTo);
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative z-10">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#B896FF] uppercase mb-4 px-3 py-1 rounded-full bg-[#7042FF]/10 border border-[#7042FF]/20 hover:bg-[#7042FF]/20 transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#B896FF]" />
          RYZE COMMAND CENTER // RESTRICTED
        </Link>
        <h1 className="text-3xl font-bold text-white tracking-tight">Staff Sign In</h1>
        <p className="text-sm text-zinc-400 mt-2">
          Authenticate to access the editorial desk and CMS triage.
        </p>
      </div>

      {/* Login Card */}
      <div className="rounded-3xl bg-[#0d0e17]/90 backdrop-blur-xl border border-white/[0.08] p-8 sm:p-10 shadow-2xl shadow-black/80">
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{errorMsg}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
              Work Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="editor@ryzeworks.com"
                className="w-full pl-10 pr-4 py-3 bg-[#080417]/80 border border-white/[0.1] rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#7042FF] focus:ring-1 focus:ring-[#7042FF] transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 bg-[#080417]/80 border border-white/[0.1] rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#7042FF] focus:ring-1 focus:ring-[#7042FF] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#7042FF] to-[#7C3AED] hover:from-[#7E52FF] hover:to-[#8B5CF6] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#7042FF]/20 hover:shadow-[#7042FF]/40 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Authenticating Session...</span>
              </>
            ) : (
              <>
                <span>Enter Command Center</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Public Experience
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-[#080417] text-zinc-100 flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(112,66,255,0.22),rgba(8,4,23,0))] pointer-events-none" />

      <Suspense
        fallback={
          <div className="flex items-center justify-center p-12 text-zinc-400">
            <Loader2 className="w-6 h-6 animate-spin text-[#B896FF]" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}
