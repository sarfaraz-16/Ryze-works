export interface ReportItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  pages: number;
  publishedDate: string;
  summary: string;
  coverImage: string;
  keyInsights: string[];
  methodology: string;
  sponsor?: {
    name: string;
    logo?: string;
    tier: "Strategic Partner" | "Sponsored Benchmark";
  };
  fileSize: string;
  format: string;
}

export const REPORTS_DATA: ReportItem[] = [
  {
    id: "rep-ai-velocity-2026",
    slug: "state-of-ai-native-brand-velocity-2026",
    title: "The State of AI-Native Brand Velocity (2026 Report)",
    subtitle: "How generative systems, real-time visual engines, and autonomous product workflows are redefining enterprise brand equity.",
    category: "AI & STRATEGY",
    pages: 48,
    publishedDate: "January 2026",
    summary: "An in-depth empirical investigation across 140+ tech scaleups analyzing the transition from static design guidelines to generative real-time brand infrastructure.",
    coverImage: "/images/insights/branding.jpg",
    fileSize: "14.2 MB",
    format: "PDF Document",
    methodology: "Data gathered via structured executive interviews with 140 Series A–IPO founders, creative directors, and VP Engineers across Bengaluru, Singapore, and San Francisco.",
    keyInsights: [
      "Companies with generative visual systems launch new campaign initiatives 4.2x faster than traditional brand retainers.",
      "Static Brand Book adherence dropped by 64% in engineering-led organizations, replaced by tokenized component APIs.",
      "Hyper-personalized user landing interfaces drive a verified +38% bump in enterprise pipeline conversion.",
    ],
    sponsor: {
      name: "Ryze Applied Intelligence Lab",
      tier: "Strategic Partner",
    },
  },
  {
    id: "rep-fintech-conversion",
    slug: "fintech-conversion-trust-architecture",
    title: "Fintech Conversion Architecture & Behavioral Trust Benchmarks",
    subtitle: "Analyzing checkout drop-off, biometric latency, and dark mode retention across 40M+ transactions.",
    category: "FINTECH & PRODUCT",
    pages: 62,
    publishedDate: "November 2025",
    summary: "Comprehensive benchmarks dissecting user trust friction, micro-interactions, and 1-tap payment conversion patterns across Indian and SEA financial interfaces.",
    coverImage: "/images/insights/growth.jpg",
    fileSize: "18.8 MB",
    format: "PDF Document",
    methodology: "Quantitative anonymized telemetry from 40M+ checkout and onboarding transactions processed across CRED, Simpl, and Razorpay ecosystem experiences.",
    keyInsights: [
      "Reducing checkout cognitive load by removing peripheral navigational elements yields an instantaneous +19.4% completion rate.",
      "Dark-mode financial interfaces show +22% longer session dwell times for investment portfolio monitoring.",
      "Clear upfront cryptographic and PCI-DSS reassurance badges reduce KYC abandonment by 31%.",
    ],
    sponsor: {
      name: "Ryze Fintech Practice Group",
      tier: "Sponsored Benchmark",
    },
  },
  {
    id: "rep-design-systems-scale",
    slug: "enterprise-design-systems-scale",
    title: "Enterprise Design Systems & Generative Tokens Benchmark",
    subtitle: "Bridging the gap between Figma design tokens and Next.js production components without drift.",
    category: "TECHNOLOGY & DESIGN",
    pages: 36,
    publishedDate: "October 2025",
    summary: "Architectural blueprint detailing multi-brand design tokens, headless components, and automated visual regression testing in high-velocity organizations.",
    coverImage: "/images/insights/ai.jpg",
    fileSize: "9.6 MB",
    format: "PDF Document",
    methodology: "Field analysis and code reviews across 28 production enterprise Next.js and React Native codebases.",
    keyInsights: [
      "Zero-runtime CSS with modern token pipelines reduces initial bundle parse times by up to 45%.",
      "Automated Figma-to-code token synchronization prevents 88% of staging QA visual regressions.",
      "Accessible WCAG AAA component foundations mitigate legal risk while boosting customer satisfaction scores by 14 points.",
    ],
    sponsor: {
      name: "Ryze Engineering Core",
      tier: "Strategic Partner",
    },
  },
];
