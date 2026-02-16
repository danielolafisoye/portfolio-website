// ─── components/chat/ChatButton.tsx ───────────────────────────────────────
// Floating action button (FAB) that triggers the chat terminal.
// Delayed entrance so it doesn't compete with the hero reveal.
"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

interface ChatButtonProps {
  onClick: () => void;
}

export default function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.7, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: 2,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onClick}
      aria-label="Open AI chat"
      className="
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-2xl
        bg-indigo-500/[0.12] border border-indigo-400/25 backdrop-blur-xl
        flex items-center justify-center text-indigo-400
        hover:bg-indigo-500/[0.22] hover:border-indigo-400/40
        hover:scale-105 active:scale-95
        transition-all duration-300
        shadow-xl shadow-indigo-500/[0.08]
      "
    >
      <MessageSquare size={20} strokeWidth={1.8} />

      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-2xl animate-ping bg-indigo-500/[0.06] pointer-events-none" />
    </motion.button>
  );
}