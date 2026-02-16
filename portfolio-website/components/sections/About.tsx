// ─── components/sections/About.tsx ────────────────────────────────────────
// Two-panel layout: narrative bio on the left, animated skill cloud on the right.
"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase } from "lucide-react";

import { SITE_CONFIG, SKILLS, VARIANTS } from "@/constants";
import Glass from "@/components/ui/Glass";

const { fadeUp, stagger } = VARIANTS;

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-16">
            <span className="block text-[11px] tracking-[0.25em] uppercase text-white/20 mb-4 font-medium">
              About
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white/90 tracking-tight">
              A bit about me.
            </h2>
          </motion.div>

          {/* Two-col grid */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Bio panel — wider */}
            <motion.div variants={fadeUp} className="lg:col-span-3">
              <Glass className="p-8 md:p-10 h-full">
                {/* Meta badges */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8">
                  <span className="inline-flex items-center gap-2 text-white/30 text-sm">
                    <MapPin size={14} className="text-white/20" />
                    {SITE_CONFIG.location}
                  </span>
                  <span className="hidden sm:block w-px h-4 bg-white/[0.06]" />
                  <span className="inline-flex items-center gap-2 text-white/30 text-sm">
                    <Briefcase size={14} className="text-white/20" />
                    {SITE_CONFIG.role}
                  </span>
                </div>

                {/* Prose */}
                <div className="space-y-5 text-[15px] text-white/35 leading-[1.75]">
                  <p>{SITE_CONFIG.bio}</p>
                  <p>{SITE_CONFIG.extendedBio}</p>
                </div>
              </Glass>
            </motion.div>

            {/* Skills panel */}
            <motion.div variants={fadeUp} custom={1} className="lg:col-span-2">
              <Glass className="p-8 md:p-10 h-full flex flex-col">
                <h3 className="text-[11px] font-medium text-white/40 mb-7 tracking-[0.2em] uppercase">
                  Core Stack
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {SKILLS.map((skill, i) => (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.3 + i * 0.04,
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      viewport={{ once: true }}
                      className="px-4 py-2 rounded-xl text-sm bg-white/[0.04] border border-white/[0.06] text-white/35 hover:text-white/60 hover:bg-white/[0.07] hover:border-white/[0.1] transition-all duration-300 cursor-default select-none"
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </Glass>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}