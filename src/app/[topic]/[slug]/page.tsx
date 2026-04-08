import { notFound } from "next/navigation";
import { getLessonContent, getAllLessonSlugs, getLessons, getRelatedLessons } from "@/lib/content";
import { getTopicBySlug } from "@/lib/topics";
import { parseFrontmatter } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import Link from "next/link";
import { mdxComponents } from "@/components/mdx";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SearchHelper } from "@/components/search-helper";
import { LessonNavKeys } from "@/components/lesson-nav-keys";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { InterviewStars } from "@/components/interview-badge";
import { RelatedLessons } from "@/components/related-lessons";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ topic: string; slug: string }>;
}

export function generateStaticParams() {
  return getAllLessonSlugs().map(({ topic, slug }) => ({ topic, slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic, slug } = await params;
  const topicInfo = getTopicBySlug(topic);
  const source = getLessonContent(topic, slug);
  if (!topicInfo || !source) return {};

  const { frontmatter } = parseFrontmatter(source);
  return {
    title: `${frontmatter.title} — ${topicInfo.title} | Senior Dev 學習路線`,
    description: frontmatter.description || `${topicInfo.title} 課程：${frontmatter.title}`,
  };
}

export default async function LessonPage({ params }: Props) {
  const { topic, slug } = await params;
  const topicInfo = getTopicBySlug(topic);
  if (!topicInfo) notFound();

  const source = getLessonContent(topic, slug);
  if (!source) notFound();

  const { frontmatter, content } = parseFrontmatter(source);
  const lessons = getLessons(topic);
  const currentIdx = lessons.findIndex((l) => l.slug === slug);
  const currentLesson = lessons[currentIdx];
  const prev = currentIdx > 0 ? lessons[currentIdx - 1] : null;
  const next = currentIdx < lessons.length - 1 ? lessons[currentIdx + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <LessonNavKeys
        topicSlug={topic}
        lessonSlug={slug}
        lessonTitle={frontmatter.title}
        prevHref={prev ? `/${topic}/${prev.slug}` : null}
        nextHref={next ? `/${topic}/${next.slug}` : null}
      />

      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-800">
          首頁
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${topic}`} className="hover:text-gray-800">
          {topicInfo.icon} {topicInfo.title}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{frontmatter.title}</span>
        {currentLesson && (
          <>
            <span className="ml-3"><DifficultyBadge difficulty={currentLesson.difficulty} /></span>
            <span className="ml-2"><InterviewStars importance={currentLesson.interviewImportance} /></span>
            <span className="ml-2 text-xs text-gray-400">
              {currentLesson.readingTime} min read
            </span>
          </>
        )}
      </nav>

      <article className="prose prose-lg max-w-none dark:prose-invert">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [
                [rehypePrettyCode, { theme: "catppuccin-mocha", keepBackground: false }],
              ],
            },
          }}
        />
      </article>

      {/* Complete button */}
      <div className="mt-10 flex justify-center">
        <LessonCompleteButton lessonId={`${topic}/${slug}`} />
      </div>

      {/* Related lessons */}
      <RelatedLessons lessons={getRelatedLessons(currentLesson?.related || [])} />

      {/* Prev / Next navigation */}
      <div className="mt-8 flex justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
        {prev ? (
          <Link
            href={`/${topic}/${prev.slug}`}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/${topic}/${next.slug}`}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            {next.title} →
          </Link>
        ) : (
          <Link
            href={`/${topic}`}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            回到目錄 →
          </Link>
        )}
      </div>

      {/* Keyboard hint */}
      <p className="mt-4 text-center text-xs text-gray-300 dark:text-gray-600">
        按 ← → 鍵切換課程
      </p>

      <SearchHelper lessonTitle={frontmatter.title} />
    </div>
  );
}
