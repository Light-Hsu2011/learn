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
  {
    slug: "api-design",
    title: "API Design",
    description: "RESTful API 設計、GraphQL、認證與文件自動化",
    icon: "🔌",
    order: 6,
  },
  {
    slug: "ci-cd",
    title: "CI/CD",
    description: "持續整合與部署，自動化流水線實戰",
    icon: "🚀",
    order: 7,
  },
  {
    slug: "cloud-architecture",
    title: "Cloud Architecture",
    description: "雲端架構設計，Azure/AWS 核心服務與最佳實踐",
    icon: "☁️",
    order: 8,
  },
  {
    slug: "security",
    title: "Security",
    description: "OWASP Top 10、認證安全、DevSecOps 實踐",
    icon: "🔒",
    order: 9,
  },
  {
    slug: "microservices",
    title: "Microservices",
    description: "微服務架構模式、服務通訊與分散式交易",
    icon: "🧱",
    order: 10,
  },
  {
    slug: "observability",
    title: "Observability",
    description: "可觀測性三支柱：Logs、Metrics、Traces",
    icon: "📡",
    order: 11,
  },
  {
    slug: "ai-for-developers",
    title: "AI for Developers",
    description: "Prompt Engineering、RAG、AI Agent，開發者必備 AI 技能",
    icon: "🤖",
    order: 12,
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}
