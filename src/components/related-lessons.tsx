import Link from "next/link";
import { DifficultyBadge } from "./difficulty-badge";
import type { Difficulty } from "@/lib/content";

interface RelatedLesson {
  topic: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
}

export function RelatedLessons({ lessons }: { lessons: RelatedLesson[] }) {
  if (lessons.length === 0) return null;

  return (
    <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
        你可能也想看
      </h3>
      <div className="grid gap-2">
        {lessons.map((lesson) => (
          <Link
            key={`${lesson.topic}/${lesson.slug}`}
            href={`/${lesson.topic}/${lesson.slug}`}
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="font-medium text-sm flex-1">{lesson.title}</span>
            <DifficultyBadge difficulty={lesson.difficulty} />
          </Link>
        ))}
      </div>
    </div>
  );
}
