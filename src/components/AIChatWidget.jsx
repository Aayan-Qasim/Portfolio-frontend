import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

// ─────────────────────────────────────────────────────────────
// CONFIG — Backend use ho raha hai (Grok key backend .env mein safe hai)
// ─────────────────────────────────────────────────────────────
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// Unique session ID — tab tak same rehta hai jab tak page reload na ho
const SESSION_ID = `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

// ── API Call (Backend ke zariye) ─────────────────────────────
async function callAI({ message, onDelta, onDone, onError }) {
  try {
    const resp = await fetch(`${BACKEND_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: SESSION_ID, message }),
    });

    if (!resp.ok) {
      if (resp.status === 429) { onError("Too many requests. Please wait a moment."); return; }
      if (resp.status === 401) { onError("API key invalid. Please check backend .env."); return; }
      const data = await resp.json().catch(() => ({}));
      onError(data.error || "Something went wrong. Please try again."); return;
    }

    if (!resp.body) { onError("No response received."); return; }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let idx;
      while ((idx = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (!line.startsWith("data: ")) continue;
        const json = line.slice(6).trim();
        if (json === "[DONE]") { onDone(); return; }
        try {
          const parsed = JSON.parse(json);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch {}
      }
    }
    onDone();
  } catch (err) {
    console.error("AI error:", err);
    onError("Connection error. Please check your internet.");
  }
}

// ── Clear Backend Session ─────────────────────────────────────
async function clearBackendSession() {
  try {
    await fetch(`${BACKEND_URL}/api/chat/history/${SESSION_ID}`, { method: "DELETE" });
  } catch {}
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────
const INITIAL_MESSAGE = {
  role: "assistant",
  content: "Hi! 👋 I'm Aayan's AI assistant. Ask me anything about his skills, experience, or projects!",
};

const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const clearChat = useCallback(async () => {
    await clearBackendSession();
    setMessages([INITIAL_MESSAGE]);
    setInput("");
  }, []);

  const send = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      // Book a Meeting special handling
      if (trimmed === "📅 Book a Meeting") {
        setMessages((prev) => [
          ...prev,
          { role: "user", content: trimmed },
          {
            role: "assistant",
            content:
              "Sure! 📅 To book a meeting with Aayan, please fill in the **Contact Form** below — add your **name**, **email**, and mention your preferred meeting time in the message.\n\nAayan will reply to your email within 24 hours to confirm the meeting! 🤝",
          },
        ]);
        setInput("");
        // Scroll to contact section
        setTimeout(() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }, 800);
        return;
      }

      setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
      setInput("");
      setIsLoading(true);

      let assistantSoFar = "";

      await callAI({
        message: trimmed,
        onDelta: (chunk) => {
          assistantSoFar += chunk;
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant" && prev.length > 1) {
              return prev.map((m, i) =>
                i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
              );
            }
            return [...prev, { role: "assistant", content: assistantSoFar }];
          });
        },
        onDone: () => setIsLoading(false),
        onError: (msg) => {
          setMessages((prev) => [...prev, { role: "assistant", content: `⚠️ ${msg}` }]);
          setIsLoading(false);
        },
      });
    },
    [isLoading]
  );

  const suggestions = [
    "What skills does he have?",
    "Tell me about his experience",
    "What projects has he build?",
    "Is he available for freelance?",
    "📅 Book a Meeting",
  ];

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="AI Assistant"
        className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-shadow"
      >
        {open ? <X size={24} /> : <Sparkles size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-[10.5rem] right-6 z-50 flex w-[340px] sm:w-[380px] flex-col overflow-hidden rounded-2xl border border-border/40 bg-card shadow-2xl shadow-black/40"
            style={{ maxHeight: "min(520px, 70vh)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border/30 bg-secondary/50 px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Bot size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">AI Assistant</p>
                <p className="text-xs text-muted-foreground">Powered by Aayan</p>
              </div>
              {messages.length > 1 && (
                <button
                  onClick={clearChat}
                  title="Clear chat"
                  className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Trash2 size={16} />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
              style={{ minHeight: 200 }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm prose-invert max-w-none">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Loading dots */}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-secondary px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 150, 300].map((delay) => (
                        <span
                          key={delay}
                          className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50"
                          style={{ animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Suggestions — sirf pehli baar */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-border/40 bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border/30 bg-secondary/30 p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 rounded-xl border border-border/40 bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;