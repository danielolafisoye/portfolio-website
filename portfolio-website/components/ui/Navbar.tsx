// ─── components/ui/Navbar.tsx ─────────────────────────────────────────────
// Scroll-aware glassmorphic navbar with mobile slide-down drawer.
// Floats transparent at top, materialises into a blurred pill on scroll.
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE_CONFIG } from "@/constants";

interface NavbarProps {
  onChatOpen: () => void;
}

export default function Navbar({ onChatOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Main bar ── */}
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500",
            scrolled
              ? "bg-[#0a0a0f]/80 backdrop-blur-2xl border border-white/[0.06] shadow-2xl shadow-black/40"
              : "bg-transparent border border-transparent"
          )}
        >
          {/* Logo */}
          <a
            href="#"
            className="font-semibold text-white/90 tracking-tight text-lg select-none"
          >
            {SITE_CONFIG.name}
            <span className="text-indigo-400">.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm rounded-lg transition-colors duration-300",
                  "text-white/50 hover:text-white/90 hover:bg-white/[0.04]"
                )}
              >
                {link.label}
              </a>
            ))}
            <div className="w-px h-5 bg-white/[0.06] mx-2" />
            <button
              onClick={onChatOpen}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all duration-300",
                "bg-indigo-500/10 border border-indigo-400/20 text-indigo-300",
                "hover:bg-indigo-500/20 hover:border-indigo-400/30"
              )}
            >
              <Bot size={14} />
              Ask AI
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 text-white/60 hover:text-white/90 transition-colors"
            aria-label="Toggle navigation"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden mt-2"
            >
              <div className="rounded-2xl bg-[#0a0a0f]/95 backdrop-blur-2xl border border-white/[0.06] p-3 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm text-white/60 hover:text-white rounded-xl hover:bg-white/[0.04] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="h-px bg-white/[0.05] my-1" />
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onChatOpen();
                  }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-indigo-300 hover:bg-indigo-500/10 transition-colors"
                >
                  <Bot size={14} />
                  Ask AI
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}