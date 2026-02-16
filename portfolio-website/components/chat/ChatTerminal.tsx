// ─── components/chat/ChatTerminal.tsx ─────────────────────────────────────
// A sleek, floating AI chat terminal styled as a high-tech "Digital Twin."
// Uses Server Actions to keep the OpenAI key hidden from the client.
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Send,
  X,
  Bot,
  User,
  Loader2,
  Sparkles,
} from "lucide-react";

import { cn, generateId } from "@/lib/utils";
import { CHAT_CONFIG } from "@/constants/index";
import { sendChatMessage, sendChatMessageFallback } from "@/app/actions/chat";
import type { ChatMessage } from "@/types";

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex gap-3", isUser && "flex-row-reverse")}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center",
          isUser
            ? "bg-white/[0.06] border border-white/[0.08]"
            : "bg-indigo-500/15 border border-indigo-400/20"
        )}
      >
        {isUser ? (
          <User size={13} className="text-white/40" />
        ) : (
          <Bot size={13} className="text-indigo-400" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
          isUser
            ? "bg-indigo-500/10 border border-indigo-400/15 text-indigo-200/80"
            : "bg-white/[0.04] border border-white/[0.06] text-white/60"
        )}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="flex gap-3"
    >
      <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-400/20 flex items-center justify-center">
        <Bot size={13} className="text-indigo-400" />
      </div>
      <div className="px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
        <div className="flex items-center gap-2 text-white/30 text-sm">
          <Loader2 size={13} className="animate-spin text-indigo-400/60" />
          <span className="animate-pulse">Thinking...</span>
        </div>
      </div>
    </motion.div>
  );
}

function SuggestionChips({
  suggestions,
  onSelect,
}: {
  suggestions: string[];
  onSelect: (text: string) => void;
}) {
  return (
    <div className="px-5 pb-3">
      <p className="text-[11px] text-white/15 mb-2 uppercase tracking-wider">
        Try asking
      </p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            className="px-3 py-1.5 rounded-lg text-xs bg-white/[0.04] border border-white/[0.06] text-white/30 hover:text-white/50 hover:bg-white/[0.07] transition-all duration-300"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────

interface ChatTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatTerminal({ isOpen, onClose }: ChatTerminalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      role: "assistant",
      content: CHAT_CONFIG.greeting,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Auto-scroll & auto-focus ──
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      // Small delay to let the animation start before focusing
      const timer = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ── Send message via Server Action ──
  const handleSend = useCallback(
    async (text?: string) => {
      const userText = (text || input).trim();
      if (!userText || isLoading) return;

      setInput("");

      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        content: userText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        // Build message history for the Server Action
        const history = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        // Try the OpenAI-powered action first, fall back to keyword matching
        let response = await sendChatMessage({ messages: history });

        if (!response.success) {
          console.warn("[chat] OpenAI unavailable, using fallback:", response.error);
          response = await sendChatMessageFallback(userText);
        }

        const assistantMessage: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content: response.message,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error("[chat] Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            role: "assistant",
            content:
              "Sorry, I hit an unexpected error. Try again or reach out directly via email!",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showSuggestions = messages.length <= 1 && !isLoading;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />

          {/* ── Terminal Panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 left-6 sm:left-auto sm:w-[440px] z-[70]"
            style={{ maxHeight: "min(600px, 80vh)" }}
          >
            <div
              className="rounded-2xl border border-white/[0.08] bg-[#0c0c14]/95 backdrop-blur-2xl shadow-2xl shadow-black/60 overflow-hidden flex flex-col"
              style={{ maxHeight: "min(600px, 80vh)" }}
            >
              {/* ── Header ── */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-400/20 flex items-center justify-center">
                      <Terminal size={15} className="text-indigo-400" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0c0c14]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80 tracking-tight">
                      Digital Twin
                    </p>
                    <p className="text-[11px] text-white/25 flex items-center gap-1.5">
                      <Sparkles size={10} className="text-indigo-400/60" />
                      AI-powered · Always online
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.05] transition-all duration-200"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>

              {/* ── Messages ── */}
              <div
                className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/5"
                style={{ minHeight: 200 }}
              >
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}

                <AnimatePresence>{isLoading && <TypingIndicator />}</AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* ── Suggestion Chips ── */}
              {showSuggestions && (
                <SuggestionChips
                  suggestions={CHAT_CONFIG.suggestions}
                  onSelect={(text) => handleSend(text)}
                />
              )}

              {/* ── Input Bar ── */}
              <div className="px-4 py-3 border-t border-white/[0.06] flex-shrink-0">
                <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-2.5 focus-within:border-indigo-400/30 focus-within:bg-white/[0.06] transition-all duration-300">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about Daniel..."
                    disabled={isLoading}
                    className="flex-1 bg-transparent text-sm text-white/70 placeholder-white/20 outline-none disabled:opacity-50"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className="p-1.5 rounded-lg text-white/20 hover:text-indigo-400 disabled:opacity-30 disabled:hover:text-white/20 transition-all duration-200"
                    aria-label="Send message"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}