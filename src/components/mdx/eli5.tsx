"use client";

import { useState } from "react";

interface ELI5Props {
  children: React.ReactNode;
}

export function ELI5({ children }: ELI5Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-6 rounded-lg border-2 border-yellow-300 bg-yellow-50 dark:bg-yellow-950/30 dark:border-yellow-700 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center gap-2 text-left font-semibold text-yellow-800 dark:text-yellow-200 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
      >
        <span className="text-xl">{open ? "📖" : "🧒"}</span>
        <span>小學生也能懂的解釋</span>
        <span className="ml-auto text-sm">{open ? "▲ 收起" : "▼ 展開"}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 text-yellow-900 dark:text-yellow-100 prose-p:my-2">
          {children}
        </div>
      )}
    </div>
  );
}
