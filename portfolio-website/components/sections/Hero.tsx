// ─── components/sections/Hero.tsx ─────────────────────────────────────────
// Full-viewport hero with word-by-word staggered text reveal,
// ambient gradient orbs, and a subtle coordinate grid.
"use client";

import { motion } from "framer-motion";
import { ChevronDown, Mail, Github, Linkedin } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { ElementType } from "react";

import { SITE_CONFIG, SOCIAL_LINKS, VARIANTS } from "@/constants";

const { fadeUp, stagger } = VARIANTS;

// Map platform → icon
const PLATFORM_ICONS: Record<string, ElementType> = {
  github: Github,
  linkedin: Linkedin,
  tiktok: FaTiktok,
  email: Mail,
};

export default function Hero() {
  const words = SITE_CONFIG.tagline.split(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* ── Ambient light orbs ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[20%] left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-600/[0.04] blur-[140px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] rounded-full bg-violet-500/[0.035] blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-sky-500/[0.015] blur-[160px]" />
      </div>

      {/* ── Grid texture ── */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center mb-10"
        >
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/35 text-[11px] tracking-[0.2em] uppercase font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Available for work
          </span>
        </motion.div>

        {/* Staggered headline */}
        <motion.h1
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="text-[clamp(2.75rem,8vw,6rem)] font-bold tracking-[-0.035em] leading-[0.95] mb-8"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={fadeUp}
              custom={i}
              className="inline-block mr-[0.28em] last:mr-0 text-white/90"
              style={{ textShadow: "0 0 80px rgba(99, 102, 241, 0.12)" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={6}
          className="text-[clamp(1rem,2.5vw,1.25rem)] text-white/30 max-w-2xl mx-auto leading-relaxed mb-14"
        >
          {SITE_CONFIG.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={7}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/80 text-sm font-medium hover:bg-white/[0.11] hover:border-white/[0.14] transition-all duration-400"
          >
            View Work
            <ChevronDown
              size={14}
              className="opacity-60 group-hover:translate-y-0.5 transition-transform duration-300"
            />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium hover:bg-indigo-500/[0.18] hover:border-indigo-400/30 transition-all duration-400"
          >
            Get in Touch
            <Mail size={14} className="opacity-70" />
          </a>
        </motion.div>

        {/* Social row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={8}
          className="flex items-center justify-center gap-2 mt-20"
        >
          {SOCIAL_LINKS.filter((s) => s.platform !== "twitter").map((social) => {
            const Icon = PLATFORM_ICONS[social.platform] ?? Mail;
            return (
              <a
                key={social.platform}
                href={social.href}
                target={social.platform !== "email" ? "_blank" : undefined}
                rel={social.platform !== "email" ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                className="p-3 rounded-xl text-white/20 hover:text-white/55 hover:bg-white/[0.04] transition-all duration-300"
              >
                <Icon size={18} strokeWidth={1.8} />
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}