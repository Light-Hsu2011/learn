import { topics } from "@/lib/topics";
import { getLessons } from "@/lib/content";
import Link from "next/link";
import { ProgressBar } from "@/components/progress-bar";
import { ContinueLearning } from "@/components/continue-learning";
import { LessonSearch } from "@/components/lesson-search";

export default function HomePage() {
  const allSearchItems = topics.flatMap((topic) => {
    const lessons = getLessons(topic.slug);
    return lessons.map((lesson) => ({
      topicSlug: topic.slug,
      topicIcon: topic.icon,
      slug: lesson.slug,
      title: lesson.title,
      description: lesson.description,
    }));
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">Senior Dev 學習路線</h1>
      <p className="text-lg text-gray-500 mb-8">
        5 大主題，互動式學習，小學生也能懂
      </p>

      <ContinueLearning />
      <LessonSearch items={allSearchItems} />

      <div className="space-y-4">
        {topics.map((topic) => {
          const lessons = getLessons(topic.slug);
          return (
            <Link
              key={topic.slug}
              href={`/${topic.slug}`}
              className="block p-6 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{topic.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold">{topic.title}</h2>
                    <p className="text-sm text-gray-500">
                      {topic.description}
                    </p>
                  </div>
                </div>
                <div className="text-right w-32">
                  <span className="text-sm text-gray-400">
                    {lessons.length} 課
                  </span>
                  {lessons.length > 0 && (
                    <div className="mt-1">
                      <ProgressBar topicSlug={topic.slug} totalLessons={lessons.length} />
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
