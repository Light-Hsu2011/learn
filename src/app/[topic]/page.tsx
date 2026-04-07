import { notFound } from "next/navigation";
import { getTopicBySlug, topics } from "@/lib/topics";
import { getLessons } from "@/lib/content";
import Link from "next/link";
import { ProgressBar } from "@/components/progress-bar";
import { LessonStatus } from "@/components/lesson-status";

interface Props {
  params: Promise<{ topic: string }>;
}

export function generateStaticParams() {
  return topics.map((t) => ({ topic: t.slug }));
}

export default async function TopicPage({ params }: Props) {
  const { topic } = await params;
  const topicInfo = getTopicBySlug(topic);
  if (!topicInfo) notFound();

  const lessons = getLessons(topic);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-800">
          首頁
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">
          {topicInfo.icon} {topicInfo.title}
        </span>
      </nav>

      <h1 className="text-4xl font-bold mb-4">
        {topicInfo.icon} {topicInfo.title}
      </h1>
      <p className="text-lg text-gray-600 mb-4">{topicInfo.description}</p>
      {lessons.length > 0 && (
        <div className="mb-8">
          <ProgressBar topicSlug={topic} totalLessons={lessons.length} />
        </div>
      )}

      {lessons.length === 0 ? (
        <p className="text-gray-400 italic">尚未有課程內容，敬請期待！</p>
      ) : (
        <div className="space-y-3">
          {lessons.map((lesson, i) => (
            <Link
              key={lesson.slug}
              href={`/${topic}/${lesson.slug}`}
              className="block p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-gray-400 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold">{lesson.title}</h3>
                  {lesson.description && (
                    <p className="text-sm text-gray-500">{lesson.description}</p>
                  )}
                </div>
                <LessonStatus lessonId={`${topic}/${lesson.slug}`} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
