import matter from "gray-matter";

export interface MDXFrontmatter {
  title: string;
  order: number;
  description: string;
  [key: string]: unknown;
}

export function parseFrontmatter(source: string) {
  const { data, content } = matter(source);
  return {
    frontmatter: data as MDXFrontmatter,
    content,
  };
}
