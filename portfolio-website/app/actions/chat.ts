// ─── app/actions/chat.ts ──────────────────────────────────────────────────
// Server Action — runs exclusively on the server.
// The OPENAI_API_KEY never reaches the client bundle.
"use server";

import { CHAT_CONFIG, PROJECTS, SKILLS, SITE_CONFIG } from "@/constants";

interface ChatRequest {
  messages: { role: "user" | "assistant"; content: string }[];
}

interface ChatResponse {
  success: boolean;
  message: string;
  error?: string;
}

// ─── PRIMARY: OpenAI-powered ─────────────────────────────────────────────
export async function sendChatMessage(
  request: ChatRequest
): Promise<ChatResponse> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      message: "",
      error: "OPENAI_API_KEY not configured.",
    };
  }

  // Enrich the system prompt with live portfolio data
  const projectCtx = PROJECTS.map(
    (p) => `- ${p.title} (${p.year}): ${p.longDescription} Tech: ${p.tags.join(", ")}.`
  ).join("\n");

  const systemPrompt = `${CHAT_CONFIG.systemPrompt}

PROJECTS:
${projectCtx}

SKILLS: ${SKILLS.map((s) => s.name).join(", ")}
CONTACT: ${SITE_CONFIG.email} · ${SITE_CONFIG.location}

Respond warmly and concisely (2-4 sentences). If unsure, say so honestly.`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.7,
        max_tokens: 300,
        messages: [
          { role: "system", content: systemPrompt },
          ...request.messages.slice(-10), // context window management
        ],
      }),
    });

    if (!res.ok) {
      return {
        success: false,
        message: "",
        error: `OpenAI returned ${res.status}`,
      };
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content?.trim();

    return content
      ? { success: true, message: content }
      : { success: false, message: "", error: "Empty AI response" };
  } catch (err) {
    console.error("[chat]", err);
    return {
      success: false,
      message: "",
      error: "Failed to reach AI service.",
    };
  }
}

// ─── FALLBACK: keyword-based (works without API key) ─────────────────────
export async function sendChatMessageFallback(
  userMessage: string
): Promise<ChatResponse> {
  const lower = userMessage.toLowerCase();

  const map: Record<string, string> = {
    stack: `Daniel's primary stack is ${SKILLS.map((s) => s.name).join(", ")}. He deploys on Vercel and AWS, and is a strong advocate for Tailwind CSS and Framer Motion.`,
    tech: `Daniel works with ${SKILLS.map((s) => s.name).join(", ")}. TypeScript and Next.js are at the core of everything he builds.`,
    metropoint: PROJECTS[0].longDescription,
    "bus buddies": PROJECTS[1].longDescription,
    bus: PROJECTS[1].longDescription,
    newsly: PROJECTS[2].longDescription,
    philosophy: `Daniel follows a "ship fast, refine relentlessly" philosophy — deliver value quickly, then polish based on real user feedback. He cares deeply about performance, accessibility, and craft.`,
    approach: `Daniel is product-minded: he starts with the user problem, builds the simplest thing that solves it, then iterates toward excellence. Craft is in the details.`,
    contact: `Reach Daniel at ${SITE_CONFIG.email}. He's based in ${SITE_CONFIG.location} and is currently open to new opportunities.`,
    hire: `Daniel is open to new roles and freelance projects! Drop him a line at ${SITE_CONFIG.email}.`,
    hello: `Hey there! I'm Daniel's digital twin. Ask me about his projects, tech stack, or engineering philosophy — I'm happy to help.`,
    hi: `Hey! What would you like to know about Daniel? I can talk projects, stack, or philosophy.`,
  };

  for (const [key, response] of Object.entries(map)) {
    if (lower.includes(key)) {
      return { success: true, message: response };
    }
  }

  return {
    success: true,
    message:
      "I'm Daniel's digital twin! Ask me about his projects (Metropoint, Bus Buddies, Newsly AI), his tech stack, or his engineering philosophy.",
  };
}