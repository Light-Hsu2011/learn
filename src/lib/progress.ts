const STORAGE_KEY = "learn-progress";
const LAST_VIEWED_KEY = "learn-last-viewed";

export function getProgress(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setLessonComplete(lessonId: string, complete: boolean) {
  const progress = getProgress();
  if (complete) {
    progress[lessonId] = true;
  } else {
    delete progress[lessonId];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  window.dispatchEvent(new Event("progress-updated"));
}

export function isLessonComplete(lessonId: string): boolean {
  return getProgress()[lessonId] === true;
}

export function setLastViewed(topicSlug: string, lessonSlug: string, lessonTitle: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LAST_VIEWED_KEY, JSON.stringify({ topicSlug, lessonSlug, lessonTitle }));
}

export function getLastViewed(): { topicSlug: string; lessonSlug: string; lessonTitle: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LAST_VIEWED_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getTopicProgress(topicSlug: string, totalLessons: number): number {
  const progress = getProgress();
  const completed = Object.keys(progress).filter(
    (key) => key.startsWith(`${topicSlug}/`) && progress[key]
  ).length;
  return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
}
