import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import IntroSequence from "@/components/sections/IntroSequence";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { RyzeAIPanel } from "@/components/sections/RyzeAIPanel";
import { Testimonials } from "@/components/sections/Testimonials";
import { LatestInsights } from "@/components/sections/LatestInsights";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-zinc-100 selection:bg-[#7042FF] selection:text-white relative">
      {/* Fixed Sticky Header */}
      <Navbar />

      {/* Intro Scroll Sequence */}
      <IntroSequence />

      {/* 2. Client Trust Strip */}
      <TrustedBy />

      {/* 3. Capabilities ("What We Do") */}
      <WhatWeDo />

      {/* 4. Featured Projects */}
      <FeaturedWork />

      {/* 5. Deep Dive Case Studies */}
      <CaseStudies />

      {/* 6. Ryze AI Interactive Panel */}
      <RyzeAIPanel />

      {/* 7. Client Testimonials */}
      <Testimonials />

      {/* 8. Latest Insights */}
      <LatestInsights />

      {/* 9. Pre-Footer Call to Action */}
      <ClosingCTA />

      {/* 10. Mega Footer */}
      <Footer />
    </main>
  );
}
