import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Terms of Use | RYZE WORKS",
  description: "Terms of Use and client engagement framework at Ryze Works."
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#07070b] text-white">
      <Navbar />
      <section className="pt-36 pb-24 max-w-4xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
          Terms of Use
        </h1>
        <p className="text-xs text-white/50 mb-8 pb-4 border-b border-white/[0.08]">
          Last Updated: September 2024 • Bangalore, India
        </p>
        <div className="space-y-6 text-sm text-white/80 leading-relaxed">
          <p>
            Welcome to Ryze Works (&quot;Ryze Works&quot;, &quot;we&quot;, &quot;us&quot;). By accessing our website, tools, and digital platforms, you agree to comply with and be bound by these Terms of Use.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">Intellectual Property & Deliverables</h2>
          <p>
            All custom designs, codebases, and systems produced during contracted sprints become the exclusive intellectual property of the commissioning client upon receipt of final milestone settlement.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">AI Generated Outputs</h2>
          <p>
            Outputs generated through the Ryze AI assistant and Project Brief Studio are provided on an advisory basis to assist project scoping. Final engineering architectures are validated by human solutions architects.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
