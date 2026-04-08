import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export type Difficulty = "easy" | "medium" | "hard";

export interface LessonMeta {
  slug: string;
  title: string;
  description: string;
  order: number;
  readingTime: number;
  difficulty: Difficulty;
  interviewImportance: number;
  related: string[];
}

export function getLessons(topicSlug: string): LessonMeta[] {
  const topicDir = path.join(contentDir, topicSlug);
  if (!fs.existsSync(topicDir)) return [];

  const files = fs
    .readdirSync(topicDir)
    .filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const content = fs.readFileSync(path.join(topicDir, file), "utf-8");
      const { data } = matter(content);
      const wordCount = content.replace(/<[^>]*>/g, "").replace(/```[\s\S]*?```/g, "").length;
      const readingTime = Math.max(1, Math.round(wordCount / 500));
      return {
        slug,
        title: (data.title as string) || slug,
        description: (data.description as string) || "",
        order: (data.order as number) || 999,
        readingTime,
        difficulty: (data.difficulty as Difficulty) || "medium",
        interviewImportance: (data.interviewImportance as number) || 3,
        related: (data.related as string[]) || [],
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getLessonContent(topicSlug: string, lessonSlug: string): string | null {
  const filePath = path.join(contentDir, topicSlug, `${lessonSlug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export function getRelatedLessons(related: string[]): { topic: string; slug: string; title: string; difficulty: Difficulty }[] {
  return related
    .map((ref) => {
      const [topic, slug] = ref.split("/");
      if (!topic || !slug) return null;
      const lessons = getLessons(topic);
      const lesson = lessons.find((l) => l.slug === slug);
      if (!lesson) return null;
      return { topic, slug, title: lesson.title, difficulty: lesson.difficulty };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
}

export function getAllLessonSlugs(): { topic: string; slug: string }[] {
  const result: { topic: string; slug: string }[] = [];
  if (!fs.existsSync(contentDir)) return result;

  for (const topicDir of fs.readdirSync(contentDir)) {
    const fullPath = path.join(contentDir, topicDir);
    if (!fs.statSync(fullPath).isDirectory()) continue;

    const files = fs.readdirSync(fullPath).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      result.push({ topic: topicDir, slug: file.replace(/\.mdx$/, "") });
    }
  }
  return result;
}
