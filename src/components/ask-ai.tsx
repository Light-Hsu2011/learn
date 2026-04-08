"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AskAIProps {
  lessonTitle: string;
  lessonContent: string;
}

export function AskAI({ lessonTitle, lessonContent }: AskAIProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = useCallback(
    async (text: string) => {
      if (!text || loading) return;

      setMessages((prev) => [...prev, { role: "user", content: text }]);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, lessonTitle, lessonContent }),
        });

        if (!res.ok) throw new Error("API error");

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let assistantText = "";

        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            assistantText += decoder.decode(value, { stream: true });
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: "assistant",
                content: assistantText,
              };
              return updated;
            });
          }
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "抱歉，發生錯誤，請稍後再試。" },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, lessonTitle, lessonContent]
  );

  const suggestedQuestions = [
    "這個概念可以再解釋得更簡單嗎？",
    "實際工作中什麼時候會用到？",
    "面試時會怎麼問這個主題？",
  ];

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-5 py-3 shadow-lg flex items-center gap-2 transition-colors z-50"
      >
        <span className="text-xl">💬</span>
        <span className="text-sm font-medium">有問題？問 AI 助教</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 max-h-[70vh] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
            AI 助教
          </span>
          <span className="text-xs text-gray-400">
            關於「{lessonTitle}」
          </span>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl leading-none"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              看完課程有疑問嗎？試試這些問題：
            </p>
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="block w-full text-left text-sm px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              >
                💡 {q}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              }`}
            >
              {msg.content || (loading && i === messages.length - 1 ? "思考中..." : "")}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-3">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send(input.trim());
            }}
            placeholder="輸入你的問題..."
            disabled={loading}
            className="flex-1 text-sm border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 outline-none focus:border-blue-400 dark:bg-gray-800 dark:text-gray-200 disabled:opacity-50"
          />
          <button
            onClick={() => send(input.trim())}
            disabled={loading || !input.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-xl px-4 py-2 text-sm transition-colors"
          >
            送出
          </button>
        </div>
      </div>
    </div>
  );
}
