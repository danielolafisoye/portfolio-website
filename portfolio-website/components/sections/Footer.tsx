// ─── components/sections/Footer.tsx ───────────────────────────────────────
// Slim footer with copyright and social icon row.
import { Github, Linkedin, Mail } from "lucide-react";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/constants";
import type { SocialPlatform } from "@/types";

const ICONS: Partial<Record<SocialPlatform, React.ReactNode>> = {
  github: <Github size={14} strokeWidth={1.8} />,
  linkedin: <Linkedin size={14} strokeWidth={1.8} />,
  email: <Mail size={14} strokeWidth={1.8} />,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-10 px-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/18 tracking-wide">
          © {year} {SITE_CONFIG.name}
          <span className="hidden sm:inline"> · Crafted with intention</span>
        </p>

        <div className="flex items-center gap-1">
          {SOCIAL_LINKS.filter((s) => ICONS[s.platform]).map((s) => (
            <a
              key={s.platform}
              href={s.href}
              target={s.platform !== "email" ? "_blank" : undefined}
              rel={s.platform !== "email" ? "noopener noreferrer" : undefined}
              aria-label={s.label}
              className="p-2.5 rounded-lg text-white/15 hover:text-white/40 hover:bg-white/[0.03] transition-all duration-300"
            >
              {ICONS[s.platform]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}