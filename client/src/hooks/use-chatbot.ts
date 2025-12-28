import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function useChatbot(conversationId?: number) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<number | undefined>(conversationId);
  const [error, setError] = useState<string | null>(null);

  // Initialize conversation if needed
  useEffect(() => {
    if (!currentConversationId) {
      // Logic to create a conversation if one doesn't exist could go here
      // For now we assume we might need to create one on first message
    }
  }, [currentConversationId]);

  const sendMessage = async (content: string) => {
    try {
      setIsStreaming(true);
      setError(null);
      
      // Optimistically add user message
      setMessages(prev => [...prev, { role: "user", content }]);
      
      // Ensure we have a conversation ID
      let activeConvId = currentConversationId;
      if (!activeConvId) {
        const createRes = await fetch("/api/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "Concierge Chat" })
        });
        if (createRes.ok) {
          const newConv = await createRes.json();
          activeConvId = newConv.id;
          setCurrentConversationId(activeConvId);
        } else {
          throw new Error("Failed to start conversation");
        }
      }

      // Add placeholder for assistant message
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      const response = await fetch(`/api/conversations/${activeConvId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      // Handle SSE stream
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (!reader) throw new Error("No response body");

      let assistantResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.done) {
                setIsStreaming(false);
                break;
              }
              
              if (data.content) {
                assistantResponse += data.content;
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = { 
                    role: "assistant", 
                    content: assistantResponse 
                  };
                  return newMessages;
                });
              }
            } catch (e) {
              console.error("Error parsing SSE data", e);
            }
          }
        }
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setIsStreaming(false);
    }
  };

  return { messages, sendMessage, isStreaming, error };
}
