"use client";

import { useState } from "react";
import Link from "next/link";

interface SearchItem {
  topicSlug: string;
  topicIcon: string;
  slug: string;
  title: string;
  description: string;
}

interface LessonSearchProps {
  items: SearchItem[];
}

export function LessonSearch({ items }: LessonSearchProps) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? items.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="mb-8">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜尋課程標題或關鍵字..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm outline-none focus:border-blue-400 dark:text-gray-200"
        />
      </div>
      {query.trim() && (
        <div className="mt-2 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          {filtered.length === 0 ? (
            <p className="p-4 text-sm text-gray-400">
              找不到相關課程
            </p>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              {filtered.map((item) => (
                <Link
                  key={`${item.topicSlug}/${item.slug}`}
                  href={`/${item.topicSlug}/${item.slug}`}
                  className="block px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.topicIcon}</span>
                    <span className="font-medium text-sm">{item.title}</span>
                  </div>
                  {item.description && (
                    <p className="text-xs text-gray-400 mt-1 ml-6">
                      {item.description}
                    </p>
                  )}
                </Link>
              ))}
              <p className="px-4 py-2 text-xs text-gray-400 bg-gray-50 dark:bg-gray-900">
                {filtered.length} 筆結果
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
