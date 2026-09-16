import { Service, Project, CaseStudy, Testimonial, Article } from "@/types";

export const SERVICES_DATA: Service[] = [
  {
    id: "think-strategy",
    slug: "strategy",
    name: "Strategy",
    tagline: "THINK",
    group: "Strategy",
    icon: "Brain",
    description: "Strategy, research and positioning that create clarity.",
    deliverables: [
      "Brand Positioning & Architecture",
      "Market & User Research",
      "GTM Strategy",
      "AI Opportunity Mapping"
    ]
  },
  {
    id: "create-brand",
    slug: "brand-creative",
    name: "Brand + Creative",
    tagline: "CREATE",
    group: "Brand + Creative",
    icon: "PenTool",
    description: "Branding, design and content that builds impact.",
    deliverables: [
      "Visual Identity Systems",
      "Design Systems & Guidelines",
      "High-Impact Creative Content",
      "Brand Collateral & Motion"
    ]
  },
  {
    id: "build-tech",
    slug: "technology",
    name: "Technology",
    tagline: "BUILD",
    group: "Technology",
    icon: "Code2",
    description: "Digital products, web, AI and automation.",
    deliverables: [
      "Next.js & React Web Apps",
      "Fullstack Supabase & Postgres",
      "Custom AI Assistants & RAG",
      "Mobile Applications"
    ]
  },
  {
    id: "grow-marketing",
    slug: "marketing",
    name: "Marketing",
    tagline: "GROW",
    group: "Marketing",
    icon: "TrendingUp",
    description: "Growth marketing, performance and optimization.",
    deliverables: [
      "Paid Performance Campaigns",
      "Conversion Rate Optimization",
      "Funnel & Data Analytics",
      "Content & SEO Distribution"
    ]
  },
  {
    id: "activate-experiences",
    slug: "experiences",
    name: "Experiences",
    tagline: "ACTIVATE",
    group: "Experiences",
    icon: "Zap",
    description: "Campaigns and experiences that drive engagement.",
    deliverables: [
      "Interactive Web Experiences",
      "Product Launch Activations",
      "Immersive 3D & WebGL",
      "Community Engagement Programs"
    ]
  }
];

export const TRUSTED_CLIENTS = [
  { name: "nostic", label: "nostic", industry: "Healthtech", logoStyle: "font-mono tracking-tighter lowercase font-bold" },
  { name: "zepto", label: "zepto", industry: "Quick Commerce", logoStyle: "font-black tracking-normal lowercase" },
  { name: "yulu", label: "yulu", industry: "Electric Mobility", logoStyle: "font-semibold tracking-wider lowercase" },
  { name: "CRED", label: "CRED", industry: "Fintech Club", logoStyle: "font-serif tracking-widest uppercase font-black" },
  { name: "Simpl", label: "Simpl", industry: "Pay Later Fintech", logoStyle: "font-medium tracking-tight" },
  { name: "Razorpay", label: "Razorpay", industry: "Payments Infrastructure", logoStyle: "font-bold italic tracking-wide" }
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "project-nostic",
    slug: "nostic",
    title: "NOSTIC",
    client: "Nostic Diagnostics",
    category: "Branding, Website, Marketing",
    industry: "Healthcare",
    description: "Transforming next-generation diagnostic device hardware with an intuitive, trusted digital-first identity.",
    heroImage: "/images/projects/nostic.jpg",
    tags: ["Branding", "Next.js", "Hardware UX"],
    isFeatured: true,
    linkText: "Healthcare →"
  },
  {
    id: "project-zepto",
    slug: "zepto",
    title: "ZEPTO",
    client: "Zepto India",
    category: "Branding, Campaign, Content",
    industry: "E-commerce",
    description: "End-to-end launch campaigns, brand identity expansion, and hyper-growth product storytelling across India.",
    heroImage: "/images/projects/zepto.jpg",
    tags: ["Campaign", "3D Art", "Growth Design"],
    isFeatured: true,
    linkText: "E-commerce →"
  },
  {
    id: "project-yulu",
    slug: "yulu",
    title: "YULU",
    client: "Yulu Mobility",
    category: "Branding, App, Campaign",
    industry: "Mobility",
    description: "Re-imagining urban clean mobility through smart IoT app experiences, visual systems, and urban fleet campaigns.",
    heroImage: "/images/projects/yulu.jpg",
    tags: ["Mobile UX", "IoT Platform", "EV Mobility"],
    isFeatured: true,
    linkText: "Mobility →"
  },
  {
    id: "project-cred",
    slug: "cred",
    title: "CRED",
    client: "Dreamplug Technologies",
    category: "Brand System, App, Campaign",
    industry: "Fintech",
    description: "Crafting iconic dark-mode fintech aesthetics, reward animations, and high-trust financial interfaces.",
    heroImage: "/images/projects/cred.jpg",
    tags: ["Fintech UI", "Design System", "Motion"],
    isFeatured: true,
    linkText: "Fintech →"
  },
  {
    id: "project-simpl",
    slug: "simpl",
    title: "SIMPL",
    client: "Simpl Technologies",
    category: "Branding, App, Campaign",
    industry: "Fintech",
    description: "Simplifying 1-tap checkout experiences, cardless credit interfaces, and user conversion funnels.",
    heroImage: "/images/projects/simpl.jpg",
    tags: ["Checkout UX", "Conversion Funnel", "Fintech"],
    isFeatured: true,
    linkText: "Fintech →"
  },
  {
    id: "project-razorpay",
    slug: "razorpay",
    title: "RAZORPAY",
    client: "Razorpay",
    category: "Payments, Brand, Enterprise Platform",
    industry: "Fintech",
    description: "Scaling enterprise trust, digital payment experiences, and next-generation financial infrastructure across India.",
    heroImage: "/images/projects/razorpay.jpg",
    tags: ["Payments", "Design System", "Fintech Platform"],
    isFeatured: true,
    linkText: "Fintech →"
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-nostic",
    slug: "nostic-transformation",
    client: "nostic",
    title: "How Nostic transformed diagnostics with a digital-first brand experience.",
    headline: "Transforming Diagnostics with Human-Centered Technology",
    challenge: "Traditional medical diagnostic systems were opaque, clinical, and intimidating for patients.",
    strategy: "Developed an approachable, luminous brand identity coupled with intuitive hardware-interfacing web software.",
    execution: "Created unified industrial UI, clinician portal, and patient result mobile experiences with Next.js and Supabase.",
    results: "+280% user engagement, certified FDA usability standards, and 12 hospital network deployments.",
    accentColor: "from-blue-900/40 via-purple-900/20 to-slate-900/60",
    image: "/images/case-studies/nostic-wide.jpg",
    tag: "Diagnostics & Healthtech"
  },
  {
    id: "cs-razorpay",
    slug: "razorpay-scale",
    client: "Razorpay",
    title: "How Razorpay scaled brand trust and awareness across India.",
    headline: "Scaling Enterprise Trust for India's Leading Payment Gateway",
    challenge: "Expanding from developer-centric payments into national enterprise banking and payroll awareness.",
    strategy: "High-octane design architecture emphasizing bulletproof stability, speed, and modern financial sovereignty.",
    execution: "Interactive microsites, scalable brand asset libraries, and animated data storytelling for annual flagship summits.",
    results: "Over 40M daily impressions, 35% lift in enterprise inbound leads, and benchmark visual standards.",
    accentColor: "from-sky-950/60 via-indigo-950/40 to-slate-950/80",
    image: "/images/case-studies/razorpay-wide.jpg",
    tag: "Payments Infrastructure"
  },
  {
    id: "cs-simpl",
    slug: "simpl-engagement",
    client: "Simpl",
    title: "How Simpl increased engagement through design and performance.",
    headline: "Designing Frictionless 1-Tap Financial Journeys",
    challenge: "High cart-abandonment on Indian e-commerce merchant checkouts requiring OTPs and multi-step verifications.",
    strategy: "Zero-friction 1-tap checkout interaction design with lightning-fast biometric and predictive authentication.",
    execution: "Ultra-lean SDK interfaces, instant feedback micro-interactions, and real-time merchant analytics dashboards.",
    results: "99.4% checkout success rate, 1.8x repeat transaction frequency, and 26,000+ merchant integrations.",
    accentColor: "from-emerald-950/60 via-teal-950/30 to-slate-950/80",
    image: "/images/case-studies/simpl-wide.jpg",
    tag: "1-Tap Checkout UX"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t-kunal",
    authorName: "Kunal Shah",
    role: "Founder",
    company: "CRED",
    avatar: "/images/testimonials/kunal.jpg",
    quote: "Ryze Works didn't just build our brand — they helped shape our entire business direction.",
    rating: 5,
    isVerified: true,
    status: "approved"
  },
  {
    id: "t-aadit",
    authorName: "Aadit Palicha",
    role: "Co-founder",
    company: "Zepto",
    avatar: "/images/testimonials/aadit.jpg",
    quote: "They understood our vision better than we did. The results speak for themselves.",
    rating: 5,
    isVerified: true,
    status: "approved"
  },
  {
    id: "t-amit",
    authorName: "Amit Gupta",
    role: "Co-founder",
    company: "Yulu",
    avatar: "/images/testimonials/amit.jpg",
    quote: "The team is exceptional — strategic, creative and incredibly execution-focused.",
    rating: 5,
    isVerified: true,
    status: "approved"
  }
];

export const ARTICLES_DATA: Article[] = [
  {
    id: "art-branding-ai",
    slug: "future-of-brand-building-in-ai-world",
    title: "The Future of Brand Building in an AI World",
    category: "BRANDING",
    readTime: "5 min read",
    summary: "Why AI-native brands require dynamic generative visual systems rather than static corporate guidelines.",
    coverImage: "/images/insights/branding.jpg",
    publishedAt: "2024-08-15"
  },
  {
    id: "art-growth-2024",
    slug: "growth-strategies-that-actually-work-in-2024",
    title: "Growth Strategies That Actually Work in 2024",
    category: "GROWTH",
    readTime: "6 min read",
    summary: "Breaking through advertising fatigue with algorithmic positioning, community flywheels, and zero-cac loops.",
    coverImage: "/images/insights/growth.jpg",
    publishedAt: "2024-08-28"
  },
  {
    id: "art-ai-products",
    slug: "how-ai-is-transforming-digital-products",
    title: "How AI is Transforming Digital Products",
    category: "TECHNOLOGY",
    readTime: "7 min read",
    summary: "Moving beyond chat wrappers to generative interfaces, agentic workflows, and latency-zero edge experiences.",
    coverImage: "/images/insights/technology.jpg",
    publishedAt: "2024-09-01"
  },
  {
    id: "art-idea-to-execution",
    slug: "from-idea-to-execution-for-startup-founders",
    title: "From Idea To Execution for Startups Founders",
    category: "BUSINESS",
    readTime: "6 min read",
    summary: "The practical 30-day playbook for early-stage founders navigating product definition, tech stack, and launch.",
    coverImage: "/images/insights/business.jpg",
    publishedAt: "2024-09-04"
  }
];

export const FOOTER_COLUMNS = [
  {
    title: "SERVICES",
    links: [
      { label: "Strategy", href: "/services/strategy" },
      { label: "Brand", href: "/services/brand-creative" },
      { label: "Build", href: "/services/technology" },
      { label: "Create", href: "/services/brand-creative" },
      { label: "Grow", href: "/services/marketing" },
      { label: "Activate", href: "/services/experiences" }
    ]
  },
  {
    title: "WORK",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Testimonials", href: "/testimonials" }
    ]
  },
  {
    title: "INSIGHTS",
    links: [
      { label: "Articles", href: "/insights" },
      { label: "Reports", href: "/reports" },
      { label: "Resources", href: "/resources" }
    ]
  },
  {
    title: "AI",
    links: [
      { label: "Ryze AI", href: "/ai" },
      { label: "AI Lab", href: "/ai/lab" }
    ]
  },
  {
    title: "PARTNERS",
    links: [
      { label: "Advertise", href: "/advertise" },
      { label: "Media Kit", href: "/media-kit" },
      { label: "Partnerships", href: "/partners" }
    ]
  }
];

export const SITE_CONTACT = {
  email: "teamryzeworks@gmail.com",
  location: "Chennai, India",
};
