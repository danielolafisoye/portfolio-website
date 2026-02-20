// ─── constants/index.ts ──────────────────────────────────────────────────
// Single source of truth. Edit this file to update the entire portfolio.

import type { Project, NavLink, SocialLink, SiteConfig, Skill } from "@/types";

// ─── SITE ────────────────────────────────────────────────────────────────
export const SITE_CONFIG: SiteConfig = {
  name: "Daniel Olafisoye",
  role: "Software Engineer",
  tagline: "Software Engineer",
  location: "Johannesburg, ZA",
  email: "dannysoftdev@gmail.com",
  siteUrl: "https://danielolafisoye.dev",
  bio: "I'm Daniel Olafisoye (@dannysoftdev), a business-minded software engineer who thrives at the intersection of complex system design and AI development. Through LUDA BLACK, I build scalable, production-ready platforms backed by robust architecture that actually solve business problems.",
  extendedBio:
    "When I'm not shipping code, you'll find me creating tech content on TikTok as @dannysoftdev, running the court in basketball, unwinding with story-mode games, or exploring the latest AI trends with my community. I believe great software is built by engineers who focus on the business logic and underlying architecture, not just the syntax.",
  ogImage: "/og-image.jpg",
  twitterHandle: "",
};

export const EXPERIENCE = [
  {
    role: "Co-Founder & Lead Software Engineer",
    company: "LUDA BLACK",
    location: "Johannesburg, ZA",
    period: "2024 - Present",
    type: "Hybrid Startup Agency",
    description: "Founded a hybrid technology venture that operates as both a product incubator for proprietary startups and a high-end software development agency for business clients.",
    achievements: [
      "Launched 'Metropoint', a public transit solution on the Google Play Store built with React Native and a robust Java Spring Boot backend.",
      "Engineered 'Newsly AI', an automated WhatsApp media platform hosted on AWS EC2, serving real-time tech news via OpenAI integration.",
      "Delivered custom AI SaaS platforms and high-conversion websites for business clients, handling full-cycle development.",
      "Managing a cross-functional team to deploy scalable cloud architectures using AWS and PostgreSQL."
    ],
    tech: ["React Native", "Spring Boot", "AWS", "OpenAI API", "Next.js", "PostgreSQL", "AI Development"]
  },
  {
    role: "Software Engineering Intern",
    company: "Telkom",
    location: "Centurion, ZA",
    period: "2025 - Present",
    type: "Internship",
    description: "Full-stack developer for the Credit Management division, building enterprise-grade web applications and APIs to manage financial risk and customer data.",
    achievements: [
      "Developing secure full-stack web applications using C# .NET Core and SQL Server.",
      "Building and maintaining RESTful APIs to handle high-volume credit risk assessments.",
      "Managing CI/CD pipelines and agile workflows using Azure DevOps.",
      "Optimizing complex SQL stored procedures to improve performance of credit reporting systems."
    ],
    tech: ["C#", ".NET Core", "SQL Server", "Azure DevOps","REST APIs", "Full Stack"]
  }
];

export const EDUCATION = [
  {
    degree: "BSc Hons in Computer Science",
    specialization: "Specialization in Artificial Intelligence",
    school: "University of Johannesburg",
    location: "South Africa",
    period: "2026 - present", 
    description: "Advanced research and practical application of AI agents, computer vision, and machine learning pipelines.",
    coursework: [
      "Advanced Artificial Intelligence",
      "IT Project Management",
      "Optimization",
      "Big Data Analytics",
      "Biometrics",
      "Research Methodologies"
    ],
    achievements: [
      "Thesis on 'AI-Driven Employee Handbooks using RAG'",
    ]
  },
  {
    degree: "Bachelor of Science",
    specialization: "Double Major in Computer Science & Mathematics",
    school: "University of Johannesburg",
    location: "South Africa",
    period: "2020 - 2024",
    description: "Built a rigorous theoretical foundation in algorithms, logic, and pure mathematics, focusing on the mathematical principles behind computing systems.",
    coursework: [
      "Abstract Algebra & Group Theory",
      "Complex Analysis & Calculus",     
      "Linear Algebra",                  
      "Applied Mathematics & Stats",
      "Data Structures & Algorithms", 
      "Software Engineering"
    ],
    achievements: [
      "Achieved 6 Distinctions (Including Core Computer Science Modules)",
      "Academic Tutor: Mathematics & Physical Science",
    ]
  }
];

// ─── NAVIGATION ──────────────────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#work" },
  { label: "Contact", href: "#contact" },
];

// ─── SOCIALS ─────────────────────────────────────────────────────────────
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "github", href: "https://github.com/danielolafisoye", label: "GitHub" },
  { platform: "linkedin", href: "https://za.linkedin.com/in/daniel-olafisoye", label: "LinkedIn" },
  { platform: "email", href: "mailto:dannysoftdev@gmail.com", label: "Email" },
  { platform: "tiktok", href: "https://www.tiktok.com/@dannysoftdev", label: "Tiktok" },
];

// ─── PROJECTS ────────────────────────────────────────────────────────────
// src/constants/index.ts

export const PROJECTS = [
  {
    slug: "metropoint",
    title: "Metropoint",
    description:
      "A comprehensive public transit mobile application facilitating real-time navigation, route scheduling, and commuter communication.",
    longDescription:
      "Metropoint revolutionizes the daily commute by providing a unified platform for public transit schedules and route details. Architected with a robust Java Spring Boot backend and a PostgreSQL database, the mobile client is built using React Native Expo for cross-platform performance. The app includes real-time chat features and is currently deployed on the Google Play Store.",
    tags: ["React Native", "Spring Boot", "PostgreSQL", "Java", "Google Play"],
    color: "#6366f1", 
    accentGradient: "from-indigo-500/20 to-violet-500/10",
    icon: "map", 
    year: "2023",
    liveUrl: "https://play.google.com/store/apps/details?id=com.ludablack.metropoint",
    featured: true,
  },
  {
    slug: "newsly-ai",
    title: "Newsly AI",
    description:
      "An automated media platform on WhatsApp that leverages AI agents to curate and deliver South African tech news in real-time.",
    longDescription:
      "Newsly AI redefines news consumption by delivering AI-synthesized tech updates directly to users via WhatsApp. The system runs on scalable AWS EC2 instances, utilizing Python scripts to scrape, analyze, and summarize content using the OpenAI API. It features an automated distribution pipeline that connects directly to the WhatsApp Business API.",
    tags: ["OpenAI API", "AWS EC2", "Python", "WhatsApp API", "LLMs"],
    color: "#10b981", 
    accentGradient: "from-emerald-500/20 to-green-500/10",
    icon: "message-circle", 
    year: "2025",
    liveUrl: "https://newslyai.co.za/",
    featured: true,
  },
];

// ─── SKILLS ──────────────────────────────────────────────────────────────
export const SKILLS: Skill[] = [
  { name: "Python", category: "language" },
  { name: "Java / Spring Boot", category: "framework" },
  { name: "TypeScript", category: "language" },
  { name: "React Native", category: "framework" },
  { name: "AWS / Vercel", category: "infra" },
  { name: "SQL / PostgreSQL", category: "database" },
  { name: "AI Orchestration", category: "infra" },
  { name: "Machine Learning", category: "infra" },
  { name: "System Architecture", category: "infra" },
  { name: "React / Next.js", category: "framework" },
];

// ─── CHAT ────────────────────────────────────────────────────────────────
export const CHAT_CONFIG = {
  suggestions: [
    "What's Daniel's tech stack?",
    "Tell me about Metropoint",
    "What's Daniel like?",
  ],
  greeting:
    "Hey! I'm Daniel's digital twin — ask me anything about his work, stack, or who he is to get to know him better",
};

// ─── FRAMER MOTION VARIANTS ──────────────────────────────────────────────
export const VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
    }),
  },
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  },
} as const;