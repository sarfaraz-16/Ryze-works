# RYZE WORKS — MASTER BUILD DOCUMENT
### Consolidated Architecture, Tech Stack, UI Spec & Execution Workflow
*Synthesized from: Developer/Product Spec (70 sections) · 30-Day Developer Planner · 30-Day Audited MVP Plan · Homepage UI Reference*

---

## 0. HOW TO READ THIS DOCUMENT

You have three source documents that sometimes disagree, and one image. This document resolves the conflicts and gives you **one path to follow**:

| Source | What it is | How to treat it |
|---|---|---|
| 70-Section Spec | The full end-state vision (AI platform, CRM, ad ops, sponsorship) | **North star.** Not the Day-30 target. |
| 30-Day Developer Planner | A day-by-day plan written against your *actual* repo | Good structure, slightly optimistic scope |
| 30-Day **Audited** MVP Plan | Same plan, but corrected after a real repo audit (commit `38a7a82`) | **This is the one you execute.** It's the ground-truth, repo-aware version |
| Homepage screenshot | Target visual/UI direction | Your literal pixel/UX reference for Phase 1 |

**Rule:** Where the planner and the audited plan disagree, the **audited plan wins** — it's the one that already accounted for your real `App.jsx` state-routing, your Express/Mongo backend, the unauthenticated `GET /api/contact` and `GET /api/applications` endpoints, the 14.5MB `SGA.png`, and the missing test suite.

---

## 1. PROJECT OBJECTIVE (Plain Version)

Turn `ryze-landing` (React 19 + Vite, JSX, hard-coded content, Express/Mongo backend) into a **Next.js + Supabase production MVP** that:

1. Looks like the reference screenshot (dark, premium, AI-native agency site)
2. Is CMS-driven instead of hard-coded
3. Has one real, grounded AI assistant (not a cosmetic chatbot)
4. Has a working testimonial submit → approve → display pipeline
5. Has a working lead/CRM pipeline
6. Is secure (today, right now: your two GET endpoints leak every lead and job applicant's PII — that's day-one, hour-one work)
7. Explicitly **defers** ad ops, sponsorship, personalization, and long-term AI memory to Phase 2

Do **not** attempt the full 70-section spec in 30 days. That is the mistake this document exists to prevent.

---

## 2. TECH STACK (Corrected & Final)

Your stack image is close but has one real error (pgvector doesn't float outside the DB) and a few gaps. Corrected version:

| Layer | Technology | Notes |
|---|---|---|
| Frontend framework | **Next.js (App Router)** | Replaces `App.jsx` state-routing entirely |
| Language | **TypeScript** | Migrate JSX → TSX incrementally, don't rewrite in one shot |
| Styling | **Tailwind CSS** | Extract your existing `tokens.css` into Tailwind theme config first |
| UI components | **shadcn/ui** (selected primitives only) | Don't adopt wholesale — you already have working components |
| Animation | **Motion for React** (Framer Motion) + CSS transitions | Preserve `OurServices.jsx`'s existing Framer Motion work |
| Hosting | **Vercel** | |
| Backend platform | **Supabase** | Postgres + Auth + Storage + RLS + Edge Functions + pgvector — **one platform**, not four |
| Database | Supabase **PostgreSQL** | Replaces MongoDB entirely |
| Auth | Supabase **Auth** | Replaces your JWT/bcrypt `Admin` model |
| File storage | Supabase **Storage** (RLS-protected buckets) | Replaces local `uploads/resumes/` (currently non-durable on serverless) |
| AI providers | **OpenAI and/or Gemini**, called only through an **AI Gateway inside a Supabase Edge Function** | Never call from the browser |
| AI retrieval | **pgvector extension inside Supabase Postgres** | It is not a separate "AI" box — correct your diagram here |
| Payments | **Razorpay** (India-first); Stripe only if international need is confirmed | Not required for MVP unless a paid workflow is scoped in |
| Email | **Resend** | Transactional only (contact confirmations, testimonial status, etc.) |
| Analytics | **PostHog** | Product analytics — real events only, no decorative numbers |
| Monitoring | **Sentry** | Error tracking on both Next.js and Edge Functions |
| CI/CD | **GitHub Actions + Vercel** | |
| Forms/validation | **React Hook Form + Zod** | Shared schemas between client validation and Edge Function validation |
| Client data state | **TanStack Query** | Only where client-side caching is actually needed |
| Testing | **Vitest + React Testing Library + Playwright** | You currently have zero tests — this is a real gap, not optional |

### Corrected Architecture Diagram

```
                         ┌─────────────────────┐
                         │        USERS         │
                         └──────────┬──────────┘
                                    │  HTTPS
                                    ▼
                         ┌─────────────────────┐
                         │       VERCEL         │
                         │  Next.js (App Router)│
                         │  TypeScript + React  │
                         │  Tailwind + shadcn/ui │
                         │  Motion for React     │
                         └──────────┬──────────┘
                                    │
                     public reads   │   authenticated calls
              (RLS-scoped)          │   (session-scoped)
                                    ▼
                         ┌─────────────────────┐
                         │      SUPABASE        │
                         │ ───────────────────── │
                         │ Postgres (+ pgvector) │◄─── AI retrieval lives HERE,
                         │ Auth                  │      not in a separate box
                         │ Storage (RLS buckets) │
                         │ Row Level Security    │
                         │ Edge Functions ───────┼──┐
                         └─────────────────────┘  │
                                                    │  server-side only —
                                                    │  secrets never touch browser
                          ┌─────────────────────────┼─────────────────────────┐
                          ▼                         ▼                         ▼
                 ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
                 │   AI GATEWAY     │      │    PAYMENTS      │      │      EMAIL       │
                 │  OpenAI / Gemini │      │ Razorpay/Stripe  │      │     Resend       │
                 │  (via Edge Fn)   │      │  (via Edge Fn)   │      │  (via Edge Fn)   │
                 └─────────────────┘      └─────────────────┘      └─────────────────┘

        Supporting Infrastructure (cross-cutting, not request-path)
        ──────────────────────────────────────────────────────────
        GitHub Actions  → CI/CD (test → build → deploy)
        Sentry          → error monitoring (Next.js + Edge Functions)
        PostHog         → product analytics (page/CTA/form/search/download events)
```

**Key correction vs. your diagram:** AI and Payments are not peers of Supabase — they are only ever reached *through* a Supabase Edge Function. The browser never talks to OpenAI, Gemini, or Razorpay directly. This is a hard security requirement in every source document (Section 50, "AI Security" — never expose API keys).

---

## 3. TARGET UI SYSTEM (from the reference screenshot)

This is your Phase 1 literal target. Build the design system to these specifics before touching content architecture.

### 3.1 Visual language
- **Theme:** near-black background (`#0A0A0F`–`#0D0D14` range), not pure black
- **Accent:** violet/purple gradient (`#7C3AED` → `#A855F7` range), used for primary CTAs, active nav states, and the hero's animated sphere
- **Secondary accent:** warm orange/amber streak inside the hero sphere graphic — a gradient orb, not a static image
- **Typography:** large, confident sans-serif headline (the hero reads "Strategy. Design. Technology. Content. **Powered by AI.**" with the last line in the violet accent)
- **Feel:** premium, editorial, technology-driven — explicitly *not* a generic Webflow-agency-template look (this is stated directly in the spec, Section 7)

### 3.2 Section-by-section build order (matches Section 9 of the spec + the screenshot)

| # | Section | Screenshot detail | Data source |
|---|---|---|---|
| 1 | **Header/Nav** | Logo left, `WORK / SERVICES / INSIGHTS / TESTIMONIALS / AI / ABOUT / CONTACT`, solid violet "START A PROJECT" button right | Static |
| 2 | **Hero** | Headline + subhead, AI input box ("What are you trying to build?" / "Tell Ryze what you're working on…") with two CTAs: `START WITH AI` (filled violet) and `EXPLORE OUR WORK` (outlined) + animated gradient sphere with orbiting labels (AI Strategy, Branding, Growth, Experiences, Technology) | AI input → Edge Function; sphere labels are static |
| 3 | **Trusted-by strip** | Greyscale client wordmarks (Nostic, Zepto, Yulu, CRED, Simpl, Razorpay) | **CMS-driven — see Client Verification Gate below, do not hardcode** |
| 4 | **Capabilities ("What we do")** | 5-column icon grid: Think/Create/Build/Grow/Activate | Static (maps to Services taxonomy) |
| 5 | **Featured Work** | 5-card horizontal grid, image + name + tags + industry link | `projects` table, `is_featured = true` |
| 6 | **Case Studies** | 3-card grid, larger cards with "VIEW CASE STUDY" | `case_studies` table |
| 7 | **Ryze AI panel** | Dark violet-tinted card, chat-style preview ("Hi, I'm Ryze AI...") with quick-action chips (Project Advisor / Case Study Search / Brief Generator) | Edge Function-backed AI assistant, embedded — **not a separate widget bolted on** |
| 8 | **Testimonials** | 3-card grid, 5-star rating, avatar + name + role | `testimonials` table, `status = approved` only |
| 9 | **Latest Insights** | 4-card grid, category tag + title + read time | `articles` table, `status = published` |
| 10 | **Closing CTA** | "Ready to build what's next?" + violet button | Static |
| 11 | **Footer** | 6-column: Ryze Works / Services / Work / Insights / AI / Partners / Contact, plus legal row | Mostly static; **Partners column needs the Day-27 decision below** |

### 3.3 Client Verification Gate (critical — do not skip)

The screenshot shows real, named client logos (Nostic, Zepto, Yulu, CRED, Simpl, Razorpay). Per the audited plan (Day 13) and the zero-placeholder policy (Section 64):

> For every client/logo carried over from the mockup, confirm in writing they are a real, consented Ryze Works client **before** their name, logo, or case study enters the CMS. No visually-restyled placeholder content ships as if it were real.

If consent isn't confirmed for a given logo by the time you build the "Trusted by" strip, ship that section with only the *verified* subset — never with a placeholder standing in for an unverified name.

### 3.4 Design-system components to build once, reuse everywhere
Buttons (filled violet / outlined) · Inputs (the AI query box style) · Cards (project / case-study / testimonial / insight — four variants of one base card) · Nav (desktop + mobile drawer) · Footer · Badges/Tags (industry, service, category) · Loading / Empty / Error states · AI chat bubble + quick-action chip · Modal · Section header pattern (eyebrow label + heading + "view all →" link — used identically in sections 3, 5, 6, 9)

---

## 4. INFORMATION ARCHITECTURE (MVP subset of the full 70-section IA)

```
/                          → Home
/services                  → Listing (6 capability groups: Strategy, Brand, Build, Create, Grow, Activate)
/services/[slug]           → Detail
/projects                  → Listing + filter (category/industry/service) + search
/projects/[slug]           → Detail
/case-studies               → Listing
/case-studies/[slug]        → Detail
/testimonials               → Listing + submission form
/insights                   → Listing + filter
/insights/[slug]            → Article detail
/reports                    → Listing + download
/resources                  → Listing + download
/ai                         → Ryze AI (assistant + brief generator)
/about
/contact
/start-a-project
/careers                    → (exists today — migrate, don't drop)
/privacy /terms /cookie-policy /ai-disclosure
```

**Deferred to Phase 2:** `/partners`, `/advertise`, `/media-kit` as full commercial products. Ship them only as a "coming soon" / contact page (see Day 27 decision) — never as dead footer links.

---

## 5. DATA MODEL (MVP entities)

```
services            id, slug, name, group(enum), description, deliverables[], status, timestamps
projects            id, slug, name, industry, description, hero_image, gallery[], is_featured, status
project_services    project_id, service_id                      -- many-to-many join
case_studies        id, slug, project_id(FK), challenge, strategy, execution, results, status
testimonials        id, author_name, role, company, quote, rating, project_id(FK, nullable),
                     status(pending|approved|rejected), is_featured, consent_given, submitted_at
articles            id, slug, title, category, tags[], author_id(FK), cover_image, content,
                     seo_title, seo_description, status(draft|published), published_at
authors             id, name, bio, avatar
categories          id, name, slug
reports / resources  id, slug, title, summary, file_url, sponsor(nullable, Phase 2), status
leads                id, type(project|advertiser|general|newsletter), name, email, company,
                     message, ai_brief(jsonb, nullable), source, utm(jsonb), page, status
contact_submissions  (migrated from Mongo) id, name, email, message, source, created_at
job_applications     id, applicant_name, email, role_id(FK), resume_path(private storage), status
career_roles         id, title, description, status
profiles             id (→ auth.users), role(enum: public|editor|admin)
```

Every table needs: `created_at`, `updated_at`, and RLS policies of the shape **public read (published only) / authenticated write / admin publish**.

---

## 6. AI ASSISTANT — MVP SCOPE (Section 34–41 of the spec, scoped down)

What ships in 30 days:
- One assistant, embedded in the homepage panel and `/ai`
- **Grounded retrieval only** — pulls from approved `services`, `projects`, `case_studies`, `articles` via pgvector
- Every answer either cites a real source page or replies: *"I don't have enough verified information to answer that."*
- **Project Brief Generator**: guided Q&A → structured, user-editable brief → submitted to `leads` table with AI summary + conversation context + source/UTM

What does **not** ship (Phase 2, per both plans' deferral lists): long-term AI memory across sessions, personalization based on browsing history, AI content-assistant for admins, automated indexing pipelines.

Security non-negotiables (Section 50): AI must never invent clients, projects, testimonials, results, or pricing; provider keys stay server-side inside the Edge Function; never expose internal documents.

---

## 7. EXECUTION WORKFLOW — 30 DAYS (the plan you actually run)

This is the **audited MVP plan**, condensed to a working checklist. Full hour-by-hour breakdowns are in your source PDF — this is the day-level view to track against.

### Pre-work — Ground Truth
- Baseline commit: `38a7a82` (React 19/Vite/JS, Express 5 + Mongoose)
- **Fix today, before anything else:** `GET /api/contact` and `GET /api/applications` have no auth — anyone can currently read every lead and applicant's PII
- Rule: never delete the Node/Express/Mongo stack until its Supabase replacement passes production checks

### Week 1 — Protect, Plan, Foundation
| Day | Deliverable | Done-when |
|---|---|---|
| 1 | Baseline audit + security hotfix on the two open GET endpoints + protected branch/tag | PII reads blocked; every route/content-source/API listed |
| 2 | Backlog: classify every spec item MVP / Phase 2 / rejected; map `App.jsx` states → real routes; map hard-coded content → Supabase tables | Every backlog item has source, target, owner, acceptance test |
| 3 | Scaffold Next.js App Router + TS + Tailwind; migrate Navbar/Footer/tokens first; real routes for home/about/careers/services/work; kill hardcoded `localhost:5000` | Build passes; new routes survive direct refresh |
| 4 | Postgres schema: `services`, `projects`, `project_services`, `case_studies`, `testimonials`, `contact_submissions`, `job_applications`, `career_roles`, `profiles`, `articles`, `authors`, `categories`, `leads` | Migrations run clean; no duplicate slugs; FKs validate |
| 5 | Supabase Auth + role mapping + RLS (public read / authenticated write / admin publish) | Public can't read leads/drafts; editor can't manage roles |
| 6 | Storage buckets (private resumes, public project-media) + migrate `Careers.jsx` upload off local disk | Local-disk dependency gone |
| 7 | Design tokens → Tailwind; adopt select shadcn/ui primitives; stabilize Navbar/Footer; shared loading/empty/error states; motion primitives; test reduced-motion + 300-frame hero sequence on mobile | 3 breakpoints pass; reduced motion works; no layout shift |

### Week 2 — Agency Layer (Services, Projects, Case Studies)
| Day | Deliverable | Done-when |
|---|---|---|
| 8 | Services admin CRUD | Full CRUD passes; no duplicate slugs |
| 9 | Public services listing + detail-by-slug | 100% DB-driven; drafts private |
| 10 | Projects admin CRUD + industry/tech/multi-service relationships | Only published projects public |
| 11 | Public projects listing, filtering + search | Filter/search matrix passes; mobile grid works |
| 12 | Project detail pages (hero→challenge→approach→execution→results→gallery→testimonial→related) | Every published slug loads direct; no fake sections |
| 13 | Case studies admin, tied to a project **+ Client Verification Gate** (§3.3 above) | Unverified results/logos cannot publish |
| 14 | Public case studies + Week-2 regression | Zero critical regressions |

### Week 3 — Testimonials, Knowledge, Leads/CRM
| Day | Deliverable | Done-when |
|---|---|---|
| 15 | Public testimonial submission → `PENDING` always | 100% new submissions stay pending |
| 16 | Moderation (approve/reject/edit/feature/archive) + reusable card | No pending/rejected record ever public |
| 17 | Insights/Articles CMS (fields, categories, tags, SEO, draft/publish) | Drafts private; SEO fields validated pre-publish |
| 18 | Public Insights listing + article detail | Every published slug loads; filters pass |
| 19 | Reports & Resources MVP (CRUD + download flow + event logging) | Drafts/private files blocked; downloads logged |
| 20 | Migrate `Contact.jsx` off `localhost:5000`; build Start-a-Project lead form | Valid leads stored; public reads fail |
| 21 | CRM (lead list/status/notes) + migrate `Careers.jsx` applications + signed resume download + Week-3 regression | Contact/application data admin-only; RLS verified |

### Week 4 — Command Center, Search, AI, Hardening
| Day | Deliverable | Done-when |
|---|---|---|
| 22 | Admin dashboard — **real counts only** | Dashboard numbers match DB test counts exactly |
| 23 | Unified search (services/projects/case-studies/insights) + related-content | No fabricated recommendations |
| 24 | Newsletter capture + analytics event taxonomy | Consent stored; events fire correctly |
| 25 | Grounded AI assistant via Edge Function (retrieval + citations + refusal) | Secret never touches browser; unknown queries refuse cleanly |
| 26 | AI Project Brief MVP → editable → CRM | Every brief editable, valid, attached to exactly one lead |
| 27 | SEO (Metadata API, sitemap, robots, structured data) **+ Footer Partners decision** (below) | Every footer link resolves to a real page — zero dead links |
| 28 | Security + accessibility + media perf (compress 300 hero JPGs + 14.5MB `SGA.png`) | 0 critical/high defects; keyboard-operable; mobile media budget met |

### Week 5 — Release
| Day | Deliverable |
|---|---|
| 29 | Full E2E acceptance test: Auth→Publish flows→Testimonial flow→Article/Resource flow→Lead+AI brief→CRM. Fix all blockers. |
| 30 | Confirm rollback → deploy → smoke test → verify Sentry/PostHog live → handover doc + known-limitations register → stakeholder demo → open Phase-2 backlog |

**Day-27 decision, make it explicitly:** the mockup footer has a full Partners column (Advertise/Media Kit/Partnerships) but ad ops are Phase 2. Either route those links to a simple "coming soon"/contact page for Day 30, or remove the column until Phase 2. A footer link with no destination is a dead link and violates the zero-placeholder policy.

---

## 8. RELEASE GATE — ALL MUST BE TRUE ON DAY 30

- [ ] Services/Projects/Case Studies: full CRUD + relationships work end-to-end on Supabase
- [ ] Testimonials: pending-by-default, human-approved, reusable across pages
- [ ] Insights/Reports/Resources: publish, discover, search, download all work
- [ ] Leads/CRM: contact + AI-brief leads land in CRM with source/page/UTM, admin-only access
- [ ] AI: answers are grounded, cite sources, refuse unsupported claims, secrets stay server-side
- [ ] Security: RLS, roles, secrets, uploads, validation, rate limits all pass
- [ ] Quality: zero open release blockers; 375px/768px/1440px pass; keyboard-operable
- [ ] Ops: monitoring, rollback, handover doc, Phase-2 backlog all exist
- [ ] **Client integrity:** every client name/logo/case study on the live site has a verified consent record
- [ ] **No dead links:** every nav and footer link (including Partners) resolves to a real page or an honest "coming soon" state

---

## 9. EXPLICITLY DEFERRED TO PHASE 2 (do not scope-creep these into the 30 days)

- Full advertising campaign/placement engine + sponsorship operations
- Advanced media-kit metrics, AI recommendations/personalization
- Long-term AI memory, AI content assistant, AI-driven content automation
- Large-scale newsletter delivery, multi-tier approval hierarchies
- Payment products beyond the confirmed MVP need

---

## 10. DAILY DISCIPLINE (apply every day of the 30)

1. **Start of day:** review yesterday's evidence, confirm dependencies, state today's acceptance criteria
2. **During dev:** use AI for explanation/review only — never ship code you can't explain
3. **Testing:** 60–90 min/day minimum — positive, negative, permission, responsive, failure-path
4. **End of day:** commit working code, update KPIs, log root causes, be honest about what's incomplete
5. **Scope control:** nothing new enters the sprint unless something else is formally dropped