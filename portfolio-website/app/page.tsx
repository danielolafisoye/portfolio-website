"use client";

import { useState } from "react";

import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import ProjectGallery from "@/components/sections/ProjectGallery";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ChatTerminal from "@/components/chat/ChatTerminal";
import ChatButton from "@/components/chat/ChatButton";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";

export default function HomePage() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div
      className="relative min-h-screen text-white overflow-x-hidden"
      style={{
        background:
          "linear-gradient(145deg, #06060b 0%, #0a0a14 30%, #0d0d18 60%, #08080f 100%)",
      }}
    >
      {/* Film grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.015]"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Content */}
      <div className="relative z-[2]">
        <Navbar onChatOpen={() => setChatOpen(true)} />
        <Hero />
        <Experience />
        <Education/>
        <ProjectGallery />
        <About />
        <Contact />
        <Footer />
      </div>

      {/* Chat system */}
      {!chatOpen && <ChatButton onClick={() => setChatOpen(true)} />}
      <ChatTerminal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}