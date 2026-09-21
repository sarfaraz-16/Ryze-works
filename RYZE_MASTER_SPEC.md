# RYZE WORKS: Master System & Architecture Specification

## 1. Executive Brand & Design System Identity

**Brand Name:** RYZE WORKS (or RYZE)  
**Positioning:** AI-Native Creative & Technology Partner. "Strategy. Design. Technology. Content. Powered by AI. We help ambitious brands build, grow and scale with clarity, creativity and intelligent systems."  
**Target Audience & Market Niche:** Enterprise and ambitious startup founders looking for premium, next-generation digital products, deep-tech AI integration, and cutting-edge visual experiences.

**Complete Color Palette (Hex Codes):**
- **Obsidian Backgrounds / Void:**
  - `var(--background)` / `--brand-void`: `#080417` (Main app background)
  - `var(--gradient-void-900)`: `#04031A`
  - `var(--gradient-void-950)`: `#010314`
- **Dark Glass Surfaces (Glassmorphism):**
  - Card Backgrounds: `rgba(13, 14, 23, 0.85)`
  - Card Borders: `rgba(255, 255, 255, 0.08)`
  - Card Hover Borders: `rgba(184, 150, 255, 0.35)`
- **Neon Violet/Purple Accents:**
  - `var(--brand-primary)`: `#7042FF`
  - `var(--brand-light)`: `#B896FF`
  - `var(--brand-mid)`: `#4318D1`
  - `var(--brand-deep)`: `#1E085A`
  - Secondary accents: `#8b5cf6` (Purple), `#d946ef` (Magenta)
- **Sharp Cyan Accents:**
  - Cyan Highlights: `#38bdf8` / `#06b6d4` (Used for 3D emissive lighting and electric contrast)
- **Neutral Text Scales:**
  - `var(--foreground)`: `#f4f4f5` (Zinc 100)

**Typography System:**
- **Primary / Display Font:** Plus Jakarta Sans (`--font-sans`). Variable weight support (400, 500, 600, 700). Used for all major headings and body copy.
  - Headings Tracking: `tracking-tight` or specific `-0.01em` adjustments.
  - Giant hero text uses extreme tracking configurations, e.g., `tracking-[0.24em]` or `tracking-[0.28em]`.
- **Secondary / Monospace Font:** Geist Mono (`--font-geist-mono`). Used for technical badges, eyebrow labels, telemetry strips, and telemetry grid markers. (e.g., `CREATIVE ENGINEERING // NEXT-GEN DIGITAL SYSTEMS`).
- **Styling Conventions:** Technical badges are often styled with `text-[10px] font-mono tracking-widest uppercase` and accompanied by a pulsating `w-1.5 h-1.5` dot.

**Visual Motifs & Art Direction:**
- **Obsidian Glassmorphism:** Heavy use of `backdrop-blur-md` to `backdrop-blur-2xl` on navigation bars, modals, and metric cards against `#05030A` / `#080417` backgrounds.
- **3D Interactive Elements:** Custom Three.js preloader, `HeroOrb3D`, and `CosmicBackground3D` utilizing WebGL canvas integration for 0-latency interactive visuals. Framer Motion is used for layout transitions and micro-interactions (`hover:scale-105`, `active:scale-95`).
- **Pacing:** Framer motion easings frequently utilize `ease: [0.76, 0, 0.24, 1]` or `easeOut` over `0.6` to `0.8` durations for a cinematic feel.

---

## 2. Full Tech Stack, Configuration & Dependencies

**Framework & Runtime:**
- **Next.js:** `16.3.4` (App Router architecture, Turbopack enabled for local dev).
- **React / React DOM:** `19.2.8` (Concurrent features enabled).
- **TypeScript:** `^5` (Strict mode enforced via `tsconfig.json`, target `ES2017`, `moduleResolution: bundler`).

**Styling & Motion Libraries:**
- **Tailwind CSS:** `^4` (using `@tailwindcss/postcss`). Integrated directly into `globals.css` using the new `@theme` configuration directives.
- **Framer Motion:** `^13.2.0` (Handles all DOM animation, `AnimatePresence` routing fades, and layout transitions).
- **Three.js:** `^0.186.0` (Core 3D engine for WebGL elements).
- **Lucide React:** `^1.41.0` (Iconography).

**Backend & Integrations:**
- **Supabase:** `@supabase/supabase-js` (`^2.115.0`) & `@supabase/ssr` (`^0.12.7`).
  - Edge/Server setup inside `lib/supabase/server.ts` and `client.ts`.
  - Database schema includes tables for Careers, Leads, Testimonials, and AI Embeddings.
- **Zod:** `^4.5.4` (Schema validation for forms and API routes).

**Build & Deployment Pipeline:**
- **Vercel Config:** Managed via Next.js standard build out. Middleware acts as proxy configuration due to Next.js 16 deprecations.
- **Package Scripts:** `npm run dev` (Turbopack Next server), `npm run build` (Static export & SSR), `npm run lint`.

---

## 3. Complete Project Directory & File Tree

```text
RYZE WORKS
├── app/
│   ├── about/page.tsx
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── login/page.tsx
│   │   ├── articles/ (actions.ts, new/page.tsx, [id]/page.tsx, ArticleEditorForm.tsx)
│   │   ├── careers/ (actions.ts, page.tsx, ApplicationsDeskClient.tsx)
│   │   ├── leads/ (actions.ts, page.tsx, LeadsDeskClient.tsx)
│   │   └── testimonials/ (actions.ts, page.tsx, TestimonialModerationClient.tsx)
│   ├── advertise/page.tsx
│   ├── ai/ (page.tsx, lab/page.tsx)
│   ├── api/
│   │   ├── ai/ (brief/route.ts, chat/route.ts, search/route.ts)
│   │   ├── careers/apply/route.ts
│   │   ├── leads/route.ts
│   │   └── testimonials/route.ts
│   ├── careers/ (page.tsx, CareerRoleCard.tsx)
│   ├── case-studies/ (page.tsx, [slug]/page.tsx)
│   ├── contact/page.tsx
│   ├── insights/ (page.tsx, [slug]/page.tsx, InsightsClient.tsx)
│   ├── projects/ (page.tsx, [slug]/page.tsx, ProjectsClient.tsx)
│   ├── reports/ (page.tsx, [slug]/page.tsx)
│   ├── resources/ (page.tsx, [slug]/page.tsx, ResourcesClient.tsx)
│   ├── services/ (page.tsx, [slug]/page.tsx)
│   ├── testimonials/ (page.tsx, TestimonialCard.tsx, TestimonialsSubmissionForm.tsx)
│   ├── work/ (page.tsx, [slug]/page.tsx)
│   ├── ai-disclosure/page.tsx
│   ├── cookie-policy/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── media-kit/page.tsx
│   ├── partners/page.tsx
│   ├── start-a-project/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── admin/AdminShell.tsx
│   ├── ai/AiNeuralCore3D.tsx
│   ├── background/ (CosmicBackground.tsx, CosmicBackground3D.tsx)
│   ├── commercial/AdvertiserInquiryForm.tsx
│   ├── hero/ (HeroOrb.tsx, HeroOrb3D.tsx, HeroSection.tsx)
│   ├── layout/ (Footer.tsx, Navbar.tsx, Preloader.tsx)
│   ├── projects/ (ProjectCard.tsx, ProjectDetailHero.tsx)
│   ├── reports/ReportDownloadForm.tsx
│   ├── resources/ (ResourceDownloadForm.tsx, ResourcesClient.tsx)
│   ├── sections/ (CaseStudies.tsx, ClosingCTA.tsx, FeaturedWork.tsx, LatestInsights.tsx, RyzeAIPanel.tsx, Testimonials.tsx, TrustedBy.tsx, WhatWeDo.tsx)
│   ├── services/ServiceCapabilityCard.tsx
│   └── ui/ (Badge.tsx, Button.tsx, CosmicHorizon3D.tsx, IconShield3D.tsx, ProjectMockup.tsx, SectionHeader.tsx, TiltCard3D.tsx)
├── data/
│   ├── reportsData.ts
│   ├── resourcesData.ts
│   └── siteData.ts
├── hooks/
│   └── useTilt3D.ts
├── lib/
│   ├── ai/embeddings.ts
│   ├── supabase/ (client.ts, server.ts)
│   ├── supabase.ts
│   ├── utils.ts
│   └── utils/readingTime.ts
├── scripts/ (seed scripts, acceptance tests, setup scripts)
├── supabase/
│   ├── migrations/ (init_schema.sql, careers.sql)
│   └── schema.sql
├── types/
│   └── index.ts
└── [Config Files] (next.config.ts, tailwind/postcss config, tsconfig.json, package.json, middleware.ts)
```

### Key File Responsibilities:
- **`app/layout.tsx`**: The global root layout. Renders `<CosmicBackground />`, the primary `<Preloader />`, and injects custom fonts (Jakarta & Geist).
- **`components/layout/Preloader.tsx`**: High-fidelity Three.js & Framer Motion entrance animation. Manages WebGL rendering context, `sessionStorage` execution gating, and memory cleanup.
- **`components/background/CosmicBackground.tsx`**: Global fixed background overlay providing the underlying space aesthetic across the entire application layout.
- **`data/siteData.ts`**: Centralized, typed content registry for all case studies, services, insights, and global constants to prevent hardcoded duplication.
- **`lib/supabase/server.ts`**: Exposes authenticated Supabase client for Server Actions and API routes leveraging cookies.
- **`app/api/leads/route.ts` & `AdvertiserInquiryForm.tsx`**: End-to-end integration mapping frontend client queries securely to Supabase `leads` tables with Zod validation.

---

## 4. Complete Route Map & Information Architecture

**1. Root & Marketing**
- `/` (`app/page.tsx`): The primary landing page. Utilizes `HeroSection`, `RyzeAIPanel`, and `FeaturedWork`. Static route.
- `/about` (`app/about/page.tsx`): Agency thesis, vision, and core team information.
- `/contact` & `/start-a-project`: Unified inbound lead generation forms communicating with `/api/leads`.

**2. Portfolios & Work**
- `/work` & `/projects` & `/case-studies`: Grid listings of premium case studies.
- `/work/[slug]` (`app/work/[slug]/page.tsx`): Dynamic Obsidian Glass case study templates. Rendered statically using data from `siteData.ts` (SSG).

**3. Services & Capabilities**
- `/services`: Overview of core competencies.
- `/services/[slug]`: Deep dive into specific service verticals (e.g., Brand Strategy, Technical Architecture).

**4. Content & Intelligence**
- `/insights`: High-level blog/article listings.
- `/insights/[slug]`: Elevated reading terminal UI with dynamic typography and matrix visuals.
- `/reports/[slug]` & `/resources/[slug]`: Gated high-value assets integrating download forms tied to Lead capture.

**5. Operations & Legal**
- `/admin/*`: Secure dashboard using `AdminShell.tsx` for managing DB records (articles, leads, careers).
- `/privacy`, `/terms`, `/cookie-policy`, `/ai-disclosure`: Goverance terminal pages utilizing identical obsidian glass aesthetic (transparency + telemetry grids).

**6. Automated SEO & Metadata**
- `/sitemap.ts` & `/robots.ts`: Next.js native API generation for dynamic crawler routing.

---

## 5. Preloader & 3D WebGL Implementation Details

**Component Location:** `components/layout/Preloader.tsx`

**Rendering Lifecycle:**
1. **Mount:** Initializes a `THREE.PerspectiveCamera` (FOV 45) and a `WebGLRenderer` bound to device pixel ratios.
2. **Phase 1 (Idle - 0 to 1.4s):** The central `SphereGeometry` (metalness: 0.9, clearcoat: 1.0) and nested `TorusGeometries` (neon violet & cyan emissive) float and rotate slowly. Particle geometry drifts towards the camera (`z += 0.015`).
3. **Phase 2 (Warp Surge - 1.4s to 2.5s):** The state switches to `"warp"`. Camera `z` is lerped forward aggressively (to `-1.8` on desktop, `-2.5` on mobile) while the particle speed multiplier increases 12x to create velocity streaks. The typography (`RYZE WORKS`) scales up and blurs out via Framer Motion.
4. **Phase 3 (Exit - 2.6s):** Sequence completes, `sessionStorage.setItem("ryze_preloader_seen", "true")` is fired, and `AnimatePresence` unmounts the `<motion.div>` with a `0.65s` ease-out fade.
5. **Memory Cleanup:** The `useEffect` cleanup explicitly calls `.dispose()` on all geometries, materials, and the renderer, and cancels the `requestAnimationFrame` to guarantee zero memory leaks.

**Responsiveness:**
- Dynamically recalculates `camera.aspect` and `renderer.setSize` via `window.addEventListener('resize')`.
- Mobile fallback checks `window.innerWidth < 640` to pull the camera further back (`z=8.5`), ensuring the rings and typography are not clipped by the viewport edges.
- Skip button uses CSS environmental variables: `bottom-[calc(1.2rem+env(safe-area-inset-bottom))]` to avoid overlapping iOS home bars.

---

## 6. State Management, Utilities & Session Flows

- **Preloader State:** Controlled entirely via native `sessionStorage` (`ryze_preloader_seen`). The check occurs in a `useEffect` on the client, deliberately bypassing if `process.env.NODE_ENV !== "production"` to ensure seamless local dev testing.
- **Client Forms:** Forms (Leads, Careers, Testimonials) utilize standard React `useState` for loading indicators (`isSubmitting`) paired with Zod object parsing before dispatching to Next.js API Routes via `fetch`.
- **Navigation Navbar:** Scroll-reactive state is often handled by tracking `window.scrollY`. The Navbar uses `usePathname` from `next/navigation` to detect active routes and append the glowing violet micro-dot indicator beneath the active link.

---

## 7. Engineering Rules & Development Guidelines

- **"use client" vs Server Components:**
  - All Three.js, Framer Motion, and window-dependent components (e.g., `Preloader`, `Navbar`, `TiltCard3D`) MUST use `"use client"` at the top of the file.
  - Page wrappers and data-fetching layouts (like `app/work/[slug]/page.tsx`) remain default Server Components for SEO and raw HTML delivery.
- **Three.js Integrity:**
  - Never allow a WebGL context to leak. Every instantiated `Geometry`, `Material`, and `Texture` must be rigorously destroyed in the `useEffect` cleanup block using `.dispose()`.
- **CSS / UI:**
  - Do not use standard CSS colors. All components must map to the brand design variables (e.g., `bg-black/50 backdrop-blur-md border border-white/10`).
  - Rely on `scale-95` on `active:` pseudo-classes for button micro-interactions.
- **Build Standards:**
  - Production builds (`npm run build`) must execute with 0 TypeScript compilation errors and 0 ESLint warnings.

---

## 8. Current Backlog & Immediate Next Steps

**Codebase Status:** Stable, pristine condition. The transition from legacy `middleware` to `proxy` (per Next.js 16.3.4 specifications) is pending but not blocking the build. The Preloader and Obsidian design systems are fully functional across all viewport sizes.

**Immediate Next Steps for Subsequent Agents:**
1. **Middleware Migration:** Refactor `middleware.ts` to `proxy` architecture to resolve the Turbopack build warning.
2. **Supabase Hydration Check:** Audit all Server-to-Client boundary data passes for `siteData.ts` objects to ensure no non-serializable objects cause hydration warnings.
3. **Database Seeding Verification:** Run `node scripts/setup_storage.js` and `scripts/seed.js` to ensure the cloud Supabase instance is properly populated with the mock test data prior to final Vercel branch deployment. 
4. **Performance Profiling:** Verify that `<CosmicBackground3D />` and `<Preloader />` are not causing WebGL context limits or battery drain on mobile devices through Chrome DevTools rendering profiles.
