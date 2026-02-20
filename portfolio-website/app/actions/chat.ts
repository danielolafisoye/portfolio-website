
interface ChatRequest {
  message: string;
  history: { role: string; content: string }[];
}

interface ChatResponse {
  success: boolean;
  message: string;
  error?: string;
}

export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  try {
    console.log(request.history)
    const res = await fetch("https://byvafwruuafjgeqtzetu.supabase.co/functions/v1/openAI_connection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        query: request.message,
        conversation_history: request.history,
      }),
    });

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