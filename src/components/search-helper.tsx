"use client";

import { useState, useRef, useEffect } from "react";

interface SearchHelperProps {
  lessonTitle: string;
}

export function SearchHelper({ lessonTitle }: SearchHelperProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const search = (query: string) => {
    if (!query) return;
    const url = `https://www.google.com/search?q=${encodeURIComponent(query + " " + lessonTitle)}`;
    window.open(url, "_blank");
  };

  const suggestedQuestions = [
    `${lessonTitle} 是什麼`,
    `${lessonTitle} 面試題`,
    `${lessonTitle} 實戰範例`,
  ];

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-5 py-3 shadow-lg flex items-center gap-2 transition-colors z-50"
      >
        <span className="text-xl">🔍</span>
        <span className="text-sm font-medium">有問題？搜尋看看</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔍</span>
          <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
            搜尋助手
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

      {/* Suggested searches */}
      <div className="p-4 space-y-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          看完課程有疑問嗎？試試這些搜尋：
        </p>
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => search(q)}
            className="block w-full text-left text-sm px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
          >
            🔗 {q}
          </button>
        ))}
      </div>

      {/* Custom search input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-3">
        <p className="text-xs text-gray-400 mb-2">或輸入你的問題：</p>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") search(input.trim());
            }}
            placeholder="輸入問題，搜尋 Google..."
            className="flex-1 text-sm border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 outline-none focus:border-blue-400 dark:bg-gray-800 dark:text-gray-200"
          />
          <button
            onClick={() => search(input.trim())}
            disabled={!input.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-xl px-4 py-2 text-sm transition-colors"
          >
            搜尋
          </button>
        </div>
      </div>
    </div>
  );
}
