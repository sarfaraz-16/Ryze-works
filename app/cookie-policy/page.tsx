import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Cookie Policy | RYZE WORKS",
  description: "Cookie Policy and analytics standards at Ryze Works."
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#07070b] text-white">
      <Navbar />
      <section className="pt-36 pb-24 max-w-4xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
          Cookie Policy
        </h1>
        <p className="text-xs text-white/50 mb-8 pb-4 border-b border-white/[0.08]">
          Last Updated: September 2024 • Bangalore, India
        </p>
        <div className="space-y-6 text-sm text-white/80 leading-relaxed">
          <p>
            Ryze Works utilizes essential cookies and lightweight telemetry (via PostHog) to understand product performance and user interaction patterns.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">Essential Cookies</h2>
          <p>
            These cookies are strictly necessary to maintain your session state, authenticate admin sessions, and secure CSRF tokens across our Next.js App Router infrastructure.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">Zero Invasive Tracking</h2>
          <p>
            We do not sell personal data or inject intrusive cross-site advertising trackers into our applications.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
