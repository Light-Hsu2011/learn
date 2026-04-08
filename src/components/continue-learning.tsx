"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getLastViewed } from "@/lib/progress";

export function ContinueLearning() {
  const [last, setLast] = useState<{
    topicSlug: string;
    lessonSlug: string;
    lessonTitle: string;
  } | null>(null);

  useEffect(() => {
    setLast(getLastViewed());
  }, []);

  if (!last) return null;

  return (
    <Link
      href={`/${last.topicSlug}/${last.lessonSlug}`}
      className="block mb-8 p-4 rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800 hover:border-blue-400 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">📖</span>
        <div>
          <p className="text-xs text-blue-500 dark:text-blue-400 font-medium">
            繼續學習
          </p>
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {last.lessonTitle}
          </p>
        </div>
        <span className="ml-auto text-blue-500 text-sm">繼續 →</span>
      </div>
    </Link>
  );
}
