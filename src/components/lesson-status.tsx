"use client";

import { useEffect, useState } from "react";
import { isLessonComplete } from "@/lib/progress";

interface LessonStatusProps {
  lessonId: string;
}

export function LessonStatus({ lessonId }: LessonStatusProps) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const update = () => setDone(isLessonComplete(lessonId));
    update();
    window.addEventListener("progress-updated", update);
    return () => window.removeEventListener("progress-updated", update);
  }, [lessonId]);

  if (!done) return null;
  return <span className="text-green-500 text-sm">✅</span>;
}
