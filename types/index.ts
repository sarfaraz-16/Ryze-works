export type ServiceGroup = 'Strategy' | 'Brand + Creative' | 'Technology' | 'Marketing' | 'Experiences';

export interface Service {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  group: ServiceGroup;
  icon: string;
  description: string;
  deliverables: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  industry: string;
  description: string;
  heroImage: string;
  tags: string[];
  isFeatured: boolean;
  linkText: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  title: string;
  headline: string;
  challenge: string;
  strategy: string;
  execution: string;
  results: string;
  accentColor: string;
  image: string;
  tag: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  role: string;
  company: string;
  avatar?: string;
  quote: string;
  rating: number;
  isVerified: boolean;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: 'BRANDING' | 'GROWTH' | 'TECHNOLOGY' | 'BUSINESS';
  readTime: string;
  summary: string;
  coverImage: string;
  publishedAt: string;
}

export interface LeadSubmission {
  id?: string;
  name: string;
  email: string;
  company?: string;
  serviceInterest?: string;
  message: string;
  aiBrief?: Record<string, unknown>;
  createdAt?: string;
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: string[];
}
