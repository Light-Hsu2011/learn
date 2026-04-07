import { topics } from "@/lib/topics";
import { getLessons } from "@/lib/content";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">Senior Dev 學習路線</h1>
      <p className="text-lg text-gray-500 mb-10">
        5 大主題，互動式學習，小學生也能懂
      </p>

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
                <div className="text-right">
                  <span className="text-sm text-gray-400">
                    {lessons.length} 課
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
