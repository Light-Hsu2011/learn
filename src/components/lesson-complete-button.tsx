"use client";

import { useEffect, useState } from "react";
import { isLessonComplete, setLessonComplete } from "@/lib/progress";

interface LessonCompleteButtonProps {
  lessonId: string;
}

export function LessonCompleteButton({ lessonId }: LessonCompleteButtonProps) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(isLessonComplete(lessonId));
  }, [lessonId]);

  const toggle = () => {
    const next = !done;
    setLessonComplete(lessonId, next);
    setDone(next);
  };

  return (
    <button
      onClick={toggle}
      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
        done
          ? "bg-green-100 text-green-700 border-2 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      {done ? "✅ 已完成！點擊取消" : "📝 標記為已完成"}
    </button>
  );
}
