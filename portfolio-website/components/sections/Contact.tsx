// ─── components/sections/Contact.tsx ──────────────────────────────────────
// Minimal, centred call-to-action section.
"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

import { SITE_CONFIG, VARIANTS } from "@/constants";

const { fadeUp, stagger } = VARIANTS;

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6">
      {/* Ambient glow centred behind content */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.03] blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={fadeUp}
            className="block text-[11px] tracking-[0.25em] uppercase text-white/20 mb-4 font-medium"
          >
            Contact
          </motion.span>

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-5xl font-bold text-white/90 tracking-tight mb-6"
          >
            Let&apos;s build something.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-white/30 text-lg mb-12 max-w-lg mx-auto leading-relaxed"
          >
            Always open to discussing new projects, creative ideas, or
            opportunities to be part of something great.
          </motion.p>

          <motion.a
            variants={fadeUp}
            custom={3}
            href={`mailto:${SITE_CONFIG.email}`}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/65 text-sm font-medium hover:bg-white/[0.12] hover:text-white/90 hover:border-white/[0.15] transition-all duration-400"
          >
            <Mail
              size={16}
              className="opacity-50 group-hover:opacity-80 transition-opacity"
            />
            {SITE_CONFIG.email}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}