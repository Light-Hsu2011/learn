"use client";

import { useEffect, useState } from "react";
import { getTopicProgress } from "@/lib/progress";

interface ProgressBarProps {
  topicSlug: string;
  totalLessons: number;
}

export function ProgressBar({ topicSlug, totalLessons }: ProgressBarProps) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => setPct(getTopicProgress(topicSlug, totalLessons));
    update();
    window.addEventListener("progress-updated", update);
    return () => window.removeEventListener("progress-updated", update);
  }, [topicSlug, totalLessons]);

  if (totalLessons === 0) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap">{pct}%</span>
    </div>
  );
}
