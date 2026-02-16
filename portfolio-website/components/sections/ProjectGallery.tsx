// ─── components/sections/ProjectGallery.tsx ──────────────────────────────
// Responsive project grid with glassmorphic cards.
// Each card has: accent gradient reveal on hover, animated arrow, tech tag row.
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Layers, Zap, Sparkles, Code2 } from "lucide-react";

import { PROJECTS, VARIANTS } from "@/constants";
import type { Project, ProjectIcon } from "@/types";
import Glass from "@/components/ui/Glass";

const { fadeUp, stagger } = VARIANTS;

// ─── ICON MAP ────────────────────────────────────────────────────────────
const ICONS: Record<ProjectIcon, React.ReactNode> = {
  layers: <Layers size={20} />,
  zap: <Zap size={20} />,
  sparkles: <Sparkles size={20} />,
  code: <Code2 size={20} />,
};

// ─── PROJECT CARD ────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Glass
        hover
        className="group relative overflow-hidden p-8 h-full flex flex-col"
      >
        {/* Colour gradient that fades in on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.accentGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
        />

        {/* Decorative corner glow */}
        <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[80px] pointer-events-none"
          style={{ backgroundColor: `${project.color}20` }}
        />

        {/* Top row */}
        <div className="relative flex items-start justify-between mb-6">
          <div
            className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/[0.06]"
            style={{
              backgroundColor: `${project.color}12`,
              color: project.color,
            }}
          >
            {ICONS[project.icon]}
          </div>
          <span className="text-[11px] text-white/20 tabular-nums font-mono tracking-wider">
            {project.year}
          </span>
        </div>

        {/* Body */}
        <div className="relative flex-1">
          <h3 className="text-xl font-semibold text-white/90 mb-3 tracking-tight flex items-center">
            {project.title}
            <motion.span
              animate={{
                x: hovered ? 4 : 0,
                opacity: hovered ? 0.7 : 0,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="inline-flex ml-2"
            >
              <ArrowUpRight size={16} />
            </motion.span>
          </h3>
          <p className="text-sm text-white/30 leading-[1.7] mb-8">
            {project.description}
          </p>
        </div>

        {/* Tech tags */}
        <div className="relative flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] border border-white/[0.05] text-white/25 group-hover:text-white/45 group-hover:border-white/[0.08] transition-all duration-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Invisible click-target link */}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10"
            aria-label={`View ${project.title} live`}
          />
        )}
      </Glass>
    </motion.div>
  );
}

// ─── GALLERY ─────────────────────────────────────────────────────────────
export default function ProjectGallery() {
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <section id="work" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-16">
            <span className="block text-[11px] tracking-[0.25em] uppercase text-white/20 mb-4 font-medium">
              Selected Projects
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white/90 tracking-tight">
              Work that ships.
            </h2>
          </motion.div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
