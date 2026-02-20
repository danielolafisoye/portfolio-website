// ─── types/index.ts ──────────────────────────────────────────────────────

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  siteUrl: string;
  bio: string;
  extendedBio: string;
  ogImage: string;
  twitterHandle: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export type SocialPlatform = "github" | "linkedin" | "twitter" | "email" | "tiktok";

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  label: string;
}

export type ProjectIcon = "layers" | "zap" | "sparkles" | "code" | "map" | "message-circle";

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  color: string;
  accentGradient: string;
  icon: ProjectIcon;
  year: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
}

export type SkillCategory =
  | "language"
  | "framework"
  | "runtime"
  | "database"
  | "styling"
  | "library"
  | "infra"
  | "devops"
  | "api";

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}