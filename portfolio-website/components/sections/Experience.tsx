"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Building2 } from "lucide-react";
import { EXPERIENCE } from "@/constants";
import { cn } from "@/lib/utils";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container px-4 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Work Experience
          </h2>
        </motion.div>

        <div className="space-y-12">
          {EXPERIENCE.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] transition-colors group"
            >
              {/* Header: Role & Date */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {job.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/60 mt-2 text-sm">
                    <span className="flex items-center gap-1.5 font-medium text-white/80">
                      <Building2 className="w-4 h-4" />
                      {job.company}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-1">
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80 whitespace-nowrap">
                    {job.period}
                  </div>
                  <span className="text-xs text-white/40">{job.type}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/70 mb-6 leading-relaxed border-b border-white/5 pb-6">
                {job.description}
              </p>

              {/* Achievements */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">
                  Key Achievements:
                </h4>
                <ul className="space-y-3">
                  {job.achievements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-sm font-semibold text-white/90 mb-3 uppercase tracking-wider">
                  Technologies Used:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-md border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}