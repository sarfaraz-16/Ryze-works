export interface ResourceItem {
  id: string;
  slug: string;
  title: string;
  category: "STRATEGY" | "DESIGN" | "TECHNOLOGY" | "GROWTH";
  description: string;
  format: "Figma Template" | "Notion & PDF" | "Code Repository" | "Interactive Playbook";
  takeaways: string[];
  fileSize: string;
  difficulty: "Foundational" | "Advanced" | "Executive";
  downloadUrl?: string;
}

export const RESOURCES_DATA: ResourceItem[] = [
  {
    id: "res-ai-canvas",
    slug: "ai-brand-strategy-canvas",
    title: "The AI-Native Brand Strategy Canvas",
    category: "STRATEGY",
    description: "A battle-tested 1-page strategic framework to identify your brand's AI differentiator, automated tone-of-voice rails, and algorithmic visual touchpoints.",
    format: "Figma Template",
    fileSize: "4.8 MB",
    difficulty: "Executive",
    takeaways: [
      "Define AI brand persona boundaries and guardrails.",
      "Map user emotion curves across automated touchpoints.",
      "Align executive leadership on synthetic content policies.",
    ],
  },
  {
    id: "res-design-audit",
    slug: "design-system-audit-checklist",
    title: "50-Point Enterprise Design System QA Checklist",
    category: "DESIGN",
    description: "The exact quality checklist used by Ryze Works engineers to audit typography hierarchy, color contrast ratios, focus states, and token cohesion before production sign-off.",
    format: "Notion & PDF",
    fileSize: "1.2 MB",
    difficulty: "Foundational",
    takeaways: [
      "12-point accessibility and WCAG AAA compliance checks.",
      "Figma variants and auto-layout stress-testing formulas.",
      "Token nomenclature standards for dark/light themes.",
    ],
  },
  {
    id: "res-fullstack-blueprint",
    slug: "fullstack-nextjs-supabase-blueprint",
    title: "Next.js 16 + Supabase Production Architecture Blueprint",
    category: "TECHNOLOGY",
    description: "Clean architecture guide covering Server Components, Row-Level Security, ISR cache revalidation, pgvector similarity, and edge middleware RBAC.",
    format: "Code Repository",
    fileSize: "8.4 MB",
    difficulty: "Advanced",
    takeaways: [
      "Complete SQL migration scripts with zero RLS leaks.",
      "Server Action transaction patterns with cookie reflection.",
      "Acceptance test suites for CI/CD deployment pipelines.",
    ],
  },
  {
    id: "res-cro-playbook",
    slug: "conversion-rate-optimization-playbook",
    title: "High-Conversion Landing Page & Funnel Playbook",
    category: "GROWTH",
    description: "Practical breakdown of high-velocity hero layouts, value proposition copywriting frameworks, social proof placement, and frictionless intake forms.",
    format: "Interactive Playbook",
    fileSize: "3.5 MB",
    difficulty: "Foundational",
    takeaways: [
      "The 'Above-The-Fold' 3-second comprehension framework.",
      "Micro-interaction and trust badge placement heatmap.",
      "Interactive multi-step intake qualification architectures.",
    ],
  },
];
