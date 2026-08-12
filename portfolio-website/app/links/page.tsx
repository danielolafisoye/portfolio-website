"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Instagram,
  Youtube,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const socials = [
  {
    name: "Instagram",
    count: "2.5K",
    label: "followers",
    href: "https://instagram.com/dannysoftdev",
    icon: <Instagram size={21} />,
  },
  {
    name: "TikTok",
    count: "9K",
    label: "followers",
    href: "https://www.tiktok.com/@dannysoftdev",
    icon: <FaTiktok size={19} />,
  },
  {
    name: "YouTube",
    count: "13",
    label: "subscribers",
    href: "https://youtube.com/@dannysoftdev",
    icon: <Youtube size={22} />,
  },
];

const links = [
  {
    name: "GitHub",
    subtitle: "View my code & projects",
    href: "https://github.com/danielolafisoye",
    icon: <Github size={19} />,
  },
  {
    name: "LinkedIn",
    subtitle: "Connect professionally",
    href: "https://za.linkedin.com/in/daniel-olafisoye",
    icon: <Linkedin size={19} />,
  },
  {
    name: "Email",
    subtitle: "Business & collaborations",
    href: "mailto:YOUR_EMAIL_HERE",
    icon: <Mail size={19} />,
  },
];

export default function LinksPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f4f1] text-[#171717]">

      {/* Soft background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-240px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-300/30 blur-[150px]" />

        <div className="absolute bottom-[-250px] right-[-200px] h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-[150px]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-xl flex-col items-center px-5 pb-16 pt-16 sm:px-6 sm:pt-20">

        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex w-full flex-col items-center text-center"
        >
          {/* Profile image */}
          <div className="relative mb-5 h-28 w-28 rounded-full bg-white p-[4px] shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src="/profile.JPG"
                alt="Daniel Olafisoye"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          <h1 className="text-[29px] font-bold tracking-[-0.03em] text-[#151515] sm:text-[32px]">
            Daniel Olafisoye
          </h1>

          <p className="mt-1 text-sm font-medium text-black/40">
            @dannysoftdev
          </p>

          <div className="mt-4 flex items-center gap-1.5 text-[13px] text-black/50">
            <MapPin size={14} />
            Johannesburg, South Africa
          </div>

          <p className="mt-4 max-w-md text-[14px] font-medium leading-6 text-black/65 sm:text-[15px]">
            Software Engineer
            <span className="mx-2 text-black/20">•</span>
            Business Owner
            <span className="mx-2 text-black/20">•</span>
            Tech Content Creator
          </p>
        </motion.div>

        {/* Social stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-10 grid w-full grid-cols-3 gap-3"
        >
          {socials.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.07 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.97 }}
              className="group rounded-[22px] border border-black/[0.05] bg-white/80 px-2 py-5 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]"
            >
              <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#f1f0ed] text-black/65 transition-transform duration-300 group-hover:scale-105">
                {social.icon}
              </div>

              <p className="text-[11px] font-medium text-black/40">
                {social.name}
              </p>

              <p className="mt-1 text-[23px] font-bold tracking-tight text-[#171717]">
                {social.count}
              </p>

              <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-black/30">
                {social.label}
              </p>
            </motion.a>
          ))}
        </motion.div>

        {/* Section label */}
        <div className="mb-4 mt-10 flex w-full items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/35">
            Connect
          </p>
        </div>

        {/* Secondary links */}
        <div className="flex w-full flex-col gap-3">
          {links.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.name === "Email" ? undefined : "_blank"}
              rel={link.name === "Email" ? undefined : "noopener noreferrer"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.06 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              className="group flex w-full items-center justify-between rounded-[20px] border border-black/[0.05] bg-white/75 px-4 py-4 shadow-[0_6px_25px_rgba(0,0,0,0.035)] backdrop-blur-xl transition-all duration-300 hover:bg-white hover:shadow-[0_12px_35px_rgba(0,0,0,0.07)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1f0ed] text-black/55">
                  {link.icon}
                </div>

                <div>
                  <p className="text-sm font-semibold text-black/80">
                    {link.name}
                  </p>

                  <p className="mt-0.5 text-[11px] text-black/35">
                    {link.subtitle}
                  </p>
                </div>
              </div>

              <ArrowUpRight
                size={17}
                className="text-black/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black/60"
              />
            </motion.a>
          ))}
        </div>

        <p className="mt-12 text-[11px] text-black/25">
          @dannysoftdev
        </p>
      </section>
    </main>
  );
}