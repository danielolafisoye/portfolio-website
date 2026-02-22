"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe, Instagram, Youtube, Github, Linkedin, Mail, MessageCircle, ArrowUpRight} from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { LINKTREE_LINKS } from "@/constants"; 

const getIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("instagram")) return <Instagram size={18} />;
  if (l.includes("youtube")) return <Youtube size={18} />;
  if (l.includes("tiktok")) return <FaTiktok size={18} />;
  if (l.includes("github")) return <Github size={18} />;
  if (l.includes("linkedin")) return <Linkedin size={18} />;
  if (l.includes("email")) return <Mail size={18} />;
  if (l.includes("whatsapp")) return <MessageCircle size={18} />;
  return <Globe size={18} />;
};

export default function LinksPage() {
  return (
    <section className="relative min-h-screen flex flex-col items-center py-20 px-6 overflow-hidden">
      {/* ── Ambient Orbs & Grid ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-indigo-600/[0.04] blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-violet-500/[0.035] blur-[100px]" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative w-full max-w-md mx-auto z-10 flex flex-col items-center mt-8">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center mb-10 text-center"
        >
          <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-indigo-500/30 to-violet-500/30 mb-5">
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#0b0b14]">
              <Image 
                src="/profile.JPG" 
                alt="Daniel Olafisoye" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-white/90 tracking-tight mb-1">
            Daniel Olafisoye
          </h1>
          <p className="text-sm text-white/40 mb-4 font-medium tracking-wide">@dannysoftdev</p>
          
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/60 text-[11px] tracking-[0.15em] uppercase font-medium shadow-[0_0_20px_rgba(255,255,255,0.02)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Co-Founder of LUDA BLACK
          </span>
        </motion.div>
        {/* Humble About Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center"
        >
          <h2 className="text-[11px] font-medium text-white/40 mb-3 tracking-[0.2em] uppercase">
            A bit about me
          </h2>
          <p className="text-sm text-white/50 leading-relaxed">
            Just a normal human being who loves building cool things and creating content. Whether I'm engineering scalable apps or making videos, I'm just enjoying the journey and sharing it with you. Just chilling, you know? Thanks for stopping by.
          </p>
        </motion.div>

        {/* Links List */}
        <div className="w-full flex flex-col gap-4 mb-12 pt-10">
          {LINKTREE_LINKS.map((link, i) => {
            const isYouTube = link.label.toLowerCase().includes("youtube");

            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isYouTube 
                    ? { opacity: 1, y: 0, boxShadow: ["0px 0px 10px rgba(244,63,94,0.2)", "0px 0px 30px rgba(244,63,94,0.5)", "0px 0px 10px rgba(244,63,94,0.2)"] }
                    : { opacity: 1, y: 0 }
                }
                transition={
                  isYouTube 
                    ? { duration: 0.4, delay: 0.1 + i * 0.05, boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" } }
                    : { duration: 0.4, delay: 0.1 + i * 0.05 }
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative flex items-center justify-between w-full p-4 rounded-2xl transition-all duration-300 backdrop-blur-md overflow-hidden ${
                  isYouTube 
                    ? "bg-rose-500/[0.05] border border-rose-500/40 hover:bg-rose-500/[0.08]" 
                    : "bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/30 hover:bg-white/[0.06]"
                }`}
              >
                {!isYouTube && (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
                
                <div className="relative flex items-center gap-4 text-white/70 group-hover:text-white/95 transition-colors z-10">
                  <span className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                    isYouTube 
                      ? "bg-rose-500/20 border border-rose-500/30 text-rose-400 group-hover:bg-rose-500/30 group-hover:text-rose-300"
                      : "bg-white/[0.04] border border-white/[0.05] group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 group-hover:text-indigo-300"
                  }`}>
                    {getIcon(link.label)}
                  </span>
                  <span className="text-[15px] font-medium tracking-wide">
                    {link.label}
                  </span>
                </div>

                <ArrowUpRight 
                  size={18} 
                  className={`relative z-10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                    isYouTube ? "text-rose-400/60 group-hover:text-rose-400" : "text-white/20 group-hover:text-white/60"
                  }`} 
                />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}