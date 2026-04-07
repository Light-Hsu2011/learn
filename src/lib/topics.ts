export interface Topic {
  slug: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export const topics: Topic[] = [
  {
    slug: "design-patterns",
    title: "Design Patterns",
    description: "經典軟體設計模式，用小學生能懂的方式解釋",
    icon: "🧩",
    order: 1,
  },
  {
    slug: "tdd",
    title: "TDD",
    description: "測試驅動開發，先寫測試再寫程式",
    icon: "🧪",
    order: 2,
  },
  {
    slug: "ddd",
    title: "DDD",
    description: "領域驅動設計，用業務語言建模",
    icon: "🏗️",
    order: 3,
  },
  {
    slug: "system-design",
    title: "System Design",
    description: "系統設計，從零打造大規模系統",
    icon: "🌐",
    order: 4,
  },
  {
    slug: "leetcode-75",
    title: "LeetCode 75",
    description: "75 道經典演算法題，面試必備",
    icon: "⚡",
    order: 5,
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}
