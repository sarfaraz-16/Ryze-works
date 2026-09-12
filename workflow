# RYZE WORKS — MASTER BUILD DOCUMENT
### Consolidated Architecture, Tech Stack, UI Spec & Execution Workflow
*Synthesized from: Developer/Product Spec (70 sections) · End-to-End Production Plan · Homepage UI Reference*

---

## 0. HOW TO READ THIS DOCUMENT

This document represents the single authoritative specification and implementation roadmap for **Ryze Works**:

| Source | What it is | How to treat it |
|---|---|---|
| 70-Section Spec | The full end-state platform vision (AI platform, CRM, ad ops, sponsorship) | **North star.** Target for platform completion. |
| Core Production Plan | The verified step-by-step implementation sequence | **Active execution track.** Follows strict dependency ordering. |
| Homepage UI Reference | Target visual/UI direction | Pixel and UX standard for design implementation. |

**Operating Principle:** Build strictly against the greenfield architecture. No technical debt, no shortcuts, no decorative analytics, and zero placeholder content.

---

## 1. PROJECT OBJECTIVE

Construct a production-ready, AI-native agency and knowledge platform featuring:

1. **Brand Aesthetic:** Premium, dark, high-contrast, technology-driven UI adhering to the design system.
2. **Dynamic CMS Engine:** 100% database-driven content across services, projects, case studies, insights, and resources.
3. **Grounded AI Layer:** Server-side AI assistant and Brief Generator backed by vector embeddings, citing verified content.
4. **Editorial Integrity:** Moderation desks with an affirmative Client Verification Gate before anything renders publicly.
5. **Integrated Commercial Pipeline:** Lead capture and CRM pipeline routing project and advertiser inquiries.
6. **Hardened Security:** Supabase Row-Level Security (RLS) policies, session-authenticated admin guards, and private file storage.

---

## 2. TECH STACK & SYSTEM ARCHITECTURE

| Layer | Technology | Architectural Standard |
|---|---|---|
| Frontend Framework | **Next.js (App Router)** | Server Components, dynamic ISR caching, structured metadata |
| Language | **TypeScript** | Strict type safety across UI components, schemas, and queries |
| Styling | **Tailwind CSS** | Unified design tokens, responsive breakpoints, dark-mode foundation |
| UI Primitives | **shadcn/ui** | Accessible, unstyled UI primitives tailored to Ryze branding |
| Animation | **Motion for React** (Framer Motion) | Hardware-accelerated transitions, reduced-motion compatibility |
| Hosting & CDN | **Vercel** | Edge caching, automated branch previews, production deployments |
| Backend Platform | **Supabase** | PostgreSQL, Auth, Storage, Edge Functions, pgvector |
| Database | **Supabase PostgreSQL** | Relational models, indexed foreign keys, automated timestamps |
| Access Control | **Supabase Auth & RLS** | Explicit table policies: public read published, admin full access |
| File Storage | **Supabase Storage** | RLS-protected private buckets for resumes; public buckets for media |
| AI Gateway | **Google Gemini** via Server Gateway | Server-side execution only; browser never touches AI secrets |
| Semantic Search | **pgvector** | Postgres extension querying vector embeddings via cosine similarity |
| Telemetry & Monitoring | **PostHog & Sentry** | Real interaction tracking and error boundary monitoring |
| Validation & Forms | **React Hook Form + Zod** | Shared client/server validation schemas |
| Automated Testing | **Vitest + Playwright** | End-to-end acceptance testing suite (Tests A–E) |

```
                     ┌─────────────────────┐
                     │        USERS        │
                     └──────────┬──────────┘
                                │  HTTPS
                                ▼
                     ┌─────────────────────┐
                     │       VERCEL        │
                     │ Next.js (App Router)│
                     │ TypeScript + React  │
                     │ Tailwind + shadcn/ui│
                     │   Motion for React  │
                     └──────────┬──────────┘
                                │
                 public reads   │   authenticated calls
          (RLS-scoped)          │   (session-scoped)
                                ▼
                     ┌─────────────────────┐
                     │      SUPABASE       │
                     │ ─────────────────── │
                     │ PostgreSQL (pgvector│◄─── AI retrieval native to DB
                     │ Supabase Auth       │
                     │ Storage Buckets     │
                     │ Row Level Security  │
                     │ Server Actions / API│──┐
                     └─────────────────────┘  │
                                              │ server-side only
                                              │ secrets secured
                     ┌────────────────────────┼────────────────────────┐
                     ▼                        ▼                        ▼
            ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
            │   AI GATEWAY    │      │  COMMUNICATIONS │      │  OBSERVABILITY  │
            │  Google Gemini  │      │  Resend (Email) │      │ Sentry/PostHog  │
            └─────────────────┘      └─────────────────┘      └─────────────────┘
```

---

## 3. TARGET UI SYSTEM

### 3.1 Visual Specifications
* **Theme Foundation:** Near-black backgrounds (`#0A0A0F`–`#0D0D14`).
* **Primary Accent:** Violet-to-purple gradient (`#7C3AED` → `#A855F7`) across CTAs, active indicators, and hero elements.
* **Secondary Accent:** Amber glow streak accentuating visual hero depth.
* **Typography:** Geometric grotesques (Plus Jakarta Sans) across all heading scales and body prose.

### 3.2 Homepage Section Composition
1. **Header/Nav:** Logo left, main route links, solid violet `START A PROJECT` action.
2. **Hero:** Positioning copy, conversational AI query entry with quick actions, interactive visual sphere.
3. **Verified Client Strip:** Monochromatic client wordmarks backed by verified database records.
4. **Capabilities:** 5-group icon layout: Strategy (Think), Brand (Create), Build (Technology), Grow (Marketing), Activate (Experiences).
5. **Featured Work:** Horizontal project card presentation querying `projects.is_featured = true`.
6. **Case Studies:** Structured narrative cards linking to full deep-dive studies.
7. **Ryze AI Module:** Interactive grounded assistant card with prompt chips.
8. **Testimonials:** Verified founder/client cards displaying rating, quote, and role.
9. **Insights:** Article cards displaying category tag, reading time, and publish date.
10. **Closing CTA & Footer:** Bottom conversion point and 6-column comprehensive navigation footer.

---

## 4. INFORMATION ARCHITECTURE & ROUTES

```
/                          → Homepage
/services                  → Capability Index (6 Core Groups)
/services/[slug]           → Service Detail & Approach
/projects                  → Work Portfolio + Filters + Search
/projects/[slug]           → Project Detail + Tech Stack + Results
/case-studies              → Verified Case Studies Index
/case-studies/[slug]       → Challenge, Strategy, Execution & Metrics
/testimonials              → Review Index + Submission Interface
/insights                  → Editorial Articles & Perspectives
/insights/[slug]           → Article Detail + Author + Related Work
/reports                   → Industry Whitepapers & Research
/resources                 → Frameworks, Toolkits & Checklists
/ai                        → Grounded Ryze AI Experience
/ai/lab                    → Prototypes, Experiments & Demos
/partners                  → Strategic Alliances & Commercial Programs
/advertise                 → Advertiser Inquiry & Placement Specs
/media-kit                 → Audience Reach & Demographic Overview
/about                     → Agency Mission, Culture & Principles
/contact                   → General Communications
/start-a-project           → Interactive AI Brief & Scope Intake
/careers                   → Open Roles & Direct Application Intake
/privacy, /terms, etc.     → Legal & Compliance Frameworks
/admin/*                   → Secure Command Center & Content CMS
```

---

## 5. DATABASE ARCHITECTURE

The platform runs on a unified Postgres schema with RLS active on every entity:

```
services             id, slug, name, group, description, deliverables[], status, created_at, updated_at
projects             id, slug, name, industry, description, hero_image, gallery[], is_featured, status
project_services     project_id (FK), service_id (FK) -- Relational Join
case_studies         id, slug, project_id (FK), challenge, strategy, execution, results, status
testimonials         id, author_name, role, company, quote, rating, project_id (FK), status, is_featured
articles             id, slug, title, category, tags[], author_id (FK), cover_image, content, seo_title, seo_description, status
reports / resources  id, slug, title, summary, file_url, sponsor_id (FK), status
leads                id, type, name, email, company, message, ai_brief (jsonb), source, utm (jsonb), status
career_roles         id, title, department, location, description, requirements[], status
job_applications     id, role_id (FK), applicant_name, email, resume_path, status
profiles             id (FK auth.users), full_name, role (public | editor | admin)
knowledge_documents  id, content, metadata (jsonb), embedding (vector[1536/768])
```

---

## 6. COMPLETE PLATFORM EXECUTION PLAN

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 1: Foundation, Infrastructure & Static Route Build (COMPLETE)                    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ STAGE 2: Live Database Ingestion & Relational Data Wiring                              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ STAGE 3: Ryze Command Center — Admin Auth & Moderation Desks (Acceptance Test A)       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ STAGE 4: Knowledge Publishing Engine & Authoring CMS (Acceptance Test E)               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ STAGE 5: Semantic Retrieval Engine, pgvector & AI Brief Flow (Acceptance Test C)       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ STAGE 6: Commercial Advertising Platform & Monetization Ops (Acceptance Test D)        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ STAGE 7: Production Hardening, SEO, Automated Test Suite & Launch                      │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Stage 1: Foundation, Architecture & Routes — **100% COMPLETE**
* [x] Next.js App Router, TypeScript, and Tailwind CSS configuration.
* [x] Database tables initialized with strict RLS policies.
* [x] Private Supabase storage bucket configured for career resumes.
* [x] Server-side AI Gateway routing directly to Gemini with server-side keys.
* [x] All 42 public static and dynamic routes compiling cleanly with 0 build errors.
* [x] Form intake pipelines enforcing consent checks and default pending states.

### Stage 2: Database Ingestion & Relational Data Wiring
* **Data Migration:** Run idempotent seed ingestion to populate Postgres tables (`services`, `projects`, `project_services`, `case_studies`, `articles`).
* **Dynamic Route Wiring:** Transition `/services`, `/projects`, `/case-studies`, and `/insights` from static arrays to direct Supabase queries using Next.js ISR (`revalidate = 3600`) and fallback caching.
* **Relational Graph:** Render dynamic two-way relationships (linked services on project pages; linked case studies and insights on service pages).

### Stage 3: Ryze Command Center — Admin Auth & Moderation Desk (Acceptance Test A)
* **Auth Guard:** Configure `middleware.ts` to enforce server-side session checks and role validation (`profiles.role IN ('editor', 'admin')`) across all `/admin/:path*` routes.
* **Admin Login:** Build `/admin/login` interface integrating Supabase Auth.
* **Overview KPI Dashboard:** Implement `/admin` dashboard surfacing verified database counts (Leads, Pending Testimonials, Published Projects, Published Insights).
* **Testimonial Moderation Desk:** Implement `/admin/testimonials` with one-click actions: **Approve**, **Feature**, or **Reject**, executing `revalidatePath()` across public routes.

### Stage 4: Knowledge Publishing Engine & Authoring CMS (Acceptance Test E)
* **Article CMS:** Implement `/admin/articles` editor with Markdown support, tag selection, and author attribution.
* **Pre-Publish SEO Gate:** Enforce pre-publish validation rules (valid SEO title, meta description >= 50 chars, auto-calculated reading time).
* **Draft Isolation:** Validate RLS enforcement ensuring `status = 'draft'` remains inaccessible anonymously.
* **Reports & Resources:** Build administrative interfaces to upload and manage research whitepapers and gated design resources.

### Stage 5: Semantic Retrieval Engine, pgvector & AI Brief Flow (Acceptance Test C)
* **Vector Embeddings Pipeline:** Populate `knowledge_documents` with chunked embeddings of verified services, projects, case studies, and insights using Gemini embeddings.
* **Semantic Assistant:** Connect `/api/ai/chat` to `match_knowledge()` using cosine distance to retrieve context before generating answers.
* **Strict Refusal Boundary:** Enforce strict grounding: any query without matching knowledge returns *"I don't have enough verified information to answer that"*.
* **Project Brief Generator:** Implement the guided intake flow storing structured briefs directly into the `leads` table linked with UTM attribution.

### Stage 6: Commercial Advertising Platform & Monetization Ops (Acceptance Test D)
* **Commercial Entrypoints:** Build interactive `/advertise` and `/media-kit` portals with objective and budget selectors.
* **Placement Engine:** Build reusable sponsor modules (`SponsoredArticleBadge`, `InArticleSponsorCard`, `ReportSponsorBanner`) with required "Sponsored" / "Partner Content" labeling.
* **Ad Ops CMS & Tracking:** Create admin campaign controllers and server-side impression/click event endpoints updating campaign telemetry.
* **CRM Inbox:** Build admin lead management desk categorizing Project, Advertiser, and General inquiries with pipeline status controls.

### Stage 7: Production Hardening, SEO, Automated Test Suite & Launch
* **SEO Automation:** Generate dynamic `app/sitemap.ts` and `app/robots.ts` querying live slugs; inject JSON-LD schemas (`Organization`, `Service`, `Article`, `CaseStudy`).
* **Automated Acceptance Suite:** Implement Vitest and Playwright test suites covering Acceptance Tests A through E.
* **Observability Verification:** Confirm Sentry error tracking and PostHog event instrumentation are operational in production builds.
* **Release Gate Verification:** Run accessibility, responsive grid (375px / 768px / 1440px), performance, and zero-placeholder audit prior to Vercel deployment.

---

## 7. RELEASE GATE CHECKLIST

All criteria must validate before final production signoff:

- [ ] **Data Driven:** Services, Projects, Case Studies, and Insights are served entirely from Supabase.
- [ ] **Moderation Gate:** Testimonials default to pending and require human approval to display.
- [ ] **Content Integrity:** Every client logo, project name, and metric is backed by verified client consent.
- [ ] **AI Grounding:** AI queries cite verified routes or refuse cleanly without inventing claims.
- [ ] **Commercial Separation:** Project leads and advertiser leads are captured in isolated CRM pipelines.
- [ ] **Security Compliance:** All RLS policies active, admin routes guarded, and secrets confined to server-side execution.
- [ ] **Zero Placeholder:** Zero broken navigation links, no dummy content, and clean empty states across all pages.
- [ ] **Automated Tests:** Acceptance Tests A through E pass 100% in CI/CD.