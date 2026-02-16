"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award, MapPin } from "lucide-react";
import { EDUCATION } from "@/constants";
import { cn } from "@/lib/utils";

export default function Education() {
  return (
    <section id="education" className="py-24 relative">
      <div className="container px-4 mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
            Education & Learning
          </h2>
          <p className="text-white/60 max-w-2xl text-lg">
            Continuous learning and academic excellence in computer science and software engineering.
          </p>
        </motion.div>

        {/* Education Cards */}
        <div className="space-y-12">
          {EDUCATION.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] transition-colors group"
            >
              {/* Card Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-indigo-400 font-medium mt-1">
                    {edu.specialization}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/60 mt-3 text-sm">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4" />
                      {edu.school}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {edu.location}
                    </span>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80 whitespace-nowrap h-fit">
                  {edu.period}
                </div>
              </div>

              {/* Description */}
              <p className="text-white/70 mb-8 leading-relaxed border-b border-white/5 pb-6">
                {edu.description}
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Coursework Column */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    Relevant Coursework
                  </h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {edu.coursework.map((course, i) => (
                      <li key={i} className="text-white/60 text-sm flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-white/30" />
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievements Column */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">
                    <Award className="w-4 h-4 text-indigo-500" />
                    Achievements
                  </h4>
                  <ul className="space-y-3">
                    {edu.achievements.map((item, i) => (
                      <li key={i} className="text-white/60 text-sm leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}