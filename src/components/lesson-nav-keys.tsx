"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setLastViewed } from "@/lib/progress";

interface LessonNavKeysProps {
  topicSlug: string;
  lessonSlug: string;
  lessonTitle: string;
  prevHref: string | null;
  nextHref: string | null;
}

export function LessonNavKeys({
  topicSlug,
  lessonSlug,
  lessonTitle,
  prevHref,
  nextHref,
}: LessonNavKeysProps) {
  const router = useRouter();

  useEffect(() => {
    setLastViewed(topicSlug, lessonSlug, lessonTitle);
  }, [topicSlug, lessonSlug, lessonTitle]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft" && prevHref) router.push(prevHref);
      if (e.key === "ArrowRight" && nextHref) router.push(nextHref);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prevHref, nextHref, router]);

  return null;
}
