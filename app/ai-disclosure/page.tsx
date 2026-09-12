import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sparkles, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "AI Disclosure & Ethics | RYZE WORKS",
  description: "AI Disclosure, security policies, and safety principles at Ryze Works."
};

export default function AIDisclosurePage() {
  return (
    <main className="min-h-screen bg-[#07070b] text-white">
      <Navbar />
      <section className="pt-36 pb-24 max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 mb-4">
          <Sparkles className="w-4 h-4" />
          <span>GOVERNANCE & RESPONSIBLE AI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
          AI Disclosure & Safety Standards
        </h1>
        <p className="text-xs text-white/50 mb-8 pb-4 border-b border-white/[0.08]">
          Last Updated: September 2024 • Bangalore, India
        </p>
        <div className="space-y-6 text-sm text-white/80 leading-relaxed">
          <p>
            As an AI-native creative & technology partner, transparency in our computational pipelines is foundational to client trust.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">Server-Side Key Isolation</h2>
          <p>
            All AI model inferences (Google Gemini and OpenAI) are mediated exclusively through secure server-side Edge Functions. Client API keys and provider tokens never touch the browser window or client bundles.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">Grounded Retrieval & Anti-Hallucination Policy</h2>
          <p>
            The Ryze AI assistant enforces a strict zero-hallucination constraint. The model is constrained to ground all factual statements in verified project registries and case studies, explicitly refusing to fabricate client metrics or pricing.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">Human-in-the-Loop Review</h2>
          <p>
            While AI accelerates initial asset exploration and prototyping, every production deliverable shipped to clients undergoes rigorous human code review, accessibility testing, and security auditing.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
