const STORAGE_KEY = "learn-progress";

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

export function getTopicProgress(topicSlug: string, totalLessons: number): number {
  const progress = getProgress();
  const completed = Object.keys(progress).filter(
    (key) => key.startsWith(`${topicSlug}/`) && progress[key]
  ).length;
  return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
}
