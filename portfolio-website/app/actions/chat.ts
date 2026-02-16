// ─── app/actions/chat.ts ──────────────────────────────────────────────────
"use server";

interface ChatRequest {
  message: string;
}

interface ChatResponse {
  success: boolean;
  message: string;
  error?: string;
}

export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  try {
    //const lastMessage = request.messages.filter(m => m.role === "user").pop()?.content;
    //if (!lastMessage) return { success: false, message: "", error: "No message provided." };
    console.log(request.message);
    const res = await fetch("https://byvafwruuafjgeqtzetu.supabase.co/functions/v1/openAI_connection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: request.message }),
    });

    // This dynamically catches your 429 plain text message (or any other error)
    if (!res.ok) {
      return { success: false, message: "", error: await res.text() };
    }

    const data = await res.json();
    return data.answer
      ? { success: true, message: data.answer }
      : { success: false, message: "", error: "Empty AI response" };
      
  } catch (err) {
    console.error("[chat]", err);
    return { success: false, message: "", error: "Failed to reach AI service." };
  }
}