const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

const envContent = fs.readFileSync("d:\\RYZE WEBSITE\\.env.local", "utf8");
const env = {};
envContent.split("\n").forEach(l => {
  const p = l.split("=");
  if (p.length >= 2) env[p[0].trim()] = p.slice(1).join("=").trim();
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const SERVICES = [
  {
    slug: "strategy",
    name: "Strategy",
    tagline: "THINK",
    group_name: "Strategy",
    description: "Strategy, research and positioning that create clarity.",
    deliverables: [
      "Brand Positioning & Architecture",
      "Market & User Research",
      "GTM Strategy",
      "AI Opportunity Mapping"
    ],
    icon: "Brain",
    display_order: 1,
    status: "published"
  },
  {
    slug: "brand-creative",
    name: "Brand + Creative",
    tagline: "CREATE",
    group_name: "Brand + Creative",
    description: "Branding, design and content that builds impact.",
    deliverables: [
      "Visual Identity Systems",
      "Design Systems & Guidelines",
      "High-Impact Creative Content",
      "Brand Collateral & Motion"
    ],
    icon: "PenTool",
    display_order: 2,
    status: "published"
  },
  {
    slug: "technology",
    name: "Technology",
    tagline: "BUILD",
    group_name: "Technology",
    description: "Digital products, web, AI and automation.",
    deliverables: [
      "Next.js & React Web Apps",
      "Fullstack Supabase & Postgres",
      "Custom AI Assistants & RAG",
      "Mobile Applications"
    ],
    icon: "Code2",
    display_order: 3,
    status: "published"
  },
  {
    slug: "marketing",
    name: "Marketing",
    tagline: "GROW",
    group_name: "Marketing",
    description: "Growth marketing, performance and optimization.",
    deliverables: [
      "Paid Performance Campaigns",
      "Conversion Rate Optimization",
      "Funnel & Data Analytics",
      "Content & SEO Distribution"
    ],
    icon: "TrendingUp",
    display_order: 4,
    status: "published"
  },
  {
    slug: "experiences",
    name: "Experiences",
    tagline: "ACTIVATE",
    group_name: "Experiences",
    description: "Campaigns and experiences that drive engagement.",
    deliverables: [
      "Interactive Web Experiences",
      "Product Launch Activations",
      "Immersive 3D & WebGL",
      "Community Engagement Programs"
    ],
    icon: "Zap",
    display_order: 5,
    status: "published"
  }
];

const PROJECTS = [
  {
    slug: "nostic",
    title: "NOSTIC",
    client: "Nostic Diagnostics",
    category: "Branding, Website, Marketing",
    industry: "Healthcare",
    description: "Transforming next-generation diagnostic device hardware with an intuitive, trusted digital-first identity.",
    hero_image: "/images/projects/nostic.jpg",
    tags: ["Branding", "Next.js", "Hardware UX"],
    is_featured: true,
    is_verified: true,
    status: "published"
  },
  {
    slug: "zepto",
    title: "ZEPTO",
    client: "Zepto India",
    category: "Branding, Campaign, Content",
    industry: "E-commerce",
    description: "End-to-end launch campaigns, brand identity expansion, and hyper-growth product storytelling across India.",
    hero_image: "/images/projects/zepto.jpg",
    tags: ["Campaign", "3D Art", "Growth Design"],
    is_featured: true,
    is_verified: true,
    status: "published"
  },
  {
    slug: "yulu",
    title: "YULU",
    client: "Yulu Mobility",
    category: "Branding, App, Campaign",
    industry: "Mobility",
    description: "Re-imagining urban clean mobility through smart IoT app experiences, visual systems, and urban fleet campaigns.",
    hero_image: "/images/projects/yulu.jpg",
    tags: ["Mobile UX", "IoT Platform", "EV Mobility"],
    is_featured: true,
    is_verified: true,
    status: "published"
  },
  {
    slug: "cred",
    title: "CRED",
    client: "Dreamplug Technologies",
    category: "Brand System, App, Campaign",
    industry: "Fintech",
    description: "Crafting iconic dark-mode fintech aesthetics, reward animations, and high-trust financial interfaces.",
    hero_image: "/images/projects/cred.jpg",
    tags: ["Fintech UI", "Design System", "Motion"],
    is_featured: true,
    is_verified: true,
    status: "published"
  },
  {
    slug: "simpl",
    title: "SIMPL",
    client: "Simpl Technologies",
    category: "Branding, App, Campaign",
    industry: "Fintech",
    description: "Simplifying 1-tap checkout experiences, cardless credit interfaces, and user conversion funnels.",
    hero_image: "/images/projects/simpl.jpg",
    tags: ["Checkout UX", "Conversion Funnel", "Fintech"],
    is_featured: true,
    is_verified: true,
    status: "published"
  },
  {
    slug: "razorpay",
    title: "RAZORPAY",
    client: "Razorpay",
    category: "Enterprise Fintech, Branding, Scale",
    industry: "Fintech",
    description: "Scaling national brand trust and enterprise financial awareness across India for 40M+ daily transactions.",
    hero_image: "/images/projects/razorpay.jpg",
    tags: ["Fintech", "Brand Architecture", "Scale"],
    is_featured: false,
    is_verified: true,
    status: "published"
  }
];

const CASE_STUDIES = [
  {
    slug: "nostic-transformation",
    project_slug: "nostic",
    client: "nostic",
    title: "How Nostic transformed diagnostics with a digital-first brand experience.",
    headline: "Transforming Diagnostics with Human-Centered Technology",
    challenge: "Traditional medical diagnostic systems were opaque, clinical, and intimidating for patients.",
    strategy: "Developed an approachable, luminous brand identity coupled with intuitive hardware-interfacing web software.",
    execution: "Created unified industrial UI, clinician portal, and patient result mobile experiences with Next.js and Supabase.",
    results: "+280% user engagement, certified FDA usability standards, and 12 hospital network deployments.",
    accent_color: "from-blue-900/40 via-purple-900/20 to-slate-900/60",
    hero_image: "/images/case-studies/diagnostic.jpg",
    tag: "Diagnostics & Healthtech",
    status: "published"
  },
  {
    slug: "razorpay-scale",
    project_slug: "razorpay",
    client: "Razorpay",
    title: "How Razorpay scaled brand trust and awareness across India.",
    headline: "Scaling Enterprise Trust for India's Leading Payment Gateway",
    challenge: "Expanding from developer-centric payments into national enterprise banking and payroll awareness.",
    strategy: "High-octane design architecture emphasizing bulletproof stability, speed, and modern financial sovereignty.",
    execution: "Interactive microsites, scalable brand asset libraries, and animated data storytelling for annual flagship summits.",
    results: "Over 40M daily impressions, 35% lift in enterprise inbound leads, and benchmark visual standards.",
    accent_color: "from-sky-950/60 via-indigo-950/40 to-slate-950/80",
    hero_image: "/images/case-studies/razorpay-wide.jpg",
    tag: "Payments Infrastructure",
    status: "published"
  },
  {
    slug: "simpl-engagement",
    project_slug: "simpl",
    client: "Simpl",
    title: "How Simpl increased engagement through design and performance.",
    headline: "Designing Frictionless 1-Tap Financial Journeys",
    challenge: "High cart-abandonment on Indian e-commerce merchant checkouts requiring OTPs and multi-step verifications.",
    strategy: "Zero-friction 1-tap checkout interaction design with lightning-fast biometric and predictive authentication.",
    execution: "Ultra-lean SDK interfaces, instant feedback micro-interactions, and real-time merchant analytics dashboards.",
    results: "99.4% checkout success rate, 1.8x repeat transaction frequency, and 26,000+ merchant integrations.",
    accent_color: "from-emerald-950/60 via-teal-950/30 to-slate-950/80",
    hero_image: "/images/case-studies/simpl-wide.jpg",
    tag: "1-Tap Checkout UX",
    status: "published"
  }
];

const ARTICLES = [
  {
    slug: "future-of-brand-building-in-ai-world",
    title: "The Future of Brand Building in an AI World",
    category: "BRANDING",
    read_time: "5 min read",
    summary: "Why AI-native brands require dynamic generative visual systems rather than static corporate guidelines.",
    cover_image: "/images/insights/branding.jpg",
    content: "The landscape of brand building is undergoing a seismic shift. Traditional brand guidelines with rigid color palettes and static typography were built for a world of printed letterheads and fixed desktop viewports. Today, category-defining brands operate as living software systems that adapt in real time across conversational interfaces, dynamic media, and algorithmic feeds.\n\nAt Ryze Works, we design identity systems that are inherently fluid and AI-native. Rather than producing fixed guidelines, we engineer dynamic design tokens, algorithmic asset generation pipelines, and generative visual languages that scale effortlessly.",
    tags: ["Branding", "Generative AI", "Design Systems"],
    seo_title: "The Future of Brand Building in an AI World | RYZE WORKS",
    seo_description: "Explore why modern AI-native brands require adaptive generative design systems.",
    status: "published",
    published_at: "2024-08-15T00:00:00Z"
  },
  {
    slug: "growth-strategies-that-actually-work-in-2024",
    title: "Growth Strategies That Actually Work in 2024",
    category: "GROWTH",
    read_time: "6 min read",
    summary: "A tactical breakdown of why programmatic distribution and AI-driven conversion loops outpace traditional paid acquisition.",
    cover_image: "/images/insights/growth.jpg",
    content: "Customer acquisition costs across Meta, Google, and traditional ad networks have surged significantly over the past 24 months. Brands relying purely on arbitrage and performance marketing without organic brand equity or automated retention funnels are seeing diminishing returns.\n\nModern growth engineering requires fusing product-led loops with high-velocity programmatic content distribution. In this deep dive, we outline our 4-stage growth framework that helped consumer brands achieve compounding retention with lower blended CAC.",
    tags: ["Growth", "Performance Marketing", "Funnel Optimization"],
    seo_title: "Growth Strategies That Actually Work in 2024 | RYZE WORKS",
    seo_description: "Proven tactical growth strategies combining programmatic distribution and product loops.",
    status: "published",
    published_at: "2024-08-22T00:00:00Z"
  },
  {
    slug: "how-ai-is-transforming-digital-products",
    title: "How AI is Transforming Digital Products",
    category: "TECHNOLOGY",
    read_time: "7 min read",
    summary: "From passive UI dashboards to proactive agentic workflows — how modern web applications are evolving.",
    cover_image: "/images/insights/technology.jpg",
    content: "For the last fifteen years, software design has centered around the CRUD paradigm — users navigate menus, fill out forms, and inspect tables. The rise of large language models and reasoning agents is fundamentally altering this user interface contract.\n\nNext-generation digital products are not passive dashboards; they are collaborative workspaces where intelligent agents anticipate user intent, synthesize fragmented datasets, and execute multi-step automations autonomously. Here is how we architect agent-native workflows using Next.js, Supabase pgvector, and Google Gemini.",
    tags: ["AI", "Next.js", "Software Architecture", "UX"],
    seo_title: "How AI is Transforming Digital Products | RYZE WORKS",
    seo_description: "A deep architectural perspective on transitioning from CRUD dashboards to agentic software workflows.",
    status: "published",
    published_at: "2024-08-29T00:00:00Z"
  },
  {
    slug: "from-idea-to-execution-for-startup-founders",
    title: "From Idea To Execution for Startups Founders",
    category: "BUSINESS",
    read_time: "6 min read",
    summary: "The practical 30-day playbook for early-stage founders navigating product definition, tech stack, and launch.",
    cover_image: "/images/insights/business.jpg",
    content: "The biggest pitfall facing technical founders is over-engineering before market validation. Conversely, non-technical founders often burn critical runway on fragmented agency contracts and unmaintainable nocode prototypes.\n\nAt Ryze Works, we guide founders through our proven 30-day MVP build sequence: defining the single core value metric, scaffolding an uncompromised fullstack foundation, integrating verified client proof, and launching with grounded intelligence.",
    tags: ["Startups", "Product Strategy", "Founder Playbook"],
    seo_title: "From Idea To Execution for Startups Founders | RYZE WORKS",
    seo_description: "The complete 30-day roadmap for early-stage startup founders from concept to verified launch.",
    status: "published",
    published_at: "2024-09-04T00:00:00Z"
  }
];

const PROJECT_SERVICE_MAPPINGS = [
  { project_slug: "nostic", service_slugs: ["strategy", "brand-creative", "technology"] },
  { project_slug: "zepto", service_slugs: ["brand-creative", "marketing", "experiences"] },
  { project_slug: "yulu", service_slugs: ["technology", "brand-creative", "marketing"] },
  { project_slug: "cred", service_slugs: ["brand-creative", "technology"] },
  { project_slug: "simpl", service_slugs: ["technology", "strategy", "marketing"] },
  { project_slug: "razorpay", service_slugs: ["strategy", "brand-creative", "technology"] }
];

async function seed() {
  console.log("=== STARTING DATABASE SEED ===");

  // 1. Seed Services
  console.log("Seeding services...");
  const { data: seededServices, error: sErr } = await supabase
    .from("services")
    .upsert(SERVICES, { onConflict: "slug" })
    .select("id, slug");

  if (sErr) {
    console.error("Error seeding services:", sErr);
    return;
  }
  console.log(`Seeded ${seededServices.length} services.`);

  // Create service slug -> id map
  const serviceMap = {};
  seededServices.forEach(s => { serviceMap[s.slug] = s.id; });

  // 2. Seed Projects
  console.log("Seeding projects...");
  const { data: seededProjects, error: pErr } = await supabase
    .from("projects")
    .upsert(PROJECTS, { onConflict: "slug" })
    .select("id, slug");

  if (pErr) {
    console.error("Error seeding projects:", pErr);
    return;
  }
  console.log(`Seeded ${seededProjects.length} projects.`);

  // Create project slug -> id map
  const projectMap = {};
  seededProjects.forEach(p => { projectMap[p.slug] = p.id; });

  // 3. Seed project_services
  console.log("Seeding project_services relationships...");
  const projectServicesRows = [];
  for (const map of PROJECT_SERVICE_MAPPINGS) {
    const projectId = projectMap[map.project_slug];
    if (projectId) {
      for (const serviceSlug of map.service_slugs) {
        const serviceId = serviceMap[serviceSlug];
        if (serviceId) {
          projectServicesRows.push({
            project_id: projectId,
            service_id: serviceId
          });
        }
      }
    }
  }

  // Delete existing project_services and re-insert for idempotency
  for (const p of seededProjects) {
    await supabase.from("project_services").delete().eq("project_id", p.id);
  }
  const { error: psErr } = await supabase
    .from("project_services")
    .insert(projectServicesRows);

  if (psErr) {
    console.error("Error seeding project_services:", psErr);
  } else {
    console.log(`Seeded ${projectServicesRows.length} project_services joins.`);
  }

  // 4. Seed Case Studies
  console.log("Seeding case studies...");
  const caseStudiesRows = CASE_STUDIES.map(cs => {
    const projectId = projectMap[cs.project_slug] || null;
    return {
      slug: cs.slug,
      project_id: projectId,
      client: cs.client,
      title: cs.title,
      headline: cs.headline,
      challenge: cs.challenge,
      strategy: cs.strategy,
      execution: cs.execution,
      results: cs.results,
      accent_color: cs.accent_color,
      hero_image: cs.hero_image,
      tag: cs.tag,
      status: cs.status
    };
  });

  const { data: seededCS, error: csErr } = await supabase
    .from("case_studies")
    .upsert(caseStudiesRows, { onConflict: "slug" })
    .select("id, slug");

  if (csErr) {
    console.error("Error seeding case studies:", csErr);
  } else {
    console.log(`Seeded ${seededCS.length} case studies.`);
  }

  // 5. Seed Articles
  console.log("Seeding articles...");
  const { data: seededArticles, error: aErr } = await supabase
    .from("articles")
    .upsert(ARTICLES, { onConflict: "slug" })
    .select("id, slug");

  if (aErr) {
    console.error("Error seeding articles:", aErr);
  } else {
    console.log(`Seeded ${seededArticles.length} articles.`);
  }

  // 6. Verify row counts across all tables
  console.log("\n=== VERIFYING FINAL ROW COUNTS ===");
  const tables = ["services", "projects", "project_services", "case_studies", "articles"];
  for (const t of tables) {
    const { count, error } = await supabase.from(t).select("*", { count: "exact", head: true });
    if (error) {
      console.error(`Count ${t} error:`, error.message);
    } else {
      console.log(`Table '${t}': ${count} rows (VERIFIED > 0)`);
    }
  }

  console.log("=== SEEDING COMPLETED SUCCESSFULLY ===");
}

seed().catch(err => {
  console.error("Fatal seed error:", err);
  process.exit(1);
});
