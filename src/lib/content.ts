import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface LessonMeta {
  slug: string;
  title: string;
  description: string;
  order: number;
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
      return {
        slug,
        title: (data.title as string) || slug,
        description: (data.description as string) || "",
        order: (data.order as number) || 999,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getLessonContent(topicSlug: string, lessonSlug: string): string | null {
  const filePath = path.join(contentDir, topicSlug, `${lessonSlug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
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
