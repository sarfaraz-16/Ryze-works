import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Privacy Policy | RYZE WORKS",
  description: "Privacy Policy and data governance standards at Ryze Works."
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#07070b] text-white">
      <Navbar />
      <section className="pt-36 pb-24 max-w-4xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
          Privacy Policy
        </h1>
        <p className="text-xs text-white/50 mb-8 pb-4 border-b border-white/[0.08]">
          Last Updated: September 2024 • Bangalore, India
        </p>
        <div className="space-y-6 text-sm text-white/80 leading-relaxed">
          <p>
            At Ryze Works, we take privacy and intellectual property seriously. When you submit project inquiries, contact requests, or project briefs, your information is stored in secure, row-level security (RLS) encrypted databases hosted via Supabase.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">Data We Collect</h2>
          <p>
            We collect contact credentials (name, email, company affiliation) and project scope details exclusively for the purpose of communicating with prospective clients and fulfilling contractual agency services.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">AI Processing & Data Segregation</h2>
          <p>
            Client data is never used to train third-party public foundational models. All AI Gateway interactions mediated through Google Gemini or OpenAI are stateless API calls governed by enterprise zero-retention policies.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
