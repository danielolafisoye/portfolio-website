// ─── components/sections/About.tsx ────────────────────────────────────────
"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, Download, User } from "lucide-react";
import Image from "next/image";  

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

          {/* Photo left (2 cols) | Bio + Skills right (3 cols) */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* ── LEFT: Photo card — stretches to match right column ── */}
            <motion.div variants={fadeUp} className="lg:col-span-2">
              <Glass className="overflow-hidden h-full">
                <div className="relative w-full h-full min-h-[480px] bg-white/[0.02]">
                  <Image src="/profile.JPG" alt={SITE_CONFIG.name} fill className="object-cover" />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b14]/90 via-[#0b0b14]/20 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.04] via-transparent to-violet-500/[0.04] pointer-events-none" />

                  {/* Name + resume pinned to bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-7">
                    <h3 className="text-xl font-bold text-white/90 tracking-tight mb-0.5">
                      {SITE_CONFIG.name}
                    </h3>
                    <p className="text-sm text-white/35 mb-5">
                      {SITE_CONFIG.role}
                    </p>
                    {/* <a
                      href="/resume.pdf"
                      download
                      className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/[0.08] border border-white/[0.1] text-white/60 text-sm font-medium hover:bg-white/[0.14] hover:border-white/[0.18] hover:text-white/90 backdrop-blur-sm transition-all duration-300"
                    >
                      <Download
                        size={14}
                        className="opacity-50 group-hover:opacity-80 group-hover:-translate-y-0.5 transition-all duration-300"
                      />
                      Download Resume
                    </a> */}
                  </div>
                </div>
              </Glass>
            </motion.div>

            {/* ── RIGHT: Bio then Skills ── */}
            <div className="lg:col-span-3 flex flex-col gap-8">
              {/* Bio */}
              <motion.div variants={fadeUp} custom={1}>
                <Glass className="p-8 md:p-10">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-7">
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
                  <div className="space-y-4 text-[15px] text-white/35 leading-[1.75]">
                    <p>{SITE_CONFIG.bio}</p>
                    <p>{SITE_CONFIG.extendedBio}</p>
                  </div>
                </Glass>
              </motion.div>

              {/* Skills */}
              <motion.div variants={fadeUp} custom={2}>
                <Glass className="p-8 md:p-10">
                  <h3 className="text-[11px] font-medium text-white/40 mb-6 tracking-[0.2em] uppercase">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}